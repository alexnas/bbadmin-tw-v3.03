import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import type { IUser, IUserKeys } from '@/types'
import { useRoleStore } from '@/stores/role'
import { makeSortedByProperty } from '@/tools/commonTools'
import UserService from '@/services/UserService'
import { API_BASE_URL, USER_ENDPOINT } from '@/constants/apiConstants'
import { sortedByRole } from '@/tools/sortTools'

const userApi = `${API_BASE_URL}${USER_ENDPOINT}`
export const initUser: IUser = {
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
  const roleStore = useRoleStore()
  const { roles } = storeToRefs(roleStore)
  const users = ref<IUser[]>([])
  const currentUser = ref<IUser>({ ...initUser })
  const preEditedUser = ref<IUser>({ ...initUser })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const sortProperty = ref<IUserKeys>('name')
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const filterStr = ref<string>('')

  const filteredUsers = computed(() => {
    const filtered = users.value.filter((item) => {
      if (filterStr.value.trim() === '') return true
      const isFound =
        item.name.toLowerCase().indexOf(filterStr.value.toLowerCase()) >= 0 ||
        item.email.toLowerCase().indexOf(filterStr.value.toLowerCase()) >= 0
      return isFound
    })
    return filtered
  })

  const sortedUsers = computed(() => {
    const sorted = [...filteredUsers.value]
    if (sortProperty.value === 'roleId') {
      sorted.sort(sortedByRole(sortProperty.value, sortOrder.value, roles.value))
    } else {
      sorted.sort(makeSortedByProperty(sortProperty.value, sortOrder.value))
    }
    return sorted
  })

  const getUsers = async () => {
    try {
      loading.value = true
      const { data } = await UserService.fetchUsers()
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
    const idx = users.value.findIndex((item) => item.email === userItem.email)
    if (idx >= 0) {
      console.log(`Error: There is already such user instance with email=${userItem.email}`)
      throw Error(`There is already such user instance with email=${userItem.email}`)
    }

    const params = { ...userItem }

    try {
      loading.value = true
      const { data } = await axios.post(userApi, params)
      users.value.push(data)
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

  const updateUser = async (userItem: IUser) => {
    const id = userItem.id
    const idx = users.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such user instance with id=${id}`)
      throw Error(`There is no such user instance with id=${id}`)
    }

    const params = { ...userItem }

    try {
      loading.value = true
      const { data } = await axios.put(`${userApi}/${id}`, params)
      users.value[idx] = data
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

  const deleteUser = async (userItem: IUser) => {
    const id = userItem.id
    const idx = users.value.findIndex((item) => item.id === id)
    if (idx === -1) {
      console.log(`Error: There is no such user instance with id=${id}`)
      throw Error(`There is no such user instance with id=${id}`)
    }

    try {
      loading.value = true
      await axios.delete(`${userApi}/${id}`)
      users.value = users.value.filter((item) => item.id !== id)
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

  return {
    users,
    currentUser,
    preEditedUser,
    loading,
    error,
    filterStr,
    filteredUsers,
    sortProperty,
    sortOrder,
    sortedUsers,
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
