"use strict";
(self["webpackChunknexus_io"] = self["webpackChunknexus_io"] || []).push([["NxIORead"],{

/***/ "./src/reader/NxHistory.js":
/*!*********************************!*\
  !*** ./src/reader/NxHistory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "historyBlock": () => (/* binding */ historyBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxIdent.js */ "./src/reader/NxIdent.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Style.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Style.js");
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");






const historyMax = 100
var isHistoryEvent = false
var historyList = null
var historyElm = null

var historyState = {
  dataUrl: null,
  srcData: null,
  threadId: '/',
  threadIndex: -1,
}

var histCtrls = {
  ctrls: {
    prev: { symbol: '<', elm: null },
    next: { symbol: '>', elm: null },
  },
  position: 0,
  count: 1,
}

function historyNav() {
  var wrp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', 'nx-history-nav')
  ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setHistoryControls)(histCtrls, function (ctrl, pos) {
    var target = historyList.children[pos + 1].querySelector('.nx-thread-title')
    target.click()
  })
  wrp.append(histCtrls.ctrls['prev'].elm, historyToggleElm(), histCtrls.ctrls['next'].elm)
  return wrp
}
function historyToggleElm() {
  var tggl = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('A', 'nx-history-toggle')
  tggl.textContent = '≚'
  tggl.addEventListener('click', () => {
    if (tggl.textContent == '≙') {
      tggl.textContent = '≚'
      tggl.classList.remove('nx-active')
      ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide)(historyElm, 'ease', 200)
    } else {
      tggl.textContent = '≙'
      tggl.classList.add('nx-active')
      ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShow)(historyElm, 'ease', 200)
      ;(0,_i_is_as_i_does_jack_js_src_modules_Style_js__WEBPACK_IMPORTED_MODULE_3__.autoScrollToBottom)(historyList)
    }
  })
  return tggl
}

function setHistoryListElm(state) {
  historyList = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('UL', 'nx-history-list')
  var first = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('LI')
  first.textContent = '...'
  historyList.append(first)
  if (state && state.srcData) {
    historyState = state
    historyList.append(historyItm(state, 0))
  }
  historyElm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', 'nx-history-drawer')
  historyElm.append(historyList)
  historyElm.style.display = 'none'
  ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__.registerUpdateEvt)(function (newState, skipHistoryUpdate) {
    historyEvent(newState, skipHistoryUpdate)
  })
}

function historyEvent(state, skipHistoryUpdate) {
  if (
    !skipHistoryUpdate &&
    !isHistoryEvent &&
    (state.dataUrl !== historyState.dataUrl || state.threadId !== historyState.threadId)
  ) {
    historyState = state
    if (histCtrls.count > historyMax) {
      historyList.children[1].remove()
    } else {
      histCtrls.count++
    }

    histCtrls.position = histCtrls.count - 1
    var itm = historyItm(state, histCtrls.position)
    ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vPlace)(historyList, itm, false, 'ease', 200,function () {
      ;(0,_i_is_as_i_does_jack_js_src_modules_Style_js__WEBPACK_IMPORTED_MODULE_3__.autoScrollToBottom)(historyList)
    })
    ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.toggleNavEnd)(histCtrls)
  }
}

function viewElms(state, pos) {
  return [(0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorIndexLink)(state, false), (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorUrl)(state, false), historyViewLink(state, pos)]
}

function historyItm(state, pos) {
  var itm = document.createElement('LI')
  itm.append(...viewElms(state, pos))
  return itm
}

function historyViewLink(state, pos) {
  var viewlk = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.baseViewLink)(state, false)
  ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setToggleOnDisplay)(viewlk, state)

  viewlk.addEventListener('click', () => {
    isHistoryEvent = true
    ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__.triggerUpdate)(state, true)
    histCtrls.position = pos
    isHistoryEvent = false
  })
  return viewlk
}

function historyBlock(state) {
  setHistoryListElm(state)
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)('history', [historyNav(), historyElm], false)
}


/***/ }),

/***/ "./src/reader/NxIdent.js":
/*!*******************************!*\
  !*** ./src/reader/NxIdent.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authorHandle": () => (/* binding */ authorHandle),
/* harmony export */   "authorUrl": () => (/* binding */ authorUrl),
/* harmony export */   "setToggleUnseen": () => (/* binding */ setToggleUnseen),
/* harmony export */   "viewLink": () => (/* binding */ viewLink),
/* harmony export */   "authorIndexLink": () => (/* binding */ authorIndexLink)
/* harmony export */ });
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxStorage.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxStorage.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");






var urlStore = {}

function authorMiniUrl(authorUrl) {
  var url = (0,_i_is_as_i_does_nexus_core_src_storg_NxStorage_js__WEBPACK_IMPORTED_MODULE_2__.getStoredItem)(authorUrl, 'local', urlStore, false)
  if (!url) {
    url = (0,_i_is_as_i_does_jack_js_src_modules_Web_js__WEBPACK_IMPORTED_MODULE_3__.miniUrl)(authorUrl)
    ;(0,_i_is_as_i_does_nexus_core_src_storg_NxStorage_js__WEBPACK_IMPORTED_MODULE_2__.storeItem)(authorUrl, url, 'local', urlStore, false)
  }
  return url
}

function toggleUnseen(viewlk, state) {
  if (viewlk.classList.contains('nx-on-display')) {
    viewlk.classList.remove('nx-unseen')
    viewlk.lastChild.textContent = ''
  } else if ((0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__.isStateUnseen)(state)) {
    viewlk.classList.add('nx-unseen')
    viewlk.lastChild.textContent = '*'
  }
}

function authorHandle(state, update = false) {
  var hnd = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('SPAN', 'nx-handle')
  if (state.srcData) {
    hnd.textContent = state.srcData.author.handle
  }
  if (update) {
    (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__.registerUpdateEvt)(function (newState) {
      (0,_i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_4__.vSplitFlap)(hnd, newState.srcData.author.handle, 25)
    }, true)
  }
  return hnd
}

function authorUrl(state, update = false) {
  var authorlksp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('SPAN', 'nx-author-url')

  var urlBrck = []
  ;['[', ']'].forEach((bracket) => {
    var brsp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('SPAN', 'nx-author-url-brackets')
    brsp.textContent = bracket
    urlBrck.push(brsp)
  })
  var urla = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('A', 'nx-external-link')
  urla.target = '_blank'
  var hrf = ''
  if (state.srcData) {
    hrf = state.srcData.author.url
  }
  urla.href = hrf

  if (state.srcData) {
    urla.textContent = authorMiniUrl(state.srcData.author.url)
  }

  authorlksp.append(urlBrck[0], urla, urlBrck[1])

  if (update) {
    (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__.registerUpdateEvt)(function (newState) {
      urla.href = newState.srcData.author.url
      ;(0,_i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_4__.vSplitFlap)(urla, authorMiniUrl(newState.srcData.author.url), 25)
    }, true)
  }
  return authorlksp
}

function setToggleUnseen(viewlk, state) {
  viewlk.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('SPAN', 'nx-new-tag'))
  toggleUnseen(viewlk, state)
  ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__.registerUpdateEvt)(function () {
    toggleUnseen(viewlk, state)
  })
}

function viewLink(state, update = false) {
  var viewlk = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.baseViewLink)(state, update)
  if (state.threadId !== '/') {
    (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setToggleOnDisplay)(viewlk, state)
    setToggleUnseen(viewlk, state)
  }

  viewlk.addEventListener('click', () => {
    (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__.triggerUpdate)(state)
  })
  return viewlk
}

