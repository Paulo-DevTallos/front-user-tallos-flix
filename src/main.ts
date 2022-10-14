import BootstrapVue3 from 'bootstrap-vue-3';
import { createApp } from 'vue';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import './assets/main.css';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(BootstrapVue3);

app.mount('#app');
