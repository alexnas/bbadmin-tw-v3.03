<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'

interface ISideMenuItem {
  name: string
  label: string
  path: string
}

let sideMenu: ISideMenuItem[] = reactive([
  {
    name: 'Home',
    label: 'Home',
    path: '/'
  },
  {
    name: 'About',
    label: 'About',
    path: '/about'
  }
])

const activeClass = ref('border-orange-400 text-orange-400 ')
const inactiveClass = ref('border-gray-900 text-gray-400 hover:text-gray-100')
</script>

<template>
  <div class="overflow-y-auto">
    <nav class="mt-2" v-for="item in sideMenu" :key="`${item.name}`">
      <router-link
        class="flex items-center px-4 py-2 ml-1 border-l-4 whitespace-nowrap"
        :class="[$route.name === item.name ? activeClass : inactiveClass]"
        :to="item.path"
      >
        <Icon
          class="w-5 min-w-[theme('spacing[5]')] text-3xl text-red-500 hover:text-orange-400"
          icon="bi:app"
          :inline="true"
        />
        <span class="mx-4">{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>
