<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as Yup from 'yup'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { loggedUser } = storeToRefs(authStore)

const loginSchema = Yup.object().shape({
  email: Yup.string().label('Email').required().email('Email should fit format "aaa@aaa.aaa" '),
  password: Yup.string()
    .label('Password')
    .required()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password should not be more than 50 characters')
})

// TODO: проверить до логина наличие такого юзера в базе, чтобы исключить дублирование

const handleSubmit = async () => {
  console.log('handleSubmit =========')
  await authStore.loginUser(loggedUser.value)
}
</script>

<template>
  <div class="mt-10">
    <VeeForm :validation-schema="loginSchema" v-slot="{ errors, meta }">
      <div class="flex flex-col mb-6">
        <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >E-Mail Address:</label
        >
        <div class="relative">
          <div
            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
          >
            <Icon
              class="w-6 min-w-[theme('spacing[5]')] text-3xl text-gray-400 hover:text-teal-600"
              icon="material-symbols:alternate-email"
              :inline="true"
            />
          </div>

          <VeeField
            type="email"
            name="email"
            v-model="loggedUser.email"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="E-Mail Address"
          />
        </div>
        <div class="text-red-400">{{ errors && errors.email }}</div>
      </div>
      <div class="flex flex-col mb-6">
        <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >Password:</label
        >
        <div class="relative">
          <div
            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
          >
            <span>
              <Icon
                class="w-6 min-w-[theme('spacing[5]')] text-3xl text-gray-400 hover:text-teal-600"
                icon="mdi:password-outline"
                :inline="true"
              />
            </span>
          </div>

          <VeeField
            type="password"
            name="password"
            v-model="loggedUser.password"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Password"
          />
        </div>
        <div class="text-red-400">{{ errors && errors?.password }}</div>
      </div>

      <div v-if="false" class="flex items-center mb-6 -mt-4">
        <div class="flex ml-auto">
          <a href="#" class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
            >Forgot Your Password?</a
          >
        </div>
      </div>

      <div class="flex w-full mt-8">
        <button
          type="submit"
          :disabled="!meta.valid"
          class="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out enabled:hover:bg-teal-600 enabled:bg-teal-700 disabled:bg-gray-400 sm:rounded-lg text-white px-8 py-2 text-sm sm:text-base w-full"
          @click.prevent="handleSubmit"
        >
          <span class="mr-2 uppercase">Submit</span>
          <span>
            <Icon
              class="w-6 min-w-[theme('spacing[5]')] text-3xl text-white"
              icon="material-symbols:arrow-circle-right-outline"
              :inline="true"
            />
          </span>
        </button>
      </div>
    </VeeForm>
  </div>
</template>
