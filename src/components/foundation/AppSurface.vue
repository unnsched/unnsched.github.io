<template>
  <div class="surface">
    <slot></slot>
  </div>
</template>

<style>
.surface {
  width: 100%;
  height: 100%;
  background: var(--surface);
  color: var(--on-surface);
}
</style>
