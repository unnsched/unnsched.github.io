<script setup lang="ts" generic="T">
import { ref, type Ref } from 'vue'
import IconButton from './IconButton.vue'
import debounce from '@/utils/debounce'
import Modal from './Modal.vue'
import MaterialIcon from './MaterialIcon.vue'

export type SearchResultSlotProps<T> = {
  item: T
}

const props = defineProps<{
  placeholder: string
  doSearch: (query: string) => Promise<T[] | null>
}>()
const slots = defineSlots<{
  default(props: SearchResultSlotProps<T>): any
}>()
const emit = defineEmits(['close'])

const isSearching = ref(false)
const searchQuery = ref('')
const results = ref<T[] | null>(null) as Ref<T[] | null>
const error = ref<boolean>(false)

const handleInput = debounce(() => {
  error.value = false

  const query = searchQuery.value
  if (query.length < 2) {
    results.value = null
    return
  }

  isSearching.value = true
  props
    .doSearch(query)
    .then((res) => (results.value = res))
    .catch((err) => (error.value = true))
    .finally(() => (isSearching.value = false))
}, 800)
</script>

<template>
  <Modal class="fullscreen-search__container d-flex flex-col">
    <div class="bar d-flex flex-row">
      <IconButton @click.stop="$emit('close')"> arrow_back </IconButton>
      <input
        type="text"
        :placeholder="placeholder"
        v-model="searchQuery"
        @input="handleInput"
        autofocus
      />
      <div v-if="isSearching">
        <MaterialIcon>circle</MaterialIcon>
      </div>
    </div>

    <div v-if="error" class="fullscreen-search__notice">
      При поиске произошла ошибка, попробуйте еще раз
    </div>
    <div v-if="!!results && !results.length" class="fullscreen-search__notice">
      Ничего не найдено
    </div>
    <div v-else-if="!!results" class="fullscreen-search__results d-flex flex-col">
      <slot v-for="result in results" :item="result" />
    </div>
  </Modal>
</template>

<style>
.fullscreen-search__container {
  width: 100%;
  height: 100%;

  background: var(--container-secondary);
  color: var(--on-container-secondary);
}

.fullscreen-search__container > .bar {
  width: 100%;
  padding: 12px 16px;
  gap: 8px;

  align-items: center;

  border-bottom: 1px solid var(--outline);
}

.fullscreen-search__container > .bar > input {
  flex: 1;

  background-color: transparent;
  border: none;
  outline: none;

  color: inherit;
  font-size: 16px;
}

.fullscreen-search__notice {
  padding: 16px 24px;
}

.fullscreen-search__results {
  flex: 1;
  overflow-y: auto;
}
</style>
