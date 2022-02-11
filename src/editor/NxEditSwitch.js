import { fadeOut, fadeIn } from "@i-is-as-i-does/valva/src/modules/aliases.js"
import {
  getElm,
  iconImage,
} from "../shared/NxCommons.js"
import { editB64, previewB64 } from "../shared/NxIcons.js"
import { triggerUpdate } from "../shared/NxState.js"
import {
  getEditState,
} from "./NxEdit.js"

export function instanceSwitch(editInst, readerInst) {
  var previewOn = false
var instanceBtn = getElm("A", "nx-edit-switch")
  instanceBtn.append(iconImage(previewB64, 25))

  instanceBtn.addEventListener("click", function () {
    previewOn = !previewOn

    if (previewOn) {
      fadeOut(editInst, function () {
        triggerUpdate(getEditState(), true, true)
        instanceBtn.firstChild.src = editB64
        fadeIn(readerInst)
      })
    } else {
      fadeOut(readerInst, function () {
        instanceBtn.firstChild.src = previewB64
        fadeIn(editInst)
      })
    }
  })
  return instanceBtn
}

