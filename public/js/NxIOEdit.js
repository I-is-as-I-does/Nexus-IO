"use strict";
(self["webpackChunknexus_io"] = self["webpackChunknexus_io"] || []).push([["NxIOEdit"],{

/***/ "./src/editor/NxAddBtn.js":
/*!********************************!*\
  !*** ./src/editor/NxAddBtn.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBtn": () => (/* binding */ addBtn),
/* harmony export */   "toggleAddBtn": () => (/* binding */ toggleAddBtn)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");



function addBtn() {
  var btn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('BUTTON', 'nx-add-link')
  btn.type = 'button'
  btn.textContent = '+'
  return btn
}

function toggleAddBtn(btn, haystack, itemsKey) {
  var disabled = false
  if (_i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_0__.itemsMinMax[itemsKey][1] <= haystack.length) {
    disabled = true
  }
  if (btn.disabled !== disabled) {
    btn.classList.toggle('nx-disabled')
    btn.disabled = disabled
  }
}


/***/ }),

/***/ "./src/editor/NxEditCommons.js":
/*!*************************************!*\
  !*** ./src/editor/NxEditCommons.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mediaGuessMap": () => (/* binding */ mediaGuessMap),
/* harmony export */   "autoUpdateEvt": () => (/* binding */ autoUpdateEvt),
/* harmony export */   "stateChangeEvt": () => (/* binding */ stateChangeEvt),
/* harmony export */   "threadChangeEvt": () => (/* binding */ threadChangeEvt),
/* harmony export */   "updownEvt": () => (/* binding */ updownEvt),
/* harmony export */   "toggleDisabled": () => (/* binding */ toggleDisabled),
/* harmony export */   "resolveMediaType": () => (/* binding */ resolveMediaType),
/* harmony export */   "convertToId": () => (/* binding */ convertToId),
/* harmony export */   "isUnique": () => (/* binding */ isUnique),
/* harmony export */   "uniqueId": () => (/* binding */ uniqueId)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");



const mediaGuessMap = {
  image: ['jpg', 'jpeg', 'gif', 'svg', 'png', 'webp'],
  video: ['mp4', 'webm'],
  audio: ['mp3'],
}

const autoUpdateEvt = new CustomEvent('AutoUpdate')
const stateChangeEvt = new CustomEvent('StateChange')
const threadChangeEvt = new CustomEvent('ThreadChange')
const updownEvt = new CustomEvent('IndexChange')

function toggleDisabled(elm, disabled = false) {
  var hasDisbClass = elm.classList.contains('nx-disabled')
  if (!disabled && hasDisbClass) {
    elm.classList.remove('nx-disabled')
  } else if (disabled && !hasDisbClass) {
    elm.classList.add('nx-disabled')
  }
}

function resolveMediaType(val) {
  for (var p = 0; p < _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__.supportedOembedMedia.length; p++) {
    if (val.includes(_i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__.supportedOembedMedia[p])) {
      return _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_1__.supportedOembedMedia[p]
    }
  }
  var ext = val.split('.').pop()
  for (let [type, exts] of Object.entries(mediaGuessMap)) {
    if (exts.includes(ext)) {
      return type
    }
  }

  return 'page'
}

function convertToId(title) {
  return (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.replaceDiacritics)(title)
    .trim()
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
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

function uniqueId(idsList, id, idx) {
  id = convertToId(id)
  if (!isUnique(idsList, id, idx)) {
    var sp = id.split('-')
    var last = sp.pop()
    var incr
    if (!isNaN(last)) {
      incr = parseInt(last)
      incr++
    } else {
      sp.push(last)
      incr = 1
    }
    id = sp.join('-')
    while (idsList.includes(id + '-' + incr)) {
      incr++
    }
    id += '-' + incr
  }
  return id
}


/***/ }),

/***/ "./src/editor/NxEditInstance.js":
/*!**************************************!*\
  !*** ./src/editor/NxEditInstance.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxEditInstance": () => (/* binding */ NxEditInstance)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/NxCommons */ "./src/shared/NxCommons.js");
/* harmony import */ var _shared_NxIcons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/NxIcons */ "./src/shared/NxIcons.js");
/* harmony import */ var _NxAddBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxAddBtn */ "./src/editor/NxAddBtn.js");
/* harmony import */ var _NxEditCommons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NxEditCommons */ "./src/editor/NxEditCommons.js");
/* harmony import */ var _NxEditMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NxEditMenu */ "./src/editor/NxEditMenu.js");
/* harmony import */ var _NxEditStarters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NxEditStarters */ "./src/editor/NxEditStarters.js");
/* harmony import */ var _NxInputsFactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NxInputsFactory */ "./src/editor/NxInputsFactory.js");
/* harmony import */ var _NxLocalFormFactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NxLocalFormFactory */ "./src/editor/NxLocalFormFactory.js");











class NxEditInstance {
  constructor(EditState) {
    this.EditState = EditState

    this._setContainers()
    this._setBtnSrc()

    this._setMenu()

    this._setFactories()
    this._setAddThreadBtn()
    this._setFormsInputs()

    this._setFormBlocks()
    this._setServiceElms()
  }

  getInstanceElms() {
    return this.instanceElms
  }

  _setBtnSrc() {
    this.btnSrc = {
      up: _shared_NxIcons__WEBPACK_IMPORTED_MODULE_3__.upB64,
      down: _shared_NxIcons__WEBPACK_IMPORTED_MODULE_3__.downB64,
    }
  }

  _setContainers() {
    this.containers = {
      author: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('FORM', 'nx-edit-author'),
      index: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('UL', 'nx-edit-index'),
      local: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('UL', 'nx-edit-local'),
      distant: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('UL', 'nx-edit-distant'),
    }
  }

  _setMenu() {
    this.EditMenu = new _NxEditMenu__WEBPACK_IMPORTED_MODULE_6__.NxEditMenu(this.EditState)
    this.menu = this.EditMenu.getMenuElms()
    this.menu.addEventListener('StateChange', this._resetFormCallback.bind(this))
  }

  _setFactories() {
    this.InputsFactory = new _NxInputsFactory__WEBPACK_IMPORTED_MODULE_8__.NxInputsFactory(this.EditState, this.EditMenu)
    this.LocalFormFactory = new _NxLocalFormFactory__WEBPACK_IMPORTED_MODULE_9__.NxLocalFormFactory(this.InputsFactory)
  }

