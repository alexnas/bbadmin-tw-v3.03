import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { ICity } from '@/types'

const cityApi = 'http://localhost:5000/api/city'
const initCity: ICity = {
  id: -1,
  name: '',
  provinceId: -1,
  description: '',
  createdAt: '',
  updatedAt: ''
}

export const useCityStore = defineStore('cities', () => {
  const cities = ref<ICity[]>([])
  const currentCity = ref<ICity>({ ...initCity })
  const preEditedCity = ref<ICity>({ ...initCity })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getCities = async () => {
    try {
      loading.value = true
      const { data } = await axios.get(cityApi)
      cities.value = data
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
    await getCities()
  })

  return {
    cities,
    currentCity,
    preEditedCity,
    loading,
    error,
    getCities
  }
})
