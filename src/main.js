import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';
import YmapPlugin from 'vue-yandex-maps';

import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueResource);


const options = {
  apiKey: 'f10d20c1-6474-49af-bbdd-8bed30acb5cb',
  lang: 'ru_RU',
  version: '2.1',
};

Vue.use(YmapPlugin, options);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