  _setAddThreadBtn() {
    this.addThreadBtn = (0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.addBtn)()
    ;(0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.toggleAddBtn)(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    this.addThreadBtn.addEventListener('click', this._addThreadHandler.bind(this))
  }

  _setServiceElms() {
    var indexMain = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-main-block nx-index')
    indexMain.append(this.formBlocks.author, this.formBlocks.index)
    var threadMain = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-main-block nx-thread')
    threadMain.append(this.formBlocks.local, this.formBlocks.distant)

    this.instanceElms = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.instanceWrap)((0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.appHeaderWithLang)(), [
      (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.serviceWrap)([this.menu], [indexMain, threadMain], [], 'edit'),
    ])
  }

  _setFormBlocks() {
    this.formBlocks = {
      author: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.blockWrap)('author', [this.containers.author], (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.landmarkElm)('author')),
      index: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.blockWrap)(
        'threads-list',
        [this.containers.index, this.addThreadBtn],
        (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.landmarkElm)('threads')
      ),
      local: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.blockWrap)('local', [this.containers.local], false),
      distant: (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.blockWrap)('distant', [this.containers.distant], false),
    }
  }

  _resetFormCallback() {

    Object.values(this.containers).forEach((container, i) => {
      var childr = Array.from(container.childNodes)
      var isLastp = i === 3
      var lastc = childr.length - 1
      childr.forEach((child, c) => {
        ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vHide)(child, 'fade', 200, function(){
          child.remove()
          if (isLastp && c === lastc) {
            this._setFormsInputs()
          }
        }.bind(this))
      })
    })
  }

  _setFormsInputs() {
    this._setAuthorInputs()
    this._setThreadsInputs()
  }

  _setAuthorInputs() {
    var fields = ['handle', 'url', 'about']
    fields.forEach((field) => {
      var inpt = this.InputsFactory.inputElm(['author', field])
      inpt.style.display = 'none'
      this.containers.author.append(inpt)
      ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vShow)(inpt, 'fade', 200)
    })
  }

  _setThreadsInputs() {
    var items = this.EditState.getIdsList()
    if (items.length) {
      var isLast = false
      for (var i = 0; i < items.length; i++) {
        if (i === items.length - 1) {
          isLast = true
        }
        this._setThread(items[i], i, isLast)
      }
    }
  }

  _setThread(id, idx, isLast = false) {
    var ident = this.EditState.newIdent(id, idx)
    var elms = this._newThreadLis(ident)
    for (let [name, elm] of Object.entries(elms)) {
      if (elm.style.display !== 'none') {
        elm.style.display = 'none'
        var type = 'ease'
          if (name === 'local') {
            type = 'fade'
          } 
        (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vPlace)(this.containers[name], elm, false, type, 200)
      } else {
        this.containers[name].append(elm)
      }
     
      if (isLast && name === "index" && (idx - 1) !== -1) {
          this.containers.index.childNodes[idx - 1].dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.updownEvt)
      }
    }
  }

  _newThreadLis(ident) {
    var elms = {}

    elms.distant = this._threadLi(ident)
    elms.local = this._threadLi(ident)
    elms.index = this._indexLi(ident)

    elms.distant.append(this._threadDistantForm(ident))
    elms.local.append(this.LocalFormFactory.newThreadLocalForm(ident, elms.index))

    this._setdeleteThreadElm(elms, ident)
    return elms
  }

  _addThreadHandler() {
    if (!this.addThreadBtn.disabled) {
      var randomId = (0,_i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_0__.randomString)(10)
      var idx = this.EditState.getThreadsCount()
      this.EditState.pushThread((0,_NxEditStarters__WEBPACK_IMPORTED_MODULE_7__.newThread)(randomId))
      this._setThread(randomId, idx, true)
      this.EditMenu.toggleSaveBtn(false)
      ;(0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.toggleAddBtn)(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    }
  }

  _linkInput(addLinkBtn, form, ident, i) {
    var lkident = this.EditState.registerLinkedThread(ident, i)

    var linkwrap = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-edit-distant-link')
    var store = { linked: null }
    var elm = this.InputsFactory.inputElm(['threads', ident, 'linked', lkident], null, store)
    var dltBtn = this._baseDeleteLinkBtn()
    var delwrap = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-distant-link-action')
    delwrap.append(dltBtn)

    dltBtn.addEventListener('click', () => {
      var act = function (redo) {
        var linked = this.EditState.getLinkedUrls(ident)
        if (redo) {
          (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vHide)(linkwrap, 'ease', 200, function () {
            linkwrap.remove()
          })
          this.EditState.removeLinkedThread(ident, lkident)
        } else {
          var lidx = this.EditState.getLinkedThreadIdx(ident, lkident)
          var isLast = lidx === linked.length
          this.EditState.insertLinkedThread(ident, lkident, store.linked.value)
          if (isLast) {
            (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vPlace)(form, linkwrap, false, 'ease', 200)
          } else {
            var nextSibling = form.childNodes[lidx]
            form.insertBefore(linkwrap, nextSibling)
            ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vShow)(linkwrap, 'ease', 200)
          }
        }
        (0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.toggleAddBtn)(addLinkBtn, linked, 'linked')
      }.bind(this)
      this.EditMenu.setLastAction(act)
      act(true)
    })
    linkwrap.append(elm, delwrap)
    return linkwrap
  }

  _threadDistantForm(ident) {
    var form = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('FORM', 'nx-thread-distant-form')
    var addLinkBtn = (0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.addBtn)()
    ;(0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.toggleAddBtn)(addLinkBtn, this.EditState.getLinkedUrls(ident), 'linked')
    addLinkBtn.addEventListener('click', () => {
      if (!addLinkBtn.disabled) {
        this.EditState.pushLinkedThread(ident, '')
        ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vPlace)(form, this._linkInput(addLinkBtn, form, ident, this.EditState.getLinkedUrlsCount(ident) - 1),false, 'ease', 200)
        ;(0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.toggleAddBtn)(addLinkBtn, this.EditState.getLinkedUrls(ident), 'linked')
      }
    })
    var linkedCount = this.EditState.getLinkedUrlsCount(ident)
    if (linkedCount) {
      var elms = []
      for (var i = 0; i < linkedCount; i++) {
        var elm = this._linkInput(addLinkBtn, form, ident, i)
        elms.push(elm)
      }
      form.append(...elms)
    }

    var formCnt = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV')
    formCnt.append((0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.landmarkElm)('linked threads'), form, addLinkBtn)

    return formCnt
  }

  _threadLi(ident) {
    var li = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('LI')

    if (!this.EditState.isCurrentId(ident)) {
      li.style.display = 'none'
    }
    li.addEventListener(
      'ThreadChange',
      function () {
        if (this.EditState.isCurrentId(ident)) {
          setTimeout(function () {
            (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vShow)(li, 'ease', 200)
          }, 200)
        } else {
          (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vHide)(li, 'ease', 200)
        }
      }.bind(this)
    )
    return li
  }

  _setdeleteThreadElm(elms, ident) {
    var btn = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('BUTTON', 'nx-delete-thread')
    btn.type = 'button'
    btn.textContent = '-'

    btn.addEventListener(
      'click',
      function () {
        this._deleteEvent(elms, ident)
      }.bind(this)
    )
    elms.index.append(btn)
  }


  _deleteEvent(elms, ident) {
    var threadData = Object.assign({}, this.EditState.getThreadData(ident))
    var act = function (redo) {
      var idx = this.EditState.getThreadIdx(ident)
      var len = this.EditState.getThreadsCount()

      if (redo) {

        this.EditState.removeThread(ident)

        Object.values(elms).forEach((elm) => {
          ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vHide)(elm, 'ease', 200, function () {
            elm.remove()
          })
        })
     
        if (len > 1) {
          var sibling = null

          if (idx === 0) {
            sibling = elms.index.nextSibling
          } else if (idx === len - 1) {
            sibling = elms.index.previousSibling
          }
          if(sibling){
            sibling.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.updownEvt)

          }
        }

        if (this.EditState.isCurrentId(ident)) {
          elms.distant.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.threadChangeEvt)
          elms.local.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.threadChangeEvt)
        }
      } else {
        this.EditState.insertThread(ident, threadData)
        if (idx <= len - 1) {
          var next = this.containers.index.childNodes[idx]
          this.containers.index.insertBefore(elms.index, next)
          if (idx === 0) {
            next.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.updownEvt)
          }
        } else {
          this.containers.index.append(elms.index)
          if (len > 1) {
            elms.index.previousSibling.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.updownEvt)
          }
        }

        this.containers.local.append(elms.local)
        this.containers.distant.append(elms.distant)

        ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vShow)(elms.index, 'ease', 200)
        elms.index.firstChild.click()
      }
      (0,_NxAddBtn__WEBPACK_IMPORTED_MODULE_4__.toggleAddBtn)(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    }.bind(this)
    this.EditMenu.setLastAction(act)
    act(true)
  }

  _indexLi(ident) {
    var elm = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('LI')
    elm.dataset.ident = ident
    elm.append(this._indexLink(ident))
    this._setMoveBtns(elm, ident)
    return elm
  }

  _indexLink(ident) {
    var itemState = this.EditState.getAltEditState(ident)
    var indLk = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.baseViewLink)(itemState, false)
    if (this.EditState.isCurrentId(ident)) {
      indLk.classList.add('nx-on-display')
    }

    indLk.addEventListener('click', () => {
      if (!this.EditState.isCurrentId(ident)) {
        this.EditState.changeCurrentThread(ident)
        var prev = this.containers.index.querySelector('.nx-on-display')
        if (prev) {
          prev.classList.remove('nx-on-display')
        }
        indLk.classList.add('nx-on-display')
        this.containers.local.childNodes.forEach((lchild) => {
          lchild.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.threadChangeEvt)
        })
        this.containers.distant.childNodes.forEach((dchild) => {
          dchild.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.threadChangeEvt)
        })
      }
    })

    return indLk
  }

  _toggleActiveBtn(ident, btn) {
    if (this.EditState.isFirstThread(ident)) {
      (0,_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.toggleDisabled)(btn['up'], true)
    } else {
      (0,_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.toggleDisabled)(btn['up'], false)
    }
    if (this.EditState.isLastThread(ident)) {
      (0,_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.toggleDisabled)(btn['down'], true)
    } else {
      (0,_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.toggleDisabled)(btn['down'], false)
    }
  }

  _permuteThread(goingUp, goingDown) {
    this.containers.index.removeChild(goingUp)
    this.containers.index.insertBefore(goingUp, goingDown)
    goingDown.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.updownEvt)
    goingUp.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_5__.updownEvt)
  }

  _moveItemHandler(li, it, ident) {
    var act = function (redo) {
      var isUp = it == 'up'
      if (!redo) {
        isUp = !isUp
      }
      var sibling
      if (isUp && !this.EditState.isFirstThread(ident)) {
        sibling = li.previousSibling
        this.EditState.moveThread(ident, sibling.dataset.ident, true)
        this._permuteThread(li, sibling)
      } else if (!isUp && !this.EditState.isLastThread(ident)) {
        sibling = li.nextSibling
        this.EditState.moveThread(ident, sibling.dataset.ident, false)
        this._permuteThread(sibling, li)
      }
    }.bind(this)

    this.EditMenu.setLastAction(act)
    act(true)
  }

  _setMoveBtns(li, ident) {
    var dv = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-edit-move')
    var btn = {
      up: null,
      down: null,
    }
    li.addEventListener(
      'IndexChange',
      function () {
        this._toggleActiveBtn(ident, btn)
      }.bind(this)
    )
    Object.keys(btn).forEach((it) => {
      btn[it] = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('A', 'nx-edit-move-' + it)
      btn[it].append((0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.iconImage)(this.btnSrc[it], 16))
      dv.append(btn[it])

      btn[it].addEventListener(
        'click',
        function () {
          this._moveItemHandler(li, it, ident)
        }.bind(this)
      )
    })
    this._toggleActiveBtn(ident, btn)
    li.append(dv)
  }

  _baseDeleteLinkBtn() {
    var btn = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_2__.getElm)('BUTTON', 'nx-delete-link')
    btn.type = 'button'
    btn.textContent = '-'
    return btn
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
/* harmony export */   "NxEditMenu": () => (/* binding */ NxEditMenu)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxStamper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxStamper */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/NxIcons.js */ "./src/shared/NxIcons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _NxEditCommons_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NxEditCommons.js */ "./src/editor/NxEditCommons.js");
/* harmony import */ var _NxEditStarters_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NxEditStarters.js */ "./src/editor/NxEditStarters.js");











