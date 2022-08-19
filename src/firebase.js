// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import names from './names.json';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE_q6vdPeWmxWx7hzBym8d7z2dwxuUdOA",
  authDomain: "ghost-challenge.firebaseapp.com",
  projectId: "ghost-challenge",
  storageBucket: "ghost-challenge.appspot.com",
  messagingSenderId: "514121935576",
  appId: "1:514121935576:web:d1cd9c6697788d06b4c5ad",
  measurementId: "G-9QPKNR068E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getFirestore(app);

anonymousAuth(auth);

async function anonymousAuth(auth) {
  onAuthStateChanged(auth, function(user) {
    if (user) {
      window.user = {
        id: user.uid,
        name: generateName(user.uid)
      }
    } else {
      const userId = Math.random().toString(36).slice(2);
      window.user = {
        id: userId,
        name: generateName(userId)
      }
    }
  });

  signInAnonymously(auth).catch(function (error) {
    // fallback to randomize userId
    console.log(error);
  })
}

function generateName(userId) {
  const hash = _.reduce(_.split(userId, ''), function(acc, char) {
      acc += char.charCodeAt(0);
      return acc;
  }, 0);

  return names.first[hash % names.first.length] + ' ' + names.last[hash % names.last.length];
}