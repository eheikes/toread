import { getDatabaseConnection } from './database.js'

export const getSnapshot = async (id) => {
  const db = getDatabaseConnection()
  const result = await db.first('snapshot').from('links').where({ id })
  if (!result) { return null }
  if (!result.snapshot) { return '<p>No snapshot found.</p>' }
  return result.snapshot
}
