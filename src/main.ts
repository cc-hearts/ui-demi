import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './permission';
import 'nprogress/nprogress.css';
import './index.less';
import '@/assets/font/iconfont.css';
import '@/assets/font2/iconfont.css';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
