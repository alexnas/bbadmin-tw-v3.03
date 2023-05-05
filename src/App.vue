<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  if (localStorage.getItem('token')) {
    authStore.checkAuth()
  }
})
</script>

<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>
