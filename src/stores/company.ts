import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { ICompany } from '@/types'
import { API_BASE_URL, COMPANY_ENDPOINT } from '@/constants/apiConstants'

const companyApi = `${API_BASE_URL}${COMPANY_ENDPOINT}`
const initCompany: ICompany = {
  id: -1,
  name: '',
  fullname: '',
  logo: '',
  rating: -1,
  description: '',
  createdAt: '',
  updatedAt: ''
}

export const useCompanyStore = defineStore('company', () => {
  const companies = ref<ICompany[]>([])
  const currentCompany = ref<ICompany>({ ...initCompany })
  const preEditedCompany = ref<ICompany>({ ...initCompany })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getCompanies = async () => {
    try {
      loading.value = true
      const { data } = await axios.get(companyApi)
      companies.value = data
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

  const resetCurrentCompany = () => {
    preEditedCompany.value = { ...initCompany }
    currentCompany.value = { ...initCompany }
    return currentCompany.value
  }

  const setCurrentCompany = (company: ICompany) => {
    currentCompany.value = { ...company }
    return currentCompany.value
  }

  const cancelPreEditedCompany = () => {
    preEditedCompany.value = { ...initCompany }
  }

  const resetPreEditedCompany = () => {
    currentCompany.value = { ...preEditedCompany.value }
  }

  const setPreEditedCompany = (company: ICompany) => {
    preEditedCompany.value = { ...company }
    return preEditedCompany.value
  }

  const createCompany = async (companyItem: ICompany) => {
    const idx = companies.value.findIndex((item) => item.name === companyItem.name)
    if (idx >= 0) {
      console.log(`Error: There is already such company instance with name=${companyItem.name}`)
      throw Error(`There is already such company instance with name=${companyItem.name}`)
    }

    const params = {
      name: companyItem.name,
      fullname: companyItem.fullname,
      description: companyItem.description,
      rating: companyItem.rating,
      logo: companyItem.logo
    }

    try {
      loading.value = true
      const { data } = await axios.post(companyApi, params)
      companies.value.push(data)
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

  const updateCompany = async (companyItem: ICompany) => {
    const id = companyItem.id
    const idx = companies.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such company instance with id=${id}`)
      throw Error(`There is no such company instance with id=${id}`)
    }

    const params = {
      id: id,
      name: companyItem.name,
      fullname: companyItem.fullname,
      description: companyItem.description,
      rating: companyItem.rating,
      logo: companyItem.logo
    }

    try {
      loading.value = true
      const { data } = await axios.put(`${companyApi}/${id}`, params)
      companies.value[idx] = data
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

  const deleteCompany = async (companyItem: ICompany) => {
    const id = companyItem.id
    const idx = companies.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such company instance with id=${id}`)
      throw Error(`There is no such company instance with id=${id}`)
    }

    try {
      loading.value = true
      await axios.delete(`${companyApi}/${id}`)
      companies.value = companies.value.filter((item) => item.id !== id)
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
    await getCompanies()
  })

  return {
    companies,
    currentCompany,
    preEditedCompany,
    loading,
    error,
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    setCurrentCompany,
    resetCurrentCompany,
    cancelPreEditedCompany,
    resetPreEditedCompany,
    setPreEditedCompany
  }
})
