<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="mt-10">
    <form action="#">
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

          <input
            id="email"
            type="email"
            name="email"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="E-Mail Address"
          />
        </div>
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

          <input
            id="email"
            type="email"
            name="email"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Name"
          />
        </div>
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

          <input
            id="password"
            type="password"
            name="password"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Password"
          />
        </div>
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

          <input
            id="password"
            type="password"
            name="password"
            class="text-sm sm:text-base text-gray-600 placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
            placeholder="Confirm Password"
          />
        </div>
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
          class="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out enabled:hover:bg-teal-600 enabled:bg-teal-700 disabled:bg-gray-400 sm:rounded-lg text-white px-8 py-2 text-sm sm:text-base w-full"
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
    </form>
  </div>
</template>