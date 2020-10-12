<template>
  <div id="app">
    <Header v-if="$router.history.current.fullPath.search('backend') === -1"></Header>
    <!-- 負責顯示所有內容 -->
    <router-view/>
  </div>
</template>

<script>
import firebase from './Model/FirebaseModel.vue'
import Header from './views/Header.vue'
export default {
  name: 'App',
  mixins: [firebase],
  components: {
    Header
  },
  data () {
    return {
    }
  },
  created () {
    this.F_stateWatcher()
  },
  methods: {
  }
}

</script>

<style lang="scss" scope>
* {
  font-family: 微軟正黑體;
  box-sizing: border-box;
}

body, html {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  &.navbar { padding: 1rem; }
  .nav-item {
    a {
      font-weight: bold;
      color: #ccc;
      user-select: none;
    }
    a.router-link-exact-active {
      color: #42b983 !important;
    }
  }
}

</style>