class NxEditMenu {
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
      ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.toggleNavEnd)(this.actCtrls)
      this.toggleSaveBtn(false)
    }
  }
  setResetting(bool) {
    this.resetting = bool
  }

  toggleSaveBtn(disabled = false) {
      (0,_NxEditCommons_js__WEBPACK_IMPORTED_MODULE_8__.toggleDisabled)(this.saveBtn, disabled)
  }
  _displayFeedback(msg) {
    var txt = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate__WEBPACK_IMPORTED_MODULE_6__.getTxt)(msg)
    if (this.feedbackrun) {
      clearTimeout(this.feedbackrun)
    }
    (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_7__.vSplitFlap)(this.actionFdbck, txt, 25)
    this.feedbackrun = setTimeout(
      function () {
        ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_7__.vSplitFlap)(this.actionFdbck, '', 25)
      }.bind(this),
      1500 + txt.length * 20
    )
  }

  _resetData(data, url) {
    var prvState = this.EditState.getJsonState()
    if (data === null) {
      data = (0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_9__.newData)()
    }
    var state = (0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_9__.newState)(data, url)
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
      this.menu.dispatchEvent(_NxEditCommons_js__WEBPACK_IMPORTED_MODULE_8__.stateChangeEvt)
      this.filename = this.EditState.resolveFilename()
      this.resetting = false
    }.bind(this)
    act(true)
    this.setLastAction(act, true)
  }

  _setActionFeedback() {
    this.feedbackrun = null
    this.actionFdbck = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('SPAN', 'nx-action-feedback')
  }

  _setDownloadBtn() {
    this.filename = 'nexus.json'
    this.dlBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('A', 'nx-download')
    this.dlBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.downloadB64, 20))
    this.dlBtn.addEventListener(
      'click',
      function () {
        var data = Object.assign({}, this.EditState.state.srcData)
        delete data.index
        var check = (0,_i_is_as_i_does_nexus_core_src_validt_NxStamper__WEBPACK_IMPORTED_MODULE_3__.validData)(data)
        if (!check) {
          this._displayFeedback('Invalid Nexus data')
        }
        data = JSON.stringify(data, undefined, 2)
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data)
        var anchor = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('A')
        anchor.setAttribute('href', dataStr)
        anchor.setAttribute('download', 'nexus.json')
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
      }.bind(this)
    )
  }

  _setNewDocumenBtn() {
    this.newBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('A', 'nx-new')
    this.newBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.newB64, 20))
    this.newBtn.addEventListener(
      'click',
      function () {
        this._resetData((0,_NxEditStarters_js__WEBPACK_IMPORTED_MODULE_9__.newData)(), 'nexus.json')
      }.bind(this)
    )
  }

  _setOpenBtn() {
    this._setFileInput()
    this.openBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('A', 'nx-open-file')
    this.openBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.openB64, 20))
    this.openBtn.addEventListener(
      'click',
      function () {
        this.fileInput.click()
      }.bind(this)
    )
    this.openWrap = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('SPAN')
    this.openWrap.append(this.fileInput, this.openBtn)
  }

  _setFileInput() {
    this.fileInput = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('INPUT')
    this.fileInput.type = 'file'
    this.fileInput.accept = 'application/json'
    this.fileInput.addEventListener(
      'change',
      function (evt) {
        var filename = evt.target.files[0].name
        ;(0,_i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__.loadSrcFile)(evt, true)
          .then((fdata) => {
            fdata.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__.getThreadsList)(fdata)
            this._resetData(fdata, filename)
          })
          .catch((err) => {
            (0,_i_is_as_i_does_nexus_core_src_logs_NxLog__WEBPACK_IMPORTED_MODULE_1__.logErr)(err.message)
            this._displayFeedback('Invalid source')
          })
        this.fileInput.value = ''
      }.bind(this)
    )
    this.fileInput.style.display = 'none'
  }

  _setSaveBtn() {
    this.saveBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('A', 'nx-save')
    this.saveBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.saveB64, 20))
    this.toggleSaveBtn(true)
    this.saveBtn.addEventListener(
        'click',
        function () {
          if (!this.saveBtn.classList.contains('nx-disabled')) {
            (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_2__.registerEditData)(this.EditState.cacheName, this.EditState.state.srcData)
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
    (0,_NxEditCommons_js__WEBPACK_IMPORTED_MODULE_8__.toggleDisabled)(this.resetBtn, disb)
  }

  _setResetBtn() {
    this.resetBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('A', 'nx-reset')
    this.resetBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.resetB64, 20))

    this._setResetStatus()
    this.resetBtn.addEventListener(
      'click',
      function () {
        if (!this.resetBtn.classList.contains('nx-disabled')) {
          this._resetData(JSON.parse(this.EditState.originData), this.EditState.originUrl)
          ;(0,_NxEditCommons_js__WEBPACK_IMPORTED_MODULE_8__.toggleDisabled)(this.resetBtn, true)
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

    this.editLinks = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('DIV')
    this.editLinks.append(this.resetBtn, this.newBtn, this.openWrap, this.saveBtn, this.dlBtn)
    this.editNav = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('DIV', 'nx-edit-nav')
    this.editNav.append(this.actionFdbck, this.editLinks)
  }

  _setEditActions() {
    this.resetting = false
    this.lastAction = { act: null }
    this.actCtrls = {
      ctrls: {
        prev: { symbol: _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.undoB64, elm: null },
        next: { symbol: _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_5__.redoB64, elm: null },
      },
      position: 0,
      count: 1,
    }
    this.editActions = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('DIV', 'nx-edit-actions nx-history-nav')
    ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.setHistoryControls)(this.actCtrls, this._triggerUndoRedo.bind(this), true)
    this.editActions.append(this.actCtrls.ctrls['prev'].elm, this.actCtrls.ctrls['next'].elm)
  }

  _triggerUndoRedo(ctrl) {
    this.lastAction.act(ctrl === 'next')
    this.toggleSaveBtn(false)
  }

  _setMenu() {
    this._setEditNav()
    this._setEditActions()
    this.menu = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_4__.getElm)('DIV', 'nx-edit-menu')
    this.menu.append(this.editNav, this.editActions)
  }
}


