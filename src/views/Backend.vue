<template>
  <b-container fluid class="pageBackend">
    <b-sidebar id="sidebar-1" bg-variant="dark" text-variant="light" title="後台" shadow backdrop>
      <template v-slot:footer="{ hide }">
        <div class="d-flex flex-column text-light px-3 py-2">
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
            <b-navbar-nav class="ml-auto">
              <b-nav-item @click="setActive('userInfoEditor')" active :to="'/backend/'+ who +'/user_info_editor'">個人主頁</b-nav-item>
              <b-nav-item @click="setActive('addArticle')" active :to="'/backend/'+ who +'/add_article'">新增文章</b-nav-item>
              <b-nav-item @click="setActive('articleEditor')" active :to="'/backend/'+ who +'/article_editor'">編輯文章</b-nav-item>
              <b-nav-item @click="F_signOut" to="#">登出</b-nav-item>
            </b-navbar-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>
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
      avatorShow: false,
      userInfoEditor: '',
      addArticle: '',
      articleEditor: ''
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
    },
    setActive (which) {
      this.userInfoEditor = ''
      this.addArticle = ''
      this.articleEditor = ''
      if (which === 'userInfoEditor') this.userInfoEditor = 'active'
      if (which === 'userInfoEditor') this.addArticle = 'active'
      if (which === 'userInfoEditor') this.articleEditor = 'active'
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
  .toggle_sidebar {
    position: absolute;
  }
}
</style>
