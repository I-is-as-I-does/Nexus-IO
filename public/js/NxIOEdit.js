"use strict";
(self["webpackChunknexus_io"] = self["webpackChunknexus_io"] || []).push([["NxIOEdit"],{

/***/ "./src/editor/NxEdit.js":
/*!******************************!*\
  !*** ./src/editor/NxEdit.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resetData": () => (/* binding */ resetData),
/* harmony export */   "getOriginData": () => (/* binding */ getOriginData),
/* harmony export */   "getHostElm": () => (/* binding */ getHostElm),
/* harmony export */   "setEditState": () => (/* binding */ setEditState),
/* harmony export */   "authorBlock": () => (/* binding */ authorBlock),
/* harmony export */   "editIndexBlock": () => (/* binding */ editIndexBlock),
/* harmony export */   "editLocalBlock": () => (/* binding */ editLocalBlock),
/* harmony export */   "editDistantBlock": () => (/* binding */ editDistantBlock),
/* harmony export */   "getEditState": () => (/* binding */ getEditState)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxStamper.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/* harmony import */ var _NxEditStarters_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NxEditStarters.js */ "./src/editor/NxEditStarters.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NxEditComps.js */ "./src/editor/NxEditComps.js");
/* harmony import */ var _NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NxEditPrc.js */ "./src/editor/NxEditPrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/base/NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/* harmony import */ var _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/NxIcons.js */ "./src/shared/NxIcons.js");
/* harmony import */ var _NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./NxEditMenu.js */ "./src/editor/NxEditMenu.js");















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
  up: _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_12__.upB64,
  down: _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_12__.downB64,
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
    (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.toggleBtn)(btn["up"], true)
  } else {
    (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.toggleBtn)(btn["up"], false)
  }
  if (threadsMap[ident].idx + 1 === editState.srcData.index.length) {
    (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.toggleBtn)(btn["down"], true)
  } else {
    (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.toggleBtn)(btn["down"], false)
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

  ;(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setLastAction)(act)
  act(true)
}

function setMoveBtns(li, ident) {
  var dv = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-move")
  var btn = {
    up: null,
    down: null,
  }
  li.addEventListener("IndexChange", function () {
    toggleActiveBtn(ident, btn)
  })
  Object.keys(btn).forEach((it) => {
    btn[it] = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("A", "nx-edit-move-" + it)
    btn[it].append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.iconImage)(btnSrc[it], 16))
    dv.append(btn[it])

    btn[it].addEventListener("click", function () {
      moveItemHandler(li, it, ident)
    })
  })
  toggleActiveBtn(ident, btn)
  li.append(dv)
}

