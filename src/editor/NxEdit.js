import {
  charMinMax,
  idPattern,
  itemsMinMax,
  supportedMediaTypes,
  urlPattern,
} from "@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js"
import {
  landmarkElm,
  baseViewLink,
  blockWrap,
  getElm,
  selectDropDown,
  setHistoryControls,
  setToggleOnDisplay,
  toggleNavEnd,
  iconImage,
} from "../shared/NxCommons.js"
import {
  easeIn,
  easeOut,
  insertDiversion,
  replaceDiversion,
  splitFlap,
} from "@i-is-as-i-does/valva/src/legacy/Valva-v1.js"
import { randomString } from "@i-is-as-i-does/jack-js/src/modules/Help.js"
import {
  getAltState,
  getBuffertime,
  registerUpdateEvt,
  triggerUpdate,
} from "../shared/NxState.js"
import { getTxt } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js"
import {
  getStoredEditData,
  registerEditData,
} from "@i-is-as-i-does/nexus-core/src/storg/NxMemory.js"
import {
  isValidUrl,
  validData,
} from "@i-is-as-i-does/nexus-core/src/validt/NxStamper.js"
import { newData, newThread } from "./NxStarters.js"
import {
  getSrcData,
  getThreadsList,
  loadSrcFile,
} from "@i-is-as-i-does/nexus-core/src/load/NxSrc.js"
import {
  dateInput,
  baseLabel,
  textareaInput,
  textInput,
  invalidSp,
  deleteLinkBtn,
  addBtn,
} from "./NxEditComps.js"
import { convertToId, newState, resolveMediaType } from "./NxEditPrc.js"
import { getQuery } from "@i-is-as-i-does/nexus-core/src/base/NxHost.js"
import { logErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog"
import {
  downB64,
  downloadB64,
  editB64,
  invalidB64,
  newB64,
  openB64,
  previewB64,
  redoB64,
  resetB64,
  saveB64,
  undoB64,
  upB64,
  validB64,
} from "../shared/NxIcons.js"

const editBuffer = getBuffertime()
const editHistoryMax = 10
var hostElm
var editMenu
var editState = {
  dataUrl: "nexus-tmp",
  srcData: null,
  threadId: "/",
  threadIndex: -1,
}
var originData = null
var previewOn = false
var upDownEvent = new CustomEvent("IndexChange")
var changeEvent = new Event("change")
var prcRunning = false
var actCtrls = {
  ctrls: {
    prev: { symbol: undoB64, elm: null },
    next: { symbol: redoB64, elm: null },
  },
  position: 0,
  count: 1,
}
var lastAction = []
var editIndex = null
var editLocal = null
var editDistant = null
var authorForm
var btnSrc = {
  up: upB64,
  down: downB64,
}
var saveBtn, resetBtn
var actionFdbck
var authorInputs = {
  handle: null,
  url: null,
  about: null,
}
var feedbackrun = null
var instanceBtn
var addThreadBtn

function moveItem(from, to) {
  editState.srcData.index.splice(
    to,
    0,
    editState.srcData.index.splice(from, 1)[0]
  )
  editState.srcData.threads.splice(
    to,
    0,
    editState.srcData.threads.splice(from, 1)[0]
  )
}

function toggleActiveBtn(id, btn) {
  var idx = editState.srcData.index.indexOf(id)

  if (idx === 0) {
    toggleBtn(btn["up"], true)
  } else {
    toggleBtn(btn["up"], false)
  }
  if (idx + 1 === editState.srcData.index.length) {
    toggleBtn(btn["down"], true)
  } else {
    toggleBtn(btn["down"], false)
  }
}
function permuteThread(goingUp, goingDown) {
  editIndex.removeChild(goingUp)
  editIndex.insertBefore(goingUp, goingDown)
  goingDown.dispatchEvent(upDownEvent)
  goingUp.dispatchEvent(upDownEvent)
}

function moveItemHandler(li, it, id) {
  var act = function (redo) {
    var idx = editState.srcData.index.indexOf(id)
    var isUp = it == "up"
    if (!redo) {
      isUp = !isUp
    }
    if (isUp && idx != 0) {
      moveItem(idx, idx - 1)
      permuteThread(li, li.previousSibling)
    } else if (!isUp && idx + 1 != editState.srcData.index.length) {
      moveItem(idx, idx + 1)
      permuteThread(li.nextSibling, li)
    }
  }

  setLastAction(act)
  act(true)
}
function setMoveBtns(li, id) {
  var dv = getElm("DIV", "nx-edit-move")
  var btn = {
    up: null,
    down: null,
  }
  li.addEventListener("IndexChange", function () {
    toggleActiveBtn(id, btn)
  })
  Object.keys(btn).forEach((it) => {
    btn[it] = getElm("A", "nx-edit-move-" + it)
    btn[it].append(iconImage(btnSrc[it], 16))
    dv.append(btn[it])

    btn[it].addEventListener("click", function () {
      moveItemHandler(li, it, id)
    })
  })
  toggleActiveBtn(id, btn)
  li.append(dv)
}

function threadLocalForm(idx, indexElm) {
  var form = getElm("FORM", "nx-thread-local-form")

  var fieldset1 = getElm("FIELDSET")
  var idCallback = function (inp) {
    indexElm.dataset.id = inp.value
  }
  var titleCallback = function (inp) {
    var targ = indexElm.querySelector(".nx-thread-title")
    if (targ.textContent !== inp.value) {
      targ.textContent = inp.value
    }
  }
  fieldset1.append(inputElm(["threads", idx, "id"], idCallback))
  fieldset1.append(inputElm(["threads", idx, "title"], titleCallback))
  fieldset1.append(inputElm(["threads", idx, "description"]))

  var fieldset2 = getElm("FIELDSET")
  var fields = ["timestamp", "main", "aside"]
  fields.forEach((field) => {
    fieldset2.append(inputElm(["threads", idx, "content", field]))
  })

  var fieldset3 = getElm("FIELDSET")

  var typeInp = inputElm(["threads", idx, "content", "media", "type"])
  var typeCallback = function (inp) {
    var item = typeInp.querySelector(
      "[data-item=" + resolveMediaType(inp.value) + "]"
    )
    if (item) {
      item.click()
    }
  }
  fieldset3.append(
    inputElm(["threads", idx, "content", "media", "url"], typeCallback)
  )
  fieldset3.append(typeInp)
  fieldset3.append(inputElm(["threads", idx, "content", "media", "caption"]))

  form.append(
    landmarkElm("local thread"),
    fieldset1,
    landmarkElm("content"),
    fieldset2,
    landmarkElm("media", 2),
    fieldset3
  )
  return form
}

function toggleAddBtn(btn, haystack, itemsKey){
  var disabled = false
  if(itemsMinMax[itemsKey][1] <= haystack.length){
    disabled = true
  } 
  if(btn.disabled !== disabled){
    btn.disabled = disabled
  }
}

function setAddThreadBtn() {
  addThreadBtn= addBtn()
  toggleAddBtn(addThreadBtn, editState.srcData.index, 'threads')
  addThreadBtn.addEventListener("click", function () {
    if(!addThreadBtn.disabled){
    var randomId = randomString(10)
    var idx = editState.srcData.index.length
    editState.srcData.threads.push(newThread(randomId))
    editState.srcData.index.push(randomId)
    var map = threadElms(idx, randomId)
    var ks = ["local", "distant"]
    ks.forEach((k) => {
      map[k].parent.append(map[k].child)
    })

    var callb = null
    if (editIndex.childNodes.length) {
      callb = function () {
        editIndex.childNodes[idx - 1].dispatchEvent(upDownEvent)
      }
    }
    insertDiversion(map.index.parent, map.index.child, false, true, 200, callb)
    toggleBtn(saveBtn, false)
    toggleAddBtn(addThreadBtn, editState.srcData.index, 'threads')
  }
  })

}

function toggleBtn(btn, disabled = false) {
  var hasDisbClass = btn.classList.contains("nx-disabled")
  if (!disabled && hasDisbClass) {
    btn.classList.remove("nx-disabled")
  } else if (disabled && !hasDisbClass) {
    btn.classList.add("nx-disabled")
  }
}

function linkInput(indexLi, addLinkBtn, form, idx, i) {
  var linkwrap = getElm("DIV", "nx-edit-distant-link")
  var store = {linked: null}
  var elm = inputElm(["threads", idx, "linked", i], null, store)
  var dltBtn = deleteLinkBtn()
  var delwrap = getElm("DIV", "nx-distant-link-action")
  delwrap.append(dltBtn)

  dltBtn.addEventListener("click", () => {
    var act = function (redo) {
     var nidx= editState.srcData.index.indexOf(indexLi.dataset.id)
     var ni = editState.srcData.threads[nidx].linked.indexOf(store.linked.value)

      if (redo) {
        easeOut(linkwrap, 200, function () {
          linkwrap.remove()
        })
        editState.srcData.threads[nidx].linked.splice(ni, 1)
      } else {
        if (
          i === editState.srcData.threads[nidx].linked.length - 1
        ) {
          editState.srcData.threads[nidx].linked.push(store.linked.value)
          insertDiversion(form, linkwrap, false, true, 200)
        } else {
          editState.srcData.threads[nidx].linked.splice(ni, 0, store.linked.value)
          var nextSibling = form.childNodes[ni]
          form.insertBefore(linkwrap, nextSibling)
          easeIn(linkwrap, 200)
        }
      }
      toggleAddBtn(addLinkBtn, editState.srcData.threads[nidx].linked, 'linked')
    }
    setLastAction(act)
    act(true)
  })
  linkwrap.append(elm, delwrap)
  return linkwrap
}

function threadDistantForm(idx, indexLi) {
  var form = getElm("FORM", "nx-thread-distant-form")
  var addLinkBtn = addBtn()
  toggleAddBtn(addLinkBtn, editState.srcData.threads[idx].linked, 'linked')
  addLinkBtn.addEventListener("click", () => {
    if(!addLinkBtn.disabled){
    var nidx = editState.srcData.index.indexOf(indexLi.dataset.id)
    editState.srcData.threads[nidx].linked.push("")
    insertDiversion(
      form,
      linkInput(indexLi, addLinkBtn, form, nidx, editState.srcData.threads[nidx].linked.length - 1),
      false,
      true,
      200
    )
    toggleAddBtn(addLinkBtn, editState.srcData.threads[nidx].linked, 'linked')
  }
  })

  if (
    !Object.prototype.hasOwnProperty.call(
      editState.srcData.threads[idx],
      "linked"
    )
  ) {
    editState.srcData.threads[idx].linked = []
  } else if (editState.srcData.threads[idx].linked.length) {
    var elms = []
    for (var i = 0; i < editState.srcData.threads[idx].linked.length; i++) {
      var elm = linkInput(indexLi, addLinkBtn, form, idx, i)
      elms.push(elm)
    }
    form.append(...elms)
  }

  var formCnt = getElm("DIV")
  formCnt.append(landmarkElm("linked threads"), form, addLinkBtn)

  return formCnt
}

function threadLi(id, form) {
  var li = getElm("LI")

  li.append(form)

  if (editState.threadId !== id) {
    li.style.display = "none"
  }
  registerUpdateEvt(function (nState) {
    if (nState.dataUrl == editState.dataUrl) {
      editState = nState
      if (nState.threadId == id) {
        setTimeout(function () {
          easeIn(li, 200)
        }, 200)
      } else {
        easeOut(li, 200)
      }
    }
  })
  return li
}

function indexLink(idx, id) {
  var itemState = getAltState(editState, id, idx)
  var indLk = baseViewLink(itemState, false)
  setToggleOnDisplay(indLk, itemState)

  indLk.addEventListener("click", () => {
    var nidx = editState.srcData.index.indexOf(indLk.parentNode.dataset.id)
    triggerUpdate(getAltState(editState, id, nidx), true)
  })

  return indLk
}

function threadElms(idx, id) {
  var map = {
    index: { parent: editIndex, child: null, link: null, del: null },
    local: { parent: editLocal, child: null },
    distant: { parent: editDistant, child: null },
  }

  map.index.child = getElm("LI")
  map.index.child.dataset.id = id

  map.index.link = indexLink(idx, id)
  map.index.child.append(map.index.link)
  setMoveBtns(map.index.child, id)

  map.distant.child = threadLi(id, threadDistantForm(idx, map.index.child))
  map.local.child = threadLi(id, threadLocalForm(idx, map.index.child))

  map.index.del = deleteThreadElm(
    map.local.child,
    map.distant.child,
    map.index.child
  )
  map.index.child.append(map.index.del)

  return map
}

function resetActions(){
  lastAction = []
  actCtrls.position = 0
  actCtrls.count = 0
  toggleNavEnd(actCtrls)

}

function setLastAction(callback) {
  if (actCtrls.position != actCtrls.count - 1) {
    lastAction.splice(actCtrls.position)
    actCtrls.count = lastAction.length + 1
  }
  if (actCtrls.count === editHistoryMax) {
    lastAction.splice(0, 1)
  } else {
    actCtrls.count++
  }

  lastAction.push(callback)
  actCtrls.position = actCtrls.count - 1

  toggleNavEnd(actCtrls)
  toggleBtn(saveBtn, false)
}

function deleteEvent(localLi, distantLi, indexLi) {
  var id = indexLi.dataset.id
  var idx = editState.srcData.index.indexOf(id)
  var len = editState.srcData.index.length
  var map = {
    index: id,
    threads: Object.assign({}, editState.srcData.threads[idx]),
  }

  var act = function (redo) {
    if (redo) {
      Object.keys(map).forEach((field) => {
        editState.srcData[field].splice(idx, 1)
      })

      if (len > 1) {
        if (idx === 0) {
          indexLi.nextSibling.dispatchEvent(upDownEvent)
        } else if (idx === len - 1) {
          indexLi.previousSibling.dispatchEvent(upDownEvent)
        }
      }

      ;[distantLi, localLi, indexLi].forEach((elm) => {
        easeOut(elm, 200, function () {
          elm.remove()
        })
      })

      if (editState.threadId === id) {
        editState.threadId = "/"
        editState.threadIndex = -1
        triggerUpdate(editState, true, true)
      } else if (editState.threadIndex > idx) {
        editState.threadIndex--
      }
    } else {
      Object.keys(map).forEach((field) => {
        editState.srcData[field].splice(idx, 0, map[field])
      })

      if (idx < len - 1) {
        var next = editIndex.childNodes[idx]
        editIndex.insertBefore(indexLi, next)
        if (idx === 0) {
          next.dispatchEvent(upDownEvent)
        }
      } else {
        editIndex.append(indexLi)
        if (len > 1) {
          indexLi.previousSibling.dispatchEvent(upDownEvent)
        }
      }

      editLocal.append(localLi)
      editDistant.append(distantLi)
      easeIn(indexLi, 200)
      indexLi.firstChild.click()
    }
    toggleAddBtn(addThreadBtn, editState.srcData.index, 'threads')
  }
  setLastAction(act)
  act(true)
}

function deleteThreadElm(localLi, distantLi, indexLi) {
  var btn = getElm("BUTTON", "nx-delete-thread")
  btn.type = "button"
  btn.textContent = "-"

  btn.addEventListener("click", function () {
    deleteEvent(localLi, distantLi, indexLi)
  })
  return btn
}

function setAuthorValue(ref, value) {
  if (!editState.srcData.author) {
    editState.srcData.author = {}
  }
  editState.srcData.author[ref[1]] = value
  return
}

function setThreadIndex(ref) {
  if (!editState.srcData.threads) {
    editState.srcData.threads = []
  } else if (typeof editState.srcData.threads[ref[1]] === "undefined") {
    editState.srcData.threads[ref[1]] = {}
  }
}

function setThreadId(ref, value) {
  editState.srcData.index.splice(ref[1], 1, value)
  editState.srcData.threads[ref[1]].id = value
}

function setThreadInfo(ref, value) {
  editState.srcData.threads[ref[1]][ref[2]] = value
}

function setContentValue(ref, value) {
  if (!editState.srcData.threads[ref[1]].content) {
    editState.srcData.threads[ref[1]].content = {}
  }
  if (ref[3] !== "media") {
    editState.srcData.threads[ref[1]].content[ref[3]] = value
    return
  }
  if (!editState.srcData.threads[ref[1]].content.media) {
    editState.srcData.threads[ref[1]].content.media = {}
  }
  editState.srcData.threads[ref[1]].content.media[ref[4]] = value
  return
}

function setLinkedValue(ref, value) {
  if (!editState.srcData.threads[ref[1]].linked) {
    editState.srcData.threads[ref[1]].linked = []
  } 
    editState.srcData.threads[ref[1]].linked[ref[3]] = value
}

function setNewValue(ref, value) {
  if (editState.srcData === null) {
    editState.srcData = {}
    editState.srcData.index = []
  }
  if (ref[0] === "author") {
    return setAuthorValue(ref, value)
  }
  setThreadIndex(ref)

  if (ref[2] === "id") {
    return setThreadId(ref, value)
  }
  if (!["linked", "content"].includes(ref[2])) {
    return setThreadInfo(ref, value)
  }

  if (ref[2] === "content") {
    return setContentValue(ref, value)
  }
  setLinkedValue(ref, value)
}

function fieldValue(ref) {
  if (editState.srcData) {
    if (ref[0] == "author") {
      return editState.srcData[ref[0]][ref[1]]
    }

    if (!["linked", "content"].includes(ref[2])) {
      return editState.srcData.threads[ref[1]][ref[2]]
    }
    if (ref[2] === "content") {
      if (ref[3] !== "media") {
        return editState.srcData.threads[ref[1]].content[ref[3]]
      }
      return editState.srcData.threads[ref[1]].content.media[ref[4]]
    }
    return editState.srcData.threads[ref[1]].linked[ref[3]]
  }
  return ""
}

function inputElm(ref, callback = null, store = null) {
  var val = fieldValue(ref)

  var pos = ref.length - 1
  if (Number.isInteger(ref[pos])) {
    pos--
  }
  var field = ref[pos]
  pos--
  if (Number.isInteger(ref[pos])) {
    pos--
  }
  var parent = ref[pos]

  var inp
  if (["about", "description", "main", "aside", "caption"].includes(field)) {
    inp = textareaInput(val)
  } else if (field == "timestamp") {
    inp = dateInput(val)
  } else {
    inp = textInput(val)
  }

  var hook = ref.join("-")
  inp.id = hook
  inp.name = hook
  if (
    [
      "handle",
      "title",
      "main",
      "id",
      "url",
      "type",
      "timestamp",
      "linked",
    ].includes(field)
  ) {
    inp.required = true
  }
  var ident = field
  if (field === "linked") {
    ident = "url"
  }

  var lb = baseLabel(ident)
  var indc = getElm("SPAN", "nx-edit-indication")
  var fdbck = invalidSp()
  lb.append(indc, fdbck)

  switch (field) {
    case "url":
      indc.textContent = "[http]"
      inp.pattern = urlPattern
      break
    case "linked":
      indc.textContent = "[http]"
      inp.pattern = urlPattern
      break
    case "id":
      indc.textContent = "[A-Za-z0-9-][3-36]"
      inp.pattern = idPattern
      break
    case "type":
      inp.pattern = "(" + supportedMediaTypes.join("|") + ")"
      break
    case "timestamp":
      break
    default:
      var minmax = charMinMax[field]
      indc.textContent = "[" + minmax[0] + "-" + minmax[1] + "]"
      inp.setAttribute("maxlength", minmax[1])
      inp.setAttribute("minlength", minmax[0])
  }

  if (store) {
    store[field] = inp
  }

  var wrap = getElm("DIV", "nx-edit-input nx-edit-" + parent + "-" + field)
  wrap.append(lb)
  if (field === "type") {
    var items = supportedMediaTypes
    wrap.append(
      selectDropDown(items, inp, null, "nx-edit-" + ref[2] + "-" + field)
    )
  } else {
    wrap.append(inp)
  }

  setInputEvt(ref, inp, fdbck, callback)
  inputEvtHandler(ref, inp, fdbck, callback)

  return wrap
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

function uniqueId(id, idx) {
  id = convertToId(id)
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

function inputEvtHandler(ref, inp, fdbck, callback) {
  var success = function () {
    setNewValue(ref, inp.value)
    setFeedbackIcon(fdbck, true)
    if (typeof callback === "function") {
      callback(inp)
    }
  }

  var failure = function () {
    setFeedbackIcon(fdbck, false)
  }

  var valid = inp.checkValidity()

  if ((valid && ref.includes("url")) || ref.includes("linked")) {
    valid = isValidUrl(inp.value)
    if (valid && ref.includes("linked")) {
      valid = isUnique(
        editState.srcData.threads[ref[1]].linked,
        inp.value,
        ref[3]
      )
      if (valid) {
        return getSrcData(inp.value)
          .then(() => {
            success()
          })
          .catch(() => {
            failure()
          })
      }
    }
  } else if (ref.includes("id")) {
    var nId = uniqueId(inp.value, ref[1])
    if (nId !== inp.value) {
      inp.value = nId
    }
    valid = true
  }

  if (valid) {
    success()
  } else {
    failure()
  }
}

function setFeedbackIcon(fdbck, valid) {
  var icsrc = invalidB64
  if (valid) {
    icsrc = validB64
  }
  fdbck.firstChild.src = icsrc
}

function setInputEvt(ref, inp, fdbck, callback) {
  var undone = ""
  var prev = inp.value
  inp.addEventListener("focus", function () {
    prev = inp.value
  })
  inp.addEventListener("change", function () {
    inputEvtHandler(ref, inp, fdbck, callback)
    var act = function (redo) {
      if (redo) {
        inp.value = undone
      } else {
        undone = inp.value
        inp.value = prev
      }
      inputEvtHandler(ref, inp, fdbck, callback)
    }
    setLastAction(act)
  })
}

function triggerUndoRedo(ctrl) {
  if (!prcRunning) {
    var postn = actCtrls.position
    var redo = false
    if (ctrl == "next") {
      postn -= 1
      redo = true
    }

    lastAction[postn](redo)
    setTimeout(
      function () {
        prcRunning = false
      }.bind(this),
      editBuffer
    )
    toggleBtn(saveBtn, false)
  }
}

function setAuthorForm() {
  authorForm = getElm("FORM", "nx-edit-author")
  var fields = ["handle", "url", "about"]
  fields.forEach((field) => {
    authorForm.append(inputElm(["author", field], null, authorInputs))
  })
}

function setSaveBtn() {
  saveBtn = getElm("A", "nx-save")
  saveBtn.append(iconImage(saveB64, 20))
  toggleBtn(saveBtn, true)
  saveBtn.addEventListener("click", function () {
    if (!saveBtn.classList.contains("nx-disabled")) {
      registerEditData(editState.dataUrl, editState.srcData)
      displayFeedback("saved")
      toggleBtn(saveBtn, true)
      setResetStatus()
    }
  })
}

function setResetStatus() {
  if (originData !== JSON.stringify(editState.srcData)) {
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
      resetData(JSON.parse(originData))
      toggleBtn(resetBtn, true)
    }
  })
}

function downloadBtn() {
  var dlBtn = getElm("A", "nx-download")
  dlBtn.append(iconImage(downloadB64, 20))
  dlBtn.addEventListener("click", function (e) {
    var data = Object.assign({}, editState.srcData)
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
    hostElm.appendChild(anchor)
    anchor.click()
    anchor.remove()
  })
  return dlBtn
}

function resetAuthorForm() {
  for (let [field, input] of Object.entries(authorInputs)) {
    input.value = editState.srcData.author[field]
    input.dispatchEvent(changeEvent)
  }
}

function resetData(nData) {
  var prevData = Object.assign({}, editState.srcData)

  if (nData === null) {
    nData = newData()
  }
  resetActions()

  var act = function (redo) {
    if (editState.srcData.threads.length) {
      var parents = [editIndex, editLocal, editDistant]
      parents.forEach((parent) => {
        Array.from(parent.childNodes).forEach((child) => {
          easeOut(child, 150, function () {
            child.remove()
          })
        })
      })
    }

    if (redo) {

      editState.srcData = nData
    } else {
      editState.srcData = prevData
    }

    editState.threadIndex = 0
    editState.threadId = editState.srcData.threads[0].id

    triggerUpdate(editState, true)
    resetAuthorForm()
    setThreads(true)
  }
  act(true)
  setLastAction(act)
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
      .then((data) => {
        data.index = getThreadsList(data)
        resetData(data)
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

function displayFeedback(msg) {
  var txt = getTxt(msg)
  if (feedbackrun) {
    clearTimeout(feedbackrun)
  }
  splitFlap(actionFdbck, txt, 25)
  feedbackrun = setTimeout(function () {
    splitFlap(actionFdbck, "", 25)
  }, 2000 + txt.length * 20)
}

function setActionFeedback() {
  actionFdbck = getElm("SPAN", "nx-action-feedback")
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
function editActions() {
  var wrp = getElm("DIV", "nx-edit-actions nx-history-nav")
  setHistoryControls(actCtrls, triggerUndoRedo, true)
  wrp.append(actCtrls.ctrls["prev"].elm, actCtrls.ctrls["next"].elm)
  return wrp
}

function setThreads(ease = false) {
  var items = editState.srcData.index

  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      setThread(i, items[i], ease)
    }
  }
}

function setThread(idx, id, ease = false) {
  var map = threadElms(idx, id)
  for (let [k, elmSet] of Object.entries(map)) {
    if (ease && (k == "index" || id == editState.threadId)) {
      insertDiversion(elmSet.parent, elmSet.child, false, true, 200)
    } else {
      elmSet.parent.append(elmSet.child)
    }
  }
}

function authorPart() {
  setAuthorForm()
  var dv = getElm("DIV", "nx-edit-author-form")
  dv.append(landmarkElm("author"), authorForm)
  return dv
}

function indexPart() {
  var dv = getElm("DIV", "nx-edit-list")
  setAddThreadBtn()
  dv.append(landmarkElm("threads"), editIndex, addThreadBtn)
  return dv
}

function setThreadsForms() {
  editIndex = getElm("UL", "nx-edit-index")
  editLocal = getElm("UL", "nx-edit-local")
  editDistant = getElm("UL", "nx-edit-distant")
  setThreads()
}
function setEditMenu() {
  editMenu = getElm("DIV", "nx-edit-menu")
  editMenu.append(editNav(), editActions())
}

export function getEditMenu() {
  return editMenu
}

export function instanceSwitch(readerInst, editInst) {
  instanceBtn = getElm("A", "nx-edit-switch")
  instanceBtn.append(iconImage(previewB64, 25))

  instanceBtn.addEventListener("click", function () {
    previewOn = !previewOn
    triggerUpdate(editState, true, true)
    if (previewOn) {
      instanceBtn.firstChild.src = editB64
      replaceDiversion(editInst, readerInst)
    } else {
      instanceBtn.firstChild.src = previewB64
      replaceDiversion(readerInst, editInst)
    }
  })

  return instanceBtn
}

export function setEditState(state, nxelm) {
  hostElm = nxelm
  var url = "nexus-tmp"
  var data

  if (getQuery("new")) {
    data = newData()
    state = null
  } else {
    if (state.dataUrl) {
      url = state.dataUrl
    }
    data = getStoredEditData(url)
    if (data === null) {
      if (state.srcData !== null) {
        data = state.srcData
      } else {
        data = newData()
      }
      registerEditData(url, data)
    }
  }

  if (!data.index) {
    data.index = getThreadsList(data)
  }

  if (state !== null && state.srcData !== null) {
    originData = JSON.stringify(state.srcData)
  } else {
    originData = JSON.stringify(data)
  }

  var id = data.threads[0].id
  var idx = 0

  if (state && state.threadId !== "/" && data.index.includes(state.threadId)) {
    id = state.threadId
    idx = data.index.indexOf(state.threadId)
  }

  editState = newState(data, url, id, idx)
  triggerUpdate(editState, true)
  setEditMenu()
  setThreadsForms()
}

export function editIndexBlock() {
  return blockWrap("index", [authorPart(), indexPart()], false)
}
export function editLocalBlock() {
  return blockWrap("local", [editLocal], false)
}
export function editDistantBlock() {
  return blockWrap("distant", [editDistant], false)
}
