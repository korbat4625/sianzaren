import Vue from 'vue'
import VueRouter from 'vue-router'
import Backend from '../views/Backend.vue'
import AddArticle from '../components/AddArticle.vue'
import UserInfo from '../components/UserInfo.vue'
import store from '@/store/index.js'
// import { dbApi } from '@/api/db.js'
import { userApi } from '@/api/user.js'
Vue.use(VueRouter)

const siteCondition = 'fixing'
const showWatcherMsg = true
// const showDBManagerInfo = true
const routes = [
  {
    path: '/',
    name: 'Home',
    component: siteCondition === 'fixing' ? () => import('../views/Building.vue') : () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/HandsomeLogin',
    name: 'HandsomeLogin',
    component: () => import('../views/HandsomeLogin.vue')
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
        component: () => import('../components/ArticleEditor.vue')
      }
    ]
  },
  {
    path: '/article/:articleId',
    name: 'ArticlePage',
    component: () => import('../components/ArticlePage.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // fireModel.methods.F_checkLogin()
  // const mg = await dbApi.getDBManagerInfo(showDBManagerInfo)
  const mg = store.state
  console.log('manager:', mg)

  if (to.name === 'HandsomeLogin') {
    next()
    return true
  }
  if (to.name !== 'Home' && !mg) {
    next({ name: 'Home' })
    return true
  }
  if (to.name === 'NotFound') {
    next()
    return true
  } else next()
})

userApi.loginStateWatcher(showWatcherMsg)

export { router }
