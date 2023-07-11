<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="mb- max-w-xs text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
    placeholder="Search pattern"
  />
</template>
