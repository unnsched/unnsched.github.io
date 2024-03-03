export default function debounce(fn: () => any, timeout = 300) {
  let timeoutId: number
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fn, timeout)
  }
}
