<template>
  <b-container class="pageBackend">
    <b-sidebar id="sidebar-1" title="後台ㄏㄏ" shadow backdrop>
      <template v-slot:footer="{ hide }">
        <div class="d-flex flex-column bg-dark text-light px-3 py-2">
          <strong class="mr-auto">footer</strong>
          <b-button size="sm" @click="hide">Close</b-button>
        </div>
      </template>
      <template v-slot:default>
        <div class="p-3">
          <picture>
            <source>
            <b-img :src="photoURL"></b-img>
            <p>{{ displayName }}</p>
          </picture>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item :to="'/backend/'+ who +'/user_info_editor'">個人主頁</b-nav-item>
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
        <h1 @click="F_showUser();app()">後台ㄏㄏ</h1>
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '../Model/FirebaseModel.vue'
export default {
  name: 'Backend',
  mixins: [firebase],
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
  },
  methods: {
    app () {
      console.log(this.$route.params)
    }
  }
}
</script>

<style lang="scss" scope>
.pageBackend {
  padding: 1rem;
  height: 100%;
  picture {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
}
</style>
