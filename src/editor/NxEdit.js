import {
  charMinMax,
  idPattern,
  supportedMediaTypes,
  urlPattern,
} from "@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js"
import {
  landmarkElm,
  baseViewLink,
  blockWrap,
  getElm,
  selectDropDown,
  iconImage,
} from "../shared/NxCommons.js"
import {
  insertDiversion,
  easeIn,
  easeOut,
} from "@i-is-as-i-does/valva/src/modules/aliases.js"
import { randomString } from "@i-is-as-i-does/jack-js/src/modules/Help.js"
import { getAltState } from "../shared/NxState.js"
import {
  getStoredEditData,
  registerEditData,
} from "@i-is-as-i-does/nexus-core/src/storg/NxMemory.js"
import { isValidUrl } from "@i-is-as-i-does/nexus-core/src/validt/NxStamper.js"
import { newData, newThread } from "./NxEditStarters.js"
import {
  getSrcData,
  getThreadsList,
} from "@i-is-as-i-does/nexus-core/src/load/NxSrc.js"
import {
  dateInput,
  baseLabel,
  textareaInput,
  textInput,
  invalidSp,
  deleteLinkBtn,
  addBtn,
  toggleAddBtn,
} from "./NxEditComps.js"
import {
  isUnique,
  newState,
  resolveMediaType,
  setFeedbackIcon,
  uniqueId,
  toggleBtn,
} from "./NxEditPrc.js"
import { getQuery } from "@i-is-as-i-does/nexus-core/src/base/NxHost.js"
import { downB64, upB64 } from "../shared/NxIcons.js"
import {
  setEditMenu,
  setLastAction,
  setResetting,
  toggleSaveBtn,
} from "./NxEditMenu.js"

var hostElm
var editState = {
  dataUrl: "nexus-tmp",
  srcData: null,
  threadId: "/",
  threadIndex: -1,
}
var originData = null

var threadChange = new CustomEvent("editThreadChange")
var upDownEvent = new CustomEvent("IndexChange")

var editIndex = null
var editLocal = null
var editDistant = null
var authorForm
var btnSrc = {
  up: upB64,
  down: downB64,
}
var addThreadBtn

var threadsMap = {}
// @doc originIdx: { id: currentId, idx: currentIdx, linked :{}}

function moveItem(ident, siblingIdent, up = false) {
  var from = threadsMap[ident].idx
  var to = from + 1
  if (up) {
    to = from - 1
  }
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
  threadsMap[ident].idx = to
  threadsMap[siblingIdent].idx = from
}

