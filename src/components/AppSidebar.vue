<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
</script>

<template>
  <div class="flex flex-col w-56 min-w-[theme('spacing[56]')] bg-gray-600">
    <div class="flex items-center justify-start mx-4 my-4">
      <div class="flex items-center">
        <span class="mx-2 text-2xl font-semibold text-gray-100">Dashboard</span>
      </div>
    </div>

    <sidebar-menu />
  </div>
</template>
