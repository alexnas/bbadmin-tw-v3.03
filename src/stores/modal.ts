import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useProvinceStore } from '@/stores/province'

export const useModalStore = defineStore('modal', () => {
  const isModalActive = ref<boolean>(false)
  const isNewItem = ref<boolean>(true)
  const isViewItem = ref<boolean>(false)

  const provinceStore = useProvinceStore()
  const { currentProvince } = storeToRefs(provinceStore)

  const resetModalState = () => {
    isModalActive.value = false
    isNewItem.value = true
    isViewItem.value = false
  }

  const modalTitle = computed(() => {
    if (isViewItem.value || !isNewItem.value) {
      return `Province: ${currentProvince.value.name} (id: ${currentProvince.value.id})`
    } else {
      return 'New Province'
    }
  })

  const openNewItemModal = () => {
    resetModalState()
    isModalActive.value = true
  }

  const openEditItemModal = () => {
    resetModalState()
    isModalActive.value = true
    isNewItem.value = false
  }

  const openViewItemModal = () => {
    resetModalState()
    isModalActive.value = true
    isNewItem.value = false
    isViewItem.value = true
  }

  return {
    isModalActive,
    isNewItem,
    isViewItem,
    modalTitle,
    openNewItemModal,
    openEditItemModal,
    openViewItemModal,
    resetModalState
  }
})
