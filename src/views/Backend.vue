<template>
  <b-container class="pageBackend">
    <b-sidebar id="sidebar-1" title="Sidebar" shadow backdrop>
      <div class="px-3 py-2">
        <div><router-link to="/backend/article_editor">新增文章</router-link></div>
        <div><router-link to="/backend/user_info_editor">編輯個人資料</router-link></div>
        <div @click="signOut"><router-link to="/" >登出</router-link></div>
      </div>
    </b-sidebar>

    <b-row>
      <b-col cols="12 ">
        <h1 @click="showUser">30天鐵人賽，後台</h1>
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
export default {
  name: 'Backend',
  data () {
    return {}
  }
}
</script>

<style language="scss">
.pageBackend {
  padding: 1rem;
}
</style>
