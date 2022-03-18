import { isNonEmptyStr } from '@i-is-as-i-does/jack-js/src/modules/Check.js'
import {
  vHide,
  vShow,
  vPlace,
  vReplace
} from '@i-is-as-i-does/valva/src/modules/transitions.js'
import { getAltState, registerUpdateEvt, resolveState } from '../shared/NxState.js'
import { authorIndexLink, authorUrl, viewLink } from './NxIdent.js'
import { mediaElm } from './NxMedia.js'
import {
  blockWrap,
  getElm,
  landmarkElm,
  lines,
  setHistoryControls,
  threadTitleElm,
  toggleNavEnd,
  spinContainer,
} from '../shared/NxCommons.js'
import { logErr } from '@i-is-as-i-does/nexus-core/src/logs/NxLog.js'
import { Spinner } from '@i-is-as-i-does/nexus-core/src/data/NxSpin.js'
import { getLinkedInstances } from '@i-is-as-i-does/nexus-core/src/data/NxNest.js'
import { registerLinkedMaps } from '@i-is-as-i-does/nexus-core/src/storg/NxMemory'

var inEditMode = false
var forceUpdate = false

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
  distantLandmark = landmarkElm('distant')
  distantLandmark.style.display = 'none'
}

function setSpinner() {
  spinElm = spinContainer()
  spinner = new Spinner(spinElm)
}

function countReady() {
  ready++
  if (ready === 2) {
    spinner.endSpin()
    spinElm.style.display = 'none'
    if (linked.length) {
      linkedCtrls.count = linked.length
      toggleNavEnd(linkedCtrls)
      setFirstDistantContent(linked.length > 1)
    }
    vShow(threadBlocks, 'ease', 200)
  }
}

function updateThreadBlocks(state) {
  var newThreadData = resolveThreadData(state)
  vHide(threadBlocks, 'ease', 200, function () {
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
  descrpElm = getElm('DIV', 'nx-thread-description')
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
  return blockWrap('distant', [slider], distantLandmark)
}

function localThreadBlock(threadData) {
  setContentElm(threadData)
  return blockWrap('local', [contentElm], landmarkElm('local'))
}

function setContentElm(threadData) {
  contentElm = getElm('DIV', 'nx-local-content')
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
  toggleNavEnd(linkedCtrls)

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
      vHide(prevElm, 'ease', 200, function () {
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
      vReplace(currentElm.firstChild, nw, 200)
    } else {
      vPlace(currentElm, nw, false, 'ease', 200, callb)
    }
  } else {
    removeDistantContent(true)
  }
}

function distantNavElm() {
  distantNav = getElm('NAV', 'nx-distant-nav')
  distantNav.append(linkedCtrls.ctrls['prev'].elm, currentElm, linkedCtrls.ctrls['next'].elm)
  hideDistantNav()
  return distantNav
}

function setDistantSlider() {
  slider = getElm('DIV')
  currentElm = getElm('DIV', 'nx-distant-link')
  setHistoryControls(linkedCtrls, setCurrentLink)
  toggleNavEnd(linkedCtrls)
  slider.append(distantNavElm(), currentElm)
}
function linkedElm(distantState) {
  var elms = [authorIndexLink(distantState, false), authorUrl(distantState, false)]
  if (distantState.threadId !== '/') {
    elms.push(viewLink(distantState, false), threadContent(resolveThreadData(distantState), true))
  }
  var elm = getElm('DIV')
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

function noLinkedCache(){
if(inEditMode || forceUpdate){
  return true
}
return false
}

function setLinkedItems(dataUrl, threadData) {
  var key = dataUrl + '#' + threadData.id
  var store = getLinkedInstances(key, threadData, [], noLinkedCache())
  var register = store.register
  var confirmedInstances = {}
  var indexes = []
  const promises = []
  for (let [url, ids] of Object.entries(store.instances)) {
    var prc = resolveState(url, '/', true)
      .then((distantState) => {
        confirmedInstances[url] = []
        if (ids.length) {
          ids.forEach((id) => {
            var threadIndex = distantState.srcData.index.indexOf(id)
            if (threadIndex !== -1) {
              confirmedInstances[url].push(id)
              var nDistantState = getAltState(distantState, id, threadIndex)
              linked.push(linkedElm(nDistantState))
            } else {
              register = true
              logErr('Linked thread could not be resolved', id)
            }
          })
        }
        if (!confirmedInstances[url].length) {
          indexes.push(linkedElm(distantState))
        }
      })
      .catch(() => {
        register = true
        logErr('Linked source could not be resolved', url)
      })
    promises.push(prc)
  }

  Promise.all(promises).then(() => {
    if (register) {
      registerLinkedMaps(key, confirmedInstances)
    }
    if (indexes.length) {
      linked = linked.concat(indexes)
    }
    countReady()
  })
}

function threadContent(threadData, isDistant = false) {
  var dv = getElm('DIV', 'nx-content')
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
      elms.push(mediaElm(threadData, callb))
    }
    dv.append(...elms)
  }
  if (!callbsent && callb !== null) {
    callb()
  }
  return dv
}

function contentBody(threadData) {
  var bodydiv = getElm('DIV', 'nx-content-body')
  bodydiv.append(
    threadTextElm(threadData, ['content', 'main']),
    threadTextElm(threadData, ['content', 'aside'])
  )
  return bodydiv
}

function dateElm(threadData) {
  var datediv = getElm('DIV', 'nx-content-meta')
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
    if (isNonEmptyStr(data)) {
       if (['description', 'main', 'aside', 'caption'].includes(ref[ref.length - 1])) {
        data = lines(data)
      }
      return data
    }
  }
  return ''
}

function threadHeader(state, threadData) {
  var header = getElm('DIV', 'nx-thread-header')
  header.append(threadTitleElm(state, true), descriptionElm(threadData))
  return header
}

function localAndDistantBlocks(dataUrl, threadData) {
  threadBlocks = getElm('DIV', 'nx-thread-blocks')
  threadBlocks.style.display = 'none'
  threadBlocks.append(localThreadBlock(threadData), distantThreadBlock(dataUrl, threadData))

  return threadBlocks
}

export function threadTextElm(threadData, ref) {
  var dv = getElm('DIV', 'nx-' + ref.join('-'))
  dv.append(threadFieldText(threadData, ref))
  return dv
}

export function mainThreadBlock(state, editMode) {

  inEditMode = editMode
  var threadData = resolveThreadData(state)

  var mainBlock = getElm('DIV', 'nx-main-block nx-thread')
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

  registerUpdateEvt(function (newState, skip, forceTrigger) {
    forceUpdate = forceTrigger
    updateThreadBlocks(newState)
  })

  return mainBlock
}
