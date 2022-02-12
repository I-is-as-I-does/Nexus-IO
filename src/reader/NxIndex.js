import {
  vPlace,
  vReplace,
  vHide,
} from '@i-is-as-i-does/valva/src/modules/transitions.js'
import { getAltState, registerUpdateEvt } from '../shared/NxState.js'
import { authorHandle, authorUrl, viewLink } from './NxIdent.js'
import { blockWrap, getElm, lines } from '../shared/NxCommons.js'

var indexList = null

function aboutElm(state) {
  var ab = getElm('DIV', 'nx-about-author')

  ab.append(aboutLines(state))
  registerUpdateEvt(function (newState) {
    vReplace(ab.firstChild, aboutLines(newState), 200)
  }, true)
  return ab
}

function aboutLines(state) {
  var text = null
  if (state.srcData && state.srcData.author.about) {
    text = state.srcData.author.about
  }
  return lines(text)
}

function setIndexList(state) {
  indexList = getElm('UL')
  if (state.srcData) {
    var items = state.srcData.index

    if (items.length) {
      for (var i = 0; i < items.length; i++) {
        indexList.append(indexLi(state, items[i], i))
      }
    }
  }
  registerUpdateEvt(function (newState) {
    changeThreadsList(newState)
  }, true)
}

function indexLi(state, id, index) {
  var altState = getAltState(state, id, index)

  var li = getElm('LI')
  li.append(viewLink(altState, false))
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
      vHide(child, 'ease', 200, function () {
        child.remove()
      })
    }
    for (var x = 0; x < chlen; x++) {
      if (nwlen > x) {
        var nlink = indexLi(state, items[x], x)
        vReplace(childr[x], nlink, 200)
        count++
      } else {
        rmv(childr[x])
      }
    }
  }
  if (count < nwlen) {
    for (var y = count; y < nwlen; y++) {
      vPlace(indexList, indexLi(state, items[y], y), false, 'ease', 200)
    }
  }
}

function indexHeader(state) {
  var header = getElm('DIV', 'nx-index-header')
  header.append(authorHandle(state, true), authorUrl(state, true), aboutElm(state))
  return header
}

function indexBlock(state) {
  setIndexList(state)
  return blockWrap('threads-list', [indexList])
}

export function mainIndexBlock(state) {
  var mainBlock = getElm('DIV', 'nx-main-block nx-index')
  var blocks = [indexHeader(state), indexBlock(state)]
  mainBlock.append(...blocks)
  return mainBlock
}
