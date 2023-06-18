export function createApi (baseUrl) {
  return {
    get: function (params) {
      console.log('*** get()', params)
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
      console.log('*** check()', params)
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
      console.log('*** add()', data)
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
      console.log('*** remove()', idsArray)
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
