import './inter-web/inter.css';
import './styles.css';
import _ from 'lodash';
import {addComment, getComments, increaseVote} from './api';
import moment from 'moment';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function registerHandlers() {
    const commentBtn = $('button.comment-button');
    commentBtn.on('click', commentBtnHandler);

    const commentInput = $('input.comment-input');
    commentInput.on('keypress', async function(e) {
        if (e.key === 'Enter') {
            await commentBtnHandler();
        }
    });
}

async function commentBtnHandler() {
    const commentInput = $('input.comment-input');
    const comment = commentInput.val();
    
    if (!_.isEmpty(comment)) {
        const addedComment = await addComment(window.user.id, window.user.name, comment);
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

function getAvatarUri(name) {
    return `https://ui-avatars.com/api/?name=${_.replace(name, ' ', '+')}&size=30`;
}

function renderComment(comment) {
    return `<div class="container">
                <img class="avatar" src="${getAvatarUri(comment.name)}"/>
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

async function loadComments() {
    const comments = await getComments();
    _.forEach(comments, insertComment);
}

function updateUserAvatar() {
    const avatar = $('div.comment-box > img.avatar');
    onAuthStateChanged(auth, function() {
        avatar.attr('src', getAvatarUri(window.user.name));
    })
}


$(function() {
    registerHandlers();
    loadComments();
    updateUserAvatar();
})