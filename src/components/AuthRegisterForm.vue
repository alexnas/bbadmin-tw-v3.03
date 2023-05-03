<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as Yup from 'yup'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { currentUser, isUserInDb } = storeToRefs(authStore)

const registerSchema = Yup.object().shape({
  id: Yup.number(),
  email: Yup.string().label('Email').required().email('Email should fit format "aaa@aaa.aaa" '),
  name: Yup.string()
    .label('Name')
    .required()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name should not be more than 50 characters'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password should not be more than 50 characters'),
  confirmPassword: Yup.string().when('id', {
    is: (id: number) => id === -1,
    then: (registerSchema) =>
      registerSchema
        .label('Confirm password')
        .required()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    otherwise: (registerSchema) => registerSchema.notRequired()
  })
})

const handleSubmit = async () => {
  await authStore.register()
}
</script>

<template>
  <div class="mt-10">
    <VeeForm :validation-schema="registerSchema" v-slot="{ errors, meta }">
      <div v-if="isUserInDb && !errors.email && currentUser.email !== ''" class="mb-4 text-red-500">
        This email is registered, type another one.
      </div>
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
            v-model="currentUser.email"
            v-on:blur="authStore.checkUserExist(currentUser.email)"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="E-Mail Address"
          />
        </div>
        <div class="text-red-400">{{ errors && errors.email }}</div>
      </div>

      <div class="flex flex-col mb-6">
        <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Name:</label>
        <div class="relative">
          <div
            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
          >
            <Icon
              class="w-6 min-w-[theme('spacing[5]')] text-3xl text-gray-400 hover:text-teal-600"
              icon="material-symbols:person-outline"
              :inline="true"
            />
          </div>

          <VeeField
            type="text"
            name="name"
            v-model="currentUser.name"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Name"
          />
        </div>
        <div class="text-red-400">{{ errors && errors.name }}</div>
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
            v-model="currentUser.password"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Password"
          />
        </div>
        <div class="text-red-400">{{ errors && errors?.password }}</div>
      </div>

      <div class="flex flex-col mb-6">
        <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >Confirm Password:</label
        >
        <div class="relative">
          <div
            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
          >
            <span>
              <Icon
                class="w-6 min-w-[theme('spacing[5]')] text-3xl text-gray-400 hover:text-teal-600"
                icon="mdi:password-add-outline"
                :inline="true"
              />
            </span>
          </div>

          <VeeField
            type="password"
            name="confirmPassword"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Confirm Password"
          />
        </div>
        <div class="text-red-400">{{ errors && errors?.confirmPassword }}</div>
      </div>

      <div v-if="false" class="flex items-center mb-6 -mt-4">
        <div class="flex ml-auto">
          <a href="#" class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
            >Forgot Your Password?</a
          >
        </div>
      </div>

      <div v-show="false" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >ID</label
        >
        <VeeField
          name="id"
          type="number"
          v-model="currentUser.id"
          :disabled="true"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="User id"
        />
        <div class="text-red-400">{{ errors && errors?.id }}</div>
      </div>

      <div class="flex w-full mt-8">
        <button
          type="submit"
          :disabled="!meta.valid || isUserInDb"
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
