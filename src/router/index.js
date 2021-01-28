import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component:()=>import('@/views/admin.vue')
  },
  {
    path: '/index',
    name: 'index',
    component:()=>import('@/views/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