/***/ }),

/***/ "./src/editor/NxEditStarters.js":
/*!**************************************!*\
  !*** ./src/editor/NxEditStarters.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newState": () => (/* binding */ newState),
/* harmony export */   "newData": () => (/* binding */ newData),
/* harmony export */   "newThread": () => (/* binding */ newThread)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");



function newState(data, url = 'nexus.json', id = '/', idx = -1) {
  return {
    dataUrl: url,
    srcData: data,
    threadId: id,
    threadIndex: idx,
  }
}

function newData() {
  var randomId = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.randomString)(10)
  return {
    nexus: _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_1__.appUrl,
    author: {
      handle: 'Anonymous-' + (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.randomInt)(100, 999),
      about: '',
      url: 'http://',
    },
    threads: [newThread(randomId)],
    index: [randomId],
  }
}

function newThread(randomId) {
  return {
    id: randomId,
    title: randomId,
    description: '...',
    content: {
      timestamp: new Date().toISOString().substring(0, 16),
      main: '...',
      aside: '',
      media: {
        url: '',
        type: '',
        caption: '',
      },
    },
    linked: [],
  }
}


/***/ }),

/***/ "./src/editor/NxEditState.js":
/*!***********************************!*\
  !*** ./src/editor/NxEditState.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxEditState": () => (/* binding */ NxEditState)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_base_NxHost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/base/NxHost */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _shared_NxState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxState */ "./src/shared/NxState.js");
