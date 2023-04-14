import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IRoute } from '@/types'
import { API_BASE_URL, ROUTE_ENDPOINT } from '@/constants/apiConstants'

const routeApi = `${API_BASE_URL}${ROUTE_ENDPOINT}`
const initRoute: IRoute = {
  id: -1,
  name: '',
  companyId: -1,
  startCityId: -1,
  endCityId: -1,
  viaCityId: -1,
  start_time: '',
  end_time: '',
  price: -1,
  distance: -1,
  startTerminalId: -1,
  endTerminalId: -1,
  busInfoId: -1,
  description: '',
  createdAt: '',
  updatedAt: ''
}

export const useRouteStore = defineStore('route', () => {
  const routes = ref<IRoute[]>([])
  const currentRoute = ref<IRoute>({ ...initRoute })
  const preEditedRoute = ref<IRoute>({ ...initRoute })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getRoutes = async () => {
    try {
      loading.value = true
      const { data } = await axios.get(routeApi)
      routes.value = data
      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const resetCurrentRoute = () => {
    preEditedRoute.value = { ...initRoute }
    currentRoute.value = { ...initRoute }
    return currentRoute.value
  }

  const setCurrentRoute = (route: IRoute) => {
    currentRoute.value = { ...route }
    return currentRoute.value
  }

  const cancelPreEditedRoute = () => {
    preEditedRoute.value = { ...initRoute }
  }

  const resetPreEditedRoute = () => {
    currentRoute.value = { ...preEditedRoute.value }
  }

  const setPreEditedRoute = (route: IRoute) => {
    preEditedRoute.value = { ...route }
    return preEditedRoute.value
  }

  const updateRoute = async (routeItem: IRoute) => {
    console.log('editRoute')
  }

  const deleteRoute = async (routeItem: IRoute) => {
    console.log('deleteRoute', routeItem)
  }

  onMounted(async () => {
    await getRoutes()
  })

  return {
    routes,
    currentRoute,
    preEditedRoute,
    loading,
    error,
    getRoutes,
    resetCurrentRoute,
    setCurrentRoute,
    cancelPreEditedRoute,
    resetPreEditedRoute,
    setPreEditedRoute,
    updateRoute,
    deleteRoute
  }
})
