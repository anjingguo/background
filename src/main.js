import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { getStore } from '@/config/mUtils.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  if (!to.meta.isAuth) {
    next('/')
    return
  }
  if (to.path === '/') {
    next()
    return
  }
  if (getStore('user')) {
    next()
  } else {
    next('/')
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
