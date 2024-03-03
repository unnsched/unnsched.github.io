import type { ScheduleEntity } from '@/types'

export const EntityIcons: Record<ScheduleEntity['type'], string> = {
  group: 'group',
  person: 'account_circle',
  student: 'person',
  lecturer: 'school',
  auditorium: 'apartment'
}
