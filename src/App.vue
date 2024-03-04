<script setup lang="ts">
import { ref } from 'vue'

import type { DateRange, Schedule, ScheduleEntity } from '@/types'

import * as ScheduleService from '@/services/ScheduleService'

import AppSurface from './components/foundation/AppSurface.vue'
import AppLayout from './components/foundation/AppLayout.vue'
import BottomBar from './components/foundation/BottomBar.vue'
import ScheduleRoot from './components/ScheduleRoot.vue'
import FancyMessage from './components/FancyMessage.vue'
import AppDrawer from './components/AppDrawer.vue'
import AppSearch from './components/AppSearch.vue'
import FloatingActionButton from './components/foundation/FloatingActionButton.vue'
import DateBottomSheet from './components/DateBottomSheet.vue'
import GlobalSnackbar from './components/GlobalSnackbar.vue'

const isDrawerOpen = ref<boolean>(false)
const isDateSelectionOpen = ref<boolean>(false)

const getBookmarks = () =>
  JSON.parse(window.localStorage.getItem('bookmarks') ?? '[]') as ScheduleEntity[]
const setBookmarks = (value: ScheduleEntity[]) =>
  window.localStorage.setItem('bookmarks', JSON.stringify(value))
//
const bookmarks = ref<ScheduleEntity[]>(getBookmarks())
//
const addBookmark = (entity: ScheduleEntity) => {
  bookmarks.value.push(entity)
  setBookmarks(bookmarks.value)
}
const removeBookmark = (entity: ScheduleEntity) => {
  bookmarks.value = bookmarks.value.filter((v) => v != entity)
  setBookmarks(bookmarks.value)
}
const setBookmarkAsDefault = (entity: ScheduleEntity) => {
  const idx = bookmarks.value.indexOf(entity)
  const { value } = bookmarks
  ;[value[0], value[idx]] = [value[idx], value[0]]
  setBookmarks(value)
}

const currentEntity = ref<ScheduleEntity | undefined>()
const schedule = ref<Schedule | undefined>()

const rangeBegin = ref<Date>(new Date())
const rangeEnd = ref<Date>(new Date())
//
const reinitializeDateRange = () => {
  rangeBegin.value = new Date()
  rangeEnd.value = new Date()
  rangeEnd.value.setDate(rangeEnd.value.getDate() + 7)
}
reinitializeDateRange()

const loadSchedule = (entity: ScheduleEntity) => {
  isDrawerOpen.value = false
  currentEntity.value = entity
  schedule.value = undefined

  const range: DateRange = {
    begin: rangeBegin.value,
    end: rangeEnd.value
  }
  ScheduleService.getSchedule(entity.type, entity.id, range).then((res) => (schedule.value = res))
}

const onEntitySelect = (selected: ScheduleEntity) => {
  loadSchedule(selected)

  if (!bookmarks.value.length) {
    addBookmark(selected)
  }
}

if (bookmarks.value.length) {
  loadSchedule(bookmarks.value[0])
}

const onDateSelect = (range?: DateRange) => {
  isDateSelectionOpen.value = false
  if (!range) {
    reinitializeDateRange()
  } else {
    rangeBegin.value = range!!.begin
    rangeEnd.value = range!!.end
  }
  if (currentEntity.value) {
    loadSchedule(currentEntity.value)
  }
}

const ddMM = (date: Date) =>
  `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`
</script>

<template>
  <AppSurface class="app-wrapper d-flex">
    <AppLayout class="app-layout">
      <AppDrawer
        v-model="isDrawerOpen"
        :defEntity="bookmarks.length ? bookmarks[0] : undefined"
        :bookmarks="bookmarks"
        :current="currentEntity"
        @add="addBookmark"
        @star="setBookmarkAsDefault"
        @delete="removeBookmark"
        @select="loadSchedule"
      />

      <template v-slot:header>
        <div class="search-wrapper d-flex">
          <AppSearch
            :activeEntity="currentEntity!!"
            @menu="isDrawerOpen = true"
            @select="onEntitySelect"
          />
        </div>
      </template>

      <ScheduleRoot v-if="!!schedule && schedule.days.length" :schedule="schedule" />
      <FancyMessage v-else-if="!!schedule && !schedule.days.length">Ничего нет :(</FancyMessage>
      <FancyMessage v-else-if="!!currentEntity">Загрузка...</FancyMessage>
      <FancyMessage v-else style="text-align: center">
        Выберите группу для
        <br />
        просмотра расписания
      </FancyMessage>

      <DateBottomSheet
        v-model="isDateSelectionOpen"
        v-model:begin="rangeBegin"
        v-model:end="rangeEnd"
        @result="onDateSelect"
      />

      <GlobalSnackbar />

      <template v-slot:footer>
        <BottomBar class="bottombar d-flex flex-row no-select">
          <span>{{ ddMM(rangeBegin) }}</span>
          <span>{{ ddMM(rangeEnd) }}</span>

          <template v-slot:fab>
            <FloatingActionButton @click="isDateSelectionOpen = true">
              calendar_month
            </FloatingActionButton>
          </template>
        </BottomBar>
      </template>
    </AppLayout>
  </AppSurface>
</template>

<style scoped>
.app-wrapper {
  justify-content: center;
  align-items: center;
}

.app-layout {
  position: relative;
}

@media (min-aspect-ratio: 3/4) {
  .app-layout {
    max-width: 480px;
    border-radius: 16px;
    border: 1px solid rgba(128, 128, 128, 0.5);
    height: 98%;
    overflow: hidden;
  }
}

.search-wrapper {
  width: 100%;
  padding: 12px 0;
  justify-content: center;
}

.bottombar {
  padding: 0 64px;
  align-items: center;
  justify-content: space-between;
}
</style>
