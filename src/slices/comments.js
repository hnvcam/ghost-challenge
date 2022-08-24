import { createSlice } from '@reduxjs/toolkit'
import _, { set } from 'lodash'

const initialState = {
  root: [],
  children: {}
}

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      _.forEach(payload, comment => {
        if (comment.parentId) {
          state.children[comment.parentId] = _.concat(state.children[comment.parentId], comment)
        } else {
          state.root = _.concat(state.root, comment)
        }
      })
    }
  }
})

export const selectComments = state => state.comments.root
export const selectChildComments = state => state.comments.children
export const { setComments } = commentSlice.actions
export default commentSlice.reducer
