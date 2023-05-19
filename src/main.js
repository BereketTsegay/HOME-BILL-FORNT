import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import { initialize } from './helpers/initialize'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


Vue.use(Buefy)

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
initialize(store, router);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
