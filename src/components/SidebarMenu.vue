<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { activeMenuItem, inactiveMenuItem } from '@/assets/twClasses'

interface ISideMenuItem {
  name: string
  label: string
  path: string
}

let sideMenu: ISideMenuItem[] = reactive([
  {
    name: 'Provinces',
    label: 'Provinces',
    path: '/province'
  },
  {
    name: 'Cities',
    label: 'Cities',
    path: '/city'
  },
  {
    name: 'Companies',
    label: 'Companies',
    path: '/company'
  }
])

const activeClass = ref(activeMenuItem)
const inactiveClass = ref(inactiveMenuItem)
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
