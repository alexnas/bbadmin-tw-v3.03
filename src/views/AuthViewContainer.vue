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
    <div class="flex items-center justify-center">
      <div>
        <h1 class="mt-6 mb-12 text-3xl font-semibold text-teal-600">{{ pageTitle }}</h1>
      </div>
    </div>

    <slot />
  </div>
</template>

<style scoped></style>
