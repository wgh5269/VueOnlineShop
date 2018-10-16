import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../views/goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    }
  ]
})
