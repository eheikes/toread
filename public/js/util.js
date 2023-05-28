export function debounce (func, timeout = 300) {
  console.log('** debounce', timeout)
  let timer
  return (...args) => {
    clearTimeout(timer)
    console.log('*** restarting timer at', Date.now())
    timer = setTimeout(() => { console.log('*** applying debounce func at', Date.now()); func.apply(this, args) }, timeout)
  }
}
