import _ from 'lodash'
import React, { useState } from 'react'
import Comment from './Comment'
import { useSelector } from 'react-redux'
import { selectChildComments, selectComments } from '../slices/comments'

const Comments = () => {
  // we keep this in parent in order to have only one inline-reply
  const [replyingId, setReplyingId] = useState('')
  const comments = useSelector(selectComments)
  const children = useSelector(selectChildComments)

  const renderItems = (items, padding) =>
    _.map(items, (item, idx) => {
      const itemChildren = _.get(children, item.id)
      return (
          <div key={item.id} style={{ marginBottom: 24 }}>
            <Comment
              content={item}
              adding={replyingId === item.id}
              onReply={() => setReplyingId(item.id)}
              onCancelReply={() => setReplyingId('')}
            />
            <div style={{ marginTop: 24, marginLeft: padding * 48 }}>
              {renderItems(itemChildren, padding + 1)}
            </div>
          </div>
      )
    })

  return (
    <div style={{ marginTop: 24 }}>
      {renderItems(comments, 0)}
    </div>
  )
}

export default Comments
