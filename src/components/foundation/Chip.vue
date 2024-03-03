<template>
  <div class="chip">
    <slot></slot>
  </div>
</template>

<style>
.chip {
  padding: 4px 6px;

  border: 1px solid var(--outline);
  border-radius: var(--shape-small);

  background: var(--surface-bright);
  color: var(--on-surface-bright);
}
</style>
