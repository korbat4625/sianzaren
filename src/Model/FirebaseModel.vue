<template>
  <span>
  </span>
</template>

<script>
import { firebase, db } from './FirebaseModel.js'
export default {
  methods: {
    async F_showUser (e, msg) {
      console.log('觸發了F_showUser')
      var user = firebase.auth().currentUser
      // var name, email, photoUrl, uid, emailVerified
      if (user != null) return user
      else return null
    },

    F_signIn (account, password) {
      console.log('觸發了F_signIn')
      firebase.auth().signInWithEmailAndPassword(account, password).then(function () {
        console.log('登入成功')

        this.F_showUser().then(user => {
          this.$router.push(`/backend/${user.uid}`)
        })
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
    },

    F_signUp (user) {
      return firebase.auth().createUserWithEmailAndPassword(user.account, user.password).then(function () {
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
    },

    F_signOut () {
      console.log('觸發了F_signOut')
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('登出成功')
      })
    },

    F_updateArticle (data) {
      console.log('觸發了F_updateArticle')
      db.collection('posts').add(data).then(function (res) {
        console.log('新增文章成功')
      }).catch(res => {
        console.log('新增文章失敗')
      })
    },

    F_stateWatcher () {
      console.log('監看者觸發')
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          // var email = user.email
          // var emailVerified = user.emailVerified
          // var photoURL = user.photoURL
          // var isAnonymous = user.isAnonymous
          // var uid = user.uid
          // var providerData = user.providerData
          console.log('現在使用者: ', user)
        } else {
          console.log('logout')
          //
        }
      })
    },

    F_updateProfile (userInfo) {
      console.log('觸發了F_updateProfile')
      var user = firebase.auth().currentUser
      return user.updateProfile({
        displayName: userInfo.displayName
        // photoURL: photoURL
      })
    },

    F_checkLogin () {
      console.log('觸發了F_checkLogin')
      this.F_showUser().then(res => {
        console.log(res)
        if (res === null) this.$router.push('login')
        else this.$router.push(`backend/${res.uid}`)
      })
    },

    F_getCollectionDocs (collection, orderBy) {
      const docs = []
      return db.collection(collection).orderBy(orderBy.where, orderBy.order).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const data = doc.data()
          data.id = doc.id
          docs.push(data)
        })
        return docs
      })
    },

    F_setManagerData (user) {
      db.collection('manager').doc(user.name).set({
        account: user.account,
        password: user.password,
        displayName: user.displayName,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address
      }).catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },

    F_getUserInfo () {

    },

    F_updateManagerInfo () {

    }
  }
}
</script>
