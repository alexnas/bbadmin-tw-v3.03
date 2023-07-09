<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { activeMenuItem, inactiveMenuItem } from '@/assets/twClasses'

interface IFooterMenuItem {
  name: string
  label: string
  path: string
}

let footerMenu: IFooterMenuItem[] = reactive([
  {
    name: 'Home',
    label: 'GBB Admin',
    path: '/'
  },
  {
    name: 'About',
    label: 'About GBB',
    path: '/about'
  }
])
const activeClass = ref(activeMenuItem)
const inactiveClass = ref(inactiveMenuItem)
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
          <div v-for="item in footerMenu" :key="`${item.name}`" class="">
            <div class="flex space-x-1">
              <router-link
                :to="item.path"
                class="text-gray-400 hover:text-orange-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm"
                :class="[$route.name === item.name ? activeClass : inactiveClass]"
                >{{ item.label }}</router-link
              >
            </div>
          </div>
        </div>

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        ></div>
      </div>
    </div>
  </nav>
</template>
