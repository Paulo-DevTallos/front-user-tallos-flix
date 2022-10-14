import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';
import Store from './Store';
import './assets/main.css';

const app = createApp(App);

app.use(router);
app.use(BootstrapVue3);
app.use(Store)

app.mount('#app');
