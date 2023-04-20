import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IRole } from '@/types'
import { API_BASE_URL, ROLE_ENDPOINT } from '@/constants/apiConstants'

const roleApi = `${API_BASE_URL}${ROLE_ENDPOINT}`
const initRole: IRole = {
  id: -1,
  name: '',
  description: '',
  createdAt: '',
  updatedAt: ''
}

export const useRoleStore = defineStore('roles', () => {
  const roles = ref<IRole[]>([])
  const currentRole = ref<IRole>({ ...initRole })
  const preEditedRole = ref<IRole>({ ...initRole })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getRoles = async () => {
    try {
      loading.value = true
      const { data } = await axios.get(roleApi)
      roles.value = data
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

  const resetCurrentRole = () => {
    preEditedRole.value = { ...initRole }
    currentRole.value = { ...initRole }
    return currentRole.value
  }

  const setCurrentRole = (role: IRole) => {
    currentRole.value = { ...role }
    return currentRole.value
  }

  const cancelPreEditedRole = () => {
    preEditedRole.value = { ...initRole }
  }

  const resetPreEditedRole = () => {
    currentRole.value = { ...preEditedRole.value }
  }

  const setPreEditedRole = (role: IRole) => {
    preEditedRole.value = { ...role }
    return preEditedRole.value
  }

  const createRole = async (roleItem: IRole) => {
    console.log('createRole', roleItem)
  }

  const updateRole = async (roleItem: IRole) => {
    console.log('updateRole', roleItem)
  }

  const deleteRole = async (roleItem: IRole) => {
    console.log('deleteRole', roleItem)
  }

  onMounted(async () => {
    await getRoles()
  })

  return {
    roles,
    currentRole,
    preEditedRole,
    loading,
    error,
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    setCurrentRole,
    resetCurrentRole,
    cancelPreEditedRole,
    resetPreEditedRole,
    setPreEditedRole
  }
})
