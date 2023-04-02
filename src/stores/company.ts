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

  const setCurrentCompany = (province: ICompany) => {
    currentCompany.value = { ...province }
    return currentCompany.value
  }

  const cancelPreEditedCompany = () => {
    preEditedCompany.value = { ...initCompany }
  }

  const resetPreEditedCompany = () => {
    currentCompany.value = { ...preEditedCompany.value }
  }

  const setPreEditedCompany = (province: ICompany) => {
    preEditedCompany.value = { ...province }
    return preEditedCompany.value
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
    // createCompany,
    // updateCompany,
    // deleteCompany,
    setCurrentCompany,
    resetCurrentCompany,
    cancelPreEditedCompany,
    resetPreEditedCompany,
    setPreEditedCompany
  }
})