/* harmony import */ var _NxEditStarters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NxEditStarters */ "./src/editor/NxEditStarters.js");







class NxEditState {
  constructor(state) {
    var tag = 'new'
    var url = 'nexus.json'
    var useState = false

    if ((0,_i_is_as_i_does_nexus_core_src_base_NxHost__WEBPACK_IMPORTED_MODULE_1__.getQuery)('edit')) {
      tag = 'current'
      if(state){
        if(state.dataUrl){
          url = state.dataUrl
        }   
        if(state.srcData){
          useState = true
        }
      }   
    }

    this.cacheName = tag+"#"+url
    this.originUrl = url
    var data = (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_3__.getStoredEditData)(this.cacheName)
    var register = false

    if(data === null){
      register = true
      if(useState){
        data = state.srcData
      } else {
        data = (0,_NxEditStarters__WEBPACK_IMPORTED_MODULE_5__.newData)()
      }
    }

    if (!data.index) {
      register = true
      data.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_2__.getThreadsList)(data)
    }
    if(register){
      (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_3__.registerEditData)(this.cacheName, data)
    }

    var origin = data
    if (useState) {
      origin = state.srcData
    }
    this.originData = JSON.stringify(origin)

    var id = '/'
    var idx = -1
    if(useState && state.threadId !== '/' && data.index.includes(state.threadId)){
      id = state.threadId
      idx = data.index.indexOf(state.threadId)
    } else if(data.threads.length){
      id = data.threads[0].id
      idx = 0
    }

