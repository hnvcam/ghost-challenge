import './inter-web/inter.css';
import './styles.css';
import _ from 'lodash';
import {addComment, getComments, increaseVote} from './api';
import moment from 'moment';
import names from './names.json';

function registerHandlers() {
    const commentBtn = $('button.comment-button');
    commentBtn.on('click', commentBtnHandler);

    const commentInput = $('input.comment-input');
    commentInput.on('keypress', async function(e) {
        if (e.key === 'Enter') {
            await commentBtnHandler();
        }
    })
}

async function commentBtnHandler() {
    const commentInput = $('input.comment-input');
    const comment = commentInput.val();
    
    if (!_.isEmpty(comment)) {
        const userId = Math.random().toString(36).slice(2); // will be firebase userId
        const addedComment = await addComment(userId, generateName(userId), comment);
        commentInput.val('');
        insertComment(addedComment);
    }
}

async function upvoteBtnHandler() {
    const upvoteInstance = $(this);
    const commentId = upvoteInstance.attr('commentId');
    let votes = parseInt(upvoteInstance.attr('value')) || 0;
    votes++;
    // This is for the visual effects. Synchronization is required from server side.
    upvoteInstance.attr('value', votes);
    upvoteInstance.html(renderVotes(votes));
    await increaseVote(commentId);
}

function insertComment(comment) {
    const recentComments = $('div.recent-comments');
    recentComments.prepend(renderComment(comment));
    
    // We should add the handler when it finishes manipulating the DOM
    const upvoteBtn = $(`a.up-vote[commentId="${comment.id}"]`);
    upvoteBtn.on('click', upvoteBtnHandler);
}

function renderVotes(votes) {
    return 'Upvote ' + (votes ? `(${votes})` : '');
}

function renderComment(comment) {
    return `<div class="container">
                <img class="avatar" src="https://ui-avatars.com/api/?name=${_.replace(comment.name, ' ', '+')}&size=30"/>
                <div class="content">
                    <div class="content-head">
                        <div class="user-name">${_.startCase(comment.name)}</div>
                        <div class="time-ago" value="${comment.time}">${moment(comment.time).fromNow()}</div>
                    </div>
                    <div class="content-text">${comment.comment}</div>
                    <div class="content-foot">
                        <a href="#" class="up-vote content-action" commentId="${comment.id}" value="${comment.votes}">${renderVotes(comment.votes)}</a>
                        <a href="#" class="reply content-action">Reply</a>
                    </div>
                </div>
            </div>`;
}

function generateName(userId) {
    const hash = _.reduce(_.split(userId, ''), function(acc, char) {
        acc += char.charCodeAt(0);
        return acc;
    }, 0);

    return names.first[hash % names.first.length] + ' ' + names.last[hash % names.last.length];
}

async function loadComments() {
    const comments = await getComments();
    _.forEach(comments, insertComment);
}


$(function() {
    registerHandlers();
    loadComments();
})