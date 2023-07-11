<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { IProvince, IProvinceKeys, IProvinceTableCol } from '@/types'
import { useProvinceStore } from '@/stores/province'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'
import ProvinceForm from '@/components/ProvinceForm.vue'
import FilterInput from '@/components/FilterInput.vue'
import AddNewButton from '@/components/AddNewButton.vue'
import { arrowUpIcon, arrowDownIcon } from '@/constants/icons'

const provinceStore = useProvinceStore()
const { filterStr, sortProperty, sortOrder, sortedProvinces } = storeToRefs(provinceStore)
const modalStore = useModalStore()

onMounted(() => {
  provinceStore.resetCurrentProvince()
})

const tableCols: IProvinceTableCol[] = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'NAME' },
  { field: 'description', title: 'DESCRIPTION' },
  { field: 'createdAt', title: 'CREATED' },
  { field: 'updatedAt', title: 'UPDATED' }
]

const sortIcon = computed(() => {
  return sortOrder.value === 'asc' ? arrowUpIcon : arrowDownIcon
})

const handleSort = (property: IProvinceKeys) => {
  if (sortProperty.value === property) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortProperty.value = property
    sortOrder.value = 'asc'
  }
}

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
    await provinceStore.deleteProvince(province)
  }
  modalStore.resetModalState()
}
</script>

<template>
  <div class="flex items-center justify-between mt-3 mb-2 h-12 max-h-12">
    <FilterInput v-model="filterStr" />
    <AddNewButton @openAddNew="handleAddNewClick()" />
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-base text-left text-gray-500 dark:text-gray-400 bg-gray-50">
      <thead
        class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
      >
        <tr>
          <th scope="col" class="px-4 py-3">#</th>
          <th
            v-for="({ field, title }, ids) in tableCols"
            :key="ids"
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === field ? 'text-teal-600' : ''"
            @click="handleSort(field)"
          >
            {{ title }}
            <span class="" v-if="sortProperty === field">{{ sortIcon }}</span>
          </th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(province, idx) in sortedProvinces"
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
