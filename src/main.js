import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './plugins/element.js'
import axios from 'axios';
import qs from 'qs';

Vue.prototype.$ajax = axios;
Vue.prototype.qs = qs;
Vue.prototype.api = "http://promise.flush.cache.jd.com";

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
