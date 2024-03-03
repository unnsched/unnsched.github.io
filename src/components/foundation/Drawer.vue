<script setup lang="ts">
import Modal from './Modal.vue'

const model = defineModel<boolean>()
</script>

<template>
  <Modal v-if="model" class="drawer" @close="model = false">
    <div class="drawer-content d-flex flex-col">
      <div class="drawer-content__header">
        <slot name="header"></slot>
      </div>
      <div class="drawer-content__main">
        <slot></slot>
      </div>
      <div class="drawer-content__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </Modal>
</template>

<style>
.drawer {
  max-width: 320px;
  height: 100%;

  background: var(--drawer);
  color: var(--on-drawer);

  border-top-right-radius: var(--shape-large);
  border-bottom-right-radius: var(--shape-large);
}

.drawer-content {
  width: 100%;
  height: 100%;

  overflow-y: auto;
}

.drawer-content__header {
  padding: 32px 16px 18px 16px;
  border-bottom: 1px solid var(--outline);

  font-weight: 500;
}
.drawer-content__main {
  flex: 1;
  padding: 8px 0;
}
.drawer-content__footer {
  padding: 18px 16px;
  border-top: 1px solid var(--outline);

  font-size: 14px;
  font-weight: lighter;
}
</style>
