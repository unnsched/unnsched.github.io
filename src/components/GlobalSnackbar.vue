<script setup lang="ts">
import Snackbar from './foundation/Snackbar.vue'
import useSnackbar from '@/state/useSnackbar'

const { isSnackbarVisible, snackbarContent, hideSnackbar } = useSnackbar()
</script>

<template>
  <Snackbar :visible="isSnackbarVisible" @close="hideSnackbar">
    {{ snackbarContent }}
  </Snackbar>
</template>
