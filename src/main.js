import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import zhLocale from 'element-ui/lib/locale/lang/zh-TW'
// import enLocale from 'element-ui/lib/locale/lang/en'
import {messages} from './i18n'
import VCharts from 'v-charts'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueI18n);


const i18n = new VueI18n({
  locale: 'zh_TW', // set locale
  messages, // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// Vue.use(ElementUI, {locale});
Vue.use(VCharts);
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
