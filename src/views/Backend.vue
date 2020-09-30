<template>
  <b-container class="pageBackend">
    <b-sidebar id="sidebar-1" title="Sidebar" shadow backdrop>
      <div class="px-3 py-2">
        <div>
          <router-link :to="'/backend/'+ who +'/add_article'">新增文章</router-link>
        </div>
        <div>
          <router-link :to="'/backend/'+ who +'/article_editor'">編輯文章</router-link>
        </div>
        <div>
          <router-link :to="'/backend/'+ who +'/user_info_editor'">編輯個人資料</router-link>
        </div>
        <div @click="F_signOut">
          <router-link to="#">登出</router-link>
        </div>
      </div>
      <template v-slot:footer="{ hide }">
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
            <strong class="mr-auto">{{ $store.state.currentUser.displayName }}</strong>
            <b-button size="sm" @click="hide">Close</b-button>
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
export default {
  name: 'Backend',
  data () {
    return {
      who: this.$route.params.who
    }
  }
}
</script>

<style language="scss" scope>
.pageBackend {
  padding: 1rem;
}
</style>
