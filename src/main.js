import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'

import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { date, currency } from './methods/filters'

import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency
}

app.use(router)
app.use(VueAxios, axios)
app.use(VueLoading)
app.component('VueLoading', VueLoading)

app.component('VueForm', Form)
app.component('VueField', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
