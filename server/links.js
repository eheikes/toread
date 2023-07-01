import { decode } from 'html-entities'
import { getColor, getContrastColor } from './color.js'
import { getDatabaseConnection } from './database.js'
import { log } from './log.js'

const joinCategories = (sqlBuilder) => {
  return sqlBuilder.join('links_to_categories', {
    'links_to_categories.link_id': 'links.id'
  }).join('link_categories', {
    'link_categories.id': 'links_to_categories.category_id'
  })
}

const mysqlTimestampToIsoString = (mysqlTimestamp) => {
  return new Date(mysqlTimestamp * 1000).toISOString()
}

export const getCategories = async () => {
  const db = getDatabaseConnection()

  const categories = []

  const rawCategories = await db('link_categories').select().orderBy('id', 'asc')

  let i = 0
  for (const cat of rawCategories) {
    const color = getColor(i++)
    categories.push({
      id: cat.id,
      name: cat.name,
      color,
      contrastColor: getContrastColor(color)
    })
  }

  return categories
}

// Builds SQL clauses for the "q" parameter.
const getSearchQuery = (searchString, sqlBuilder) => {
  searchString = searchString ?? ''

  if (searchString === '') {
    return sqlBuilder.whereNull('keywords')
  }

  const words = searchString.split(/\s+/)
  for (const word of words) {
    sqlBuilder = sqlBuilder.andWhere((builder) => {
      builder.where('title', 'like', `%${word}%`).orWhere('keywords', 'like', `%${word}%`)
    })
  }

  return sqlBuilder
}

// Builds SQL clauses for the "tag" parameter.
const getTagQuery = (tagId, sqlBuilder) => {
  if (!tagId) { return sqlBuilder }
  return sqlBuilder.andWhere('link_categories.id', tagId)
}

export const getStats = async () => {
  const db = getDatabaseConnection()

  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const todayAdded = await db('links').count({ count: '*' })
    .whereNull('keywords')
    .andWhere(db.raw('DATE(created)'), today)
    .first()

  const todayDeleted = await db('links').count({ count: '*' })
    .whereNull('keywords')
    .andWhere(db.raw('DATE(deleted)'), today)
    .first()

  const weekAdded = await db('links').count({ count: '*' })
    .whereNull('keywords')
    .andWhere('created', '>', db.raw('DATE_SUB(NOW(), INTERVAL 1 WEEK)'))
    .first()

  const weekDeleted = await db('links').count({ count: '*' })
    .whereNull('keywords')
    .andWhere('deleted', '>', db.raw('DATE_SUB(NOW(), INTERVAL 1 WEEK)'))
    .first()

  return {
    addedToday: todayAdded.count,
    deletedToday: todayDeleted.count,
    addedThisWeek: weekAdded.count,
    deletedThisWeek: weekDeleted.count
  }
}

// Retrieves the number of links.
export const getLinkCount = async (searchQuery, tagId) => {
  const db = getDatabaseConnection()

  let builder = db('links').count({ count: '*' })
    .whereNull('deleted')
    .where(builder => getSearchQuery(searchQuery, builder))
    .where(builder => getTagQuery(tagId, builder))
  if (tagId) {
    builder = joinCategories(builder)
  }
  const result = await builder.first()

  return result.count
}

export const getLinks = async (opts = {}) => {
  const db = getDatabaseConnection()

  const offset = opts.offset ? parseInt(opts.offset, 10) : 0
  const count = opts.count ? parseInt(opts.count, 10) : 20

  // Query the links.
  let builder = db('links').select([
    'links.*',
    db.raw('UNIX_TIMESTAMP(created) AS time'),
    db.raw('UNIX_TIMESTAMP(created) AS created'),
    db.raw('UNIX_TIMESTAMP(deleted) AS deleted'),
    'url AS link'
  ])
  if (opts.check) {
    builder = builder.where('url', opts.url)
  } else {
    builder = builder
      .where(builder => getSearchQuery(opts.q, builder))
      .where(builder => getTagQuery(opts.tag, builder))
    if (opts.tag) {
      builder = joinCategories(builder)
    }
    if (!opts.include_deleted) {
      builder = builder.whereNull('deleted')
    }
    if (opts.since) {
      builder = builder.where(() => {
        this.where(db.raw('UNIX_TIMESTAMP(created)'), '>=', parseInt(opts.since, 10))
          .orWhere(db.raw('UNIX_TIMESTAMP(deleted)'), '>=', parseInt(opts.since, 10))
      })
    }
    builder = builder.orderBy(opts.random ? db.raw('RAND()') : 'created', 'desc').limit(count).offset(offset)
  }
  const feed = await builder

  // Get the list of all categories.
  const categories = await getCategories()

  // Add the links to an array.
  const links = []
  for (const item of feed) {
    // Query the tags (categories).
    const tagData = await db('link_categories').select()
      .join('links_to_categories', { 'link_categories.id': 'category_id' })
      .where('link_id', item.id)
      .orderBy('name', 'asc')
    const tags = tagData.map(tagInfo => {
      return categories.find(category => category.id === tagInfo.category_id)
    })

    const decodedTitle = decode(item.title)

    // Add the link info to the array.
    links.push({
      id: parseInt(item.id),
      title: decodedTitle,
      link: item.link,
      description: item.keywords,
      hasSnapshot: item.snapshot !== null,
      time: mysqlTimestampToIsoString(item.time),
      created: mysqlTimestampToIsoString(item.created),
      deleted: opts.since ? mysqlTimestampToIsoString(item.deleted) : item.deleted !== null,
      tags
    })
  }

  return links
}

export const addLink = async (url, title, html, keywords, rawTags) => {
  const db = getDatabaseConnection()
  let linkId = null
  try {
    // Add the link.
    const newIds = await db('links').insert({
      created: db.raw('NOW()'),
      url,
      title,
      snapshot: html,
      keywords: keywords === '' ? null : keywords
    })
    linkId = newIds[0]

    // Parse the tags.
    const tags = rawTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')

    // Add the tags.
    for (const tag of tags) {
      // Check if the category exists already.
      const categories = await getCategories()
      const category = categories.find(cat => {
        return cat.name.toLowerCase() === tag.toLowerCase()
      })
      let categoryId = category ? category.id : null

      // Add the category if it doesn't exist.
      if (categoryId === null) {
        const newCategory = await db('link_categories').insert({
          name: tag
        })
        categoryId = newCategory.id
      }

      // Add the link/category association.
      await db('links_to_categories').insert({
        link_id: linkId,
        category_id: categoryId
      })
    }
  } catch (e) {
    log('ERROR', e.stack)
    return {
      success: false,
      id: null
    }
  }
  return {
    success: true,
    id: linkId
  }
}

export const deleteLinks = async (ids) => {
  const db = getDatabaseConnection()
  try {
    await db('links')
      .update({ deleted: db.raw('NOW()') })
      .whereIn('id', ids)
  } catch (e) {
    log('ERROR', e.stack)
    return {
      success: false,
      ids: []
    }
  }
  return {
    success: true,
    ids
  }
}
