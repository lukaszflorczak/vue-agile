export function debounce (callback: (...args: any[]) => void, wait: number, immediate: boolean = false) {
  let timeout: ReturnType<typeof setTimeout>
  let runAt: ReturnType<typeof Date.now>

  return function (this: any, ...args: any[]) {
    if (immediate && Date.now() - runAt >= wait) wait = 0

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback.apply(this, args)
      runAt = Date.now()
    }, wait)
  }
}

export function sortBy (arr: { [k: string]: number }[], k: string) {
  return arr.sort((a, b) => a[k] - b[k])
}
