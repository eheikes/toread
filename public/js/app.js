/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new o(i,t,s)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a;const l=window,h=l.trustedTypes,d=h?h.emptyScript:"",c=l.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=g){var i;const o=this.constructor._$Ep(t,s);if(void 0!==o&&!0===s.reflect){const n=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:u).toAttribute(e,s.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:v}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.1");const f=window,$=f.trustedTypes,y=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,A="?"+_,w=`<${A}>`,S=document,E=()=>S.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,x=Array.isArray,C="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,T=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,N=/"/g,H=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),O=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),q=new WeakMap,M=S.createTreeWalker(S,129,null,!1),B=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":"",r=P;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,d=0;for(;d<s.length&&(r.lastIndex=d,l=r.exec(s),null!==l);)d=r.lastIndex,r===P?"!--"===l[1]?r=U:void 0!==l[1]?r=D:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=T):void 0!==l[3]&&(r=T):r===T?">"===l[0]?(r=null!=o?o:P,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?T:'"'===l[3]?N:L):r===N||r===L?r=T:r===U||r===D?r=P:(r=T,o=void 0);const c=r===T&&t[e+1].startsWith("/>")?" ":"";n+=r===P?s+w:h>=0?(i.push(a),s.slice(0,h)+b+s.slice(h)+_+c):s+_+(-2===h?(i.push(void 0),e):c)}const a=n+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(a):a,i]};class j{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,h]=B(t,e);if(this.el=j.createElement(l,s),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=M.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(b)||e.startsWith(_)){const s=h[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+b).split(_),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?G:"@"===e[1]?K:V})}else a.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(H.test(i.tagName)){const t=i.textContent.split(_),e=t.length-1;if(e>0){i.textContent=$?$.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],E()),M.nextNode(),a.push({type:2,index:++o});i.append(t[e],E())}}}else if(8===i.nodeType)if(i.data===A)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(_,t+1));)a.push({type:7,index:o}),t+=_.length-1}o++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function z(t,e,s=t,i){var o,n,r,a;if(e===O)return e;let l=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const h=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,s,i)),void 0!==i?(null!==(r=(a=s)._$Co)&&void 0!==r?r:a._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(e=z(t,l._$AS(t,e.values),l,i)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(s,!0);M.currentNode=o;let n=M.nextNode(),r=0,a=0,l=i[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new W(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new J(n,this,t)),this._$AV.push(e),l=i[++a]}r!==(null==l?void 0:l.index)&&(n=M.nextNode(),r++)}return M.currentNode=S,o}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class W{constructor(t,e,s,i){var o;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),k(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==O&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>x(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=j.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(s);else{const t=new F(o,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new j(t)),e}T(t){x(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new W(this.k(E()),this.k(E()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class V{constructor(t,e,s,i,o){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=z(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==O,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=z(this,i[s+r],e,r),a===O&&(a=this._$AH[r]),n||(n=!k(a)||a!==this._$AH[r]),a===I?t=I:t!==I&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const X=$?$.emptyScript:"";class G extends V{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class K extends V{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=z(this,t,e,0))&&void 0!==s?s:I)===O)return;const i=this._$AH,o=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==I&&(i===I||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class J{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const Q=f.litHtmlPolyfillSupport;null==Q||Q(j,W),(null!==(m=f.litHtmlVersions)&&void 0!==m?m:f.litHtmlVersions=[]).push("2.7.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Y,tt;class et extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new W(e.insertBefore(E(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return O}}et.finalized=!0,et._$litElement$=!0,null===(Y=globalThis.litElementHydrateSupport)||void 0===Y||Y.call(globalThis,{LitElement:et});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:et}),(null!==(tt=globalThis.litElementVersions)&&void 0!==tt?tt:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=1,ot=t=>(...e)=>({_$litDirective$:t,values:e});let nt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=ot(class extends nt{constructor(t){var e;if(super(t),t.type!==it||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var s,i;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(s=this.nt)||void 0===s?void 0:s.has(t))&&this.it.add(t);return this.render(e)}const o=t.element.classList;this.it.forEach((t=>{t in e||(o.remove(t),this.it.delete(t))}));for(const t in e){const s=!!e[t];s===this.it.has(t)||(null===(i=this.nt)||void 0===i?void 0:i.has(t))||(s?(o.add(t),this.it.add(t)):(o.remove(t),this.it.delete(t)))}return O}});function at(t){return{get:function(e){console.log("*** get()",e);const s=new URLSearchParams(e),i=`${t}/links?${s}`;return fetch(i,{method:"GET",mode:"cors"}).then((t=>{if(!t.ok)throw new Error(`Could not get links from ${i} (type ${t.type}, status ${t.status})`);return t.json()}))},check:function(e){console.log("*** check()",e);const s=new URLSearchParams(e);s.set("check","true");const i=`${t}/links?${s}`;return fetch(i,{method:"GET",mode:"cors"}).then((t=>{if(!t.ok)throw new Error(`Could not check link from server ${i} (type ${t.type}, status ${t.status})`);return t.json()}))},add:function(e){console.log("*** add()",e);const s=`${t}/links`;return fetch(s,{method:"POST",body:JSON.stringify(e),mode:"cors",headers:{"Content-Type":"application/json"}}).then((t=>{if(!t.ok)throw new Error(`Could not add link on server ${s} (type ${t.type}, status ${t.status})`);return t.json()}))},remove:function(e){return console.log("*** remove()",e),Promise.all(e.map((e=>fetch(`${t}/links/${e}`,{method:"DELETE",mode:"cors"})))).then((t=>t.map((t=>{if(!t.ok)throw new Error(`Could not remove link from server (type ${t.type}, status ${t.status})`);return t.json()}))))}}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt="important",ht=" !"+lt,dt=ot(class extends nt{constructor(t){var e;if(super(t),t.type!==it||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,s)=>{const i=t[s];return null==i?e:e+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(t,[e]){const{style:s}=t.element;if(void 0===this.ut){this.ut=new Set;for(const t in e)this.ut.add(t);return this.render(e)}this.ut.forEach((t=>{null==e[t]&&(this.ut.delete(t),t.includes("-")?s.removeProperty(t):s[t]="")}));for(const t in e){const i=e[t];if(null!=i){this.ut.add(t);const e="string"==typeof i&&i.endsWith(ht);t.includes("-")||e?s.setProperty(t,e?i.slice(0,-11):i,e?lt:""):s[t]=i}}return O}});class ct extends et{static properties={disabled:{type:Boolean},"any-selected":{type:Boolean},"no-previous":{type:Boolean},"no-next":{type:Boolean},q:{type:String}};static styles=n`
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
        background-color: #666;
        color: #ccc;
      }
    }

  `;constructor(){super(),this.disabled=!1,this["any-selected"]=!1,this["no-previous"]=!1,this["no-next"]=!1,this.q=null}changePage(t,e){t.preventDefault();const s=new CustomEvent("changePage",{bubbles:!0,composed:!0,detail:{offset:e}});this.dispatchEvent(s)}clearSearch(t){t.preventDefault(),this.q="";const e=this.shadowRoot.querySelector('input[name="q"]');e.value="",e.focus();const s=new CustomEvent("clearSearch",{bubbles:!0,composed:!0});this.dispatchEvent(s)}deleteSelected(t){t.preventDefault();const e=new CustomEvent("deleteSelected",{bubbles:!0,composed:!0});this.dispatchEvent(e)}search(t){t.preventDefault();const e=this.shadowRoot.querySelector('input[name="q"]');this.q=e.value;const s=new CustomEvent("search",{bubbles:!0,composed:!0,detail:{phrase:this.q}});this.dispatchEvent(s)}render(){const t={display:""!==this.q?"inline":"none"};return R`
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
              <button class="pure-button" style=${dt(t)} type="button" aria-label="Clear search" @click=${this.clearSearch}>
              🗙
              </button>
            </span>
          </div>
        </div>
      </form>
    `}}class ut extends et{static properties={"added-today":{type:Number},"added-week":{type:Number},"deleted-today":{type:Number},"deleted-week":{type:Number}};static styles=n`
    ins { color: red; text-decoration: none; }
    del { color: green; text-decoration: none; }
  `;render(){return R`
      <span class="stats">
        <ins>+${this["added-today"]}</ins>/<del>-${this["deleted-today"]}</del> today,
        <ins>+${this["added-week"]}</ins>/<del>-${this["deleted-week"]}</del> week.
      </span>
    `}}class pt extends et{static properties={"api-url":{type:String,attribute:!0},isDuplicate:{type:Boolean},isDuplicateDeleted:{type:Boolean},isSaving:{type:Boolean},saveFailed:{type:Boolean}};static styles=n`
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
  `;constructor(){super(),this.isDuplicate=!1,this.isDuplicateDeleted=!1,this.isSaving=!1,this.saveFailed=!1,this["api-url"]="",this.api=at(this["api-url"])}checkUrl(t){t.preventDefault(),this.isDuplicate=!1,this.isDuplicateDeleted=!1;const e=this.shadowRoot.querySelector('input[name="url"]').value;e&&this.api.check({url:e}).then((t=>{this.isDuplicate=t.links.length>0,this.isDuplicateDeleted=!0,t.links.forEach((t=>{t.deleted||(this.isDuplicateDeleted=!1)}))}))}clearForm(){const t=this.shadowRoot.querySelector("form"),e=[...t.querySelectorAll('input[type="text"]'),...t.querySelectorAll("textarea")];for(const t of e)t.value="";this.isDuplicate=!1,this.isDuplicateDeleted=!1,this.isSaving=!1,this.saveFailed=!1}submit(t){t.preventDefault(),this.isSaving=!0,this.saveFailed=!1;const e=new FormData(this.shadowRoot.querySelector("form"));this.api.add({url:e.get("url"),tags:e.get("tags"),keywords:e.get("keywords")}).then((t=>{if(!t.success)return void(this.saveFailed=!0);this.data={};const e=new Event("refreshList",{bubbles:!0,composed:!0});this.dispatchEvent(e),this.clearForm()})).catch((()=>{this.saveFailed=!0})).finally((()=>{this.isSaving=!1}))}render(){return R`
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
    `}}class gt extends et{static properties={color:{type:String},"text-color":{type:String}};static styles=n`
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
  `;render(){return R`
      <span style="background-color: ${this.color}; color: ${this["text-color"]};">
        <slot></slot>
      </span>`}}class vt extends et{static properties={tags:{type:Array},filter:{type:Number}};static styles=n`
    p { margin-bottom: 0.5em; }
    p:after { content: ""; display: table; clear: both; }
    p a { float: left; margin-bottom: 0.5em; }
    a { text-decoration: none; }
    .faded { opacity: 0.5; }
  `;toggleTag(t,e){t.preventDefault();const s=new CustomEvent("toggleTag",{bubbles:!0,composed:!0,detail:{tagId:e}});this.dispatchEvent(s)}render(){return R`
      <p>
        ${this.tags.map((t=>{const e={faded:this.filter&&this.filter!==t.id};return R`<a href
            @click=${{handleEvent:e=>this.toggleTag(e,t.id)}}
            class=${rt(e)}
          ><toread-tag color=${t.color} text-color=${t.contrastColor}>${t.name}</toread-tag></a>`}))}
      </p>
    `}}function mt(t,e,s){const i=new URL(window.location).searchParams;return null===i.get(t)?e:s?parseInt(i.get(t),10):i.get(t)}customElements.define("toread-controls",ct),customElements.define("toread-stats",ut),customElements.define("toread-submit-form",pt),customElements.define("toread-tag",gt),customElements.define("toread-tags",vt);class ft extends et{static properties={actionInProgress:{type:Boolean,state:!0},"api-url":{type:String,attribute:!0},highlighted:{type:Number,state:!0},limit:{type:Number,state:!0},offset:{type:Number,state:!0},q:{type:String,state:!0},selectedItems:{type:Array,state:!0},stats:{type:Object,state:!0},tagFilter:{type:Number,state:!0},tags:{type:Array,state:!0}};static styles=n`
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
  `;constructor(){super(),this.actionInProgress=!1,this.highlighted=mt("highlighted",null),this.q=mt("q",""),this.offset=mt("offset",0,!0),this.limit=mt("limit",20,!0),this.selectedItems=[],this.tagFilter=mt("tag",null,!0),this.stats={},this.links=[],this.tags=[],this.addEventListener("changePage",this.changePage),this.addEventListener("clearSearch",this.clearSearch),this.addEventListener("deleteSelected",this.deleteSelected),this.addEventListener("refreshList",this.showList),this.addEventListener("search",this.search),this.addEventListener("toggleTag",this.toggleTag),this["api-url"]="",this.api=at(this["api-url"]),this.showList().then((()=>{null!==this.highlighted&&this.highlightOffset(this.highlighted)}))}changePage(t){this.offset=this.offset+this.limit*t.detail.offset,(this.offset<0||this.offset>=this.stats.total)&&(this.offset=0),this.clearSelected(),this.showList()}chooseRandom(t){t.preventDefault();const e=(s=0,i=this.stats.total-1,Math.floor(Math.random()*(i-s+1))+s);var s,i;const o=e%this.limit;console.log("Choosing random..."),console.log("stats:",this.stats),console.log("chosenIndex:",e),console.log("remainder:",o),this.offset=parseInt(e/this.limit,10)*this.limit,console.log("new offset:",this.offset),this.showList().then((()=>{this.highlighted=o,this.pushState(),this.highlightOffset(o)}))}clearSearch(t){this.q="",this.showList()}clearSelected(){this.selectedItems=[];const t=this.shadowRoot.querySelectorAll('input[type="checkbox"]');for(const e of t)e.checked=!1}deleteSelected(t){this.actionInProgress=!0,this.api.remove(this.selectedItems).then((()=>{this.clearSelected(),this.showList()})).finally((()=>{this.actionInProgress=!1}))}highlightOffset(t){this.links=this.links.map(((e,s)=>({...e,highlighted:t===s})));this.shadowRoot.querySelectorAll(".entries li")[t].scrollIntoView({behavior:"smooth"})}pushState=function(){const t=new URL(window.location);null!==this.highlighted&&t.searchParams.set("highlighted",this.highlighted),null!==this.limit&&t.searchParams.set("limit",this.limit),null!==this.tagFilter&&t.searchParams.set("tag",this.tagFilter),t.searchParams.set("offset",this.offset),t.searchParams.set("q",this.q),history.pushState({},"",t.toString())};search(t){this.q=t?.detail?.phrase??"",this.offset=0,this.showList()}showList(){return this.api.get({q:this.q??"",tag:this.tagFilter??"",offset:this.offset??"",count:this.limit??""}).then((t=>{this.tags=t.tags,this.links=t.links,this.stats={...t.stats,total:t.total},this.pushState()}))}toggleTag(t){this.tagFilter=this.tagFilter===t.detail.tagId?null:t.detail.tagId,this.offset=0,this.showList()}updatedSelected(t){this.selectedItems=[...this.shadowRoot.querySelectorAll('input[type="checkbox"]')].map((t=>t.checked?t.value:null)).filter((t=>null!==t))}render(){return R`
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
              ${this.links.map((t=>{const e=new Date(t.time),s=new Intl.DateTimeFormat("en-US",{dateStyle:"short"}).format(e),i={highlight:t.highlighted},o={strike:t.deleted};return R`
                  <li class=${rt(i)}>
                    <input type="checkbox" name="id" value="${t.id}" ?disabled=${this.actionInProgress} @change=${this.updatedSelected}>
                    <a href=${t.link} class=${rt(o)} target="_blank">${t.title}</a>
                    ${t.hasSnapshot?R`<a href="snapshot?id=${t.id}" class="snapshot" target="_blank" title="View snapshot">🕶️</a>`:I}
                    <span class="date">${s}</span>
                    <span class="tags">
                      ${t.tags.map((t=>R`
                        <toread-tag color=${t.color} text-color=${t.contrastColor}>${t.name}</toread-tag>
                      `))}
                    </span>
                    ${t.description?R`<p class="description">${t.description}</p>`:I}
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
    `}}customElements.define("toread-app",ft);
