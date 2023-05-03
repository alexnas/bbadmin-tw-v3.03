<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'
import AuthViewContainer from '@/views/AuthViewContainer.vue'
import AuthLoginForm from '@/components/AuthLoginForm.vue'
import AuthRegisterForm from '@/components/AuthRegisterForm.vue'

const authStore = useAuthStore()
const { isLoginForm } = storeToRefs(authStore)

const pageTitle = 'Authentication'
const formTitle = computed(() => {
  return isLoginForm.value ? `Login` : `Register`
})

const toggleFormHint = computed(() => {
  return isLoginForm.value ? `Want to register new account?` : `Have an account already?`
})

const toggleIsLoginForm = () => {
  authStore.resetCurrentUser()
  isLoginForm.value = !isLoginForm.value
}
</script>

<template>
  <auth-view-container :pageTitle="pageTitle">
    <div class="flex flex-col items-center justify-center bg-gray-300">
      <div
        class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
      >
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-500">{{ formTitle }}</div>

        <AuthLoginForm v-if="isLoginForm" />
        <AuthRegisterForm v-else />

        <div class="flex justify-center items-center mt-6">
          <a
            href="#"
            @click.prevent="toggleIsLoginForm"
            class="inline-flex items-center font-bold text-xs sm:text-sm text-center text-teal-400 hover:text-orange-400"
          >
            <Icon
              class="w-6 h-6 min-w-[theme('spacing[5]')] text-3xl"
              icon="material-symbols:person-add-outline"
              :inline="true"
            />

            <span class="ml-2">{{ toggleFormHint }}</span>
          </a>
        </div>
      </div>
    </div>
  </auth-view-container>
</template>
