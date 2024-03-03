<script setup lang="ts">
import type { ScheduleEntity } from '@/types'

import * as ScheduleService from '@/services/ScheduleService'

import SearchBar from '@/components/foundation/SearchBar.vue'
import IconButton from '@/components/foundation/IconButton.vue'
import ListItem from '@/components/foundation/ListItem.vue'
import MaterialIcon from './foundation/MaterialIcon.vue'
import { ref } from 'vue'
import { EntityIcons } from '@/assets/EntityIcons'

const props = defineProps<{
  activeEntity?: ScheduleEntity
}>()
const emit = defineEmits<{
  (e: 'menu'): void
  (e: 'select', value: ScheduleEntity): void
}>()

const isOpen = ref<boolean>(false)

const doSearch = async (query: string): Promise<ScheduleEntity[] | null> => {
  try {
    return ScheduleService.search(query)
  } catch {
    return null
  }
}

const onSelect = (entity: ScheduleEntity) => {
  emit('select', entity)
  isOpen.value = false
}
</script>

<template>
  <SearchBar
    class="searchbar no-select"
    v-model="isOpen"
    placeholder="Поиск расписания"
    :doSearch="doSearch"
  >
    <template v-slot:leading>
      <IconButton @click.stop="$emit('menu')">menu</IconButton>
    </template>
    {{ activeEntity?.label ?? 'Поиск расписания' }}
    <template v-slot:trailing>
      <IconButton>search</IconButton>
    </template>
    <template v-slot:result="{ item }">
      <ListItem @click.stop="onSelect(item)">
        <template v-slot:leading>
          <MaterialIcon class="appsearch__leading-icon">
            {{ EntityIcons[item.type] }}
          </MaterialIcon>
        </template>
        <template v-slot:headline>
          {{ item.label }}
        </template>
        <template v-slot:supporting>
          {{ item.description }}
        </template>
      </ListItem>
    </template>
  </SearchBar>
</template>

<style>
.searchbar {
  max-width: 320px;
}
.appsearch__leading-icon {
  min-width: 64px;
}
</style>
