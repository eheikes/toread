import fetch from 'node-fetch'
import { encode } from 'html-entities'

const maxTitleLength = 191

const mbSubstr = (str, start, len) => {
  return [...str].slice(start, len).join('')
}

export const crawlWebpage = async (url, userAgent) => {
  let html = null // default
  let title = encode(url) // default
  
  const response = await fetch(url, {
    headers: {
      'user-agent': userAgent
    },
    compress: false,
    redirect: 'follow'
  })
  
  if (response.ok) {
    let result = await response.text()

    // Look for a charset definition in the page.
    // Convert to UTF-8 if necessary.
    const charsetMatches = result.match(/<meta[^<]*charset=(?<charset>[a-z0-9_-]+)/is)
    if (charsetMatches?.group?.charset) {
      if (charsetMatches.group.charset.toLowerCase() !== 'utf-8') {
        result = Buffer.from(result, charsetMatches.group.charset).toString('utf-8')
      }
    }

    // Save the <title>.
    let cleanedHtml = result.replace(/<script.*?<\/script>/is, '')
    cleanedHtml = cleanedHtml.replace(/<style.*?<\/style>/is, '')
    cleanedHtml = cleanedHtml.replace(/<svg.*?<\/svg>/is, '')
    const titleMatches = cleanedHtml.match(/<title[^>]*?>(?<title>.*?)<\/title>/is)
    if (titleMatches?.groups?.title) {
      title = mbSubstr(titleMatches.groups.title, 0, maxTitleLength)
    }

    // Save the page, if it's HTML.
    if (cleanedHtml.match(/<html/i)) {
      html = result
    }
  }

  return { html, title }
}
