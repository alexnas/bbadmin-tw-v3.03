<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useProvinceStore } from '@/stores/province'
import { useModalStore } from '@/stores/modal'
import type { IProvince } from '@/types'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'
import ProvinceForm from '@/components/ProvinceForm.vue'

const provinceStore = useProvinceStore()
const modalStore = useModalStore()
const { provinces } = storeToRefs(provinceStore)

onMounted(() => {
  provinceStore.resetCurrentProvince()
})

const handleAddNewClick = () => {
  provinceStore.cancelPreEditedProvince()
  modalStore.openNewItemModal()
}

const handleViewClick = (province: IProvince) => {
  provinceStore.setPreEditedProvince(province)
  provinceStore.setCurrentProvince(province)
  modalStore.openViewItemModal()
}

const handleEditClick = (province: IProvince) => {
  provinceStore.setPreEditedProvince(province)
  provinceStore.setCurrentProvince(province)
  modalStore.openEditItemModal()
}

const handleDeleteClick = async (province: IProvince) => {
  const { id, name } = province
  const confirmed = confirm(`Are you sure to delete all data for the province: ${name}, ID=${id}?`)
  if (confirmed) {
    await provinceStore.deleteProfince(province)
  }
  modalStore.resetModalState()
}
</script>

<template>
  <div class="flex items-center justify-end -mt-6">
    <button @click.stop="handleAddNewClick()" type="button">
      <Icon
        class="text-5xl text-green-400 hover:text-green-500"
        icon="material-symbols:add-box-outline-rounded"
        :inline="true"
      />
    </button>
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
          <td class="px-4 py-3">{{ cutText(province.description, 50) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(province.createdAt) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(province.updatedAt) }}</td>
          <td class="px-4 py-3 flex">
            <button
              @click.stop="handleViewClick(province)"
              type="button"
              class="font-medium text-green-400 hover:no-underline hover:text-green-600 dark:text-green-500 hover:underline mr-4"
            >
              VIEW
            </button>
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

  <!-- Province Modal Form -->
  <ProvinceForm />
</template>
