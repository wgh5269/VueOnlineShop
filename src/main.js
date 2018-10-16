// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import Vueinfinite from 'vue-infinite-scroll'
Vue.config.productionTip = false;
Vue.use(VueLazyLoad,{
  loadimg:"/static/loading-svg/loading-bubbles.svg",
});
Vue.use(Vueinfinite)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
