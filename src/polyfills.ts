// @ts-nocheck

// Object.groupBy: limited availability as of March 2024
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
if (!Object.groupBy) {
  Object.groupBy = function <K extends PropertyKey, T>(
    items: Iterable<T>,
    keySelector: (item: T, index: number) => K
  ): Partial<Record<K, T[]>> {
    const result: Partial<Record<K, T[]>> = {}

    let index = 0
    for (let item of items) {
      const key = keySelector(item, index++)
      result[key] ??= []
      result[key]!!.push(item)
    }

    return result
  }
}
