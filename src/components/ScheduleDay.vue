<script setup lang="ts">
import type { ScheduleDay } from '@/types'
import ScheduleLesson from './ScheduleLesson.vue'
import ChipBase from './foundation/ChipBase.vue'
import { computed } from 'vue'
import formatDate from '@/utils/formatDate'

const props = defineProps<{
  day: ScheduleDay
}>()

const dayHeader = computed(() =>
  // formatDate(props.day.date)
  props.day.date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
)
</script>

<template>
  <div class="day d-flex flex-col">
    <div class="day-header-wrapper d-flex">
      <ChipBase>{{ dayHeader }}</ChipBase>
    </div>
    <ScheduleLesson v-for="lesson in day.lessons" :key="lesson.lessonOid" :lesson="lesson" />
  </div>
</template>

<style>
.day {
  gap: 12px;
  position: relative;
}

.day-header-wrapper {
  position: sticky;
  top: 4px;

  justify-content: center;
}
</style>
