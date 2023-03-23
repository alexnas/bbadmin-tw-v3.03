<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import type { IProvince } from '@/types'

const provinceApi = 'http://localhost:5000/api/province'
const pageTitle = 'Provinces List'
const provinces = ref<IProvince[]>([])

const handleAddNewClick = () => {
  console.log('Add New')
}

const handleEditClick = (id: number) => {
  console.log('edit', id)
}
const handleDeleteClick = ({ id, name }: { id: number; name: string }) => {
  const result = confirm(`Are you sure to delete all data for the province: ${name}, ID=${id}?`)
  console.log('delete', id, name)
}

onMounted(async () => {
  try {
    const { data } = await axios.get(provinceApi)
    provinces.value = data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error', error.message)
    } else {
      console.log('Error', error)
    }
  }
})
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
            <td class="px-4 py-3">{{ province.createdAt }}</td>
            <td class="px-4 py-3">{{ province.updatedAt }}</td>
            <td class="px-4 py-3 flex">
              <button
                @click.stop="handleEditClick(province.id)"
                type="button"
                class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
              >
                EDIT
              </button>
              <button
                @click.stop="handleDeleteClick({ id: province.id, name: province.name })"
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
  </div>
</template>
