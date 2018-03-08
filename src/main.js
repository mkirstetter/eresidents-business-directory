// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueSimplemde from 'vue-simplemde';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import Vue2Filters from 'vue2-filters';
import VeeValidate from 'vee-validate';
import App from './App';
import router from './router';
import { gaId } from './vueAnalytics';
import { store } from './store/store';

Vue.config.productionTip = false;

require('bootstrap');

Vue.use(VueLodash, lodash, Vue2Filters, VueSimplemde, require('vue-moment'), require('moment-timezone'));

Vue.use(VeeValidate);

Vue.use(VueAnalytics, {
  id: gaId,
  router,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
