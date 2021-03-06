import { registerUpdateEvt, triggerUpdate, isStateUnseen, getAltState } from '../shared/NxState.js'
import { baseViewLink, getElm, setToggleOnDisplay } from '../shared/NxCommons.js'
import { miniUrl } from '@i-is-as-i-does/jack-js/src/modules/Web.js'
import { vSplitFlap } from '@i-is-as-i-does/valva/src/modules/transitions'

var urlStore = {}

function authorMiniUrl(authorUrl) {
  if (!urlStore[authorUrl]) {
    urlStore[authorUrl] = miniUrl(authorUrl)
  }
  return urlStore[authorUrl]
}

function toggleUnseen(viewlk, state) {
  if (viewlk.classList.contains('nx-on-display')) {
    viewlk.classList.remove('nx-unseen')
    viewlk.lastChild.textContent = ''
  } else if (isStateUnseen(state)) {
    viewlk.classList.add('nx-unseen')
    viewlk.lastChild.textContent = '*'
  }
}

export function authorHandle(state, update = false) {
  var hnd = getElm('SPAN', 'nx-handle')
  if (state.srcData) {
    hnd.textContent = state.srcData.author.handle
  }
  if (update) {
    registerUpdateEvt(function (newState) {
      vSplitFlap(hnd, newState.srcData.author.handle, 25)
    }, true)
  }
  return hnd
}

export function authorUrl(state, update = false) {
  var authorlksp = getElm('SPAN', 'nx-author-url')

  var urlBrck = []
  ;['[', ']'].forEach((bracket) => {
    var brsp = getElm('SPAN', 'nx-author-url-brackets')
    brsp.textContent = bracket
    urlBrck.push(brsp)
  })
  var urla = getElm('A', 'nx-external-link')
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
    registerUpdateEvt(function (newState) {
      urla.href = newState.srcData.author.url
      vSplitFlap(urla, authorMiniUrl(newState.srcData.author.url), 25)
    }, true)
  }
  return authorlksp
}

export function setToggleUnseen(viewlk, state) {
  viewlk.append(getElm('SPAN', 'nx-new-tag'))
  toggleUnseen(viewlk, state)
  registerUpdateEvt(function () {
    toggleUnseen(viewlk, state)
  })
}

export function viewLink(state, update = false) {
  var viewlk = baseViewLink(state, update)
  if (state.threadId !== '/') {
    setToggleOnDisplay(viewlk, state)
    setToggleUnseen(viewlk, state)
  }

  viewlk.addEventListener('click', () => {
    triggerUpdate(state)
  })
  return viewlk
}

export function authorIndexLink(state, update = false) {
  var auth = getElm('A', 'nx-author-link')
  auth.append(authorHandle(state, update))

  var newState = getAltState(state, '/', -1)
  setToggleOnDisplay(auth, newState)

  auth.addEventListener('click', function () {
    triggerUpdate(newState, '/')
  })

  return auth
}
