import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CircleButton from './components/circle-button'
import BaseModal from './components/modal.vue'

import './assets/css/normalize.css'
import './assets/css/skeleton.css'
import './assets/css/master.css'

Vue.config.productionTip = false
Vue.component('circle-button', CircleButton)
Vue.component('base-modal', BaseModal)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