function threadLocalForm(ident, indexElm) {
  var form = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FORM", "nx-thread-local-form")

  var fieldset1 = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FIELDSET")
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

  var fieldset2 = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FIELDSET")
  var fields = ["timestamp", "main", "aside"]
  fields.forEach((field) => {
    fieldset2.append(inputElm(["threads", ident, "content", field]))
  })

  var fieldset3 = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FIELDSET")

  var typeInp = inputElm(["threads", ident, "content", "media", "type"])
  var typeCallback = function (inp, valid) {
    if (valid) {
      var item = typeInp.querySelector(
        "[data-item=" + (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.resolveMediaType)(inp.value) + "]"
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
    (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("local thread"),
    fieldset1,
    (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("content"),
    fieldset2,
    (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("media", 2),
    fieldset3
  )
  return form
}

function setAddThreadBtn() {
  addThreadBtn = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.addBtn)()
  ;(0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.toggleAddBtn)(addThreadBtn, editState.srcData.index, "threads")

  addThreadBtn.addEventListener("click", function () {
    if (!addThreadBtn.disabled) {
      var ident = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_3__.randomString)(21)
      var randomId = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_3__.randomString)(10)
      var idx = editState.srcData.index.length
      threadsMap[ident] = { id: randomId, idx: idx, linked: {} }

      var callb = null
      if (idx - 1 !== -1) {
        callb = function () {
          editIndex.childNodes[idx - 1].dispatchEvent(upDownEvent)
        }
      }

      editState.srcData.threads.push((0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_7__.newThread)(randomId))
      editState.srcData.index.push(randomId)
      var map = threadElms(ident)
      var ks = ["local", "distant"]

      ks.forEach((k) => {
        map[k].parent.append(map[k].child)
      })

      ;(0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(
        map.index.parent,
        map.index.child,
        false,
        true,
        200,
        callb
      )
      ;(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.toggleSaveBtn)(false)
      ;(0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.toggleAddBtn)(addThreadBtn, editState.srcData.index, "threads")
    }
  })
}

function linkInput(addLinkBtn, form, ident, i) {
  var lkident = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_3__.randomString)(21)
  threadsMap[ident].linked[lkident] = { idx: i }
  var linkwrap = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-distant-link")
  var store = { linked: null }
  var elm = inputElm(["threads", ident, "linked", lkident], null, store)
  var dltBtn = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.deleteLinkBtn)()
  var delwrap = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-distant-link-action")
  delwrap.append(dltBtn)

  dltBtn.addEventListener("click", () => {
    var act = function (redo) {
      var lidx = threadsMap[ident].linked[lkident].idx
      var tidx = threadsMap[ident].idx
      if (redo) {
        (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(linkwrap, 200, function () {
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
          ;(0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(form, linkwrap, false, true, 200)
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
          ;(0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.easeIn)(linkwrap, 200)
        }
      }
      (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.toggleAddBtn)(addLinkBtn, editState.srcData.threads[tidx].linked, "linked")
    }
    ;(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setLastAction)(act)
    act(true)
  })
  linkwrap.append(elm, delwrap)
  return linkwrap
}

function threadDistantForm(ident) {
  var form = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FORM", "nx-thread-distant-form")
  var addLinkBtn = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.addBtn)()
  ;(0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.toggleAddBtn)(
    addLinkBtn,
    editState.srcData.threads[threadsMap[ident].idx].linked,
    "linked"
  )
  addLinkBtn.addEventListener("click", () => {
    if (!addLinkBtn.disabled) {
      editState.srcData.threads[threadsMap[ident].idx].linked.push("")
      ;(0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(
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
      ;(0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.toggleAddBtn)(
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

  var formCnt = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV")
  formCnt.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("linked threads"), form, addLinkBtn)

  return formCnt
}

function threadLi(ident) {
  var li = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("LI")

  if (editState.threadId !== threadsMap[ident].id) {
    li.style.display = "none"
  }
  li.addEventListener("editThreadChange", function () {
    if (editState.threadId === threadsMap[ident].id) {
      setTimeout(function () {
        (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.easeIn)(li, 200)
      }, 200)
    } else {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(li, 200)
    }
  })
  return li
}

function indexLink(ident) {
  var itemState = (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__.getAltState)(
    editState,
    threadsMap[ident].id,
    threadsMap[ident].idx
  )
  var indLk = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.baseViewLink)(itemState, false)
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

  map.index.child = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("LI")
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
        (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(elm, 200, function () {
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
      ;(0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.easeIn)(indexLi, 200)
      indexLi.firstChild.click()
    }
    (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.toggleAddBtn)(addThreadBtn, editState.srcData.index, "threads")
  }
  ;(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setLastAction)(act)
  act(true)
}

function deleteThreadElm(localLi, distantLi, indexLi, ident) {
  var btn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("BUTTON", "nx-delete-thread")
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
    inp = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.textareaInput)(val)
  } else if (field == "timestamp") {
    inp = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.dateInput)(val)
  } else {
    inp = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.textInput)(val)
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

  var lb = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.baseLabel)(ident)
  var indc = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("SPAN", "nx-edit-indication")
  var fdbck = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_9__.invalidSp)()
  lb.append(indc, fdbck)

  switch (field) {
    case "url":
      indc.textContent = "[http]"
      inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.urlPattern
      break
    case "linked":
      indc.textContent = "[http]"
      inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.urlPattern
      break
    case "id":
      indc.textContent = "[A-Za-z0-9-][3-36]"
      inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.idPattern
      break
    case "type":
      inp.pattern = "(" + _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.supportedMediaTypes.join("|") + ")"
      break
    case "timestamp":
      break
    default:
      var minmax = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.charMinMax[field]
      indc.textContent = "[" + minmax[0] + "-" + minmax[1] + "]"
      inp.setAttribute("maxlength", minmax[1])
      inp.setAttribute("minlength", minmax[0])
  }

  if (store) {
    store[field] = inp
  }

  var wrap = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-input nx-edit-" + parent + "-" + field)
  wrap.append(lb)
  if (field === "type") {
    var items = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.supportedMediaTypes
    wrap.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.selectDropDown)(items, inp, null, "nx-edit-media-type-select"))
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
    valid = (0,_i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_6__.isValidUrl)(inp.value)
    if (valid && ref.includes("linked")) {
      valid = (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.isUnique)(
        editState.srcData.threads[threadsMap[ref[1]].idx].linked,
        inp.value,
        threadsMap[ref[1]].linked[ref[3]].idx
      )
      if (valid) {
        validPromise = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_8__.getSrcData)(inp.value)
          .then(() => {
            return true
          })
          .catch(() => {
            return false
          })
      }
    }
  } else if (ref.includes("id")) {
    var nId = (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.uniqueId)(inp.value, threadsMap[ref[1]].idx)
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
    ;(0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.setFeedbackIcon)(fdbck, isValid)
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
      ;(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setLastAction)(act)
    } else {
      c++
    }
  })
}

