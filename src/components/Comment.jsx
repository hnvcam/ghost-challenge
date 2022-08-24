import React from 'react'
import PropTypes from 'prop-types'
import Avatar from './Avatar'
import _ from 'lodash'
import moment from 'moment'

const Comment = ({ content }) => {
  const { id, name, userId, comment, time, votes } = content
  return (
    <div className="flex flex-row text-ghost-text">
        <Avatar name={name}/>
        <div className="flex flex-col ml-4">
            <div className="flex flex-row items-center">
                <div className="text-sm font-semibold">{_.startCase(name)}</div>
                <div className="text-xs mx-2 justify-self-start">&#x00B7;</div>
                <div className="text-xs text-ghost-link">{moment(time).fromNow()}</div>
            </div>
            <div className="flex-1 text-sm">
                {comment}
            </div>
            <div className="flex flex-row mt-2 items-baseline text-ghost-link">
                <div className="mr-2">&#x25B4;</div>
                <a href="#" className="text-xs no-underline font-semibold">Upvote{votes ? ` (${votes})` : ''}</a>
                <a href="#" className="text-xs no-underline font-semibold ml-8">Reply</a>
            </div>
        </div>
    </div>
  )
}

Comment.propTypes = {
  content: PropTypes.object
}

export default Comment
