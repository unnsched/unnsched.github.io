<script setup lang="ts">
import ModalBase from './ModalBase.vue'

const model = defineModel<boolean>()
</script>

<template>
  <ModalBase v-if="model" class="bottomsheet" @close="model = false">
    <div class="bottomsheet-content d-flex flex-col">
      <div class="bottomsheet-content__spacer" />
      <div class="bottomsheet-content__headline">
        <slot name="headline"></slot>
      </div>
      <div class="bottomsheet-content__main">
        <slot></slot>
      </div>
    </div>
  </ModalBase>
</template>

<style>
.bottomsheet {
  width: 100%;
  min-height: 400px;

  position: absolute;
  bottom: 0;

  background: var(--drawer);
  color: var(--on-drawer);

  border-top-left-radius: var(--shape-large);
  border-top-right-radius: var(--shape-large);
}

.bottomsheet-content {
  width: 100%;
  height: 100%;
}

.bottomsheet-content__spacer {
  height: 24px;
}

.bottomsheet-content__headline {
  font-weight: 500;
}
</style>