    this.state = (0,_NxEditStarters__WEBPACK_IMPORTED_MODULE_5__.newState)(data, url, id, idx)
    this.threadsMap = {} // @doc originIdx: { id: currentId, idx: currentIdx, linked :{}}
  }

  /* whole state methods */

  getState() {
    return this.state
  }

  getOriginData() {
    return this.originData
  }

  getJsonState() {
    return JSON.stringify(this.state)
  }

  getAltEditState(ident) {
    return (0,_shared_NxState__WEBPACK_IMPORTED_MODULE_4__.getAltState)(this.state, this.getThreadId(ident), this.getThreadIdx(ident))
  }

  setNewState(jsonState) {
    this.state = Object.assign({}, JSON.parse(jsonState))
  }

  /* form methods */

  setAuthorValue(ref, value) {
    if (!this.state.srcData.author) {
      this.state.srcData.author = {}
    }
    this.state.srcData.author[ref[1]] = value
  }

  setThreadIndex(ident) {
    if (!this.state.srcData.threads) {
      this.state.srcData.threads = []
    } else {
      var idx = this.getThreadIdx(ident)
      if (typeof this.state.srcData.threads[idx] === 'undefined') {
        this.state.srcData.threads[idx] = {}
      }
    }
  }

  setThreadId(ref, value) {
    this.threadsMap[ref[1]].id = value
    var idx = this.getThreadIdx(ref[1])
    this.state.srcData.index[idx] = value
    this.state.srcData.threads[idx].id = value
  }

  setThreadInfo(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    this.state.srcData.threads[idx][ref[2]] = value
  }

  setContentValue(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    if (!this.state.srcData.threads[idx].content) {
      this.state.srcData.threads[idx].content = {}
    }
    if (ref[3] !== 'media') {
      this.state.srcData.threads[idx].content[ref[3]] = value
      return
    }
    if (!this.state.srcData.threads[idx].content.media) {
      this.state.srcData.threads[idx].content.media = {}
    }
    this.state.srcData.threads[idx].content.media[ref[4]] = value
  }

  setLinkedValue(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    if (!this.state.srcData.threads[idx].linked) {
      this.state.srcData.threads[idx].linked = [value]
    } else {
      var lidx = this.getLinkedThreadIdx(ref[1], ref[3])
      this.state.srcData.threads[idx].linked[lidx] = value
    }
  }

  setNewValue(ref, value) {
    if (this.state.srcData === null) {
      this.state.srcData = {}
      this.state.srcData.index = []
    }
    if (ref[0] === 'author') {
      return this.setAuthorValue(ref, value)
    }
    this.setThreadIndex(ref[1])

    if (ref[2] === 'id') {
      return this.setThreadId(ref, value)
    }
    if (!['linked', 'content'].includes(ref[2])) {
      return this.setThreadInfo(ref, value)
    }

    if (ref[2] === 'content') {
      return this.setContentValue(ref, value)
    }
    this.setLinkedValue(ref, value)
  }

  getValue(ref) {
    if (this.state.srcData) {
      if (ref[0] === 'author') {
        return this.state.srcData.author[ref[1]]
      }
      var idx = this.getThreadIdx(ref[1])
      if (!['linked', 'content'].includes(ref[2])) {
        return this.state.srcData.threads[idx][ref[2]]
      }
      if (ref[2] === 'content') {
        if (ref[3] !== 'media') {
          return this.state.srcData.threads[idx].content[ref[3]]
        }
        return this.state.srcData.threads[idx].content.media[ref[4]]
      }
      var lidx = this.getLinkedThreadIdx(ref[1], ref[3])
      return this.state.srcData.threads[idx].linked[lidx]
    }
    return ''
  }

  /* state infos methods */

  getThreadId(ident) {
    return this.threadsMap[ident].id
  }

  getThreadIdx(ident) {
    var idx = this.threadsMap[ident].idx
    var count = this.getThreadsCount()
    if (idx >= count) {
      idx = count - 1
      this.threadsMap[ident].idx = idx
      if (this.isCurrentId(ident)) {
        this.state.threadIndex = idx
      }
    }
    return idx
  }

  getIdsList() {
    return this.state.srcData.index
  }

  getThreadsCount() {
    return this.state.srcData.index.length
  }

  getCurrentThreadId() {
    return this.state.threadId
  }

  getCurrentThreadIdx() {
    return this.state.threadIndex
  }

  isCurrentId(ident) {
    return this.threadsMap[ident].id === this.state.threadId
  }

  resolveFilename(){
    var filename = 'nexus.json'
    if(this.state.dataUrl && this.state.dataUrl !== filename){
      var sp = this.state.dataUrl.split('/').filter(it => it)
      if(sp.length){
        filename = sp.pop()
        if(filename.slice(-5) !== '.json'){
          filename += '.json'
        }
        filename = (0,_i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_0__.replaceDiacritics)(filename)
      }
    }
    return filename
  }


  /* specific thread methods */

  unsetCurrentThread() {
    this.state.threadId = '/'
    this.state.threadIndex = -1
  }

  isFirstThread(ident) {
    return this.getThreadIdx(ident) === 0
  }

  isLastThread(ident) {
    return this.getThreadIdx(ident) + 1 === this.getThreadsCount()
  }

  getThreadData(ident) {
    var idx = this.getThreadIdx(ident)
    var threadData = this.state.srcData.threads[idx]
    if (!threadData) {
      this.state.srcData.threads[idx] = {}
    }
    return threadData
  }

  removeThread(ident) {
    var idx = this.getThreadIdx(ident)
    this.state.srcData.index.splice(idx, 1)
    this.state.srcData.threads.splice(idx, 1)

    if (!this.isLastThread(ident)) {
      for (let [k, v] of Object.entries(this.threadsMap)) {
        if (v.idx > idx) {
          this.threadsMap[k].idx = v.idx - 1
        }
      }
    }

    if (this.isCurrentId(ident)) {
      this.unsetCurrentThread()
    } else if (this.state.threadIndex > idx) {
      this.state.threadIndex--
    }
  }

  insertThread(ident, threadData) {
    if (this.isLastThread(ident)) {
      this.pushThread(threadData)
    } else {
      var idx = this.getThreadIdx(ident)
      this.state.srcData.index.splice(idx, 0, threadData.id)
      this.state.srcData.threads.splice(idx, 0, threadData)
      for (let [k, v] of Object.entries(this.threadsMap)) {
        if (v.id !== threadData.id && v.idx >= idx) {
          this.threadsMap[k].idx = v.idx + 1
        }
      }
      if (this.state.threadIndex >= idx) {
        this.state.threadIndex++
      }
    }
  }

  newIdent(id, idx) {
    var ident = (0,_i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_0__.randomString)(21)
    this.threadsMap[ident] = { id: id, idx: idx, linked: {} }
    return ident
  }

  changeCurrentThread(ident) {
    this.state.threadId = this.getThreadId(ident)
    this.state.threadIndex = this.getThreadIdx(ident)
  }

  moveThread(ident, siblingIdent, up = false) {
    var from = this.getThreadIdx(ident)
    var to = from + 1
    if (up) {
      to = from - 1
    }
    this.state.srcData.index.splice(to, 0, this.state.srcData.index.splice(from, 1)[0])
    this.state.srcData.threads.splice(to, 0, this.state.srcData.threads.splice(from, 1)[0])
    this.threadsMap[ident].idx = to
    this.threadsMap[siblingIdent].idx = from

    if (this.isCurrentId(ident)) {
      this.state.threadIndex = to
    } else if (this.isCurrentId(siblingIdent)) {
      this.state.threadIndex = from
    }
  }

  pushThread(threadData) {
    this.state.srcData.threads.push(threadData)
    this.state.srcData.index.push(threadData.id)
  }

  /* linked threads methods */

  getLinkedThreadIdx(ident, lkident) {
    var idx = this.threadsMap[ident].linked[lkident].idx
    var count = this.getLinkedUrlsCount(ident)
    if (idx >= count) {
      idx = count - 1
      this.threadsMap[ident].linked[lkident].idx = idx
    }
    return idx
  }

  getLinkedUrls(ident) {
    var threadData = this.getThreadData(ident)
    if (!Object.prototype.hasOwnProperty.call(threadData, 'linked')) {
      var idx = this.getThreadIdx(ident)
      this.state.srcData.threads[idx].linked = []
      return []
    }
    return threadData.linked
  }

  getLinkedUrlsCount(ident) {
    return this.getLinkedUrls(ident).length
  }

  registerLinkedThread(ident, linkIdx) {
    var lkident = (0,_i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_0__.randomString)(21)
    this.threadsMap[ident].linked[lkident] = { idx: linkIdx }
    return lkident
  }

  isLastLinkedThread(ident, lkident) {
    return this.getLinkedThreadIdx(ident, lkident) === this.getLinkedUrlsCount(ident) - 1
  }

  removeLinkedThread(ident, lkident) {
    var tidx = this.getThreadIdx(ident)
    var lidx = this.getLinkedThreadIdx(ident, lkident)
    if (lidx === this.getLinkedUrlsCount(ident) - 1) {
      this.state.srcData.threads[tidx].linked.pop()
    } else {
      this.state.srcData.threads[tidx].linked.splice(lidx, 1)
      for (let [k, v] of Object.entries(this.threadsMap[ident].linked)) {
        if (v.idx > lidx) {
          this.threadsMap[ident].linked[k].idx = v.idx - 1
        }
      }
    }
  }

  pushLinkedThread(ident, value) {
    var idx = this.getThreadIdx(ident)
    if(!this.state.srcData.threads[idx].linked){
      this.state.srcData.threads[idx].linked = []
    }
      this.state.srcData.threads[idx].linked.push(value)
  }

  insertLinkedThread(ident, lkident, value) {
    if (this.isLastLinkedThread(ident, lkident)) {
      this.pushLinkedThread(ident, value)
    } else {
      var tidx = this.getThreadIdx(ident)
      var lidx = this.getLinkedThreadIdx(ident, lkident)
      this.state.srcData.threads[tidx].linked.splice(lidx, 0, value)
      for (let [k, v] of Object.entries(this.threadsMap[ident].linked)) {
        if (v.idx >= lidx && k !== lkident) {
          this.threadsMap[ident].linked[k].idx = v.idx + 1
        }
      }
    }
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
/* harmony export */   "NxEditSwitch": () => (/* binding */ NxEditSwitch)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/NxIcons.js */ "./src/shared/NxIcons.js");




class NxEditSwitch {
  constructor(editInst, readerInst, readerUpdatePromise) {
    this.editInst = editInst
    this.readerInst = readerInst

    this.readerUpdatePromise = readerUpdatePromise

    this.previewOn = false
    this._setSwitchBtn()
  }

  getSwitchBtn() {
    return this.switchBtn
  }

