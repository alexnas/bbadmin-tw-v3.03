<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as Yup from 'yup'
import { useRouteStore } from '@/stores/route'
import { useModalStore } from '@/stores/modal'
import { useCityStore } from '@/stores/city'
import { useCompanyStore } from '@/stores/company'
import { formatDateTime } from '@/tools/formatDate'
import BaseModal from '@/components/BaseModal.vue'
import { timeRegex, currencyRegex } from '@/tools/formatRegex'

const routeStore = useRouteStore()
const { currentRoute } = storeToRefs(routeStore)
const modalStore = useModalStore()
const { isNewItem, isViewItem } = storeToRefs(modalStore)
const cityStore = useCityStore()
const { cities } = storeToRefs(cityStore)
const companyStore = useCompanyStore()
const { companies } = storeToRefs(companyStore)

const citySchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name should not be more than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters')
    .max(250, 'Description should not be more than 250 characters'),
  company: Yup.number()
    .required('Company is required')
    .min(-1, 'Select company')
    .notOneOf([-1], 'Select company'),
  startCity: Yup.number()
    .required('Start City is required')
    .min(-1, 'Select Start City')
    .notOneOf([-1], 'Select Start City'),
  endCity: Yup.number()
    .required('End City is required')
    .min(-1, 'Select End City')
    .notOneOf([-1], 'Select End City'),
  viaCity: Yup.number()
    .nullable('Define main stopover as  Via City if it is necessary')
    .typeError('Define main stopover as  Via City if it is necessary')
    .min(-1, 'Define main stopover as  Via City if it is necessary')
    .transform((_, val) => (val !== '' ? Number(val) : null)),
  startTime: Yup.string()
    .required('Start Time is required')
    .matches(timeRegex, 'Time data should have correct time pattern.'),
  endTime: Yup.string()
    .required('End Time is required')
    .matches(timeRegex, 'Time data should have correct time pattern.'),
  price: Yup.number()
    .required('Price is required')
    .positive()
    .test(
      'is-decimal',
      'The amount should be a decimal with maximum two digits after comma',
      (val: any) => {
        if (val != undefined) {
          return currencyRegex.test(val)
        }
        return true
      }
    )
    .min(0, 'Price must be at least 0')
    .max(1000, 'Price  should not be more than 1000'),
  distance: Yup.number().required('Distance is required').min(0)
})

const modalTitle = computed(() => {
  return isViewItem.value || !isNewItem.value
    ? `City: ${currentRoute.value.name} (id: ${currentRoute.value.id})`
    : 'New Route'
})

const closeModal = () => {
  routeStore.resetCurrentRoute()
  modalStore.resetModalState()
}

const resetModalForm = () => {
  routeStore.resetPreEditedRoute()
}

const handleEditClick = () => {
  routeStore.setCurrentRoute(currentRoute.value)
  modalStore.openEditItemModal()
}

const handleSubmit = async () => {
  const formResult = { ...currentRoute.value, name: routeStore.routeName }

  if (isNewItem.value) {
    await routeStore.createRoute(formResult)
  } else {
    await routeStore.updateRoute(formResult)
  }
  routeStore.resetCurrentRoute()
  modalStore.resetModalState()
}
</script>

