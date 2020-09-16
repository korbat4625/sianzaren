import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import showUser from './functions/showUser.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.mixin(showUser)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
