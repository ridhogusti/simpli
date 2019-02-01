// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import i18n from './lang/lang'
import store from './store'
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options);
// import { CHECK_AUTH } from '@/store/actions.type'
// import httpInterceptors from './helpers/httpInterceptors'
import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
Vue.use(Vuetify, {
  iconfont: 'mdi',
  icons: {
    'checked': 'mdi-check'
  },
  theme: {
    primary: '#6747cd',
    secondary: '#6747cd',
    accent: '#6747cd',
    error: '#ed2855',
    white: '#ffffff',
    background: '#f2f2f2',
    cardcolor: '#1fcaaf',
    lightBlueGrey: '#d4dbee',
    silver: '#dcdde1',
    blubery: '#3f2984',
    cyan_button: '#1fcaaf',
    blueberry:'#3f2984'
    
  }
})
Vue.use(require('vue-moment'))

// Vue.use(httpInterceptors)

Vue.config.productionTip = false

ApiService.init()

// Ensure we checked auth before each page load.
router.beforeEach(
  (to, from, next) => {
    if (to.path !== '/login') {
      if (JwtService.getToken()) {
        next()
      } else {
        next('login')
      }
    } else {
      next() // This is where it should have been
    }
  }
)

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

window['vue'] = app
window.store = store
