<script setup lang="ts">
defineEmits(['close-modal', 'submit-form'])
defineProps({
  modalTitle: {
    type: String,
    default: 'Modal Card'
  },
  isModalActive: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isModalActive"
      class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
    >
      <div
        v-if="isModalActive"
        role="alert"
        class="relative mx-auto w-11/12 md:w-2/3 max-w-lg p-6 text-green-700 bg-gray-100 self-start mt-32 max-w-screen-md shadow-md sm:rounded-lg"
      >
        <h1 class="text-2xl mb-4">{{ modalTitle }}</h1>
        <button
          class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
          @click="$emit('close-modal')"
          aria-label="close modal"
          role="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <slot />

        <div class="flex items-center justify-start w-full mt-4">
          <button
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-150 ease-in-out hover:bg-teal-600 bg-teal-700 sm:rounded-lg text-white px-8 py-2 text-sm"
            type="submit"
            @click.prevent="$emit('submit-form')"
          >
            Submit
          </button>
          <button
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border sm:rounded-lg px-8 py-2 text-sm"
            @click="$emit('close-modal')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped></style>
