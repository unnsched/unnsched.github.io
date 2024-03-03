<script setup lang="ts">
import HeroImg from '@/assets/Hero.svg'
</script>

<template>
  <div class="container d-flex flex-col no-select">
    <img :src="HeroImg" draggable="false" />

    <span class="message">
      <slot />
    </span>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
}

.container > img {
  width: 140px;
  margin-bottom: 24px;
}

.message {
  font-size: 18px;
}
</style>