function authorIndexLink(state, update = false) {
  var auth = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('A', 'nx-author-link')
  auth.append(authorHandle(state, update))

  var newState = (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__.getAltState)(state, '/', -1)
  ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setToggleOnDisplay)(auth, newState)

  auth.addEventListener('click', function () {
    ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_0__.triggerUpdate)(newState, '/')
  })

  return auth
}


/***/ }),

/***/ "./src/reader/NxIndex.js":
/*!*******************************!*\
  !*** ./src/reader/NxIndex.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mainIndexBlock": () => (/* binding */ mainIndexBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxIdent.js */ "./src/reader/NxIdent.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");





var indexList = null

function aboutElm(state) {
  var ab = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)('DIV', 'nx-about-author')

  ab.append(aboutLines(state))
  ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
    ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vReplace)(ab.firstChild, aboutLines(newState), 200)
  }, true)
  return ab
}

function aboutLines(state) {
  var text = null
  if (state.srcData && state.srcData.author.about) {
    text = state.srcData.author.about
  }
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.lines)(text)
}

function setIndexList(state) {
  indexList = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)('UL')
  if (state.srcData) {
    var items = state.srcData.index

    if (items.length) {
      for (var i = 0; i < items.length; i++) {
        indexList.append(indexLi(state, items[i], i))
      }
    }
  }
  (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
    changeThreadsList(newState)
  }, true)
}

function indexLi(state, id, index) {
  var altState = (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_1__.getAltState)(state, id, index)

  var li = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)('LI')
  li.append((0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.viewLink)(altState, false))
  return li
}

function changeThreadsList(state) {
  var childr = indexList.childNodes
  var items = state.srcData.index
  var nwlen = items.length

  var chlen = childr.length

  var count = 0
  if (chlen) {
    var rmv = function (child) {
      (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide)(child, 'ease', 200, function () {
        child.remove()
      })
    }
    for (var x = 0; x < chlen; x++) {
      if (nwlen > x) {
        var nlink = indexLi(state, items[x], x)
        ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vReplace)(childr[x], nlink, 200)
        count++
      } else {
        rmv(childr[x])
      }
    }
  }
  if (count < nwlen) {
    for (var y = count; y < nwlen; y++) {
      (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vPlace)(indexList, indexLi(state, items[y], y), false, 'ease', 200)
    }
  }
}

function indexHeader(state) {
  var header = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)('DIV', 'nx-index-header')
  header.append((0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorHandle)(state, true), (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorUrl)(state, true), aboutElm(state))
  return header
}

function indexBlock(state) {
  setIndexList(state)
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.blockWrap)('threads-list', [indexList])
}

function mainIndexBlock(state) {
  var mainBlock = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)('DIV', 'nx-main-block nx-index')
  var blocks = [indexHeader(state), indexBlock(state)]
  mainBlock.append(...blocks)
  return mainBlock
}


/***/ }),

/***/ "./src/reader/NxMedia.js":
/*!*******************************!*\
  !*** ./src/reader/NxMedia.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mediaElm": () => (/* binding */ mediaElm)
/* harmony export */ });
/* harmony import */ var _NxThread_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NxThread.js */ "./src/reader/NxThread.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxMedia_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxMedia.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxMedia.js");




function threadMediaElm(threadData, countReady) {
  var mediaContainer = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', 'nx-media')

  var mediaWrap = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV')
  mediaContainer.append(mediaWrap)

  var captionElm = null
  if (threadData.content.media.caption) {
    captionElm = (0,_NxThread_js__WEBPACK_IMPORTED_MODULE_0__.threadTextElm)(threadData, ['content', 'media', 'caption'])
    mediaContainer.append(captionElm)
  }

  mediaWrap.addEventListener('mediaReady', function () {
    if (mediaWrap.firstChild.tagName === 'A' && threadData.content.media.type !== 'page') {
      threadData.content.media.type = 'page'
    }
    mediaWrap.className = 'nx-' + threadData.content.media.type + '-media'
    if (countReady !== null) {
      countReady()
    }
  })
  ;(0,_i_is_as_i_does_nexus_core_src_data_NxMedia_js__WEBPACK_IMPORTED_MODULE_2__.resolveMedia)(threadData.content.media.url, threadData.content.media.type, mediaWrap)
  return mediaContainer
}

function mediaElm(threadData, countReady = null) {
  var mediadiv = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', 'nx-content-media')
  mediadiv.append(threadMediaElm(threadData, countReady))
  return mediadiv
}


/***/ }),

/***/ "./src/reader/NxReader.js":
/*!********************************!*\
  !*** ./src/reader/NxReader.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readerElms": () => (/* binding */ readerElms)
/* harmony export */ });
/* harmony import */ var _NxHistory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NxHistory.js */ "./src/reader/NxHistory.js");
/* harmony import */ var _NxIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxIndex.js */ "./src/reader/NxIndex.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _NxSource_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxSource.js */ "./src/reader/NxSource.js");
/* harmony import */ var _NxThread_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxThread.js */ "./src/reader/NxThread.js");






function readerElms(seed) {
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.instanceWrap)((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.appHeader)(), [
    (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.serviceWrap)(
      [(0,_NxHistory_js__WEBPACK_IMPORTED_MODULE_0__.historyBlock)(seed.state)],
      [(0,_NxIndex_js__WEBPACK_IMPORTED_MODULE_1__.mainIndexBlock)(seed.state), (0,_NxThread_js__WEBPACK_IMPORTED_MODULE_4__.mainThreadBlock)(seed.state)],
      [(0,_NxSource_js__WEBPACK_IMPORTED_MODULE_3__.sourceBlock)(seed.state, seed.styleUrl, seed.editMode)],
      'reader'
    ),
  ])
}


/***/ }),

/***/ "./src/reader/NxSource.js":
/*!********************************!*\
  !*** ./src/reader/NxSource.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sourceBlock": () => (/* binding */ sourceBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Stock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Stock.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Stock.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxSnippet_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxSnippet.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSnippet.js");
/* harmony import */ var _shared_NxCdn_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/NxCdn.js */ "./src/shared/NxCdn.js");
/* harmony import */ var _shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/NxIcons.js */ "./src/shared/NxIcons.js");










var drawerElm = null
var editMode = false
var currentStyle = null

function actionLink(action, text) {
  var lk = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)('A', 'nx-source-' + action)
  lk.textContent = text
  return lk
}

function resolveSrc(state) {
  var src
  if (editMode) {
    src = '#editing'
  } else {
    src = (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__.concatSrc)(state)
  }
  return src
}

function linkContent(state) {
  if (state.dataUrl) {
    return resolveSrc(state)
  }
  return ''
}

function toolTip(className, text) {
  var tooltip = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)('SPAN', className)
  tooltip.textContent = text
  tooltip.style.opacity = 0
  tooltip.hidden = true
  ;(0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__.registerTranslElm)(tooltip, text)
  return tooltip
}

function toggleLink() {
  var text = '</>'
  var altText = '< />'
  var lk = actionLink('snippets', text)

  lk.addEventListener('click', () => {
    if (lk.textContent == altText) {
      lk.textContent = text
      lk.classList.remove('nx-active')
      ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vHide)(drawerElm, 'ease', 200)
    } else {
      lk.textContent = altText
      lk.classList.add('nx-active')
      ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vShow)(drawerElm, 'ease', 100, function () {
        drawerElm.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
          inline: 'nearest',
        })
      })
    }
  })
  return lk
}

function linkSource(state) {
  return codeElm('json', textAreaElm(state, linkContent))
}

