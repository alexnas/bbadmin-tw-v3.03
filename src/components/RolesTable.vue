<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { IRole } from '@/types'
import { useRoleStore } from '@/stores/role'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'
import RoleForm from '@/components/RoleForm.vue'
import AddNewButton from '@/components/AddNewButton.vue'

const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)
const modalStore = useModalStore()

onMounted(() => {
  roleStore.resetCurrentRole()
})

const handleAddNewClick = () => {
  roleStore.cancelPreEditedRole()
  modalStore.openNewItemModal()
}

const handleViewClick = (role: IRole) => {
  roleStore.setPreEditedRole(role)
  roleStore.setCurrentRole(role)
  modalStore.openViewItemModal()
}

const handleEditClick = (role: IRole) => {
  roleStore.setPreEditedRole(role)
  roleStore.setCurrentRole(role)
  modalStore.openEditItemModal()
}

const handleDeleteClick = async (role: IRole) => {
  const { id, name } = role
  const confirmed = confirm(`Are you sure to delete all data for the province: ${name}, ID=${id}?`)
  if (confirmed) {
    await roleStore.deleteRole(role)
  }
  modalStore.resetModalState()
}
</script>

<template>
  <div class="flex items-center justify-end -mt-6 h-24">
    <AddNewButton @openAddNew="handleAddNewClick()" />
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-base text-left text-gray-500 dark:text-gray-400 bg-gray-50">
      <thead
        class="text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
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
          v-for="(role, idx) in roles"
          :key="role.name"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">{{ role.id }}</td>
          <td class="px-4 py-3">{{ role.name }}</td>
          <td class="px-4 py-3">{{ cutText(role.description, 50) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(role.createdAt) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(role.updatedAt) }}</td>
          <td class="px-4 py-3 flex">
            <button
              @click.stop="handleViewClick(role)"
              type="button"
              class="font-medium text-green-400 hover:no-underline hover:text-green-600 dark:text-green-500 hover:underline mr-4"
            >
              VIEW
            </button>
            <button
              @click.stop="handleEditClick(role)"
              type="button"
              class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
            >
              EDIT
            </button>
            <button
              @click.stop="handleDeleteClick(role)"
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
  <RoleForm />
</template>
