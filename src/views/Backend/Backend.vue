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
              <b-nav-item
                @click="linkActive='userInfoEditor'"
                :active="linkActive==='userInfoEditor'"
                :to="'/backend/'+ who +'/user_info_editor'"
              >個人主頁
              </b-nav-item>
              <b-nav-item
                @click="linkActive='addArticle'"
                :active="linkActive==='addArticle'"
                :to="'/backend/'+ who +'/add_article'"
              >新增文章
              </b-nav-item>
              <b-nav-item
                @click="linkActive='articleEditor'"
                :active="linkActive==='articleEditor'"
                :to="'/backend/'+ who +'/article_editor'"
              >編輯文章
              </b-nav-item>
              <b-nav-item
                @click="linkActive='articleEditor'"
                :active="linkActive==='articleEditor'"
                :to="'/backend/'+ who +'/desktop_preview'"
              >預覽桌面
              </b-nav-item>
              <b-nav-item
                @click="F_signOut" to="#"
              >登出
              </b-nav-item>
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
import firebase from '@/Model/FirebaseModel.vue'
export default {
  name: 'Backend',
  mixins: [firebase],
  data () {
    return {
      who: this.$route.params.who,
      avatorShow: false,
      linkActive: ''
    }
  },
  created () {},
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
    clearActive () {
      this.userInfoEditor = ''
      this.addArticle = ''
      this.articleEditor = ''
    },
    setActive (activeLink) {
      this.clearActive()
      this.linkActive = activeLink
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
