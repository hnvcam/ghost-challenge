import './inter-web/inter.css';
import './styles.css';
import _ from 'lodash';
import {addComment} from './api';
import moment from 'moment';
import names from './names.json';

function registerHandlers() {
    const commentInput = $('input.comment-input');
    const commentBtn = $('button.comment-button');
    commentBtn.on('click', function() {
        const comment = commentInput.val();
        if (!_.isEmpty(comment)) {
            const userId = Math.random().toString(36).slice(2); // will be firebase userId
            const addedComment = addComment(userId, generateName(userId), comment);
            commentInput.val('');
            insertComment(addedComment);
        }
    });
}

function insertComment(comment) {
    const recentComments = $('div.recent-comments');
    recentComments.prepend(renderComment(comment));
}

function renderComment(comment) {
    return `<div class="container">
                <div class="avatar"></div>
                <div class="content">
                    <div class="content-head">
                        <div class="user-name">${_.startCase(comment.name)}</div>
                        <div class="time-ago" value="${comment.time}">${moment(comment.time).fromNow()}</div>
                    </div>
                    <div class="content-text">${comment.comment}</div>
                    <div class="content-foot">
                        <a href="#" class="up-vote content-action">Upvote</a>
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


$(function() {
    registerHandlers();
})