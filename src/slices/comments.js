import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

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
          addChilren(state, comment.parentId, comment)
        } else {
          addRoot(state, comment)
        }
      })
    },
    addNewComment: (state, { payload: { parentId, ...remains } }) => {
      const newComment = {
        parentId,
        ...remains
      }
      if (parentId) {
        addChilren(state, parentId, newComment)
      } else {
        addRoot(state, newComment)
      }
    },
    updateComment: (state, { payload: { oldData, newData } }) => {
      if (updateInArray(state.root, oldData.id, newData)) {
        return
      }
      _.forIn(state.children, arr => !updateInArray(arr, oldData.id, newData))
    }
  }
})

function updateInArray (arr, id, data) {
  const index = _.findIndex(arr, item => item.id === id)
  if (index >= 0) {
    arr[index] = data
    return true
  }
  return false
}

function addChilren (state, parentId, comment) {
  state.children[parentId] = _.concat(comment, state.children[parentId] || [])
}

function addRoot (state, comment) {
  // why this? because we want the newest comment goes first.
  state.root = _.concat(comment, state.root || [])
}

export const selectComments = state => state.comments.root
export const selectChildComments = state => state.comments.children
export const { setComments, addNewComment, updateComment } = commentSlice.actions
export default commentSlice.reducer
