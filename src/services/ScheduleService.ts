import type {
  DateRange,
  Schedule,
  ScheduleDay,
  ScheduleEntity,
  ScheduleLesson,
  ScheduleScope
} from '@/types'

// const DATE_FORMAT = 'yyyy.MM.dd'
const fmtDate = (date: Date): string => {
  const iso = date.toISOString()
  return iso.substring(0, iso.indexOf('T'))
}

export const getSchedule = (scope: ScheduleScope, id: string, range: DateRange) =>
  fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/schedule/${scope}/${id}?` +
      new URLSearchParams({
        start: fmtDate(range.begin),
        finish: fmtDate(range.end),
        lng: '1'
      })
  )
    .then((res) => res.json())
    .then(
      (res) =>
        ({
          range: range,
          // @ts-ignore
          days: Object.entries(Object.groupBy(res, (v) => (v as ScheduleDay).date as any)).map(
            ([key, value]) => ({
              date: new Date(Date.parse(key)),
              lessons: value as ScheduleLesson[]
            })
          )
        }) as Schedule
    )

export const search = (term: string, scope?: ScheduleScope) =>
  fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/search?` +
      new URLSearchParams({
        term: term,
        ...(scope && { type: scope })
      })
  )
    .then((res) => res.json())
    .then((res) => res as ScheduleEntity[])
