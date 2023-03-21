<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-200 font-roboto">
    <AppHeader />

    <main class="flex flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <h2>Sidebar</h2>
      <div class="container mx-auto px-6 py-8">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped></style>
