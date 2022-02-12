import { getThreadsList, loadSrcFile } from '@i-is-as-i-does/nexus-core/src/load/NxSrc'
import { logErr } from '@i-is-as-i-does/nexus-core/src/logs/NxLog'
import { registerEditData } from '@i-is-as-i-does/nexus-core/src/storg/NxMemory'
import { validData } from '@i-is-as-i-does/nexus-core/src/validt/NxStamper'
import { getElm, iconImage, setHistoryControls, toggleNavEnd } from '../shared/NxCommons.js'
import {
  downloadB64,
  newB64,
  openB64,
  redoB64,
  resetB64,
  saveB64,
  undoB64,
} from '../shared/NxIcons.js'
import { getTxt } from '@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate'
import { vSplitFlap } from '@i-is-as-i-does/valva/src/modules/transitions.js'
import { stateChangeEvt, toggleDisabled } from './NxEditCommons.js'
import { newData, newState } from './NxEditStarters.js'
import { getQuery } from '@i-is-as-i-does/nexus-core/src/base/NxHost'

export class NxEditMenu {
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
