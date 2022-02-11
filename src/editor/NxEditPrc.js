import { replaceDiacritics } from "@i-is-as-i-does/jack-js/src/modules/Help.js"
import { supportedOembedMedia } from "@i-is-as-i-does/nexus-core/src/validt/NxSpecs"
import { invalidB64, validB64 } from "../shared/NxIcons"
import { getEditState } from "./NxEdit"

const guessMap = {
  image: ["jpg", "jpeg", "gif", "svg", "png", "webp"],
  video: ["mp4", "webm"],
  audio: ["mp3"],
}

export function resolveMediaType(val) {
  for (var p = 0; p < supportedOembedMedia.length; p++) {
    if (val.includes(supportedOembedMedia[p])) {
      return supportedOembedMedia[p]
    }
  }
  var ext = val.split(".").pop()
  for (let [type, exts] of Object.entries(guessMap)) {
    if (exts.includes(ext)) {
      return type
    }
  }

  return "page"
}

export function convertToId(title) {
  return replaceDiacritics(title)
    .trim()
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function newState(data, url = "nexus-tmp", id = "/", idx = -1) {
  return {
    dataUrl: url,
    srcData: data,
    threadId: id,
    threadIndex: idx,
  }
}

export function toggleBtn(btn, disabled = false) {
  var hasDisbClass = btn.classList.contains("nx-disabled")
  if (!disabled && hasDisbClass) {
    btn.classList.remove("nx-disabled")
  } else if (disabled && !hasDisbClass) {
    btn.classList.add("nx-disabled")
  }
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

export function uniqueId(id, idx) {
  id = convertToId(id)
  var editState = getEditState()
  if (!isUnique(editState.srcData.index, id, idx)) {
    var sp = id.split("-")
    var last = sp.pop()
    var incr
    if (!isNaN(last)) {
      incr = parseInt(last)
      incr++
    } else {
      sp.push(last)
      incr = 1
    }
    id = sp.join("-")
    while (editState.srcData.index.includes(id + "-" + incr)) {
      incr++
    }
    id += "-" + incr
  }
  return id
}

export function setFeedbackIcon(fdbck, valid) {
  var icsrc = invalidB64
  if (valid) {
    icsrc = validB64
  }
  fdbck.firstChild.src = icsrc
}
