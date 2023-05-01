import * as dotenv from 'dotenv'
import express from 'express'
import { URL } from 'url'
import { crawlWebpage } from './lib/crawl.js'
import {
  addLink,
  deleteLinks,
  getCategories,
  getLinkCount,
  getLinks,
  getStats
} from './lib/links.js'
import { getSnapshot } from './lib/snapshot.js'

dotenv.config()

const app = express()

app.set('etag', false) // prevents 304 Not Modified responses

const viewsPath = new URL('views', import.meta.url).pathname
app.set('views', viewsPath)
app.set('view engine', 'ejs')

app.use(express.json())

app.get('/', async (req, res, next) => {
  try {
    const links = await getLinks(req.query)
    res.render('index', { links, apiUrl: process.env.API_URL })
  } catch (e) {
    next(e)
  }
})

app.get('/snapshot', async (req, res, next) => {
  try {
    if (req.query.id) {
      res.type('html')
      let snapshot
      try {
        snapshot = await getSnapshot(req.query.id)
      } catch (e) {
        next(e)
      }
      if (snapshot) {
        res.send(snapshot)
      } else {
        res.status(404)
        res.send('Could not find link with given ID')
      }
    } else {
      res.status(400)
      res.send('Please specify a link ID.')
    }
  } catch (e) {
    next(e)
  }
})

app.get('/links', async (req, res, next) => {
  try {
    const links = await getLinks(req.query)
    const total = await getLinkCount(req.query.q, req.query.tag)
    const tags = await getCategories()
    const stats = await getStats()
    res.send({
      links,
      total,
      tags,
      stats
    })
  } catch (e) {
    next(e)
  }
})

app.post('/links', async (req, res, next) => {
  try {
    console.log('*** POST /links', req.body)
    const url = req.body.url ?? ''
    const keywords = req.body.keywords ? req.body.keywords.trim() : ''
    const tags = req.body.tags ?? ''
    const { html, title } = await crawlWebpage(url, req.get('user-agent'))
    const { id, success } = await addLink(url, title, html, keywords, tags)
    res.send({
      success,
      id
    })
  } catch (e) {
    next(e)
  }
})

app.delete('/links/:id', async (req, res, next) => {
  try {
    const formattedId = parseInt(req.params.id, 10)
    const { success, ids } = await deleteLinks([formattedId])
    res.send({
      success,
      ids
    })
  } catch (e) {
    next(e)
  }
})

const publicPath = new URL('public', import.meta.url).pathname
app.use(express.static(publicPath))

app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})

const port = parseInt(process.env.SERVER_PORT, 10)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
