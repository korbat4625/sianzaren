<template>
  <div id="app">
    <b-container fluid class="hero" ref="hero" v-if="$router.history.current.fullPath.search('backend') === -1">
      <b-row>
        <b-col cols="12">
          <div class="hero--chooseHero">
            <div class="hero--chooseHero__content">
              <h1 @click="showLoginClick">IT幫幫忙 - 鐵人賽 30 天</h1>
              <p @click="showUser">自討苦吃</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-navbar type="dark" variant="dark" v-if="$router.history.current.fullPath.search('backend') === -1">

      <!-- 這邊使用 BV 支援 <router-link to=...>的元件 -->
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About Me</b-nav-item>
        <b-nav-item to="/login" v-if="loginShow">登入</b-nav-item>
      </b-navbar-nav>
      <!-- <b-nav-item v-if="$router.history.current.name === 'Backend'" to="/" @click="signOut">登出</b-nav-item> -->
      <!-- 這邊使用 BV navbar 的搜尋框元件，後面用以搜尋文章 -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

    <!-- 負責顯示所有內容 -->
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      loginShow: false,
      loginClick: 0
    }
  },
  created () {
    this.stateWatcher()
  },
  methods: {
    showLoginClick () {
      this.loginClick++
      if (this.loginClick > 2) {
        this.loginShow = true
        setTimeout(() => {
          this.loginClick = 0
          this.loginShow = false
        }, 3000)
      }
    }
  }
}

</script>

<style lang="scss" scope>
* {
  font-family: 微軟正黑體;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container-fluid.hero {
  background-color: #024e82;
  .hero--chooseHero {
    position: relative;
    padding: 1rem;
    height: 300px;
    color: #ddd;

    & > .hero--chooseHero__content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 3rem;
      border: solid 2px #ddd;
      border-radius: 5px;
      text-align: center;

      & > h1,p {
        user-select: none;
      }
    }
  }
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
