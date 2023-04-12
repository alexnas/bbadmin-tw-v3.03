import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const selectedFile = ref<File | null>(null)
  const fileInputState = ref<string>('')
  const previewSource = ref<string | ArrayBuffer | null>(null)

  const buttonTxt = computed(() => (selectedFile.value ? 'Ready to upload...' : 'Choose file'))
  const fileName = computed(() =>
    selectedFile.value ? selectedFile.value.name : 'No file choosen'
  )

  const resetFileInput = () => {
    selectedFile.value = null
    fileInputState.value = ''
    previewSource.value = null
  }

  return {
    selectedFile,
    fileInputState,
    previewSource,
    buttonTxt,
    fileName,
    resetFileInput
  }
})
