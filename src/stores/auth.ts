import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { AuthResponse, IUser } from '@/types'
import { initUser } from '@/stores/user'
import AuthService from '@/services/AuthService'
import { API_BASE_URL, REFRESH_ENDPOINT } from '@/constants/apiConstants'

const refreshApi = `${API_BASE_URL}${REFRESH_ENDPOINT}`

export const useAuthStore = defineStore('auth', () => {
  const isLoginForm = ref<boolean>(true)
  const isUserInDb = ref<boolean>(false)
  const currentUser = ref<IUser>({ ...initUser })
  const loggedUser = ref<IUser>({ ...initUser })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const isAuth = computed(() => {
    return loggedUser.value && !!loggedUser.value.email
  })

  const resetCurrentUser = () => {
    currentUser.value = { ...initUser }
  }

  const checkUserExist = async (email: string) => {
    if (currentUser.value.email.trim() === '') return

    try {
      loading.value = true
      const { data } = await AuthService.checkIfUserExist(email)
      isUserInDb.value = !!data

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

  const login = async () => {
    const { email, password } = currentUser.value

    try {
      loading.value = true
      const response = await AuthService.login(email, password)

      setupToken(response.data)
      loading.value = false
      error.value = null
    } catch (err: any) {
      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.error.message
        console.log('Error', err.message)
      } else if (+err.response.status === 403) {
        error.value = 'Error 403. Check your login and password.'
        console.log('Error 403. Check your login and password.', err)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const register = async () => {
    const { email, name, password } = currentUser.value

    try {
      loading.value = true
      const { data } = await AuthService.register(email, name, password)

      setupToken(data)
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

  const logout = async () => {
    try {
      loading.value = true
      await AuthService.logout()

      cancelToken()
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

  const setupToken = (data: AuthResponse) => {
    localStorage.setItem('token', data.token)
    loggedUser.value = { ...data.user, password: '' }
  }

  const cancelToken = () => {
    localStorage.removeItem('token')
    loggedUser.value = { ...initUser } as IUser
  }

  const checkAuth = async () => {
    try {
      loading.value = true
      const { data } = await axios.get<AuthResponse>(refreshApi, { withCredentials: true })

      setupToken(data)
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
    isLoginForm,
    isUserInDb,
    currentUser,
    loggedUser,
    resetCurrentUser,
    login,
    register,
    logout,
    checkUserExist,
    checkAuth
  }
})
