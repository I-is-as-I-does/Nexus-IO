
import { readerElms } from "../reader/NxReader.js"
import {
  appHeaderWithLang,
  getElm,
  instanceWrap,
  serviceWrap,
} from "../shared/NxCommons.js"
import {
  editDistantBlock,
  authorBlock,
  editIndexBlock,
  editLocalBlock,
  setEditState,
  getEditState,
} from "./NxEdit.js"
import { getEditMenu } from "./NxEditMenu.js"
import { instanceSwitch } from "./NxEditSwitch.js"

export function editorElms(seed) {
  setEditState(seed.state, seed.nxelm)
  var indexMain = getElm("DIV", "nx-main-block nx-index")
  indexMain.append(authorBlock(), editIndexBlock())
  var threadMain = getElm("DIV", "nx-main-block nx-thread")
  threadMain.append(editLocalBlock(), editDistantBlock())

  var editInst = instanceWrap(appHeaderWithLang(), [
    serviceWrap([getEditMenu()], [indexMain, threadMain], [], "edit"),
  ])

  var seed = {
    editMode: true,
    state: Object.assign({}, getEditState()),
  }
  var readerInst = readerElms(seed)
  readerInst.style.display = "none"
  var switchBtn = instanceSwitch(editInst, readerInst)

  var editor = getElm("DIV", "nx-editor")
  editor.append(editInst, readerInst, switchBtn)
  return editor
}
