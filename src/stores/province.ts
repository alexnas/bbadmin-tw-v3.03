import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IProvince, IProvinceKeys } from '@/types'
import { makeSortedByProperty } from '@/tools/commonTools'
import { API_BASE_URL, PROVINCE_ENDPOINT } from '@/constants/apiConstants'

const provinceApi = `${API_BASE_URL}${PROVINCE_ENDPOINT}`
const initProvince: IProvince = {
  id: -1,
  name: '',
  description: '',
  createdAt: '',
  updatedAt: ''
}

export const useProvinceStore = defineStore('provinces', () => {
  const provinces = ref<IProvince[]>([])
  const currentProvince = ref<IProvince>({ ...initProvince })
  const preEditedProvince = ref<IProvince>({ ...initProvince })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const sortProperty = ref<IProvinceKeys>('name')
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const filterStr = ref<string>('')

  const filteredProvinces = computed(() => {
    const filtered = provinces.value.filter((item) => {
      if (filterStr.value.trim() === '') return true
      const isFound =
        item.name.toLowerCase().indexOf(filterStr.value.toLowerCase()) >= 0 ||
        item.description.toLowerCase().indexOf(filterStr.value.toLowerCase()) >= 0
      return isFound
    })
    return filtered
  })

  const sortedProvinces = computed(() => {
    const sorted = [...filteredProvinces.value]
    sorted.sort(makeSortedByProperty(sortProperty.value, sortOrder.value))
    return sorted
  })

  const getProvinces = async () => {
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

  const resetCurrentProvince = () => {
    preEditedProvince.value = { ...initProvince }
    currentProvince.value = { ...initProvince }
    return currentProvince.value
  }

  const setCurrentProvince = (province: IProvince) => {
    currentProvince.value = { ...province }
    return currentProvince.value
  }

  const cancelPreEditedProvince = () => {
    preEditedProvince.value = { ...initProvince }
  }

  const resetPreEditedProvince = () => {
    currentProvince.value = { ...preEditedProvince.value }
  }

  const setPreEditedProvince = (province: IProvince) => {
    preEditedProvince.value = { ...province }
    return preEditedProvince.value
  }

  const createProvince = async (provinceItem: IProvince) => {
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

  const updateProvince = async (provinceItem: IProvince) => {
    const id = provinceItem.id
    const idx = provinces.value.findIndex((item) => item.id === id)
    if (idx === -1) {
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

  const deleteProvince = async (provinceItem: IProvince) => {
    const id = provinceItem.id
    const idx = provinces.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such province instance with id=${id}`)
      throw Error(`There is no such province instance with id=${id}`)
    }

    try {
      loading.value = true
      await axios.delete(`${provinceApi}/${id}`)
      provinces.value = provinces.value.filter((item) => item.id !== id)
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
    await getProvinces()
  })

  return {
    provinces,
    currentProvince,
    preEditedProvince,
    loading,
    error,
    filterStr,
    filteredProvinces,
    sortProperty,
    sortOrder,
    sortedProvinces,
    getProvinces,
    createProvince,
    updateProvince,
    deleteProvince,
    setCurrentProvince,
    resetCurrentProvince,
    cancelPreEditedProvince,
    resetPreEditedProvince,
    setPreEditedProvince
  }
})
