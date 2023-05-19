import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    component: () => import('../views/auth/index.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
      },
      {
        path: 'forget_password',
        name:'ForgetPassword',
        component: ()=> import(/* webpackChunkName:"forget_password" */ '../views/auth/ForgetPassword.vue')
      },
      {
        path: 'reset_password',
        name:'ResetPassword',
        component: ()=> import(/* webpackChunkName:"forget_password" */ '../views/auth/RessetPassword.vue')
      },
     ],
  },
  
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('../views/index.vue'),
    children :[
      {
        path: '',
          name: 'Home',
          component: Home
      },
      {
        path: '/profile',
          name: 'Profile',
          component: ()=>import('../views/profile.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