function snippetsBundle(state) {
  drawerElm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-source-drawer')
  drawerElm.append(linkSource(state), embedSnippet(state))
  drawerElm.style.display = 'none'

  var tgg = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-source-toggle')
  var snippetLink = toggleLink()
  tgg.append(snippetLink)

  return [tgg, drawerElm]
}

function textAreaElm(state, callback) {
  var snpInp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)('TEXTAREA')
  snpInp.spellcheck = false
  snpInp.textContent = callback(state)

  ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_4__.registerUpdateEvt)(function (newState) {
    snpInp.textContent = callback(newState)
  })
  return snpInp
}

function copyLink(snpElm) {
  var copyLk = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)('A', 'nx-source-link')
  var copyIc = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.iconImage)(_shared_NxIcons_js__WEBPACK_IMPORTED_MODULE_8__.copyB64, 16)

  copyLk.append(copyIc)
  var copyTooltip = toolTip('nx-source-copy-tooltip', 'c/c')
  copyLk.append(copyTooltip)

  copyLk.addEventListener('click', () =>
    (0,_i_is_as_i_does_jack_js_src_modules_Stock_js__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard)(snpElm.textContent, () => {
      ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vTempToggle)(copyTooltip, 'fade', 1000, 200)
    })
  )
  return copyLk
}

function codeElm(name, elm) {
  var snp = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)('DIV', 'nx-' + name + '-snippet')
  snp.append(elm, copyLink(elm))
  return snp
}

function embedSnippet(state) {
  return codeElm('embed', textAreaElm(state, embedContent))
}

function embedContent(state) {
  if (editMode) {
    return '#editing'
  }
  if (state.dataUrl) {
    return (0,_i_is_as_i_does_nexus_core_src_data_NxSnippet_js__WEBPACK_IMPORTED_MODULE_6__.getSnippet)(resolveSrc(state), currentStyle, _shared_NxCdn_js__WEBPACK_IMPORTED_MODULE_7__.appIO, (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__.getLang)())
  }
  return ''
}

function sourceBlock(state, currentStyleUrl = null, editionSource = false) {
  if (editionSource) {
    editMode = true
  }
  if (!currentStyleUrl) {
    currentStyleUrl = _shared_NxCdn_js__WEBPACK_IMPORTED_MODULE_7__.appDefaultCss
  } else if (currentStyleUrl !== _shared_NxCdn_js__WEBPACK_IMPORTED_MODULE_7__.appDefaultCss) {
    currentStyle = currentStyleUrl
  }
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.blockWrap)('source', snippetsBundle(state), false)
}


/***/ }),

/***/ "./src/reader/NxThread.js":
/*!********************************!*\
  !*** ./src/reader/NxThread.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "threadTextElm": () => (/* binding */ threadTextElm),
/* harmony export */   "mainThreadBlock": () => (/* binding */ mainThreadBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Check.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _shared_NxState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxIdent.js */ "./src/reader/NxIdent.js");
/* harmony import */ var _NxMedia_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxMedia.js */ "./src/reader/NxMedia.js");
/* harmony import */ var _shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxSpin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxSpin.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSpin.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxNest_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxNest.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxNest.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");










var threadBlocks

var currentElm
var descrpElm
var contentElm
var distantNav

var slider
var linked = []

var spinElm
var spinner
var ready = 0

var linkedCtrls = {
  ctrls: {
    prev: { symbol: '⊼', elm: null },
    next: { symbol: '⊻', elm: null },
  },
  position: 0,
  count: 0,
}

var distantLandmark

function setDistantLandmark() {
  distantLandmark = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.landmarkElm)('distant')
  distantLandmark.style.display = 'none'
}

function setSpinner() {
  spinElm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.spinContainer)()
  spinner = new _i_is_as_i_does_nexus_core_src_data_NxSpin_js__WEBPACK_IMPORTED_MODULE_7__.Spinner(spinElm)
}

function countReady() {
  ready++
  if (ready === 2) {
    spinner.endSpin()
    spinElm.style.display = 'none'
    if (linked.length) {
      linkedCtrls.count = linked.length
      ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls)
      setFirstDistantContent(linked.length > 1)
    }
    (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vShow)(threadBlocks, 'ease', 200)
  }
}

function updateThreadBlocks(state) {
  var newThreadData = resolveThreadData(state)
  ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vHide)(threadBlocks, 'ease', 200, function () {
    if (newThreadData) {
      spinner.startSpin()
      ready = 0
      spinElm.style.display = 'block'
    }

    resetDistantLinks(state.dataUrl, newThreadData)

    var newContent = threadContent(newThreadData, false)
    var newDescrpTxt = threadTextElm(newThreadData, ['description'])
    descrpElm.firstChild.replaceWith(newDescrpTxt)
    contentElm.firstChild.replaceWith(newContent)
  })
}

function descriptionElm(threadData) {
  descrpElm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-thread-description')
  descrpElm.append(threadTextElm(threadData, ['description']))
  return descrpElm
}

function resolveThreadData(state) {
  var threadData = null
  if (state && state.threadIndex > -1) {
    threadData = state.srcData.threads[state.threadIndex]
  }
  return threadData
}
function distantThreadBlock(dataUrl, threadData) {
  setDistantLandmark()
  setDistantSlider()
  resolveLinkedThreads(dataUrl, threadData)
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.blockWrap)('distant', [slider], distantLandmark)
}

function localThreadBlock(threadData) {
  setContentElm(threadData)
  return (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.blockWrap)('local', [contentElm], (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.landmarkElm)('local'))
}

function setContentElm(threadData) {
  contentElm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-local-content')
  contentElm.append(threadContent(threadData, false))
}

function showDistantNav() {
  distantNav.style.visibility = 'visible'
}

function hideDistantNav() {
  distantNav.style.visibility = 'hidden'
}

function resetDistantLinks(dataUrl, threadData) {
  hideDistantNav()
  toggleDistantLandmark(false)
  removeDistantContent(false)

  linked = []
  linkedCtrls.position = 0
  linkedCtrls.count = 0
  ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls)

  resolveLinkedThreads(dataUrl, threadData)
}

function resolveLinkedThreads(dataUrl, threadData) {
  if (threadData && threadData.linked.length) {
    setLinkedItems(dataUrl, threadData)
  } else {
    countReady()
  }
}

function removeDistantContent(transition = false) {
  var prevElm = currentElm.firstChild
  if (prevElm) {
    if (transition) {
      (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vHide)(prevElm, 'ease', 200, function () {
        prevElm.remove()
      })
    } else {
      prevElm.remove()
    }
  }
}

function setFirstDistantContent(showNav = false) {
  toggleDistantLandmark(true)
  if (showNav) {
    showDistantNav()
  }
  currentElm.append(linked[0])
}

function setCurrentLink() {
  if (linked.length) {
    var nw = linked[linkedCtrls.position]

    if (currentElm.firstChild) {
      (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vReplace)(currentElm.firstChild, nw, 200)
    } else {
      (0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_1__.vPlace)(currentElm, nw, false, 'ease', 200, callb)
    }
  } else {
    removeDistantContent(true)
  }
}

function distantNavElm() {
  distantNav = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('NAV', 'nx-distant-nav')
  distantNav.append(linkedCtrls.ctrls['prev'].elm, currentElm, linkedCtrls.ctrls['next'].elm)
  hideDistantNav()
  return distantNav
}

function setDistantSlider() {
  slider = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV')
  currentElm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-distant-link')
  ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.setHistoryControls)(linkedCtrls, setCurrentLink)
  ;(0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls)
  slider.append(distantNavElm(), currentElm)
}
function linkedElm(distantState) {
  var elms = [(0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_3__.authorIndexLink)(distantState, false), (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_3__.authorUrl)(distantState, false)]
  if (distantState.threadId !== '/') {
    elms.push((0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_3__.viewLink)(distantState, false), threadContent(resolveThreadData(distantState), true))
  }
  var elm = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV')
  elm.append(...elms)
  return elm
}

