<template>
  <span></span>
</template>

<script>
import { firebase, db } from './FirebaseModel.js'
export default {
  methods: {
    async F_showUser (e, msg) {
      console.log('觸發了F_showUser')
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
    },

    F_signIn (account, password) {
      console.log('觸發了F_signIn')
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

    F_signUp (account, password) {
      console.log('觸發了F_signUp')
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

    F_signOut () {
      console.log('觸發了F_signOut')
      firebase.auth().signOut().then(function () {
        //
        // Sign-out successful.
        console.log('登出成功')
      })
    },

    F_updateArticle (data) {
      console.log('觸發了F_updateArticle')
      db.collection('posts').add(data).then(res => {
        console.log('新增文章成功')
      }).catch(res => {
        console.log('新增文章失敗')
      })
    },

    F_stateWatcher () {
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
          console.log('使用者資訊: ', { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData })
          if (self.$route.name === 'Login') self.$router.push('backend')
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
      // if (this.$store.state.currentUser) {
      //   this.$router.push('backend')
      // } else {
      //   this.$router.push('login')
      // }
    },

    F_getCollectionDocs () {
      console.log('觸發了F_getCollectionDocs')
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
    },

    F_setManagerData (data) {
      console.log('觸發了F_setManagerData')
      return db.collection('manager').doc(data.displayName).set({
        nickName: data.displayName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        skills: data.skills,
        intro: data.intro
      }, { merge: true })
    }
  }
}
</script>
