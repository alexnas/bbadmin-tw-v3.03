<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProvinceStore } from '@/stores/province'
import { useModalStore } from '@/stores/modal'
import BaseModal from '@/components/BaseModal.vue'
import type { IProvince } from '@/types'
import { formatDateTime } from '@/tools/formatDate'

const provinceStore = useProvinceStore()
const modalStore = useModalStore()
const { currentProvince } = storeToRefs(provinceStore)
const { isNewItem, isViewItem } = storeToRefs(modalStore)

const closeModal = () => {
  provinceStore.resetCurrentProvince()
  modalStore.resetModalState()
}

const handleEditClick = (province: IProvince) => {
  provinceStore.setCurrentProvince(province)
  modalStore.openEditItemModal()
}

const handleSubmitForm = async () => {
  if (isNewItem.value) {
    await provinceStore.createProfince(currentProvince.value)
  } else {
    await provinceStore.updateProfince(currentProvince.value)
  }
  modalStore.resetModalState()
  provinceStore.resetCurrentProvince()
}
</script>

<template>
  <base-modal
    @submit-form="handleSubmitForm"
    @closeModal="closeModal"
    @onEditItem="handleEditClick(currentProvince)"
  >
    <form
      class="relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded"
    >
      <label
        for="name"
        class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
        >Name</label
      >
      <input
        id="name"
        v-model="currentProvince.name"
        :disabled="isViewItem"
        class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="Province name"
      />

      <label
        for="name"
        class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
        >Description</label
      >
      <input
        id="name"
        v-model="currentProvince.description"
        :disabled="isViewItem"
        class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="Province description"
      />

      <label
        v-if="!isNewItem"
        for="name"
        class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
        >Created</label
      >
      <input
        v-if="!isNewItem"
        id="name"
        :value="formatDateTime(currentProvince.createdAt)"
        readonly
        class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="Date of creation"
      />

      <label
        v-if="!isNewItem"
        for="name"
        class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
        >Updated</label
      >
      <input
        id="name"
        v-if="!isNewItem"
        :value="formatDateTime(currentProvince.updatedAt)"
        readonly
        class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="Date of update"
      />
    </form>
  </base-modal>
</template>
