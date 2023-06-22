import { LitElement, css, html } from 'lit'

export class ToreadControls extends LitElement {
  static properties = {
    disabled: { type: Boolean },
    'any-selected': { type: Boolean },
    'no-previous': { type: Boolean },
    'no-next': { type: Boolean },
    q: { type: String }
  }

  static styles = css`
    .controls > div { margin-bottom: 15px; }
    .search { width: 90%; }
    .search input { width: 100%; }
    .search input:placeholder-shown {
      background-image: url("images/search.svg");
      background-position: top .1em right .1em;
      background-size: 2em 2em;
      background-repeat: no-repeat;
    }
    .search input:not(:placeholder-shown) { width: 85%; }
    .search button { font-size: .85em; }
    @media (prefers-color-scheme: dark) {
      .search input[type="button"] {
        background-color: #999;
        color: #333;
      }
      .pure-button[disabled] {
        background-color: #666;
        color: #fff;
      }
      .search input[type="text"] {
        background-color: #333;
        color: #ccc;
        border: #444;
        box-shadow: none;
      }
      .search button {
        display: inline;
        background-color: #666;
        color: #ccc;
      }
    }

  `

  constructor () {
    super()
    this.disabled = false
    this['any-selected'] = false
    this['no-previous'] = false
    this['no-next'] = false
    this.q = null
  }

  changePage (event, offset) {
    event.preventDefault()
    const changeEvent = new CustomEvent('changePage', {
      bubbles: true,
      composed: true,
      detail: { offset }
    })
    this.dispatchEvent(changeEvent)
  }

  clearSearch (event) {
    event.preventDefault()
    this.q = ''
    const input = this.shadowRoot.querySelector('input[name="q"]')
    input.value = ''
    input.focus()
    const clearEvent = new CustomEvent('clearSearch', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(clearEvent)
  }

  deleteSelected (event) {
    event.preventDefault()
    const deleteEvent = new CustomEvent('deleteSelected', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(deleteEvent)
  }

  search (event) {
    event.preventDefault()
    const input = this.shadowRoot.querySelector('input[name="q"]')
    this.q = input.value
    const searchEvent = new CustomEvent('search', {
      bubbles: true,
      composed: true,
      detail: { phrase: this.q }
    })
    this.dispatchEvent(searchEvent)
  }

  render () {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
      <form class="controls pure-form pure-g">
        <div class="pure-u-1-2">
          <input class="pure-button" type="button" value="← Previous" @click=${{ handleEvent: (event) => this.changePage(event, -1) }} ?disabled=${this.disabled || this['no-previous']}>
          <input class="pure-button" type="button" value="Next →" @click=${{ handleEvent: (event) => this.changePage(event, 1) }} ?disabled=${this.disabled || this['no-next']}>
          <input class="pure-button" type="button" value="Delete selected" @click=${this.deleteSelected} ?disabled=${this.disabled || !this['any-selected']}>
        </div>
        <div class="pure-u-1-2">
          <div class="search pure-button-group" role="group" aria-label="Search">
            <input class="form-control" name="q" type="text" value=${this.q} placeholder="Search" @keyup=${this.search} ?disabled=${this.disabled} accesskey="s">
            <span class="input-group-btn">
              <button class="pure-button" ?hidden=${this.q === ''} type="button" aria-label="Clear search" @click=${this.clearSearch}>
              🗙
              </button>
            </span>
          </div>
        </div>
      </form>
    `
  }
}
