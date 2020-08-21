import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 引入全局样式
import '@/assets/css/index.scss'
import '@/plugins/vant.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
