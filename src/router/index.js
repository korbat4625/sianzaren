import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Backend from '../views/Backend.vue'
import ArticleEditor from '../components/ArticleEditor.vue'
import UserInfo from '../components/UserInfo.vue'
import '../Model/FirebaseModel.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/backend',
    name: 'Backend',
    component: Backend,
    beforeEnter: (to, from, next) => {
      next()
    },
    children: [
      {
        path: 'article_editor',
        name: 'ArticleEditor',
        component: ArticleEditor
      },
      {
        path: 'user_info_editor',
        name: 'UserInfoEditor',
        component: UserInfo
      }
    ]
  },
  {
    path: '/article/:articleId',
    name: 'ArticlePage',
    component: () => import('../components/ArticlePage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { router }
