import _ from 'lodash'
import React from 'react'
import Comment from './Comment'
import { useSelector } from 'react-redux'
import { selectChildComments, selectComments } from '../slices/comments'

const Comments = () => {
  const comments = useSelector(selectComments)
  const children = useSelector(selectChildComments)

  const renderItems = (items, padding) => (
    <div className={`pl-${padding * 4}`}>
      {_.map(items, (item, idx) => {
        const itemChildren = _.get(children, item.id)
        return (
          <div key={item.id} style={{ marginBottom: 24 }}>
            <Comment
              content={item}
            />
            {renderItems(itemChildren, padding + 1)}
          </div>
        )
      })}
    </div>
  )

  return renderItems(comments, 0)
}

export default Comments