function toggleActiveBtn(ident, btn) {
  if (threadsMap[ident].idx === 0) {
    toggleBtn(btn["up"], true)
  } else {
    toggleBtn(btn["up"], false)
  }
  if (threadsMap[ident].idx + 1 === editState.srcData.index.length) {
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

function moveItemHandler(li, it, ident) {
  var act = function (redo) {
    var isUp = it == "up"
    if (!redo) {
      isUp = !isUp
    }
    var sibling
    if (isUp && threadsMap[ident].idx !== 0) {
      sibling = li.previousSibling
      moveItem(ident, sibling.dataset.ident, true)
      permuteThread(li, sibling)
    } else if (
      !isUp &&
      threadsMap[ident].idx + 1 !== editState.srcData.index.length
    ) {
      sibling = li.nextSibling
      moveItem(ident, sibling.dataset.ident, false)
      permuteThread(sibling, li)
    }
  }

  setLastAction(act)
  act(true)
}

function setMoveBtns(li, ident) {
  var dv = getElm("DIV", "nx-edit-move")
  var btn = {
    up: null,
    down: null,
  }
  li.addEventListener("IndexChange", function () {
    toggleActiveBtn(ident, btn)
  })
  Object.keys(btn).forEach((it) => {
    btn[it] = getElm("A", "nx-edit-move-" + it)
    btn[it].append(iconImage(btnSrc[it], 16))
    dv.append(btn[it])

    btn[it].addEventListener("click", function () {
      moveItemHandler(li, it, ident)
    })
  })
  toggleActiveBtn(ident, btn)
  li.append(dv)
}

function threadLocalForm(ident, indexElm) {
  var form = getElm("FORM", "nx-thread-local-form")

  var fieldset1 = getElm("FIELDSET")
  var idCallback = function (inp) {
    threadsMap[ident].id = inp.value
  }
  var titleCallback = function (inp) {
    var targ = indexElm.querySelector(".nx-thread-title")
    if (targ.textContent !== inp.value) {
      targ.textContent = inp.value
    }
  }
  fieldset1.append(inputElm(["threads", ident, "id"], idCallback))
  fieldset1.append(inputElm(["threads", ident, "title"], titleCallback))
  fieldset1.append(inputElm(["threads", ident, "description"]))

  var fieldset2 = getElm("FIELDSET")
  var fields = ["timestamp", "main", "aside"]
  fields.forEach((field) => {
    fieldset2.append(inputElm(["threads", ident, "content", field]))
  })

  var fieldset3 = getElm("FIELDSET")

  var typeInp = inputElm(["threads", ident, "content", "media", "type"])
  var typeCallback = function (inp, valid) {
    if (valid) {
      var item = typeInp.querySelector(
        "[data-item=" + resolveMediaType(inp.value) + "]"
      )
      if (item) {
        item.click()
      }
    }
  }
  fieldset3.append(
    inputElm(["threads", ident, "content", "media", "url"], typeCallback)
  )
  fieldset3.append(typeInp)
  fieldset3.append(inputElm(["threads", ident, "content", "media", "caption"]))

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

function setAddThreadBtn() {
  addThreadBtn = addBtn()
  toggleAddBtn(addThreadBtn, editState.srcData.index, "threads")

  addThreadBtn.addEventListener("click", function () {
    if (!addThreadBtn.disabled) {
      var ident = randomString(21)
      var randomId = randomString(10)
      var idx = editState.srcData.index.length
      threadsMap[ident] = { id: randomId, idx: idx, linked: {} }

      var callb = null
      if (idx - 1 !== -1) {
        callb = function () {
          editIndex.childNodes[idx - 1].dispatchEvent(upDownEvent)
        }
      }

      editState.srcData.threads.push(newThread(randomId))
      editState.srcData.index.push(randomId)
      var map = threadElms(ident)
      var ks = ["local", "distant"]

      ks.forEach((k) => {
        map[k].parent.append(map[k].child)
      })

      insertDiversion(
        map.index.parent,
        map.index.child,
        false,
        true,
        200,
        callb
      )
      toggleSaveBtn(false)
      toggleAddBtn(addThreadBtn, editState.srcData.index, "threads")
    }
  })
}

function linkInput(addLinkBtn, form, ident, i) {
  var lkident = randomString(21)
  threadsMap[ident].linked[lkident] = { idx: i }
  var linkwrap = getElm("DIV", "nx-edit-distant-link")
  var store = { linked: null }
  var elm = inputElm(["threads", ident, "linked", lkident], null, store)
  var dltBtn = deleteLinkBtn()
  var delwrap = getElm("DIV", "nx-distant-link-action")
  delwrap.append(dltBtn)

  dltBtn.addEventListener("click", () => {
    var act = function (redo) {
      var lidx = threadsMap[ident].linked[lkident].idx
      var tidx = threadsMap[ident].idx
      if (redo) {
        easeOut(linkwrap, 200, function () {
          linkwrap.remove()
        })
        var isLast = lidx === editState.srcData.threads[tidx].linked.length - 1
        editState.srcData.threads[tidx].linked.splice(lidx, 1)
        if (!isLast) {
          for (let [k, v] of Object.entries(threadsMap[ident].linked)) {
            if (v.idx > lidx) {
              threadsMap[ident].linked[k].idx = v.idx - 1
            }
          }
        }
      } else {
        if (lidx > editState.srcData.threads[tidx].linked.length - 1) {
          editState.srcData.threads[tidx].linked.push(store.linked.value)
          insertDiversion(form, linkwrap, false, true, 200)
        } else {
          editState.srcData.threads[tidx].linked.splice(
            lidx,
            0,
            store.linked.value
          )
          for (let [k, v] of Object.entries(threadsMap[ident].linked)) {
            if (v.idx >= lidx && k !== lkident) {
              threadsMap[ident].linked[k].idx = v.idx + 1
            }
          }
          var nextSibling = form.childNodes[lidx]
          form.insertBefore(linkwrap, nextSibling)
          easeIn(linkwrap, 200)
        }
      }
      toggleAddBtn(addLinkBtn, editState.srcData.threads[tidx].linked, "linked")
    }
    setLastAction(act)
    act(true)
  })
  linkwrap.append(elm, delwrap)
  return linkwrap
}

function threadDistantForm(ident) {
  var form = getElm("FORM", "nx-thread-distant-form")
  var addLinkBtn = addBtn()
  toggleAddBtn(
    addLinkBtn,
    editState.srcData.threads[threadsMap[ident].idx].linked,
    "linked"
  )
  addLinkBtn.addEventListener("click", () => {
    if (!addLinkBtn.disabled) {
      editState.srcData.threads[threadsMap[ident].idx].linked.push("")
      insertDiversion(
        form,
        linkInput(
          addLinkBtn,
          form,
          ident,
          editState.srcData.threads[threadsMap[ident].idx].linked.length - 1
        ),
        false,
        true,
        200
      )
      toggleAddBtn(
        addLinkBtn,
        editState.srcData.threads[threadsMap[ident].idx].linked,
        "linked"
      )
    }
  })

  if (
    !Object.prototype.hasOwnProperty.call(
      editState.srcData.threads[threadsMap[ident].idx],
      "linked"
    )
  ) {
    editState.srcData.threads[threadsMap[ident].idx].linked = []
  } else if (editState.srcData.threads[threadsMap[ident].idx].linked.length) {
    var elms = []
    for (
      var i = 0;
      i < editState.srcData.threads[threadsMap[ident].idx].linked.length;
      i++
    ) {
      var elm = linkInput(addLinkBtn, form, ident, i)
      elms.push(elm)
    }
    form.append(...elms)
  }

  var formCnt = getElm("DIV")
  formCnt.append(landmarkElm("linked threads"), form, addLinkBtn)

  return formCnt
}

function threadLi(ident) {
  var li = getElm("LI")

  if (editState.threadId !== threadsMap[ident].id) {
    li.style.display = "none"
  }
  li.addEventListener("editThreadChange", function () {
    if (editState.threadId === threadsMap[ident].id) {
      setTimeout(function () {
        easeIn(li, 200)
      }, 200)
    } else {
      easeOut(li, 200)
    }
  })
  return li
}

function indexLink(ident) {
  var itemState = getAltState(
    editState,
    threadsMap[ident].id,
    threadsMap[ident].idx
  )
  var indLk = baseViewLink(itemState, false)
  if (editState.threadId === threadsMap[ident].id) {
    indLk.classList.add("nx-on-display")
  }

  indLk.addEventListener("click", () => {
    if (editState.threadId !== threadsMap[ident].id) {
      editState.threadId = threadsMap[ident].id
      editState.threadIndex = threadsMap[ident].idx
      var prev = editIndex.querySelector(".nx-on-display")
      if (prev) {
        prev.classList.remove("nx-on-display")
      }
      indLk.classList.add("nx-on-display")
      editLocal.childNodes.forEach((lchild) => {
        lchild.dispatchEvent(threadChange)
      })
      editDistant.childNodes.forEach((dchild) => {
        dchild.dispatchEvent(threadChange)
      })
    }
  })

  return indLk
}

function threadElms(ident) {
  var map = {
    index: { parent: editIndex, child: null, link: null, del: null },
    local: { parent: editLocal, child: null },
    distant: { parent: editDistant, child: null },
  }

  map.distant.child = threadLi(ident)
  map.local.child = threadLi(ident)

  map.index.child = getElm("LI")
  map.index.child.dataset.ident = ident
  map.index.link = indexLink(ident)
  map.index.child.append(map.index.link)
  setMoveBtns(map.index.child, ident)

  map.distant.child.append(threadDistantForm(ident))
  map.local.child.append(threadLocalForm(ident, map.index.child))

  map.index.del = deleteThreadElm(
    map.local.child,
    map.distant.child,
    map.index.child,
    ident
  )
  map.index.child.append(map.index.del)

  return map
}

function deleteEvent(localLi, distantLi, indexLi, ident) {
  var threadData = Object.assign(
    {},
    editState.srcData.threads[threadsMap[ident].idx]
  )
  var act = function (redo) {
    var idx = threadsMap[ident].idx
    var len = editState.srcData.index.length

    if (redo) {
      if (idx < len - 1) {
        for (let [k, v] of Object.entries(threadsMap)) {
          if (v.idx > idx) {
            threadsMap[k].idx = v.idx - 1
          }
        }
      }

      editState.srcData.index.splice(idx, 1)
      editState.srcData.threads.splice(idx, 1)
      ;[distantLi, localLi, indexLi].forEach((elm) => {
        easeOut(elm, 200, function () {
          elm.remove()
        })
      })

      if (len > 1) {
        if (idx === 0) {
          indexLi.nextSibling.dispatchEvent(upDownEvent)
        } else if (idx === len - 1) {
          indexLi.previousSibling.dispatchEvent(upDownEvent)
        }
      }

      if (editState.threadId === threadsMap[ident].id) {
        editState.threadId = "/"
        editState.threadIndex = -1
        distantLi.dispatchEvent(threadChange)
        localLi.dispatchEvent(threadChange)
      } else if (editState.threadIndex > idx) {
        editState.threadIndex--
      }
    } else {
      editState.srcData.index.splice(idx, 0, threadData.id)
      editState.srcData.threads.splice(idx, 0, threadData)

      if (idx <= len - 1) {
        for (let [k, v] of Object.entries(threadsMap)) {
          if (v.id !== threadData.id && v.idx >= idx) {
            threadsMap[k].idx = v.idx + 1
          }
        }

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
    toggleAddBtn(addThreadBtn, editState.srcData.index, "threads")
  }
  setLastAction(act)
  act(true)
}

function deleteThreadElm(localLi, distantLi, indexLi, ident) {
  var btn = getElm("BUTTON", "nx-delete-thread")
  btn.type = "button"
  btn.textContent = "-"

  btn.addEventListener("click", function () {
    deleteEvent(localLi, distantLi, indexLi, ident)
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

function setThreadIndex(idx) {
  if (!editState.srcData.threads) {
    editState.srcData.threads = []
  } else if (typeof editState.srcData.threads[idx] === "undefined") {
    editState.srcData.threads[idx] = {}
  }
}

function setThreadId(ref, idx, value) {
  threadsMap[ref[1]].id = value
  editState.srcData.index[idx] = value
  editState.srcData.threads[idx].id = value
}

function setThreadInfo(ref, idx, value) {
  editState.srcData.threads[idx][ref[2]] = value
}

function setContentValue(ref, idx, value) {
  if (!editState.srcData.threads[idx].content) {
    editState.srcData.threads[idx].content = {}
  }
  if (ref[3] !== "media") {
    editState.srcData.threads[idx].content[ref[3]] = value
    return
  }
  if (!editState.srcData.threads[idx].content.media) {
    editState.srcData.threads[idx].content.media = {}
  }
  editState.srcData.threads[idx].content.media[ref[4]] = value
  return
}

function setLinkedValue(ref, idx, value) {
  if (!editState.srcData.threads[idx].linked) {
    editState.srcData.threads[idx].linked = [value]
  } else {
    editState.srcData.threads[idx].linked[
      threadsMap[ref[1]].linked[ref[3]].idx
    ] = value
  }
}

function setNewValue(ref, value) {
  if (editState.srcData === null) {
    editState.srcData = {}
    editState.srcData.index = []
  }
  if (ref[0] === "author") {
    return setAuthorValue(ref, value)
  }
  var idx = threadsMap[ref[1]].idx
  setThreadIndex(idx)

  if (ref[2] === "id") {
    return setThreadId(ref, idx, value)
  }
  if (!["linked", "content"].includes(ref[2])) {
    return setThreadInfo(ref, idx, value)
  }

  if (ref[2] === "content") {
    return setContentValue(ref, idx, value)
  }
  setLinkedValue(ref, idx, value)
}

function fieldValue(ref) {
  if (editState.srcData) {
    if (ref[0] == "author") {
      return editState.srcData[ref[0]][ref[1]]
    }
    var idx = threadsMap[ref[1]].idx
    if (!["linked", "content"].includes(ref[2])) {
      return editState.srcData.threads[idx][ref[2]]
    }
    if (ref[2] === "content") {
      if (ref[3] !== "media") {
        return editState.srcData.threads[idx].content[ref[3]]
      }
      return editState.srcData.threads[idx].content.media[ref[4]]
    }
    return editState.srcData.threads[idx].linked[
      threadsMap[ref[1]].linked[ref[3]].idx
    ]
  }
  return ""
}

function inputElm(ref, callback = null, store = null) {
  var val = fieldValue(ref)

  var pos = ref.length - 1
  if (ref[pos - 1] === "linked") {
    pos--
  }
  var field = ref[pos]
  pos--
  if (ref[pos - 1] === "threads") {
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
  inp.classList.add("nx-edit-input")

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
    wrap.append(selectDropDown(items, inp, null, "nx-edit-media-type-select"))
  } else {
    wrap.append(inp)
  }

  setInputEvt(ref, inp, fdbck, callback)
  inputEvtHandler(ref, inp, fdbck, callback)

  return wrap
}

function inputEvtHandler(ref, inp, fdbck, callback) {
  var valid = inp.checkValidity()
  var validPromise = null

  if ((valid && ref.includes("url")) || ref.includes("linked")) {
    valid = isValidUrl(inp.value)
    if (valid && ref.includes("linked")) {
      valid = isUnique(
        editState.srcData.threads[threadsMap[ref[1]].idx].linked,
        inp.value,
        threadsMap[ref[1]].linked[ref[3]].idx
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
  } else if (ref.includes("id")) {
    var nId = uniqueId(inp.value, threadsMap[ref[1]].idx)
    if (nId !== inp.value) {
      inp.value = nId
    }
    valid = true
  }

  if (validPromise === null) {
    validPromise = Promise.resolve(valid)
  }

  validPromise.then((isValid) => {
    setNewValue(ref, inp.value)
    setFeedbackIcon(fdbck, isValid)
    if (typeof callback === "function") {
      callback(inp, isValid)
    }
  })
}

function setInputEvt(ref, inp, fdbck, callback) {
  var c = 0
  var undone = ""
  var prev = inp.value
  inp.addEventListener("focus", function () {
    prev = inp.value
  })
  inp.addEventListener("change", function () {
    inputEvtHandler(ref, inp, fdbck, callback)
    if (c > 0) {
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
    } else {
      c++
    }
  })
}

function setAuthorForm() {
  authorForm = getElm("FORM", "nx-edit-author")
  setAuthorInputs()
}

function setAuthorInputs(ease = false) {
  var fields = ["handle", "url", "about"]
  fields.forEach((field) => {
    var inp = inputElm(["author", field])
    if (ease) {
      insertDiversion(authorForm, inp, false, true, 200)
    } else {
      authorForm.append(inp)
    }
  })
}

function setThreads(ease = false) {
  var items = editState.srcData.index

  if (items.length) {
    setResetting(true)
    var callb = null
    for (var i = 0; i < items.length; i++) {
      if (i === items.length - 1) {
        callb = function () {
          setResetting(false)
        }
      }
      setThread(i, items[i], callb, ease)
    }
  }
}

function setThread(idx, id, callb, ease = false) {
  var ident = randomString(21)
  threadsMap[ident] = { id: id, idx: idx, linked: {} }

  var map = threadElms(ident)

  for (let [k, elmSet] of Object.entries(map)) {
    if (ease && (k === "index" || id === editState.threadId)) {
      insertDiversion(elmSet.parent, elmSet.child, false, true, 200, callb)
    } else {
      elmSet.parent.append(elmSet.child)
      if (callb) {
        callb()
      }
    }
  }
}

function setThreadsForms() {
  editIndex = getElm("UL", "nx-edit-index")
  editLocal = getElm("UL", "nx-edit-local")
  editDistant = getElm("UL", "nx-edit-distant")
  setThreads()
}

export function resetData(data) {
  var prvState = JSON.stringify(editState)
  if (data === null) {
    data = newData()
  }

  var state = newState(data)
  if (state.srcData.threads.length) {
    state.threadIndex = 0
    state.threadId = state.srcData.threads[0].id
  }
  var nxtState = JSON.stringify(state)
  var act = function (redo) {
    if (editState.srcData.threads.length) {
      var parents = [authorForm, editIndex, editLocal, editDistant]
      parents.forEach((parent, p) => {
        var childr = Array.from(parent.childNodes)
        var lastp = p === parents.length - 1
        childr.forEach((child, c) => {
          var prc = null
          if (lastp && c === childr.length - 1) {
            prc = function () {
              var nstate
              if (redo) {
                nstate = nxtState
              } else {
                nstate = prvState
              }
              editState = Object.assign({}, JSON.parse(nstate))
              setAuthorInputs(true)
              setThreads(true)
            }
          }
          easeOut(child, 200, function () {
            child.remove()
            if (prc) {
              prc()
            }
          })
        })
      })
    }
  }
  act(true)
  setLastAction(act, true)
}

export function getOriginData() {
  return originData
}

export function getHostElm() {
  return hostElm
}

export function setEditState(state, nxelm) {
  hostElm = nxelm
  var url = "nexus-tmp"
  var state = state
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

  setEditMenu()
  setThreadsForms()
  setAuthorForm()
  setAddThreadBtn()
}

export function authorBlock() {
  return blockWrap("author", [authorForm], landmarkElm("author"))
}
export function editIndexBlock() {
  return blockWrap(
    "threads-list",
    [editIndex, addThreadBtn],
    landmarkElm("threads")
  )
}
export function editLocalBlock() {
  return blockWrap("local", [editLocal], false)
}
export function editDistantBlock() {
  return blockWrap("distant", [editDistant], false)
}
export function getEditState() {
  return editState
}
