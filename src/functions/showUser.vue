<template>
  <span></span>
</template>

<script>
import { firebase } from '../Model/FirebaseModel.js'
export default {
  name: 'globalFunctionShowUser',
  created () {
  },
  methods: {
    showUser (e) {
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
        return {
          name,
          email,
          photoUrl,
          emailVerified,
          uid
        }
      } else {
        console.log('使用者以登出', user)
      }

      console.log(e)
    }
  }
}
</script>
