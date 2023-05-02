import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IUser } from '@/types'
import { initUser } from '@/stores/user'
import AuthService from '@/services/AuthService'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref<boolean>(false)
  const isRegistered = ref<boolean>(true)
  const currentUser = ref<IUser>({ ...initUser })
  const loggedUser = ref<IUser>({ ...initUser })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const setAuthState = () => {
    isAuth.value = true
  }

  const resetAuthState = () => {
    isAuth.value = false
    isRegistered.value = false
    loggedUser.value = { ...initUser }
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

  const checkUserExist = async (email: string) => {
    try {
      loading.value = true
      const { data } = await AuthService.checkIfUserExist(email)

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

  const login = async (user: IUser) => {
    const { email, password } = user

    try {
      loading.value = true
      const response = await AuthService.login(email, password)

      localStorage.setItem('token', response.data.token)
      isAuth.value = true
      loggedUser.value = response.data.user

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

  const register = async (user: IUser) => {
    const { email, name, password } = user

    try {
      loading.value = true
      const response = await AuthService.register(email, name, password)

      localStorage.setItem('token', response.data.token)
      isAuth.value = true
      loggedUser.value = response.data.user

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

      localStorage.removeItem('token')
      isAuth.value = false
      loggedUser.value = {} as IUser

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
    currentUser,
    loggedUser,
    setAuthState,
    resetAuthState,
    toggleRegistered,
    setLoggedUser,
    login,
    register,
    logout,
    checkUserExist
  }
})
