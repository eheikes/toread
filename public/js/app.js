/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new n(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a;const l=window,h=l.trustedTypes,c=h?h.emptyScript:"",d=l.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=f){var i;const n=this.constructor._$Ep(t,s);if(void 0!==n&&!0===s.reflect){const r=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:u).toAttribute(e,s.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=i.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:g}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.1");const v=window,y=v.trustedTypes,$=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",C=`lit$${(Math.random()+"").slice(9)}$`,_="?"+C,w=`<${_}>`,A=document,S=()=>A.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,x="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,O=/>/g,U=RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,N=/^(?:script|style|textarea|title)$/i,T=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),I=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),j=new WeakMap,H=A.createTreeWalker(A,129,null,!1),M=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":"",o=F;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===F?"!--"===l[1]?o=P:void 0!==l[1]?o=O:void 0!==l[2]?(N.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=U):void 0!==l[3]&&(o=U):o===U?">"===l[0]?(o=null!=n?n:F,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?U:'"'===l[3]?L:D):o===L||o===D?o=U:o===P||o===O?o=F:(o=U,n=void 0);const d=o===U&&t[e+1].startsWith("/>")?" ":"";r+=o===F?s+w:h>=0?(i.push(a),s.slice(0,h)+b+s.slice(h)+C+d):s+C+(-2===h?(i.push(void 0),e):d)}const a=r+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==$?$.createHTML(a):a,i]};class q{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,h]=M(t,e);if(this.el=q.createElement(l,s),H.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=H.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(b)||e.startsWith(C)){const s=h[r++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+b).split(C),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?G:"@"===e[1]?X:V})}else a.push({type:6,index:n})}for(const e of t)i.removeAttribute(e)}if(N.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=y?y.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],S()),H.nextNode(),a.push({type:2,index:++n});i.append(t[e],S())}}}else if(8===i.nodeType)if(i.data===_)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function B(t,e,s=t,i){var n,r,o,a;if(e===I)return e;let l=void 0!==i?null===(n=s._$Co)||void 0===n?void 0:n[i]:s._$Cl;const h=E(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,s,i)),void 0!==i?(null!==(o=(a=s)._$Co)&&void 0!==o?o:a._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(e=B(t,l._$AS(t,e.values),l,i)),e}class z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(s,!0);H.currentNode=n;let r=H.nextNode(),o=0,a=0,l=i[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new W(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new K(r,this,t)),this._$AV.push(e),l=i[++a]}o!==(null==l?void 0:l.index)&&(r=H.nextNode(),o++)}return H.currentNode=A,n}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class W{constructor(t,e,s,i){var n;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),E(t)?t===R||null==t||""===t?(this._$AH!==R&&this._$AR(),this._$AH=R):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>k(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==R&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(s);else{const t=new z(n,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new q(t)),e}T(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new W(this.k(S()),this.k(S()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class V{constructor(t,e,s,i,n){this.type=1,this._$AH=R,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=B(this,t,e,0),r=!E(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=B(this,i[s+o],e,o),a===I&&(a=this._$AH[o]),r||(r=!E(a)||a!==this._$AH[o]),a===R?t=R:t!==R&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===R?void 0:t}}const J=y?y.emptyScript:"";class G extends V{constructor(){super(...arguments),this.type=4}j(t){t&&t!==R?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class X extends V{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=B(this,t,e,0))&&void 0!==s?s:R)===I)return;const i=this._$AH,n=t===R&&i!==R||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==R&&(i===R||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const Q=v.litHtmlPolyfillSupport;null==Q||Q(q,W),(null!==(m=v.litHtmlVersions)&&void 0!==m?m:v.litHtmlVersions=[]).push("2.7.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Y,tt;class et extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,n;const r=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new W(e.insertBefore(S(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}et.finalized=!0,et._$litElement$=!0,null===(Y=globalThis.litElementHydrateSupport)||void 0===Y||Y.call(globalThis,{LitElement:et});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:et}),(null!==(tt=globalThis.litElementVersions)&&void 0!==tt?tt:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=1;class nt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends nt{constructor(t){var e;if(super(t),t.type!==it||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var s,i;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(s=this.nt)||void 0===s?void 0:s.has(t))&&this.it.add(t);return this.render(e)}const n=t.element.classList;this.it.forEach((t=>{t in e||(n.remove(t),this.it.delete(t))}));for(const t in e){const s=!!e[t];s===this.it.has(t)||(null===(i=this.nt)||void 0===i?void 0:i.has(t))||(s?(n.add(t),this.it.add(t)):(n.remove(t),this.it.delete(t)))}return I}});function ot(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var at={},lt={};Object.defineProperty(lt,"__esModule",{value:!0}),lt.boolean=void 0;lt.boolean=function(t){switch(Object.prototype.toString.call(t)){case"[object String]":return["true","t","yes","y","on","1"].includes(t.trim().toLowerCase());case"[object Number]":return 1===t.valueOf();case"[object Boolean]":return t.valueOf();default:return!1}};var ht={};Object.defineProperty(ht,"__esModule",{value:!0}),ht.isBooleanable=void 0;ht.isBooleanable=function(t){switch(Object.prototype.toString.call(t)){case"[object String]":return["true","t","yes","y","on","1","false","f","no","n","off","0"].includes(t.trim().toLowerCase());case"[object Number]":return[0,1].includes(t.valueOf());case"[object Boolean]":return!0;default:return!1}},function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.isBooleanable=t.boolean=void 0;const e=lt;Object.defineProperty(t,"boolean",{enumerable:!0,get:function(){return e.boolean}});const s=ht;Object.defineProperty(t,"isBooleanable",{enumerable:!0,get:function(){return s.isBooleanable}})}(at);var ct,dt,ut={exports:{}};function pt(){if(dt)return ct;dt=1;var t=1e3,e=60*t,s=60*e,i=24*s,n=7*i,r=365.25*i;function o(t,e,s,i){var n=e>=1.5*s;return Math.round(t/s)+" "+i+(n?"s":"")}return ct=function(a,l){l=l||{};var h=typeof a;if("string"===h&&a.length>0)return function(o){if((o=String(o)).length>100)return;var a=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o);if(!a)return;var l=parseFloat(a[1]);switch((a[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return l*r;case"weeks":case"week":case"w":return l*n;case"days":case"day":case"d":return l*i;case"hours":case"hour":case"hrs":case"hr":case"h":return l*s;case"minutes":case"minute":case"mins":case"min":case"m":return l*e;case"seconds":case"second":case"secs":case"sec":case"s":return l*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return l;default:return}}(a);if("number"===h&&isFinite(a))return l.long?function(n){var r=Math.abs(n);if(r>=i)return o(n,r,i,"day");if(r>=s)return o(n,r,s,"hour");if(r>=e)return o(n,r,e,"minute");if(r>=t)return o(n,r,t,"second");return n+" ms"}(a):function(n){var r=Math.abs(n);if(r>=i)return Math.round(n/i)+"d";if(r>=s)return Math.round(n/s)+"h";if(r>=e)return Math.round(n/e)+"m";if(r>=t)return Math.round(n/t)+"s";return n+"ms"}(a);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(a))},ct}var ft=function(t){function e(t){let i,n,r,o=null;function a(...t){if(!a.enabled)return;const s=a,n=Number(new Date),r=n-(i||n);s.diff=r,s.prev=i,s.curr=n,i=n,t[0]=e.coerce(t[0]),"string"!=typeof t[0]&&t.unshift("%O");let o=0;t[0]=t[0].replace(/%([a-zA-Z%])/g,((i,n)=>{if("%%"===i)return"%";o++;const r=e.formatters[n];if("function"==typeof r){const e=t[o];i=r.call(s,e),t.splice(o,1),o--}return i})),e.formatArgs.call(s,t);(s.log||e.log).apply(s,t)}return a.namespace=t,a.useColors=e.useColors(),a.color=e.selectColor(t),a.extend=s,a.destroy=e.destroy,Object.defineProperty(a,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==o?o:(n!==e.namespaces&&(n=e.namespaces,r=e.enabled(t)),r),set:t=>{o=t}}),"function"==typeof e.init&&e.init(a),a}function s(t,s){const i=e(this.namespace+(void 0===s?":":s)+t);return i.log=this.log,i}function i(t){return t.toString().substring(2,t.toString().length-2).replace(/\.\*\?$/,"*")}return e.debug=e,e.default=e,e.coerce=function(t){if(t instanceof Error)return t.stack||t.message;return t},e.disable=function(){const t=[...e.names.map(i),...e.skips.map(i).map((t=>"-"+t))].join(",");return e.enable(""),t},e.enable=function(t){let s;e.save(t),e.namespaces=t,e.names=[],e.skips=[];const i=("string"==typeof t?t:"").split(/[\s,]+/),n=i.length;for(s=0;s<n;s++)i[s]&&("-"===(t=i[s].replace(/\*/g,".*?"))[0]?e.skips.push(new RegExp("^"+t.slice(1)+"$")):e.names.push(new RegExp("^"+t+"$")))},e.enabled=function(t){if("*"===t[t.length-1])return!0;let s,i;for(s=0,i=e.skips.length;s<i;s++)if(e.skips[s].test(t))return!1;for(s=0,i=e.names.length;s<i;s++)if(e.names[s].test(t))return!0;return!1},e.humanize=pt(),e.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(t).forEach((s=>{e[s]=t[s]})),e.names=[],e.skips=[],e.formatters={},e.selectColor=function(t){let s=0;for(let e=0;e<t.length;e++)s=(s<<5)-s+t.charCodeAt(e),s|=0;return e.colors[Math.abs(s)%e.colors.length]},e.enable(e.load()),e};!function(t,e){e.formatArgs=function(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+t.exports.humanize(this.diff),!this.useColors)return;const s="color: "+this.color;e.splice(1,0,s,"color: inherit");let i=0,n=0;e[0].replace(/%[a-zA-Z%]/g,(t=>{"%%"!==t&&(i++,"%c"===t&&(n=i))})),e.splice(n,0,s)},e.save=function(t){try{t?e.storage.setItem("debug",t):e.storage.removeItem("debug")}catch(t){}},e.load=function(){let t;try{t=e.storage.getItem("debug")}catch(t){}!t&&"undefined"!=typeof process&&"env"in process&&(t=process.env.DEBUG);return t},e.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},e.storage=function(){try{return localStorage}catch(t){}}(),e.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.log=console.debug||console.log||(()=>{}),t.exports=ft(e);const{formatters:s}=t.exports;s.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}}(ut,ut.exports);var gt=ot(ut.exports);let mt;const vt=(...t)=>{if(!mt){mt=gt("ToRead");const t=new URL(window.location).searchParams;mt.enabled=at.boolean(t.get("debug"))}const e=t.map((t=>null!==t&&"object"==typeof t?JSON.stringify(t):t)).join(" ");mt(e)};function yt(t){return{get:function(e){vt("API get",e);const s=new URLSearchParams(e),i=`${t}/links?${s}`;return fetch(i,{method:"GET",mode:"cors"}).then((t=>{if(!t.ok)throw new Error(`Could not get links from ${i} (type ${t.type}, status ${t.status})`);return t.json()}))},check:function(e){vt("API check",e);const s=new URLSearchParams(e);s.set("check","true");const i=`${t}/links?${s}`;return fetch(i,{method:"GET",mode:"cors"}).then((t=>{if(!t.ok)throw new Error(`Could not check link from server ${i} (type ${t.type}, status ${t.status})`);return t.json()}))},add:function(e){vt("API add",e);const s=`${t}/links`;return fetch(s,{method:"POST",body:JSON.stringify(e),mode:"cors",headers:{"Content-Type":"application/json"}}).then((t=>{if(!t.ok)throw new Error(`Could not add link on server ${s} (type ${t.type}, status ${t.status})`);return t.json()}))},remove:function(e){return vt("API remove",e),Promise.all(e.map((e=>fetch(`${t}/links/${e}`,{method:"DELETE",mode:"cors"})))).then((t=>t.map((t=>{if(!t.ok)throw new Error(`Could not remove link from server (type ${t.type}, status ${t.status})`);return t.json()}))))}}}class $t extends et{static properties={disabled:{type:Boolean},"any-selected":{type:Boolean},"no-previous":{type:Boolean},"no-next":{type:Boolean},q:{type:String}};static styles=r`
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

  `;constructor(){super(),this.disabled=!1,this["any-selected"]=!1,this["no-previous"]=!1,this["no-next"]=!1,this.q=null}changePage(t,e){t.preventDefault();const s=new CustomEvent("changePage",{bubbles:!0,composed:!0,detail:{offset:e}});this.dispatchEvent(s)}clearSearch(t){t.preventDefault(),this.q="";const e=this.shadowRoot.querySelector('input[name="q"]');e.value="",e.focus();const s=new CustomEvent("clearSearch",{bubbles:!0,composed:!0});this.dispatchEvent(s)}deleteSelected(t){t.preventDefault();const e=new CustomEvent("deleteSelected",{bubbles:!0,composed:!0});this.dispatchEvent(e)}search(t){t.preventDefault();const e=this.shadowRoot.querySelector('input[name="q"]');this.q=e.value;const s=new CustomEvent("search",{bubbles:!0,composed:!0,detail:{phrase:this.q}});this.dispatchEvent(s)}render(){return T`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
      <form class="controls pure-form pure-g">
        <div class="pure-u-1-2">
          <input class="pure-button" type="button" value="← Previous" @click=${{handleEvent:t=>this.changePage(t,-1)}} ?disabled=${this.disabled||this["no-previous"]}>
          <input class="pure-button" type="button" value="Next →" @click=${{handleEvent:t=>this.changePage(t,1)}} ?disabled=${this.disabled||this["no-next"]}>
          <input class="pure-button" type="button" value="Delete selected" @click=${this.deleteSelected} ?disabled=${this.disabled||!this["any-selected"]}>
        </div>
        <div class="pure-u-1-2">
          <div class="search pure-button-group" role="group" aria-label="Search">
            <input class="form-control" name="q" type="text" value=${this.q} placeholder="Search" @keyup=${this.search} ?disabled=${this.disabled} accesskey="s">
            <span class="input-group-btn">
              <button class="pure-button" ?hidden=${""===this.q} type="button" aria-label="Clear search" @click=${this.clearSearch}>
              🗙
              </button>
            </span>
          </div>
        </div>
      </form>
    `}}class bt extends et{static properties={"added-today":{type:Number},"added-week":{type:Number},"deleted-today":{type:Number},"deleted-week":{type:Number}};static styles=r`
    ins { color: red; text-decoration: none; }
    del { color: green; text-decoration: none; }
  `;render(){return T`
      <span class="stats">
        <ins>+${this["added-today"]}</ins>/<del>-${this["deleted-today"]}</del> today,
        <ins>+${this["added-week"]}</ins>/<del>-${this["deleted-week"]}</del> week.
      </span>
    `}}class Ct extends et{static properties={"api-url":{type:String,attribute:!0},isDuplicate:{type:Boolean},isDuplicateDeleted:{type:Boolean},isSaving:{type:Boolean},saveFailed:{type:Boolean}};static styles=r`
    form { margin-bottom: 15px; }
    h2 { margin-top: 1.5em; margin-bottom: 0; }
    fieldset { padding: 0; border: 0; }
    label { margin-right: 0.25em; }
    .error { color: red; }
    @media (prefers-color-scheme: dark) {
      .pure-form input[type="text"],
      .pure-form textarea {
        background-color: #333;
        color: #ccc;
        border: #444;
        box-shadow: none;
      }
      .pure-button-primary {
        background-color: #00386bfa;
      }
    }
  `;constructor(){super(),this.isDuplicate=!1,this.isDuplicateDeleted=!1,this.isSaving=!1,this.saveFailed=!1,this["api-url"]="",this.api=yt(this["api-url"])}checkUrl(t){t.preventDefault(),this.isDuplicate=!1,this.isDuplicateDeleted=!1;const e=this.shadowRoot.querySelector('input[name="url"]').value;e&&this.api.check({url:e}).then((t=>{this.isDuplicate=t.links.length>0,this.isDuplicateDeleted=!0,t.links.forEach((t=>{t.deleted||(this.isDuplicateDeleted=!1)}))}))}clearForm(){const t=this.shadowRoot.querySelector("form"),e=[...t.querySelectorAll('input[type="text"]'),...t.querySelectorAll("textarea")];for(const t of e)t.value="";this.isDuplicate=!1,this.isDuplicateDeleted=!1,this.isSaving=!1,this.saveFailed=!1}submit(t){t.preventDefault(),this.isSaving=!0,this.saveFailed=!1;const e=new FormData(this.shadowRoot.querySelector("form"));this.api.add({url:e.get("url"),tags:e.get("tags"),keywords:e.get("keywords")}).then((t=>{if(!t.success)return void(this.saveFailed=!0);this.data={};const e=new Event("refreshList",{bubbles:!0,composed:!0});this.dispatchEvent(e),this.clearForm()})).catch((()=>{this.saveFailed=!0})).finally((()=>{this.isSaving=!1}))}render(){return T`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
      <form @submit=${this.submit} class="pure-form pure-form-stacked">
        <h2>Add New Link</h2>
        <fieldset ?disabled=${this.isSaving}>
          <div>
            <label for="new-url" title="Link URL">URL</label>
            <input id="new-url" type="text" name="url" value="" accesskey="n" @keyup=${this.checkUrl}>
            <div class="error" ?hidden=${!this.isDuplicate}>
              ⚠️ This link already exists<span ?hidden=${!this.isDuplicateDeleted}> (but has been deleted)</span>.
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
          <div class="error" ?hidden=${!this.saveFailed}>
            ⚠️ There was an error saving the link.
          </div>
        </fieldset>
      </form>
    `}}class _t extends et{static properties={color:{type:String},"text-color":{type:String}};static styles=r`
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
  `;render(){return T`
      <span style="background-color: ${this.color}; color: ${this["text-color"]};">
        <slot></slot>
      </span>`}}class wt extends et{static properties={tags:{type:Array},filter:{type:Number}};static styles=r`
    p { margin-bottom: 0.5em; }
    p:after { content: ""; display: table; clear: both; }
    p a { float: left; margin-bottom: 0.5em; }
    a { text-decoration: none; }
    .faded { opacity: 0.5; }
  `;toggleTag(t,e){t.preventDefault();const s=new CustomEvent("toggleTag",{bubbles:!0,composed:!0,detail:{tagId:e}});this.dispatchEvent(s)}render(){return T`
      <p>
        ${this.tags.map((t=>{const e={faded:this.filter&&this.filter!==t.id};return T`<a href
            @click=${{handleEvent:e=>this.toggleTag(e,t.id)}}
            class=${rt(e)}
          ><toread-tag color=${t.color} text-color=${t.contrastColor}>${t.name}</toread-tag></a>`}))}
      </p>
    `}}function At(t,e,s){const i=new URL(window.location).searchParams;return null===i.get(t)?e:s?parseInt(i.get(t),10):i.get(t)}customElements.define("toread-controls",$t),customElements.define("toread-stats",bt),customElements.define("toread-submit-form",Ct),customElements.define("toread-tag",_t),customElements.define("toread-tags",wt);class St extends et{static properties={actionInProgress:{type:Boolean,state:!0},"api-url":{type:String,attribute:!0},highlighted:{type:Number,state:!0},limit:{type:Number,state:!0},offset:{type:Number,state:!0},q:{type:String,state:!0},selectedItems:{type:Array,state:!0},stats:{type:Object,state:!0},tagFilter:{type:Number,state:!0},tags:{type:Array,state:!0}};static styles=r`
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
  `;constructor(){super(),this.actionInProgress=!1,this.highlighted=At("highlighted",null),this.q=At("q",""),this.offset=At("offset",0,!0),this.limit=At("limit",20,!0),this.selectedItems=[],this.tagFilter=At("tag",null,!0),this.stats={},this.links=[],this.tags=[],this.addEventListener("changePage",this.changePage),this.addEventListener("clearSearch",this.clearSearch),this.addEventListener("deleteSelected",this.deleteSelected),this.addEventListener("refreshList",this.showList),this.addEventListener("search",this.search),this.addEventListener("toggleTag",this.toggleTag),this["api-url"]="",this.api=yt(this["api-url"]),this.showList().then((()=>{null!==this.highlighted&&this.highlightOffset(this.highlighted)}))}changePage(t){this.offset=this.offset+this.limit*t.detail.offset,(this.offset<0||this.offset>=this.stats.total)&&(this.offset=0),this.clearSelected(),this.showList()}chooseRandom(t){t.preventDefault();const e=(s=0,i=this.stats.total-1,Math.floor(Math.random()*(i-s+1))+s);var s,i;const n=e%this.limit;vt("Choosing random"),vt("  stats:",this.stats),vt("  chosen index:",e),vt("  remainder:",n),this.offset=parseInt(e/this.limit,10)*this.limit,vt("  new offset:",this.offset),this.showList().then((()=>{this.highlighted=n,this.pushState(),this.highlightOffset(n)}))}clearSearch(t){vt("Clearing search"),this.q="",this.showList()}clearSelected(){vt("Clearing selected"),this.selectedItems=[];const t=this.shadowRoot.querySelectorAll('input[type="checkbox"]');for(const e of t)e.checked=!1}deleteSelected(t){vt("Deleting selected"),this.actionInProgress=!0,this.api.remove(this.selectedItems).then((()=>{this.clearSelected(),this.showList()})).finally((()=>{this.actionInProgress=!1}))}highlightOffset(t){this.links=this.links.map(((e,s)=>({...e,highlighted:t===s})));this.shadowRoot.querySelectorAll(".entries li")[t].scrollIntoView({behavior:"smooth"})}pushState=function(){const t=new URL(window.location);null!==this.highlighted&&t.searchParams.set("highlighted",this.highlighted),null!==this.limit&&t.searchParams.set("limit",this.limit),null!==this.tagFilter&&t.searchParams.set("tag",this.tagFilter),t.searchParams.set("offset",this.offset),t.searchParams.set("q",this.q),history.pushState({},"",t.toString())};search(t){this.q=t?.detail?.phrase??"",this.offset=0,this.showList()}showList(){return vt("Updating list"),this.api.get({q:this.q??"",tag:this.tagFilter??"",offset:this.offset??"",count:this.limit??""}).then((t=>{this.tags=t.tags,this.links=t.links,this.stats={...t.stats,total:t.total},this.pushState()}))}toggleTag(t){vt("Toggling tag"),this.tagFilter=this.tagFilter===t.detail.tagId?null:t.detail.tagId,this.offset=0,this.showList()}updatedSelected(t){this.selectedItems=[...this.shadowRoot.querySelectorAll('input[type="checkbox"]')].map((t=>t.checked?t.value:null)).filter((t=>null!==t))}render(){return T`
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
              ?any-selected=${0!==this.selectedItems.length}
              ?no-previous=${0===this.offset}
              ?no-next=${this.offset+this.limit>=this.stats.total}
              q=${this.q}
            ></toread-controls>
            <ul class="entries">
              ${this.links.map((t=>{const e=new Date(t.time),s=new Intl.DateTimeFormat("en-US",{dateStyle:"short"}).format(e),i={highlight:t.highlighted},n={strike:t.deleted};return T`
                  <li class=${rt(i)}>
                    <input type="checkbox" name="id" value="${t.id}" ?disabled=${this.actionInProgress} @change=${this.updatedSelected}>
                    <a href=${t.link} class=${rt(n)} target="_blank">${t.title}</a>
                    ${t.hasSnapshot?T`<a href="snapshot?id=${t.id}" class="snapshot" target="_blank" title="View snapshot">🕶️</a>`:R}
                    <span class="date">${s}</span>
                    <span class="tags">
                      ${t.tags.map((t=>T`
                        <toread-tag color=${t.color} text-color=${t.contrastColor}>${t.name}</toread-tag>
                      `))}
                    </span>
                    ${t.description?T`<p class="description">${t.description}</p>`:R}
                  </li>
                `}))}
            </ul>
            <toread-controls
              ?disabled=${this.actionInProgress}
              ?any-selected=${0!==this.selectedItems.length}
              ?no-previous=${0===this.offset}
              ?no-next=${this.offset+this.limit>=this.stats.total}
              q=${this.q}
            ></toread-controls>
          </div>
        </div>
        <div class="pure-u-1-3">
          <toread-submit-form api-url=${this["api-url"]}></toread-submit-form>
        </div>
      </div>
    `}}customElements.define("toread-app",St);
