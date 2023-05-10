<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'
import { useRoleStore } from '@/stores/role'
import { useItemNameById } from '@/composables/ItemsById'
import { activeMenuItem, inactiveMenuItem } from '@/assets/twClasses'

const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)
const router = useRouter()
const authStore = useAuthStore()
const { isAuth, loggedUser } = storeToRefs(authStore)

const roleNameFromId = computed(() => {
  return useItemNameById(loggedUser.value.roleId, roles.value)
})

const handleAuthUser = () => {
  if (isAuth) {
    authStore.logout()
  }
  authStore.resetCurrentUser()
  router.push('/login')
}

interface IHeaderMenuItem {
  name: string
  label: string
  path: string
}

let headerMenu: IHeaderMenuItem[] = reactive([
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
const activeClass = ref(activeMenuItem)
const inactiveClass = ref(inactiveMenuItem)
</script>

<template>
  <nav class="bg-gray-800 text-sm">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button and logo-->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!--Icon when menu is closed.
            Menu open: "hidden", Menu closed: "block"-->

            <Icon
              class="hidden h-8 w-auto lg:block"
              :style="{ fontSize: '40px' }"
              icon="noto:oncoming-bus"
              :inline="true"
            />
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <!-- Icon when menu is open. 
						Menu open: "block", Menu closed: "hidden"-->
          </button>
        </div>

        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <!-- Desctop menu button and logo-->
          <div class="flex flex-shrink-0 items-center">
            <router-link to="/">
              <Icon
                class="red-icon"
                :style="{ fontSize: '40px' }"
                icon="noto:oncoming-bus"
                :inline="true"
                alt="GBB Admin"
              />
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                to="/"
                class="text-white hover:text-orange-400 hover:bg-gray-700 rounded-md px-3 py-2 text-lg font-medium"
                aria-current="page"
                >GBB Admin</router-link
              >
            </div>
          </div>
        </div>
        <div v-for="item in headerMenu" :key="`${item.name}`" class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <router-link
              class="text-gray-300 hover:text-orange-400 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              :class="[$route.name === item.name ? activeClass : inactiveClass]"
              aria-current="page"
              :to="item.path"
              >{{ item.label }}</router-link
            >
          </div>
        </div>

        <div class="ml-6">
          <!-- User on/off -->
          <div class="flex justify-center text-base text-teal-400">
            {{ isAuth ? loggedUser.name : 'Guest' }}
          </div>
          <div class="flex justify-end">
            <button
              @click.prevent="handleAuthUser"
              class="text-gray-400 uppercase hover:text-gray-100"
            >
              {{ isAuth ? 'Logout' : 'Login' }}
            </button>

            <div class="mr-2 relative ml-3 text-gray-400">
              <button
                type="button"
                class="rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <Icon
                  v-if="isAuth"
                  icon="bi:person-circle"
                  :inline="true"
                  class="w-6 h-6 min-w-[theme('spacing[5]')] text-3xl text-gray-400 cursor-text"
                />
                <Icon
                  v-else
                  icon="ant-design:login-outlined"
                  :inline="true"
                  class="w-6 h-6 min-w-[theme('spacing[5]')] text-3xl text-teal-400 cursor-text"
                />
              </button>
            </div>
            <button class="text-gray-400 uppercase cursor-text">
              {{ isAuth ? roleNameFromId : '' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-for="item in headerMenu" :key="`${item.name}`" class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <router-link
          :to="item.path"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          :class="[$route.name === item.name ? activeClass : inactiveClass]"
          aria-current="page"
          >{{ item.label }}</router-link
        >
      </div>
    </div>
  </nav>
</template>
