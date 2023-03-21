<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <router-link
            to="/"
            class="flex flex-shrink-0 items-center text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded-md px-3 py-2 text-sm"
          >
            <Icon
              class="mr-2"
              icon="ant-design:copyright-outlined"
              :inline="true"
              alt="Copyright"
            />
            2022-2023 GBB
          </router-link>
          <div class="">
            <div class="flex space-x-1">
              <router-link
                to="/"
                class="text-gray-400 hover:text-orange-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm"
                >GBB Admin</router-link
              >
              <router-link
                to="/"
                class="text-gray-400 hover:text-orange-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm"
                >About GBB</router-link
              >
            </div>
          </div>
        </div>

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  title="Logout"
                  alt="User Options"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
