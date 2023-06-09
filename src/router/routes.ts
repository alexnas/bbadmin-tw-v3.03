import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

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
    meta: {
      layout: AdminLayout,
      authRequired: true
    }
  },
  {
    path: '/city',
    name: 'Cities',
    component: () => import('../views/CitiesView.vue'),
    meta: {
      layout: AdminLayout,
      authRequired: true
    }
  },
  {
    path: '/company',
    name: 'Companies',
    component: () => import('../views/CompaniesView.vue'),
    meta: {
      layout: AdminLayout,
      authRequired: true
    }
  },
  {
    path: '/route',
    name: 'Routes',
    component: () => import('../views/RoutesView.vue'),
    meta: {
      layout: AdminLayout,
      authRequired: true
    }
  },
  {
    path: '/user',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: {
      layout: AdminLayout,
      authRequired: true
    }
  },
  {
    path: '/role',
    name: 'Roles',
    component: () => import('../views/RolesView.vue'),
    meta: {
      layout: AdminLayout,
      authRequired: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/AuthView.vue'),
    meta: { layout: AuthLayout }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { layout: AuthLayout }
  }
]

export default routes
