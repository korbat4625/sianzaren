<template>
  <b-container>
    <b-row>
      <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
      <b-col>
        <router-link to="/backend/article_editor">新增文章</router-link>
        <b-nav-item v-if="$router.history.current.name === 'Backend'" to="/" @click="signOut">登出</b-nav-item>
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
    return {
      content: '# your markdown content'
    }
  },
  methods: {}
}
</script>
