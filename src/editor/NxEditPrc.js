import { replaceDiacritics } from "@i-is-as-i-does/jack-js/src/modules/Help.js";

const providers = ["youtube", "vimeo", "soundcloud"];
const guessMap = {
  image: ["jpg", "jpeg", "gif", "svg", "png", "webp"],
  video: ["mp4", "webm"],
  audio: ["mp3"],
};

export function resolveMediaType(val) {
  for (var p = 0; p < providers.length; p++) {
    if (val.includes(providers[p])) {
      return providers[p];
    }
  }
  var ext = val.split(".").pop();
  for (let [type, exts] of Object.entries(guessMap)) {
    if (exts.includes(ext)) {
      return type;
    }
  }

  return "page";
}

export function convertToId(title) {
  return replaceDiacritics(title).trim().replace(/[^A-Za-z0-9]+/g, "-").replace(/(^-|-$)+/g, '')
  }

  export function newState(data, url = "nexus-tmp", id = "/", idx = -1){
    return {
      dataUrl: url,
      srcData: data,
      threadId: id,
      threadIndex: idx,
    };
  }
  