/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA2EMExNOhLKdPeXDIPQ0ccpVfUbsHKSBE',
  authDomain: 'sianzaren-fa8bb.firebaseapp.com',
  databaseURL: 'https://sianzaren-fa8bb.firebaseio.com',
  projectId: 'sianzaren-fa8bb',
  storageBucket: 'sianzaren-fa8bb.appspot.com',
  messagingSenderId: '1077575370133',
  appId: '1:1077575370133:web:2c45fb48cf957cf1ffe29c',
  measurementId: 'G-7CMW3V8B3D'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

var db = firebase.firestore()
var storage = firebase.storage()
export { firebase, db, storage }
