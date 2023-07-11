<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import type { ICity, ICityKeys, ICityTableCol } from '@/types'
import { useCityStore } from '@/stores/city'
import { useProvinceStore } from '@/stores/province'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'
import CityForm from '@/components/CityForm.vue'
import { useItemNameById } from '@/composables/ItemsById'
import FilterInput from '@/components/FilterInput.vue'
import { arrowUpIcon, arrowDownIcon } from '@/constants/icons'

const cityStore = useCityStore()
const { filterStr, sortProperty, sortOrder, sortedCities } = storeToRefs(cityStore)
const modalStore = useModalStore()
const provinceStore = useProvinceStore()
const { provinces } = storeToRefs(provinceStore)

onMounted(() => {
  cityStore.resetCurrentCity()
})

const tableCols: ICityTableCol[] = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'NAME' },
  { field: 'provinceId', title: 'PROVINCE' },
  { field: 'description', title: 'DESCRIPTION' },
  { field: 'createdAt', title: 'CREATED' },
  { field: 'updatedAt', title: 'UPDATED' }
]

const sortIcon = computed(() => {
  return sortOrder.value === 'asc' ? arrowUpIcon : arrowDownIcon
})

const handleSort = (property: ICityKeys) => {
  if (sortProperty.value === property) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortProperty.value = property
    sortOrder.value = 'asc'
  }
}

const handleAddNewClick = () => {
  cityStore.cancelPreEditedCity()
  modalStore.openNewItemModal()
}

const handleViewClick = (city: ICity) => {
  cityStore.setPreEditedCity(city)
  cityStore.setCurrentCity(city)
  modalStore.openViewItemModal()
}

const handleEditClick = (city: ICity) => {
  cityStore.setPreEditedCity(city)
  cityStore.setCurrentCity(city)
  modalStore.openEditItemModal()
}

const handleDeleteClick = async (city: ICity) => {
  const { id, name } = city
  const confirmed = confirm(`Are you sure to delete all data for the city: ${name}, ID=${id}?`)
  if (confirmed) {
    await cityStore.deleteCity(city)
  }
  modalStore.resetModalState()
}
</script>

<template>
  <div class="flex items-center justify-between mt-3 mb-2 h-12 max-h-12">
    <FilterInput v-model="filterStr" />

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
          v-for="(city, idx) in sortedCities"
          :key="city.name"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">{{ city.id }}</td>
          <td class="px-4 py-3">{{ city.name }}</td>
          <td class="px-4 py-3">{{ useItemNameById(city.provinceId, provinces) }}</td>
          <td class="px-4 py-3">{{ cutText(city.description, 50) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(city.createdAt) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(city.updatedAt) }}</td>
          <td class="px-4 py-3 flex">
            <button
              @click.stop="handleViewClick(city)"
              type="button"
              class="font-medium text-green-400 hover:no-underline hover:text-green-600 dark:text-green-500 hover:underline mr-4"
            >
              VIEW
            </button>
            <button
              @click.stop="handleEditClick(city)"
              type="button"
              class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
            >
              EDIT
            </button>
            <button
              @click.stop="handleDeleteClick(city)"
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

  <!-- City Modal Form -->
  <CityForm />
</template>
