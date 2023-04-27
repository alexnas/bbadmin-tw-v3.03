<script setup lang="ts">
import { computed, defineEmits } from 'vue'
const props = defineProps({
  modelValue: { type: [Array, Boolean] },
  value: { type: [Boolean, Object] },
  label: { type: String },
  isDisabled: { type: Boolean }
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="flex items-center my-2">
    <input
      type="checkbox"
      v-model="model"
      :value="value"
      :disabled="isDisabled"
      class="mr-4 w-5 h-5"
    />
    <span>{{ label }}</span>
  </div>
</template>
