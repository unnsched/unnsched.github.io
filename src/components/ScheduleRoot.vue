<script setup lang="ts">
import type { Schedule } from '@/types'
import ScheduleDay from './ScheduleDay.vue'

const props = defineProps<{
  schedule: Schedule
}>()
</script>

<template>
  <div class="schedule-root d-flex flex-col">
    <ScheduleDay v-for="day in schedule.days" :key="day.date.getTime()" :day="day" />
    <div style="height: 4px" />
  </div>
</template>

<style>
.schedule-root {
  gap: 12px;
}

/* .schedule-root:before, */
.schedule-root:after {
  content: '';
}
</style>
