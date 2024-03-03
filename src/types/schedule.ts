import type { DateRange } from './common'

export type ScheduleScope = 'group' | 'person' | 'student' | 'lecturer' | 'auditorium'

export type ScheduleEntity = {
  id: string
  label: string
  description: string
  type: ScheduleScope
}

export type ScheduleDay = {
  date: Date
  lessons: ScheduleLesson[]
}

export type ScheduleLesson = {
  discipline: string
  kindOfWork?: string
  kindOfWorkOid: number
  lecturer?: string
  lecturer_rank?: string
  lessonNumberStart: number
  beginLesson: string
  endLesson: string
  auditorium: string
  building: string
  stream?: string
  date: Date
}

export type Schedule = {
  range: DateRange
  days: ScheduleDay[]
}
