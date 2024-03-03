<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'
</script>

<template>
  <div class="fab" :tabindex="$attrs.onClick ? 0 : undefined">
    <div class="fab-content">
      <MaterialIcon>
        <slot></slot>
      </MaterialIcon>
    </div>
    <div class="fab-overlay" :class="{ clickable: !!$attrs.onClick }" />
  </div>
</template>

<style>
.fab {
  padding: 16px;
  font-size: 24px;

  background: var(--container-teritary);
  color: var(--on-container-teritary);

  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.2);
}

.fab-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.fab,
.fab-overlay {
  border-radius: var(--shape-standard);
}
</style>
