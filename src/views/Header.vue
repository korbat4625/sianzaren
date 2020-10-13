<template>
  <b-container fluid id="HeroPaper" class="mx-auto">
    <!--
    <b-navbar type="dark" variant="dark" v-if="$router.history.current.fullPath.search('backend') === -1">
      <b-navbar-nav align="center">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About Me</b-nav-item>
        <b-nav-item to="/HandsomeLogin" v-if="loginShow">登入</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h1 class="text-center">閒咱人等</h1>
    <p class="text-center">你們、我們、他們</p>
    -->
    <h2 @click="goto('/')">閒咱人等</h2>
    <div>你們、我們、他們</div>
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
  },
  methods: {
    goto (url) {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
#HeroPaper {
  background-color: #221E1F;
  width: 100%;
  padding: 1rem;
  opacity: 0.8;
  * {
    color: #fff;
  }

  h2 {
    user-select: none;
    cursor: pointer;
    display: inline-block;
  }
}
</style>
