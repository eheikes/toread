import { LitElement, css, html, classMap } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.7.4/all/lit-all.min.js'

export class ToreadTags extends LitElement {
  static properties = {
    tags: { type: Array },
    filter: { type: Number }
  }

  static styles = css`
    p { margin-bottom: 0.5em; }
    p:after { content: ""; display: table; clear: both; }
    p a { float: left; margin-bottom: 0.5em; }
    a { text-decoration: none; }
    .faded { opacity: 0.5; }
  `

  toggleTag (event, tagId) {
    event.preventDefault()
    const toggleEvent = new CustomEvent('toggleTag', {
      bubbles: true,
      composed: true,
      detail: { tagId }
    })
    this.dispatchEvent(toggleEvent)
  }

  render () {
    return html`
      <p>
        ${this.tags.map(tag => {
          const classes = { faded: this.filter && this.filter !== tag.id }
          return html`<a href
            @click=${{ handleEvent: (event) => this.toggleTag(event, tag.id) }}
            class=${classMap(classes)}
          ><toread-tag color=${tag.color} text-color=${tag.contrastColor}>${tag.name}</toread-tag></a>`
        })}
      </p>
    `
  }
}
customElements.define('toread-tags', ToreadTags)
