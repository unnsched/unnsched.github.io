<script setup lang="ts">
import type { ScheduleEntity } from '@/types'
import ListItem from './foundation/ListItem.vue'
import { EntityIcons } from '@/assets/EntityIcons'
import MaterialIcon from './foundation/MaterialIcon.vue'

const props = defineProps<{
  entity: ScheduleEntity
}>()
</script>

<template>
  <ListItem>
    <template v-slot:leading>
      <MaterialIcon>
        {{ EntityIcons[entity.type] }}
      </MaterialIcon>
    </template>
    <template v-slot:headline>
      <span class="singleline">{{ entity.label }}</span>
    </template>
    <template v-slot:supporting>
      <span class="singleline">{{ entity.description }}</span>
    </template>
    <template v-slot:trailing>
      <div class="d-flex flex-row appdrawer-entity-actions">
        <slot></slot>
      </div>
    </template>
  </ListItem>
</template>

<style>
.appdrawer-entity-actions {
  padding: 0 2px;

  gap: 2px;
  align-items: center;
}
</style>
