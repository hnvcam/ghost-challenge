import './inter-web/inter.css';
import './styles.css';
import _ from 'lodash';

$(function() {
    const commentInput = $('input.comment-input');
    const commentBtn = $('button.comment-button');
    commentBtn.on('click', function() {
        const comment = commentInput.val();
        if (!_.isEmpty(comment)) {
            console.log(comment);
            commentInput.val('');
        }
    });
})