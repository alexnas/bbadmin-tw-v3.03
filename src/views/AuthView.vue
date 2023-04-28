<script setup lang="ts">
import AuthViewContainer from '@/views/AuthViewContainer.vue'
import { Icon } from '@iconify/vue'

const pageTitle = 'Authentication'
</script>

<template>
  <auth-view-container :pageTitle="pageTitle">
    <div class="flex flex-col items-center justify-center bg-gray-300">
      <div
        class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
      >
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-500">Login</div>

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
                <span class="mr-2 uppercase">Login</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div class="flex justify-center items-center mt-6">
          <a
            href="#"
            target="_blank"
            class="inline-flex items-center font-bold text-teal-400 hover:text-orange-500 text-xs sm:text-sm text-center"
          >
            <span>
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </span>
            <span class="ml-2">You don't have an account?</span>
          </a>
        </div>
      </div>
    </div>
  </auth-view-container>
</template>
