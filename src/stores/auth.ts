import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'
import { initUser } from '@/stores/user'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref<boolean>(false)
  const isRegistered = ref<boolean>(true)
  const loggedUser = ref<IUser>(initUser)

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

  const loginUser = (user: IUser) => {
    console.log('loginUser', user)
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
    loginUser
  }
})
