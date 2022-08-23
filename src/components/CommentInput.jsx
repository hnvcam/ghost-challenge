import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/user'
import Avatar from './Avatar'

const CommentInput = () => {
  const user = useSelector(selectUser)
  return (
    <div className="flex flex-row h-30px">
        <Avatar name={user.name}/>
        <input className="flex-1 border border-ghost-border rounded mx-4 px-2 text-xs" placeholder="What are your thoughts?"/>
        <button className="bg-ghost-button text-white font-bold px-4 rounded-md text-xs">Comment</button>
    </div>
  )
}

export default CommentInput
