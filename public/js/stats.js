import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.7.4/all/lit-all.min.js'

export class ToreadStats extends LitElement {
  static properties = {
    'added-today': { type: Number },
    'added-week': { type: Number },
    'deleted-today': { type: Number },
    'deleted-week': { type: Number }
  }

  static styles = css`
    ins { color: red; text-decoration: none; }
    del { color: green; text-decoration: none; }
  `

  render() {
    return html`
      <span class="stats">
        <ins>+${this['added-today']}</ins>/<del>-${this['deleted-today']}</del> today,
        <ins>+${this['added-week']}</ins>/<del>-${this['deleted-week']}</del> week.
      </span>
    `
  }
}
customElements.define('toread-stats', ToreadStats)
