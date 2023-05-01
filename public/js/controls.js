import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.7.4/all/lit-all.min.js'
import { debounce } from './util.js'

export class ToreadControls extends LitElement {
  static properties = {
    disabled: { type: Boolean },
    'any-selected': { type: Boolean },
    'no-previous': { type: Boolean },
    'no-next': { type: Boolean }
  }

  static styles = css`
    .controls > div { margin-bottom: 15px; }
    .search { width: 100%; }
    .search input { width: 100%; }
  `

  constructor() {
    super()
    this.disabled = false
    this['any-selected'] = false
    this['no-previous'] = false
    this['no-next'] = false
  }

  changePage(event, offset) {
    event.preventDefault()
    const changeEvent = new CustomEvent('changePage', {
      bubbles: true,
      composed: true,
      detail: { offset }
    })
    this.dispatchEvent(changeEvent)
  }

  clearSearch(event) {
    event.preventDefault()
    const input = this.shadowRoot.querySelector('input[name="q"]')
    input.value = ''
    input.focus()
    const clearEvent = new CustomEvent('clearSearch', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(clearEvent)
  }

  deleteSelected(event) {
    event.preventDefault()
    const deleteEvent = new CustomEvent('deleteSelected', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(deleteEvent)
  }

  search(event) {
    event.preventDefault()
    const input = this.shadowRoot.querySelector('input[name="q"]')
    const searchEvent = new CustomEvent('search', {
      bubbles: true,
      composed: true,
      detail: { phrase: input.value }
    })
    this.dispatchEvent(searchEvent)
  }

  render() {
    return html`
      <div class="controls row form-inline">
        <div class="col-md-6">
          <input class="btn btn-default" type="button" value="← Previous" @click=${{handleEvent: (event) => this.changePage(event, -1)}} ?disabled=${this.disabled || this['no-previous']}>
          <input class="btn btn-default" type="button" value="Next →" @click=${{handleEvent: (event) => this.changePage(event, 1)}} ?disabled=${this.disabled || this['no-next']}>
          <input class="btn btn-default" type="button" value="Delete selected" @click=${this.deleteSelected} ?disabled=${this.disabled || !this['any-selected']}>
        </div>
        <div class="col-md-6">
          <div class="search input-group has-feedback">
            <input class="form-control" ng-class="{'alert-info': q != ''}" name="q" type="text" value="" placeholder="Search" @keyup=${this.search} ?disabled=${this.disabled} accesskey="s">
            <span class="glyphicon glyphicon-search form-control-feedback" ng-class="{hidden: q != ''}" aria-hidden="true">🔎</span>
            <span class="input-group-btn">
              <button class="btn btn-default" ng-class="{hidden: q == ''}" type="button" aria-label="Clear search" @click=${this.clearSearch}>
              🗙
              </button>
            </span>
          </div>
        </div>
      </div>
    `
  }
}
customElements.define('toread-controls', ToreadControls)
