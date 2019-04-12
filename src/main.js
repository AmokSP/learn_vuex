// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './OrderStore'

import './css/amok-reboot.css'
import './css/amok-responsive.css'
import './css/amok-utils.css'




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  computed: {
    scrollTop:function() {
      return  document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    }
  },
})
