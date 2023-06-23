import { log } from './log.js'

export function createApi (baseUrl) {
  return {
    get: function (params) {
      log('API get', params)
      const searchParams = new URLSearchParams(params)
      const url = `${baseUrl}/links?${searchParams}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then(response => {
        if (!response.ok) {
          throw new Error(`Could not get links from ${url} (type ${response.type}, status ${response.status})`)
        }
        return response.json()
      })
    },

    check: function (params) {
      log('API check', params)
      const searchParams = new URLSearchParams(params)
      searchParams.set('check', 'true')
      const url = `${baseUrl}/links?${searchParams}`
      return fetch(url, { method: 'GET', mode: 'cors' }).then(response => {
        if (!response.ok) {
          throw new Error(`Could not check link from server ${url} (type ${response.type}, status ${response.status})`)
        }
        return response.json()
      })
    },

    add: function (data) {
      log('API add', data)
      const url = `${baseUrl}/links`
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        if (!response.ok) {
          throw new Error(`Could not add link on server ${url} (type ${response.type}, status ${response.status})`)
        }
        return response.json()
      })
    },

    remove: function (idsArray) {
      log('API remove', idsArray)
      return Promise.all(
        idsArray.map(id => {
          return fetch(`${baseUrl}/links/${id}`, { method: 'DELETE', mode: 'cors' })
        })
      ).then(responses => {
        return responses.map(response => {
          if (!response.ok) {
            throw new Error(`Could not remove link from server (type ${response.type}, status ${response.status})`)
          }
          return response.json()
        })
      })
    }
  }
}
