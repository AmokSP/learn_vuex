import Vue from 'vue'
import Router from 'vue-router'
import StoreDetail from '@/pages/StoreDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StoreDetail',
      component: StoreDetail
    }
  ]
})
