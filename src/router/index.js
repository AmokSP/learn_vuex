import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/pages/ProductList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StoreDetail',
      component: ProductList
    }
  ]
})
