import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import App from './App.vue'
import router from './router'
// import { apply } from 'core-js/fn/reflect'
import VueAxios from 'vue-axios'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { date, currency } from './methods/filters'

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency
}
app.use(router)
app.use(VueAxios, axios)
app.use(VueLoading)
app.mount('#app')
