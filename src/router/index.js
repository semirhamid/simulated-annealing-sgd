import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import EP01 from '@/views/ep01/demo'
import SGD from '@/views/sgd/demo'
import Metallurgy from '@/views/metallurgy/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ep01',
      name: 'EP01',
      component: EP01
    },
    {
      path: '/sgd',
      name: 'SGD',
      component: SGD
    },
    {
      path: '/metallurgy',
      name: 'Metallurgy',
      component: Metallurgy
    }
  ]
}) 