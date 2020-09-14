<template>
  <b-container>
    <b-row>
      <b-col>
        這裡是後台待開發
      <b-navbar-nav>
        <b-nav-item to="/" @click="signOut">登出</b-nav-item>
      </b-navbar-nav>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { firebase } from '../Model/FirebaseModel'
export default {
  name: 'Backend',
  data () {
    return {

    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
      // eslint-disable-next-line handle-callback-err
        console.log('登出成功')
      })
    }
  }
}
</script>
