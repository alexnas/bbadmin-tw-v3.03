import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

import axios from 'axios'
import type { IProvince } from '@/types'

const provinceApi = 'http://localhost:5000/api/province'

export const useProvinceStore = defineStore('provinces', () => {
  const provinces = ref<IProvince[]>([])
  const currentProvince = ref<IProvince | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getProfinces = async () => {
    try {
      loading.value = true
      const { data } = await axios.get(provinceApi)
      provinces.value = data
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

  const createProfince = async (provinceItem: IProvince) => {
    const idx = provinces.value.findIndex((item) => item.name === provinceItem.name)
    if (idx >= 0) {
      console.log(`Error: There is already such province instance with name=${provinceItem.name}`)
      throw Error(`There is already such province instance with name=${provinceItem.name}`)
    }

    const params = {
      name: provinceItem.name,
      description: provinceItem.description
    }

    try {
      loading.value = true
      const { data } = await axios.post(provinceApi, params)
      provinces.value.push(data)
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

  const updateProfince = async (provinceItem: IProvince) => {
    const id = provinceItem.id
    const idx = provinces.value.findIndex((item) => item.id === id)
    if (idx < 0) {
      console.log(`Error: There is no such province instance with id=${id}`)
      throw Error(`There is no such province instance with id=${id}`)
    }

    const params = {
      id: id,
      name: provinceItem.name,
      description: provinceItem.description
    }

    try {
      loading.value = true
      const { data } = await axios.put(`${provinceApi}/${id}`, params)
      provinces.value[idx] = data
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
    await getProfinces()
  })

  return {
    provinces,
    currentProvince,
    loading,
    error,
    getProfinces,
    createProfince,
    updateProfince
  }
})
