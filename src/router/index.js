import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store/index.js'
// import { dbAPI } from '@/api/db.js'
import { authAPI } from '@/api/auth.js'
import Backend from '@/views/Backend/Backend.vue'
import store from '../store'
Vue.use(VueRouter)

const siteCondition = 'online'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: siteCondition === 'fixing' ? () => import('@/components/Building.vue') : () => import('@/views/Home/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About/About.vue')
  },
  {
    path: '/HandsomeLogin',
    name: 'HandsomeLogin',
    component: () => import('@/views/Login/HandsomeLogin.vue')
  },
  {
    path: '/backend/:who',
    name: 'Backend',
    component: Backend,
    children: [
      {
        path: 'add_article',
        name: 'AddArticle',
        component: () => import('@/views/Backend/components/AddArticle.vue')
      },
      {
        path: 'user_info_editor',
        name: 'UserInfoEditor',
        component: () => import('@/views/Backend/components/UserInfo.vue')
      },
      {
        path: 'article_editor',
        name: 'ArticleEditor',
        component: () => import('@/views/Backend/components/ArticleEditor.vue')
      },
      {
        path: 'desktop_preview',
        name: 'PreviewDesktop',
        component: () => import('@/views/Home/Home.vue')
      }
    ]
  },
  {
    path: '/article/:articleId',
    name: 'ArticlePage',
    component: () => import('@/views/Home/components/ArticlePage.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/components/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  let mg = await authAPI.checkLogin()
  let userInfo = {
    displayName: mg.displayName,
    email: mg.account,
    emailVerified: mg.emailVerified,
    photoURL: mg.photoURL,
    phoneNumber: mg.phoneNumber,
    name: mg.name,
    online: mg.online
  }
  if (mg.online && !store.state.online) {
    store.commit('setCurrentUser', userInfo)
    next()
  } else {
    if (mg.online) next()
    else {
      switch (to.name) {
        case 'Home': next(); break
        case 'HandsomeLogin': next(); break
        case 'NotFound': next(); break
        case 'ArticlePage': next(); break
        default: next({ name: 'NotFound' }); break
      }
    }
  }
  mg = {}
  userInfo = {}
})

export { router }
