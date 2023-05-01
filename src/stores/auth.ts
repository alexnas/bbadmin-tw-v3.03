import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IUser } from '@/types'
import { initUser } from '@/stores/user'
import { API_BASE_URL, CHECK_USER_ENDPOINT, LOGIN_ENDPOINT } from '@/constants/apiConstants'
import { defaultAPIInstance } from '@/api'

const checkUserApi = `${API_BASE_URL}${CHECK_USER_ENDPOINT}`
const loginApi = `${API_BASE_URL}${LOGIN_ENDPOINT}`

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref<boolean>(false)
  const isRegistered = ref<boolean>(true)
  const loggedUser = ref<IUser>(initUser)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const setAuthState = () => {
    isAuth.value = true
  }

  const resetAuthState = () => {
    isAuth.value = false
    isRegistered.value = false
    loggedUser.value = initUser
  }

  const toggleRegistered = () => {
    console.log('isRegistered.value 1', isRegistered.value)
    isRegistered.value = !isRegistered.value
    console.log('isRegistered.value 2', isRegistered.value)
  }

  const setLoggedUser = (user: IUser) => {
    loggedUser.value = user
    isAuth.value = true
    isRegistered.value = true
  }

  const logout = () => {
    resetAuthState()
  }

  const checkUserExist = async (email: string) => {
    try {
      loading.value = true
      const { data } = await defaultAPIInstance.get(`${checkUserApi}?email=${email}`)
      loading.value = false
      error.value = null
      return data
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

  const loginUser = async (user: IUser) => {
    const params = {
      email: user.email,
      password: user.password
    }

    try {
      loading.value = true
      const { data } = await defaultAPIInstance.post('/auth/login', params)

      console.log('data after login', data)

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
    isAuth,
    isRegistered,
    loggedUser,
    setAuthState,
    resetAuthState,
    toggleRegistered,
    setLoggedUser,
    logout,
    loginUser,
    checkUserExist
  }
})
