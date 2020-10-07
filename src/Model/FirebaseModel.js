/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyACSYQJGSEBeocXzdn2ug_56XUJQApB_Kk',
  authDomain: 'sianzaren.firebaseapp.com',
  databaseURL: 'https://sianzaren.firebaseio.com',
  projectId: 'sianzaren',
  storageBucket: 'sianzaren.appspot.com',
  messagingSenderId: '240803393974',
  appId: '1:240803393974:web:113b5f7ebaac4f167e5117',
  measurementId: 'G-M9JLJ36S8S'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

var db = firebase.firestore()
var storage = firebase.storage()
export { firebase, db, storage }
