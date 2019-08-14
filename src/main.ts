import Vue from 'vue'
import RouteView from './RouteView.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '@/styles/main.scss';

import "./lightgallery/lightgallery.js";
import "lg-thumbnail.js/dist/lg-thumbnail.min.js";
import "lg-zoom.js/dist/lg-zoom.min.js";

import 'element-ui/lib/theme-chalk/index.css';
import 'material-icons/iconfont/material-icons.css';
import "@/lightgallery/lightgallery.min.css";

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(RouteView)
}).$mount('#app')
