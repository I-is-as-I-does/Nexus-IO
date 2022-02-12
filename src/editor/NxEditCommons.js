import { replaceDiacritics } from '@i-is-as-i-does/jack-js/src/modules/Help.js'
import { supportedOembedMedia } from '@i-is-as-i-does/nexus-core/src/validt/NxSpecs'

export const mediaGuessMap = {
  image: ['jpg', 'jpeg', 'gif', 'svg', 'png', 'webp'],
  video: ['mp4', 'webm'],
  audio: ['mp3'],
}

export const stateChangeEvt = new CustomEvent('StateChange')
export const threadChangeEvt = new CustomEvent('ThreadChange')
export const updownEvt = new CustomEvent('IndexChange')

export function toggleDisabled(elm, disabled = false) {
  var hasDisbClass = elm.classList.contains('nx-disabled')
  if (!disabled && hasDisbClass) {
    elm.classList.remove('nx-disabled')
  } else if (disabled && !hasDisbClass) {
    elm.classList.add('nx-disabled')
  }
}

export function resolveMediaType(val) {
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

export function convertToId(title) {
  return replaceDiacritics(title)
    .trim()
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function isUnique(haystack, needle, excludeIdx) {
  if (haystack.indexOf(needle) !== -1) {
    for (var c = 0; c < haystack.length; c++) {
      if (c !== excludeIdx && haystack[c] === needle) {
        return false
      }
    }
  }
  return true
}

export function uniqueId(idsList, id, idx) {
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
