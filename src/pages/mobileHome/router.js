import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['./views/Home.vue'], resolve),
    },
  ],
});

export default router;
