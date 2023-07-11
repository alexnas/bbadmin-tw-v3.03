<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import type { IUser, IUserKeys, IUserTableCol } from '@/types'
import { useUserStore } from '@/stores/user'
import { useRoleStore } from '@/stores/role'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import UserForm from '@/components/UserForm.vue'
import { useItemNameById } from '@/composables/ItemsById'
import FilterInput from '@/components/FilterInput.vue'
import AddNewButton from '@/components/AddNewButton.vue'
import { arrowUpIcon, arrowDownIcon } from '@/constants/icons'

const userStore = useUserStore()
const { filterStr, sortProperty, sortOrder, sortedUsers } = storeToRefs(userStore)
const modalStore = useModalStore()
const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)

onMounted(() => {
  userStore.getUsers()
  userStore.resetCurrentUser()
})

const tableCols: IUserTableCol[] = [
  { field: 'id', title: 'ID' },
  { field: 'isActive', title: 'ON' },
  { field: 'name', title: 'NAME' },
  { field: 'email', title: 'EMAIL' },
  { field: 'roleId', title: 'ROLE' },
  { field: 'createdAt', title: 'CREATED' },
  { field: 'updatedAt', title: 'UPDATED' }
]

const sortIcon = computed(() => {
  return sortOrder.value === 'asc' ? arrowUpIcon : arrowDownIcon
})

const handleSort = (property: IUserKeys) => {
  if (sortProperty.value === property) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortProperty.value = property
    sortOrder.value = 'asc'
  }
}

const handleAddNewClick = () => {
  userStore.cancelPreEditedUser()
  modalStore.openNewItemModal()
}

const handleViewClick = (user: IUser) => {
  userStore.setPreEditedUser(user)
  userStore.setCurrentUser(user)
  modalStore.openViewItemModal()
}

const handleEditClick = (user: IUser) => {
  userStore.setPreEditedUser(user)
  userStore.setCurrentUser(user)
  modalStore.openEditItemModal()
}

const handleDeleteClick = async (user: IUser) => {
  const { id, name } = user
  const confirmed = confirm(`Are you sure to delete all data for the user: ${name}, ID=${id}?`)
  if (confirmed) {
    await userStore.deleteUser(user)
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
          v-for="(user, idx) in sortedUsers"
          :key="user.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">{{ user.id }}</td>
          <td class="px-4 py-3">
            <Icon v-if="user.isActive" icon="mdi:tick" class="text-3xl text-green-400" />
            <Icon v-else icon="mdi:cancel" class="text-3xl text-red-300" />
          </td>
          <td class="px-4 py-3">{{ user.name }}</td>
          <td class="px-4 py-3">{{ user.email }}</td>
          <td class="px-4 py-3">{{ useItemNameById(user.roleId, roles) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(user.createdAt) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(user.updatedAt) }}</td>
          <td class="px-4 py-3 flex">
            <button
              @click.stop="handleViewClick(user)"
              type="button"
              class="font-medium text-green-400 hover:no-underline hover:text-green-600 dark:text-green-500 hover:underline mr-4"
            >
              VIEW
            </button>
            <button
              @click.stop="handleEditClick(user)"
              type="button"
              class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
            >
              EDIT
            </button>
            <button
              @click.stop="handleDeleteClick(user)"
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

  <!-- User Modal Form -->
  <UserForm />
</template>
