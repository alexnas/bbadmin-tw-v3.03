import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { layout: AdminLayout }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { layout: AdminLayout }
  },
  {
    path: '/province',
    name: 'Provinces',
    component: () => import('../views/ProvincesView.vue'),
    meta: { layout: AdminLayout }
  }
]

export default routes
