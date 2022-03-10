/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shared/NxStart.js":
/*!********************************************!*\
  !*** ./src/shared/NxStart.js + 48 modules ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "init": () => (/* binding */ init)
});

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function loadJs (signatureVar, url) {
  if (!window[signatureVar]) {
    return new Promise((resolve, reject) => {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = () => resolve(script)
      script.onerror = () => reject(new Error('unable to load ' + url))
      script.src = url
      document.body.append(script)
    })
  } else {
    return Promise.resolve(true)
  }
}

function isValidHttpUrl (string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

function loadJson (url) {
  return fetch(url).then((response) => response.json())
}

function oembedLink (url, provider, maxwidth = null, maxheight = null) {
  provider = provider.toLowerCase()
  var map = {
    youtube: 'https://youtube.com/oembed?url=',
    vimeo: 'https://vimeo.com/api/oembed.json?url=',
    soundcloud: 'https://soundcloud.com/oembed?format=json&url='
  }
  if (Object.prototype.hasOwnProperty.call(map, provider)) {
    url = map[provider] + encodeURIComponent(url)
    if (maxwidth != null) {
      url += '&maxwidth=' + maxwidth
    }
    if (maxheight != null) {
      url += '&maxheight=' + maxheight
    }
    return url
  }

  return false
}

function oembedResponse (oembedLink) {
  return loadJson(oembedLink).then((response) => {
    if (response && Object.prototype.hasOwnProperty.call(response, 'html')) {
      return response
    }

    throw new Error('invalid oembed response')
  })
}


function oembedIframe (oembedResponse) {
    // @doc: rebuilding iframe elm for super safe dom insertion
  var url = oembedResponse.html.split('src="')[1].split('"')[0]
  var iframe = document.createElement('IFRAME')
  iframe.width = oembedResponse.width
  iframe.height = oembedResponse.height
  iframe.frameborder = 'no'
  iframe.scrolling = 'no'
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  iframe.allowfullscreen = true
  iframe.title = oembedResponse.title
  iframe.src = url
  return iframe
}

function pathBasename (path) {
  return path.split(/[\\/]/).pop()
}

function pageHasSheet (signatureRule, url) {
  if (document.styleSheets.length) {
    var basename = pathBasename(url)
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheetUrl = document.styleSheets[i].href
      if (sheetUrl) {
        if (sheetUrl === url || pathBasename(sheetUrl) === basename) {
          return true
        }
        if (sheetUrl.startsWith(window.location.origin) && Object.prototype.hasOwnProperty.call(document.styleSheets[i], 'cssRules')) {
          var rules = document.styleSheets[i].cssRules

          for (let i = 0; i < rules.length; i++) {
            if (rules[i].selectorText === signatureRule) {
              return true
            }
          }
        }
      }
    }
  }
  return false
}

function loadCss (signatureRule, url, shadowRootElm = null) {
  if (shadowRootElm || !pageHasSheet(signatureRule, url)) {
    return new Promise((resolve, reject) => {
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.onload = resolve
      link.onerror = reject
      link.href = url
      if (shadowRootElm) {
        shadowRootElm.append(link)
      } else {
        document.head.append(link)
      }
    })
  } else {
    return Promise.resolve(true)
  }
}

function loadPagePreviewImg (url, useCache = true) {
  // @doc: this is SLOW and MUST be used with parcimony without an API key
  if (isValidHttpUrl(url)) {
    var callback = function (imgsrc) {
      var img = document.createElement('IMG')
      img.src = imgsrc
      return img
    }
    if (useCache) {
      var imgsrc = localStorage.getItem('preview-' + url)
      if (imgsrc) {
        return Promise.resolve(callback(imgsrc))
      }
    }
    return loadJson(
      'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' +
        url +
        '&screenshot=true'
    ).then((response) => {
      if (
        response.lighthouseResult &&
        response.lighthouseResult.audits &&
        response.lighthouseResult.audits['final-screenshot'] &&
        response.lighthouseResult.audits['final-screenshot'].details &&
        response.lighthouseResult.audits['final-screenshot'].details.data
      ) {
        var imgsrc =
          response.lighthouseResult.audits['final-screenshot'].details.data
        if (useCache) {
          localStorage.setItem('preview-' + url, imgsrc)
        }
        return callback(imgsrc)
      }
      return Promise.reject(new Error(404))
    })
  }
  return Promise.reject(new Error(400))
}

function stripHttp (url) {
  return url.replace(/^(https?:\/\/)?/, '')
}

function stripLastSlash (url) {
  return url.replace(/\/?$/, '')
}

function displayUrl (url) {
  return stripHttp(url).replace(/\/*$/, '')
}

function conciseUrl (string, withPath = true) {
  var base = stripHttp(string).split('/')
  if(!base[base.length -1]){
    base.pop()
  }
  string = base[0]
  if (withPath && base.length > 1) {
    if (base.length > 2) {
      string += '/...'
    }
    var last = base.pop()
    if (last.length > 18) {
      last = '...' + last.substring(-15)
    }
    string += '/' + last
  }
  return string
}

function miniUrl (string) {
  var parts = string
    .replace(/^(https?:\/\/)?(www.)?/, '')
    .split(':')[0]
    .split('/')[0]
    .split('.')

  for (var p = 0; p < parts.length; p++) {
    if (parts[p].includes('-')) {
      parts[p] = parts[p]
        .split('-')
        .map((p) => p[0])
        .join('-')
    } else {
      var strar = parts[p].split('')
      var pass = 0
      for (var i = 0; i < strar.length; i++) {
        if (['a', 'e', 'i', 'o', 'u', 'y'].includes(strar[i])) {
          if (pass !== 0 && i !== pass + 1) {
            strar[i] = ''
          } else {
            pass = i
          }
        }
      }
      parts[p] = strar.join('')
    }
  }
  return parts.join('.')
}

function searchUrlParam (name) {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(
    window.location.href
  )
  if (results == null) {
    return null
  } else {
    return results[1] || 0
  }
}

function toLastSlash (url) {
  if (url.lastIndexOf('/') < 8 && url.substring(0, 4) === 'http') {
    url += '/'
  }
  return url.substring(0, url.lastIndexOf('/') + 1)
}

function addFinalSlash (string) {
  if (string.slice(-1) !== '/') {
    string += '/'
  }
  return string
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */

var errors = []
var consoleLog = false

function setConsoleLog (bool = true) {
  consoleLog = bool
}
function clearErr () {
  errors = []
}

function logErr (msg, detail = null) {
  var entry = { msg: msg }
  if (detail) {
    entry.detail = detail
  }
  errors.push(entry)
  if (consoleLog) {
    console.log('Nexus/Error: ' + JSON.stringify(entry))
  }
}

function getErr () {
  return errors
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/base/NxDefaults.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
const defaultIO = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/js/NxIO.js'
const defaultStyle = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NxIO.min.css'
const defaultSignatureRule = '.nx-instance'
const defaultElmId = '#Nexus'
const defaultLang = 'en'

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/load/NxStyle.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */




function loadAppCss (url = null, signatureRule = null, fallbackUrl = null) {
  if (!url) {
    url = defaultStyle
  }
  if (!signatureRule) {
    signatureRule = defaultSignatureRule
  }
  if (!fallbackUrl && url !== defaultStyle) {
    fallbackUrl = defaultStyle
  }
  return loadCss(signatureRule, url)
    .then(() => {
      return Promise.resolve(url)
    }).catch((err) => {
      logErr('Theme not found', err.message)
      if (fallbackUrl) {
        return loadAppCss(fallbackUrl)
      } else {
        return Promise.reject(new Error(404))
      }
    })
}

function isCssLoaded (url = null, signatureRule = null) {
  if (!url) {
    url = defaultStyle
  }
  if (!signatureRule) {
    signatureRule = defaultSignatureRule
  }
  return pageHasSheet(signatureRule, defaultStyle)
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function isNonEmptyArr (it) {
  return Array.isArray(it) && it.length
}
function isNonEmptyObj (it) {
  return it && it !== null && it.constructor.name === 'Object' && Object.keys(it).length
}
function isNonEmptyStr (it) {
  return (typeof it === 'string' || it instanceof String) && it.length
}
function seemsLikeValidDate (string) {
  return isNonEmptyStr(string) && !isNaN(new Date(string))
}
function isElement (Obj) {
  return Obj instanceof Element
}
function isEmpty (it) {
  if (typeof it === 'object') {
    return !Object.keys(it).length
  }
  return !it || !it.length
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function ucFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function charCut (string, limit, cutAnywhere = false) {
  string = string.trimEnd()
  if (string.length <= limit) {
    return string
  }
    if(limit < 6){
      return '(...)'
    }

    if(cutAnywhere || !string.match(/\s/)){
     return string.substring(0, limit - 5) + '(...)'
    } 
      var sp = string.split(/\s/)
     for(var p = sp.length - 1; p > -1; p--){
      string = string.slice(0, - (sp[p].length + 1))
      if(string.length + 6 < limit){
          break;
      }     
     }
     string += ' (...)'
     return string
}

function randomString (length = 10) {
  var rpt = 1
  if (length > 10) {
    rpt += Math.ceil(length / 10)
  }
  var str = ''
  for (var i = 0; i < rpt; i++) {
    str += Math.random().toString(36).substring(2, 10)
  }
  return str.substring(0, length)
}

function waitForElmInDOM (elmSelector, parentElm = null) {
  if (!parentElm || !(parentElm instanceof Element)) {
    parentElm = document.body
  }
  return new Promise((resolve) => {
    var elm = parentElm.querySelector(elmSelector)
    if (elm) {
      return resolve(elm)
    }

    var observer = new MutationObserver(() => {
      elm = parentElm.querySelector(elmSelector)
      if (elm) {
        observer.disconnect()
        resolve(elm)
      }
    })

    observer.observe(parentElm, {
      childList: true,
      subtree: true
    })
  })
}

function replaceDiacritics (text) {
  if (text === '' || text.length === 0) {
    return ''
  }
  var diactricMap = {
    À: 'A',
    Á: 'A',
    Â: 'A',
    Ã: 'A',
    Ä: 'A',
    Å: 'A',
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    ă: 'a',
    ą: 'a',
    Ò: 'O',
    Ó: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'O',
    Ø: 'O',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    È: 'E',
    É: 'E',
    Ê: 'E',
    Ë: 'E',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ð: 'e',
    ę: 'e',
    Ç: 'C',
    ç: 'c',
    ć: 'c',
    č: 'c',
    Ð: 'D',
    đ: 'd',
    ğ: 'g',
    Ì: 'I',
    Í: 'I',
    Î: 'I',
    Ï: 'I',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    Ł: 'L',
    ł: 'l',
    Ñ: 'N',
    ñ: 'n',
    ń: 'n',
    Š: 'S',
    š: 's',
    Ù: 'U',
    Ú: 'U',
    Û: 'U',
    Ü: 'U',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    Ÿ: 'Y',
    ÿ: 'y',
    ý: 'y',
    Ž: 'Z',
    ž: 'z',
    Ż: 'Z',
    ż: 'z',
    ɶ: 'oe',
    Œ: 'OE',
    æ: 'ae',
    Æ: 'AE',
    ß: 'ss'
  }
  var diactrics = Object.keys(diactricMap)
  for (var diactricIndex = 0; diactricIndex < diactrics.length; diactricIndex++) {
    var from = diactrics[diactricIndex]
    var to = diactricMap[from]
    text = text.replace(from, to)
  }
  return text
}

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()/|[\]\\]/g, '\\$&')
}

function splitOnLineBreaks (string) {
  return string.split(/(\r\n|\n|\r)/gm)
}

function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js
/* eslint-disable no-useless-escape */
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
const appUrl = 'https://nexus-dock.github.io/'
const typesMap = {
  nxdata: 'Object',
  nexus: 'String',
  author: 'Object',
  handle: 'String',
  about: 'String',
  url: 'String',
  threads: 'Array',
  'threads.item': 'Object',
  id: 'String',
  title: 'String',
  description: 'String',
  content: 'Object',
  timestamp: 'String',
  main: 'String',
  aside: 'String',
  media: 'Object',
  type: 'String',
  caption: 'String',
  linked: 'Array',
  'linked.item': 'String'
}
const required = ['nexus', 'author', 'threads', 'handle', 'url', 'id', 'title', 'content', 'timestamp', 'main', 'type']

const fallbacks = {
  handle:"---",
  url:"http://...",
  id:"---",
  title:"---",
  timestamp: "0000-00-00",
  main: "...",
  type: "page"
}

const charMinMax = {
  handle: [3, 30],
  about: [0, 400],
  title: [3, 30],
  description: [0, 400],
  main: [1, 1000],
  aside: [0, 400],
  caption: [0, 200]
}
const itemsMinMax = {
  threads: [1, 100],
  linked: [0, 100]
}
const supportedOembedMedia = [
  'youtube',
  'vimeo',
  'soundcloud'
]
const supportedBaseMedia = [
  'page',
  'video',
  'image',
  'audio'
]
const supportedMediaTypes = supportedBaseMedia.concat(supportedOembedMedia)
const timestampPattern =
    '^[0-9]{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?((T|\s)(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))?)?$'
const idPattern = '^[a-zA-Z0-9-]{3,36}$'
const urlPattern = '^https?:\/\/.*'

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */



const currentUrl = window.location.href
const baseCurrentUrl = toLastSlash(currentUrl)
const queries = new URLSearchParams(window.location.search.slice(1))

function getQuery (key) {
  return queries.has(key)
}
function getAbsoluteUrl (url) {
  if (url.length && url.substring(0, 4) !== 'http') {
    return baseCurrentUrl + url.replace(/^\.?\/?/, '')
  }
  return url
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */








function charLimits (catg) {
  if (Object.prototype.hasOwnProperty.call(charMinMax, catg)) {
    return charMinMax[catg]
  }
  logErr('Unknown characters limits category', catg)
  return false
}

function itmLimits (catg) {
  if (Object.prototype.hasOwnProperty.call(itemsMinMax, catg)) {
    return itemsMinMax[catg]
  }
  logErr('Unknown items limits category', catg)
  return false
}

function isValidMediaType (mediaType) {
  if (
    hasValidType(mediaType, 'type', true) &&
      supportedMediaTypes.includes(mediaType)
  ) {
    return true
  }

  logErr('Invalid media type', mediaType)
  return false
}

function extendString (str, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    var diff = limits[0] - str.length
    if (diff > 0) {
      var placeholder = '-'
      str = placeholder.repeat(diff) + str
    }
    return str
  }
  logErr('Unable to extend string', catg)
  return str
}

function validLenghtStr (str, catg, nonEmpty = true) {
  if(str.length || nonEmpty){
  if (!strHasValidMinLength(str, catg)) {
      str = extendString(str, catg)
  } else if (!strHasValidMaxLength(str, catg)) {
    str = cutString(str, catg)
  }
}
  return str
}

function hasValidType (item, field, nonEmpty = true) {
  if (Object.prototype.hasOwnProperty.call(typesMap, field)) {
    var type = typesMap[field]
    if (
      typeof item !== 'undefined' &&
        item !== null &&
        item.constructor.name === type
    ) {
      if (!nonEmpty || !isEmpty(item)) {
        return true
      }
      logErr('Field is empty', field)
    } else {
      logErr('Invalid field type', field)
    }
  } else {
    logErr('Unknown field', field)
  }

  return false
}

function emptyMedia(){
return {
  url:'',
  type:'',
  caption:''
}
}

function validMediaCaption(caption){
  if (caption && hasValidType(caption, 'caption', false)) {
    return validLenghtStr(caption, 'caption', false)
  }
  return ''
}

function validMediaType(mediaType, hasMediaUrl){
  if(!hasMediaUrl){
    return ''
  }
  if(isValidMediaType(mediaType)){
    return mediaType
  }
  return fallbacks.type
}

function validMedia (mediaObj, lax = false) {
  if (hasValidType(mediaObj, 'media', true)){
    var url = null
    if(isValidUrl(mediaObj.url, lax)){
      url = mediaObj.url
    } 
    if(url || lax){
      var type = validMediaType(mediaObj.type, url !== null)
      var caption = validMediaCaption(mediaObj.caption)
      if(type || caption){
        if(!url){
          url = fallbacks.url
        }
        return {
          url: url,
          type: type,
          caption: caption
        }
      }
    }
  }
  return emptyMedia()
}

function isValidTimestamp (timestamp, strict = false) {
  if (timestamp &&
    hasValidType(timestamp, 'timestamp', true) &&
      (timestamp.match(timestampPattern) ||
        (!strict && seemsLikeValidDate(timestamp)))
  ) {
    return true
  }
  logErr('Invalid timestamp', timestamp)
  return false
}

function fallbackContent(lax = false){
  if(lax){
    return {
      timestamp: fallbacks.timestamp,
      main: fallbacks.main,
      aside: '',
      media: emptyMedia()
    }
  } 
    return null
}

function validTimestamp(timestamp, lax = false){
  if(isValidTimestamp (timestamp, false)){
    return timestamp
  }
  if(lax){
    return fallbacks.timestamp
  }
  return null
}

function validMainContent(main, lax = false){
  if(hasValidType(main, 'main', true)){
    return validLenghtStr(main, 'main', true)
  }
  if(lax){
    return fallbacks.main
  }
  return null
}

function validAsideContent(aside){
  if(aside && hasValidType(aside,'aside', false)){
    return validLenghtStr(aside, 'aside', false)
  } 
    return '' 
}

function validContent(content, lax = false) {
  if (!hasValidType(content, 'content', true)) {
    return fallbackContent(lax)
  }
  var timestamp = validTimestamp(content.timestamp, lax)
  if(!timestamp){
    return null
  }
  var main = validMainContent(content.main, lax)
  if(!main){
    return null
  }
  var c = {}
  c.timestamp = timestamp
  c.main = main
  c.aside = validAsideContent(content.aside)
  c.media = validMedia(content.media, lax)
  return c
}

function cutString (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    return charCut(item, limits[1])
  }
  logErr('Unable to cut string', catg)
  return ''
}

function strHasValidMaxLength (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    if (item.length <= limits[1]) {
      return true
    }
    logErr('Invalid max length', catg)
  }
  return false
}
function strHasValidMinLength (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    if (item.length >= limits[0]) {
      return true
    }
    logErr('Invalid min length', catg)
  }
  return false
}

function hasValidLength (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    if (item.length >= limits[0] && item.length <= limits[1]) {
      return true
    }
    logErr('Invalid length', catg)
  }
  return false
}

function splitUrlAndId (url) {
  var rt = {
    url: null,
    id: ''
  }
  if (isValidHttpUrl(url)) {
    rt.url = url

    if (url.includes('#')) {
      var sp = url.split('#')
      var id = sp.pop()
      rt.url = sp.join('#')
      if (id && isValidId(id)) {
        rt.id = id
      }
    }
  }

  return rt
}

function isValidId (id) {
  if (hasValidType(id, 'id', true) && id.match(idPattern)) {
    return true
  }

  logErr('Invalid thread id', id)
  return false
}

function isValidUrl (url, lax = false) {
  var pass = false
  if (url && hasValidType(url, 'url', true)) {
    if(isValidHttpUrl(url)){
      return true
    }
    if(lax){
      pass = true
    }
  }
  logErr('Invalid url')
  return pass
}

function isValidLinkItm (link) {
  if (
   link && hasValidType(link, 'linked.item', true) &&
      isValidUrl(link)
  ) {
    return true
  }
  logErr('Invalid linked thread')
  return false
}


function isValidLegacyLinkItm(item){
  return isNonEmptyObj(item) && isValidUrl(item.url) && (!item.id || item.id === '/' || isValidId(item.id))
}

function getValidSrcUrl (url, id) {
  url = getAbsoluteUrl(url)
  if (isValidUrl(url)) {
    if (id && isValidId(id)) {
      url += '#' + id
    }
    return url
  }
  return ''
}

