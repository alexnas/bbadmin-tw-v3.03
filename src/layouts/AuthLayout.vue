<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-200 font-roboto">
    <AppHeader />

    <main class="flex flex-1 overflow-hidden">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped></style>
