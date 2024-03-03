<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
const emit = defineEmits(['close'])

const handleClick = (event: MouseEvent) =>
  (event.target as HTMLElement).classList.contains('modal') && emit('close')
</script>

<template>
  <div class="modal" @click.stop="handleClick">
    <div class="modal__content" v-bind="$attrs">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.modal {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 999;

  background-color: rgba(0, 0, 0, 0.32);
}
</style>
