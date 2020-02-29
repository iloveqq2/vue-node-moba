import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '/categories/edit',
        name: 'categoryEdit',
        component: () => import('../views/category/edit.vue')
      },
      {
        path: '/categories/create',
        name: 'categoryCreate',
        component: () => import('../views/category/create.vue')
      },
      {
        path: '/categories/list',
        name: 'categoryList',
        component: () => import('../views/category/list.vue')
      },
      {
        path: '/categories/edit/:id',
        name: 'categoryEdit',
        component: () => import('../views/category/edit.vue'),
        props:true,
      },
    ]
  },
  
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },{
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },{
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },{
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },{
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },{
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },{
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
