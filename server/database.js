import { boolean } from 'boolean'
import knex from 'knex'
import { log } from './log.js'

let db = null

export const raw = knex.raw

export const getDatabaseConnection = () => {
  if (db) {
    return db
  }
  const config = {
    debug: boolean(process.env.DEBUG),
    log: {
      warn: (info) => {
        log('WARN', info)
      },
      error: (info) => {
        log('ERROR', info)
      },
      deprecate: (info) => {
        log('DEPRECATED', info)
      },
      debug: (info) => {
        log('Database query', info)
      },
    },
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  }
  db = knex(config)
  return db
}
