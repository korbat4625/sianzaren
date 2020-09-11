import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

/*

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyACSYQJGSEBeocXzdn2ug_56XUJQApB_Kk",
    authDomain: "sianzaren.firebaseapp.com",
    databaseURL: "https://sianzaren.firebaseio.com",
    projectId: "sianzaren",
    storageBucket: "sianzaren.appspot.com",
    messagingSenderId: "240803393974",
    appId: "1:240803393974:web:113b5f7ebaac4f167e5117",
    measurementId: "G-M9JLJ36S8S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>



*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
