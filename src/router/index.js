import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/admin'
  },
  {
    path:'/admin',
    name:'admin',
    component:()=>import('../views/admin.vue'),
    
  },
  {
    path:'/index',
    name:'index',
    component:()=>import('../views/index.vue'),
    redirect:"/page",
    children:[
      {
        path:'/Form',
        name:'Form',
        component:()=>import('../views/Form.vue')
      },
      {
        path:'/page',
        name:'page',
        component:()=>import('../views/page.vue')
      },
      {
        path:'/eatch',
        name:'eatch',
        component:()=>import('../views/eatch.vue')
      },
      {
        path:'/LineChart',
        name:'LineChart',
        component:()=>import('../views/LineChart.vue')
      },
      {
        path:'/PieChart',
        name:'PieChart',
        component:()=>import('../views/PieChart.vue')
      },
      {
        path:'/RenderForm',
        name:'RenderForm',
        component:()=>import('../views/RenderForm.vue')
      },
      {
        path:'/test',
        name:'test',
        component:()=>import('../views/test.vue')
      },

    ]
  },
  

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
