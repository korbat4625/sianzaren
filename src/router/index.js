import Vue from 'vue'
import VueRouter from 'vue-router'
import Backend from '@/views/Backend.vue'
import AddArticle from '@/components/AddArticle.vue'
import UserInfo from '@/components/UserInfo.vue'
import store from '@/store/index.js'
// import { dbAPI } from '@/api/db.js'
import { authAPI } from '@/api/auth.js'
Vue.use(VueRouter)

const siteCondition = 'fixing'
const showDBManagerInfo = false
const routes = [
  {
    path: '/',
    name: 'Home',
    component: siteCondition === 'fixing' ? () => import('@/views/Building.vue') : () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/HandsomeLogin',
    name: 'HandsomeLogin',
    component: () => import('@/views/HandsomeLogin.vue')
  },
  {
    path: '/backend/:who',
    name: 'Backend',
    component: Backend,
    children: [
      {
        path: 'add_article',
        name: 'AddArticle',
        component: AddArticle
      },
      {
        path: 'user_info_editor',
        name: 'UserInfoEditor',
        component: UserInfo
      },
      {
        path: 'article_editor',
        name: 'ArticleEditor',
        component: () => import('@/components/ArticleEditor.vue')
      }
    ]
  },
  {
    path: '/article/:articleId',
    name: 'ArticlePage',
    component: () => import('@/components/ArticlePage.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const mg = await authAPI.checkLogin(showDBManagerInfo, 'router')
  console.log('router看mg:', mg)
  const userInfo = {
    displayName: mg.displayName,
    email: mg.email,
    emailVerified: mg.emailVerified,
    photoURL: mg.photoURL,
    phoneNumber: mg.phoneNumber,
    name: mg.name,
    online: mg.online
  }
  store.commit('setCurrentUser', userInfo)

  if (mg.online) next()
  else {
    switch (to.name) {
      case 'Home': next(); break
      case 'HandsomeLogin': next(); break
      case 'NotFound': next(); break
      default:
        next({ name: 'NotFound' })
        break
    }
  }
})

export { router }
