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
    console.log('provinces in Pinia', provinces.value)
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

  onMounted(async () => {
    await getProfinces()
  })

  return { provinces, currentProvince, loading, error, getProfinces }
})
