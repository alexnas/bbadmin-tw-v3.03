<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as Yup from 'yup'
import { useProvinceStore } from '@/stores/province'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import BaseModal from '@/components/BaseModal.vue'

const provinceStore = useProvinceStore()
const { currentProvince } = storeToRefs(provinceStore)
const modalStore = useModalStore()
const { isNewItem, isViewItem } = storeToRefs(modalStore)

const provinceSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name should not be more than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters')
    .max(250, 'Description should not be more than 250 characters')
})

const modalTitle = computed(() => {
  return isViewItem.value || !isNewItem.value
    ? `Province: ${currentProvince.value.name} (id: ${currentProvince.value.id})`
    : 'New Province'
})

const closeModal = () => {
  provinceStore.resetCurrentProvince()
  modalStore.resetModalState()
}

const resetModalForm = () => {
  provinceStore.resetPreEditedProvince()
}

const handleEditClick = () => {
  provinceStore.setCurrentProvince(currentProvince.value)
  modalStore.openEditItemModal()
}

const handleSubmit = async () => {
  if (isNewItem.value) {
    await provinceStore.createProvince(currentProvince.value)
  } else {
    await provinceStore.updateProvince(currentProvince.value)
  }
  provinceStore.resetCurrentProvince()
  modalStore.resetModalState()
}
</script>

<template>
  <base-modal @closeModal="closeModal" :modalTitle="modalTitle">
    <VeeForm
      class="relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded"
      :validation-schema="provinceSchema"
      v-slot="{ errors, meta }"
    >
      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Name</label
        >
        <VeeField
          name="name"
          type="text"
          v-model="currentProvince.name"
          :disabled="isViewItem"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Province name"
        />
        <div class="text-red-400">{{ errors.name }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Description</label
        >
        <VeeField
          name="description"
          as="textarea"
          v-model="currentProvince.description"
          :disabled="isViewItem"
          class="mb-5 mt-2 pt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Province description"
        />
        <div class="text-red-400">{{ errors.description }}</div>
      </div>

      <div v-if="!isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Created</label
        >
        <input
          name="createdAt"
          :value="formatDateTime(currentProvince.createdAt)"
          readonly
          class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Date of creation"
        />
      </div>

      <div v-if="!isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Updated</label
        >
        <input
          name="updatedAt"
          :value="formatDateTime(currentProvince.updatedAt)"
          readonly
          class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Date of update"
        />
      </div>

      <div class="flex items-center justify-start w-full mt-4">
        <button
          @click.prevent="handleEditClick"
          v-if="isViewItem"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 transition duration-150 ease-in-out hover:bg-orange-600 bg-orange-700 sm:rounded-lg text-white px-8 py-2 text-sm"
          type="button"
        >
          Edit
        </button>
        <button
          v-if="!isViewItem"
          :disabled="!meta.valid"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out enabled:hover:bg-teal-600 enabled:bg-teal-700 disabled:bg-gray-400 sm:rounded-lg text-white px-8 py-2 text-sm"
          type="submit"
          @click.prevent="handleSubmit"
        >
          Submit
        </button>
        <button
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border sm:rounded-lg px-8 py-2 text-sm"
          type="reset"
          @click.prevent="closeModal"
        >
          Cancel
        </button>

        <div class="ml-auto sm:visible invisible">
          <button
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-500 transition duration-150 text-gray-100 ease-in-out hover:border-gray-400 hover:bg-gray-400 border sm:rounded-lg px-8 py-2 text-sm"
            @click.prevent="resetModalForm"
            type="reset"
          >
            Reset
          </button>
        </div>
      </div>
    </VeeForm>
  </base-modal>
</template>
