<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as Yup from 'yup'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'
import { useRoleStore } from '@/stores/role'
import { formatDateTime } from '@/tools/formatDate'
import BaseModal from '@/components/BaseModal.vue'
import CustomCheckbox from '@/components/CustomCheckbox.vue'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
const modalStore = useModalStore()
const { isNewItem, isViewItem } = storeToRefs(modalStore)
const roleStore = useRoleStore()
const { roles } = storeToRefs(roleStore)

const userSchema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string()
    .label('Name')
    .required()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name should not be more than 50 characters'),
  email: Yup.string()
    .label('Email')
    .required()
    .email('Email should be the proper format "some@some.aaa" '),
  password: Yup.string().when('id', {
    is: (id: number) => id === -1,
    then: (userSchema) =>
      userSchema
        .label('Password')
        .required()
        .min(5, 'Password must be at least 5 characters')
        .max(50, 'Password should not be more than 50 characters'),
    otherwise: (userSchema) => userSchema.notRequired()
  }),
  confirmPassword: Yup.string().when('id', {
    is: (id: number) => id === -1,
    then: (userSchema) =>
      userSchema
        .label('Confirm password')
        .required()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    otherwise: (userSchema) => userSchema.notRequired()
  }),
  role: Yup.number().required().notOneOf([-1], 'Select Role is a required')
})

const modalTitle = computed(() => {
  return isViewItem.value || !isNewItem.value
    ? `User: ${currentUser.value.name} (id: ${currentUser.value.id})`
    : 'New User'
})

const closeModal = () => {
  userStore.resetCurrentUser()
  modalStore.resetModalState()
}

const resetModalForm = () => {
  userStore.resetPreEditedUser()
}

const handleEditClick = () => {
  userStore.setCurrentUser(currentUser.value)
  modalStore.openEditItemModal()
}

const handleSubmit = async () => {
  if (isNewItem.value) {
    await userStore.createUser(currentUser.value)
  } else {
    await userStore.updateUser(currentUser.value)
  }
  userStore.resetCurrentUser()
  modalStore.resetModalState()
}
</script>

<template>
  <base-modal @closeModal="closeModal" :modalTitle="modalTitle">
    <VeeForm
      class="relative py-4 px-5 my-8 md:px-10 bg-gray-50 border border-gray-200 shadow-md rounded"
      :validation-schema="userSchema"
      v-slot="{ errors, meta }"
    >
      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Name*</label
        >
        <VeeField
          name="name"
          type="text"
          v-model="currentUser.name"
          :disabled="isViewItem"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="User name"
        />
        <div class="text-red-400">{{ errors && errors?.name }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Email*</label
        >
        <VeeField
          name="email"
          type="text"
          v-model="currentUser.email"
          :disabled="isViewItem"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="User name"
        />
        <div class="text-red-400">{{ errors && errors.email }}</div>
      </div>

      <div v-if="isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Password*</label
        >
        <VeeField
          name="password"
          type="password"
          v-model="currentUser.password"
          :disabled="isViewItem"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Password"
        />
        <div class="text-red-400">{{ errors && errors?.password }}</div>
      </div>

      <div v-if="isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Confirm Password*</label
        >
        <VeeField
          name="confirmPassword"
          type="password"
          :disabled="isViewItem"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Confirm Password"
        />
        <div class="text-red-400">{{ errors && errors?.confirmPassword }}</div>
      </div>

      <div v-show="false" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >ID</label
        >
        <VeeField
          name="id"
          type="number"
          v-model="currentUser.id"
          :disabled="true"
          class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="User id"
        />
        <div class="text-red-400">{{ errors && errors?.id }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Role*</label
        >
        <VeeField
          as="select"
          name="role"
          :disabled="isViewItem"
          v-model="currentUser.roleId"
          class="mb-5 mt-2 text-gray-600 bg-white focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="-1" disabled selected>- Select option -</option>
          <option v-for="option in roles" :value="option.id" :key="option.id">
            {{ option.name }}
          </option>
        </VeeField>
        <div class="text-red-400">{{ errors && errors?.role }}</div>
      </div>

      <div class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Is Active
        </label>
        <div class="text-gray-600 text-base mb-5 mt-2 pl-3 bg-white border-gray-300 rounded border">
          <CustomCheckbox
            :label="`Check if this user should be active`"
            v-model="currentUser.isActive"
            :value="currentUser.isActive"
            :isDisabled="isViewItem"
          />
        </div>
      </div>

      <div v-if="!isNewItem" class="mb-3">
        <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
          >Created</label
        >
        <input
          name="createdAt"
          :value="formatDateTime(currentUser.createdAt)"
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
          :value="formatDateTime(currentUser.updatedAt)"
          readonly
          class="mb-5 mt-2 read-only:bg-gray-100 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Date of update"
        />
      </div>

      <div class="flex items-center justify-start w-full mt-10">
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