function setAuthorForm() {
  authorForm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FORM", "nx-edit-author")
  setAuthorInputs()
}

function setAuthorInputs(ease = false) {
  var fields = ["handle", "url", "about"]
  fields.forEach((field) => {
    var inp = inputElm(["author", field])
    if (ease) {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(authorForm, inp, false, true, 200)
    } else {
      authorForm.append(inp)
    }
  })
}

function setThreads(ease = false) {
  var items = editState.srcData.index

  if (items.length) {
    (0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setResetting)(true)
    var callb = null
    for (var i = 0; i < items.length; i++) {
      if (i === items.length - 1) {
        callb = function () {
          (0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setResetting)(false)
        }
      }
      setThread(i, items[i], callb, ease)
    }
  }
}

function setThread(idx, id, callb, ease = false) {
  var ident = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_3__.randomString)(21)
  threadsMap[ident] = { id: id, idx: idx, linked: {} }

  var map = threadElms(ident)

  for (let [k, elmSet] of Object.entries(map)) {
    if (ease && (k === "index" || id === editState.threadId)) {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(elmSet.parent, elmSet.child, false, true, 200, callb)
    } else {
      elmSet.parent.append(elmSet.child)
      if (callb) {
        callb()
      }
    }
  }
}

function setThreadsForms() {
  editIndex = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("UL", "nx-edit-index")
  editLocal = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("UL", "nx-edit-local")
  editDistant = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("UL", "nx-edit-distant")
  setThreads()
}

function resetData(data) {
  var prvState = JSON.stringify(editState)
  if (data === null) {
    data = (0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_7__.newData)()
  }

  var state = (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.newState)(data)
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
          (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(child, 200, function () {
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
  ;(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setLastAction)(act, true)
}

function getOriginData() {
  return originData
}

function getHostElm() {
  return hostElm
}

function setEditState(state, nxelm) {
  hostElm = nxelm
  var url = "nexus-tmp"
  var state = state
  var data

  if ((0,_i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_11__.getQuery)("new")) {
    data = (0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_7__.newData)()
    state = null
  } else {
    if (state.dataUrl) {
      url = state.dataUrl
    }
    data = (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_5__.getStoredEditData)(url)
    if (data === null) {
      if (state.srcData !== null) {
        data = state.srcData
      } else {
        data = (0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_7__.newData)()
      }
      (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_5__.registerEditData)(url, data)
    }
  }

  if (!data.index) {
    data.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_8__.getThreadsList)(data)
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

  editState = (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_10__.newState)(data, url, id, idx)

  ;(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_13__.setEditMenu)()
  setThreadsForms()
  setAuthorForm()
  setAddThreadBtn()
}

function authorBlock() {
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)("author", [authorForm], (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("author"))
}
function editIndexBlock() {
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)(
    "threads-list",
    [editIndex, addThreadBtn],
    (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("threads")
  )
}
function editLocalBlock() {
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)("local", [editLocal], false)
}
function editDistantBlock() {
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)("distant", [editDistant], false)
}
function getEditState() {
  return editState
}


/***/ }),

