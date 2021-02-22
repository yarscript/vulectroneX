import Vue    from 'vue';
import App    from './App.vue';
import './registerServiceWorker';
import router from './http';
import store  from './store';
import axios  from "axios";

import { BootstrapVue } from 'bootstrap-vue';

import './scss/app.scss';


Vue.config.productionTip = false;
Vue.prototype.$http = window.axios = axios;

const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}
if (process.env.NODE_ENV !== 'production') {
    Vue.prototype.$http.defaults.headers.common['XDEBUG_SESSION_START'] = 'PHPSTORM';
}


Vue.use(BootstrapVue)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