<template>
  <base-modal @closeModal="closeModal" :modalTitle="modalTitle">
    <VeeForm
      class="relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded"
      :validation-schema="citySchema"
      v-slot="{ errors, meta }"
    >
      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Name</label
        >
        <VeeField
          name="name"
          type="text"
          v-model="routeStore.routeName"
          :disabled="true"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Route name"
        />
        <div class="text-red-400">{{ errors && errors?.name }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Company*</label
        >
        <VeeField
          as="select"
          name="company"
          :disabled="isViewItem"
          v-model="currentRoute.companyId"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option v-for="option in companies" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </VeeField>
        <div class="text-red-400">{{ errors && errors?.company }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Start City*</label
        >
        <VeeField
          as="select"
          name="startCity"
          :disabled="isViewItem"
          v-model="currentRoute.startCityId"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="-1" disabled selected>- Not selected -</option>
          <option v-for="option in cities" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </VeeField>
        <div class="text-red-400">{{ errors && errors?.startCity }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >End City*</label
        >
        <VeeField
          as="select"
          name="endCity"
          :disabled="isViewItem"
          v-model="currentRoute.endCityId"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="-1" disabled selected>- Not selected -</option>
          <option v-for="option in cities" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </VeeField>
        <div class="text-red-400">{{ errors && errors?.endCity }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Via City</label
        >
        <VeeField
          as="select"
          name="viaCity"
          :disabled="isViewItem"
          v-model="currentRoute.viaCityId"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="" selected class="text-teal-600 text-base">- Not defined -</option>
          <option v-for="option in cities" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </VeeField>
        <div class="text-red-400">{{ errors && errors?.viaCity }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Start Time*</label
        >
        <VeeField
          type="time"
          name="startTime"
          :disabled="isViewItem"
          v-model="currentRoute.start_time"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        />
        <div class="text-red-400">{{ errors && errors?.startTime }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >End Time*</label
        >
        <VeeField
          type="time"
          name="endTime"
          :disabled="isViewItem"
          v-model="currentRoute.end_time"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        />
        <div class="text-red-400">{{ errors && errors?.endTime }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Price*</label
        >
        <VeeField
          name="price"
          type="number"
          min="0.00"
          max="1000.00"
          step="0.01"
          v-model="currentRoute.price"
          :disabled="false"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Route adult ticket price"
        />
        <div class="text-red-400">{{ errors && errors?.price }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Distance*</label
        >
        <VeeField
          name="distance"
          type="number"
          v-model="currentRoute.distance"
          :disabled="false"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Route distance"
        />
        <div class="text-red-400">{{ errors && errors?.distance }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Description*</label
        >
        <VeeField
          name="description"
          as="textarea"
          v-model="currentRoute.description"
          :disabled="isViewItem"
          class="mb-5 mt-2 pt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="City description"
        />
        <div class="text-red-400">{{ errors && errors.description }}</div>
      </div>

      <div v-if="!isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Created</label
        >
        <input
          name="createdAt"
          :value="formatDateTime(currentRoute.createdAt)"
          readonly
          class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Date of creation"
        />
      </div>

      <div v-if="!isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Updated</label
        >
        <input
          name="updatedAt"
          :value="formatDateTime(currentRoute.updatedAt)"
          readonly
          class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Date of update"
        />
      </div>

      <div class="flex items-center justify-start w-full mt-4">
        <button
          @click.prevent="handleEditClick"
          v-if="isViewItem"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 transition duration-150 ease-in-out hover:bg-orange-600 bg-orange-700 sm:rounded-lg text-white px-8 py-2 text-sm"
          type="button"
        >
          Edit
        </button>
        <button
          v-if="!isViewItem"
          :disabled="!meta.valid"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out enabled:hover:bg-teal-600 enabled:bg-teal-700 disabled:bg-gray-400 sm:rounded-lg text-white px-8 py-2 text-sm"
          type="submit"
          @click.prevent="handleSubmit"
        >
          Submit
        </button>
        <button
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border sm:rounded-lg px-8 py-2 text-sm"
          type="reset"
          @click.prevent="closeModal"
        >
          Cancel
        </button>

        <div class="ml-auto sm:visible invisible">
          <button
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-500 transition duration-150 text-gray-100 ease-in-out hover:border-gray-400 hover:bg-gray-400 border sm:rounded-lg px-8 py-2 text-sm"
            @click.prevent="resetModalForm"
            type="reset"
          >
            Reset
          </button>
        </div>
      </div>
    </VeeForm>
  </base-modal>
</template>
