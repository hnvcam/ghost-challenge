import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { put, all, call } from '@redux-saga/core/effects'
import { setUserId } from '../slices/user'
import { auth } from '../firebase'

export default function * sagas () {
  yield all([call(firebaseHandler), call(signInAnonymously, auth)])
}

function * firebaseHandler () {
  const userId = yield new Promise(resolve =>
    onAuthStateChanged(auth, function (user) {
      if (user) {
        resolve(user.uid)
      }
    })
  )

  yield put(setUserId(userId))
}