/***/ "./src/editor/NxEditComps.js":
/*!***********************************!*\
  !*** ./src/editor/NxEditComps.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textInput": () => (/* binding */ textInput),
/* harmony export */   "textareaInput": () => (/* binding */ textareaInput),
/* harmony export */   "dateInput": () => (/* binding */ dateInput),
/* harmony export */   "baseLabel": () => (/* binding */ baseLabel),
/* harmony export */   "deleteLinkBtn": () => (/* binding */ deleteLinkBtn),
/* harmony export */   "addBtn": () => (/* binding */ addBtn),
/* harmony export */   "invalidSp": () => (/* binding */ invalidSp),
/* harmony export */   "toggleAddBtn": () => (/* binding */ toggleAddBtn)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxIcons.js */ "./src/shared/NxIcons.js");






function textInput(val) {
  var inp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("INPUT", "nx-edit-text")
  inp.type = "text"
  inp.value = val
  return inp
}

function textareaInput(val) {
  var inp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("TEXTAREA", "nx-edit-textarea")
  inp.textContent = val
  return inp
}
function dateInput(val) {
  var inp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("INPUT", "nx-edit-date")
  inp.type = "datetime-local"
  inp.value = val
  return inp
}

function baseLabel(field) {
  var lb = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("LABEL", "nx-edit-label")
  lb.for = field
  var title = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("SPAN", "nx-edit-title")
  title.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_0__.getTxt)(field)
  ;(0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_1__.registerTranslElm)(title, field)
  lb.append(title)
  return lb
}

function deleteLinkBtn() {
  var btn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("BUTTON", "nx-delete-link")
  btn.type = "button"
  btn.textContent = "-"
  return btn
}

function addBtn() {
  var btn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("BUTTON", "nx-add-link")
  btn.type = "button"
  btn.textContent = "+"
  return btn
}

function invalidSp() {
  var sp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("SPAN", "nx-edit-feedback")
  sp.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_4__.invalidB64))
  return sp
}

function toggleAddBtn(btn, haystack, itemsKey) {
  var disabled = false
  if (_i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_2__.itemsMinMax[itemsKey][1] <= haystack.length) {
    disabled = true
  }
  if (btn.disabled !== disabled) {
    btn.classList.toggle("nx-disabled")
    btn.disabled = disabled
  }
}


/***/ }),

/***/ "./src/editor/NxEditMenu.js":
/*!**********************************!*\
  !*** ./src/editor/NxEditMenu.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setEditMenu": () => (/* binding */ setEditMenu),
/* harmony export */   "displayFeedback": () => (/* binding */ displayFeedback),
/* harmony export */   "toggleSaveBtn": () => (/* binding */ toggleSaveBtn),
/* harmony export */   "setLastAction": () => (/* binding */ setLastAction),
/* harmony export */   "setResetting": () => (/* binding */ setResetting),
/* harmony export */   "getEditMenu": () => (/* binding */ getEditMenu)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxStamper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxStamper */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/NxIcons.js */ "./src/shared/NxIcons.js");
/* harmony import */ var _NxEdit_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NxEdit.js */ "./src/editor/NxEdit.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _NxEditPrc_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NxEditPrc.js */ "./src/editor/NxEditPrc.js");
/* harmony import */ var _NxEditStarters_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NxEditStarters.js */ "./src/editor/NxEditStarters.js");












