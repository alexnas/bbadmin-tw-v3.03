<script setup lang="ts">
defineProps({
  pageTitle: {
    type: String,
    default: ' Table View'
  }
})
</script>

<template>
  <div class="relative mx-auto px-2 my-6 sm:px-6 lg:px-8 flex flex-col overflow-y-auto">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-gray-700">{{ pageTitle }}</h1>
      </div>
    </div>

    <slot />
  </div>
</template>

<style scoped></style>
