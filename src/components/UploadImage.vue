<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'

const imageStore = useImageStore()
const { selectedFile, fileInputState, previewSource, buttonTxt, fileName } = storeToRefs(imageStore)

const onFileSelected = (e: any) => {
  const file: File = e.target.files[0]
  fileInputState.value = e.target.value
  previewFile(file)
}

const previewFile = (file: File) => {
  try {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      selectedFile.value = file
      previewSource.value = reader.result || null
    }
  } catch (error) {
    console.log(error)
  }
}

const handleButtonClick = () => {
  document.getElementById('fileUpload')?.click()
}
</script>

<template>
  <div class="mb-8">
    <label class="text-gray-500 pl-3 text-sm uppercase font-bold leading-tight tracking-normal"
      >New Logo file</label
    >
    <div
      class="mt-2 p-2 w-full text-sm text-gray-600 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    >
      <div v-if="previewSource" class="mb-5">
        <img :src="`${previewSource}`" alt="New Image" />
      </div>

      <div class="flex">
        <input
          name="file"
          type="file"
          id="fileUpload"
          @change="onFileSelected"
          class="hidden"
          aria-describedby="file_input_help"
        />
        <button
          @click.prevent="handleButtonClick"
          v-text="buttonTxt"
          class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 sm:rounded-lg text-white px-8 py-2 text-sm"
        />
        <div class="pl-2 border flex flex-col align-items justify-center">
          <span>{{ fileName }}</span>
        </div>
      </div>

      <div class="mt-1 pl-2 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
        PNG or JPG
      </div>
    </div>
  </div>
</template>