var actionFdbck
var feedbackrun

var saveBtn
var resetBtn
var editMenu

var actCtrls = {
  ctrls: {
    prev: { symbol: _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.undoB64, elm: null },
    next: { symbol: _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.redoB64, elm: null },
  },
  position: 0,
  count: 1,
}

var resetting = false
var lastAction

function setActionFeedback() {
  actionFdbck = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("SPAN", "nx-action-feedback")
}

function downloadBtn() {
  var dlBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("A", "nx-download")
  dlBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.downloadB64, 20))
  dlBtn.addEventListener("click", function () {
    var data = Object.assign({}, (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.getEditState)().srcData)
    delete data.index
    var check = (0,_i_is_as_i_does_nexus_core_src_validt_NxStamper__WEBPACK_IMPORTED_MODULE_3__.validData)(data)
    if (!check) {
      displayFeedback("Invalid Nexus data")
    }
    data = JSON.stringify(data, undefined, 2)
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data)
    var anchor = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("A")
    anchor.setAttribute("href", dataStr)
    anchor.setAttribute("download", "nexus.json")
    ;(0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.getHostElm)().appendChild(anchor)
    anchor.click()
    anchor.remove()
  })
  return dlBtn
}

function newDocumenBtn() {
  var newBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("A", "nx-new")
  newBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.newB64, 20))
  newBtn.addEventListener("click", function () {
    ;(0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.resetData)((0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_10__.newData)())
  })
  return newBtn
}

function openBtn() {
  var inp = fileInput()
  var btn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("A", "nx-open-file")
  btn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.openB64, 20))
  btn.addEventListener("click", function () {
    inp.click()
  })
  var wrap = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("SPAN")
  wrap.append(inp, btn)
  return wrap
}

function fileInput() {
  var inp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("INPUT")
  inp.type = "file"
  inp.accept = "application/json"
  inp.addEventListener("change", function (evt) {
    ;(0,_i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__.loadSrcFile)(evt, true)
      .then((fdata) => {
        fdata.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__.getThreadsList)(fdata)
        ;(0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.resetData)(fdata)
      })
      .catch((err) => {
        (0,_i_is_as_i_does_nexus_core_src_logs_NxLog__WEBPACK_IMPORTED_MODULE_1__.logErr)(err.message)
        displayFeedback("Invalid source")
      })
    inp.value = ""
  })
  inp.style.display = "none"
  return inp
}

function setSaveBtn() {
  saveBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("A", "nx-save")
  saveBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.saveB64, 20))
  ;(0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_9__.toggleBtn)(saveBtn, true)
  saveBtn.addEventListener("click", function () {
    if (!saveBtn.classList.contains("nx-disabled")) {
      var editState = (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.getEditState)()
      ;(0,_i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_2__.registerEditData)(editState.dataUrl, editState.srcData)
      displayFeedback("saved")
      ;(0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_9__.toggleBtn)(saveBtn, true)
      setResetStatus()
    }
  })
}

function setResetStatus() {
  if ((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.getOriginData)() !== JSON.stringify((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.getEditState)().srcData)) {
    (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_9__.toggleBtn)(resetBtn, false)
  } else {
    (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_9__.toggleBtn)(resetBtn, true)
  }
}

function setResetBtn() {
  resetBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("A", "nx-reset")
  resetBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.resetB64, 20))

  setResetStatus()
  resetBtn.addEventListener("click", function () {
    if (!resetBtn.classList.contains("nx-disabled")) {
      (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.resetData)(JSON.parse((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_6__.getOriginData)()))
      ;(0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_9__.toggleBtn)(resetBtn, true)
    }
  })
}

function editNav() {
  var wrp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("DIV", "nx-edit-nav")
  setActionFeedback()
  setResetBtn()
  setSaveBtn()

  var links = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("DIV")

  links.append(resetBtn, newDocumenBtn(), openBtn(), saveBtn, downloadBtn())
  wrp.append(actionFdbck, links)
  return wrp
}

