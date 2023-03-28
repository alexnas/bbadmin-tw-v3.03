<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useProvinceStore } from '@/stores/province'
import BaseModal from '@/components/BaseModal.vue'
import type { IProvince } from '@/types'
import { formatDateTime } from '@/tools/formatDate'

const provinceStore = useProvinceStore()
const { provinces } = storeToRefs(provinceStore)

const newProvince = reactive<IProvince>({
  id: -1,
  name: '',
  description: '',
  createdAt: '',
  updatedAt: ''
})

let isModalActive = ref<boolean>(false)
let isNew = ref<boolean>(true)
let checkedProvince = reactive<IProvince>(newProvince)

const modalTitle = computed(() => {
  return isNew.value
    ? 'New Province'
    : `Province: ${checkedProvince.name} (id: ${checkedProvince.id})`
})

const pageTitle = 'Provinces List'

const resetModalContants = () => {
  isNew.value = true
  checkedProvince = newProvince
}

const toggleModal = () => {
  isModalActive.value = !isModalActive.value
  if (!isModalActive.value) {
    resetModalContants()
  }
}

const handleAddNewClick = () => {
  toggleModal()
}

const handleEditClick = (province: IProvince) => {
  isNew.value = false
  checkedProvince = province
  toggleModal()
}

const handleDeleteClick = async (province: IProvince) => {
  const { id, name } = province
  const confirmed = confirm(`Are you sure to delete all data for the province: ${name}, ID=${id}?`)
  if (confirmed) {
    await provinceStore.deleteProfince(province)
  }
  resetModalContants()
}

const handleSubmitForm = async () => {
  if (isNew.value) {
    await provinceStore.createProfince(checkedProvince)
  } else {
    await provinceStore.updateProfince(checkedProvince)
  }
  isNew.value = true
  toggleModal()
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="mx-auto px-2 mb-4 sm:px-6 lg:px-8 flex flex-col overflow-y-auto">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-gray-700 my-6">{{ pageTitle }}</h1>
      </div>
      <div>
        <button @click.stop="handleAddNewClick()" type="button">
          <Icon
            class="text-5xl text-green-400 hover:text-green-500"
            icon="material-symbols:add-box-outline-rounded"
            :inline="true"
          />
        </button>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-base text-left text-gray-500 dark:text-gray-400 bg-gray-50">
        <thead
          class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-4 py-3">#</th>
            <th scope="col" class="px-4 py-3">ID</th>
            <th scope="col" class="px-4 py-3">Name</th>
            <th scope="col" class="px-4 py-3">Description</th>
            <th scope="col" class="px-4 py-3">Created</th>
            <th scope="col" class="px-4 py-3">Updated</th>
            <th scope="col" class="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(province, idx) in provinces"
            :key="province.name"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <td class="px-4 py-3">{{ idx + 1 }}</td>
            <td class="px-4 py-3">{{ province.id }}</td>
            <td class="px-4 py-3">{{ province.name }}</td>
            <td class="px-4 py-3">{{ province.description }}</td>
            <td class="px-4 py-3">{{ formatDateTime(province.createdAt) }}</td>
            <td class="px-4 py-3">{{ formatDateTime(province.updatedAt) }}</td>
            <td class="px-4 py-3 flex">
              <button
                @click.stop="handleEditClick(province)"
                type="button"
                class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
              >
                EDIT
              </button>
              <button
                @click.stop="handleDeleteClick(province)"
                type="button"
                class="font-medium text-rose-300 hover:no-underline hover:text-rose-600 dark:text-red-500 hover:underline"
              >
                DEL
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Component -->
    <base-modal
      :modalTitle="modalTitle"
      :isModalActive="isModalActive"
      @submit-form="handleSubmitForm"
      @closeModal="toggleModal"
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
          v-model="checkedProvince.name"
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
          v-model="checkedProvince.description"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Province description"
        />

        <label
          v-if="!isNew"
          for="name"
          class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Created</label
        >
        <input
          v-if="!isNew"
          id="name"
          :value="formatDateTime(checkedProvince.createdAt)"
          readonly
          class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Date of creation"
        />

        <label
          v-if="!isNew"
          for="name"
          class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Updated</label
        >
        <input
          id="name"
          v-if="!isNew"
          :value="formatDateTime(checkedProvince.updatedAt)"
          readonly
          class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Date of update"
        />
      </form>
    </base-modal>
  </div>
</template>