function toggleDistantLandmark(hasLinks) {
  var hidden = distantLandmark.style.display === 'none'
  if (hasLinks && hidden) {
    distantLandmark.style.display = 'block'
  } else if (!hasLinks && !hidden) {
    distantLandmark.style.display = 'none'
  }
}

function setLinkedItems(dataUrl, threadData) {
  var key = dataUrl + '#' + threadData.id
  var store = (0,_i_is_as_i_does_nexus_core_src_data_NxNest_js__WEBPACK_IMPORTED_MODULE_8__.getLinkedInstances)(key, threadData)

  var register = store.register
  var confirmedInstances = {}
  var indexes = []
  const promises = []
  for (let [url, ids] of Object.entries(store.instances)) {
    var prc = (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_2__.resolveState)(url, '/', true)
      .then((distantState) => {
        confirmedInstances[url] = []
        if (ids.length) {
          ids.forEach((id) => {
            var threadIndex = distantState.srcData.index.indexOf(id)
            if (threadIndex !== -1) {
              confirmedInstances[url].push(id)
              var nDistantState = (0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_2__.getAltState)(distantState, id, threadIndex)
              linked.push(linkedElm(nDistantState))
            } else {
              register = true
              ;(0,_i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_6__.logErr)('Linked thread could not be resolved', id)
            }
          })
        }
        if (!confirmedInstances[url].length) {
          indexes.push(linkedElm(distantState))
        }
      })
      .catch(() => {
        register = true
        ;(0,_i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_6__.logErr)('Linked source could not be resolved', url)
      })
    promises.push(prc)
  }

  Promise.all(promises).then(() => {
    if (register) {
      (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory__WEBPACK_IMPORTED_MODULE_9__.registerLinkedMaps)(key, confirmedInstances)
    }
    if (indexes.length) {
      linked = linked.concat(indexes)
    }
    countReady()
  })
}

function threadContent(threadData, isDistant = false) {
  var dv = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-content')
  var callb = null
  if (!isDistant) {
    callb = countReady
  }
  var callbsent = false
  if (threadData) {
    var elms = [dateElm(threadData), contentBody(threadData)]
    if (
      threadData.content.media &&
      threadData.content.media.url &&
      threadData.content.media.url.length
    ) {
      callbsent = true
      elms.push((0,_NxMedia_js__WEBPACK_IMPORTED_MODULE_4__.mediaElm)(threadData, callb))
    }
    dv.append(...elms)
  }
  if (!callbsent && callb !== null) {
    callb()
  }
  return dv
}

function contentBody(threadData) {
  var bodydiv = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-content-body')
  bodydiv.append(
    threadTextElm(threadData, ['content', 'main']),
    threadTextElm(threadData, ['content', 'aside'])
  )
  return bodydiv
}

function dateElm(threadData) {
  var datediv = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-content-meta')
  var rdate = threadTextElm(threadData, ['content', 'timestamp'])
  datediv.append(rdate)
  return datediv
}

function threadFieldText(threadData, ref = []) {
  if (threadData) {
    var data = Object.assign({}, threadData)
    for (var r = 0; r < ref.length; r++) {
      data = data[ref[r]]
    }
    if ((0,_i_is_as_i_does_jack_js_src_modules_Check_js__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyStr)(data)) {
      if (ref.includes('timestamp') && data.includes('T')) {
        data = data.replace('T', ' ')
      } else if (['description', 'main', 'aside', 'caption'].includes(ref[ref.length - 1])) {
        data = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.lines)(data)
      }
      return data
    }
  }
  return ''
}

function threadHeader(state, threadData) {
  var header = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-thread-header')
  header.append((0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.threadTitleElm)(state, true), descriptionElm(threadData))
  return header
}

function localAndDistantBlocks(dataUrl, threadData) {
  threadBlocks = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-thread-blocks')
  threadBlocks.style.display = 'none'
  threadBlocks.append(localThreadBlock(threadData), distantThreadBlock(dataUrl, threadData))

  return threadBlocks
}

function threadTextElm(threadData, ref) {
  var dv = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-' + ref.join('-'))
  dv.append(threadFieldText(threadData, ref))
  return dv
}

function mainThreadBlock(state) {
  var threadData = resolveThreadData(state)

  var mainBlock = (0,_shared_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-main-block nx-thread')
  setSpinner()

  if (threadData) {
    spinner.startSpin()
  }
  var blocks = [
    threadHeader(state, threadData),
    spinElm,
    localAndDistantBlocks(state.dataUrl, threadData),
  ]

  mainBlock.append(...blocks)

  ;(0,_shared_NxState_js__WEBPACK_IMPORTED_MODULE_2__.registerUpdateEvt)(function (newState) {
    updateThreadBlocks(newState)
  })

  return mainBlock
}


/***/ }),

/***/ "./src/shared/NxCdn.js":
/*!*****************************!*\
  !*** ./src/shared/NxCdn.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appIO": () => (/* binding */ appIO),
/* harmony export */   "appDefaultCss": () => (/* binding */ appDefaultCss),
/* harmony export */   "legacyDefaultCss": () => (/* binding */ legacyDefaultCss)
/* harmony export */ });
const appIO = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/js/NxIO.js'
const appDefaultCss =
  'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NxIO.min.css'
const legacyDefaultCss = [
  'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NexusI.min.css'
]


/***/ }),

/***/ "./src/shared/NxCommons.js":
/*!*********************************!*\
  !*** ./src/shared/NxCommons.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appHeader": () => (/* binding */ appHeader),
/* harmony export */   "appHeaderWithLang": () => (/* binding */ appHeaderWithLang),
/* harmony export */   "getElm": () => (/* binding */ getElm),
/* harmony export */   "instanceWrap": () => (/* binding */ instanceWrap),
/* harmony export */   "serviceWrap": () => (/* binding */ serviceWrap),
/* harmony export */   "blockWrap": () => (/* binding */ blockWrap),
/* harmony export */   "landmarkElm": () => (/* binding */ landmarkElm),
/* harmony export */   "errorPrgr": () => (/* binding */ errorPrgr),
/* harmony export */   "toggleNavEnd": () => (/* binding */ toggleNavEnd),
/* harmony export */   "setHistoryControls": () => (/* binding */ setHistoryControls),
/* harmony export */   "selectDropDown": () => (/* binding */ selectDropDown),
/* harmony export */   "setToggleOnDisplay": () => (/* binding */ setToggleOnDisplay),
/* harmony export */   "baseViewLink": () => (/* binding */ baseViewLink),
/* harmony export */   "threadTitleElm": () => (/* binding */ threadTitleElm),
/* harmony export */   "lines": () => (/* binding */ lines),
/* harmony export */   "spinContainer": () => (/* binding */ spinContainer),
/* harmony export */   "iconImage": () => (/* binding */ iconImage)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxStyle.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxStyle.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");








function resolveThreadTitle(state) {
  var threadTitle = '/'
  if (state && state.threadIndex !== -1 && state.srcData.threads[state.threadIndex]) {
    threadTitle = state.srcData.threads[state.threadIndex].title
    if (threadTitle) {
      return threadTitle
    }
  }
  return threadTitle
}

function toggleOnDisplay(viewlk, givenState, newState) {
  if (
    newState.dataUrl &&
    givenState.dataUrl === newState.dataUrl &&
    givenState.threadId == newState.threadId
  ) {
    viewlk.classList.add('nx-on-display')
  } else {
    viewlk.classList.remove('nx-on-display')
  }
}

