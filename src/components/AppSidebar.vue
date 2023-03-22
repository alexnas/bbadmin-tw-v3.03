<template>
  <div class="flex flex-col w-56 min-w-[theme('spacing[56]')] bg-gray-600">
    <div class="flex items-center justify-start mx-4 my-4">
      <div class="flex items-center">
        <span class="mx-2 text-2xl font-semibold text-gray-100">Dashboard</span>
      </div>
    </div>

    <div class="overflow-y-auto">
      <nav class="mt-2">
        <router-link
          class="flex items-center px-4 py-2 ml-1 border-l-4 whitespace-nowrap"
          :class="[$route.name === 'Home' ? activeClass : inactiveClass]"
          to="/"
        >
          <Icon
            class="w-5 min-w-[theme('spacing[5]')] text-3xl text-red-500"
            icon="bi:app"
            :inline="true"
          />
          <span class="mx-4">Home</span>
        </router-link>

        <router-link
          class="flex items-center px-4 py-2 ml-1 border-l-4 whitespace-nowrap"
          :class="[$route.name === 'About' ? activeClass : inactiveClass]"
          to="/about"
        >
          <Icon
            class="w-5 min-w-[theme('spacing[5]')] text-3xl text-red-500 hover:text-orange-400"
            icon="bi:app"
            :inline="true"
          />
          <span class="mx-4">About</span>
        </router-link>
      </nav>

      <div class="text-white px-4 mt-6"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const activeClass = ref('border-orange-400 text-orange-400 ')
const inactiveClass = ref('border-gray-900 text-gray-400 hover:text-gray-100')
</script>
