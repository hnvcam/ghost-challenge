import { put, takeEvery } from '@redux-saga/core/effects'
import { addComment, getComments } from '../api'
import { addNewComment, setComments, updateComment } from '../slices/comments'

export default function * comments () {
  yield loadComments()
  yield takeEvery(addNewComment, uploadNewComment)
}

function * loadComments () {
  const comments = yield getComments()
  yield put(setComments(comments))
}

function * uploadNewComment ({ payload }) {
  const newComment = yield addComment(payload)
  yield put(updateComment({
    oldData: payload,
    newData: newComment
  }))
}