function validLinks (linked) {
  var vlinked = []
  if (hasValidType(linked, 'linked', false)) {
    var len = linked.length
    var limit = itmLimits('linked')[1]
    if (len > limit) {
      logErr('Too many linked threads', len + ' /' + limit)
      len = limit
    }
    for (var i = 0; i < len; i++) {
      var url = null
      if (isValidLinkItm(linked[i])) {
        var split = splitUrlAndId(linked[i])
        url = split.url
        if (split.id) {
          url += '#' + split.id
        }
      } else if(isValidLegacyLinkItm(linked[i])){
        url = linked[i].url
        if (linked[i].id && linked[i].id !== '/') {
          url += '#' + linked[i].id
        }
      }

        if(url){
        if (!vlinked.includes(url)) {
          vlinked.push(url)
        } else {
          logErr('Duplicate linked thread', url)
        }
      }
        
      }
    }
  return vlinked
}

function uniqueId(id, previousThreadsIds){
  if (previousThreadsIds.includes(id)) {       
    logErr('Duplicate thread id', id)
    var adt = 2
    while(previousThreadsIds.includes(id+ '-'+ adt)){
      adt++
    }
   id += '-'+ adt
  }
  return id
}

function validThreadId(id, previousThreadsIds = [], lax = false){
  if(isValidId(id)){
    return uniqueId(id, previousThreadsIds)
  }
    if(lax){
     return uniqueId(fallbacks.id, previousThreadsIds)
    }
    return null
}

function validThreadTitle(title, lax = false){

  if(hasValidType(title,'title', true)){
    return validLenghtStr(title, 'title', true)
  } 
  if(lax){
    return fallbacks.title
  }
  return null
}

function validThreadDescription(description){
  if(description && hasValidType(description,'description', false)){
    return validLenghtStr(description, 'description', false)
  } 
    return '' 
}

function validThread (thread, previousThreadsIds = [], lax = false) {
  if (!hasValidType(thread, 'threads.item', true)) {
    return null
  }
  var id = validThreadId(thread.id, previousThreadsIds, lax)
  if(!id){
    return null
  }
  var title = validThreadTitle(thread.title, lax)
  if(!title){
    return null
  }
  var content = validContent(thread.content, lax)
  if(!content){
    return null
  }
  var t = {}
  t.id = id
  t.title = title
  t.description = validThreadDescription(thread.description)
  t.content = content
  t.linked = validLinks(thread.linked)
  return t
}

function validThreads (threads, lax = false) {
  var vthreads = []

  if (hasValidType(threads, 'threads', true)) {
    var len = threads.length
    var limit = itmLimits('threads')[1]
    if (len > limit) {
      logErr('Too many threads', len + ' /' + limit)
      len = limit
    }
    var ids = []
    for (var i = 0; i < len; i++) {
      var thread = validThread(threads[i], ids, lax)

      if (thread !== null) {   
        ids.push(thread.id)
        vthreads.push(thread)
      }
    }

    if (vthreads.length) {
      return vthreads
    }
  }
  logErr('No valid thread')
  return []
}


function validAuthorHandle(handle, lax = false){
  if(hasValidType(handle, 'handle', true)){  
    return validLenghtStr(handle, 'handle', true)
  }
  if(lax){
      return fallbacks.handle
    }    
  return null
}

function validAuthorUrl(url, lax = false){
  if(isValidUrl(url,  lax)){
   return url
  } 
  if(lax){
    return fallbacks.url
  }
  return null
}

function validAuthorAbout(about){
  if (about && hasValidType(about, 'about', false)) {
    return validLenghtStr(about, 'about', false)
    } 
    return ''
}

function fallbackAuthor(lax = false){
  if(lax){
    return {
      handle:fallbacks.handle,
      about: '',
      url:fallbacks.url
    }
  } 
    return null
}

function validAuthor (author, lax = false) {

  if (!hasValidType(author, 'author', true)) {
   return fallbackAuthor(lax)
  }
  var handle = validAuthorHandle(author.handle, lax)
  if(!handle){
    return null
  }
  var url = validAuthorUrl(author.url, lax)
  if(!url){
    return null
  }
  var a = {}
  a.handle = handle
  a.about = validAuthorAbout(author.about)
  a.url = url
return a
}

function isValidAppUrl (url) {
  if (isValidUrl(url) && url === appUrl) {
    return true
  }
  logErr('Invalid app url')
  return false
}

function validAppUrl (url) {
  if (!isValidAppUrl(url)) {
    url = appUrl
  }
  return url
}