  _instanceSwitch() {
    this.previewOn = !this.previewOn

    if (this.previewOn) {
      (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide)(this.editInst, 'fade', 200,  function () {
        this.readerUpdatePromise().then(()=> {
          this.switchBtn.firstChild.src = _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__.editB64
          ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShow)(this.readerInst, 'fade', 200)
        })
      }.bind(this))
    } else {
      (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide)(this.readerInst, 'fade', 200,  function () {
        this.switchBtn.firstChild.src = _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__.previewB64
        ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShow)(this.editInst, 'fade', 200)
      }.bind(this))
    }
  }

  _setSwitchBtn() {
    this.switchBtn = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('A', 'nx-edit-switch')
    this.switchBtn.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_2__.previewB64, 25))

    this.switchBtn.addEventListener('click', this._instanceSwitch.bind(this))
  }
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
/* harmony import */ var _NxEditInstance_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxEditInstance.js */ "./src/editor/NxEditInstance.js");
/* harmony import */ var _NxEditSwitch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxEditSwitch.js */ "./src/editor/NxEditSwitch.js");
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _NxEditState_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NxEditState.js */ "./src/editor/NxEditState.js");







function editorElms(seed) {
  var EditState = new _NxEditState_js__WEBPACK_IMPORTED_MODULE_5__.NxEditState(seed.state)
  var EditInstance = new _NxEditInstance_js__WEBPACK_IMPORTED_MODULE_2__.NxEditInstance(EditState)

  var editInst = EditInstance.getInstanceElms()

  var readerSeed = {
    editMode: true,
    state: Object.assign({}, EditState.getState()),
  }
  var readerInst = (0,_reader_NxReader_js__WEBPACK_IMPORTED_MODULE_0__.readerElms)(readerSeed)
  readerInst.style.display = 'none'

  var readerUpdatePromise = function () {
   ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__.triggerUpdate)(EditState.state, true, true)
   return new Promise(function(resolve) {
    setTimeout(resolve, 100);
})
  }
  var EditSwitch = new _NxEditSwitch_js__WEBPACK_IMPORTED_MODULE_3__.NxEditSwitch(editInst, readerInst, readerUpdatePromise)
  var switchBtn = EditSwitch.getSwitchBtn()

  var editor = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', 'nx-editor')
  editor.append(editInst, readerInst, switchBtn)

  return editor
}


/***/ }),

/***/ "./src/editor/NxInputsFactory.js":
/*!***************************************!*\
  !*** ./src/editor/NxInputsFactory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxInputsFactory": () => (/* binding */ NxInputsFactory)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxStamper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxStamper */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/* harmony import */ var _shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/NxCommons */ "./src/shared/NxCommons.js");
/* harmony import */ var _shared_NxIcons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/NxIcons */ "./src/shared/NxIcons.js");
/* harmony import */ var _NxEditCommons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NxEditCommons */ "./src/editor/NxEditCommons.js");









class NxInputsFactory {
  constructor(EditState, EditMenu) {
    this.EditState = EditState
    this.EditMenu = EditMenu
  }

  inputElm(ref, callback = null, store = null) {
    var idents = this._fieldIdents(ref)
    var inp = this._resolveInput(idents, ref)

    var lb = this._baseLabel(idents.alias)
    var indc = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('SPAN', 'nx-edit-indication')
    var fdbck = this._invalidSp()
    lb.append(indc, fdbck)
    this._setConditions(idents, inp, indc)

    if (store) {
      store[idents.field] = inp
    }
    var wrap = this._wrapInput(idents, inp, lb)

    this._setInputEvt(ref, inp, fdbck, callback)
    this._inputEvtHandler(ref, inp, fdbck, callback)

    return wrap
  }

  _setConditions(idents, inp, indc) {
    switch (idents.field) {
      case 'url':
        indc.textContent = '[http]'
        inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_3__.urlPattern
        break
      case 'linked':
        indc.textContent = '[http]'
        inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_3__.urlPattern
        break
      case 'id':
        indc.textContent = '[A-Za-z0-9-][3-36]'
        inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_3__.idPattern
        break
      case 'type':
        inp.pattern = '(' + _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_3__.supportedMediaTypes.join('|') + ')'
        break
      case 'timestamp':
        break
      default:
        var minmax = _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_3__.charMinMax[idents.field]
        indc.textContent = '[' + minmax[0] + '-' + minmax[1] + ']'
        inp.setAttribute('maxlength', minmax[1])
        inp.setAttribute('minlength', minmax[0])
    }
  }

  _wrapInput(idents, inp, lb) {
    var wrap = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-edit-input nx-edit-' + idents.parent + '-' + idents.field)
    wrap.append(lb)
    if (idents.field === 'type') {
      wrap.append(this._typeDropDown(inp))
    } else {
      wrap.append(inp)
    }
    return wrap
  }

  _typeDropDown(inp) {
    var items = _i_is_as_i_does_nexus_core_src_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_3__.supportedMediaTypes
    return (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.selectDropDown)(items, inp, null, 'nx-edit-media-type-select')
  }

  _fieldIdents(ref) {
    var idents = {}
    var pos = ref.length - 1
    if (ref[pos - 1] === 'linked') {
      pos--
    }
    idents.field = ref[pos]
    pos--
    if (ref[pos - 1] === 'threads') {
      pos--
    }
    idents.parent = ref[pos]
    idents.alias = idents.field
    if (idents.field === 'linked') {
      idents.alias = 'url'
    }
    return idents
  }

  _isLongTextInput(idents) {
    return ['about', 'description', 'main', 'aside', 'caption'].includes(idents.field)
  }

  _isRequired(idents) {
    return ['handle', 'title', 'main', 'id', 'url', 'type', 'timestamp', 'linked'].includes(
      idents.field
    )
  }

  _resolveInput(idents, ref) {
    var val = this.EditState.getValue(ref)
    var inp
    if (this._isLongTextInput(idents)) {
      inp = this._textareaInput(val)
    } else if (idents.field == 'timestamp') {
      inp = this._dateInput(val)
    } else {
      inp = this._textInput(val)
    }
    inp.classList.add('nx-edit-input')

    var hook = ref.join('-')
    inp.id = hook
    inp.name = hook
    if (this._isRequired(idents)) {
      inp.required = true
    }
    return inp
  }

  _textInput(val) {
    var inp = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('INPUT', 'nx-edit-text')
    inp.type = 'text'
    inp.value = val
    return inp
  }

  _textareaInput(val) {
    var inp = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('TEXTAREA', 'nx-edit-textarea')
    inp.textContent = val
    return inp
  }
  _dateInput(val) {
    var inp = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('INPUT', 'nx-edit-date')
    inp.type = 'datetime-local'
    inp.value = val
    return inp
  }

