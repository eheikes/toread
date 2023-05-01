import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.7.4/all/lit-all.min.js'

export class ToreadTag extends LitElement {
  static properties = {
    color: { type: String },
    'text-color': { type: String }
  }

  render() {
    return html`
      <span style="background-color: ${this.color}; color: ${this['text-color']};">
        <slot></slot>
      </span>`
  }
}
customElements.define('toread-tag', ToreadTag)
