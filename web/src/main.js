import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'

import Card from './components/Card'
Vue.component('m-card',Card)

Vue.use(VueAwesomeSwiper, )
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
