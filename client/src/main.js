import {
    createApp
} from 'vue'
import VCalendar from '../node_modules/v-calendar';
import App from './App.vue'
import store from './store';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bulma'
import 'animate.css'
import '../src/assets/loader.css'

createApp(App)
    .use(VCalendar, {})
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');