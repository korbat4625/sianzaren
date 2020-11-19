import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import { userApi } from '@/api/user.js'
import { dbApi } from '@/api/db.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'cropperjs/dist/cropper.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies'

const showWatcherMsg = true

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.config.productionTip = false

window.cookieTool = Vue.$cookies
window.userApi = userApi
window.dbApi = dbApi
window.userApi.loginStateWatcher(showWatcherMsg)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
