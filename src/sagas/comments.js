import { put } from '@redux-saga/core/effects'
import { getComments } from '../api'
import { setComments } from '../slices/comments'

export default function * comments () {
  yield loadComments()
}

function * loadComments () {
  const comments = yield getComments()
  yield put(setComments(comments))
}
