"use strict";(self.webpackChunkberry_free_material_react_cra=self.webpackChunkberry_free_material_react_cra||[]).push([[990],{6573:function(e,t,n){function r(e,t){return function(){return e.apply(t,arguments)}}n.d(t,{Z:function(){return Ie}});const{toString:o}=Object.prototype,{getPrototypeOf:i}=Object,s=(a=Object.create(null),e=>{const t=o.call(e);return a[t]||(a[t]=t.slice(8,-1).toLowerCase())});var a;const c=e=>(e=e.toLowerCase(),t=>s(t)===e),u=e=>t=>typeof t===e,{isArray:l}=Array,f=u("undefined");const d=c("ArrayBuffer");const h=u("string"),p=u("function"),m=u("number"),y=e=>null!==e&&"object"===typeof e,g=e=>{if("object"!==s(e))return!1;const t=i(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},b=c("Date"),w=c("File"),E=c("Blob"),O=c("FileList"),S=c("URLSearchParams");function R(e,t){let n,r,{allOwnKeys:o=!1}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(null!==e&&"undefined"!==typeof e)if("object"!==typeof e&&(e=[e]),l(e))for(n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else{const r=o?Object.getOwnPropertyNames(e):Object.keys(e),i=r.length;let s;for(n=0;n<i;n++)s=r[n],t.call(null,e[s],s,e)}}function A(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const v="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:global,T=e=>!f(e)&&e!==v;const N=(j="undefined"!==typeof Uint8Array&&i(Uint8Array),e=>j&&e instanceof j);var j;const C=c("HTMLFormElement"),P=(e=>{let{hasOwnProperty:t}=e;return(e,n)=>t.call(e,n)})(Object.prototype),x=c("RegExp"),_=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};R(n,((n,o)=>{!1!==t(n,o,e)&&(r[o]=n)})),Object.defineProperties(e,r)},U="abcdefghijklmnopqrstuvwxyz",F="0123456789",B={DIGIT:F,ALPHA:U,ALPHA_DIGIT:U+U.toUpperCase()+F};const L=c("AsyncFunction");var D={isArray:l,isArrayBuffer:d,isBuffer:function(e){return null!==e&&!f(e)&&null!==e.constructor&&!f(e.constructor)&&p(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"===typeof FormData&&e instanceof FormData||p(e.append)&&("formdata"===(t=s(e))||"object"===t&&p(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&d(e.buffer),t},isString:h,isNumber:m,isBoolean:e=>!0===e||!1===e,isObject:y,isPlainObject:g,isUndefined:f,isDate:b,isFile:w,isBlob:E,isRegExp:x,isFunction:p,isStream:e=>y(e)&&p(e.pipe),isURLSearchParams:S,isTypedArray:N,isFileList:O,forEach:R,merge:function e(){const{caseless:t}=T(this)&&this||{},n={},r=(r,o)=>{const i=t&&A(n,o)||o;g(n[i])&&g(r)?n[i]=e(n[i],r):g(r)?n[i]=e({},r):l(r)?n[i]=r.slice():n[i]=r};for(let o=0,i=arguments.length;o<i;o++)arguments[o]&&R(arguments[o],r);return n},extend:function(e,t,n){let{allOwnKeys:o}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return R(t,((t,o)=>{n&&p(t)?e[o]=r(t,n):e[o]=t}),{allOwnKeys:o}),e},trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let o,s,a;const c={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),s=o.length;s-- >0;)a=o[s],r&&!r(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==n&&i(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:s,kindOfTest:c,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(l(e))return e;let t=e.length;if(!m(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:C,hasOwnProperty:P,hasOwnProp:P,reduceDescriptors:_,freezeMethods:e=>{_(e,((t,n)=>{if(p(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];p(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return l(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:A,global:v,isContextDefined:T,ALPHABET:B,generateString:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:B.ALPHA_DIGIT,n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:function(e){return!!(e&&p(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(y(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=l(e)?[]:{};return R(e,((e,t)=>{const i=n(e,r+1);!f(i)&&(o[t]=i)})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:L,isThenable:e=>e&&(y(e)||p(e))&&p(e.then)&&p(e.catch)};function k(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}D.inherits(k,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:D.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const q=k.prototype,I={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{I[e]={value:e}})),Object.defineProperties(k,I),Object.defineProperty(q,"isAxiosError",{value:!0}),k.from=(e,t,n,r,o,i)=>{const s=Object.create(q);return D.toFlatObject(e,s,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),k.call(s,e.message,t,n,r,o),s.cause=e,s.name=e.name,i&&Object.assign(s,i),s};var z=k;function M(e){return D.isPlainObject(e)||D.isArray(e)}function H(e){return D.endsWith(e,"[]")?e.slice(0,-2):e}function J(e,t,n){return e?e.concat(t).map((function(e,t){return e=H(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const W=D.toFlatObject(D,{},null,(function(e){return/^is[A-Z]/.test(e)}));var K=function(e,t,n){if(!D.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=D.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!D.isUndefined(t[e])}))).metaTokens,o=n.visitor||u,i=n.dots,s=n.indexes,a=(n.Blob||"undefined"!==typeof Blob&&Blob)&&D.isSpecCompliantForm(t);if(!D.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return"";if(D.isDate(e))return e.toISOString();if(!a&&D.isBlob(e))throw new z("Blob is not supported. Use a Buffer instead.");return D.isArrayBuffer(e)||D.isTypedArray(e)?a&&"function"===typeof Blob?new Blob([e]):Buffer.from(e):e}function u(e,n,o){let a=e;if(e&&!o&&"object"===typeof e)if(D.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(D.isArray(e)&&function(e){return D.isArray(e)&&!e.some(M)}(e)||(D.isFileList(e)||D.endsWith(n,"[]"))&&(a=D.toArray(e)))return n=H(n),a.forEach((function(e,r){!D.isUndefined(e)&&null!==e&&t.append(!0===s?J([n],r,i):null===s?n:n+"[]",c(e))})),!1;return!!M(e)||(t.append(J(o,n,i),c(e)),!1)}const l=[],f=Object.assign(W,{defaultVisitor:u,convertValue:c,isVisitable:M});if(!D.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!D.isUndefined(n)){if(-1!==l.indexOf(n))throw Error("Circular reference detected in "+r.join("."));l.push(n),D.forEach(n,(function(n,i){!0===(!(D.isUndefined(n)||null===n)&&o.call(t,n,D.isString(i)?i.trim():i,r,f))&&e(n,r?r.concat(i):[i])})),l.pop()}}(e),t};function V(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function G(e,t){this._pairs=[],e&&K(e,this,t)}const $=G.prototype;$.append=function(e,t){this._pairs.push([e,t])},$.toString=function(e){const t=e?function(t){return e.call(this,t,V)}:V;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};var X=G;function Q(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Z(e,t,n){if(!t)return e;const r=n&&n.encode||Q,o=n&&n.serialize;let i;if(i=o?o(t,n):D.isURLSearchParams(t)?t.toString():new X(t,n).toString(r),i){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}var Y=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){D.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},ee={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1};var te={isBrowser:!0,classes:{URLSearchParams:"undefined"!==typeof URLSearchParams?URLSearchParams:X,FormData:"undefined"!==typeof FormData?FormData:null,Blob:"undefined"!==typeof Blob?Blob:null},isStandardBrowserEnv:(()=>{let e;return("undefined"===typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&("undefined"!==typeof window&&"undefined"!==typeof document)})(),isStandardBrowserWebWorkerEnv:"undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"===typeof self.importScripts,protocols:["http","https","file","blob","url","data"]};var ne=function(e){function t(e,n,r,o){let i=e[o++];const s=Number.isFinite(+i),a=o>=e.length;if(i=!i&&D.isArray(r)?r.length:i,a)return D.hasOwnProp(r,i)?r[i]=[r[i],n]:r[i]=n,!s;r[i]&&D.isObject(r[i])||(r[i]=[]);return t(e,n,r[i],o)&&D.isArray(r[i])&&(r[i]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}(r[i])),!s}if(D.isFormData(e)&&D.isFunction(e.entries)){const n={};return D.forEachEntry(e,((e,r)=>{t(function(e){return D.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null};const re={"Content-Type":void 0};const oe={transitional:ee,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=D.isObject(e);o&&D.isHTMLForm(e)&&(e=new FormData(e));if(D.isFormData(e))return r&&r?JSON.stringify(ne(e)):e;if(D.isArrayBuffer(e)||D.isBuffer(e)||D.isStream(e)||D.isFile(e)||D.isBlob(e))return e;if(D.isArrayBufferView(e))return e.buffer;if(D.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return K(e,new te.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return te.isNode&&D.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((i=D.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return K(i?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(D.isString(e))try{return(t||JSON.parse)(e),D.trim(e)}catch(r){if("SyntaxError"!==r.name)throw r}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||oe.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&D.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(o){if(n){if("SyntaxError"===o.name)throw z.from(o,z.ERR_BAD_RESPONSE,this,null,this.response);throw o}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:te.classes.FormData,Blob:te.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};D.forEach(["delete","get","head"],(function(e){oe.headers[e]={}})),D.forEach(["post","put","patch"],(function(e){oe.headers[e]=D.merge(re)}));var ie=oe;const se=D.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);const ae=Symbol("internals");function ce(e){return e&&String(e).trim().toLowerCase()}function ue(e){return!1===e||null==e?e:D.isArray(e)?e.map(ue):String(e)}function le(e,t,n,r,o){return D.isFunction(r)?r.call(this,t,n):(o&&(t=n),D.isString(t)?D.isString(r)?-1!==t.indexOf(r):D.isRegExp(r)?r.test(t):void 0:void 0)}class fe{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function o(e,t,n){const o=ce(t);if(!o)throw new Error("header name must be a non-empty string");const i=D.findKey(r,o);(!i||void 0===r[i]||!0===n||void 0===n&&!1!==r[i])&&(r[i||t]=ue(e))}const i=(e,t)=>D.forEach(e,((e,n)=>o(e,n,t)));return D.isPlainObject(e)||e instanceof this.constructor?i(e,t):D.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?i((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&se[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t):null!=e&&o(t,e,n),this}get(e,t){if(e=ce(e)){const n=D.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(D.isFunction(t))return t.call(this,e,n);if(D.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=ce(e)){const n=D.findKey(this,e);return!(!n||void 0===this[n]||t&&!le(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function o(e){if(e=ce(e)){const o=D.findKey(n,e);!o||t&&!le(0,n[o],o,t)||(delete n[o],r=!0)}}return D.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!le(0,this[o],o,e,!0)||(delete this[o],r=!0)}return r}normalize(e){const t=this,n={};return D.forEach(this,((r,o)=>{const i=D.findKey(n,o);if(i)return t[i]=ue(r),void delete t[o];const s=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();s!==o&&delete t[o],t[s]=ue(r),n[s]=!0})),this}concat(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.constructor.concat(this,...t)}toJSON(e){const t=Object.create(null);return D.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&D.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((e=>{let[t,n]=e;return t+": "+n})).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e){const t=new this(e);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return r.forEach((e=>t.set(e))),t}static accessor(e){const t=(this[ae]=this[ae]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=ce(e);t[r]||(!function(e,t){const n=D.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0})}))}(n,e),t[r]=!0)}return D.isArray(e)?e.forEach(r):r(e),this}}fe.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),D.freezeMethods(fe.prototype),D.freezeMethods(fe);var de=fe;function he(e,t){const n=this||ie,r=t||n,o=de.from(r.headers);let i=r.data;return D.forEach(e,(function(e){i=e.call(n,i,o.normalize(),t?t.status:void 0)})),o.normalize(),i}function pe(e){return!(!e||!e.__CANCEL__)}function me(e,t,n){z.call(this,null==e?"canceled":e,z.ERR_CANCELED,t,n),this.name="CanceledError"}D.inherits(me,z,{__CANCEL__:!0});var ye=me;var ge=te.isStandardBrowserEnv?{write:function(e,t,n,r,o,i){const s=[];s.push(e+"="+encodeURIComponent(t)),D.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),D.isString(r)&&s.push("path="+r),D.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function be(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}var we=te.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function r(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=r(window.location.href),function(e){const t=D.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return!0};var Ee=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,i=0,s=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[s];o||(o=c),n[i]=a,r[i]=c;let l=s,f=0;for(;l!==i;)f+=n[l++],l%=e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),c-o<t)return;const d=u&&c-u;return d?Math.round(1e3*f/d):void 0}};function Oe(e,t){let n=0;const r=Ee(50,250);return o=>{const i=o.loaded,s=o.lengthComputable?o.total:void 0,a=i-n,c=r(a);n=i;const u={loaded:i,total:s,progress:s?i/s:void 0,bytes:a,rate:c||void 0,estimated:c&&s&&i<=s?(s-i)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u)}}const Se={http:null,xhr:"undefined"!==typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const o=de.from(e.headers).normalize(),i=e.responseType;let s;function a(){e.cancelToken&&e.cancelToken.unsubscribe(s),e.signal&&e.signal.removeEventListener("abort",s)}D.isFormData(r)&&(te.isStandardBrowserEnv||te.isStandardBrowserWebWorkerEnv?o.setContentType(!1):o.setContentType("multipart/form-data;",!1));let c=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+n))}const u=be(e.baseURL,e.url);function l(){if(!c)return;const r=de.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new z("Request failed with status code "+n.status,[z.ERR_BAD_REQUEST,z.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}((function(e){t(e),a()}),(function(e){n(e),a()}),{data:i&&"text"!==i&&"json"!==i?c.response:c.responseText,status:c.status,statusText:c.statusText,headers:r,config:e,request:c}),c=null}if(c.open(e.method.toUpperCase(),Z(u,e.params,e.paramsSerializer),!0),c.timeout=e.timeout,"onloadend"in c?c.onloadend=l:c.onreadystatechange=function(){c&&4===c.readyState&&(0!==c.status||c.responseURL&&0===c.responseURL.indexOf("file:"))&&setTimeout(l)},c.onabort=function(){c&&(n(new z("Request aborted",z.ECONNABORTED,e,c)),c=null)},c.onerror=function(){n(new z("Network Error",z.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||ee;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new z(t,r.clarifyTimeoutError?z.ETIMEDOUT:z.ECONNABORTED,e,c)),c=null},te.isStandardBrowserEnv){const t=(e.withCredentials||we(u))&&e.xsrfCookieName&&ge.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t)}void 0===r&&o.setContentType(null),"setRequestHeader"in c&&D.forEach(o.toJSON(),(function(e,t){c.setRequestHeader(t,e)})),D.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),i&&"json"!==i&&(c.responseType=e.responseType),"function"===typeof e.onDownloadProgress&&c.addEventListener("progress",Oe(e.onDownloadProgress,!0)),"function"===typeof e.onUploadProgress&&c.upload&&c.upload.addEventListener("progress",Oe(e.onUploadProgress)),(e.cancelToken||e.signal)&&(s=t=>{c&&(n(!t||t.type?new ye(null,e,c):t),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(s),e.signal&&(e.signal.aborted?s():e.signal.addEventListener("abort",s)));const f=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(u);f&&-1===te.protocols.indexOf(f)?n(new z("Unsupported protocol "+f+":",z.ERR_BAD_REQUEST,e)):c.send(r||null)}))}};D.forEach(Se,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(n){}Object.defineProperty(e,"adapterName",{value:t})}}));var Re=e=>{e=D.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=D.isString(n)?Se[n.toLowerCase()]:n));o++);if(!r){if(!1===r)throw new z(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT");throw new Error(D.hasOwnProp(Se,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`)}if(!D.isFunction(r))throw new TypeError("adapter is not a function");return r};function Ae(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ye(null,e)}function ve(e){Ae(e),e.headers=de.from(e.headers),e.data=he.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return Re(e.adapter||ie.adapter)(e).then((function(t){return Ae(e),t.data=he.call(e,e.transformResponse,t),t.headers=de.from(t.headers),t}),(function(t){return pe(t)||(Ae(e),t&&t.response&&(t.response.data=he.call(e,e.transformResponse,t.response),t.response.headers=de.from(t.response.headers))),Promise.reject(t)}))}const Te=e=>e instanceof de?e.toJSON():e;function Ne(e,t){t=t||{};const n={};function r(e,t,n){return D.isPlainObject(e)&&D.isPlainObject(t)?D.merge.call({caseless:n},e,t):D.isPlainObject(t)?D.merge({},t):D.isArray(t)?t.slice():t}function o(e,t,n){return D.isUndefined(t)?D.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}function i(e,t){if(!D.isUndefined(t))return r(void 0,t)}function s(e,t){return D.isUndefined(t)?D.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,o,i){return i in t?r(n,o):i in e?r(void 0,n):void 0}const c={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(e,t)=>o(Te(e),Te(t),!0)};return D.forEach(Object.keys(Object.assign({},e,t)),(function(r){const i=c[r]||o,s=i(e[r],t[r],r);D.isUndefined(s)&&i!==a||(n[r]=s)})),n}const je="1.4.0",Ce={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Ce[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const Pe={};Ce.transitional=function(e,t,n){function r(e,t){return"[Axios v1.4.0] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,o,i)=>{if(!1===e)throw new z(r(o," has been removed"+(t?" in "+t:"")),z.ERR_DEPRECATED);return t&&!Pe[o]&&(Pe[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,i)}};var xe={assertOptions:function(e,t,n){if("object"!==typeof e)throw new z("options must be an object",z.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const i=r[o],s=t[i];if(s){const t=e[i],n=void 0===t||s(t,i,e);if(!0!==n)throw new z("option "+i+" must be "+n,z.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new z("Unknown option "+i,z.ERR_BAD_OPTION)}},validators:Ce};const _e=xe.validators;class Ue{constructor(e){this.defaults=e,this.interceptors={request:new Y,response:new Y}}request(e,t){"string"===typeof e?(t=t||{}).url=e:t=e||{},t=Ne(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;let i;void 0!==n&&xe.assertOptions(n,{silentJSONParsing:_e.transitional(_e.boolean),forcedJSONParsing:_e.transitional(_e.boolean),clarifyTimeoutError:_e.transitional(_e.boolean)},!1),null!=r&&(D.isFunction(r)?t.paramsSerializer={serialize:r}:xe.assertOptions(r,{encode:_e.function,serialize:_e.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase(),i=o&&D.merge(o.common,o[t.method]),i&&D.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=de.concat(i,o);const s=[];let a=!0;this.interceptors.request.forEach((function(e){"function"===typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,s.unshift(e.fulfilled,e.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)}));let l,f=0;if(!a){const e=[ve.bind(this),void 0];for(e.unshift.apply(e,s),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);f<l;)u=u.then(e[f++],e[f++]);return u}l=s.length;let d=t;for(f=0;f<l;){const e=s[f++],t=s[f++];try{d=e(d)}catch(h){t.call(this,h);break}}try{u=ve.call(this,d)}catch(h){return Promise.reject(h)}for(f=0,l=c.length;f<l;)u=u.then(c[f++],c[f++]);return u}getUri(e){return Z(be((e=Ne(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}D.forEach(["delete","get","head","options"],(function(e){Ue.prototype[e]=function(t,n){return this.request(Ne(n||{},{method:e,url:t,data:(n||{}).data}))}})),D.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(Ne(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Ue.prototype[e]=t(),Ue.prototype[e+"Form"]=t(!0)}));var Fe=Ue;class Be{constructor(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,o){n.reason||(n.reason=new ye(e,r,o),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new Be((function(t){e=t})),cancel:e}}}var Le=Be;const De={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(De).forEach((e=>{let[t,n]=e;De[n]=t}));var ke=De;const qe=function e(t){const n=new Fe(t),o=r(Fe.prototype.request,n);return D.extend(o,Fe.prototype,n,{allOwnKeys:!0}),D.extend(o,n,null,{allOwnKeys:!0}),o.create=function(n){return e(Ne(t,n))},o}(ie);qe.Axios=Fe,qe.CanceledError=ye,qe.CancelToken=Le,qe.isCancel=pe,qe.VERSION=je,qe.toFormData=K,qe.AxiosError=z,qe.Cancel=qe.CanceledError,qe.all=function(e){return Promise.all(e)},qe.spread=function(e){return function(t){return e.apply(null,t)}},qe.isAxiosError=function(e){return D.isObject(e)&&!0===e.isAxiosError},qe.mergeConfig=Ne,qe.AxiosHeaders=de,qe.formToJSON=e=>ne(D.isHTMLForm(e)?new FormData(e):e),qe.HttpStatusCode=ke,qe.default=qe;var Ie=qe}}]);