function triggerUndoRedo(ctrl) {
  lastAction(ctrl === "next")
  toggleSaveBtn(false)
}

function editActions() {
  var wrp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("DIV", "nx-edit-actions nx-history-nav")
  ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.setHistoryControls)(actCtrls, triggerUndoRedo, true)
  wrp.append(actCtrls.ctrls["prev"].elm, actCtrls.ctrls["next"].elm)
  return wrp
}

function setEditMenu() {
  editMenu = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)("DIV", "nx-edit-menu")
  editMenu.append(editNav(), editActions())
}

function displayFeedback(msg) {
  var txt = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate__WEBPACK_IMPORTED_MODULE_7__.getTxt)(msg)
  if (feedbackrun) {
    clearTimeout(feedbackrun)
  }
  (0,_i_is_as_i_does_valva_src_modules_aliases__WEBPACK_IMPORTED_MODULE_8__.splitFlap)(actionFdbck, txt, 25)
  feedbackrun = setTimeout(function () {
    ;(0,_i_is_as_i_does_valva_src_modules_aliases__WEBPACK_IMPORTED_MODULE_8__.splitFlap)(actionFdbck, "", 25)
  }, 1500 + txt.length * 20)
}

function toggleSaveBtn(disabled = false) {
  (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_9__.toggleBtn)(saveBtn, disabled)
}

function setLastAction(callback, bypass = false) {
  if (!resetting || bypass) {
    lastAction = callback
    actCtrls.count = 2
    actCtrls.position = 1
    ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.toggleNavEnd)(actCtrls)
    toggleSaveBtn(false)
  }
}

function setResetting(bool) {
  resetting = bool
}

function getEditMenu() {
  return editMenu
}


/***/ }),

/***/ "./src/editor/NxEditPrc.js":
/*!*********************************!*\
  !*** ./src/editor/NxEditPrc.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveMediaType": () => (/* binding */ resolveMediaType),
/* harmony export */   "convertToId": () => (/* binding */ convertToId),
/* harmony export */   "newState": () => (/* binding */ newState),
/* harmony export */   "toggleBtn": () => (/* binding */ toggleBtn),
/* harmony export */   "isUnique": () => (/* binding */ isUnique),
/* harmony export */   "uniqueId": () => (/* binding */ uniqueId),
/* harmony export */   "setFeedbackIcon": () => (/* binding */ setFeedbackIcon)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _shared_NxIcons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/NxIcons */ "./src/shared/NxIcons.js");
/* harmony import */ var _NxEdit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxEdit */ "./src/editor/NxEdit.js");





const guessMap = {
  image: ["jpg", "jpeg", "gif", "svg", "png", "webp"],
  video: ["mp4", "webm"],
  audio: ["mp3"],
}

function resolveMediaType(val) {
  for (var p = 0; p < _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__.supportedOembedMedia.length; p++) {
    if (val.includes(_i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__.supportedOembedMedia[p])) {
      return _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__.supportedOembedMedia[p]
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

function convertToId(title) {
  return (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.replaceDiacritics)(title)
    .trim()
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

function newState(data, url = "nexus-tmp", id = "/", idx = -1) {
  return {
    dataUrl: url,
    srcData: data,
    threadId: id,
    threadIndex: idx,
  }
}

function toggleBtn(btn, disabled = false) {
  var hasDisbClass = btn.classList.contains("nx-disabled")
  if (!disabled && hasDisbClass) {
    btn.classList.remove("nx-disabled")
  } else if (disabled && !hasDisbClass) {
    btn.classList.add("nx-disabled")
  }
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
  var editState = (0,_NxEdit__WEBPACK_IMPORTED_MODULE_3__.getEditState)()
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

function setFeedbackIcon(fdbck, valid) {
  var icsrc = _shared_NxIcons__WEBPACK_IMPORTED_MODULE_2__.invalidB64
  if (valid) {
    icsrc = _shared_NxIcons__WEBPACK_IMPORTED_MODULE_2__.validB64
  }
  fdbck.firstChild.src = icsrc
}


/***/ }),

/***/ "./src/editor/NxEditStarters.js":
/*!**************************************!*\
  !*** ./src/editor/NxEditStarters.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newData": () => (/* binding */ newData),
/* harmony export */   "newThread": () => (/* binding */ newThread)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");



function newData() {
  var randomId = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.randomString)(10)
  return {
    nexus: _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_1__.appUrl,
    author: {
      handle: "Anonymous-" + (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.randomInt)(100, 999),
      about: "",
      url: "http://",
    },
    threads: [newThread(randomId)],
    index: [randomId],
  }
}

function newThread(randomId) {
  return {
    id: randomId,
    title: randomId,
    description: "...",
    content: {
      timestamp: new Date().toISOString().substring(0, 16),
      main: "...",
      aside: "",
      media: {
        url: "",
        type: "",
        caption: "",
      },
    },
    linked: [],
  }
}


/***/ }),

