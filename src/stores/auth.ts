import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IUser } from '@/types'
import { initUser } from '@/stores/user'
import AuthService from '@/services/AuthService'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref<boolean>(false)
  const isLoginForm = ref<boolean>(true)
  const isUserInDb = ref<boolean>(false)
  const currentUser = ref<IUser>({ ...initUser })
  const loggedUser = ref<IUser>({ ...initUser })
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const setAuthState = () => {
    isAuth.value = true
  }

  const resetCurrentUser = () => {
    currentUser.value = { ...initUser }
  }

  const resetAuthState = () => {
    isAuth.value = false
    loggedUser.value = { ...initUser }
  }

  const setLoggedUser = (user: IUser) => {
    loggedUser.value = user
    isAuth.value = true
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

      localStorage.setItem('token', response.data.token)
      isAuth.value = true
      loggedUser.value = response.data.user

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

      localStorage.setItem('token', data.token)
      isAuth.value = true
      loggedUser.value = data.user

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
    isLoginForm,
    isUserInDb,
    currentUser,
    loggedUser,
    setAuthState,
    resetAuthState,
    resetCurrentUser,
    setLoggedUser,
    login,
    register,
    logout,
    checkUserExist
  }
})
