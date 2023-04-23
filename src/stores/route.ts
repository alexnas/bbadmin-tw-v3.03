import { onMounted, ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import type { IRoute } from '@/types'
import { useCityStore } from '@/stores/city'
import { API_BASE_URL, ROUTE_ENDPOINT } from '@/constants/apiConstants'
import { useItemNameById } from '@/composables/ItemsById'

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

  const routeName = computed(() => {
    const cityStore = useCityStore()
    const { cities } = storeToRefs(cityStore)

    const startCityName = useItemNameById(currentRoute.value.startCityId, cities.value)
    const endCityName = useItemNameById(currentRoute.value.endCityId, cities.value)
    const viaCityName = useItemNameById(currentRoute.value.viaCityId, cities.value)

    const via = viaCityName === '' ? '-' : `-(${viaCityName})-`

    if (startCityName === '' && endCityName === '' && viaCityName === '') {
      return 'Noname'
    }

    return `${startCityName}${via}${endCityName}`
  })

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

  const createRoute = async (routeItem: IRoute) => {
    const idx = routes.value.findIndex((item) => item.name === routeItem.name)
    if (idx >= 0) {
      console.log(`Error: There is already such route instance with name=${routeItem.name}`)
      throw Error(`There is already such route instance with name=${routeItem.name}`)
    }

    const params = { ...routeItem }

    try {
      loading.value = true
      const { data } = await axios.post(routeApi, params)

      routes.value.push(data)
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

  const updateRoute = async (routeItem: IRoute) => {
    const id = routeItem.id
    const idx = routes.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such route instance with id=${id}`)
      throw Error(`There is no such route instance with id=${id}`)
    }

    const params = { ...routeItem }

    try {
      loading.value = true

      const { data } = await axios.put(`${routeApi}/${id}`, params)
      routes.value[idx] = data
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

  const deleteRoute = async (routeItem: IRoute) => {
    const id = routeItem.id
    const idx = routes.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such route instance with id=${id}`)
      throw Error(`There is no such route instance with id=${id}`)
    }

    try {
      loading.value = true
      await axios.delete(`${routeApi}/${id}`)
      routes.value = routes.value.filter((item) => item.id !== id)
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

  onMounted(async () => {
    await getRoutes()
  })

  return {
    routes,
    routeName,
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
    createRoute,
    updateRoute,
    deleteRoute
  }
})
