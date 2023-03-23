<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-200 font-roboto">
    <AppHeader />

    <main class="flex flex-1 overflow-hidden">
      <AppSidebar />
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped></style>
