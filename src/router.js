import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/Home.vue'
import Ep01 from '@/views/ep01/demo'
import SGD from '@/views/sgd/demo'
import Metallurgy from '@/views/metallurgy/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sa',
      name: 'Simulated Annealing',
      component: Ep01
    },

    {
      path: '/sgd',
      name: 'Simulated Annealing',
      component: SGD
    },
    {
      path: '/metallurgy',
      name: 'Metallurgy',
      component: Metallurgy
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    }
  ]
})
