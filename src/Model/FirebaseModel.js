// Firebase App (the core Firebase SDK) is always required and must be listed first
// 這個等於當初第一個 script 標籤
import * as firebase from 'firebase/app'

// 後面都是 import 第一個後才能接著 import 的各模塊
// 這個等於當初第二個 script 標籤
// 如果前面有開啟 google分析就加入這個 import，雖然我還沒用到 XD
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
// 這兩個剛好是我們後面需要的模塊 !! 一個是身分驗證，一個是 cloud firestore 雲端資料庫
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
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

// class FirebaseService {
//   constructor () {
//     this.firebase = firebase
//   }

//   watcher () {
//     this.firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         // User is signed in.
//         var displayName = user.displayName
//         var email = user.email
//         var emailVerified = user.emailVerified
//         var photoURL = user.photoURL
//         var isAnonymous = user.isAnonymous
//         var uid = user.uid
//         var providerData = user.providerData
//         // ...
//         console.log(displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData)
//       } else {
//         // User is signed out.
//         // ...
//       }
//     })
//   }

//   current () {
//     var user = firebase.auth().currentUser
//     var name, email, photoUrl, uid, emailVerified

//     if (user != null) {
//       name = user.displayName
//       email = user.email
//       photoUrl = user.photoURL
//       emailVerified = user.emailVerified
//       uid = user.uid
//       console.log(name, email, photoUrl, uid, emailVerified)
//       // The user's ID, unique to the Firebase project. Do NOT use
//       // this value to authenticate with your backend server, if
//       // you have one. Use User.getToken() instead.
//     }
//   }

//   signIn (email, password) {
//     return this.firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code
//       var errorMessage = error.message
//       // ...
//       console.error('錯誤訊息: ', errorCode, errorMessage)
//     })
//   }

//   signUp (email, password) {
//     return this.firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code
//       var errorMessage = error.message
//       // ...
//       console.error('錯誤訊息: ', errorCode, errorMessage)
//     })
//   }
// }

export { firebase }
