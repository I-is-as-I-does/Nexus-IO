import { readerElms } from '../reader/NxReader.js'
import { getElm } from '../shared/NxCommons.js'
import { NxEditInstance } from './NxEditInstance.js'
import { NxEditSwitch } from './NxEditSwitch.js'
import { triggerUpdate } from '../shared/NxState.js'
import { NxEditState } from './NxEditState.js'

export function editorElms(seed) {
  var EditState = new NxEditState(seed.state)
  var EditInstance = new NxEditInstance(EditState)

  var editInst = EditInstance.getInstanceElms()

  var readerSeed = {
    editMode: true,
    state: Object.assign({}, EditState.getState()),
  }
  var readerInst = readerElms(readerSeed)
  readerInst.style.display = 'none'

  var readerUpdatePrc = function () {
    return triggerUpdate(EditState.state, true, true)
  }
  var EditSwitch = new NxEditSwitch(editInst, readerInst, readerUpdatePrc)
  var switchBtn = EditSwitch.getSwitchBtn()

  var editor = getElm('DIV', 'nx-editor')
  editor.append(editInst, readerInst, switchBtn)

  return editor
}
