import { LitElement, css, html, classMap, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.7.4/all/lit-all.min.js'
import { createApi } from './api.js'
// TODO add these as exports that import them elsewhere
import { ToreadControls } from './controls.js' // needed to register the element
import { ToreadStats } from './stats.js' // needed to register the element
import { ToreadSubmitForm } from './submit-form.js' // needed to register the element
import { ToreadTag } from './tag.js' // needed to register the element
import { ToreadTags } from './tags.js' // needed to register the element

// Returns the current value from the URL parameters,
//   or the default value if not set yet.
function getParamOrDefault(name, defaultVal, convertToInt) {
  const params = new URL(window.location).searchParams
  if (params.get(name) === null) {
    return defaultVal
  }
  if (convertToInt) {
    return parseInt(params.get(name), 10)
  }
  return params.get(name)
}

function random(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo
}

export class ToreadApp extends LitElement {
  static properties = {
    actionInProgress: {
      type: Boolean,
      state: true
    },
    ['api-url']: { // note: do not change this; it is read-only
      type: String,
      attribute: true
    },
    highlighted: {
      type: Number,
      state: true
    },
    limit: {
      type: Number,
      state: true
    },
    offset: {
      type: Number,
      state: true
    },
    q: {
      type: String,
      state: true
    },
    selectedItems: {
      type: Array,
      state: true
    },
    stats: {
      type: Object,
      state: true
    },
    tagFilter: {
      type: Number,
      state: true
    },
    tags: {
      type: Array,
      state: true
    }
  }

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    h1 { margin-bottom: 0; }
    p { margin-top: .25em; }
    a { text-decoration: none; color: #337ab7; background: transparent; }
    a:hover, a:active { text-decoration: underline; }
    .pure-g { margin: auto; width: 75%; }
    ul.entries { margin-left: 0; padding-left: 0; }
    ul.entries li { list-style: none; padding: 0.15em 0.25em; }
    .description { white-space: pre-line; margin: 0 0 0 1.2em; }
    .highlight { background: yellow; }
    .snapshot { margin-left: 0.25em; text-decoration: none; }
    .strike { text-decoration: line-through; }
  `

  constructor() {
    super()

    this.actionInProgress = false
    this.highlighted = getParamOrDefault('highlighted', null)
    this.q = getParamOrDefault('q', '') // search query
    this.offset = getParamOrDefault('offset', 0, true)
    this.limit = getParamOrDefault('limit', 20, true)
    this.selectedItems = []
    this.tagFilter = getParamOrDefault('tag', null, true)

    this.stats = {}
    this.links = []
    this.tags = []

    this.addEventListener('changePage', this.changePage)
    this.addEventListener('clearSearch', this.clearSearch)
    this.addEventListener('deleteSelected', this.deleteSelected)
    this.addEventListener('refreshList', this.showList)
    this.addEventListener('search', this.search)
    this.addEventListener('toggleTag', this.toggleTag)

    this['api-url'] = ''
    this.api = createApi(this['api-url'])

    this.showList().then(() => {
      if (this.highlighted !== null) {
        this.highlightOffset(this.highlighted)
      }
    })
  }

  changePage(event) {
    this.offset = this.offset + (this.limit * event.detail.offset)
    if (this.offset < 0 || this.offset >= this.stats.total) {
      this.offset = 0
    }
    this.clearSelected()
    this.showList()
  }

  chooseRandom(event) {
    event.preventDefault()
    const chosenIndex = random(0, this.stats.total - 1)
    const remainder = chosenIndex % this.limit
    console.log('Choosing random...',)
    console.log('stats:', this.stats)
    console.log('chosenIndex:', chosenIndex)
    console.log('remainder:', remainder)

    this.offset = parseInt(chosenIndex / this.limit, 10) * this.limit
    console.log('new offset:', this.offset)
    this.showList().then(() => {
      this.highlighted = remainder
      this.pushState()
      this.highlightOffset(remainder)
    });
  }

  clearSearch(_event) {
    this.q = ''
    this.showList()
  }

  clearSelected() {
    this.selectedItems = []
    const inputEls = this.shadowRoot.querySelectorAll('input[type="checkbox"]')
    for (const el of inputEls) {
      el.checked = false
    }
  }

  deleteSelected(_event) {
    this.actionInProgress = true
    this.api.remove(this.selectedItems).then(() => {
      this.clearSelected()
      this.showList()
    }).finally(() => {
      this.actionInProgress = false
    })
  }

  // Highlight the nth item in the list (starting at 0)
  //   and scroll the screen to its position.
  highlightOffset(n) {
    this.links = this.links.map((link, i) => ({
      ...link,
      highlighted: n === i
    }))
    const entries = this.shadowRoot.querySelectorAll('.entries li')
    entries[n].scrollIntoView({ behavior: 'smooth' })
  }

  pushState = function() {
    const url = new URL(window.location)
    if (this.highlighted !== null) {
      url.searchParams.set('highlighted', this.highlighted)
    }
    if (this.limit !== null) {
      url.searchParams.set('limit', this.limit)
    }
    if (this.tagFilter !== null) {
      url.searchParams.set('tag', this.tagFilter)
    }
    url.searchParams.set('offset', this.offset)
    url.searchParams.set('q', this.q)
    history.pushState({}, '', url.toString())
  };


  search(event) {
    this.q = event?.detail?.phrase ?? ''
    this.offset = 0
    this.showList()
  }

  showList() {
    return this.api.get({
      q: this.q ?? '',
      tag: this.tagFilter ?? '',
      offset: this.offset ?? '',
      count: this.limit ?? ''
    }).then(response => {
      this.tags = response.tags
      this.links = response.links
      this.stats = {
        ...response.stats,
        total: response.total
      }
      this.pushState()
    })
  }

  toggleTag(event) {
    this.tagFilter = this.tagFilter === event.detail.tagId ? null : event.detail.tagId
    this.offset = 0
    this.showList()
  }

  updatedSelected(_event) {
    this.selectedItems = [...this.shadowRoot.querySelectorAll('input[type="checkbox"]')].map(inputEl => {
      if (inputEl.checked) { return inputEl.value }
      return null
    }).filter(val => val !== null)
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
      <div class="pure-g">
        <div class="pure-u-2-3">
          <h1 class="text-4xl"><a href="?">To Read</a></h1>
          <div>
            <p>
              ${this.stats.total} items to read.
              <toread-stats
                added-today=${this.stats.addedToday}
                added-week=${this.stats.addedThisWeek}
                deleted-today=${this.stats.deletedToday}
                deleted-week=${this.stats.deletedThisWeek}
              >
              </toread-stats>
              <a href @click=${this.chooseRandom}>Choose one for me</a>.
            </p>
            <toread-tags .tags=${this.tags} filter=${this.tagFilter}></toread-tags>
            <toread-controls
              ?disabled=${this.actionInProgress}
              ?any-selected=${this.selectedItems.length !== 0}
              ?no-previous=${this.offset === 0}
              ?no-next=${this.offset + this.limit >= this.stats.total}
            ></toread-controls>
            <ul class="entries">
              ${this.links.map((item) => {
                const datetime = new Date(item.time)
                const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(datetime)
                const listClasses = { highlight: item.highlighted }
                const linkClasses = { strike: item.deleted }
                return html`
                  <li class=${classMap(listClasses)}>
                    <input type="checkbox" name="id" value="${item.id}" ?disabled=${this.actionInProgress} @change=${this.updatedSelected}>
                    <a href=${item.link} class=${classMap(linkClasses)} target="_blank">${item.title}</a>
                    ${item.hasSnapshot ? html`<a href="toreadsnapshot.php?id=${item.id}" class="snapshot" target="_blank" title="View snapshot">🕶️</a>` : nothing}
                    <span class="date">${date}</span>
                    <span class="tags">
                      ${item.tags.map((tag) => html`
                        <toread-tag color=${tag.color} text-color=${tag.contrastColor}>${tag.name}</toread-tag>
                      `)}
                    </span>
                    ${item.description ? html`<p class="description">${item.description}</p>` : nothing}
                  </li>
                `
              })}
            </ul>
            <toread-controls
              ?disabled=${this.actionInProgress}
              ?any-selected=${this.selectedItems.length !== 0}
              ?no-previous=${this.offset === 0}
              ?no-next=${this.offset + this.limit >= this.stats.total}
            ></toread-controls>
          </div>
        </div>
        <div class="pure-u-1-3">
          <toread-submit-form api-url=${this['api-url']}></toread-submit-form>
        </div>
      </div>
    `
  }
}
customElements.define('toread-app', ToreadApp)
