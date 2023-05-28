import { LitElement, css, html, styleMap } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.7.4/all/lit-all.min.js'
import { createApi } from './api.js'

export class ToreadSubmitForm extends LitElement {
  static properties = {
    'api-url': { // note: do not change this; it is read-only
      type: String,
      attribute: true
    },
    isDuplicate: { type: Boolean },
    isDuplicateDeleted: { type: Boolean },
    isSaving: { type: Boolean },
    saveFailed: { type: Boolean }
  }

  static styles = css`
    form { margin-bottom: 15px; }
    h2 { margin-top: 1.5em; margin-bottom: 0; }
    fieldset { padding: 0; border: 0; }
    label { margin-right: 0.25em; }
    .error { color: red; }
  `

  constructor () {
    super()
    this.isDuplicate = false
    this.isDuplicateDeleted = false
    this.isSaving = false
    this.saveFailed = false

    this['api-url'] = ''
    this.api = createApi(this['api-url'])
  }

  checkUrl (event) {
    event.preventDefault()
    this.isDuplicate = false
    this.isDuplicateDeleted = false
    const url = this.shadowRoot.querySelector('input[name="url"]').value
    if (!url) { return }
    this.api.check({ url }).then((result) => {
      this.isDuplicate = result.links.length > 0
      this.isDuplicateDeleted = true
      result.links.forEach((link) => {
        if (!link.deleted) { this.isDuplicateDeleted = false }
      })
    })
  }

  clearForm () {
    const form = this.shadowRoot.querySelector('form')
    const fields = [...form.querySelectorAll('input[type="text"]'), ...form.querySelectorAll('textarea')]
    for (const field of fields) {
      field.value = ''
    }
    this.isDuplicate = false
    this.isDuplicateDeleted = false
    this.isSaving = false
    this.saveFailed = false
  }

  submit (event) {
    event.preventDefault()
    this.isSaving = true
    this.saveFailed = false
    const formData = new FormData(this.shadowRoot.querySelector('form'))
    this.api.add({
      url: formData.get('url'),
      tags: formData.get('tags'),
      keywords: formData.get('keywords')
    }).then((result) => {
      if (!result.success) {
        this.saveFailed = true
        return
      }
      this.data = {}
      const refreshEvent = new Event('refreshList', {
        bubbles: true,
        composed: true
      })
      this.dispatchEvent(refreshEvent)
      this.clearForm()
    }).catch(() => {
      this.saveFailed = true
    }).finally(() => {
      this.isSaving = false
    })
  }

  render () {
    const duplicateErrorStyles = {
      display: this.isDuplicate ? 'block' : 'none'
    }
    const duplicateDeletedErrorStyles = {
      display: this.isDuplicateDeleted ? 'inline' : 'none'
    }
    const saveErrorStyles = {
      display: this.saveFailed ? 'block' : 'none'
    }
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
      <form @submit=${this.submit} class="pure-form pure-form-stacked">
        <h2>Add New Link</h2>
        <fieldset ?disabled=${this.isSaving}>
          <div>
            <label for="new-url" title="Link URL">URL</label>
            <input id="new-url" type="text" name="url" value="" accesskey="n" @keyup=${this.checkUrl}>
            <div class="error" style=${styleMap(duplicateErrorStyles)}>
              ⚠️ This link already exists<span style=${styleMap(duplicateDeletedErrorStyles)}> (but has been deleted)</span>.
            </div>
          </div>
          <div>
            <label for="new-tags" title="Link tags (separate with commas)">Tags</label>
            <input id="new-tags" type="text" name="tags" value="" class="form-control">
          </div>
          <div>
            <label for="new-description">Description</label>
            <textarea id="new-description" name="keywords" rows="5" cols="50" placeholder="when saving a reference"></textarea>
          </div>
          <input type="submit" class="pure-button pure-button-primary" value="Add">
          <div class="error" style=${styleMap(saveErrorStyles)}>
            ⚠️ There was an error saving the link.
          </div>
        </fieldset>
      </form>
    `
  }
}
customElements.define('toread-submit-form', ToreadSubmitForm)
