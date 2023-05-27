import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.7.4/all/lit-all.min.js'

export class ToreadTag extends LitElement {
  static properties = {
    color: { type: String },
    'text-color': { type: String }
  }

  static styles = css`
    span {
      display: inline;
      padding: .2em .6em .3em;
      font-size: 75%;
      font-weight: bold;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: .25em;
      margin-right: 0.25em;
    }
  `

  render() {
    return html`
      <span style="background-color: ${this.color}; color: ${this['text-color']};">
        <slot></slot>
      </span>`
  }
}
customElements.define('toread-tag', ToreadTag)
