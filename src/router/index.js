import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import 'materialize-css/dist/js/materialize.min'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/Categories'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    component: () => import('@/views/DetailRecord'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('@/views/Planning'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('@/views/Record'),
    meta: {
      layout: 'main'
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
