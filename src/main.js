import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-TW'
import VCharts from 'v-charts'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: '#409EFF',
  failedColor: '#409EFF',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.5s',
    termination: 700
  }
})

Vue.use(ElementUI, {locale});
Vue.use(VCharts);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
