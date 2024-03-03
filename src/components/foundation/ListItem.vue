<script setup lang="ts"></script>

<template>
  <div
    class="listitem d-flex flex-row"
    :class="{ clickable: !!$attrs.onClick }"
    :tabindex="$attrs.onClick ? 0 : undefined"
  >
    <div class="leading d-flex">
      <slot name="leading"></slot>
    </div>
    <div class="content d-flex flex-col">
      <span class="headline d-flex">
        <slot name="headline"></slot>
      </span>
      <span class="supporting d-flex">
        <slot name="supporting"></slot>
      </span>
    </div>
    <div class="trailing d-flex">
      <slot name="trailing"></slot>
    </div>
  </div>
</template>

<style>
.listitem {
  padding: 16px 16px 16px 12px;
  gap: 8px;
}

.listitem > .leading {
  min-width: 32px;
  font-size: 24px;

  justify-content: center;
}

.listitem > .content {
  flex: 1;
  gap: 4px;
  min-width: 0;
}
.listitem > .content > .headline {
  color: var(--on-container-primary);
}
.listitem > .content > .supporting {
  font-size: 15px;
}
</style>
