<template>
  <b-container class="pageBackend">
    <b-sidebar id="sidebar-1" title="鐵人賽後台" shadow backdrop>
      <template v-slot:footer="{ hide }">
        <div class="d-flex flex-column bg-dark text-light px-3 py-2">
          <strong class="mr-auto">footer</strong>
          <b-button size="sm" @click="hide">Close</b-button>
        </div>
      </template>
      <template v-slot:default>
        <div class="p-3">
          <div>
            <b-img :src="photoURL"></b-img>
            <p>{{ displayName }}</p>
          </div>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item :to="'/backend/'+ who +'/user_info_editor'">編輯個人資料</b-nav-item>
              <b-nav-item :to="'/backend/'+ who +'/add_article'">新增文章</b-nav-item>
              <b-nav-item :to="'/backend/'+ who +'/article_editor'">編輯文章</b-nav-item>
              <b-nav-item @click="F_signOut" to="#">登出</b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>

    <b-row>
      <b-col cols="12">
        <h1 @click="F_showUser">30天鐵人賽，後台</h1>
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
// import '../plugins/markdown.js'
import { mapState } from 'vuex'
export default {
  name: 'Backend',
  data () {
    return {
      who: this.$route.params.who,
      avatorShow: false
    }
  },
  computed: {
    ...mapState([
      // 映射 this.count 为 store.state.count
      'photoURL',
      'displayName'
    ])
  }
}
</script>

<style language="scss" scope>
.pageBackend {
  padding: 1rem;
}
</style>
