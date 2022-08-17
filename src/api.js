import moment from 'moment';

const comments = [];

export function addComment(userId, name, comment) {
    const obj = {
        userId,
        name,
        comment,
        time: moment().toISOString()
    };
    comments.push(obj);
    return obj;
}

export function getComments() {
    return comments;
}