<template>
  <div class="container d-flex flex-col">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

main {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
