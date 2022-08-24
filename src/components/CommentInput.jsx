import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/user'
import Avatar from './Avatar'
import _ from 'lodash'

const CommentInput = ({ onSubmit, showCancel = false, onCancel }) => {
  const [value, setValue] = useState('')
  const user = useSelector(selectUser)

  const handleSubmit = () => {
    if (!_.isEmpty(value) && onSubmit) {
      onSubmit({
        id: 'new-' + Math.random().toString(36).slice(2),
        userId: user.id,
        name: user.name,
        comment: value
      })
      setValue('')
    }
  }

  return (
    <div className="flex flex-row h-30px">
        <Avatar name={user.name}/>
        <input
          className="flex-1 border border-ghost-border rounded mx-4 px-2 text-xs"
          placeholder="What are your thoughts?"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSubmit(e)
            }
          }}
        />
        <button
          className="bg-ghost-button text-white font-bold px-4 rounded-md text-xs"
          onClick={handleSubmit}
        >
          Comment
        </button>
        {
          showCancel &&
          <button
            className="text-ghost-text text-xs px-4"
            onClick={onCancel}
          >
            Cancel
          </button>
        }
    </div>
  )
}

CommentInput.propTypes = {
  showCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
}

export default CommentInput
