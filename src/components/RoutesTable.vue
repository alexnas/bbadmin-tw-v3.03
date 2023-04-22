<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import type { IRoute } from '@/types'
import { useRouteStore } from '@/stores/route'
import { useCompanyStore } from '@/stores/company'
import { useCityStore } from '@/stores/city'
import { useModalStore } from '@/stores/modal'
import { formatDateTime } from '@/tools/formatDate'
import { cutText } from '@/tools/formatString'
import RouteForm from '@/components/RouteForm.vue'

const routeStore = useRouteStore()
const { routes } = storeToRefs(routeStore)
const modalStore = useModalStore()
const companyStore = useCompanyStore()
const cityStore = useCityStore()

onMounted(() => {
  routeStore.resetCurrentRoute()
})

const handleAddNewClick = () => {
  routeStore.cancelPreEditedRoute()
  modalStore.openNewItemModal()
}

const handleViewClick = (route: IRoute) => {
  routeStore.setPreEditedRoute(route)
  routeStore.setCurrentRoute(route)
  modalStore.openViewItemModal()
}

const handleEditClick = (route: IRoute) => {
  routeStore.setPreEditedRoute(route)
  routeStore.setCurrentRoute(route)
  modalStore.openEditItemModal()
}

const handleDeleteClick = async (route: IRoute) => {
  const { id, name } = route
  const confirmed = confirm(`Are you sure to delete all data for the route: ${name}, ID=${id}?`)
  if (confirmed) {
    await routeStore.deleteRoute(route)
  }
  modalStore.resetModalState()
}
</script>

<template>
  <div class="flex items-center justify-end -mt-6 h-24">
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
          <th scope="col" class="px-4 py-3">ID</th>
          <th scope="col" class="px-4 py-3">Name</th>

          <th scope="col" class="px-4 py-3">Company</th>

          <th scope="col" class="px-4 py-3">From</th>
          <th scope="col" class="px-4 py-3">To</th>
          <th scope="col" class="px-4 py-3">Via</th>

          <th scope="col" class="px-4 py-3">Start</th>
          <th scope="col" class="px-4 py-3">End</th>

          <th scope="col" class="px-4 py-3">Price</th>
          <th scope="col" class="px-4 py-3">Distance</th>

          <th scope="col" class="px-4 py-3">Description</th>
          <th scope="col" class="px-4 py-3">Created</th>
          <th scope="col" class="px-4 py-3">Updated</th>
          <th scope="col" class="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(route, idx) in routes"
          :key="route.name"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3">{{ idx + 1 }}</td>
          <td class="px-4 py-3">{{ route.id }}</td>
          <td class="px-4 py-3">{{ route.name }}</td>
          <td class="px-4 py-3">{{ companyStore.getCompanyNameById(route.companyId) }}</td>

          <td class="px-4 py-3">{{ cityStore.getCityNameById(route.startCityId) }}</td>
          <td class="px-4 py-3">{{ cityStore.getCityNameById(route.endCityId) }}</td>
          <td class="px-4 py-3">{{ cityStore.getCityNameById(route.viaCityId) }}</td>

          <td class="px-4 py-3">{{ route.start_time }}</td>
          <td class="px-4 py-3">{{ route.start_time }}</td>

          <td class="px-4 py-3">{{ route.price }}</td>
          <td class="px-4 py-3">{{ route.distance }}</td>

          <td class="px-4 py-3">{{ cutText(route.description, 50) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(route.createdAt) }}</td>
          <td class="px-4 py-3">{{ formatDateTime(route.updatedAt) }}</td>
          <td class="px-4 py-3 flex">
            <button
              @click.stop="handleViewClick(route)"
              type="button"
              class="font-medium text-green-400 hover:no-underline hover:text-green-600 dark:text-green-500 hover:underline mr-4"
            >
              VIEW
            </button>
            <button
              @click.stop="handleEditClick(route)"
              type="button"
              class="font-medium text-blue-300 hover:no-underline hover:text-blue-600 dark:text-blue-500 hover:underline mr-4"
            >
              EDIT
            </button>
            <button
              @click.stop="handleDeleteClick(route)"
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
  <RouteForm />
</template>
