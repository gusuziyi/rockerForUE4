import 'amfe-flexible';
import '@/assets/less/base.less';
import Vue from 'vue';
import { Button, NavBar, Loading, Icon, Popup, Field } from 'vant';
import Vconsole from 'vconsole';
import '@/utils/components.js';

import store from '@/store';
import App from './App';
import router from './router';
import 'vant/lib/index.less';

Vue.use(Icon);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Loading);
Vue.use(Popup);
Vue.use(Field);

// Vue.prototype.$vConsole = new Vconsole();
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
});