function langDropDown() {
  var toggle = getElm('P')
  toggle.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_3__.getLang)()
  return selectDropDown(
    (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_3__.getAvailableLangs)(),
    toggle,
    function (nlang) {
      ;(0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_2__.triggerTranslate)(nlang)
    },
    'nx-lang-switch'
  )
}

function appLink() {
  var link = getElm('A', 'nx-app-link nx-external-link')
  link.target = '_blank'
  link.href = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_4__.appUrl
  link.title = 'Nexus'
  link.textContent = 'Nexus'
  return link
}

function appMain(serviceElms) {
  var main = getElm('MAIN')
  main.append(...serviceElms)
  return main
}

function appHeader() {
  var header = getElm('HEADER')
  header.append(appLink())
  return header
}

function appHeaderWithLang() {
  var header = appHeader()
  header.append(langDropDown())
  return header
}

function getElm(tag, classList) {
  var elm = document.createElement(tag)
  if (classList) {
    elm.className = classList
  }
  return elm
}

function instanceWrap(appHeader, serviceElms) {
  var inst = getElm('DIV', 'nx-instance')
  inst.append(appHeader, appMain(serviceElms))
  return inst
}

function serviceWrap(navElms, mainElms, footerElms = [], service = 'reader') {
  var wrap = getElm('DIV', 'nx-' + service)
  var nav = getElm('NAV')
  nav.append(...navElms)
  var bd = getElm('SECTION')
  bd.append(...mainElms)
  wrap.append(nav, bd)
  if (footerElms.length) {
    var footer = getElm('FOOTER')
    footer.append(...footerElms)
    wrap.append(footer)
  }
  return wrap
}

function blockWrap(blockName, contentElms = null, landmark = null) {
  var dv = getElm('DIV', 'nx-' + blockName + ' nx-block')
  if (landmark) {
    dv.append(landmark)
  }
  if (contentElms) {
    dv.append(...contentElms)
  }
  return dv
}

function landmarkElm(name) {
  var lndmrk = getElm('SPAN', 'nx-landmark nx-landmark-' + name.replace(' ', '-'))
  lndmrk.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_3__.getTxt)(name)
  ;(0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_2__.registerTranslElm)(lndmrk, name)
  return lndmrk
}

function errorPrgr() {
  var p = getElm('P')
  if ((0,_i_is_as_i_does_nexus_core_src_load_NxStyle_js__WEBPACK_IMPORTED_MODULE_0__.isCssLoaded)()) {
    p.className = 'nx-error'
  } else {
    p.style.margin = '0 auto'
    p.style.fontFamily = '"Courier New", Courier, monospace'
    p.style.fontSize = '13px'
  }

  p.textContent = '—/ — '
  return p
}

function toggleNavEnd(map) {
  if (map.position > 0) {
    map.ctrls['prev'].elm.classList.remove('nx-nav-end')
  } else {
    map.ctrls['prev'].elm.classList.add('nx-nav-end')
  }
  if (map.position < map.count - 1) {
    map.ctrls['next'].elm.classList.remove('nx-nav-end')
  } else {
    map.ctrls['next'].elm.classList.add('nx-nav-end')
  }
}

function setHistoryControls(map, triggerCallback, imgAsSymbol = false) {
  Object.keys(map.ctrls).forEach((ctrl) => {
    map.ctrls[ctrl].elm = getElm('A', 'nx-nav-ctrl nx-nav-end')
    if (imgAsSymbol) {
      map.ctrls[ctrl].elm.append(iconImage(map.ctrls[ctrl].symbol))
    } else {
      map.ctrls[ctrl].elm.textContent = map.ctrls[ctrl].symbol
    }
    map.ctrls[ctrl].elm.addEventListener('click', function () {
      if (!map.ctrls[ctrl].elm.classList.contains('nx-nav-end')) {
        if (ctrl === 'next') {
          map.position++
        } else {
          map.position--
        }
        triggerCallback(ctrl, map.position)
        toggleNavEnd(map)
      }
    })
  })
}

function selectDropDown(list, toggleElm, actionCallback = null, switchClass = null) {
  var selectedClass = 'nx-selected'
  toggleElm.classList.add('nx-select-toggle')
  var isInput = toggleElm.tagName == 'INPUT'
  var firstValue
  if (isInput) {
    toggleElm.setAttribute('autocomplete', 'off')
    firstValue = toggleElm.value
  } else {
    firstValue = toggleElm.textContent
  }

  var drp = getElm('UL', 'nx-select-list')

  var swtch = getElm('DIV', 'nx-select')
  if (switchClass) {
    swtch.classList.add(switchClass)
  }
  swtch.append(toggleElm, drp)

  toggleElm.addEventListener('click', () => {
    var styl = 'none'
    if (drp.style.display == styl) {
      styl = 'block'
    }
    drp.style.display = styl
  })

  list.forEach((itm) => {
    var li = getElm('LI')
    li.textContent = itm
    li.dataset.item = itm
    if (itm == firstValue) {
      li.classList.add(selectedClass)
    }

    drp.append(li)
    li.addEventListener('click', () => {
      var nitm = li.textContent
      var currVal
      if (isInput) {
        currVal = toggleElm.value
      } else {
        currVal = toggleElm.textContent
      }
      if (currVal != nitm) {
        if (!li.classList.contains(selectedClass)) {
          var prev = drp.querySelector('.' + selectedClass)
          if (prev) {
            prev.classList.remove(selectedClass)
          }
          li.classList.add(selectedClass)
        }
        if (isInput) {
          toggleElm.value = nitm
        } else {
          toggleElm.textContent = nitm
        }
        toggleElm.dispatchEvent(new window.Event('change'))
        if (typeof actionCallback === 'function') {
          actionCallback(nitm)
        }
      }

      drp.style.display = 'none'
    })
  })
  drp.style.display = 'none'

  return swtch
}

function setToggleOnDisplay(viewlk, state) {
  toggleOnDisplay(viewlk, state, (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentState)())
  ;(0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
    toggleOnDisplay(viewlk, state, newState)
  })
}

function baseViewLink(state, update = false) {
  var viewlk = getElm('A', 'nx-view-link')
  viewlk.append(threadTitleElm(state, update))
  return viewlk
}

function threadTitleElm(state, update = false) {
  var sp = getElm('SPAN', 'nx-thread-title')
  sp.textContent = resolveThreadTitle(state)
  if (update) {
    (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
      var nTitle = resolveThreadTitle(newState)
      ;(0,_i_is_as_i_does_valva_src_modules_transitions_js__WEBPACK_IMPORTED_MODULE_6__.vSplitFlap)(sp, nTitle, 15)
    })
  }

  return sp
}

function lines(text) {
  var dv = getElm('DIV', 'nx-lines')
  if (text) {
    var sp = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_5__.splitOnLineBreaks)(text)
    var ln = []
    sp.forEach((l) => {
      var p = getElm('P')
      p.textContent = l
      ln.push(p)
    })
    dv.append(...ln)
  }
  return dv
}
function spinContainer() {
  var container = getElm('DIV', 'nx-loading')
  return container
}

function iconImage(b64, size = 20) {
  var ic = new Image(size, size)
  ic.className = 'nx-icon'
  ic.src = b64
  return ic
}


/***/ }),

/***/ "./src/shared/NxIcons.js":
/*!*******************************!*\
  !*** ./src/shared/NxIcons.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyB64": () => (/* binding */ copyB64),
