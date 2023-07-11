<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { ICompany, ICompanyKeys, ICompanyTableCol } from '@/types'
import { useCompanyStore } from '@/stores/company'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'
import CompanyForm from '@/components/CompanyForm.vue'
import FilterInput from '@/components/FilterInput.vue'
import AddNewButton from '@/components/AddNewButton.vue'
import { arrowUpIcon, arrowDownIcon } from '@/constants/icons'

const companyStore = useCompanyStore()
const { filterStr, sortProperty, sortOrder, sortedCompanies } = storeToRefs(companyStore)
const modalStore = useModalStore()

onMounted(() => {
  companyStore.resetCurrentCompany()
})

const tableCols: ICompanyTableCol[] = [
  { field: 'id', title: 'ID' },
  { field: 'logo', title: 'LOGO' },
  { field: 'name', title: 'NAME' },
  { field: 'fullname', title: 'FULLNAME' },
  { field: 'rating', title: 'RAING' },
  { field: 'description', title: 'DESCRIPTION' },
  { field: 'createdAt', title: 'CREATED' },
  { field: 'updatedAt', title: 'UPDATED' }
]

const sortIcon = computed(() => {
  return sortOrder.value === 'asc' ? arrowUpIcon : arrowDownIcon
})

const handleSort = (property: ICompanyKeys) => {
  if (sortProperty.value === property) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortProperty.value = property
    sortOrder.value = 'asc'
  }
}

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
    await companyStore.deleteCompany(company)
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
          v-for="(company, idx) in sortedCompanies"
          :key="company.name"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">{{ company.id }}</td>
          <td class="px-4 py-3">
            <div class="w-24 h-auto">
              <img class="rounded" title="Logo" alt="Logo" :src="company.logo" />
            </div>
          </td>
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
  <CompanyForm />
</template>
