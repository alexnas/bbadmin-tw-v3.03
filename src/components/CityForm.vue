<script setup lang="ts">
// import { storeToRefs } from 'pinia'
// import { useCityStore } from '@/stores/city'
import { useModalStore } from '@/stores/modal'
import BaseModal from '@/components/BaseModal.vue'

// const cityStore = useCityStore()
const modalStore = useModalStore()
// const { currentCity } = storeToRefs(cityStore)
// const { isNewItem, isViewItem } = storeToRefs(modalStore)

const closeModal = () => {
  // cityStore.resetCurrentCity()
  modalStore.resetModalState()
}
</script>

<template>
  <base-modal @closeModal="closeModal"> City Form </base-modal>
</template>
