<template>
  <b-container fluid id="HeroPaper" class="mx-auto">
    <b-row>
      <section class="toggler" cols="1" v-if="$route.path.indexOf('backend') !== -1 && $store.state.online">
        <span class="toggle_sidebar" v-b-toggle.sidebar-1 ><b-icon icon="grid3x2-gap"></b-icon></span>
      </section>
      <b-col cols="12 text-center">
        <h1 @click="goto('/')">閒咱人等</h1>
        <div>你們、我們、他們</div>
      </b-col>
      <b-col cols="12 text-center">
        {{ hours }} <span class="blink-animation">:</span> {{ minutes }}
      </b-col>
    </b-row>
    <!-- <b-navbar type="dark" variant="dark" v-if="$router.history.current.fullPath.search('backend') === -1">
      <b-navbar-nav align="center">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About Me</b-nav-item>
        <b-nav-item to="/HandsomeLogin" v-if="loginShow">登入</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h1 class="text-center">閒咱人等</h1>
    <p class="text-center">你們、我們、他們</p> -->
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
      loginShow: false,
      hours: new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
      minutes: new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    }
  },
  watch: {
    searchText: function (newVal, oldVal) {
      if (newVal === 'loginpls') this.loginShow = true
      else this.loginShow = false
    }
  },
  computed: {
    time: {
    // getter
      get: function () {
        return this.time
      },
      // setter
      set: function (timeStamp) {
        const hour = new Date(timeStamp).getHours()
        const minute = new Date(timeStamp).getMinutes()
        this.hours = hour < 10 ? '0' + hour : hour
        this.minutes = minute < 10 ? '0' + minute : minute
      }
    }
  },
  created () {
    setInterval(() => {
      this.time = Date.now()
    }, 1000)
  },
  beforeMount () {
    // this.colon = ':'
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
  position: relative;
  width: 100%;
  padding: 1.5rem;
  opacity: 0.8;
  * {
    color: #fff;
  }

  h1, h2, p {
    user-select: none;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 0px;
  }

  .toggler {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    .toggle_sidebar {
      font-size: 2rem;
      outline: none;
    }
  }

  .blink-animation {
    animation-name: blink;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 2s;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