/***/ "./src/editor/NxEditSwitch.js":
/*!************************************!*\
  !*** ./src/editor/NxEditSwitch.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "instanceSwitch": () => (/* binding */ instanceSwitch)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/NxIcons.js */ "./src/shared/NxIcons.js");
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _NxEdit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxEdit.js */ "./src/editor/NxEdit.js");






function instanceSwitch(editInst, readerInst) {
  var previewOn = false
var instanceBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("A", "nx-edit-switch")
  instanceBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__.previewB64, 25))

  instanceBtn.addEventListener("click", function () {
    previewOn = !previewOn

    if (previewOn) {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(editInst, function () {
        (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_3__.triggerUpdate)((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_4__.getEditState)(), true, true)
        instanceBtn.firstChild.src = _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__.editB64
        ;(0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.fadeIn)(readerInst)
      })
    } else {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(readerInst, function () {
        instanceBtn.firstChild.src = _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__.previewB64
        ;(0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.fadeIn)(editInst)
      })
    }
  })
  return instanceBtn
}



/***/ }),

/***/ "./src/editor/NxEditor.js":
/*!********************************!*\
  !*** ./src/editor/NxEditor.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editorElms": () => (/* binding */ editorElms)
/* harmony export */ });
/* harmony import */ var _reader_NxReader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reader/NxReader.js */ "./src/reader/NxReader.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _NxEdit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxEdit.js */ "./src/editor/NxEdit.js");
/* harmony import */ var _NxEditMenu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxEditMenu.js */ "./src/editor/NxEditMenu.js");
/* harmony import */ var _NxEditSwitch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxEditSwitch.js */ "./src/editor/NxEditSwitch.js");







function editorElms(seed) {
  (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.setEditState)(seed.state, seed.nxelm)
  var indexMain = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-main-block nx-index")
  indexMain.append((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.authorBlock)(), (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.editIndexBlock)())
  var threadMain = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-main-block nx-thread")
  threadMain.append((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.editLocalBlock)(), (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.editDistantBlock)())

  var editInst = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.instanceWrap)((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.appHeaderWithLang)(), [
    (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.serviceWrap)([(0,_NxEditMenu_js__WEBPACK_IMPORTED_MODULE_3__.getEditMenu)()], [indexMain, threadMain], [], "edit"),
  ])

  var seed = {
    editMode: true,
    state: Object.assign({}, (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.getEditState)()),
  }
  var readerInst = (0,_reader_NxReader_js__WEBPACK_IMPORTED_MODULE_0__.readerElms)(seed)
  readerInst.style.display = "none"
  var switchBtn = (0,_NxEditSwitch_js__WEBPACK_IMPORTED_MODULE_4__.instanceSwitch)(editInst, readerInst)

  var editor = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-editor")
  editor.append(editInst, readerInst, switchBtn)
  return editor
}


/***/ })

}]);
//# sourceMappingURL=NxIOEdit.js.map