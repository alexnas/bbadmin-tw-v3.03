<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineEmits(['open-add-new'])
</script>

<template>
  <button @click.stop="$emit('open-add-new')" type="button">
    <Icon
      class="text-5xl text-green-400 hover:text-green-500"
      icon="material-symbols:add-box-outline-rounded"
      :inline="true"
    />
  </button>
</template>
