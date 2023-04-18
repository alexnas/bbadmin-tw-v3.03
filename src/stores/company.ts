import { onMounted, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import type { ICompany } from '@/types'
import { useImageStore } from '@/stores/image'
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

  const imageStore = useImageStore()
  const { selectedFile } = storeToRefs(imageStore)

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

  const getCompanyNameById = (id: number) => {
    try {
      const idx = companies.value.findIndex((company) => +company.id === +id)
      if (idx === -1) return

      return companies.value[idx].name
    } catch (error) {
      console.log(error)
      return ''
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

    const formData = new FormData()
    formData.append('files', selectedFile.value as any)
    formData.append('name', companyItem.name)
    formData.append('fullname', companyItem.fullname)
    formData.append('description', companyItem.description)
    formData.append('rating', String(companyItem.rating))
    formData.append('logo', companyItem.logo)

    try {
      loading.value = true
      const result = await axios.post(companyApi, formData, {
        headers: {
          'Content-Type': `multipart/form-data}`
        }
      })

      companies.value.push(result.data)

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

    const formData = new FormData()
    formData.append('files', selectedFile.value as any)
    formData.append('id', String(id))
    formData.append('name', companyItem.name)
    formData.append('fullname', companyItem.fullname)
    formData.append('description', companyItem.description)
    formData.append('rating', String(companyItem.rating))
    formData.append('logo', companyItem.logo)

    try {
      loading.value = true
      const { data } = await axios.put(`${companyApi}/${id}`, formData)
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
    getCompanyNameById,
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
