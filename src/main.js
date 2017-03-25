// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import jquery
var $ = require('jquery')

// assign to window object
window.jQuery = window.$ = $

import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import '@/assets/default.css'
import semantic from 'semantic'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(vueResource)
Vue.use(semantic)
Vue.http.options.root = 'http://localhost:8765'
Vue.http.headers.common['Accept'] = 'application/vnd.api+json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
import '../node_modules/semantic-ui-css/semantic.min.css'