  _baseLabel(field) {
    var lb = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('LABEL', 'nx-edit-label')
    lb.for = field
    var title = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('SPAN', 'nx-edit-title')
    title.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate__WEBPACK_IMPORTED_MODULE_1__.getTxt)(field)
    ;(0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate__WEBPACK_IMPORTED_MODULE_2__.registerTranslElm)(title, field)
    lb.append(title)
    return lb
  }

  _invalidSp() {
    var sp = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.getElm)('SPAN', 'nx-edit-feedback')
    sp.append((0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_5__.iconImage)(_shared_NxIcons__WEBPACK_IMPORTED_MODULE_6__.invalidB64))
    return sp
  }

  _inputEvtHandler(ref, inp, fdbck, callback) {
    var valid = inp.checkValidity()
    var validPromise = null

    if ((valid && ref.includes('url')) || ref.includes('linked')) {
      valid = (0,_i_is_as_i_does_nexus_core_src_validt_NxStamper__WEBPACK_IMPORTED_MODULE_4__.isValidUrl)(inp.value)
      if (valid && ref.includes('linked')) {
        valid = (0,_NxEditCommons__WEBPACK_IMPORTED_MODULE_7__.isUnique)(
          this.EditState.getLinkedUrls(ref[1]),
          inp.value,
          this.EditState.getLinkedThreadIdx(ref[1], ref[3])
        )
        if (valid) {
          validPromise = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc__WEBPACK_IMPORTED_MODULE_0__.getSrcData)(inp.value)
            .then(() => {
              return true
            })
            .catch(() => {
              return false
            })
        }
      }
    } else if (ref.includes('id')) {
      var nId = (0,_NxEditCommons__WEBPACK_IMPORTED_MODULE_7__.uniqueId)(
        this.EditState.getIdsList(),
        inp.value,
        this.EditState.getThreadIdx(ref[1])
      )
      if (nId !== inp.value) {
        inp.value = nId
      }
      valid = true
    }

    if (validPromise === null) {
      validPromise = Promise.resolve(valid)
    }

    validPromise.then((isValid) => {
      this.EditState.setNewValue(ref, inp.value)
      this._setFeedbackIcon(fdbck, isValid)
      
      if (typeof callback === 'function') {
        callback(inp, isValid)
      }
    })
  }

  _setFeedbackIcon(fdbck, valid) {
    var icsrc = _shared_NxIcons__WEBPACK_IMPORTED_MODULE_6__.invalidB64
    if (valid) {
      icsrc = _shared_NxIcons__WEBPACK_IMPORTED_MODULE_6__.validB64
    }
    fdbck.firstChild.src = icsrc
  }

  _setInputEvt(ref, inp, fdbck, callback) {
    var undone = ''
    var prev = inp.value
    inp.addEventListener('focus', function () {
      prev = inp.value
    })
    inp.addEventListener('AutoUpdate', function () {
      this._inputEvtHandler(ref, inp, fdbck, callback)
    }.bind(this))
    inp.addEventListener(
      'change',
      function () {
        this._inputEvtHandler(ref, inp, fdbck, callback)
          var act = function (redo) {
            if (redo) {
              inp.value = undone
            } else {
              undone = inp.value
              inp.value = prev
            }
            this._inputEvtHandler(ref, inp, fdbck, callback)
          }.bind(this)
          this.EditMenu.setLastAction(act)
      }.bind(this)
    )
  }
}


/***/ }),

/***/ "./src/editor/NxLocalFormFactory.js":
/*!******************************************!*\
  !*** ./src/editor/NxLocalFormFactory.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxLocalFormFactory": () => (/* binding */ NxLocalFormFactory)
/* harmony export */ });
/* harmony import */ var _shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/NxCommons */ "./src/shared/NxCommons.js");
/* harmony import */ var _NxEditCommons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxEditCommons */ "./src/editor/NxEditCommons.js");



class NxLocalFormFactory {
  constructor(InputsFactory) {
    this.InputsFactory = InputsFactory
  }

  newThreadLocalForm(ident, indexElm) {
    var form = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__.getElm)('FORM', 'nx-thread-local-form')
    var fieldset1 = this._localFieldSet1(ident, indexElm)
    var fieldset2 = this._localFieldSet2(ident)
    var fieldset3 = this._localFieldSet3(ident)

    form.append(
      (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__.landmarkElm)('local thread'),
      fieldset1,
      (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__.landmarkElm)('content'),
      fieldset2,
      (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__.landmarkElm)('media'),
      fieldset3
    )
    return form
  }

  _localFieldSet1(ident, indexElm) {
    var fieldset1 = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__.getElm)('FIELDSET')

    var titleCallback = function (inp) {
      var targ = indexElm.querySelector('.nx-thread-title')
      if (targ.textContent !== inp.value) {
        targ.textContent = inp.value
      }
    }
    fieldset1.append(this.InputsFactory.inputElm(['threads', ident, 'id']))
    fieldset1.append(this.InputsFactory.inputElm(['threads', ident, 'title'], titleCallback))
    fieldset1.append(this.InputsFactory.inputElm(['threads', ident, 'description']))
    return fieldset1
  }

  _localFieldSet2(ident) {
    var fieldset2 = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__.getElm)('FIELDSET')
    var fields = ['timestamp', 'main', 'aside']
    fields.forEach((field) => {
      fieldset2.append(this.InputsFactory.inputElm(['threads', ident, 'content', field]))
    })
    return fieldset2
  }

  _localFieldSet3(ident) {
    var fieldset3 = (0,_shared_NxCommons__WEBPACK_IMPORTED_MODULE_0__.getElm)('FIELDSET')

    var store = { type:null }
    var typeInp = this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'type'], null, store)
    var typeCallback = function (inp, valid) {
      if (valid) {
        var guessedType = (0,_NxEditCommons__WEBPACK_IMPORTED_MODULE_1__.resolveMediaType)(inp.value)
        if(store.type.value !== guessedType){
          store.type.value = guessedType
          var prev = typeInp.querySelector('.nx-selected')
          if(prev){
            prev.classList.remove('nx-selected')
          }
          typeInp.querySelector('[data-item=' + guessedType + ']').classList.add('nx-selected')
          store.type.dispatchEvent(_NxEditCommons__WEBPACK_IMPORTED_MODULE_1__.autoUpdateEvt)
        }
      }
    }.bind(this)
    fieldset3.append(
      this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'url'], typeCallback)
    )
    fieldset3.append(typeInp)
    fieldset3.append(this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'caption']))
    return fieldset3
  }
}


/***/ })

}]);
//# sourceMappingURL=NxIOEdit.js.map