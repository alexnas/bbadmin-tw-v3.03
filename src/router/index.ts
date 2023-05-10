import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const isAuth = localStorage.getItem('token')
  if (to.meta.authRequired && !isAuth) return '/login'
})

export default router
