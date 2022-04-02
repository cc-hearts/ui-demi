import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/pages/notices-bar',
    name: 'notices-bar',
    component: () =>
      import(/* webpackChunkName: "notices-bar" */ '../test/noticebar.vue'),
  },
  {
    path: '/pages/input',
    name: 'pages input',
    component: () =>
      import(/* webpackChunkName: "notices-bar" */ '../test/input.vue'),
  },
  {
    path: '/pages/card',
    name: 'card',
    component: () => import(/* webpackChunkName: "card") */ '../test/card.vue'),
  },
  {
    path: '/pages/button',
    name: 'button',
    component: () =>
      import(/* webpackChunkName: "button" */ '../test/button.vue'),
  },
  {
    path: '/pages/visualButton',
    name: 'button',
    component: () =>
      import(/* webpackChunkName: "button" */ '../common/visual/button.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404 */ '../common/404/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
