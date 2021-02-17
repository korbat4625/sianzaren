import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { router } from './router'
import { userAPI } from '@/api/user.js'
import { dbAPI } from '@/api/db.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'cropperjs/dist/cropper.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/main.scss'
import VueCookies from 'vue-cookies'

const showWatcherMsg = true

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.config.productionTip = false

window.cookieTool = Vue.$cookies
window.userAPI = userAPI
window.dbAPI = dbAPI
window.userAPI.loginStateWatcher(showWatcherMsg)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
