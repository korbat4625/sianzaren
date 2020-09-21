<template>
  <span></span>
</template>

<script>
import { firebase, db } from './FirebaseModel.js'
export default {
  methods: {
    async showUser (e, msg) {
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

      console.log(e)
    },

    signIn (account, password) {
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
    },

    signUp (account, password) {
      firebase.auth().createUserWithEmailAndPassword(account, password).then(() => {
        console.log('註冊成功')
        this.$router.push('/backend')
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
    },

    signOut () {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('登出成功')
      })
    },

    updateArticle (data) {
      db.collection('posts').add(data).then(res => {
        console.log('新增文章成功')
      }).catch(res => {
        console.log('新增文章失敗')
      })
    },

    stateWatcher () {
      console.log('監看者觸發')
      const self = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName
          var email = user.email
          var emailVerified = user.emailVerified
          var photoURL = user.photoURL
          var isAnonymous = user.isAnonymous
          var uid = user.uid
          var providerData = user.providerData
          // ...
          console.log('使用者資訊: ', { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData })
          self.$store.commit('setCurrentUser', { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData })
        } else {
          console.log('目前無使用者')
        }
      })
    },

    updateProfile (userInfo) {
      var user = firebase.auth().currentUser
      return user.updateProfile({
        displayName: userInfo.displayName
        // photoURL: photoURL
      })
    }
  }
}
</script>
