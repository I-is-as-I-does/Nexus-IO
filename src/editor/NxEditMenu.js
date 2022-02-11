import {
  getThreadsList,
  loadSrcFile,
} from "@i-is-as-i-does/nexus-core/src/load/NxSrc"
import { logErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog"
import { registerEditData } from "@i-is-as-i-does/nexus-core/src/storg/NxMemory"
import { validData } from "@i-is-as-i-does/nexus-core/src/validt/NxStamper"
import {
  getElm,
  iconImage,
  setHistoryControls,
  toggleNavEnd,
} from "../shared/NxCommons.js"
import {
  downloadB64,
  newB64,
  openB64,
  redoB64,
  resetB64,
  saveB64,
  undoB64,
} from "../shared/NxIcons.js"
import { getEditState, getHostElm, getOriginData, resetData } from "./NxEdit.js"
import { getTxt } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate"
import { splitFlap } from "@i-is-as-i-does/valva/src/modules/aliases"
import { toggleBtn } from "./NxEditPrc.js"
import { newData } from "./NxEditStarters.js"

var actionFdbck
var feedbackrun

var saveBtn
var resetBtn
var editMenu

var actCtrls = {
  ctrls: {
    prev: { symbol: undoB64, elm: null },
    next: { symbol: redoB64, elm: null },
  },
  position: 0,
  count: 1,
}

var resetting = false
var lastAction

function setActionFeedback() {
  actionFdbck = getElm("SPAN", "nx-action-feedback")
}

function downloadBtn() {
  var dlBtn = getElm("A", "nx-download")
  dlBtn.append(iconImage(downloadB64, 20))
  dlBtn.addEventListener("click", function () {
    var data = Object.assign({}, getEditState().srcData)
    delete data.index
    var check = validData(data)
    if (!check) {
      displayFeedback("Invalid Nexus data")
    }
    data = JSON.stringify(data, undefined, 2)
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data)
    var anchor = getElm("A")
    anchor.setAttribute("href", dataStr)
    anchor.setAttribute("download", "nexus.json")
    getHostElm().appendChild(anchor)
    anchor.click()
    anchor.remove()
  })
  return dlBtn
}

function newDocumenBtn() {
  var newBtn = getElm("A", "nx-new")
  newBtn.append(iconImage(newB64, 20))
  newBtn.addEventListener("click", function () {
    resetData(newData())
  })
  return newBtn
}

function openBtn() {
  var inp = fileInput()
  var btn = getElm("A", "nx-open-file")
  btn.append(iconImage(openB64, 20))
  btn.addEventListener("click", function () {
    inp.click()
  })
  var wrap = getElm("SPAN")
  wrap.append(inp, btn)
  return wrap
}

function fileInput() {
  var inp = getElm("INPUT")
  inp.type = "file"
  inp.accept = "application/json"
  inp.addEventListener("change", function (evt) {
    loadSrcFile(evt, true)
      .then((fdata) => {
        fdata.index = getThreadsList(fdata)
        resetData(fdata)
      })
      .catch((err) => {
        logErr(err.message)
        displayFeedback("Invalid source")
      })
    inp.value = ""
  })
  inp.style.display = "none"
  return inp
}

function setSaveBtn() {
  saveBtn = getElm("A", "nx-save")
  saveBtn.append(iconImage(saveB64, 20))
  toggleBtn(saveBtn, true)
  saveBtn.addEventListener("click", function () {
    if (!saveBtn.classList.contains("nx-disabled")) {
      var editState = getEditState()
      registerEditData(editState.dataUrl, editState.srcData)
      displayFeedback("saved")
      toggleBtn(saveBtn, true)
      setResetStatus()
    }
  })
}

function setResetStatus() {
  if (getOriginData() !== JSON.stringify(getEditState().srcData)) {
    toggleBtn(resetBtn, false)
  } else {
    toggleBtn(resetBtn, true)
  }
}

function setResetBtn() {
  resetBtn = getElm("A", "nx-reset")
  resetBtn.append(iconImage(resetB64, 20))

  setResetStatus()
  resetBtn.addEventListener("click", function () {
    if (!resetBtn.classList.contains("nx-disabled")) {
      resetData(JSON.parse(getOriginData()))
      toggleBtn(resetBtn, true)
    }
  })
}

function editNav() {
  var wrp = getElm("DIV", "nx-edit-nav")
  setActionFeedback()
  setResetBtn()
  setSaveBtn()

  var links = getElm("DIV")

  links.append(resetBtn, newDocumenBtn(), openBtn(), saveBtn, downloadBtn())
  wrp.append(actionFdbck, links)
  return wrp
}

function triggerUndoRedo(ctrl) {
  lastAction(ctrl === "next")
  toggleSaveBtn(false)
}

function editActions() {
  var wrp = getElm("DIV", "nx-edit-actions nx-history-nav")
  setHistoryControls(actCtrls, triggerUndoRedo, true)
  wrp.append(actCtrls.ctrls["prev"].elm, actCtrls.ctrls["next"].elm)
  return wrp
}

export function setEditMenu() {
  editMenu = getElm("DIV", "nx-edit-menu")
  editMenu.append(editNav(), editActions())
}

export function displayFeedback(msg) {
  var txt = getTxt(msg)
  if (feedbackrun) {
    clearTimeout(feedbackrun)
  }
  splitFlap(actionFdbck, txt, 25)
  feedbackrun = setTimeout(function () {
    splitFlap(actionFdbck, "", 25)
  }, 1500 + txt.length * 20)
}

export function toggleSaveBtn(disabled = false) {
  toggleBtn(saveBtn, disabled)
}

export function setLastAction(callback, bypass = false) {
  if (!resetting || bypass) {
    lastAction = callback
    actCtrls.count = 2
    actCtrls.position = 1
    toggleNavEnd(actCtrls)
    toggleSaveBtn(false)
  }
}

export function setResetting(bool) {
  resetting = bool
}

export function getEditMenu() {
  return editMenu
}
