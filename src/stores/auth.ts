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
  const isUserInDb = ref<boolean>(true)
  const isDbConnected = ref<boolean>(true)
  const dbConnectionMsg = ref<string>('')
  const currentAuthUser = ref<IUser>({ ...initUser })
  const loggedUser = ref<IUser>({ ...initUser })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const isAuth = computed(() => {
    return loggedUser.value && !!loggedUser.value.email
  })

  const resetCurrentAuthUser = () => {
    currentAuthUser.value = { ...initUser }
  }

  const checkDbConnection = async () => {
    try {
      const { data } = await AuthService.checkIfDbConnected()
      isDbConnected.value = data.isDbConnected
      dbConnectionMsg.value = data.dbConnectionMsg
    } catch (err: any) {
      loading.value = false
      isDbConnected.value = false
      dbConnectionMsg.value = 'Server connection was lost'

      if (axios.isAxiosError(error)) {
        error.value = err.message
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const checkUserExist = async (email: string) => {
    checkDbConnection()
    if (currentAuthUser.value.email.trim() === '' || isDbConnected.value === false) {
      return
    }

    try {
      loading.value = true
      const { data } = await AuthService.checkIfUserExist(email)
      if (data?.id) {
        isUserInDb.value = true
      } else {
        isUserInDb.value = false
      }

      loading.value = false
      error.value = null
      return data
    } catch (err: any) {
      console.log('Error:', err)

      loading.value = false
      if (axios.isAxiosError(error)) {
        error.value = err.message
        isUserInDb.value = false
        console.log('Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        isUserInDb.value = false
        console.log('Error:', err)
      }
    }
  }

  const login = async () => {
    const { email, password } = currentAuthUser.value

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
    const { email, name, password } = currentAuthUser.value

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
    currentAuthUser,
    loggedUser,
    isDbConnected,
    dbConnectionMsg,
    resetCurrentAuthUser,
    login,
    register,
    logout,
    checkUserExist,
    checkAuth,
    checkDbConnection
  }
})
