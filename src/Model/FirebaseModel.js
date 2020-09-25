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

async function F_showUser (e, msg) {
  var user = firebase.auth().currentUser
  var name, email, photoUrl, uid, emailVerified

  if (user != null) {
    name = user.displayName
    email = user.email
    photoUrl = user.photoURL
    emailVerified = user.emailVerified
    uid = user.uid
    console.log({ name, email, photoUrl, emailVerified, uid })
    return { name, email, photoUrl, emailVerified, uid }
  } else {
    console.log('使用者以登出', user)
  }
}

function F_signIn (account, password) {
  firebase.auth().signInWithEmailAndPassword(account, password).then(() => {
    console.log(this)
    console.log('登入成功')
    this.$router.push('/backend')
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    console.error(errorCode, errorMessage)
  })
}

function F_signUp (user) {
  firebase.auth().createUserWithEmailAndPassword(user.account, user.password).then(() => {
    this.F_setManagerData(user)
    this.$router.push('/backend')
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    console.error(errorCode, errorMessage)
  })
}

function F_signOut () {
  const self = this
  firebase.auth().signOut().then(function () {
    //
    // Sign-out successful.
    console.log('登出成功')
  })
}

function F_updateArticle (data) {
  db.collection('posts').add(data).then(res => {
    console.log('新增文章成功')
  }).catch(res => {
    console.log('新增文章失敗')
  })
}

function F_stateWatcher () {
  console.log('監看者觸發')
  const self = this
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user)
      // User is signed in.
      var displayName = user.displayName
      var email = user.email
      var emailVerified = user.emailVerified
      var photoURL = user.photoURL
      var isAnonymous = user.isAnonymous
      var uid = user.uid
      var providerData = user.providerData
      if (self.$route.name === 'Login') self.$router.push('backend')
    } else {
      //
    }
  })
}

function F_updateProfile (userInfo) {
  var user = firebase.auth().currentUser
  return user.updateProfile({
    displayName: userInfo.displayName
    // photoURL: photoURL
  })
}

function F_getCollectionDocs () {
  db.collection('posts').orderBy('createdAt', 'desc').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      const data = doc.data()
      data.id = doc.id
      self.posts.push(data)
      console.log(data)
    })
  })
}

function F_setManagerData (data) {
  db.collection('manager').doc(data.name).set({
    nickName: data.nickName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    address: data.address,
    skills: data.skills,
    intro: data.intro
  }).then(function () {
    console.log('Document successfully written!')
  }).catch(function (error) {
    console.error('Error writing document: ', error)
  })
}

export { firebase, db, storage }
