<template>
  <div id="app" class="mx-auto">
    <!-- <Header v-if="$router.history.current.fullPath.search('backend') === -1"></Header> -->
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import firebase from './Model/FirebaseModel.vue'
import Header from './Header.vue'
export default {
  name: 'App',
  mixins: [firebase],
  components: {
    Header
  },
  created () {
    // this.F_stateWatcher()
  }
}

</script>

<style lang="scss">
* {
  font-family: 微軟正黑體;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

#app {
  height: 100%;
}

.icon-size-black {
  @extend %icon_size_base;
  @include icon_size_color;
}

input[type=file] {
  display: none;
}
</style>
