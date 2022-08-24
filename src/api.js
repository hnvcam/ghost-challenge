import { addDoc, collection, doc, getDocs, increment, orderBy, query, updateDoc } from 'firebase/firestore'
import _ from 'lodash'
import moment from 'moment'
import { database } from './firebase'

const COMMENTS_COLLECTION = 'comments'

export async function addComment (comment) {
  const obj = {
    // we should get the id from server
    ..._.pickBy(comment, (val, key) => val && key !== 'id'),
    time: moment().toISOString()
  }
  const docRef = await addDoc(collection(database, COMMENTS_COLLECTION), obj)
  return Object.assign({ id: docRef.id }, obj)
}

export async function getComments () {
  const commentsRef = collection(database, COMMENTS_COLLECTION)
  const querySnapshot = await getDocs(query(commentsRef, orderBy('time', 'asc')))
  return _.map(querySnapshot.docs, function (doc) {
    return Object.assign({
      id: doc.id
    }, doc.data())
  })
}

export async function increaseVote (commentId) {
  const commentRef = doc(database, COMMENTS_COLLECTION, commentId)
  const updateSnapshot = await updateDoc(commentRef, {
    // instead of setting value, we use db increment to make sure not override other values
    votes: increment(1)
  })
}