/* harmony export */   "downloadB64": () => (/* binding */ downloadB64),
/* harmony export */   "saveB64": () => (/* binding */ saveB64),
/* harmony export */   "newB64": () => (/* binding */ newB64),
/* harmony export */   "openB64": () => (/* binding */ openB64),
/* harmony export */   "resetB64": () => (/* binding */ resetB64),
/* harmony export */   "previewB64": () => (/* binding */ previewB64),
/* harmony export */   "undoB64": () => (/* binding */ undoB64),
/* harmony export */   "redoB64": () => (/* binding */ redoB64),
/* harmony export */   "editB64": () => (/* binding */ editB64),
/* harmony export */   "invalidB64": () => (/* binding */ invalidB64),
/* harmony export */   "validB64": () => (/* binding */ validB64),
/* harmony export */   "upB64": () => (/* binding */ upB64),
/* harmony export */   "downB64": () => (/* binding */ downB64)
/* harmony export */ });
const copyB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA0IDQgTCA0IDI0IEwgMTEgMjQgTCAxMSAyMiBMIDYgMjIgTCA2IDYgTCAxOCA2IEwgMTggNyBMIDIwIDcgTCAyMCA0IFogTSAxMiA4IEwgMTIgMjggTCAyOCAyOCBMIDI4IDggWiBNIDE0IDEwIEwgMjYgMTAgTCAyNiAyNiBMIDE0IDI2IFoiLz48L3N2Zz4=`
const downloadB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA0IEwgMTUgMjAuNTYyNSBMIDkuNzE4NzUgMTUuMjgxMjUgTCA4LjI4MTI1IDE2LjcxODc1IEwgMTUuMjgxMjUgMjMuNzE4NzUgTCAxNiAyNC40MDYyNSBMIDE2LjcxODc1IDIzLjcxODc1IEwgMjMuNzE4NzUgMTYuNzE4NzUgTCAyMi4yODEyNSAxNS4yODEyNSBMIDE3IDIwLjU2MjUgTCAxNyA0IFogTSA3IDI2IEwgNyAyOCBMIDI1IDI4IEwgMjUgMjYgWiIvPjwvc3ZnPg==`
const saveB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA1IDUgTCA1IDI3IEwgMjcgMjcgTCAyNyA5LjU5Mzc1IEwgMjYuNzE4NzUgOS4yODEyNSBMIDIyLjcxODc1IDUuMjgxMjUgTCAyMi40MDYyNSA1IFogTSA3IDcgTCAxMCA3IEwgMTAgMTMgTCAyMiAxMyBMIDIyIDcuNDM3NSBMIDI1IDEwLjQzNzUgTCAyNSAyNSBMIDIzIDI1IEwgMjMgMTYgTCA5IDE2IEwgOSAyNSBMIDcgMjUgWiBNIDEyIDcgTCAxNiA3IEwgMTYgOSBMIDE4IDkgTCAxOCA3IEwgMjAgNyBMIDIwIDExIEwgMTIgMTEgWiBNIDExIDE4IEwgMjEgMTggTCAyMSAyNSBMIDExIDI1IFoiLz48L3N2Zz4=`
const newB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA2IDMgTCA2IDI5IEwgMjYgMjkgTCAyNiA5LjU5Mzc1IEwgMjUuNzE4NzUgOS4yODEyNSBMIDE5LjcxODc1IDMuMjgxMjUgTCAxOS40MDYyNSAzIFogTSA4IDUgTCAxOCA1IEwgMTggMTEgTCAyNCAxMSBMIDI0IDI3IEwgOCAyNyBaIE0gMjAgNi40Mzc1IEwgMjIuNTYyNSA5IEwgMjAgOSBaIi8+PC9zdmc+`
const openB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA1IDMgTCA1IDI3LjgxMjUgTCA1Ljc4MTI1IDI3Ljk2ODc1IEwgMTcuNzgxMjUgMzAuNDY4NzUgTCAxOSAzMC43MTg3NSBMIDE5IDI4IEwgMjUgMjggTCAyNSAxNS40Mzc1IEwgMjYuNzE4NzUgMTMuNzE4NzUgTCAyNyAxMy40MDYyNSBMIDI3IDMgWiBNIDE0LjEyNSA1IEwgMjUgNSBMIDI1IDEyLjU2MjUgTCAyMy4yODEyNSAxNC4yODEyNSBMIDIzIDE0LjU5Mzc1IEwgMjMgMjYgTCAxOSAyNiBMIDE5IDE3LjA5Mzc1IEwgMTguNzE4NzUgMTYuNzgxMjUgTCAxNyAxNS4wNjI1IEwgMTcgNS43MTg3NSBaIE0gNyA1LjI4MTI1IEwgMTUgNy4yODEyNSBMIDE1IDE1LjkwNjI1IEwgMTUuMjgxMjUgMTYuMjE4NzUgTCAxNyAxNy45Mzc1IEwgMTcgMjguMjgxMjUgTCA3IDI2LjE4NzUgWiIvPjwvc3ZnPg==`
const resetB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiAzIEMgMTIgMyA4LjQgNC43OTkyMTg3IDYgNy42OTkyMTg4IEwgNiA0IEwgNCA0IEwgNCAxMiBMIDEyIDEyIEwgMTIgMTAgTCA2LjgwMDc4MTIgMTAgQyA4LjgwMDc4MTIgNyAxMi4xIDUgMTYgNSBDIDIyLjEgNSAyNyA5LjkgMjcgMTYgQyAyNyAyMi4xIDIyLjEgMjcgMTYgMjcgQyA5LjkgMjcgNSAyMi4xIDUgMTYgTCAzIDE2IEMgMyAyMy4yIDguOCAyOSAxNiAyOSBDIDIzLjIgMjkgMjkgMjMuMiAyOSAxNiBDIDI5IDguOCAyMy4yIDMgMTYgMyB6Ii8+PC9zdmc+`
const previewB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA4IEMgNy42NjQwNjMgOCAxLjI1IDE1LjM0Mzc1IDEuMjUgMTUuMzQzNzUgTCAwLjY1NjI1IDE2IEwgMS4yNSAxNi42NTYyNSBDIDEuMjUgMTYuNjU2MjUgNy4wOTc2NTYgMjMuMzI0MjE5IDE0Ljg3NSAyMy45Mzc1IEMgMTUuMjQ2MDk0IDIzLjk4NDM3NSAxNS42MTcxODggMjQgMTYgMjQgQyAxNi4zODI4MTMgMjQgMTYuNzUzOTA2IDIzLjk4NDM3NSAxNy4xMjUgMjMuOTM3NSBDIDI0LjkwMjM0NCAyMy4zMjQyMTkgMzAuNzUgMTYuNjU2MjUgMzAuNzUgMTYuNjU2MjUgTCAzMS4zNDM3NSAxNiBMIDMwLjc1IDE1LjM0Mzc1IEMgMzAuNzUgMTUuMzQzNzUgMjQuMzM1OTM4IDggMTYgOCBaIE0gMTYgMTAgQyAxOC4yMDMxMjUgMTAgMjAuMjM0Mzc1IDEwLjYwMTU2MyAyMiAxMS40MDYyNSBDIDIyLjYzNjcxOSAxMi40NjA5MzggMjMgMTMuNjc1NzgxIDIzIDE1IEMgMjMgMTguNjEzMjgxIDIwLjI4OTA2MyAyMS41ODIwMzEgMTYuNzgxMjUgMjEuOTY4NzUgQyAxNi43NjE3MTkgMjEuOTcyNjU2IDE2LjczODI4MSAyMS45NjQ4NDQgMTYuNzE4NzUgMjEuOTY4NzUgQyAxNi40ODA0NjkgMjEuOTgwNDY5IDE2LjI0MjE4OCAyMiAxNiAyMiBDIDE1LjczNDM3NSAyMiAxNS40NzY1NjMgMjEuOTg0Mzc1IDE1LjIxODc1IDIxLjk2ODc1IEMgMTEuNzEwOTM4IDIxLjU4MjAzMSA5IDE4LjYxMzI4MSA5IDE1IEMgOSAxMy42OTUzMTMgOS4zNTE1NjMgMTIuNDgwNDY5IDkuOTY4NzUgMTEuNDM3NSBMIDkuOTM3NSAxMS40Mzc1IEMgMTEuNzE4NzUgMTAuNjE3MTg4IDEzLjc3MzQzOCAxMCAxNiAxMCBaIE0gMTYgMTIgQyAxNC4zNDM3NSAxMiAxMyAxMy4zNDM3NSAxMyAxNSBDIDEzIDE2LjY1NjI1IDE0LjM0Mzc1IDE4IDE2IDE4IEMgMTcuNjU2MjUgMTggMTkgMTYuNjU2MjUgMTkgMTUgQyAxOSAxMy4zNDM3NSAxNy42NTYyNSAxMiAxNiAxMiBaIE0gNy4yNSAxMi45Mzc1IEMgNy4wOTM3NSAxMy42MDkzNzUgNyAxNC4yODUxNTYgNyAxNSBDIDcgMTYuNzUzOTA2IDcuNSAxOC4zOTQ1MzEgOC4zNzUgMTkuNzgxMjUgQyA1Ljg1NTQ2OSAxOC4zMjQyMTkgNC4xMDU0NjkgMTYuNTg1OTM4IDMuNTMxMjUgMTYgQyA0LjAxMTcxOSAxNS41MDc4MTMgNS4zNTE1NjMgMTQuMjAzMTI1IDcuMjUgMTIuOTM3NSBaIE0gMjQuNzUgMTIuOTM3NSBDIDI2LjY0ODQzOCAxNC4yMDMxMjUgMjcuOTg4MjgxIDE1LjUwNzgxMyAyOC40Njg3NSAxNiBDIDI3Ljg5NDUzMSAxNi41ODU5MzggMjYuMTQ0NTMxIDE4LjMyNDIxOSAyMy42MjUgMTkuNzgxMjUgQyAyNC41IDE4LjM5NDUzMSAyNSAxNi43NTM5MDYgMjUgMTUgQyAyNSAxNC4yODUxNTYgMjQuOTA2MjUgMTMuNjAxNTYzIDI0Ljc1IDEyLjkzNzUgWiIvPjwvc3ZnPg==`
const undoB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxMi43ODEyNSA1LjI4MTI1IEwgNC43ODEyNSAxMy4yODEyNSBMIDQuMDkzNzUgMTQgTCA0Ljc4MTI1IDE0LjcxODc1IEwgMTIuNzgxMjUgMjIuNzE4NzUgTCAxNC4yMTg3NSAyMS4yODEyNSBMIDcuOTM3NSAxNSBMIDIxIDE1IEMgMjMuNzUzOTA2IDE1IDI2IDE3LjI0NjA5NCAyNiAyMCBMIDI2IDI3IEwgMjggMjcgTCAyOCAyMCBDIDI4IDE2LjE1NjI1IDI0Ljg0Mzc1IDEzIDIxIDEzIEwgNy45Mzc1IDEzIEwgMTQuMjE4NzUgNi43MTg3NSBaIi8+PC9zdmc+`
const redoB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxOS4yMTg3NSA1LjI4MTI1IEwgMTcuNzgxMjUgNi43MTg3NSBMIDI0LjA2MjUgMTMgTCAxMSAxMyBDIDcuMTU2MjUgMTMgNCAxNi4xNTYyNSA0IDIwIEwgNCAyNyBMIDYgMjcgTCA2IDIwIEMgNiAxNy4yNDYwOTQgOC4yNDYwOTQgMTUgMTEgMTUgTCAyNC4wNjI1IDE1IEwgMTcuNzgxMjUgMjEuMjgxMjUgTCAxOS4yMTg3NSAyMi43MTg3NSBMIDI3LjIxODc1IDE0LjcxODc1IEwgMjcuOTA2MjUgMTQgTCAyNy4yMTg3NSAxMy4yODEyNSBaIi8+PC9zdmc+`
const editB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAyMy45MDYyNSAzLjk2ODc1IEMgMjIuODU5Mzc1IDMuOTY4NzUgMjEuODEyNSA0LjM3NSAyMSA1LjE4NzUgTCA1LjE4NzUgMjEgTCA1LjEyNSAyMS4zMTI1IEwgNC4wMzEyNSAyNi44MTI1IEwgMy43MTg3NSAyOC4yODEyNSBMIDUuMTg3NSAyNy45Njg3NSBMIDEwLjY4NzUgMjYuODc1IEwgMTEgMjYuODEyNSBMIDI2LjgxMjUgMTEgQyAyOC40Mzc1IDkuMzc1IDI4LjQzNzUgNi44MTI1IDI2LjgxMjUgNS4xODc1IEMgMjYgNC4zNzUgMjQuOTUzMTI1IDMuOTY4NzUgMjMuOTA2MjUgMy45Njg3NSBaIE0gMjMuOTA2MjUgNS44NzUgQyAyNC40MTAxNTYgNS44NzUgMjQuOTE3OTY5IDYuMTA1NDY5IDI1LjQwNjI1IDYuNTkzNzUgQyAyNi4zNzg5MDYgNy41NjY0MDYgMjYuMzc4OTA2IDguNjIxMDk0IDI1LjQwNjI1IDkuNTkzNzUgTCAyNC42ODc1IDEwLjI4MTI1IEwgMjEuNzE4NzUgNy4zMTI1IEwgMjIuNDA2MjUgNi41OTM3NSBDIDIyLjg5NDUzMSA2LjEwNTQ2OSAyMy40MDIzNDQgNS44NzUgMjMuOTA2MjUgNS44NzUgWiBNIDIwLjMxMjUgOC43MTg3NSBMIDIzLjI4MTI1IDExLjY4NzUgTCAxMS4xODc1IDIzLjc4MTI1IEMgMTAuNTMxMjUgMjIuNSA5LjUgMjEuNDY4NzUgOC4yMTg3NSAyMC44MTI1IFogTSA2LjkzNzUgMjIuNDM3NSBDIDguMTM2NzE5IDIyLjkyMTg3NSA5LjA3ODEyNSAyMy44NjMyODEgOS41NjI1IDI1LjA2MjUgTCA2LjI4MTI1IDI1LjcxODc1IFoiLz48L3N2Zz4=`
const invalidB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA3LjIxODc1IDUuNzgxMjUgTCA1Ljc4MTI1IDcuMjE4NzUgTCAxNC41NjI1IDE2IEwgNS43ODEyNSAyNC43ODEyNSBMIDcuMjE4NzUgMjYuMjE4NzUgTCAxNiAxNy40Mzc1IEwgMjQuNzgxMjUgMjYuMjE4NzUgTCAyNi4yMTg3NSAyNC43ODEyNSBMIDE3LjQzNzUgMTYgTCAyNi4yMTg3NSA3LjIxODc1IEwgMjQuNzgxMjUgNS43ODEyNSBMIDE2IDE0LjU2MjUgWiIvPjwvc3ZnPg==`
const validB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAyOC4yODEyNSA2LjI4MTI1IEwgMTEgMjMuNTYyNSBMIDMuNzE4NzUgMTYuMjgxMjUgTCAyLjI4MTI1IDE3LjcxODc1IEwgMTAuMjgxMjUgMjUuNzE4NzUgTCAxMSAyNi40MDYyNSBMIDExLjcxODc1IDI1LjcxODc1IEwgMjkuNzE4NzUgNy43MTg3NSBaIi8+PC9zdmc+`
const upB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA0LjA5Mzc1IEwgMTUuMjgxMjUgNC43ODEyNSBMIDYuNzgxMjUgMTMuMjgxMjUgTCA4LjIxODc1IDE0LjcxODc1IEwgMTUgNy45Mzc1IEwgMTUgMjggTCAxNyAyOCBMIDE3IDcuOTM3NSBMIDIzLjc4MTI1IDE0LjcxODc1IEwgMjUuMjE4NzUgMTMuMjgxMjUgTCAxNi43MTg3NSA0Ljc4MTI1IFoiLz48L3N2Zz4=`
const downB64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA0IEwgMTUgMjQuMDYyNSBMIDguMjE4NzUgMTcuMjgxMjUgTCA2Ljc4MTI1IDE4LjcxODc1IEwgMTUuMjgxMjUgMjcuMjE4NzUgTCAxNiAyNy45MDYyNSBMIDE2LjcxODc1IDI3LjIxODc1IEwgMjUuMjE4NzUgMTguNzE4NzUgTCAyMy43ODEyNSAxNy4yODEyNSBMIDE3IDI0LjA2MjUgTCAxNyA0IFoiLz48L3N2Zz4=`


