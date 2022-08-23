import React from 'react'
import Avatar from './Avatar'

const CommentInput = () => {
  return (
    <div className="flex flex-row h-30px">
        <Avatar/>
        <input className="flex-1 border border-ghost-border rounded mx-4 px-2 text-xs" placeholder="What are your thoughts?"/>
        <button className="bg-ghost-button text-white font-bold px-4 rounded-md text-xs">Comment</button>
    </div>
  )
}

export default CommentInput
