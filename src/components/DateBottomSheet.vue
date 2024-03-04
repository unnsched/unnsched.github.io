<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DateRange } from '@/types'
import BottomSheet from './foundation/BottomSheet.vue'
import IconButton from './foundation/IconButton.vue'

const model = defineModel<boolean>()
const props = defineProps<{
  begin: Date
  end: Date
}>()
const emit = defineEmits<{
  (e: 'result', range?: DateRange): void
}>()

const stringifyDate = (date: Date) => date.toLocaleDateString('en-CA')

const refBegin = ref<string>(stringifyDate(props.begin))
const refEnd = ref<string>(stringifyDate(props.end))

watch(
  () => props.begin,
  (newVal, oldVal) => (refBegin.value = stringifyDate(newVal))
)
watch(
  () => props.end,
  (newVal, oldVal) => (refEnd.value = stringifyDate(newVal))
)

watch(model, (newVal, oldVal) => {
  if (!newVal) {
    emit('result', {
      begin: new Date(refBegin.value),
      end: new Date(refEnd.value)
    })
  }
})
</script>

<template>
  <BottomSheet v-model="model" class="date-bottomsheet no-select">
    <div class="date-bottomsheet__content d-flex flex-col">
      <div class="date-reset d-flex flex-row">
        <IconButton @click="$emit('result')">refresh</IconButton>
        Перейти к текущей неделе
      </div>

      <div style="height: 8px" />

      <div class="date-sel d-flex flex-col">
        <span>Начальная дата:</span>
        <input type="date" v-model="refBegin" onfocus="this.showPicker()" />
      </div>

      <div class="date-sel d-flex flex-col">
        <span>Конечная дата:</span>
        <input type="date" v-model="refEnd" onfocus="this.showPicker()" />
      </div>
    </div>
  </BottomSheet>
</template>

<style>
.date-bottomsheet {
  padding: 0 24px;
}

.date-bottomsheet__content {
  gap: 16px;
}

.date-sel {
  gap: 4px;
}
.date-sel * {
  width: 100%;
}

.date-reset {
  align-items: center;
  gap: 8px;
}
</style>
