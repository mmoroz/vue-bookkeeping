import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import 'materialize-css/dist/js/materialize.min'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/Categories'),
    meta: {
      layout: 'main'
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
