import { log } from './log.js'

const timers = new Map()

export function debounce (eventName, func, timeout = 300) {
  log('Debouncing', eventName, timeout)
  const existingTimer = timers.get(eventName)
  if (existingTimer) {
    clearTimeout(timers.get(eventName))
  }
  const newTimer = setTimeout(() => {
    log(`Applying ${eventName} debounce function`)
    func.apply(this)
  }, timeout)
  timers.set(eventName, newTimer)
}
