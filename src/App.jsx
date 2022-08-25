import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { listenForChanges } from './api'
import CommentInput from './components/CommentInput'
import Comments from './components/Comments'
import { addNewComment, updateComment } from './slices/comments'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = listenForChanges(change => {
      const comment = change.doc.data()
      Object.assign(comment, { id: change.doc.id })
      dispatch(updateComment({
        oldData: { id: comment.id },
        newData: comment
      }))
    })
    return () => unsubscribe()
  })
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
