<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheDashboardLayout'
})
</script>

<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <div class="flex flex-col overflow-hidden">
      <h2>Header</h2>

      <main class="flex flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <h2>Sidebar</h2>
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
      <h2>Footer</h2>
    </div>
  </div>
</template>

<style scoped></style>