/***/ }),

/***/ "./src/shared/NxStart.js":
/*!*******************************!*\
  !*** ./src/shared/NxStart.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxInit.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxInit.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/base/NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxState.js */ "./src/shared/NxState.js");
/* harmony import */ var _editor_NxEditor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../editor/NxEditor.js */ "./src/editor/NxEditor.js");
/* harmony import */ var _reader_NxReader_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../reader/NxReader.js */ "./src/reader/NxReader.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NxCommons.js */ "./src/shared/NxCommons.js");
/* harmony import */ var _NxCdn_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NxCdn.js */ "./src/shared/NxCdn.js");










function mountApp(nxElm, appElm) {
  var host = document.createElement('DIV')
  host.className = 'nx'
  host.append(appElm)
  nxElm.append(host)
}

function init() {
  (0,_i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__.initAll)({
    appDefaultLang: 'en',
    appDefaultCss: _NxCdn_js__WEBPACK_IMPORTED_MODULE_8__.appDefaultCss,
    appDefaultCssAliases: _NxCdn_js__WEBPACK_IMPORTED_MODULE_8__.legacyDefaultCss,
  })
    .then((seed) => {
      (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_2__.setOriginLang)(seed.request.lang)
      seed.state = (0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.dataToState)(seed.request.url, seed.request.id, seed.nxdata)
      ;(0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.setOriginState)(seed.state)
      var elm
      seed.editMode = false
      if ((0,_i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__.getQuery)('edit') || (0,_i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__.getQuery)('new')) {
        seed.editMode = true
         elm = (0,_editor_NxEditor_js__WEBPACK_IMPORTED_MODULE_5__.editorElms)(seed)
      } else {
         elm = (0,_reader_NxReader_js__WEBPACK_IMPORTED_MODULE_6__.readerElms)(seed)
      }

     mountApp(seed.nxelm, elm)
    })
    /*.catch((err) => {
      logErr(err.message)
      mountApp(retrieveNxElm(), errorPrgr())
    })*/
}


