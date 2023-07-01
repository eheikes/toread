import { boolean } from 'boolean'
import debug from 'debug'

let scopedLog

export const log = (...msgs) => {
  if (!scopedLog) {
    scopedLog = debug('ToRead')
    const params = new URL(window.location).searchParams
    scopedLog.enabled = boolean(params.get('debug'))
  }
  const str = msgs.map(msg => {
    if (msg !== null && typeof msg === 'object') {
      return JSON.stringify(msg)
    }
    return msg
  }).join(' ')
  scopedLog(str)
}
