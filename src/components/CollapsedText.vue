<script setup lang="ts">
import useSnackbar from '@/state/useSnackbar'

const props = defineProps<{
  text: string
}>()

const { setSnackbarContent } = useSnackbar()
</script>

<template>
  <div class="collapsed-text d-flex flex-row" @click="setSnackbarContent(text)">
    <div class="collapsed-text__leading">
      <slot name="leading"></slot>
    </div>
    <div class="collapsed-text__content singleline">
      {{ text }}
    </div>
  </div>
</template>

<style>
.collapsed-text {
  gap: 4px;
  min-width: 0;
}

.collapsed-text__content {
  flex: 1;
  min-width: 0;
}

.collapsed-text__leading {
  opacity: 0.64;
  margin: auto;
}
</style>
