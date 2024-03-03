<script setup lang="ts">
import type { ScheduleDay } from '@/types'
import ScheduleLesson from './ScheduleLesson.vue'
import Chip from './foundation/Chip.vue'
import { computed } from 'vue'

const props = defineProps<{
  day: ScheduleDay
}>()

const dayHeader = computed(() =>
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
      <Chip>{{ dayHeader }}</Chip>
    </div>
    <ScheduleLesson :lesson="lesson" v-for="lesson in day.lessons" />
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
