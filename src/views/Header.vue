<template>
  <b-container fluid class="hero">
    <b-navbar type="dark" variant="dark" v-if="$router.history.current.fullPath.search('backend') === -1">

      <!-- 這邊使用 BV 支援 <router-link to=...>的元件 -->
      <b-navbar-nav align="center">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About Me</b-nav-item>
        <b-nav-item to="/HandsomeLogin" v-if="loginShow">登入</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h1 class="text-center">閒咱人等</h1>
    <p class="text-center">你們、我們、他們</p>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
      loginShow: false
    }
  },
  watch: {
    searchText: function (newVal, oldVal) {
      if (newVal === 'loginpls') this.loginShow = true
      else this.loginShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background-color: #343A40;
  padding: 1rem;
  h1, h2, h3, h4, p {
    color: #c9c9c9;
  }
}
</style>
