import React from 'react'
import { useDispatch } from 'react-redux'
import CommentInput from './components/CommentInput'
import Comments from './components/Comments'
import { addNewComment } from './slices/comments'

const App = () => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col m-16 p-12 bg-white">
        <div className="text-lg font-bold mb-8">Discussion</div>
        <CommentInput
            onSubmit={value => dispatch(addNewComment(value))}
        />
        <div className="border-t border-ghost-border mt-8 mb-2"/>
        <Comments/>
    </div>
  )
}

export default App
