import { boolean } from 'boolean'
import debug from 'debug'

let scopedLog

export const log = (...msgs) => {
  if (!scopedLog) {
    scopedLog = debug('toread')
    scopedLog.enabled = boolean(process.env.DEBUG)
  }
  const str = msgs.map(msg => {
    if (msg !== null && typeof msg === 'object') {
      return JSON.stringify(msg)
    }
    return msg
  }).join(' ')
  scopedLog(str)
}