/***/ }),

/***/ "./src/shared/NxState.js":
/*!*******************************!*\
  !*** ./src/shared/NxState.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatSrc": () => (/* binding */ concatSrc),
/* harmony export */   "getTimestamp": () => (/* binding */ getTimestamp),
/* harmony export */   "isStateUnseen": () => (/* binding */ isStateUnseen),
/* harmony export */   "dataToState": () => (/* binding */ dataToState),
/* harmony export */   "setDefaultThread": () => (/* binding */ setDefaultThread),
/* harmony export */   "resolveState": () => (/* binding */ resolveState),
/* harmony export */   "registerUpdateEvt": () => (/* binding */ registerUpdateEvt),
/* harmony export */   "triggerUpdate": () => (/* binding */ triggerUpdate),
/* harmony export */   "getCurrentState": () => (/* binding */ getCurrentState),
/* harmony export */   "setOriginState": () => (/* binding */ setOriginState),
/* harmony export */   "getAltState": () => (/* binding */ getAltState)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");



var currentState = {
  dataUrl: null,
  srcData: null,
  threadId: '/',
  threadIndex: -1,
}

var updateStore = { onChange: [], onSrcChange: [] }

function triggerCallbacks(state, triggerAll, skipHistoryUpdate) {
  var ks = ['onChange']
  if (triggerAll) {
    ks.push('onSrcChange')
  }

  ks.forEach((k) => {
    if (updateStore[k].length) {
      updateStore[k].forEach((callback) => {
        callback(state, skipHistoryUpdate)
      })
    }
  })
}

function concatSrc(state) {
  var src = state.dataUrl
  if (state.threadId !== '/') {
    src += '#' + state.threadId
  }
  return src
}

function getTimestamp(state) {
  if (state.threadIndex !== -1 && state.threadIndex < state.srcData.threads.length) {
    return state.srcData.threads[state.threadIndex].content.timestamp
  }
  return null
}

function isStateUnseen(state) {
  if (state.threadIndex !== -1 && state.srcData.index.indexOf(state.threadIndex) !== -1) {
    return (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__.isThreadContentUnseen)(concatSrc(state), getTimestamp(state))
  }
  return false
}

function dataToState(dataUrl, threadId, data, acceptNoId = false) {
  data.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_0__.getThreadsList)(data)
  var state = {
    dataUrl: dataUrl,
    threadId: threadId,
    srcData: data,
    threadIndex: data.index.indexOf(threadId),
  }

  if (state.threadIndex === -1) {
    if (acceptNoId) {
      if (state.threadId !== '/') {
        state.threadId = '/'
      }
    } else {
      setDefaultThread(state)
    }
  }
  return state
}

function setDefaultThread(state) {
  state.threadIndex = 0
  state.threadId = state.srcData.index[0]
}

function resolveState(dataUrl, threadId, acceptNoId = false) {
  return (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_0__.getSrcData)(dataUrl).then((data) => {
    return dataToState(dataUrl, threadId, data, acceptNoId)
  })
}

function registerUpdateEvt(callback, onSrcChange = false) {
  var k = 'onChange'
  if (onSrcChange) {
    k = 'onSrcChange'
  }
  updateStore[k].push(callback)
}

function triggerUpdate(state, skipHistoryUpdate = false, forceTrigger = false) {
  var srcChanged = state.dataUrl != currentState.dataUrl

  if (forceTrigger || srcChanged || state.threadId != currentState.threadId) {
    if (!skipHistoryUpdate) {
      (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__.registerThreadVisit)(concatSrc(currentState), getTimestamp(currentState))
    }

    var resetIndex = srcChanged || forceTrigger
    currentState = Object.assign({}, state)

    triggerCallbacks(state, resetIndex, skipHistoryUpdate)
  }
}

function getCurrentState() {
  return currentState
}

function setOriginState(state) {
  if (!currentState.dataUrl) {
    currentState = state
    return true
  }
  return false
}

function getAltState(state, nId, nIndex) {
  var altState = Object.assign({}, state)

  altState.threadId = nId
  altState.threadIndex = nIndex
  return altState
}


/***/ })

}]);
//# sourceMappingURL=NxIORead.js.map