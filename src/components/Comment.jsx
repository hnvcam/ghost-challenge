import React from 'react'
import PropTypes from 'prop-types'
import Avatar from './Avatar'
import _ from 'lodash'
import moment from 'moment'
import CommentInput from './CommentInput'
import { useDispatch } from 'react-redux'
import { addNewComment, upvote } from '../slices/comments'

const Comment = ({ content, adding, onReply, onCancelReply }) => {
  const { id, name, comment, time, votes } = content
  const dispatch = useDispatch()
  const handleSubmit = value => {
    dispatch(addNewComment({
      ...value,
      parentId: id
    }))
    onCancelReply()
  }
  // calculating number for visual only
  const handleUpvote = () => dispatch(upvote({ id, votes: (votes || 0) + 1 }))
  return (
    <div className="flex flex-row text-ghost-text">
        <Avatar name={name}/>
        <div className="flex flex-col flex-1 ml-4">
            <div className="flex flex-row items-center">
                <div className="text-sm font-semibold">{_.startCase(name)}</div>
                <div className="text-xs mx-2 justify-self-start">&#x00B7;</div>
                <div className="text-xs text-ghost-link">{moment(time).fromNow()}</div>
            </div>
            <div className="flex-1 text-sm">
                {comment}
            </div>
            { adding
              ? <div className="mt-2">
                    <CommentInput
                        parentId={id}
                        onCancel={onCancelReply}
                        onSubmit={handleSubmit}
                        showCancel
                    />
                </div>
              : <div className="flex flex-row mt-2 items-baseline text-ghost-link">
                    <div className="mr-2">&#x25B4;</div>
                    <button
                        className="text-xs no-underline font-semibold"
                        onClick={handleUpvote}
                    >
                        Upvote{votes ? ` (${votes})` : ''}
                    </button>
                    <button
                        className="text-xs no-underline font-semibold ml-8"
                        onClick={onReply}
                    >
                        Reply
                    </button>
                </div>
            }
        </div>
    </div>
  )
}

Comment.propTypes = {
  content: PropTypes.object,
  adding: PropTypes.bool,
  onReply: PropTypes.func,
  onCancelReply: PropTypes.func
}

export default Comment