function validData (nxdata, lax = false) {
  if (hasValidType(nxdata, 'nxdata', true)) {
    var d = {}
    d.nexus = validAppUrl(nxdata.nexus)
    d.author = validAuthor(nxdata.author, lax)
    if (d.author) {
      d.threads = validThreads(nxdata.threads, lax)
      if (lax || d.threads.length) {
        return d
      }
    }
  }
  return null
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/base/NxRequest.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */





const splitCurrentUrl = splitUrlAndId(currentUrl)
const appModes = ['reader', 'editor']

function solveUrlAndId(request, dataset){
  if(dataset){
    if (dataset.src) {
      var split = splitUrlAndId(getAbsoluteUrl(dataset.src))
  
      if (split.url) {
        request.url = split.url
        request.id = split.id
      }
    }
    if (dataset.id && isValidId(dataset.id)) {
      request.id = dataset.id // @doc: id specified in data-id trumps id contained in src url; legacy support
    }
  }

  if (splitCurrentUrl.id) {
    request.id = splitCurrentUrl.id // @doc: id specified in url trumps all
  }
}

function solveStyle(request, dataset, appDefaultCssAliases){
    if (dataset && dataset.style && dataset.style !== request.style && !appDefaultCssAliases.includes(dataset.style)) {
      var cssUrl = getAbsoluteUrl(dataset.style)
      if (isValidHttpUrl(cssUrl)) {
        request.style = cssUrl
      }
    }
}

function solveMode(request, dataset){
  if((dataset && dataset.mode && dataset.mode === 'editor') || getQuery('edit') || getQuery('new')){
    request.mode = 'editor'
  }
}


function getRequest (NxElm, appDefaultCss = null, appDefaultCssAliases = [], appDefaultLang = null) {
  if(!appDefaultCss){
    appDefaultCss = defaultStyle
  }
  if(!appDefaultLang){
    appDefaultLang = defaultLang
  }
  var request = {
    srcdoc: null,
    url: '',
    id: '',
    style: appDefaultCss,
    lang: appDefaultLang,
    mode: 'reader'
  }
  var dataset = null
  if (NxElm && NxElm.dataset) {
    dataset = NxElm.dataset
    if (dataset.lang) {
      request.lang = dataset.lang
    }
    if(dataset.srcdoc){
      request.srcdoc = dataset.srcdoc
    } 
    solveStyle(request, dataset, appDefaultCssAliases)
  }
  solveUrlAndId(request, dataset)
  solveMode(request, dataset)

  return request
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/jack-js/src/modules/Stock.js
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function getLocalStorage () {
  if (isStorageAvailable('localStorage')) {
    return localStorage
  }
  return null
}

function getSessionStorage () {
  if (isStorageAvailable('sessionStorage')) {
    return sessionStorage
  }
  return null
}

function sizeInBytes (s) {
  return new TextEncoder().encode(s).length
}

function jsonSize (obj, inKb = true) {
  var sz = sizeInBytes(JSON.stringify(obj))
  if (inKb) {
    sz = sz / 1000
  }
  return sz
}

function clearPartialStorage (store, threshold = 2000) {
  var currentKb = jsonSize(store, true)
  for (var i = 0; i < store.length; i++) {
    if (currentKb < threshold) {
      break
    }
    var itmkey = store.key(i)
    var itemsize = jsonSize(store.getItem(itmkey), true)
    store.removeItem(itmkey)
    currentKb -= itemsize
  }
  return currentKb
}

function isStorageAvailable (type) {
  var storage
  try {
    storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length !== 0
    )
  }
}

function copyToClipboard (content, callback) {
  navigator.clipboard.writeText(content).then(() => callback())
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxStorage.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */


var instStores = {
  visit: {},
  data: {},
  linked: {},
  oembed: {},
}

var brwsrStores = {
  local: getLocalStorage(),
  session: getSessionStorage(),
}

Object.values(brwsrStores).forEach((store) => {
  if (store && !store.getItem('available')) {
    store.setItem('available', 5000)
  }
})

function getBrowserStore(storage) {
  if (storage === 'local') {
    return brwsrStores.local
  }
  return brwsrStores.session
}

function getInstStore(instanceStore){
  if(instStoreExists(instanceStore)){
    return instStores[instanceStore]
  }
  return null
}

function instStoreExists(instanceStore) {
  return instanceStore && Object.prototype.hasOwnProperty.call(instStores, instanceStore)
}

function instStoreHasKey(instanceStore, key) {
  return (
    instStoreExists(instanceStore) &&
    Object.prototype.hasOwnProperty.call(instStores[instanceStore], key)
  )
}

function storeItem(key, data, storage = 'session', instanceStore = null) {
  var sdata = JSON.stringify(data)
  if (instStoreExists(instanceStore)) {
    instStores[instanceStore][key] = sdata
  }
  if(storage){
  var store = getBrowserStore(storage)
  if (store) {
    var datasize = jsonSize(sdata, true, true)
    if (datasize > 2000) {
      return
    }

    var avail = store.getItem('available')
    if (avail < 1000) {
      avail = 5000 - clearPartialStorage(store, 2000)
    }
    avail -= datasize
    store.setItem(key, sdata)
    store.setItem('available', Math.ceil(avail))
  }
}
}

function getStoredItem(key, storage = 'session', instanceStore = null) {
  if (instStoreHasKey(instanceStore, key)) {
    return JSON.parse(instStores[instanceStore][key])
  }
  if(storage){
  var store = getBrowserStore(storage)
  if (store) {
    var sdata = store.getItem(key)
    if (sdata) {
      if (instStoreExists(instanceStore)) {
        instStores[instanceStore][key] = sdata
      }
      return JSON.parse(sdata)
    }
  }
}
  return null
}

function removeItem(key, storage = 'session', instanceStore = null) {
  if (instStoreHasKey(instanceStore, key)) {
    delete instStores[instanceStore][key]
  }
  if(storage){
  var store = getBrowserStore(storage)
  if (store) {
    store.removeItem(key)
  }
}
}

function clearInstanceStores(excludeStores = []) {
  Object.keys(instStores).forEach((instanceStore) => {
    if (!excludeStores.includes(instanceStore)) {
      instStores[instanceStore] = {}
    }
  })
}

function clearBrowserStores(excludeStore = null) {
  Object.keys(brwsrStores).forEach((name) => {
    if (brwsrStores[name] && excludeStore !== name) {
      brwsrStores[name].clear()
    }
  })
}


function walkLocalStore(callback){
  var locStore = getBrowserStore('local')
  if (locStore && locStore.length) {
    for (var i = 0; i < locStore.length; i++) {
      var key = locStore.key(i)
      callback(locStore, key)
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */



const editPrefix = 'nx-edit#'

function registerEditData(url, nxdata) {
  storeItem(editPrefix + url, nxdata, 'local')
}

function getStoredEditData(url) {
  return getStoredItem(editPrefix + url, 'local')
}

function registerThreadVisit(src, timestamp) {
  if (!instStoreHasKey('visit', src)) {
    storeItem(src, timestamp, 'local', 'visit')
  }
}

function isThreadContentUnseen(src, timestamp) {
  var lastKnownDate = getStoredItem(src, 'local', 'visit')

  if (!lastKnownDate) {
    return true
  }
  if (timestamp && lastKnownDate !== timestamp) {
    return true
  }
  return false
}

function clearData(url) {
  removeItem(url, null, 'data')
}

function registerData(url, nxdata) {
  storeItem(url, nxdata, null, 'data')
}

function registerLinkedMaps(src, map) {
  storeItem(src + ':linked', map, 'session', 'linked')
}

function getStoredLinkedMaps(src) {
  return getStoredItem(src + ':linked', 'session', 'linked')
}

function getStoredData(url) {
  return getStoredItem(url, null, 'data')
}

function registerOembedResponse(givenUrl, response) {
  storeItem(givenUrl, response, 'local', 'oembed')
}

function getStoredOembedResponse(givenUrl) {
  return getStoredItem(givenUrl, 'local', 'oembed')
}

function setStoredLang(lang) {
  storeItem('nx-lang', lang, 'local')
}
function getStoredLang() {
  return getStoredItem('nx-lang', 'local')
}

function clearAllCache() {
  clearInstanceStores()
  clearBrowserStores()
}

function eraseReaderSaves() {
  walkLocalStore(function(locStore, key){
    if (key.indexOf(editPrefix) === 0) {
      locStore.removeItem(key)
    }
  })
}

function clearReaderCache() {
  clearInstanceStores()
  clearBrowserStores('local')
  walkLocalStore(function(locStore, key){
    if (key.indexOf(editPrefix) !== 0) {
      locStore.removeItem(key)
    }
  })
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */





function getThreadsList (nxdata) {
  var list = []
  nxdata.threads.forEach((thread) => {
    list.push(thread.id)
  })
  return list
}

function loadSrc (url, lax = false) {
  // @doc: src should not contain #id
  return loadJson(url)
    .then((nxdata) => {
      nxdata = validData(nxdata, lax)

      if (nxdata) {
        if(!lax){
          registerData(url, nxdata)
        }
        return nxdata
      }
      logErr('Invalid source', url)
      return Promise.reject(new Error(400))
    })
    .catch((err) => {
      var code = 400
      if (err.message !== 400) {
        code = 404
        logErr('No response', err.message)
      }
      registerData(url, code)
      return Promise.reject(new Error(code))
    })
}

function getSrcDocData(jsonData, lax = false) {
  var nxdata = null
  try {
    var nxdata = JSON.parse(jsonData)
    if(nxdata){
      nxdata = validData(nxdata, lax)
    }
    if(!nxdata){
      throw new Error('Invalid Nexus data')
    }
} catch (err) {
  logErr('Invalid source', err.message)
}
return nxdata
}

function loadSrcFile (inputEvt, lax = false) {
  if (inputEvt.target.files.length) {
    if (inputEvt.target.files[0].type === 'application/json') {
      return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.onload = function (event) {
          var nxdata = getSrcDocData(event.target.result, lax)
          if (nxdata) {
            resolve(nxdata)
          } else {
            reject(new Error(400))
          }
        }
        return reader.readAsText(inputEvt.target.files[0])
      })
    }
    logErr('Invalid file type', inputEvt.target.files[0])
    return Promise.reject(new Error(400))
  }
  logErr('No file selected')
  return Promise.reject(new Error(400))
}

function getSrcData (url, lax = false) {
  // @doc: url should not contain #id
  var nxdata = getStoredData(url)
  if (nxdata !== null) {
    if (Number.isInteger(nxdata)) {
      return Promise.reject(new Error(nxdata))
    }
    return Promise.resolve(nxdata)
  }
  return loadSrc(url, lax)
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/load/NxInit.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */









const defaultInitOptions = {
  customSelector: null,
  forceLog: false,
  forceStyle: null,
  customSignatureRule: null,
  appDefaultCss: null, 
  appDefaultCssAliases: [],
  appDefaultLang: null
}

function checkCacheRequests(){
  if(getQuery('clear')){
    clearReaderCache()
  }
 if(getQuery('erase')){
  eraseReaderSaves()
  }
}

function setCookie () {
  document.cookie = 'Nx=Instance; SameSite=None; Secure'
}

function initLogger (forceLog = false) {
  if (forceLog || getQuery('log')) {
    setConsoleLog(true)
  }
}

function retrieveNxElm (customSelector = null) {
  var selectors = [defaultElmId]
  if (customSelector && customSelector !== defaultElmId) {
    selectors.unshift(customSelector)
  }
  var elm
  for (var s = 0; s < 2; s++) {
    elm = document.querySelector(selectors[s])
    if (elm) {
      return elm
    }
  }
  elm = document.createElement('DIV')
  elm.id = defaultElmId

  return elm
}

function resolveTheme (request, fallbackCssUrl = null, forceStyle = null, customSignatureRule = null) {
  var url = request.style
  if (forceStyle) {
    url = forceStyle
    if(!fallbackCssUrl || fallbackCssUrl === forceStyle){
      fallbackCssUrl = request.style
    } 
  } else if(fallbackCssUrl === url){
    fallbackCssUrl = null
  }
  return loadAppCss(url, customSignatureRule, fallbackCssUrl)
}

function resolveData (request) {
  if(request.srcdoc){
    var nxdata = getSrcDocData(request.srcdoc, request.mode === 'editor')
    if(nxdata){
      return Promise.resolve(nxdata)
    }
  }
  if (request.url) {
    return getSrcData(request.url)
  }
  return Promise.reject(new Error(0))
}

function initAll (options = {}) {
  var seed = {}
  seed.options = Object.assign({}, defaultInitOptions, options)
  checkCacheRequests()
  setCookie()
  initLogger(seed.options.forceLog)
  seed.nxelm = retrieveNxElm(seed.options.customSelector)
  seed.request = getRequest(seed.nxelm, seed.options.appDefaultCss, seed.options.appDefaultCssAliases, seed.options.appDefaultLang)
    return resolveTheme(seed.request, seed.options.appDefaultCss, seed.options.forceStyle, seed.options.customSignatureRule)
    .then((styleUrl) => {
      seed.styleUrl = styleUrl
      return resolveData(seed.request)
    }).then(nxdata => {
      seed.nxdata = nxdata
      return seed
    }).catch(err => {
      var msg = err.message
      if (!Number.isInteger(msg)) {
        logErr('Nexus Init Failed', msg)
        msg = 400
      }
      throw new Error(msg)
    })
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxTranslations.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */

const NxTranslations = {
  fr: {
    author: 'auteur·e',
    handle: 'pseudonyme',
    about: 'à propos',
    url: 'url',
    id: 'id',
    title: 'titre',
    description: 'description',
    timestamp: 'date',
    main: 'corps',
    aside: 'aparté',
    media: 'média',
    type: 'type',
    caption: 'légende',
    index: 'index',
    distant: 'distant',
    local: 'local',
    threads: 'fils',
    linked: 'liés',
    content: 'contenu',
    history: 'historique',
    copied: 'copié',
    embed: 'intégré',
    source: 'source',
    saved: 'sauvegardé',
    'local thread': 'fil local',
    'linked threads': 'fils liés',
    'No valid thread': 'Aucun fil valide',
    'Duplicate thread id': 'Identifiant du fil en double',
    'Duplicate linked thread': 'Fil lié en double',
    'Invalid linked thread': 'Fil lié non valide',
    'Invalid url': 'Url non valide',
    'Invalid thread id': 'Identifiant de fil non valide',
    'Invalid length': 'Longueur non valide',
    'Invalid min length': 'Longueur minimale non valide',
    'Invalid max length': 'Longueur maximale non valide',
    'Unable to cut string': 'Impossible de raccourcir le texte',
    'Invalid timestamp': 'Horodatage non valide',
    'Unknown field': 'Champ inconnu',
    'Invalid field type': 'Type de champ non valide',
    'Field is empty': 'Le champ est vide',
    'Unable to extend string': 'Impossible de prolonger le texte',
    'Unknown characters limits category':
    'Catégorie de limite de caractères inconnue',
    'Unknown items limits category': "Catégorie de limite d'éléments inconnue",
    'Invalid media type': 'Type de media non valide',
    'Invalid app url': "Url de l'application non valide",
    'Too many linked threads': 'Trop de fils liés',
    'Too many threads': 'Trop de fils',
    'Init failed': "L'initialisation a échoué",
    'Theme not found': 'Thème non trouvé',
    'No response': 'Aucune réponse',
    'Invalid source': 'Source non valide',
    'Invalid Nexus data': 'Données Nexus non valides'
  }
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */




var txts = NxTranslations
var availableLangs = Object.keys(txts)
availableLangs.push('en')

var storedLang = getStoredLang()
if (storedLang != null && !langIsAvailable(storedLang)) {
  storedLang = null
  setStoredLang(null)
}

var currentLang = null
if (storedLang) {
  currentLang = storedLang
} else {
  currentLang = document.querySelector('html').lang
  if (!langIsAvailable(currentLang)) {
    currentLang = 'en'
  }
}

function updateStorage (lang) {
  if (storedLang !== lang) {
    setStoredLang(lang)
    storedLang = lang
  }
}

function setOriginLang (lang) {
  // @doc lang should be seed.request.lang from NxInit, or custom one
  if (!storedLang) {
    setUserSelectedLang(lang)
  }
}

function setAdtTranslations (translObj) {
  if (isNonEmptyObj(translObj)) {
    Object.assign(txts, translObj) // @todo: test if works as expected from nested props
    availableLangs.push(
      ...Object.keys(txts).filter(
        (item) => availableLangs.indexOf(item) < 0
      )
    )
    return true
  }
  return false
}

function langIsAvailable (lang) {
  return isNonEmptyStr(lang) && availableLangs.includes(lang)
}

function setUserSelectedLang (lang) {
  if (langIsAvailable(lang) && lang !== currentLang) {
    currentLang = lang
    updateStorage(lang)
    return true
  }
  return false
}

function getAvailableLangs () {
  return availableLangs
}

function getLang () {
  return currentLang
}

function getTxt (key) {
  var text = key
  if (currentLang !== 'en' && txts[currentLang][key]) {
    text = txts[currentLang][key]
  }
  return text
}
;// CONCATENATED MODULE: ./src/shared/NxState.js



var currentState = {
  dataUrl: null,
  srcData: null,
  threadId: '/',
  threadIndex: -1,
}

var updateStore = { onChange: [], onSrcChange: [] }

function triggerCallbacks(state, triggerAll, skipHistoryUpdate) {
  var ks = ['onChange']
  if (triggerAll) {
    ks.push('onSrcChange')
  }

  ks.forEach((k) => {
    if (updateStore[k].length) {
      updateStore[k].forEach((callback) => {
        callback(state, skipHistoryUpdate)
      })
    }
  })
}

function concatSrc(state) {
  var src = state.dataUrl
  if (state.threadId !== '/') {
    src += '#' + state.threadId
  }
  return src
}

function getTimestamp(state) {
  if (state.threadIndex !== -1 && state.srcData.threads && state.threadIndex < state.srcData.threads.length) {
    return state.srcData.threads[state.threadIndex].content.timestamp
  }
  return null
}

function isStateUnseen(state) {
  var timestamp = getTimestamp(state)
  if(timestamp){
    return isThreadContentUnseen(concatSrc(state), timestamp)
  }
  return false
}

function dataToState(dataUrl, threadId, data, acceptNoId = false) {
  data.index = getThreadsList(data)
  var state = {
    dataUrl: dataUrl,
    threadId: threadId,
    srcData: data,
    threadIndex: data.index.indexOf(threadId),
  }

  if (state.threadIndex === -1) {
    if (acceptNoId) {
      if (state.threadId !== '/') {
        state.threadId = '/'
      }
    } else {
      setDefaultThread(state)
    }
  }
  return state
}

function setDefaultThread(state) {
  state.threadIndex = 0
  state.threadId = state.srcData.index[0]
}

function resolveState(dataUrl, threadId, acceptNoId = false) {
  return getSrcData(dataUrl).then((data) => {
    return dataToState(dataUrl, threadId, data, acceptNoId)
  })
}

function registerUpdateEvt(callback, onSrcChange = false) {
  var k = 'onChange'
  if (onSrcChange) {
    k = 'onSrcChange'
  }
  updateStore[k].push(callback)
}

function triggerUpdate(state, skipHistoryUpdate = false, forceTrigger = false) {
  var srcChanged = state.dataUrl != currentState.dataUrl

  if (forceTrigger || srcChanged || state.threadId != currentState.threadId) {
    if (!skipHistoryUpdate) {
      registerThreadVisit(concatSrc(currentState), getTimestamp(currentState))
    }

    var resetIndex = srcChanged || forceTrigger
    currentState = Object.assign({}, state)

    triggerCallbacks(state, resetIndex, skipHistoryUpdate)
  }
}

function getCurrentState() {
  return currentState
}

function setOriginState(state) {
  if (!currentState.dataUrl) {
    currentState = state
    return true
  }
  return false
}

function getAltState(state, nId, nIndex) {
  var altState = Object.assign({}, state)

  altState.threadId = nId
  altState.threadIndex = nIndex
  return altState
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/valva/src/modules/constants.js
/* Vâlvă | (c) 2021-22 I-is-as-I-does | MIT License */
const props = {
    spacing: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'],
    transitions: ['transition-duration', 'transition-timing-function', 'transition-property'],
    heights: ['height', 'overflow']
}

const slide = {
    target: 'height, margin, padding',
    toReset: ['height'].concat(props.spacing),
    removeInFirst: props.spacing,
    removeInThen: props.heights.concat(props.transitions),
    removeOut: props.heights.concat(props.spacing, props.transitions)
}

const fade = {
    target: 'opacity',
    toReset: ['opacity'],
    removeInFirst: ['opacity'],
    removeInThen: props.transitions,
    removeOut: ['opacity'].concat(props.transitions)
}
const ease = {
    target: slide.target + ', ' + fade.target,
    toReset: ['opacity'].concat(slide.toReset),
    removeInFirst: props.spacing.concat(['opacity']),
    removeInThen: slide.removeInThen,
    removeOut: ['opacity'].concat(slide.removeOut)
}

const profl = {
    slide: slide,
    fade: fade,
    ease: ease
}

const deflt = {
    type: 'ease',
    duration: 300,
    callback: null,
    timing: 'ease-in-out',
    delay: 1000, // vTempToggle
    reverse: false, // vToggleResolve
    prepend: false // vPlace
}
;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/valva/src/modules/utils.js
/* Vâlvă | (c) 2021-22 I-is-as-I-does | MIT License */

function isHidden(elm) {
  if (!elm) return false
  do {
    if (!(elm instanceof Element)) continue
    if (elm.hidden || !elm.offsetHeight) {
      return true
    }
    var style = window.getComputedStyle(elm)
    if (
      style.width === '0' ||
      style.height === '0' ||
      style.opacity === '0' ||
      style.display === 'none' ||
      style.visibility === 'hidden'
    ) {
      return true
    }
  } while ((elm = elm.parentNode))
  return false
}


function resetDisplay(elm) {
  elm.style.removeProperty('display')
  let display = window.getComputedStyle(elm).display
  if (display === 'none') display = 'block'
  elm.style.display = display
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js

/* Vâlvă | (c) 2021-22 I-is-as-I-does | MIT License */
/* eslint-disable no-unused-expressions */




function setTransition(elm, type, duration, timing) {
  elm.style.setProperty('transition-property', profl[type].target)
  elm.style.setProperty('transition-timing-function', timing)
  elm.style.setProperty('transition-duration', duration + 'ms')
}

function resetStyle(elm, type) {
  profl[type].toReset.forEach(p => {
    elm.style.setProperty(p, 0)
  })
}

function removeProp(elm, type, key) {

  profl[type][key].forEach(p => {
    elm.style.removeProperty(p)
  })
}


function changeThenAct(parent, child, placeAction, placeCallBack) {
  if (!(parent instanceof Element)) {
    parent = document.body
  }

  var tmpclass = 'm' + Math.random().toString(20).substring(2)
  child.classList.add(tmpclass)

  return new Promise((resolve) => {
    var observer = new MutationObserver(() => {
      if (parent.querySelector('.' + tmpclass)) {
        child.classList.remove(tmpclass)
        observer.disconnect()
        placeCallBack()
        resolve(true)
      }
    })
    observer.observe(parent, {
      childList: true
    })
    placeAction()
  })
}


function vHide(elm, type = deflt.type, duration = deflt.duration, callback = null, timing = deflt.timing) {
  setTransition(elm, type, duration, timing)
  if (type !== 'fade') {
    elm.style.setProperty('box-sizing', 'border-box')
    elm.style.setProperty('height', elm.offsetHeight + 'px')
    elm.offsetHeight
    elm.style.setProperty('overflow', 'hidden')
  }
  resetStyle(elm, type)
  window.setTimeout(() => {
    elm.style.setProperty('display', 'none')
    removeProp(elm, type, 'removeOut')
    if (typeof callback === 'function') {
      callback()
    }
  }, duration)
}

function vShow(elm, type = deflt.type, duration = deflt.duration, callback = null, timing = deflt.timing) {
  if (type === 'fade') {
    resetStyle(elm, 'fade')
    resetDisplay(elm)
    setTransition(elm, 'fade', duration, timing)
  } else {
    resetDisplay(elm)
    var height = elm.offsetHeight
    elm.style.setProperty('overflow', 'hidden')
    resetStyle(elm, type)
    elm.offsetHeight
    elm.style.setProperty('box-sizing', 'border-box')
    setTransition(elm, type, duration, timing)
    elm.style.setProperty('height', height + 'px')
  }
  removeProp(elm, type, 'removeInFirst')
  window.setTimeout(() => {
    removeProp(elm, type, 'removeInThen')
    if (typeof callback === 'function') {
      callback()
    }
  }, duration)
}

function vToggle(elm, type = deflt.type, duration = deflt.duration, callback = null, timing = deflt.timing) {
  if (isHidden(elm)) {
    vShow(elm, type, duration, callback, timing)
  } else {
    vHide(elm, type, duration, callback, timing)
  }
}
function vTempToggle(elm, type = deflt.type, delay = deflt.delay, duration = deflt.duration, callback = null, timing = deflt.timing) {
  var methods = [vHide, vShow]
  if (isHidden(elm)) {
    methods.reverse()
  }
  var transcallback = function () {
    if (typeof callback === 'function') {
      callback()
    }
    window.setTimeout(() => {
      methods[1](elm, type, duration, callback, timing)
    }, delay)
  }

  methods[0](elm, type, duration, transcallback, timing)
}

function vToggleResolve(
  elm,
  callback = null,
  type = deflt.type,
  duration = deflt.duration,
  timing = deflt.timing,
  reverse = false
) {
  if (typeof callback !== 'function') {
    callback = function () { }
  }
  var methods = [vHide, vShow]
  if (reverse) {
    methods.reverse()
  }
  methods[0](elm, type, duration, function () {
    Promise.resolve(callback()).then(() => methods[1](elm, type, duration, null, timing))
  }, timing)
}

function vPlace(
  parent,
  child,
  prepend = false,
  type = deflt.type,
  duration = deflt.duration,
  callback = null,
  timing = deflt.timing
) {
  child.style.setProperty('display', 'none')
  var placeAction
  if (prepend) {
    placeAction = function () {
      parent.prepend(child)
    }
  } else {
    placeAction = function () {
      parent.append(child)
    }
  }

  var placeCallback = function () {
    vShow(child, type, duration, callback, timing)
  }
  changeThenAct(parent, child, placeAction, placeCallback)
}


function vReplace(oldElm, newElm, duration = deflt.duration, callback = null, timing = deflt.timing) {
  newElm.style.opacity = 0

  var parent = oldElm.parentNode
  var preh = oldElm.offsetHeight
  var placeAction = function () {
    oldElm.replaceWith(newElm)
  }
  var placeCallback = function () {
    vShowAdapt(newElm, preh, duration, callback, timing)
  }
  var transcallback = function () {
    changeThenAct(parent, newElm, placeAction, placeCallback)
  }
  vHide(oldElm, 'fade', duration, transcallback, timing)
}

function vShowAdapt(elm, prevHeight, duration = deflt.duration, callback = null, timing = deflt.timing) {
  var type = 'ease'
  if (elm.offsetHeight === prevHeight) {
    type = 'fade'
  }
  vShow(elm, type, duration, callback, timing)
}


function vSplitFlap(elm, text, speed = 20) {
  var ntext = elm.textContent.split('')
  var stext = text.split('')
  var prevLen = ntext.length
  var newLen = stext.length

  var l
  var stop
  var solve
  if (prevLen > newLen) {
    l = prevLen
    stop = 0
    solve = function () {
      if (l > newLen) {
        ntext.pop()
      } else {
        ntext[l - 1] = stext[l - 1]
      }
      l--
    }
  } else {
    l = 0
    stop = newLen
    solve = function () {
      if (l < prevLen) {
        ntext[l] = stext[l]
      } else {
        ntext.push(stext[l])
      }
      l++
    }
  }
  var repl = setInterval(function () {
    solve()
    elm.textContent = ntext.join('')
    if (l === stop) {
      clearInterval(repl)
    }
  }, speed)
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */



var translStore = {}

function updateTextElm (elm, textkey) {
  vSplitFlap(elm, getTxt(textkey), 50)
}

function triggerTranslate (lang) {
  if (setUserSelectedLang(lang)) {
    for (const [textkey, elms] of Object.entries(translStore)) {
      elms.forEach((elm) => {
        updateTextElm(elm, textkey)
      })
    }
  }
}

function registerTranslElm (elm, textkey) {
  if (!translStore[textkey]) {
    translStore[textkey] = []
  }
  translStore[textkey].push(elm)
}

;// CONCATENATED MODULE: ./src/shared/NxCommons.js








function resolveThreadTitle(state) {
  var threadTitle = '/'
  if (state && state.threadIndex !== -1 && state.srcData.threads[state.threadIndex]) {
    threadTitle = state.srcData.threads[state.threadIndex].title
    if (threadTitle) {
      return threadTitle
    }
  }
  return threadTitle
}

function toggleOnDisplay(viewlk, givenState, newState) {
  if (
    newState.dataUrl &&
    givenState.dataUrl === newState.dataUrl &&
    givenState.threadId == newState.threadId
  ) {
    viewlk.classList.add('nx-on-display')
  } else {
    viewlk.classList.remove('nx-on-display')
  }
}

function langDropDown() {
  var toggle = getElm('P')
  toggle.textContent = getLang()
  return selectDropDown(
    getAvailableLangs(),
    toggle,
    function (nlang) {
      triggerTranslate(nlang)
    },
    'nx-lang-switch'
  )
}

function appLink() {
  var link = getElm('A', 'nx-app-link nx-external-link')
  link.target = '_blank'
  link.href = appUrl
  link.title = 'Nexus'
  link.textContent = 'Nexus'
  return link
}

function appMain(serviceElms) {
  var main = getElm('MAIN')
  main.append(...serviceElms)
  return main
}

function appHeader() {
  var header = getElm('HEADER')
  header.append(appLink())
  return header
}

function appHeaderWithLang() {
  var header = appHeader()
  header.append(langDropDown())
  return header
}

function getElm(tag, classList) {
  var elm = document.createElement(tag)
  if (classList) {
    elm.className = classList
  }
  return elm
}

function instanceWrap(appHeader, serviceElms) {
  var inst = getElm('DIV', 'nx-instance')
  inst.append(appHeader, appMain(serviceElms))
  return inst
}

function serviceWrap(navElms, mainElms, footerElms = [], service = 'reader') {
  var wrap = getElm('DIV', 'nx-' + service)
  var nav = getElm('NAV')
  nav.append(...navElms)
  var bd = getElm('SECTION')
  bd.append(...mainElms)
  wrap.append(nav, bd)
  if (footerElms.length) {
    var footer = getElm('FOOTER')
    footer.append(...footerElms)
    wrap.append(footer)
  }
  return wrap
}

function blockWrap(blockName, contentElms = null, landmark = null) {
  var dv = getElm('DIV', 'nx-' + blockName + ' nx-block')
  if (landmark) {
    dv.append(landmark)
  }
  if (contentElms) {
    dv.append(...contentElms)
  }
  return dv
}

function landmarkElm(name) {
  var lndmrk = getElm('SPAN', 'nx-landmark nx-landmark-' + name.replace(' ', '-'))
  lndmrk.textContent = getTxt(name)
  registerTranslElm(lndmrk, name)
  return lndmrk
}

function errorPrgr() {
  var p = getElm('P')
  if (isCssLoaded()) {
    p.className = 'nx-error'
  } else {
    p.style.margin = '2vh auto'
    p.style.fontFamily = '"Courier New", Courier, monospace'
    p.style.fontSize = '13px'
  }

  p.textContent = '—/ — '
  return p
}

function toggleNavEnd(map) {
  if (map.position > 0) {
    map.ctrls['prev'].elm.classList.remove('nx-nav-end')
  } else {
    map.ctrls['prev'].elm.classList.add('nx-nav-end')
  }
  if (map.position < map.count - 1) {
    map.ctrls['next'].elm.classList.remove('nx-nav-end')
  } else {
    map.ctrls['next'].elm.classList.add('nx-nav-end')
  }
}

function setHistoryControls(map, triggerCallback, imgAsSymbol = false) {
  Object.keys(map.ctrls).forEach((ctrl) => {
    map.ctrls[ctrl].elm = getElm('A', 'nx-nav-ctrl nx-nav-end')
    if (imgAsSymbol) {
      map.ctrls[ctrl].elm.append(iconImage(map.ctrls[ctrl].symbol))
    } else {
      map.ctrls[ctrl].elm.textContent = map.ctrls[ctrl].symbol
    }
    map.ctrls[ctrl].elm.addEventListener('click', function () {
      if (!map.ctrls[ctrl].elm.classList.contains('nx-nav-end')) {
        if (ctrl === 'next') {
          map.position++
        } else {
          map.position--
        }
        triggerCallback(ctrl, map.position)
        toggleNavEnd(map)
      }
    })
  })
}

function selectDropDown(list, toggleElm, actionCallback = null, switchClass = null) {
  var selectedClass = 'nx-selected'
  toggleElm.classList.add('nx-select-toggle')
  var isInput = toggleElm.tagName == 'INPUT'
  var firstValue
  if (isInput) {
    toggleElm.setAttribute('autocomplete', 'off')
    firstValue = toggleElm.value
  } else {
    firstValue = toggleElm.textContent
  }

  var drp = getElm('UL', 'nx-select-list')

  var swtch = getElm('DIV', 'nx-select')
  if (switchClass) {
    swtch.classList.add(switchClass)
  }
  swtch.append(toggleElm, drp)

  toggleElm.addEventListener('click', () => {
    var styl = 'none'
    if (drp.style.display == styl) {
      styl = 'block'
    }
    drp.style.display = styl
  })

  list.forEach((itm) => {
    var li = getElm('LI')
    li.textContent = itm
    li.dataset.item = itm
    if (itm == firstValue) {
      li.classList.add(selectedClass)
    }

    drp.append(li)
    li.addEventListener('click', () => {
      var nitm = li.textContent
      var currVal
      if (isInput) {
        currVal = toggleElm.value
      } else {
        currVal = toggleElm.textContent
      }
      if (currVal != nitm) {
        if (!li.classList.contains(selectedClass)) {
          var prev = drp.querySelector('.' + selectedClass)
          if (prev) {
            prev.classList.remove(selectedClass)
          }
          li.classList.add(selectedClass)
        }
        if (isInput) {
          toggleElm.value = nitm
        } else {
          toggleElm.textContent = nitm
        }
        toggleElm.dispatchEvent(new window.Event('change'))
        if (typeof actionCallback === 'function') {
          actionCallback(nitm)
        }
      }

      drp.style.display = 'none'
    })
  })
  drp.style.display = 'none'

  return swtch
}

function setToggleOnDisplay(viewlk, state) {
  toggleOnDisplay(viewlk, state, getCurrentState())
  registerUpdateEvt(function (newState) {
    toggleOnDisplay(viewlk, state, newState)
  })
}

function baseViewLink(state, update = false) {
  var viewlk = getElm('A', 'nx-view-link')
  viewlk.append(threadTitleElm(state, update))
  return viewlk
}

function threadTitleElm(state, update = false) {
  var sp = getElm('SPAN', 'nx-thread-title')
  sp.textContent = resolveThreadTitle(state)
  if (update) {
    registerUpdateEvt(function (newState) {
      var nTitle = resolveThreadTitle(newState)
      vSplitFlap(sp, nTitle, 15)
    })
  }

  return sp
}

function lines(text) {
  var dv = getElm('DIV', 'nx-lines')
  if (text) {
    var sp = splitOnLineBreaks(text)
    var ln = []
    sp.forEach((l) => {
      var p = getElm('P')
      p.textContent = l
      ln.push(p)
    })
    dv.append(...ln)
  }
  return dv
}
function spinContainer() {
  var container = getElm('DIV', 'nx-loading')
  return container
}

function iconImage(b64, size = 20) {
  var ic = new Image(size, size)
  ic.className = 'nx-icon'
  ic.src = b64
  return ic
}

;// CONCATENATED MODULE: ./src/reader/NxIdent.js






var urlStore = {}

function authorMiniUrl(authorUrl) {
  var url = getStoredItem(authorUrl, 'session', urlStore, false)
  if (!url) {
    url = miniUrl(authorUrl)
    storeItem(authorUrl, url, 'session', urlStore, false)
  }
  return url
}

function toggleUnseen(viewlk, state) {
  if (viewlk.classList.contains('nx-on-display')) {
    viewlk.classList.remove('nx-unseen')
    viewlk.lastChild.textContent = ''
  } else if (isStateUnseen(state)) {
    viewlk.classList.add('nx-unseen')
    viewlk.lastChild.textContent = '*'
  }
}

function authorHandle(state, update = false) {
  var hnd = getElm('SPAN', 'nx-handle')
  if (state.srcData) {
    hnd.textContent = state.srcData.author.handle
  }
  if (update) {
    registerUpdateEvt(function (newState) {
      vSplitFlap(hnd, newState.srcData.author.handle, 25)
    }, true)
  }
  return hnd
}

function authorUrl(state, update = false) {
  var authorlksp = getElm('SPAN', 'nx-author-url')

  var urlBrck = []
  ;['[', ']'].forEach((bracket) => {
    var brsp = getElm('SPAN', 'nx-author-url-brackets')
    brsp.textContent = bracket
    urlBrck.push(brsp)
  })
  var urla = getElm('A', 'nx-external-link')
  urla.target = '_blank'
  var hrf = ''
  if (state.srcData) {
    hrf = state.srcData.author.url
  }
  urla.href = hrf

  if (state.srcData) {
    urla.textContent = authorMiniUrl(state.srcData.author.url)
  }

  authorlksp.append(urlBrck[0], urla, urlBrck[1])

  if (update) {
    registerUpdateEvt(function (newState) {
      urla.href = newState.srcData.author.url
      vSplitFlap(urla, authorMiniUrl(newState.srcData.author.url), 25)
    }, true)
  }
  return authorlksp
}

function setToggleUnseen(viewlk, state) {
  viewlk.append(getElm('SPAN', 'nx-new-tag'))
  toggleUnseen(viewlk, state)
  registerUpdateEvt(function () {
    toggleUnseen(viewlk, state)
  })
}

function viewLink(state, update = false) {
  var viewlk = baseViewLink(state, update)
  if (state.threadId !== '/') {
    setToggleOnDisplay(viewlk, state)
    setToggleUnseen(viewlk, state)
  }

  viewlk.addEventListener('click', () => {
    triggerUpdate(state)
  })
  return viewlk
}

function authorIndexLink(state, update = false) {
  var auth = getElm('A', 'nx-author-link')
  auth.append(authorHandle(state, update))

  var newState = getAltState(state, '/', -1)
  setToggleOnDisplay(auth, newState)

  auth.addEventListener('click', function () {
    triggerUpdate(newState, '/')
  })

  return auth
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/jack-js/src/modules/Style.js
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function nonRenderedElmHeight (elm) {
  var clone = elm.cloneNode(true)
  clone.style.visibility = 'hidden'
  document.append(clone)
  var height = clone.offsetHeight
  document.removeChild(clone)
  return height
}

function elmHasStyle (elm, property) {
  if (
    elm.getAttribute('style') &&
    elm.getAttribute('style').indexOf(property + ':') !== -1
  ) {
    return true
  }
  return false
}

// @doc: strenghts = 1,2,3
function cssExtract (strength = 2) {
  var s = {
    tags: [],
    ids: [],
    classes: [],
    combos: []
  }
  var fs = ''
  var loopcall = function (elms, prev = ' ') {
    Array.from(elms).forEach((elm) => {
      var tag = elm.tagName.toLowerCase()
      var nprev
      if (strength > 2) {
        nprev = prev + tag
      }

      if (!s.tags.includes(tag)) {
        s.tags.push(tag)
      }
      if (strength > 2 && !s.tags.includes(nprev)) {
        s.tags.push(nprev)
      }
      if (elm.id) {
        s.ids.push('#' + elm.id)
      }
      if (elm.classList.length) {
        elm.classList.forEach((classn) => {
          if (!s.classes.includes('.' + classn)) {
            s.classes.push('.' + classn)
          }
          if (strength > 1 && !s.combos.includes(tag + '.' + classn)) {
            s.combos.push(tag + '.' + classn)
          }
          if (strength > 2 && !s.combos.includes(nprev + '.' + classn)) {
            s.combos.push(nprev + '.' + classn)
          }
          if (elm.id && !s.combos.includes('#' + elm.id + '.' + classn)) {
            s.combos.push('#' + elm.id + '.' + classn)
          }
        })
      }
      if (tag !== 'html' && elm.children.length) {
        loopcall(elm.children, tag + ' ')
      }
    })
  }

  setTimeout(function () {
    loopcall([document.querySelector('html'), document.body])
    for (const [k, v] of Object.entries(s)) {
      fs += '/*' + k + '*/\r\n'
      v.forEach((itm) => {
        fs += itm + ' {\r\n}\r\n'
      })
    }
    var outputElm = document.createElement('TEXTAREA')
    outputElm.textContent = fs
    document.body.append(outputElm)
  }, 3000)
}

function autoScrollToBottom (elm) {
  elm.scrollIntoView({
    block: 'end',
    behavior: 'smooth'
  })
}
function autoScrollToTop (elm) {
  elm.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}

;// CONCATENATED MODULE: ./src/reader/NxHistory.js






const historyMax = 100
var isHistoryEvent = false
var historyList = null
var historyElm = null

var historyState = {
  dataUrl: null,
  srcData: null,
  threadId: '/',
  threadIndex: -1,
}

var histCtrls = {
  ctrls: {
    prev: { symbol: '<', elm: null },
    next: { symbol: '>', elm: null },
  },
  position: 0,
  count: 1,
}

function historyNav() {
  var wrp = getElm('DIV', 'nx-history-nav')
  setHistoryControls(histCtrls, function (ctrl, pos) {
    var target = historyList.children[pos + 1].querySelector('.nx-thread-title')
    target.click()
  })
  wrp.append(histCtrls.ctrls['prev'].elm, historyToggleElm(), histCtrls.ctrls['next'].elm)
  return wrp
}
function historyToggleElm() {
  var tggl = getElm('A', 'nx-history-toggle')
  tggl.textContent = '≚'
  tggl.addEventListener('click', () => {
    if (tggl.textContent == '≙') {
      tggl.textContent = '≚'
      tggl.classList.remove('nx-active')
      vHide(historyElm, 'ease', 200)
    } else {
      tggl.textContent = '≙'
      tggl.classList.add('nx-active')
      vShow(historyElm, 'ease', 200)
      autoScrollToBottom(historyList)
    }
  })
  return tggl
}

function setHistoryListElm(state) {
  historyList = getElm('UL', 'nx-history-list')
  var first = getElm('LI')
  first.textContent = '...'
  historyList.append(first)
  if (state && state.srcData) {
    historyState = state
    historyList.append(historyItm(state, 0))
  }
  historyElm = getElm('DIV', 'nx-history-drawer')
  historyElm.append(historyList)
  historyElm.style.display = 'none'
  registerUpdateEvt(function (newState, skipHistoryUpdate) {
    historyEvent(newState, skipHistoryUpdate)
  })
}

function historyEvent(state, skipHistoryUpdate) {
  if (
    !skipHistoryUpdate &&
    !isHistoryEvent &&
    (state.dataUrl !== historyState.dataUrl || state.threadId !== historyState.threadId)
  ) {
    historyState = state
    if (histCtrls.count > historyMax) {
      historyList.children[1].remove()
    } else {
      histCtrls.count++
    }

    histCtrls.position = histCtrls.count - 1
    var itm = historyItm(state, histCtrls.position)
    vPlace(historyList, itm, false, 'ease', 200,function () {
      autoScrollToBottom(historyList)
    })
    toggleNavEnd(histCtrls)
  }
}

function viewElms(state, pos) {
  return [authorIndexLink(state, false), authorUrl(state, false), historyViewLink(state, pos)]
}

function historyItm(state, pos) {
  var itm = document.createElement('LI')
  itm.append(...viewElms(state, pos))
  return itm
}

function historyViewLink(state, pos) {
  var viewlk = baseViewLink(state, false)
  setToggleOnDisplay(viewlk, state)

  viewlk.addEventListener('click', () => {
    isHistoryEvent = true
    triggerUpdate(state, true)
    histCtrls.position = pos
    isHistoryEvent = false
  })
  return viewlk
}

function historyBlock(state) {
  setHistoryListElm(state)
  return blockWrap('history', [historyNav(), historyElm], false)
}

;// CONCATENATED MODULE: ./src/reader/NxIndex.js





var indexList = null

function aboutElm(state) {
  var ab = getElm('DIV', 'nx-about-author')

  ab.append(aboutLines(state))
  registerUpdateEvt(function (newState) {
    vReplace(ab.firstChild, aboutLines(newState), 200)
  }, true)
  return ab
}

function aboutLines(state) {
  var text = null
  if (state.srcData && state.srcData.author.about) {
    text = state.srcData.author.about
  }
  return lines(text)
}

function setIndexList(state) {
  indexList = getElm('UL')
  if (state.srcData) {
    var items = state.srcData.index

    if (items.length) {
      for (var i = 0; i < items.length; i++) {
        indexList.append(indexLi(state, items[i], i))
      }
    }
  }
  registerUpdateEvt(function (newState) {
    changeThreadsList(newState)
  }, true)
}

function indexLi(state, id, index) {
  var altState = getAltState(state, id, index)

  var li = getElm('LI')
  li.append(viewLink(altState, false))
  return li
}

function changeThreadsList(state) {
  var childr = indexList.childNodes
  var items = state.srcData.index
  var nwlen = items.length

  var chlen = childr.length

  var count = 0
  if (chlen) {
    var rmv = function (child) {
      vHide(child, 'ease', 200, function () {
        child.remove()
      })
    }
    for (var x = 0; x < chlen; x++) {
      if (nwlen > x) {
        var nlink = indexLi(state, items[x], x)
        vReplace(childr[x], nlink, 200)
        count++
      } else {
        rmv(childr[x])
      }
    }
  }
  if (count < nwlen) {
    for (var y = count; y < nwlen; y++) {
      vPlace(indexList, indexLi(state, items[y], y), false, 'ease', 200)
    }
  }
}

function indexHeader(state) {
  var header = getElm('DIV', 'nx-index-header')
  header.append(authorHandle(state, true), authorUrl(state, true), aboutElm(state))
  return header
}

function indexBlock(state) {
  setIndexList(state)
  return blockWrap('threads-list', [indexList])
}

function mainIndexBlock(state) {
  var mainBlock = getElm('DIV', 'nx-main-block nx-index')
  var blocks = [indexHeader(state), indexBlock(state)]
  mainBlock.append(...blocks)
  return mainBlock
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSnippet.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */


function getSnippet (src, style = null, scriptSrc = null, lang = null) {
  // @doc does NOT validate arguments;
  var datalang = ''
  if (lang) {
    datalang = ' data-lang="' + lang + '"'
  }
  var datastyle = ''
  if (style) {
    datastyle = ' data-style="' + style + '"'
  }
  if (!scriptSrc) {
    scriptSrc = defaultIO
  }
  return `<div id="Nexus" data-src="${src}"${datastyle}${datalang}></div>
<script src="${scriptSrc}"></script>`
}

;// CONCATENATED MODULE: ./src/shared/NxCdn.js
const appIO = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/js/NxIO.js'
const appDefaultCss =
  'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NxIO.min.css'
const legacyDefaultCss = [
  'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NexusI.min.css'
]

;// CONCATENATED MODULE: ./src/shared/NxIcons.js
const copyB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA0IDQgTCA0IDI0IEwgMTEgMjQgTCAxMSAyMiBMIDYgMjIgTCA2IDYgTCAxOCA2IEwgMTggNyBMIDIwIDcgTCAyMCA0IFogTSAxMiA4IEwgMTIgMjggTCAyOCAyOCBMIDI4IDggWiBNIDE0IDEwIEwgMjYgMTAgTCAyNiAyNiBMIDE0IDI2IFoiLz48L3N2Zz4=`
const downloadB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA0IEwgMTUgMjAuNTYyNSBMIDkuNzE4NzUgMTUuMjgxMjUgTCA4LjI4MTI1IDE2LjcxODc1IEwgMTUuMjgxMjUgMjMuNzE4NzUgTCAxNiAyNC40MDYyNSBMIDE2LjcxODc1IDIzLjcxODc1IEwgMjMuNzE4NzUgMTYuNzE4NzUgTCAyMi4yODEyNSAxNS4yODEyNSBMIDE3IDIwLjU2MjUgTCAxNyA0IFogTSA3IDI2IEwgNyAyOCBMIDI1IDI4IEwgMjUgMjYgWiIvPjwvc3ZnPg==`
const saveB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA1IDUgTCA1IDI3IEwgMjcgMjcgTCAyNyA5LjU5Mzc1IEwgMjYuNzE4NzUgOS4yODEyNSBMIDIyLjcxODc1IDUuMjgxMjUgTCAyMi40MDYyNSA1IFogTSA3IDcgTCAxMCA3IEwgMTAgMTMgTCAyMiAxMyBMIDIyIDcuNDM3NSBMIDI1IDEwLjQzNzUgTCAyNSAyNSBMIDIzIDI1IEwgMjMgMTYgTCA5IDE2IEwgOSAyNSBMIDcgMjUgWiBNIDEyIDcgTCAxNiA3IEwgMTYgOSBMIDE4IDkgTCAxOCA3IEwgMjAgNyBMIDIwIDExIEwgMTIgMTEgWiBNIDExIDE4IEwgMjEgMTggTCAyMSAyNSBMIDExIDI1IFoiLz48L3N2Zz4=`
const newB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA2IDMgTCA2IDI5IEwgMjYgMjkgTCAyNiA5LjU5Mzc1IEwgMjUuNzE4NzUgOS4yODEyNSBMIDE5LjcxODc1IDMuMjgxMjUgTCAxOS40MDYyNSAzIFogTSA4IDUgTCAxOCA1IEwgMTggMTEgTCAyNCAxMSBMIDI0IDI3IEwgOCAyNyBaIE0gMjAgNi40Mzc1IEwgMjIuNTYyNSA5IEwgMjAgOSBaIi8+PC9zdmc+`
const openB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA1IDMgTCA1IDI3LjgxMjUgTCA1Ljc4MTI1IDI3Ljk2ODc1IEwgMTcuNzgxMjUgMzAuNDY4NzUgTCAxOSAzMC43MTg3NSBMIDE5IDI4IEwgMjUgMjggTCAyNSAxNS40Mzc1IEwgMjYuNzE4NzUgMTMuNzE4NzUgTCAyNyAxMy40MDYyNSBMIDI3IDMgWiBNIDE0LjEyNSA1IEwgMjUgNSBMIDI1IDEyLjU2MjUgTCAyMy4yODEyNSAxNC4yODEyNSBMIDIzIDE0LjU5Mzc1IEwgMjMgMjYgTCAxOSAyNiBMIDE5IDE3LjA5Mzc1IEwgMTguNzE4NzUgMTYuNzgxMjUgTCAxNyAxNS4wNjI1IEwgMTcgNS43MTg3NSBaIE0gNyA1LjI4MTI1IEwgMTUgNy4yODEyNSBMIDE1IDE1LjkwNjI1IEwgMTUuMjgxMjUgMTYuMjE4NzUgTCAxNyAxNy45Mzc1IEwgMTcgMjguMjgxMjUgTCA3IDI2LjE4NzUgWiIvPjwvc3ZnPg==`
const resetB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiAzIEMgMTIgMyA4LjQgNC43OTkyMTg3IDYgNy42OTkyMTg4IEwgNiA0IEwgNCA0IEwgNCAxMiBMIDEyIDEyIEwgMTIgMTAgTCA2LjgwMDc4MTIgMTAgQyA4LjgwMDc4MTIgNyAxMi4xIDUgMTYgNSBDIDIyLjEgNSAyNyA5LjkgMjcgMTYgQyAyNyAyMi4xIDIyLjEgMjcgMTYgMjcgQyA5LjkgMjcgNSAyMi4xIDUgMTYgTCAzIDE2IEMgMyAyMy4yIDguOCAyOSAxNiAyOSBDIDIzLjIgMjkgMjkgMjMuMiAyOSAxNiBDIDI5IDguOCAyMy4yIDMgMTYgMyB6Ii8+PC9zdmc+`
const previewB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA4IEMgNy42NjQwNjMgOCAxLjI1IDE1LjM0Mzc1IDEuMjUgMTUuMzQzNzUgTCAwLjY1NjI1IDE2IEwgMS4yNSAxNi42NTYyNSBDIDEuMjUgMTYuNjU2MjUgNy4wOTc2NTYgMjMuMzI0MjE5IDE0Ljg3NSAyMy45Mzc1IEMgMTUuMjQ2MDk0IDIzLjk4NDM3NSAxNS42MTcxODggMjQgMTYgMjQgQyAxNi4zODI4MTMgMjQgMTYuNzUzOTA2IDIzLjk4NDM3NSAxNy4xMjUgMjMuOTM3NSBDIDI0LjkwMjM0NCAyMy4zMjQyMTkgMzAuNzUgMTYuNjU2MjUgMzAuNzUgMTYuNjU2MjUgTCAzMS4zNDM3NSAxNiBMIDMwLjc1IDE1LjM0Mzc1IEMgMzAuNzUgMTUuMzQzNzUgMjQuMzM1OTM4IDggMTYgOCBaIE0gMTYgMTAgQyAxOC4yMDMxMjUgMTAgMjAuMjM0Mzc1IDEwLjYwMTU2MyAyMiAxMS40MDYyNSBDIDIyLjYzNjcxOSAxMi40NjA5MzggMjMgMTMuNjc1NzgxIDIzIDE1IEMgMjMgMTguNjEzMjgxIDIwLjI4OTA2MyAyMS41ODIwMzEgMTYuNzgxMjUgMjEuOTY4NzUgQyAxNi43NjE3MTkgMjEuOTcyNjU2IDE2LjczODI4MSAyMS45NjQ4NDQgMTYuNzE4NzUgMjEuOTY4NzUgQyAxNi40ODA0NjkgMjEuOTgwNDY5IDE2LjI0MjE4OCAyMiAxNiAyMiBDIDE1LjczNDM3NSAyMiAxNS40NzY1NjMgMjEuOTg0Mzc1IDE1LjIxODc1IDIxLjk2ODc1IEMgMTEuNzEwOTM4IDIxLjU4MjAzMSA5IDE4LjYxMzI4MSA5IDE1IEMgOSAxMy42OTUzMTMgOS4zNTE1NjMgMTIuNDgwNDY5IDkuOTY4NzUgMTEuNDM3NSBMIDkuOTM3NSAxMS40Mzc1IEMgMTEuNzE4NzUgMTAuNjE3MTg4IDEzLjc3MzQzOCAxMCAxNiAxMCBaIE0gMTYgMTIgQyAxNC4zNDM3NSAxMiAxMyAxMy4zNDM3NSAxMyAxNSBDIDEzIDE2LjY1NjI1IDE0LjM0Mzc1IDE4IDE2IDE4IEMgMTcuNjU2MjUgMTggMTkgMTYuNjU2MjUgMTkgMTUgQyAxOSAxMy4zNDM3NSAxNy42NTYyNSAxMiAxNiAxMiBaIE0gNy4yNSAxMi45Mzc1IEMgNy4wOTM3NSAxMy42MDkzNzUgNyAxNC4yODUxNTYgNyAxNSBDIDcgMTYuNzUzOTA2IDcuNSAxOC4zOTQ1MzEgOC4zNzUgMTkuNzgxMjUgQyA1Ljg1NTQ2OSAxOC4zMjQyMTkgNC4xMDU0NjkgMTYuNTg1OTM4IDMuNTMxMjUgMTYgQyA0LjAxMTcxOSAxNS41MDc4MTMgNS4zNTE1NjMgMTQuMjAzMTI1IDcuMjUgMTIuOTM3NSBaIE0gMjQuNzUgMTIuOTM3NSBDIDI2LjY0ODQzOCAxNC4yMDMxMjUgMjcuOTg4MjgxIDE1LjUwNzgxMyAyOC40Njg3NSAxNiBDIDI3Ljg5NDUzMSAxNi41ODU5MzggMjYuMTQ0NTMxIDE4LjMyNDIxOSAyMy42MjUgMTkuNzgxMjUgQyAyNC41IDE4LjM5NDUzMSAyNSAxNi43NTM5MDYgMjUgMTUgQyAyNSAxNC4yODUxNTYgMjQuOTA2MjUgMTMuNjAxNTYzIDI0Ljc1IDEyLjkzNzUgWiIvPjwvc3ZnPg==`
const undoB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxMi43ODEyNSA1LjI4MTI1IEwgNC43ODEyNSAxMy4yODEyNSBMIDQuMDkzNzUgMTQgTCA0Ljc4MTI1IDE0LjcxODc1IEwgMTIuNzgxMjUgMjIuNzE4NzUgTCAxNC4yMTg3NSAyMS4yODEyNSBMIDcuOTM3NSAxNSBMIDIxIDE1IEMgMjMuNzUzOTA2IDE1IDI2IDE3LjI0NjA5NCAyNiAyMCBMIDI2IDI3IEwgMjggMjcgTCAyOCAyMCBDIDI4IDE2LjE1NjI1IDI0Ljg0Mzc1IDEzIDIxIDEzIEwgNy45Mzc1IDEzIEwgMTQuMjE4NzUgNi43MTg3NSBaIi8+PC9zdmc+`
const redoB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxOS4yMTg3NSA1LjI4MTI1IEwgMTcuNzgxMjUgNi43MTg3NSBMIDI0LjA2MjUgMTMgTCAxMSAxMyBDIDcuMTU2MjUgMTMgNCAxNi4xNTYyNSA0IDIwIEwgNCAyNyBMIDYgMjcgTCA2IDIwIEMgNiAxNy4yNDYwOTQgOC4yNDYwOTQgMTUgMTEgMTUgTCAyNC4wNjI1IDE1IEwgMTcuNzgxMjUgMjEuMjgxMjUgTCAxOS4yMTg3NSAyMi43MTg3NSBMIDI3LjIxODc1IDE0LjcxODc1IEwgMjcuOTA2MjUgMTQgTCAyNy4yMTg3NSAxMy4yODEyNSBaIi8+PC9zdmc+`
const editB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAyMy45MDYyNSAzLjk2ODc1IEMgMjIuODU5Mzc1IDMuOTY4NzUgMjEuODEyNSA0LjM3NSAyMSA1LjE4NzUgTCA1LjE4NzUgMjEgTCA1LjEyNSAyMS4zMTI1IEwgNC4wMzEyNSAyNi44MTI1IEwgMy43MTg3NSAyOC4yODEyNSBMIDUuMTg3NSAyNy45Njg3NSBMIDEwLjY4NzUgMjYuODc1IEwgMTEgMjYuODEyNSBMIDI2LjgxMjUgMTEgQyAyOC40Mzc1IDkuMzc1IDI4LjQzNzUgNi44MTI1IDI2LjgxMjUgNS4xODc1IEMgMjYgNC4zNzUgMjQuOTUzMTI1IDMuOTY4NzUgMjMuOTA2MjUgMy45Njg3NSBaIE0gMjMuOTA2MjUgNS44NzUgQyAyNC40MTAxNTYgNS44NzUgMjQuOTE3OTY5IDYuMTA1NDY5IDI1LjQwNjI1IDYuNTkzNzUgQyAyNi4zNzg5MDYgNy41NjY0MDYgMjYuMzc4OTA2IDguNjIxMDk0IDI1LjQwNjI1IDkuNTkzNzUgTCAyNC42ODc1IDEwLjI4MTI1IEwgMjEuNzE4NzUgNy4zMTI1IEwgMjIuNDA2MjUgNi41OTM3NSBDIDIyLjg5NDUzMSA2LjEwNTQ2OSAyMy40MDIzNDQgNS44NzUgMjMuOTA2MjUgNS44NzUgWiBNIDIwLjMxMjUgOC43MTg3NSBMIDIzLjI4MTI1IDExLjY4NzUgTCAxMS4xODc1IDIzLjc4MTI1IEMgMTAuNTMxMjUgMjIuNSA5LjUgMjEuNDY4NzUgOC4yMTg3NSAyMC44MTI1IFogTSA2LjkzNzUgMjIuNDM3NSBDIDguMTM2NzE5IDIyLjkyMTg3NSA5LjA3ODEyNSAyMy44NjMyODEgOS41NjI1IDI1LjA2MjUgTCA2LjI4MTI1IDI1LjcxODc1IFoiLz48L3N2Zz4=`
const invalidB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA3LjIxODc1IDUuNzgxMjUgTCA1Ljc4MTI1IDcuMjE4NzUgTCAxNC41NjI1IDE2IEwgNS43ODEyNSAyNC43ODEyNSBMIDcuMjE4NzUgMjYuMjE4NzUgTCAxNiAxNy40Mzc1IEwgMjQuNzgxMjUgMjYuMjE4NzUgTCAyNi4yMTg3NSAyNC43ODEyNSBMIDE3LjQzNzUgMTYgTCAyNi4yMTg3NSA3LjIxODc1IEwgMjQuNzgxMjUgNS43ODEyNSBMIDE2IDE0LjU2MjUgWiIvPjwvc3ZnPg==`
const validB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAyOC4yODEyNSA2LjI4MTI1IEwgMTEgMjMuNTYyNSBMIDMuNzE4NzUgMTYuMjgxMjUgTCAyLjI4MTI1IDE3LjcxODc1IEwgMTAuMjgxMjUgMjUuNzE4NzUgTCAxMSAyNi40MDYyNSBMIDExLjcxODc1IDI1LjcxODc1IEwgMjkuNzE4NzUgNy43MTg3NSBaIi8+PC9zdmc+`
const upB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA0LjA5Mzc1IEwgMTUuMjgxMjUgNC43ODEyNSBMIDYuNzgxMjUgMTMuMjgxMjUgTCA4LjIxODc1IDE0LjcxODc1IEwgMTUgNy45Mzc1IEwgMTUgMjggTCAxNyAyOCBMIDE3IDcuOTM3NSBMIDIzLjc4MTI1IDE0LjcxODc1IEwgMjUuMjE4NzUgMTMuMjgxMjUgTCAxNi43MTg3NSA0Ljc4MTI1IFoiLz48L3N2Zz4=`
const downB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA0IEwgMTUgMjQuMDYyNSBMIDguMjE4NzUgMTcuMjgxMjUgTCA2Ljc4MTI1IDE4LjcxODc1IEwgMTUuMjgxMjUgMjcuMjE4NzUgTCAxNiAyNy45MDYyNSBMIDE2LjcxODc1IDI3LjIxODc1IEwgMjUuMjE4NzUgMTguNzE4NzUgTCAyMy43ODEyNSAxNy4yODEyNSBMIDE3IDI0LjA2MjUgTCAxNyA0IFoiLz48L3N2Zz4=`

;// CONCATENATED MODULE: ./src/reader/NxSource.js










var drawerElm = null
var editMode = false
var currentStyle = null

function actionLink(action, text) {
  var lk = getElm('A', 'nx-source-' + action)
  lk.textContent = text
  return lk
}

function resolveSrc(state) {
  var src
  if (editMode) {
    src = '#editing'
  } else {
    src = concatSrc(state)
  }
  return src
}

function linkContent(state) {
  if (state.dataUrl) {
    return resolveSrc(state)
  }
  return ''
}

function toolTip(className, text) {
  var tooltip = getElm('SPAN', className)
  tooltip.textContent = text
  tooltip.style.opacity = 0
  tooltip.hidden = true
  registerTranslElm(tooltip, text)
  return tooltip
}

function toggleLink() {
  var text = '</>'
  var altText = '< />'
  var lk = actionLink('snippets', text)

  lk.addEventListener('click', () => {
    if (lk.textContent == altText) {
      lk.textContent = text
      lk.classList.remove('nx-active')
      vHide(drawerElm, 'ease', 200)
    } else {
      lk.textContent = altText
      lk.classList.add('nx-active')
      vShow(drawerElm, 'ease', 100, function () {
        drawerElm.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
          inline: 'nearest',
        })
      })
    }
  })
  return lk
}

function linkSource(state) {
  return codeElm('json', textAreaElm(state, linkContent))
}

function snippetsBundle(state) {
  drawerElm = getElm('DIV', 'nx-source-drawer')
  drawerElm.append(linkSource(state), embedSnippet(state))
  drawerElm.style.display = 'none'

  var tgg = getElm('DIV', 'nx-source-toggle')
  var snippetLink = toggleLink()
  tgg.append(snippetLink)

  return [tgg, drawerElm]
}

function textAreaElm(state, callback) {
  var snpInp = getElm('TEXTAREA')
  snpInp.spellcheck = false
  snpInp.textContent = callback(state)

  registerUpdateEvt(function (newState) {
    snpInp.textContent = callback(newState)
  })
  return snpInp
}

function copyLink(snpElm) {
  var copyLk = getElm('A', 'nx-source-link')
  var copyIc = iconImage(copyB64, 16)

  copyLk.append(copyIc)
  var copyTooltip = toolTip('nx-source-copy-tooltip', 'c/c')
  copyLk.append(copyTooltip)

  copyLk.addEventListener('click', () =>
    copyToClipboard(snpElm.textContent, () => {
      vTempToggle(copyTooltip, 'fade', 1000, 200)
    })
  )
  return copyLk
}

function codeElm(name, elm) {
  var snp = getElm('DIV', 'nx-' + name + '-snippet')
  snp.append(elm, copyLink(elm))
  return snp
}

function embedSnippet(state) {
  return codeElm('embed', textAreaElm(state, embedContent))
}

function embedContent(state) {
  if (editMode) {
    return '#editing'
  }
  if (state.dataUrl) {
    return getSnippet(resolveSrc(state), currentStyle, appIO, getLang())
  }
  return ''
}

function sourceBlock(state, currentStyleUrl = null, editionSource = false) {
  if (editionSource) {
    editMode = true
  }
  if (!currentStyleUrl) {
    currentStyleUrl = appDefaultCss
  } else if (currentStyleUrl !== appDefaultCss) {
    currentStyle = currentStyleUrl
  }
  return blockWrap('source', snippetsBundle(state), false)
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxMedia.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */







const mediaReadyEvent = new Event('mediaReady')

function dispatchMediaReady (resolvedElm, parentElm) {
  waitForElmInDOM(resolvedElm.tagName, parentElm).then(() => {
    parentElm.dispatchEvent(mediaReadyEvent)
  })
}

function placeMedia (url, parentElm, mediaElm) {
  if (mediaElm.tagName !== 'A') {
    var loadEvent = 'load'
    var srcElm = mediaElm
    if (['VIDEO', 'AUDIO'].includes(mediaElm.tagName)) {
      loadEvent = 'loadedmetadata'
      if (mediaElm.tagName === 'VIDEO ') {
        srcElm = mediaElm.firstChild
      }
    }
    mediaElm.addEventListener(loadEvent, function () {
      dispatchMediaReady(mediaElm, parentElm)
    })
    srcElm.addEventListener('error', function () {
      logErr('Unable to load requested media', url)
      var fallback = pageElm(url)
      mediaElm.replaceWith(fallback)
      dispatchMediaReady(fallback, parentElm)
    })
    srcElm.src = url
  } else {
    if(!mediaElm.textContent){
      mediaElm.textContent = conciseUrl(url, true)
    }
    dispatchMediaReady(mediaElm, parentElm)
    mediaElm.href = url
  }
  parentElm.append(mediaElm)
}

function setMediaUrl (srcElm, attrb = 'src', url = null) {
  if (url) {
    srcElm.setAttribute(attrb, url)
  }
}

function pageElm (url = null) {
  var mediaElm = document.createElement('A')
  mediaElm.target = '_blank'
  if(url){
    mediaElm.textContent = conciseUrl(url, true)
    mediaElm.setAttribute('href', url)
  }
  return mediaElm
}

function videoElm (url = null) {
  var mediaElm = document.createElement('VIDEO')
  mediaElm.setAttribute('controls', true)
  var srcElm = document.createElement('SOURCE')
  mediaElm.append(srcElm)
  setMediaUrl(srcElm, 'src', url)
  return mediaElm
}

function audioElm (url = null) {
  var mediaElm = document.createElement('AUDIO')
  mediaElm.setAttribute('controls', true)
  setMediaUrl(mediaElm, 'src', url)
  return mediaElm
}

function imgElm (url = null) {
  var mediaElm = document.createElement('IMG')
  setMediaUrl(mediaElm, 'src', url)
  return mediaElm
}

function iframeElm (url = null) {
  var mediaElm = document.createElement('IFRAME')
  mediaElm.scrolling = 'no'
  mediaElm.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  mediaElm.allowfullscreen = true
  setMediaUrl(mediaElm, 'src', url)
  return mediaElm
}

function mediaElm (type, url = null) {
  if (supportedOembedMedia.includes(type)) {
    type = 'iframe'
  }
  var f
  switch (type) {
    case 'image':
      f = imgElm
      break
    case 'video':
      f = videoElm
      break
    case 'audio':
      f = audioElm
      break
    case 'iframe':
      f = iframeElm
      break
    default:
      f = pageElm
  }
  return f(url)
}

function resolveEmbedMediaData (url, type) {
  var iframeUrl = getStoredOembedResponse(url)
  var success = function () {
    return { type: type, url: iframeUrl }
  }
  var fallback = function () {
    return { type: 'page', url: url }
  }
  if (iframeUrl) {
    return Promise.resolve(success())
  }
  var link = oembedLink(url, type, 720)
  if (!link) {
    return Promise.resolve(fallback())
  }
  return oembedResponse(link).then(response => {
    iframeUrl = response.html.split('src="')[1].split('"')[0]
    registerOembedResponse(url, iframeUrl)
    return success()
  }).catch((err) => {
    logErr('Failed to resolved oembed media', { url: url, err: err.message })
    return fallback()
  })
}

function resolveEmbedMedia (url, type, parentElm) {
  resolveEmbedMediaData(url, type).then(result => {
    placeMedia(result.url, parentElm, mediaElm(result.type))
  })
}

function resolveMedia (url, type, parentElm) {
  if (supportedOembedMedia.includes(type)) {
    resolveEmbedMedia(url, type, parentElm)
  } else {
    placeMedia(url, parentElm, mediaElm(type))
  }
}

function preResolveViewMedia (view) {
  if(view.data.content.media.type === 'page'){
    view.resolved.media = true
    return Promise.resolve(view)
  }
  var host = document.createElement('DIV')
  host.style.display = 'none'
  document.body.append(host)
  var handleResult = function () {
    if (host.firstChild.tagName === 'A' && view.data.content.media.type !== 'page') {
      view.data.content.media.type = 'page'
    } else if (host.firstChild.tagName === 'IFRAME') {
      view.data.content.media.url = host.firstChild.src
    }
    host.remove()
    view.resolved.media = true
    return view
  }
  var promise = new Promise(function (resolve) {
    host.addEventListener('mediaReady', resolve)
  }).then(handleResult)
  resolveMedia(view.data.content.media.url, view.data.content.media.type, host)
  return promise
}

;// CONCATENATED MODULE: ./src/reader/NxMedia.js




function threadMediaElm(threadData, countReady) {
  var mediaContainer = getElm('DIV', 'nx-media')

  var mediaWrap = getElm('DIV')
  mediaContainer.append(mediaWrap)

  var captionElm = null
  if (threadData.content.media.caption) {
    captionElm = threadTextElm(threadData, ['content', 'media', 'caption'])
    mediaContainer.append(captionElm)
  }

  mediaWrap.addEventListener('mediaReady', function () {
    if (mediaWrap.firstChild.tagName === 'A' && threadData.content.media.type !== 'page') {
      threadData.content.media.type = 'page'
    }
    mediaWrap.className = 'nx-' + threadData.content.media.type + '-media'
    if (countReady !== null) {
      countReady()
    }
  })
  resolveMedia(threadData.content.media.url, threadData.content.media.type, mediaWrap)
  return mediaContainer
}

function NxMedia_mediaElm(threadData, countReady = null) {
  var mediadiv = getElm('DIV', 'nx-content-media')
  mediadiv.append(threadMediaElm(threadData, countReady))
  return mediadiv
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSpin.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
class Spinner {
  constructor(spinContainer, spinStates = [], speed = 100) {
    this.spinContainer = spinContainer
    if(!spinStates.length){
        spinStates = ["", "/", "–", "\\", "|"]
    } else if(spinStates[0] !== ''){
        spinStates.unshift('')
    }
    this.spinStates = spinStates
    this.speed = speed
    this.spinPosition = -1
  }

  endSpin() {
    this.spinPosition = -1
  }
  
  startSpin() {
    this.spinPosition = 0
    var f = window.setInterval(function(){
        if (this.spinPosition === -1) {
            this.spinContainer.textContent = ''
            clearInterval(f)
          } else {
            this.spinContainer.textContent = this.spinStates[this.spinPosition]
            if (this.spinPosition === (this.spinStates.length - 1)) {
              this.spinPosition = 1
            } else {
              this.spinPosition++
            }
          }
    }.bind(this), this.speed)
  }
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxViews.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */




function threadView (thread, url) {
  return {
    src: url + '#' + thread.id,
    data: thread,
    nested: [],
    resolved: { nested: false, media: false }
  }
}

function authorView (nxdata, url) {
  return {
    src: url,
    data: nxdata.author
  }
}

function selectedThreadsViews (nxdata, url, ids) {
  var viewstore = {
    views: { threads: [] },
    list: [],
    failed: ids,
    confirmed: []
  }
  nxdata.threads.forEach((thread) => {
    var idx = ids.indexOf(thread.id) 
    if (idx !== -1) {
      var view = threadView(thread, url)
      viewstore.views.threads.push(view)
      viewstore.list.push(view.src)
      viewstore.confirmed.push(thread.id)
      viewstore.failed.splice(idx,1)
    }
  })
  return viewstore
}

function allThreadsViews (nxdata, url) {
  var viewstore = {
    views: { threads: [] },
    list: []
  }
  nxdata.threads.forEach(thread => {
    var view = threadView(thread, url)
    viewstore.views.threads.push(view)
    viewstore.list.push(view.src)
  })
  return viewstore
}

function addAuthorView (nxdata, url, viewstore) {
  viewstore.views.author = authorView(nxdata, url)
}

function authorAndThreadsViews (nxdata, url) {
  var viewstore = allThreadsViews(nxdata, url)
  addAuthorView(nxdata, url, viewstore)
  return viewstore
}

function authorAndselectedThreadsViews (nxdata, url, ids) {
  var viewstore = selectedThreadsViews(nxdata, url, ids)
  addAuthorView(nxdata, url, viewstore)
  return viewstore
}

function getView (viewstore, src) {
  if (src !== viewstore.views.author.src) {
    var index = viewstore.list.indexOf(src)
    if (index !== -1) {
    return viewstore.views.threads[index]
    }
  }
  return viewstore.views.author
}

function addViewToHistory (src, replace = false) {
  var url = splitCurrentUrl.url
  if(isValidHttpUrl(url)){
    var id = splitUrlAndId(src).id
    if (id) {
      url += '#' + id
    }
    if (replace) {
      window.history.replaceState({ nexus: src }, document.title, url)
    } else {
      window.history.pushState({ nexus: src }, document.title, url)
    }
  }
}

function listenToHistoryChange (callback) {
  window.onpopstate = function (event) {
    if (event.state && event.state.nexus) {
      callback(event.state.nexus)
    }
  }
}

function processFirstView (request, viewstore, forceId = null) {
  if (request.id) {
    var ids = [forceId, request.id]
    for (var i = 0; i < 2; i++) {
      var index = viewstore.list.indexOf(request.url + '#' + ids[i])
      if (index !== -1) {
        return viewstore.views.threads[index]
      }
    }
  }
  return viewstore.views.author
}

function extendInitData (seed, forceId = null) {
    seed.viewstore = authorAndThreadsViews(seed.nxdata, seed.request.url)
    seed.firstview = processFirstView(seed.request, seed.viewstore, forceId)
    addViewToHistory(seed.firstview.src, true)
    return seed
}

;// CONCATENATED MODULE: ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxNest.js
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */







function buildLinkedInstances (thread, exclude = []) {
  // @doc instances = {url:[...ids] }
  var instances = {}

  for(var i=0; i < thread.linked.length; i++){
    if (!exclude.includes(thread.linked[i])) {
      var split = splitUrlAndId(thread.linked[i])
      if (!exclude.includes(split.url)) {
        if(!Object.prototype.hasOwnProperty.call(instances, split.url)){
          instances[split.url] = []
        } 
        if(split.id){
          instances[split.url].push(split.id)
        }
      }
    }
  }
  return instances
}


function getLinkedInstances (src, thread, exclude = [], noCache = false) {
  var store = { instances: null, register: false }
  if(!noCache){
    store.instances = getStoredLinkedMaps(src)
  }
  if (store.instances === null) {
    store.instances = buildLinkedInstances(thread, exclude)
    store.register = true
  }
  return store
}


function resolveLinkedViews (view, exclude = [], noCache = false) {
  var store = getLinkedInstances(view.src, view.data, exclude, noCache)
  var register = store.register
  var confirmedInstances = {}
  const promises = []
  for(let [url, ids] of Object.entries(store.instances)){
    var promise = getSrcData(url).then(nxdata => {
      var viewstore = authorAndselectedThreadsViews(nxdata, url, ids)
      if (!register && viewstore.failed.length) {
        register = true
        logErr('Linked threads could not be resolved', viewstore.failed.join(', '))
      }
      view.nested.push({views : viewstore.views, list: viewstore.list})
      confirmedInstances[url] = viewstore.confirmed
    }).catch(() => {
      if (!register){
        register = true
      }
      logErr('Linked source could not be resolved', url)
    })
    promises.push(promise)
  }

  return Promise.all(promises).then(() => { 
    if (!noCache && register) {
      registerLinkedMaps(view.src, confirmedInstances)
    }
    view.resolved.nested = true
    return view
  })
}

;// CONCATENATED MODULE: ./src/reader/NxThread.js










var threadBlocks

var currentElm
var descrpElm
var contentElm
var distantNav

var slider
var linked = []

var spinElm
var spinner
var ready = 0

var linkedCtrls = {
  ctrls: {
    prev: { symbol: '⊼', elm: null },
    next: { symbol: '⊻', elm: null },
  },
  position: 0,
  count: 0,
}

var distantLandmark

function setDistantLandmark() {
  distantLandmark = landmarkElm('distant')
  distantLandmark.style.display = 'none'
}

function setSpinner() {
  spinElm = spinContainer()
  spinner = new Spinner(spinElm)
}

function countReady() {
  ready++
  if (ready === 2) {
    spinner.endSpin()
    spinElm.style.display = 'none'
    if (linked.length) {
      linkedCtrls.count = linked.length
      toggleNavEnd(linkedCtrls)
      setFirstDistantContent(linked.length > 1)
    }
    vShow(threadBlocks, 'ease', 200)
  }
}

function updateThreadBlocks(state) {
  var newThreadData = resolveThreadData(state)
  vHide(threadBlocks, 'ease', 200, function () {
    if (newThreadData) {
      spinner.startSpin()
      ready = 0
      spinElm.style.display = 'block'
    }

    resetDistantLinks(state.dataUrl, newThreadData)

    var newContent = threadContent(newThreadData, false)
    var newDescrpTxt = threadTextElm(newThreadData, ['description'])
    descrpElm.firstChild.replaceWith(newDescrpTxt)
    contentElm.firstChild.replaceWith(newContent)
  })
}

function descriptionElm(threadData) {
  descrpElm = getElm('DIV', 'nx-thread-description')
  descrpElm.append(threadTextElm(threadData, ['description']))
  return descrpElm
}

function resolveThreadData(state) {
  var threadData = null
  if (state && state.threadIndex > -1) {
    threadData = state.srcData.threads[state.threadIndex]
  }
  return threadData
}
function distantThreadBlock(dataUrl, threadData) {
  setDistantLandmark()
  setDistantSlider()
  resolveLinkedThreads(dataUrl, threadData)
  return blockWrap('distant', [slider], distantLandmark)
}

function localThreadBlock(threadData) {
  setContentElm(threadData)
  return blockWrap('local', [contentElm], landmarkElm('local'))
}

function setContentElm(threadData) {
  contentElm = getElm('DIV', 'nx-local-content')
  contentElm.append(threadContent(threadData, false))
}

function showDistantNav() {
  distantNav.style.visibility = 'visible'
}

function hideDistantNav() {
  distantNav.style.visibility = 'hidden'
}

function resetDistantLinks(dataUrl, threadData) {
  hideDistantNav()
  toggleDistantLandmark(false)
  removeDistantContent(false)

  linked = []
  linkedCtrls.position = 0
  linkedCtrls.count = 0
  toggleNavEnd(linkedCtrls)

  resolveLinkedThreads(dataUrl, threadData)
}

function resolveLinkedThreads(dataUrl, threadData) {
  if (threadData && threadData.linked.length) {
    setLinkedItems(dataUrl, threadData)
  } else {
    countReady()
  }
}

function removeDistantContent(transition = false) {
  var prevElm = currentElm.firstChild
  if (prevElm) {
    if (transition) {
      vHide(prevElm, 'ease', 200, function () {
        prevElm.remove()
      })
    } else {
      prevElm.remove()
    }
  }
}

function setFirstDistantContent(showNav = false) {
  toggleDistantLandmark(true)
  if (showNav) {
    showDistantNav()
  }
  currentElm.append(linked[0])
}

function setCurrentLink() {
  if (linked.length) {
    var nw = linked[linkedCtrls.position]

    if (currentElm.firstChild) {
      vReplace(currentElm.firstChild, nw, 200)
    } else {
      vPlace(currentElm, nw, false, 'ease', 200, callb)
    }
  } else {
    removeDistantContent(true)
  }
}

function distantNavElm() {
  distantNav = getElm('NAV', 'nx-distant-nav')
  distantNav.append(linkedCtrls.ctrls['prev'].elm, currentElm, linkedCtrls.ctrls['next'].elm)
  hideDistantNav()
  return distantNav
}

function setDistantSlider() {
  slider = getElm('DIV')
  currentElm = getElm('DIV', 'nx-distant-link')
  setHistoryControls(linkedCtrls, setCurrentLink)
  toggleNavEnd(linkedCtrls)
  slider.append(distantNavElm(), currentElm)
}
function linkedElm(distantState) {
  var elms = [authorIndexLink(distantState, false), authorUrl(distantState, false)]
  if (distantState.threadId !== '/') {
    elms.push(viewLink(distantState, false), threadContent(resolveThreadData(distantState), true))
  }
  var elm = getElm('DIV')
  elm.append(...elms)
  return elm
}

function toggleDistantLandmark(hasLinks) {
  var hidden = distantLandmark.style.display === 'none'
  if (hasLinks && hidden) {
    distantLandmark.style.display = 'block'
  } else if (!hasLinks && !hidden) {
    distantLandmark.style.display = 'none'
  }
}

function setLinkedItems(dataUrl, threadData) {
  var key = dataUrl + '#' + threadData.id
  var store = getLinkedInstances(key, threadData)

  var register = store.register
  var confirmedInstances = {}
  var indexes = []
  const promises = []
  for (let [url, ids] of Object.entries(store.instances)) {
    var prc = resolveState(url, '/', true)
      .then((distantState) => {
        confirmedInstances[url] = []
        if (ids.length) {
          ids.forEach((id) => {
            var threadIndex = distantState.srcData.index.indexOf(id)
            if (threadIndex !== -1) {
              confirmedInstances[url].push(id)
              var nDistantState = getAltState(distantState, id, threadIndex)
              linked.push(linkedElm(nDistantState))
            } else {
              register = true
              logErr('Linked thread could not be resolved', id)
            }
          })
        }
        if (!confirmedInstances[url].length) {
          indexes.push(linkedElm(distantState))
        }
      })
      .catch(() => {
        register = true
        logErr('Linked source could not be resolved', url)
      })
    promises.push(prc)
  }

  Promise.all(promises).then(() => {
    if (register) {
      registerLinkedMaps(key, confirmedInstances)
    }
    if (indexes.length) {
      linked = linked.concat(indexes)
    }
    countReady()
  })
}

function threadContent(threadData, isDistant = false) {
  var dv = getElm('DIV', 'nx-content')
  var callb = null
  if (!isDistant) {
    callb = countReady
  }
  var callbsent = false
  if (threadData) {
    var elms = [dateElm(threadData), contentBody(threadData)]
    if (
      threadData.content.media &&
      threadData.content.media.url &&
      threadData.content.media.url.length
    ) {
      callbsent = true
      elms.push(NxMedia_mediaElm(threadData, callb))
    }
    dv.append(...elms)
  }
  if (!callbsent && callb !== null) {
    callb()
  }
  return dv
}

function contentBody(threadData) {
  var bodydiv = getElm('DIV', 'nx-content-body')
  bodydiv.append(
    threadTextElm(threadData, ['content', 'main']),
    threadTextElm(threadData, ['content', 'aside'])
  )
  return bodydiv
}

function dateElm(threadData) {
  var datediv = getElm('DIV', 'nx-content-meta')
  var rdate = threadTextElm(threadData, ['content', 'timestamp'])
  datediv.append(rdate)
  return datediv
}

function threadFieldText(threadData, ref = []) {
  if (threadData) {
    var data = Object.assign({}, threadData)
    for (var r = 0; r < ref.length; r++) {
      data = data[ref[r]]
    }
    if (isNonEmptyStr(data)) {
      if (ref.includes('timestamp')) {
        data = new Date(data).toISOString().split('T')[0]
      } else if (['description', 'main', 'aside', 'caption'].includes(ref[ref.length - 1])) {
        data = lines(data)
      }
      return data
    }
  }
  return ''
}

function threadHeader(state, threadData) {
  var header = getElm('DIV', 'nx-thread-header')
  header.append(threadTitleElm(state, true), descriptionElm(threadData))
  return header
}

function localAndDistantBlocks(dataUrl, threadData) {
  threadBlocks = getElm('DIV', 'nx-thread-blocks')
  threadBlocks.style.display = 'none'
  threadBlocks.append(localThreadBlock(threadData), distantThreadBlock(dataUrl, threadData))

  return threadBlocks
}

function threadTextElm(threadData, ref) {
  var dv = getElm('DIV', 'nx-' + ref.join('-'))
  dv.append(threadFieldText(threadData, ref))
  return dv
}

function mainThreadBlock(state) {
  var threadData = resolveThreadData(state)

  var mainBlock = getElm('DIV', 'nx-main-block nx-thread')
  setSpinner()

  if (threadData) {
    spinner.startSpin()
  }
  var blocks = [
    threadHeader(state, threadData),
    spinElm,
    localAndDistantBlocks(state.dataUrl, threadData),
  ]

  mainBlock.append(...blocks)

  registerUpdateEvt(function (newState) {
    updateThreadBlocks(newState)
  })

  return mainBlock
}

;// CONCATENATED MODULE: ./src/reader/NxReader.js






function readerElms(seed) {
  return instanceWrap(appHeader(), [
    serviceWrap(
      [historyBlock(seed.state)],
      [mainIndexBlock(seed.state), mainThreadBlock(seed.state)],
      [sourceBlock(seed.state, seed.styleUrl, seed.editMode)],
      'reader'
    ),
  ])
}

;// CONCATENATED MODULE: ./src/editor/NxAddBtn.js



function addBtn() {
  var btn = getElm('BUTTON', 'nx-add-link')
  btn.type = 'button'
  btn.textContent = '+'
  return btn
}

function toggleAddBtn(btn, haystack, itemsKey) {
  var disabled = false
  if (itemsMinMax[itemsKey][1] <= haystack.length) {
    disabled = true
  }
  if (btn.disabled !== disabled) {
    btn.classList.toggle('nx-disabled')
    btn.disabled = disabled
  }
}

;// CONCATENATED MODULE: ./src/editor/NxEditCommons.js



const mediaGuessMap = {
  image: ['jpg', 'jpeg', 'gif', 'svg', 'png', 'webp'],
  video: ['mp4', 'webm'],
  audio: ['mp3'],
}

const autoUpdateEvt = new CustomEvent('AutoUpdate')
const stateChangeEvt = new CustomEvent('StateChange')
const threadChangeEvt = new CustomEvent('ThreadChange')
const updownEvt = new CustomEvent('IndexChange')

function toggleDisabled(elm, disabled = false) {
  var hasDisbClass = elm.classList.contains('nx-disabled')
  if (!disabled && hasDisbClass) {
    elm.classList.remove('nx-disabled')
  } else if (disabled && !hasDisbClass) {
    elm.classList.add('nx-disabled')
  }
}

function resolveMediaType(val) {
  for (var p = 0; p < supportedOembedMedia.length; p++) {
    if (val.includes(supportedOembedMedia[p])) {
      return supportedOembedMedia[p]
    }
  }
  var ext = val.split('.').pop()
  for (let [type, exts] of Object.entries(mediaGuessMap)) {
    if (exts.includes(ext)) {
      return type
    }
  }

  return 'page'
}

function convertToId(title) {
  return replaceDiacritics(title)
    .trim()
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function isUnique(haystack, needle, excludeIdx) {
  if (haystack.indexOf(needle) !== -1) {
    for (var c = 0; c < haystack.length; c++) {
      if (c !== excludeIdx && haystack[c] === needle) {
        return false
      }
    }
  }
  return true
}

function NxEditCommons_uniqueId(idsList, id, idx) {
  id = convertToId(id)
  if (!isUnique(idsList, id, idx)) {
    var sp = id.split('-')
    var last = sp.pop()
    var incr
    if (!isNaN(last)) {
      incr = parseInt(last)
      incr++
    } else {
      sp.push(last)
      incr = 1
    }
    id = sp.join('-')
    while (idsList.includes(id + '-' + incr)) {
      incr++
    }
    id += '-' + incr
  }
  return id
}

;// CONCATENATED MODULE: ./src/editor/NxEditStarters.js



function newState(data, url = 'nexus.json', id = '/', idx = -1) {
  return {
    dataUrl: url,
    srcData: data,
    threadId: id,
    threadIndex: idx,
  }
}

function newData() {
  var randomId = randomString(10)
  return {
    nexus: appUrl,
    author: {
      handle: 'Anonymous-' + randomInt(100, 999),
      about: '',
      url: 'http://',
    },
    threads: [newThread(randomId)],
    index: [randomId],
  }
}

function newThread(randomId) {
  return {
    id: randomId,
    title: randomId,
    description: '...',
    content: {
      timestamp: new Date().toISOString().substring(0, 16),
      main: '...',
      aside: '',
      media: {
        url: '',
        type: '',
        caption: '',
      },
    },
    linked: [],
  }
}

;// CONCATENATED MODULE: ./src/editor/NxEditMenu.js











class NxEditMenu {
  constructor(EditState) {
    this.EditState = EditState
    this._setMenu()
  }

  getMenuElms() {
    return this.menu
  }

  setLastAction(callback, bypass = false) {
    if (!this.resetting || bypass) {
      this.lastAction.act = callback
      this.actCtrls.count = 2
      this.actCtrls.position = 1
      toggleNavEnd(this.actCtrls)
      this.toggleSaveBtn(false)
    }
  }
  setResetting(bool) {
    this.resetting = bool
  }

  toggleSaveBtn(disabled = false) {
      toggleDisabled(this.saveBtn, disabled)
  }
  _displayFeedback(msg) {
    var txt = getTxt(msg)
    if (this.feedbackrun) {
      clearTimeout(this.feedbackrun)
    }
    vSplitFlap(this.actionFdbck, txt, 25)
    this.feedbackrun = setTimeout(
      function () {
        vSplitFlap(this.actionFdbck, '', 25)
      }.bind(this),
      1500 + txt.length * 20
    )
  }

  _resetData(data, url) {
    var prvState = this.EditState.getJsonState()
    if (data === null) {
      data = newData()
    }
    var state = newState(data, url)
    if (state.srcData.threads.length) {
      state.threadIndex = 0
      state.threadId = state.srcData.threads[0].id
    }
    var nxtState = JSON.stringify(state)
    var act = function (redo) {
      this.resetting = true
      var nstate
      if (redo) {
        nstate = nxtState
      } else {
        nstate = prvState
      }
  
      this.EditState.setNewState(nstate)
      this.menu.dispatchEvent(stateChangeEvt)
      this.filename = this.EditState.resolveFilename()
      this.resetting = false
    }.bind(this)
    act(true)
    this.setLastAction(act, true)
  }

  _setActionFeedback() {
    this.feedbackrun = null
    this.actionFdbck = getElm('SPAN', 'nx-action-feedback')
  }

  _setDownloadBtn() {
    this.filename = 'nexus.json'
    this.dlBtn = getElm('A', 'nx-download')
    this.dlBtn.append(iconImage(downloadB64, 20))
    this.dlBtn.addEventListener(
      'click',
      function () {
        var data = Object.assign({}, this.EditState.state.srcData)
        delete data.index
        var check = validData(data)
        if (!check) {
          this._displayFeedback('Invalid Nexus data')
        }
        data = JSON.stringify(data, undefined, 2)
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data)
        var anchor = getElm('A')
        anchor.setAttribute('href', dataStr)
        anchor.setAttribute('download', 'nexus.json')
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
      }.bind(this)
    )
  }

  _setNewDocumenBtn() {
    this.newBtn = getElm('A', 'nx-new')
    this.newBtn.append(iconImage(newB64, 20))
    this.newBtn.addEventListener(
      'click',
      function () {
        this._resetData(newData(), 'nexus.json')
      }.bind(this)
    )
  }

  _setOpenBtn() {
    this._setFileInput()
    this.openBtn = getElm('A', 'nx-open-file')
    this.openBtn.append(iconImage(openB64, 20))
    this.openBtn.addEventListener(
      'click',
      function () {
        this.fileInput.click()
      }.bind(this)
    )
    this.openWrap = getElm('SPAN')
    this.openWrap.append(this.fileInput, this.openBtn)
  }

  _setFileInput() {
    this.fileInput = getElm('INPUT')
    this.fileInput.type = 'file'
    this.fileInput.accept = 'application/json'
    this.fileInput.addEventListener(
      'change',
      function (evt) {
        var filename = evt.target.files[0].name
        loadSrcFile(evt, true)
          .then((fdata) => {
            fdata.index = getThreadsList(fdata)
            this._resetData(fdata, filename)
          })
          .catch((err) => {
            logErr(err.message)
            this._displayFeedback('Invalid source')
          })
        this.fileInput.value = ''
      }.bind(this)
    )
    this.fileInput.style.display = 'none'
  }

  _setSaveBtn() {
    this.saveBtn = getElm('A', 'nx-save')
    this.saveBtn.append(iconImage(saveB64, 20))
    this.toggleSaveBtn(true)
    this.saveBtn.addEventListener(
        'click',
        function () {
          if (!this.saveBtn.classList.contains('nx-disabled')) {
            registerEditData(this.EditState.cacheName, this.EditState.state.srcData)
            this._displayFeedback('saved')
            this.toggleSaveBtn(true)
            this._setResetStatus()
          }
        }.bind(this)
      )
  }

  _setResetStatus() {
    var disb = true
    if (this.EditState.originData !== JSON.stringify(this.EditState.state.srcData)) {
      disb = false
    }
    toggleDisabled(this.resetBtn, disb)
  }

  _setResetBtn() {
    this.resetBtn = getElm('A', 'nx-reset')
    this.resetBtn.append(iconImage(resetB64, 20))

    this._setResetStatus()
    this.resetBtn.addEventListener(
      'click',
      function () {
        if (!this.resetBtn.classList.contains('nx-disabled')) {
          this._resetData(JSON.parse(this.EditState.originData), this.EditState.originUrl)
          toggleDisabled(this.resetBtn, true)
        }
      }.bind(this)
    )
  }

  _setEditNav() {
    this._setActionFeedback()
    this._setResetBtn()
    this._setNewDocumenBtn()
    this._setOpenBtn()
    this._setSaveBtn()
    this._setDownloadBtn()

    this.editLinks = getElm('DIV')
    this.editLinks.append(this.resetBtn, this.newBtn, this.openWrap, this.saveBtn, this.dlBtn)
    this.editNav = getElm('DIV', 'nx-edit-nav')
    this.editNav.append(this.actionFdbck, this.editLinks)
  }

  _setEditActions() {
    this.resetting = false
    this.lastAction = { act: null }
    this.actCtrls = {
      ctrls: {
        prev: { symbol: undoB64, elm: null },
        next: { symbol: redoB64, elm: null },
      },
      position: 0,
      count: 1,
    }
    this.editActions = getElm('DIV', 'nx-edit-actions nx-history-nav')
    setHistoryControls(this.actCtrls, this._triggerUndoRedo.bind(this), true)
    this.editActions.append(this.actCtrls.ctrls['prev'].elm, this.actCtrls.ctrls['next'].elm)
  }

  _triggerUndoRedo(ctrl) {
    this.lastAction.act(ctrl === 'next')
    this.toggleSaveBtn(false)
  }

  _setMenu() {
    this._setEditNav()
    this._setEditActions()
    this.menu = getElm('DIV', 'nx-edit-menu')
    this.menu.append(this.editNav, this.editActions)
  }
}

;// CONCATENATED MODULE: ./src/editor/NxInputsFactory.js









class NxInputsFactory {
  constructor(EditState, EditMenu) {
    this.EditState = EditState
    this.EditMenu = EditMenu
  }

  inputElm(ref, callback = null, store = null) {
    var idents = this._fieldIdents(ref)
    var inp = this._resolveInput(idents, ref)

    var lb = this._baseLabel(idents.alias)
    var indc = getElm('SPAN', 'nx-edit-indication')
    var fdbck = this._invalidSp()
    lb.append(indc, fdbck)
    this._setConditions(idents, inp, indc)

    if (store) {
      store[idents.field] = inp
    }
    var wrap = this._wrapInput(idents, inp, lb)

    this._setInputEvt(ref, inp, fdbck, callback)
    this._inputEvtHandler(ref, inp, fdbck, callback)

    return wrap
  }

  _setConditions(idents, inp, indc) {
    switch (idents.field) {
      case 'url':
        indc.textContent = '[http]'
        inp.pattern = urlPattern
        break
      case 'linked':
        indc.textContent = '[http]'
        inp.pattern = urlPattern
        break
      case 'id':
        indc.textContent = '[A-Za-z0-9-][3-36]'
        inp.pattern = idPattern
        break
      case 'type':
        inp.pattern = '(' + supportedMediaTypes.join('|') + ')'
        break
      case 'timestamp':
        break
      default:
        var minmax = charMinMax[idents.field]
        indc.textContent = '[' + minmax[0] + '-' + minmax[1] + ']'
        inp.setAttribute('maxlength', minmax[1])
        inp.setAttribute('minlength', minmax[0])
    }
  }

  _wrapInput(idents, inp, lb) {
    var wrap = getElm('DIV', 'nx-edit-input nx-edit-' + idents.parent + '-' + idents.field)
    wrap.append(lb)
    if (idents.field === 'type') {
      wrap.append(this._typeDropDown(inp))
    } else {
      wrap.append(inp)
    }
    return wrap
  }

  _typeDropDown(inp) {
    var items = supportedMediaTypes
    return selectDropDown(items, inp, null, 'nx-edit-media-type-select')
  }

  _fieldIdents(ref) {
    var idents = {}
    var pos = ref.length - 1
    if (ref[pos - 1] === 'linked') {
      pos--
    }
    idents.field = ref[pos]
    pos--
    if (ref[pos - 1] === 'threads') {
      pos--
    }
    idents.parent = ref[pos]
    idents.alias = idents.field
    if (idents.field === 'linked') {
      idents.alias = 'url'
    }
    return idents
  }

  _isLongTextInput(idents) {
    return ['about', 'description', 'main', 'aside', 'caption'].includes(idents.field)
  }

  _isRequired(idents) {
    return ['handle', 'title', 'main', 'id', 'url', 'type', 'timestamp', 'linked'].includes(
      idents.field
    )
  }

  _resolveInput(idents, ref) {
    var val = this.EditState.getValue(ref)
    var inp
    if (this._isLongTextInput(idents)) {
      inp = this._textareaInput(val)
    } else if (idents.field == 'timestamp') {
      inp = this._dateInput(val)
    } else {
      inp = this._textInput(val)
    }
    inp.classList.add('nx-edit-input')

    var hook = ref.join('-')
    inp.id = hook
    inp.name = hook
    if (this._isRequired(idents)) {
      inp.required = true
    }
    return inp
  }

  _textInput(val) {
    var inp = getElm('INPUT', 'nx-edit-text')
    inp.type = 'text'
    inp.value = val
    return inp
  }

  _textareaInput(val) {
    var inp = getElm('TEXTAREA', 'nx-edit-textarea')
    inp.textContent = val
    return inp
  }
  _dateInput(val) {
    var inp = getElm('INPUT', 'nx-edit-date')
    inp.type = 'datetime-local'
    inp.value = val
    return inp
  }

  _baseLabel(field) {
    var lb = getElm('LABEL', 'nx-edit-label')
    lb.for = field
    var title = getElm('SPAN', 'nx-edit-title')
    title.textContent = getTxt(field)
    registerTranslElm(title, field)
    lb.append(title)
    return lb
  }

  _invalidSp() {
    var sp = getElm('SPAN', 'nx-edit-feedback')
    sp.append(iconImage(invalidB64))
    return sp
  }

  _inputEvtHandler(ref, inp, fdbck, callback) {
    var valid = inp.checkValidity()
    var validPromise = null

    if ((valid && ref.includes('url')) || ref.includes('linked')) {
      valid = isValidUrl(inp.value)
      if (valid && ref.includes('linked')) {
        valid = isUnique(
          this.EditState.getLinkedUrls(ref[1]),
          inp.value,
          this.EditState.getLinkedThreadIdx(ref[1], ref[3])
        )
        if (valid) {
          validPromise = getSrcData(inp.value)
            .then(() => {
              return true
            })
            .catch(() => {
              return false
            })
        }
      }
    } else if (ref.includes('id')) {
      var nId = NxEditCommons_uniqueId(
        this.EditState.getIdsList(),
        inp.value,
        this.EditState.getThreadIdx(ref[1])
      )
      if (nId !== inp.value) {
        inp.value = nId
      }
      valid = true
    }

    if (validPromise === null) {
      validPromise = Promise.resolve(valid)
    }

    validPromise.then((isValid) => {
      this.EditState.setNewValue(ref, inp.value)
      this._setFeedbackIcon(fdbck, isValid)
      
      if (typeof callback === 'function') {
        callback(inp, isValid)
      }
    })
  }

  _setFeedbackIcon(fdbck, valid) {
    var icsrc = invalidB64
    if (valid) {
      icsrc = validB64
    }
    fdbck.firstChild.src = icsrc
  }

  _setInputEvt(ref, inp, fdbck, callback) {
    var undone = ''
    var prev = inp.value
    inp.addEventListener('focus', function () {
      prev = inp.value
    })
    inp.addEventListener('AutoUpdate', function () {
      this._inputEvtHandler(ref, inp, fdbck, callback)
    }.bind(this))
    inp.addEventListener(
      'change',
      function () {
        this._inputEvtHandler(ref, inp, fdbck, callback)
          var act = function (redo) {
            if (redo) {
              inp.value = undone
            } else {
              undone = inp.value
              inp.value = prev
            }
            this._inputEvtHandler(ref, inp, fdbck, callback)
          }.bind(this)
          this.EditMenu.setLastAction(act)
      }.bind(this)
    )
  }
}

;// CONCATENATED MODULE: ./src/editor/NxLocalFormFactory.js



class NxLocalFormFactory {
  constructor(InputsFactory) {
    this.InputsFactory = InputsFactory
  }

  newThreadLocalForm(ident, indexElm) {
    var form = getElm('FORM', 'nx-thread-local-form')
    var fieldset1 = this._localFieldSet1(ident, indexElm)
    var fieldset2 = this._localFieldSet2(ident)
    var fieldset3 = this._localFieldSet3(ident)

    form.append(
      landmarkElm('local thread'),
      fieldset1,
      landmarkElm('content'),
      fieldset2,
      landmarkElm('media'),
      fieldset3
    )
    return form
  }

  _localFieldSet1(ident, indexElm) {
    var fieldset1 = getElm('FIELDSET')

    var titleCallback = function (inp) {
      var targ = indexElm.querySelector('.nx-thread-title')
      if (targ.textContent !== inp.value) {
        targ.textContent = inp.value
      }
    }
    fieldset1.append(this.InputsFactory.inputElm(['threads', ident, 'id']))
    fieldset1.append(this.InputsFactory.inputElm(['threads', ident, 'title'], titleCallback))
    fieldset1.append(this.InputsFactory.inputElm(['threads', ident, 'description']))
    return fieldset1
  }

  _localFieldSet2(ident) {
    var fieldset2 = getElm('FIELDSET')
    var fields = ['timestamp', 'main', 'aside']
    fields.forEach((field) => {
      fieldset2.append(this.InputsFactory.inputElm(['threads', ident, 'content', field]))
    })
    return fieldset2
  }

  _localFieldSet3(ident) {
    var fieldset3 = getElm('FIELDSET')

    var store = { type:null }
    var typeInp = this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'type'], null, store)
    var typeCallback = function (inp, valid) {
      if (valid) {
        var guessedType = resolveMediaType(inp.value)
        if(store.type.value !== guessedType){
          store.type.value = guessedType
          var prev = typeInp.querySelector('.nx-selected')
          if(prev){
            prev.classList.remove('nx-selected')
          }
          typeInp.querySelector('[data-item=' + guessedType + ']').classList.add('nx-selected')
          store.type.dispatchEvent(autoUpdateEvt)
        }
      }
    }.bind(this)
    fieldset3.append(
      this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'url'], typeCallback)
    )
    fieldset3.append(typeInp)
    fieldset3.append(this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'caption']))
    return fieldset3
  }
}

;// CONCATENATED MODULE: ./src/editor/NxEditInstance.js











class NxEditInstance {
  constructor(EditState) {
    this.EditState = EditState

    this._setContainers()
    this._setBtnSrc()

    this._setMenu()

    this._setFactories()
    this._setAddThreadBtn()
    this._setFormsInputs()

    this._setFormBlocks()
    this._setServiceElms()
  }

  getInstanceElms() {
    return this.instanceElms
  }

  _setBtnSrc() {
    this.btnSrc = {
      up: upB64,
      down: downB64,
    }
  }

  _setContainers() {
    this.containers = {
      author: getElm('FORM', 'nx-edit-author'),
      index: getElm('UL', 'nx-edit-index'),
      local: getElm('UL', 'nx-edit-local'),
      distant: getElm('UL', 'nx-edit-distant'),
    }
  }

  _setMenu() {
    this.EditMenu = new NxEditMenu(this.EditState)
    this.menu = this.EditMenu.getMenuElms()
    this.menu.addEventListener('StateChange', this._resetFormCallback.bind(this))
  }

  _setFactories() {
    this.InputsFactory = new NxInputsFactory(this.EditState, this.EditMenu)
    this.LocalFormFactory = new NxLocalFormFactory(this.InputsFactory)
  }

  _setAddThreadBtn() {
    this.addThreadBtn = addBtn()
    toggleAddBtn(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    this.addThreadBtn.addEventListener('click', this._addThreadHandler.bind(this))
  }

  _setServiceElms() {
    var indexMain = getElm('DIV', 'nx-main-block nx-index')
    indexMain.append(this.formBlocks.author, this.formBlocks.index)
    var threadMain = getElm('DIV', 'nx-main-block nx-thread')
    threadMain.append(this.formBlocks.local, this.formBlocks.distant)

    this.instanceElms = instanceWrap(appHeaderWithLang(), [
      serviceWrap([this.menu], [indexMain, threadMain], [], 'edit'),
    ])
  }

  _setFormBlocks() {
    this.formBlocks = {
      author: blockWrap('author', [this.containers.author], landmarkElm('author')),
      index: blockWrap(
        'threads-list',
        [this.containers.index, this.addThreadBtn],
        landmarkElm('threads')
      ),
      local: blockWrap('local', [this.containers.local], false),
      distant: blockWrap('distant', [this.containers.distant], false),
    }
  }

  _resetFormCallback() {

    Object.values(this.containers).forEach((container, i) => {
      var childr = Array.from(container.childNodes)
      var isLastp = i === 3
      var lastc = childr.length - 1
      childr.forEach((child, c) => {
        vHide(child, 'fade', 200, function(){
          child.remove()
          if (isLastp && c === lastc) {
            this._setFormsInputs()
          }
        }.bind(this))
      })
    })
  }

  _setFormsInputs() {
    this._setAuthorInputs()
    this._setThreadsInputs()
  }

  _setAuthorInputs() {
    var fields = ['handle', 'url', 'about']
    fields.forEach((field) => {
      var inpt = this.InputsFactory.inputElm(['author', field])
      inpt.style.display = 'none'
      this.containers.author.append(inpt)
      vShow(inpt, 'fade', 200)
    })
  }

  _setThreadsInputs() {
    var items = this.EditState.getIdsList()
    if (items.length) {
      var isLast = false
      for (var i = 0; i < items.length; i++) {
        if (i === items.length - 1) {
          isLast = true
        }
        this._setThread(items[i], i, isLast)
      }
    }
  }

  _setThread(id, idx, isLast = false) {
    var ident = this.EditState.newIdent(id, idx)
    var elms = this._newThreadLis(ident)
    for (let [name, elm] of Object.entries(elms)) {
      if (elm.style.display !== 'none') {
        elm.style.display = 'none'
        var type = 'ease'
          if (name === 'local') {
            type = 'fade'
          } 
        vPlace(this.containers[name], elm, false, type, 200)
      } else {
        this.containers[name].append(elm)
      }
     
      if (isLast && name === "index" && (idx - 1) !== -1) {
          this.containers.index.childNodes[idx - 1].dispatchEvent(updownEvt)
      }
    }
  }

  _newThreadLis(ident) {
    var elms = {}

    elms.distant = this._threadLi(ident)
    elms.local = this._threadLi(ident)
    elms.index = this._indexLi(ident)

    elms.distant.append(this._threadDistantForm(ident))
    elms.local.append(this.LocalFormFactory.newThreadLocalForm(ident, elms.index))

    this._setdeleteThreadElm(elms, ident)
    return elms
  }

  _addThreadHandler() {
    if (!this.addThreadBtn.disabled) {
      var randomId = randomString(10)
      var idx = this.EditState.getThreadsCount()
      this.EditState.pushThread(newThread(randomId))
      this._setThread(randomId, idx, true)
      this.EditMenu.toggleSaveBtn(false)
      toggleAddBtn(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    }
  }

  _linkInput(addLinkBtn, form, ident, i) {
    var lkident = this.EditState.registerLinkedThread(ident, i)

    var linkwrap = getElm('DIV', 'nx-edit-distant-link')
    var store = { linked: null }
    var elm = this.InputsFactory.inputElm(['threads', ident, 'linked', lkident], null, store)
    var dltBtn = this._baseDeleteLinkBtn()
    var delwrap = getElm('DIV', 'nx-distant-link-action')
    delwrap.append(dltBtn)

    dltBtn.addEventListener('click', () => {
      var act = function (redo) {
        var linked = this.EditState.getLinkedUrls(ident)
        if (redo) {
          vHide(linkwrap, 'ease', 200, function () {
            linkwrap.remove()
          })
          this.EditState.removeLinkedThread(ident, lkident)
        } else {
          var lidx = this.EditState.getLinkedThreadIdx(ident, lkident)
          var isLast = lidx === linked.length
          this.EditState.insertLinkedThread(ident, lkident, store.linked.value)
          if (isLast) {
            vPlace(form, linkwrap, false, 'ease', 200)
          } else {
            var nextSibling = form.childNodes[lidx]
            form.insertBefore(linkwrap, nextSibling)
            vShow(linkwrap, 'ease', 200)
          }
        }
        toggleAddBtn(addLinkBtn, linked, 'linked')
      }.bind(this)
      this.EditMenu.setLastAction(act)
      act(true)
    })
    linkwrap.append(elm, delwrap)
    return linkwrap
  }

  _threadDistantForm(ident) {
    var form = getElm('FORM', 'nx-thread-distant-form')
    var addLinkBtn = addBtn()
    toggleAddBtn(addLinkBtn, this.EditState.getLinkedUrls(ident), 'linked')
    addLinkBtn.addEventListener('click', () => {
      if (!addLinkBtn.disabled) {
        this.EditState.pushLinkedThread(ident, '')
        vPlace(form, this._linkInput(addLinkBtn, form, ident, this.EditState.getLinkedUrlsCount(ident) - 1),false, 'ease', 200)
        toggleAddBtn(addLinkBtn, this.EditState.getLinkedUrls(ident), 'linked')
      }
    })
    var linkedCount = this.EditState.getLinkedUrlsCount(ident)
    if (linkedCount) {
      var elms = []
      for (var i = 0; i < linkedCount; i++) {
        var elm = this._linkInput(addLinkBtn, form, ident, i)
        elms.push(elm)
      }
      form.append(...elms)
    }

    var formCnt = getElm('DIV')
    formCnt.append(landmarkElm('linked threads'), form, addLinkBtn)

    return formCnt
  }

  _threadLi(ident) {
    var li = getElm('LI')

    if (!this.EditState.isCurrentId(ident)) {
      li.style.display = 'none'
    }
    li.addEventListener(
      'ThreadChange',
      function () {
        if (this.EditState.isCurrentId(ident)) {
          setTimeout(function () {
            vShow(li, 'ease', 200)
          }, 200)
        } else {
          vHide(li, 'ease', 200)
        }
      }.bind(this)
    )
    return li
  }

  _setdeleteThreadElm(elms, ident) {
    var btn = getElm('BUTTON', 'nx-delete-thread')
    btn.type = 'button'
    btn.textContent = '-'

    btn.addEventListener(
      'click',
      function () {
        this._deleteEvent(elms, ident)
      }.bind(this)
    )
    elms.index.append(btn)
  }


  _deleteEvent(elms, ident) {
    var threadData = Object.assign({}, this.EditState.getThreadData(ident))
    var act = function (redo) {
      var idx = this.EditState.getThreadIdx(ident)
      var len = this.EditState.getThreadsCount()

      if (redo) {

        this.EditState.removeThread(ident)

        Object.values(elms).forEach((elm) => {
          vHide(elm, 'ease', 200, function () {
            elm.remove()
          })
        })
     
        if (len > 1) {
          var sibling = null

          if (idx === 0) {
            sibling = elms.index.nextSibling
          } else if (idx === len - 1) {
            sibling = elms.index.previousSibling
          }
          if(sibling){
            sibling.dispatchEvent(updownEvt)

          }
        }

        if (this.EditState.isCurrentId(ident)) {
          elms.distant.dispatchEvent(threadChangeEvt)
          elms.local.dispatchEvent(threadChangeEvt)
        }
      } else {
        this.EditState.insertThread(ident, threadData)
        if (idx <= len - 1) {
          var next = this.containers.index.childNodes[idx]
          this.containers.index.insertBefore(elms.index, next)
          if (idx === 0) {
            next.dispatchEvent(updownEvt)
          }
        } else {
          this.containers.index.append(elms.index)
          if (len > 1) {
            elms.index.previousSibling.dispatchEvent(updownEvt)
          }
        }

        this.containers.local.append(elms.local)
        this.containers.distant.append(elms.distant)

        vShow(elms.index, 'ease', 200)
        elms.index.firstChild.click()
      }
      toggleAddBtn(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    }.bind(this)
    this.EditMenu.setLastAction(act)
    act(true)
  }

  _indexLi(ident) {
    var elm = getElm('LI')
    elm.dataset.ident = ident
    elm.append(this._indexLink(ident))
    this._setMoveBtns(elm, ident)
    return elm
  }

  _indexLink(ident) {
    var itemState = this.EditState.getAltEditState(ident)
    var indLk = baseViewLink(itemState, false)
    if (this.EditState.isCurrentId(ident)) {
      indLk.classList.add('nx-on-display')
    }

    indLk.addEventListener('click', () => {
      if (!this.EditState.isCurrentId(ident)) {
        this.EditState.changeCurrentThread(ident)
        var prev = this.containers.index.querySelector('.nx-on-display')
        if (prev) {
          prev.classList.remove('nx-on-display')
        }
        indLk.classList.add('nx-on-display')
        this.containers.local.childNodes.forEach((lchild) => {
          lchild.dispatchEvent(threadChangeEvt)
        })
        this.containers.distant.childNodes.forEach((dchild) => {
          dchild.dispatchEvent(threadChangeEvt)
        })
      }
    })

    return indLk
  }

  _toggleActiveBtn(ident, btn) {
    if (this.EditState.isFirstThread(ident)) {
      toggleDisabled(btn['up'], true)
    } else {
      toggleDisabled(btn['up'], false)
    }
    if (this.EditState.isLastThread(ident)) {
      toggleDisabled(btn['down'], true)
    } else {
      toggleDisabled(btn['down'], false)
    }
  }

  _permuteThread(goingUp, goingDown) {
    this.containers.index.removeChild(goingUp)
    this.containers.index.insertBefore(goingUp, goingDown)
    goingDown.dispatchEvent(updownEvt)
    goingUp.dispatchEvent(updownEvt)
  }

  _moveItemHandler(li, it, ident) {
    var act = function (redo) {
      var isUp = it == 'up'
      if (!redo) {
        isUp = !isUp
      }
      var sibling
      if (isUp && !this.EditState.isFirstThread(ident)) {
        sibling = li.previousSibling
        this.EditState.moveThread(ident, sibling.dataset.ident, true)
        this._permuteThread(li, sibling)
      } else if (!isUp && !this.EditState.isLastThread(ident)) {
        sibling = li.nextSibling
        this.EditState.moveThread(ident, sibling.dataset.ident, false)
        this._permuteThread(sibling, li)
      }
    }.bind(this)

    this.EditMenu.setLastAction(act)
    act(true)
  }

  _setMoveBtns(li, ident) {
    var dv = getElm('DIV', 'nx-edit-move')
    var btn = {
      up: null,
      down: null,
    }
    li.addEventListener(
      'IndexChange',
      function () {
        this._toggleActiveBtn(ident, btn)
      }.bind(this)
    )
    Object.keys(btn).forEach((it) => {
      btn[it] = getElm('A', 'nx-edit-move-' + it)
      btn[it].append(iconImage(this.btnSrc[it], 16))
      dv.append(btn[it])

      btn[it].addEventListener(
        'click',
        function () {
          this._moveItemHandler(li, it, ident)
        }.bind(this)
      )
    })
    this._toggleActiveBtn(ident, btn)
    li.append(dv)
  }

  _baseDeleteLinkBtn() {
    var btn = getElm('BUTTON', 'nx-delete-link')
    btn.type = 'button'
    btn.textContent = '-'
    return btn
  }
}

;// CONCATENATED MODULE: ./src/editor/NxEditSwitch.js




class NxEditSwitch {
  constructor(editInst, readerInst, readerUpdatePromise) {
    this.editInst = editInst
    this.readerInst = readerInst

    this.readerUpdatePromise = readerUpdatePromise

    this.previewOn = false
    this._setSwitchBtn()
  }

  getSwitchBtn() {
    return this.switchBtn
  }

  _instanceSwitch() {
    this.previewOn = !this.previewOn

    if (this.previewOn) {
      vHide(this.editInst, 'fade', 200,  function () {
        this.readerUpdatePromise().then(()=> {
          this.switchBtn.firstChild.src = editB64
          vShow(this.readerInst, 'fade', 200)
        })
      }.bind(this))
    } else {
      vHide(this.readerInst, 'fade', 200,  function () {
        this.switchBtn.firstChild.src = previewB64
        vShow(this.editInst, 'fade', 200)
      }.bind(this))
    }
  }

  _setSwitchBtn() {
    this.switchBtn = getElm('A', 'nx-edit-switch')
    this.switchBtn.append(iconImage(previewB64, 25))

    this.switchBtn.addEventListener('click', this._instanceSwitch.bind(this))
  }
}

;// CONCATENATED MODULE: ./src/editor/NxEditState.js







class NxEditState {
  constructor(state) {
    var tag = 'new'
    var url = 'nexus.json'
    var useState = false

    if (getQuery('edit')) {
      tag = 'current'
      if(state){
        if(state.dataUrl){
          url = state.dataUrl
        }   
        if(state.srcData){
          useState = true
        }
      }   
    }

    this.cacheName = tag+"#"+url
    this.originUrl = url
    var data = getStoredEditData(this.cacheName)
    var register = false

    if(data === null){
      register = true
      if(useState){
        data = state.srcData
      } else {
        data = newData()
      }
    }

    if (!data.index) {
      register = true
      data.index = getThreadsList(data)
    }
    if(register){
      registerEditData(this.cacheName, data)
    }

    var origin = data
    if (useState) {
      origin = state.srcData
    }
    this.originData = JSON.stringify(origin)

    var id = '/'
    var idx = -1
    if(useState && state.threadId !== '/' && data.index.includes(state.threadId)){
      id = state.threadId
      idx = data.index.indexOf(state.threadId)
    } else if(data.threads.length){
      id = data.threads[0].id
      idx = 0
    }

    this.state = newState(data, url, id, idx)
    this.threadsMap = {} // @doc originIdx: { id: currentId, idx: currentIdx, linked :{}}
  }

  /* whole state methods */

  getState() {
    return this.state
  }

  getOriginData() {
    return this.originData
  }

  getJsonState() {
    return JSON.stringify(this.state)
  }

  getAltEditState(ident) {
    return getAltState(this.state, this.getThreadId(ident), this.getThreadIdx(ident))
  }

  setNewState(jsonState) {
    this.state = Object.assign({}, JSON.parse(jsonState))
  }

  /* form methods */

  setAuthorValue(ref, value) {
    if (!this.state.srcData.author) {
      this.state.srcData.author = {}
    }
    this.state.srcData.author[ref[1]] = value
  }

  setThreadIndex(ident) {
    if (!this.state.srcData.threads) {
      this.state.srcData.threads = []
    } else {
      var idx = this.getThreadIdx(ident)
      if (typeof this.state.srcData.threads[idx] === 'undefined') {
        this.state.srcData.threads[idx] = {}
      }
    }
  }

  setThreadId(ref, value) {
    this.threadsMap[ref[1]].id = value
    var idx = this.getThreadIdx(ref[1])
    this.state.srcData.index[idx] = value
    this.state.srcData.threads[idx].id = value
  }

  setThreadInfo(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    this.state.srcData.threads[idx][ref[2]] = value
  }

  setContentValue(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    if (!this.state.srcData.threads[idx].content) {
      this.state.srcData.threads[idx].content = {}
    }
    if (ref[3] !== 'media') {
      this.state.srcData.threads[idx].content[ref[3]] = value
      return
    }
    if (!this.state.srcData.threads[idx].content.media) {
      this.state.srcData.threads[idx].content.media = {}
    }
    this.state.srcData.threads[idx].content.media[ref[4]] = value
  }

  setLinkedValue(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    if (!this.state.srcData.threads[idx].linked) {
      this.state.srcData.threads[idx].linked = [value]
    } else {
      var lidx = this.getLinkedThreadIdx(ref[1], ref[3])
      this.state.srcData.threads[idx].linked[lidx] = value
    }
  }

  setNewValue(ref, value) {
    if (this.state.srcData === null) {
      this.state.srcData = {}
      this.state.srcData.index = []
    }
    if (ref[0] === 'author') {
      return this.setAuthorValue(ref, value)
    }
    this.setThreadIndex(ref[1])

    if (ref[2] === 'id') {
      return this.setThreadId(ref, value)
    }
    if (!['linked', 'content'].includes(ref[2])) {
      return this.setThreadInfo(ref, value)
    }

    if (ref[2] === 'content') {
      return this.setContentValue(ref, value)
    }
    this.setLinkedValue(ref, value)
  }

  getValue(ref) {
    if (this.state.srcData) {
      if (ref[0] === 'author') {
        return this.state.srcData.author[ref[1]]
      }
      var idx = this.getThreadIdx(ref[1])
      if (!['linked', 'content'].includes(ref[2])) {
        return this.state.srcData.threads[idx][ref[2]]
      }
      if (ref[2] === 'content') {
        if (ref[3] !== 'media') {
          return this.state.srcData.threads[idx].content[ref[3]]
        }
        return this.state.srcData.threads[idx].content.media[ref[4]]
      }
      var lidx = this.getLinkedThreadIdx(ref[1], ref[3])
      return this.state.srcData.threads[idx].linked[lidx]
    }
    return ''
  }

  /* state infos methods */

  getThreadId(ident) {
    return this.threadsMap[ident].id
  }

  getThreadIdx(ident) {
    var idx = this.threadsMap[ident].idx
    var count = this.getThreadsCount()
    if (idx >= count) {
      idx = count - 1
      this.threadsMap[ident].idx = idx
      if (this.isCurrentId(ident)) {
        this.state.threadIndex = idx
      }
    }
    return idx
  }

  getIdsList() {
    return this.state.srcData.index
  }

  getThreadsCount() {
    return this.state.srcData.index.length
  }

  getCurrentThreadId() {
    return this.state.threadId
  }

  getCurrentThreadIdx() {
    return this.state.threadIndex
  }

  isCurrentId(ident) {
    return this.threadsMap[ident].id === this.state.threadId
  }

  resolveFilename(){
    var filename = 'nexus.json'
    if(this.state.dataUrl && this.state.dataUrl !== filename){
      var sp = this.state.dataUrl.split('/').filter(it => it)
      if(sp.length){
        filename = sp.pop()
        if(filename.slice(-5) !== '.json'){
          filename += '.json'
        }
        filename = replaceDiacritics(filename)
      }
    }
    return filename
  }


  /* specific thread methods */

  unsetCurrentThread() {
    this.state.threadId = '/'
    this.state.threadIndex = -1
  }

  isFirstThread(ident) {
    return this.getThreadIdx(ident) === 0
  }

  isLastThread(ident) {
    return this.getThreadIdx(ident) + 1 === this.getThreadsCount()
  }

  getThreadData(ident) {
    var idx = this.getThreadIdx(ident)
    var threadData = this.state.srcData.threads[idx]
    if (!threadData) {
      this.state.srcData.threads[idx] = {}
    }
    return threadData
  }

  removeThread(ident) {
    var idx = this.getThreadIdx(ident)
    this.state.srcData.index.splice(idx, 1)
    this.state.srcData.threads.splice(idx, 1)

    if (!this.isLastThread(ident)) {
      for (let [k, v] of Object.entries(this.threadsMap)) {
        if (v.idx > idx) {
          this.threadsMap[k].idx = v.idx - 1
        }
      }
    }

    if (this.isCurrentId(ident)) {
      this.unsetCurrentThread()
    } else if (this.state.threadIndex > idx) {
      this.state.threadIndex--
    }
  }

  insertThread(ident, threadData) {
    if (this.isLastThread(ident)) {
      this.pushThread(threadData)
    } else {
      var idx = this.getThreadIdx(ident)
      this.state.srcData.index.splice(idx, 0, threadData.id)
      this.state.srcData.threads.splice(idx, 0, threadData)
      for (let [k, v] of Object.entries(this.threadsMap)) {
        if (v.id !== threadData.id && v.idx >= idx) {
          this.threadsMap[k].idx = v.idx + 1
        }
      }
      if (this.state.threadIndex >= idx) {
        this.state.threadIndex++
      }
    }
  }

  newIdent(id, idx) {
    var ident = randomString(21)
    this.threadsMap[ident] = { id: id, idx: idx, linked: {} }
    return ident
  }

  changeCurrentThread(ident) {
    this.state.threadId = this.getThreadId(ident)
    this.state.threadIndex = this.getThreadIdx(ident)
  }

  moveThread(ident, siblingIdent, up = false) {
    var from = this.getThreadIdx(ident)
    var to = from + 1
    if (up) {
      to = from - 1
    }
    this.state.srcData.index.splice(to, 0, this.state.srcData.index.splice(from, 1)[0])
    this.state.srcData.threads.splice(to, 0, this.state.srcData.threads.splice(from, 1)[0])
    this.threadsMap[ident].idx = to
    this.threadsMap[siblingIdent].idx = from

    if (this.isCurrentId(ident)) {
      this.state.threadIndex = to
    } else if (this.isCurrentId(siblingIdent)) {
      this.state.threadIndex = from
    }
  }

  pushThread(threadData) {
    this.state.srcData.threads.push(threadData)
    this.state.srcData.index.push(threadData.id)
  }

  /* linked threads methods */

  getLinkedThreadIdx(ident, lkident) {
    var idx = this.threadsMap[ident].linked[lkident].idx
    var count = this.getLinkedUrlsCount(ident)
    if (idx >= count) {
      idx = count - 1
      this.threadsMap[ident].linked[lkident].idx = idx
    }
    return idx
  }

  getLinkedUrls(ident) {
    var threadData = this.getThreadData(ident)
    if (!Object.prototype.hasOwnProperty.call(threadData, 'linked')) {
      var idx = this.getThreadIdx(ident)
      this.state.srcData.threads[idx].linked = []
      return []
    }
    return threadData.linked
  }

  getLinkedUrlsCount(ident) {
    return this.getLinkedUrls(ident).length
  }

  registerLinkedThread(ident, linkIdx) {
    var lkident = randomString(21)
    this.threadsMap[ident].linked[lkident] = { idx: linkIdx }
    return lkident
  }

  isLastLinkedThread(ident, lkident) {
    return this.getLinkedThreadIdx(ident, lkident) === this.getLinkedUrlsCount(ident) - 1
  }

  removeLinkedThread(ident, lkident) {
    var tidx = this.getThreadIdx(ident)
    var lidx = this.getLinkedThreadIdx(ident, lkident)
    if (lidx === this.getLinkedUrlsCount(ident) - 1) {
      this.state.srcData.threads[tidx].linked.pop()
    } else {
      this.state.srcData.threads[tidx].linked.splice(lidx, 1)
      for (let [k, v] of Object.entries(this.threadsMap[ident].linked)) {
        if (v.idx > lidx) {
          this.threadsMap[ident].linked[k].idx = v.idx - 1
        }
      }
    }
  }

  pushLinkedThread(ident, value) {
    var idx = this.getThreadIdx(ident)
    if(!this.state.srcData.threads[idx].linked){
      this.state.srcData.threads[idx].linked = []
    }
      this.state.srcData.threads[idx].linked.push(value)
  }

  insertLinkedThread(ident, lkident, value) {
    if (this.isLastLinkedThread(ident, lkident)) {
      this.pushLinkedThread(ident, value)
    } else {
      var tidx = this.getThreadIdx(ident)
      var lidx = this.getLinkedThreadIdx(ident, lkident)
      this.state.srcData.threads[tidx].linked.splice(lidx, 0, value)
      for (let [k, v] of Object.entries(this.threadsMap[ident].linked)) {
        if (v.idx >= lidx && k !== lkident) {
          this.threadsMap[ident].linked[k].idx = v.idx + 1
        }
      }
    }
  }
}

;// CONCATENATED MODULE: ./src/editor/NxEditor.js







function editorElms(seed) {
  var EditState = new NxEditState(seed.state)
  var EditInstance = new NxEditInstance(EditState)

  var editInst = EditInstance.getInstanceElms()

  var readerSeed = {
    editMode: true,
    state: Object.assign({}, EditState.getState()),
  }
  var readerInst = readerElms(readerSeed)
  readerInst.style.display = 'none'

  var readerUpdatePromise = function () {
   triggerUpdate(EditState.state, true, true)
   return new Promise(function(resolve) {
    setTimeout(resolve, 100);
})
  }
  var EditSwitch = new NxEditSwitch(editInst, readerInst, readerUpdatePromise)
  var switchBtn = EditSwitch.getSwitchBtn()

  var editor = getElm('DIV', 'nx-editor')
  editor.append(editInst, readerInst, switchBtn)

  return editor
}

;// CONCATENATED MODULE: ./src/shared/NxStart.js












function mountApp(nxElm, appElm) {
  var host = document.createElement('DIV')
  host.className = 'nx'
  host.append(appElm)
  nxElm.append(host)
  return host;
}

function updateHost(host, appElm){
  vHide(host, 'ease', 200, function(){
    host.textContent = ''
    host.append(appElm)
    vShow(host, 'ease', 200)
  })
}

function init() {
  var feedback = errorPrgr();
  feedback.classList.add('nx-instance');
  
  initAll({
    appDefaultLang: 'en',
    appDefaultCss: appDefaultCss,
    appDefaultCssAliases: legacyDefaultCss,
  })
    .then((seed) => {
      setOriginLang(seed.request.lang)
      seed.state = dataToState(seed.request.url, seed.request.id, seed.nxdata)
      setOriginState(seed.state)
      var elm
      seed.editMode = false
      if (getQuery('edit') || getQuery('new')) {
        seed.editMode = true
         elm = editorElms(seed)
      } else {
         elm = readerElms(seed)
      }
    var host = mountApp(seed.nxelm, elm)
    var on = true;

    seed.nxelm.addEventListener('change', function () {
      if (seed.nxelm.dataset.srcdoc) {
        var nxdata = getSrcDocData(seed.nxelm.dataset.srcdoc, seed.request.mode === 'editor')
        if (nxdata) {
          seed.nxdata = nxdata
          seed.state = dataToState(seed.request.url, seed.request.id, seed.nxdata)
          if(on){
            triggerUpdate(seed.state, true, true)
          } else {
            on = true
            updateHost(host, elm)
          }

        } else if(on) {
          on = false
          updateHost(host, feedback)
        }
      }
    })

    }).catch((err) => {
      logErr(err.message)
      mountApp(retrieveNxElm(), feedback)
    })
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/NxIO.js ***!
  \*********************/
(function () { 
    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./shared/NxStart.js */ "./src/shared/NxStart.js")).then(NxStart => {
        NxStart.init()
    })
  })();
})();

/******/ })()
;
//# sourceMappingURL=NxIO.js.map