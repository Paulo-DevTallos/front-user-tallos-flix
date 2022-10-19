import BootstrapVue3 from 'bootstrap-vue-3';
import { createApp } from 'vue';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import StarRating from 'vue3-star-ratings';
import App from './App.vue';

//imports css
import './assets/base.css';
import './assets/sass/main.scss';

import router from './router';
import store from './Store';
const app = createApp(App);

app.use(router);
app.use(BootstrapVue3);
app.use(store);
app.component('StarRating', StarRating);

app.mount('#app');
