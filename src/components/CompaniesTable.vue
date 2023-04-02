<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/stores/company'
import type { ICompany } from '@/types'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'

const companyStore = useCompanyStore()
const { companies } = storeToRefs(companyStore)
const modalStore = useModalStore()

onMounted(() => {
  companyStore.resetCurrentCompany()
})

const handleAddNewClick = () => {
  companyStore.cancelPreEditedCompany()
  modalStore.openNewItemModal()
}

const handleViewClick = (company: ICompany) => {
  companyStore.setPreEditedCompany(company)
  companyStore.setCurrentCompany(company)
  modalStore.openViewItemModal()
}

const handleEditClick = (company: ICompany) => {
  companyStore.setPreEditedCompany(company)
  companyStore.setCurrentCompany(company)
  modalStore.openEditItemModal()
}

const handleDeleteClick = async (company: ICompany) => {
  const { id, name } = company
  const confirmed = confirm(`Are you sure to delete all data for the province: ${name}, ID=${id}?`)
  if (confirmed) {
    // await companyStore.deleteCompany(company)
  }
  modalStore.resetModalState()
}
</script>

<template>
  <h1>Companies Table</h1>
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
          <th scope="col" class="px-4 py-3">Logo</th>
          <th scope="col" class="px-4 py-3">Name</th>
          <th scope="col" class="px-4 py-3">Fullname</th>
          <th scope="col" class="px-4 py-3">Rating</th>
          <th scope="col" class="px-4 py-3">Description</th>
          <th scope="col" class="px-4 py-3">Created</th>
          <th scope="col" class="px-4 py-3">Updated</th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(company, idx) in companies"
          :key="company.name"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">{{ company.id }}</td>
          <td class="px-4 py-3">LOGO</td>
          <td class="px-4 py-3">{{ company.name }}</td>
          <td class="px-4 py-3">{{ company.fullname }}</td>
          <td class="px-4 py-3">{{ company.rating }}</td>
          <td class="px-4 py-3">{{ cutText(company.description, 50) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(company.createdAt) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(company.updatedAt) }}</td>
          <td class="px-4 py-3 flex">
            <button
              @click.stop="handleViewClick(company)"
              type="button"
              class="font-medium text-green-400 hover:no-underline hover:text-green-600 dark:text-green-500 hover:underline mr-4"
            >
              VIEW
            </button>
            <button
              @click.stop="handleEditClick(company)"
              type="button"
              class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
            >
              EDIT
            </button>
            <button
              @click.stop="handleDeleteClick(company)"
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
