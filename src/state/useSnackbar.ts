import { ref } from 'vue'

const isSnackbarVisible = ref<boolean>(false)
const snackbarContent = ref<any>(null)

let timeoutId: number

export default function useSnackbar() {
  return {
    isSnackbarVisible,
    snackbarContent,

    setSnackbarContent: (content: any, timeout: number = 1500) => {
      window.clearTimeout(timeoutId)

      snackbarContent.value = content
      isSnackbarVisible.value = true

      timeoutId = window.setTimeout(() => {
        isSnackbarVisible.value = false
        snackbarContent.value = null
      }, timeout)
    },

    hideSnackbar: () => {
      window.clearTimeout(timeoutId)
      isSnackbarVisible.value = false
    }
  }
}
