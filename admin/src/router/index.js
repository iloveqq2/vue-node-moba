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
        component: () => import('../views/category/edit.vue')
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
      {
        path: '/items/create',
        name: 'itemsCreate',
        component: () => import('../views/items/edit.vue')
      },
      {
        path: '/items/list',
        name: 'itemsList',
        component: () => import('../views/items/list.vue')
      },
      {
        path: '/items/edit/:id',
        name: 'itemsEdit',
        component: () => import('../views/items/edit.vue'),
        props:true,
      },
      {
        path: '/heroes/create',
        name: 'heroCreate',
        component: () => import('../views/heroes/edit.vue')
      },
      {
        path: '/heroes/list',
        name: 'heroList',
        component: () => import('../views/heroes/list.vue')
      },
      {
        path: '/heroes/edit/:id',
        name: 'heroEdit',
        component: () => import('../views/heroes/edit.vue'),
        props:true,
      },
      {
        path: '/articles/create',
        name: 'articleCreate',
        component: () => import('../views/articles/edit.vue')
      },
      {
        path: '/articles/list',
        name: 'articleList',
        component: () => import('../views/articles/list.vue')
      },
      {
        path: '/articles/edit/:id',
        name: 'articleEdit',
        component: () => import('../views/articles/edit.vue'),
        props:true,
      },
      {
        path: '/ads/create',
        name: 'adCreate',
        component: () => import('../views/ads/edit.vue')
      },
      {
        path: '/ads/list',
        name: 'adList',
        component: () => import('../views/ads/list.vue')
      },
      {
        path: '/ads/edit/:id',
        name: 'adEdit',
        component: () => import('../views/ads/edit.vue'),
        props:true,
      },
      {
        path: '/admin/create',
        name: 'adminCreate',
        component: () => import('../views/admin/edit.vue')
      },
      {
        path: '/admin/list',
        name: 'adminList',
        component: () => import('../views/admin/list.vue')
      },
      {
        path: '/admin/edit/:id',
        name: 'adminEdit',
        component: () => import('../views/admin/edit.vue'),
        props:true,
      },
    ]
  },
  
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta:{isPublic:true}
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
