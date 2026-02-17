import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/HomePage/index.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Login/Register.vue'
import Forget from '@/views/Login/Forget.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget,
  },
  {
    path: '/user/order',
    component: () => import('../views/user/OrderList.vue'),
  },
  {
    path: '/user/info',
    component: () => import('../views/user/AccountInfo.vue'),
  },
  {
    path: '/user/setting',
    component: () => import('../views/user/AccountSetting.vue'),
  },
  {
    path: '/user/address',
    component: () => import('../views/user/Address.vue'),
  },
  {
    path: '/user/contacts',
    component: () => import('../views/user/Contacts.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
