import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref<boolean>(false)
  const isRegistered = ref<boolean>(false)
  const loggedUser = ref<IUser | null>(null)

  const setAuthState = () => {
    isAuth.value = true
  }

  const resetAuthState = () => {
    isAuth.value = false
    isRegistered.value = false
    loggedUser.value = null
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

  return {
    isAuth,
    isRegistered,
    loggedUser,
    setAuthState,
    resetAuthState,
    toggleRegistered,
    setLoggedUser,
    logout
  }
})
