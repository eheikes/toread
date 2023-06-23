import { log } from './log.js'

export function debounce (func, timeout = 300) {
  log('debounce', timeout)
  let timer
  return (...args) => {
    clearTimeout(timer)
    log('restarting timer at', Date.now())
    timer = setTimeout(() => { log('applying debounce func at', Date.now()); func.apply(this, args) }, timeout)
  }
}
