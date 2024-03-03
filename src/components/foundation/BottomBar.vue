<template>
  <div class="container">
    <slot></slot>

    <div class="actionbutton">
      <slot name="fab"></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;

  width: 100%;
  height: 60px;

  background: var(--container-primary);
  color: var(--on-container-primary);
}

.container > .actionbutton {
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
