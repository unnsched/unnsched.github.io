<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'
</script>

<template>
  <div
    class="iconbutton"
    :class="{ clickable: !!$attrs.onClick }"
    :tabindex="$attrs.onClick ? 0 : undefined"
  >
    <MaterialIcon>
      <slot></slot>
    </MaterialIcon>
  </div>
</template>

<style>
.iconbutton {
  padding: 8px;
  font-size: 24px;
  border-radius: var(--shape-circle);
}
</style>
