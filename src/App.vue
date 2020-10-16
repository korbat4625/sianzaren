<template>
  <div id="app" class="mx-auto">
    <!-- <Header v-if="$router.history.current.fullPath.search('backend') === -1"></Header> -->
    <Header></Header>
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

<style lang="scss">
@import "./style/_variables.scss";

* {
  font-family: 微軟正黑體;
  box-sizing: border-box;
}

.icon-size-black {
  @extend %icon-size-base;
  @include icon-size-color;
}

input[type=file] {
  display: none;
}
</style>
