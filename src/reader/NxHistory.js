import { vShow, vHide, vPlace } from '@i-is-as-i-does/valva/src/modules/transitions.js'
import {
  blockWrap,
  getElm,
  setHistoryControls,
  toggleNavEnd,
  setToggleOnDisplay,
  baseViewLink,
} from '../shared/NxCommons.js'
import { authorIndexLink, authorUrl } from './NxIdent.js'
import { autoScrollToBottom } from '@i-is-as-i-does/jack-js/src/modules/Style.js'
import { registerUpdateEvt, triggerUpdate } from '../shared/NxState.js'

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
  var wrp = getElm('DIV', 'nx-history-nav')
  setHistoryControls(histCtrls, function (ctrl, pos) {
    var target = historyList.children[pos + 1].querySelector('.nx-thread-title')
    target.click()
  })
  wrp.append(histCtrls.ctrls['prev'].elm, historyToggleElm(), histCtrls.ctrls['next'].elm)
  return wrp
}
function historyToggleElm() {
  var tggl = getElm('A', 'nx-history-toggle')
  tggl.textContent = '≚'
  tggl.addEventListener('click', () => {
    if (tggl.textContent == '≙') {
      tggl.textContent = '≚'
      tggl.classList.remove('nx-active')
      vHide(historyElm, 'ease', 200)
    } else {
      tggl.textContent = '≙'
      tggl.classList.add('nx-active')
      vShow(historyElm, 'ease', 200)
      autoScrollToBottom(historyList)
    }
  })
  return tggl
}

function setHistoryListElm(state) {
  historyList = getElm('UL', 'nx-history-list')
  var first = getElm('LI')
  first.textContent = '...'
  historyList.append(first)
  if (state && state.srcData) {
    historyState = state
    historyList.append(historyItm(state, 0))
  }
  historyElm = getElm('DIV', 'nx-history-drawer')
  historyElm.append(historyList)
  historyElm.style.display = 'none'
  registerUpdateEvt(function (newState, skipHistoryUpdate) {
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
    vPlace(historyList, itm, false, 'ease', 200,function () {
      autoScrollToBottom(historyList)
    })
    toggleNavEnd(histCtrls)
  }
}

function viewElms(state, pos) {
  return [authorIndexLink(state, false), authorUrl(state, false), historyViewLink(state, pos)]
}

function historyItm(state, pos) {
  var itm = document.createElement('LI')
  itm.append(...viewElms(state, pos))
  return itm
}

function historyViewLink(state, pos) {
  var viewlk = baseViewLink(state, false)
  setToggleOnDisplay(viewlk, state)

  viewlk.addEventListener('click', () => {
    isHistoryEvent = true
    triggerUpdate(state, true)
    histCtrls.position = pos
    isHistoryEvent = false
  })
  return viewlk
}

export function historyBlock(state) {
  setHistoryListElm(state)
  return blockWrap('history', [historyNav(), historyElm], false)
}
