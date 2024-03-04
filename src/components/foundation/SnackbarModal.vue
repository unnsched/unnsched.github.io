<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()
const emits = defineEmits(['close'])
</script>

<template>
  <div v-if="visible" class="snackbar d-flex">
    <div class="snackbar__content" @click="$emit('close')">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.snackbar {
  position: absolute;
  width: 100%;

  left: 0;
  bottom: 0;

  justify-content: center;

  z-index: 9999;
}

.snackbar__content {
  width: 95%;

  margin: auto;
  padding: 16px;

  position: absolute;
  bottom: 64px;

  box-shadow: 0 6px 6px 0px rgba(0, 0, 0, 0.32);
  border-radius: var(--shape-xsmall);

  background: var(--snackbar);
  color: var(--on-snackbar);

  cursor: default;

  word-wrap: break-word;
}
</style>
