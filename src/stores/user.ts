import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IUser } from '@/types'
import { API_BASE_URL, USER_ENDPOINT } from '@/constants/apiConstants'

const userApi = `${API_BASE_URL}${USER_ENDPOINT}`
const initUser: IUser = {
  id: -1,
  name: '',
  email: '',
  password: '',
  roleId: -1,
  isActive: true,
  createdAt: '',
  updatedAt: ''
}

export const useUserStore = defineStore('user', () => {
  const users = ref<IUser[]>([])
  const currentUser = ref<IUser>({ ...initUser })
  const preEditedUser = ref<IUser>({ ...initUser })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const getUsers = async () => {
    try {
      loading.value = true
      const { data } = await axios.get(userApi)
      users.value = data
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

  const resetCurrentUser = () => {
    preEditedUser.value = { ...initUser }
    currentUser.value = { ...initUser }
    return currentUser.value
  }

  const setCurrentUser = (user: IUser) => {
    currentUser.value = { ...user }
    return currentUser.value
  }

  const cancelPreEditedUser = () => {
    preEditedUser.value = { ...initUser }
  }

  const resetPreEditedUser = () => {
    currentUser.value = { ...preEditedUser.value }
  }

  const setPreEditedUser = (user: IUser) => {
    preEditedUser.value = { ...user }
    return preEditedUser.value
  }

  const createUser = async (userItem: IUser) => {
    console.log('createUser', userItem)
  }

  const updateUser = async (userItem: IUser) => {
    console.log('updateUser', userItem)
  }

  const deleteUser = async (userItem: IUser) => {
    console.log('deleteUser', userItem)
  }

  onMounted(async () => {
    await getUsers()
  })

  return {
    users,
    currentUser,
    preEditedUser,
    loading,
    error,
    getUsers,
    resetCurrentUser,
    setCurrentUser,
    cancelPreEditedUser,
    resetPreEditedUser,
    setPreEditedUser,
    createUser,
    updateUser,
    deleteUser
  }
})
