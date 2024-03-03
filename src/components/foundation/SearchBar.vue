<script setup lang="ts" generic="T">
import FullscreenSearch, { type SearchResultSlotProps } from './FullscreenSearch.vue'

const model = defineModel<boolean>()
const props = defineProps<{
  placeholder: string
  doSearch: (query: string) => Promise<T[] | null>
}>()
const slots = defineSlots<{
  default: any
  leading: any
  trailing: any
  //
  result(props: { item: T }): any
}>()
</script>

<template>
  <div class="container d-flex flex-row" @click="model = true" v-bind="$attrs">
    <div class="leading">
      <slot name="leading"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="trailing">
      <slot name="trailing"></slot>
    </div>
  </div>

  <FullscreenSearch
    v-if="model"
    v-slot="searchProps"
    :placeholder="placeholder"
    :doSearch="doSearch"
    @close="model = false"
  >
    <slot name="result" v-bind="searchProps as SearchResultSlotProps<T>"></slot>
  </FullscreenSearch>
</template>

<style scoped>
.container {
  width: 100%;
  height: 56px;

  background: var(--container-secondary);
  color: var(--on-container-secondary);

  border-radius: var(--shape-large);

  align-items: center;

  padding: 16px 12px;
  gap: 16px;
}

.content {
  flex: 1;

  font-size: 14px;
  text-align: center;
}
</style>
