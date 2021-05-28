import {
    createApp
} from 'vue'
import VCalendar from '../node_modules/v-calendar';
import App from './App.vue'
import store from './store';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import '../node_modules/bulma/css/bulma.min.css'
import '../node_modules/animate.css/animate.min.css'

createApp(App)
    .use(VCalendar, {})
    .use(router)
    .use(store)
    .use(Vuelidate)
    .use(VueAxios, axios)
    .mount('#app')