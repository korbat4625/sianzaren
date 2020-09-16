<template>
  <span></span>
</template>

<script>
import { firebase } from '../Model/FirebaseModel.js'
export default {
  name: 'globalFunctionShowUser',
  methods: {
    showUser () {
      var user = firebase.auth().currentUser
      var name, email, photoUrl, uid, emailVerified

      if (user != null) {
        name = user.displayName
        email = user.email
        photoUrl = user.photoURL
        emailVerified = user.emailVerified
        uid = user.uid
        console.log({
          name,
          email,
          photoUrl,
          emailVerified,
          uid
        })
      } else {
        console.log('使用者以登出', user)
      }
    }
  }
}
</script>
