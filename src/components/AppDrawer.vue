<script setup lang="ts">
import type { ScheduleEntity } from '@/types'
import DrawerBase from './foundation/DrawerBase.vue'
import AppDrawerEntityListItem from './AppDrawerEntityListItem.vue'
import IconButton from './foundation/IconButton.vue'

const model = defineModel<boolean>()
const props = defineProps<{
  defEntity?: ScheduleEntity
  bookmarks: ScheduleEntity[]
  current?: ScheduleEntity
}>()
const emit = defineEmits<{
  (e: 'add', entity: ScheduleEntity): void
  (e: 'star', entity: ScheduleEntity): void
  (e: 'delete', entity: ScheduleEntity): void
  (e: 'select', entity: ScheduleEntity): void
}>()
</script>

<template>
  <DrawerBase v-model="model" class="app-drawer">
    <template v-slot:header>
      <div class="header d-flex flex-col">
        <img
          class="logo"
          :src="`icon-192-maskable.png`"
          draggable="false"
          width="48"
          height="48"
          style="background: #0f68aa"
        />
        Расписание ННГУ
        <span style="font-weight: lighter">Закладки</span>
      </div>
    </template>

    <AppDrawerEntityListItem
      v-for="entity in bookmarks"
      :key="entity.id"
      :entity="entity"
      @click.stop="$emit('select', entity)"
    >
      <IconButton @click.stop="entity.id != defEntity?.id && $emit('star', entity)">
        {{ entity.id == defEntity?.id ? 'star' : 'star_outline' }}
      </IconButton>
      <IconButton @click.stop="$emit('delete', entity)"> delete_outline </IconButton>
    </AppDrawerEntityListItem>

    <AppDrawerEntityListItem
      v-if="!!current && !bookmarks.some((v) => v.id == current!!.id)"
      :entity="current"
    >
      <IconButton @click.stop="$emit('add', current)"> add </IconButton>
    </AppDrawerEntityListItem>

    <template v-slot:footer>
      <div class="footer d-flex flex-col">
        <a href="UNNAndroid.apk">Приложение ННГУ для Android</a>
        <a href="UNNSched.apk">Расписание ННГУ для Android</a>
        <br />
        <a href="https://github.com/unnsched/unnsched.github.io">Исходный код на GitHub</a>
        <span>(c) Михаил Крылов, 2022-2024</span>
      </div>
    </template>
  </DrawerBase>
</template>

<style scoped>
.header .logo {
  border-radius: var(--shape-circle);
  margin-bottom: 10px;
}
</style>
