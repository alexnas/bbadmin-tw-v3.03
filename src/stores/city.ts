import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
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

export const useCityStore = defineStore('city', () => {
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

  const resetCurrentCity = () => {
    preEditedCity.value = { ...initCity }
    currentCity.value = { ...initCity }
    return currentCity.value
  }

  const setCurrentCity = (city: ICity) => {
    currentCity.value = { ...city }
    return currentCity.value
  }

  const cancelPreEditedCity = () => {
    preEditedCity.value = { ...initCity }
  }

  const resetPreEditedCity = () => {
    currentCity.value = { ...preEditedCity.value }
  }

  const setPreEditedCity = (city: ICity) => {
    preEditedCity.value = { ...city }
    return preEditedCity.value
  }

  const createCity = async (cityItem: ICity) => {
    const idx = cities.value.findIndex((item) => item.name === cityItem.name)
    if (idx >= 0) {
      console.log(`Error: There is already such city instance with name=${cityItem.name}`)
      throw Error(`There is already such city instance with name=${cityItem.name}`)
    }

    const params = {
      name: cityItem.name,
      description: cityItem.description,
      provinceId: cityItem.provinceId
    }

    try {
      loading.value = true
      const { data } = await axios.post(cityApi, params)
      cities.value.push(data)
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

  const updateCity = async (cityItem: ICity) => {
    const id = cityItem.id
    const idx = cities.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such city instance with id=${id}`)
      throw Error(`There is no such city instance with id=${id}`)
    }

    const params = {
      id: id,
      name: cityItem.name,
      description: cityItem.description,
      provinceId: cityItem.provinceId
    }

    try {
      loading.value = true
      const { data } = await axios.put(`${cityApi}/${id}`, params)
      cities.value[idx] = data
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

  const deleteCity = async (cityItem: ICity) => {
    const id = cityItem.id
    const idx = cities.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such city instance with id=${id}`)
      throw Error(`There is no such city instance with id=${id}`)
    }

    try {
      loading.value = true
      await axios.delete(`${cityApi}/${id}`)
      cities.value = cities.value.filter((item) => item.id !== id)
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
    getCities,
    resetCurrentCity,
    setCurrentCity,
    cancelPreEditedCity,
    resetPreEditedCity,
    setPreEditedCity,
    createCity,
    updateCity,
    deleteCity
  }
})
