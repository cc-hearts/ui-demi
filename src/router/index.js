import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'studentForm',
    component: () => import('../pages/form/index.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
