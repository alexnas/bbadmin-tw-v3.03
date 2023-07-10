<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import type { CityKeys, ICity } from '@/types'
import { useCityStore } from '@/stores/city'
import { useProvinceStore } from '@/stores/province'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'
import CityForm from '@/components/CityForm.vue'
import { useItemNameById } from '@/composables/ItemsById'
import { arrowUpIcon, arrowDownIcon } from '@/constants/icons'

const cityStore = useCityStore()
const { filterStr, sortProperty, sortOrder, sortedCities } = storeToRefs(cityStore)
const modalStore = useModalStore()
const provinceStore = useProvinceStore()
const { provinces } = storeToRefs(provinceStore)

onMounted(() => {
  cityStore.resetCurrentCity()
})

const sortIcon = computed(() => {
  return sortOrder.value === 'asc' ? arrowUpIcon : arrowDownIcon
})

const handleSort = (property: CityKeys) => {
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
  <div class="flex items-center justify-between mt-1 h-24">
    <div class="flex">
      <input
        type="text"
        v-model="filterStr"
        class="mb- max-w-xs text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        placeholder="Search pattern"
      />
    </div>

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
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'id' ? 'text-teal-600' : ''"
            @click="handleSort('id')"
          >
            ID<span class="" v-if="sortProperty === 'id'">{{ sortIcon }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'name' ? 'text-teal-600' : ''"
            @click="handleSort('name')"
          >
            Name<span class="" v-if="sortProperty === 'name'">{{ sortIcon }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'provinceId' ? 'text-teal-600' : ''"
            @click="handleSort('provinceId')"
          >
            Province<span class="" v-if="sortProperty === 'provinceId'">{{ sortIcon }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'description' ? 'text-teal-600' : ''"
            @click="handleSort('description')"
          >
            Description<span class="" v-if="sortProperty === 'description'">{{ sortIcon }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'createdAt' ? 'text-teal-600' : ''"
            @click="handleSort('createdAt')"
          >
            Created<span class="" v-if="sortProperty === 'createdAt'">{{ sortIcon }}</span>
          </th>
          <th
            scope="col"
            class="px-4 py-3 hover:bg-teal-100 rounded-lg cursor-pointer whitespace-nowrap"
            :class="sortProperty === 'updatedAt' ? 'text-teal-600' : ''"
            @click="handleSort('updatedAt')"
          >
            Updated<span class="" v-if="sortProperty === 'updatedAt'">{{ sortIcon }}</span>
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
