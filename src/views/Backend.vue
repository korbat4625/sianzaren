<template>
  <b-container class="pageBackend">
    <b-sidebar id="sidebar-1" title="Sidebar" shadow backdrop>
      <div class="px-3 py-2">
        <div><router-link to="/backend/article_editor">新增文章</router-link></div>
        <div @click="signOut"><router-link to="/" >登出</router-link></div>
      </div>
    </b-sidebar>

    <b-row>
      <b-col cols="12 ">
        <h1>30天鐵人賽，後台</h1>
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
      </b-col>
    </b-row>
    <b-row>
      <router-view></router-view>
    </b-row>
  </b-container>
</template>

<script>
// import '../plugins/markdown.js'
import { firebase } from '../Model/FirebaseModel.js'
export default {
  name: 'Backend',
  data () {
    return {}
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

<style language="scss">
.pageBackend {
  padding: 1rem;
}
</style>
