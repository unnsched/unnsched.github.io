<script setup lang="ts">
import type { ScheduleLesson } from '@/types'
import CollapsedText from './CollapsedText.vue'
import MaterialIcon from './foundation/MaterialIcon.vue'
import '@/assets/LessonColors.css'

const props = defineProps<{
  lesson: ScheduleLesson
}>()
</script>

<template>
  <div class="lesson d-flex flex-row">
    <div class="lesson-sidebar d-flex flex-col no-select">
      <div
        class="lesson-badge"
        :style="{
          background: `var(--lesson-kind-${lesson.kindOfWorkOid}, var(--lesson-kind-generic))`
        }"
      >
        {{ lesson.lessonNumberStart }}
      </div>
      <div class="lesson-time d-flex flex-col">
        <span>{{ lesson.beginLesson }}</span>
        <span>{{ lesson.endLesson }}</span>
      </div>
    </div>
    <div class="lesson-content d-flex flex-col">
      <span class="lesson-content__discipline singleline">{{ lesson.discipline }}</span>
      <span class="lesson-content__kind singleline">{{ lesson.kindOfWork ?? 'Нет данных' }}</span>

      <div class="lesson-content__spacer" />

      <CollapsedText
        class="lesson_content__detail"
        :text="`${lesson.auditorium} (${lesson.building})`"
      >
        <template v-slot:leading>
          <MaterialIcon>location_on</MaterialIcon>
        </template>
      </CollapsedText>
      <CollapsedText class="lesson_content__detail" :text="lesson.stream ?? 'Нет данных'">
        <template v-slot:leading>
          <MaterialIcon>directions_walk</MaterialIcon>
        </template>
      </CollapsedText>
      <CollapsedText
        class="lesson_content__detail"
        :text="
          lesson.lecturer
            ? `${lesson.lecturer.replace('!', '')} (${lesson.lecturer_rank?.toLowerCase().replace('!', '')})`
            : 'Нет данных'
        "
      >
        <template v-slot:leading>
          <MaterialIcon>person</MaterialIcon>
        </template>
      </CollapsedText>
    </div>
  </div>
</template>

<style>
.lesson {
  gap: 12px;
  padding: 0 12px;
}

.lesson-sidebar {
  gap: 4px;
  align-items: center;
}

.lesson-badge {
  min-width: 42px;
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: 700;

  background-color: var(--lesson-kind-generic);
  border-radius: var(--shape-medium);

  color: rgba(0, 0, 0, 0.64);
}

.lesson-content {
  flex: 1;
  min-width: 0;
}

.lesson-content__discipline {
  font-weight: 500;
}

.lesson-content__kind {
  font-weight: lighter;
}

.lesson_content__detail {
  font-size: 15px;
}

.lesson-content__spacer {
  height: 4px;
}
</style>
