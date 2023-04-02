<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as Yup from 'yup'
import { useCityStore } from '@/stores/city'
import { useModalStore } from '@/stores/modal'
import { useProvinceStore } from '@/stores/province'
import { formatDateTime } from '@/tools/formatDate'
import BaseModal from '@/components/BaseModal.vue'

const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
const modalStore = useModalStore()
const { isNewItem, isViewItem } = storeToRefs(modalStore)
const provinceStore = useProvinceStore()
const { provinces } = storeToRefs(provinceStore)

const citySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name should not be more than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters')
    .max(250, 'Description should not be more than 250 characters'),
  province: Yup.number().required().notOneOf([-1], 'Select Province is a required')
})

const modalTitle = computed(() => {
  return isViewItem.value || !isNewItem.value
    ? `City: ${currentCity.value.name} (id: ${currentCity.value.id})`
    : 'New City'
})

const closeModal = () => {
  cityStore.resetCurrentCity()
  modalStore.resetModalState()
}

const resetModalForm = () => {
  cityStore.resetPreEditedCity()
}

const handleEditClick = () => {
  cityStore.setCurrentCity(currentCity.value)
  modalStore.openEditItemModal()
}

const handleSubmit = async () => {
  if (isNewItem.value) {
    await cityStore.createCity(currentCity.value)
  } else {
    await cityStore.updateCity(currentCity.value)
  }
  cityStore.resetCurrentCity()
  modalStore.resetModalState()
}
</script>

<template>
  <base-modal @closeModal="closeModal" :modalTitle="modalTitle">
    <VeeForm
      class="relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded"
      :validation-schema="citySchema"
      v-slot="{ errors, meta }"
    >
      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Name</label
        >
        <VeeField
          name="name"
          type="text"
          v-model="currentCity.name"
          :disabled="isViewItem"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="City name"
        />
        <div class="text-red-400">{{ errors && errors?.name }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Province</label
        >
        <VeeField
          as="select"
          name="province"
          id="city"
          :disabled="isViewItem"
          v-model="currentCity.provinceId"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option v-for="option in provinces" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </VeeField>
        <div class="text-red-400">{{ errors && errors?.province }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Description</label
        >
        <VeeField
          name="description"
          as="textarea"
          v-model="currentCity.description"
          :disabled="isViewItem"
          class="mb-5 mt-2 pt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="City description"
        />
        <div class="text-red-400">{{ errors && errors.description }}</div>
      </div>

      <div v-if="!isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Created</label
        >
        <input
          name="createdAt"
          :value="formatDateTime(currentCity.createdAt)"
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
          :value="formatDateTime(currentCity.updatedAt)"
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
