<template>
  <div class="d-flex icon-wrapper">
    <span class="material-icons">
      <slot></slot>
    </span>
  </div>
</template>

<style>
.icon-wrapper {
  justify-content: center;
}
.material-icons {
  user-select: none;
  font-size: inherit;
}
</style>
