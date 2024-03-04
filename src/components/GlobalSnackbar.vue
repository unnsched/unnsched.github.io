<script setup lang="ts">
import SnackbarModal from './foundation/SnackbarModal.vue'
import useSnackbar from '@/state/useSnackbar'

const { isSnackbarVisible, snackbarContent, hideSnackbar } = useSnackbar()
</script>

<template>
  <SnackbarModal :visible="isSnackbarVisible" @close="hideSnackbar">
    {{ snackbarContent }}
  </SnackbarModal>
</template>
