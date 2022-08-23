import React from 'react'
import CommentInput from './components/CommentInput'
import Comments from './components/Comments'

const App = () => (
    <div className="flex flex-col m-16 p-12 bg-white">
        <div className="text-lg font-bold mb-8">Discussion</div>
        <CommentInput/>
        <div className="border-t border-ghost-border my-8"/>
        <Comments/>
    </div>
)

export default App
