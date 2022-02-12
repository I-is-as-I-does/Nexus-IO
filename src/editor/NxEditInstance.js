import { randomString } from '@i-is-as-i-does/jack-js/src/modules/Help'
import {
  vHide,
  vShow,
  vPlace,
} from '@i-is-as-i-does/valva/src/modules/transitions.js'
import {
  appHeaderWithLang,
  baseViewLink,
  blockWrap,
  getElm,
  iconImage,
  instanceWrap,
  landmarkElm,
  serviceWrap,
} from '../shared/NxCommons'
import { downB64, upB64 } from '../shared/NxIcons'
import { addBtn, toggleAddBtn } from './NxAddBtn'
import { threadChangeEvt, toggleDisabled, updownEvt } from './NxEditCommons'
import { NxEditMenu } from './NxEditMenu'
import { newThread } from './NxEditStarters'
import { NxInputsFactory } from './NxInputsFactory'
import { NxLocalFormFactory } from './NxLocalFormFactory'

export class NxEditInstance {
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
      up: upB64,
      down: downB64,
    }
  }

  _setContainers() {
    this.containers = {
      author: getElm('FORM', 'nx-edit-author'),
      index: getElm('UL', 'nx-edit-index'),
      local: getElm('UL', 'nx-edit-local'),
      distant: getElm('UL', 'nx-edit-distant'),
    }
  }

  _setMenu() {
    this.EditMenu = new NxEditMenu(this.EditState)
    this.menu = this.EditMenu.getMenuElms()
    this.menu.addEventListener('StateChange', this._resetFormCallback.bind(this))
  }

  _setFactories() {
    this.InputsFactory = new NxInputsFactory(this.EditState, this.EditMenu)
    this.LocalFormFactory = new NxLocalFormFactory(this.InputsFactory)
  }

  _setAddThreadBtn() {
    this.addThreadBtn = addBtn()
    toggleAddBtn(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    this.addThreadBtn.addEventListener('click', this._addThreadHandler.bind(this))
  }

  _setServiceElms() {
    var indexMain = getElm('DIV', 'nx-main-block nx-index')
    indexMain.append(this.formBlocks.author, this.formBlocks.index)
    var threadMain = getElm('DIV', 'nx-main-block nx-thread')
    threadMain.append(this.formBlocks.local, this.formBlocks.distant)

    this.instanceElms = instanceWrap(appHeaderWithLang(), [
      serviceWrap([this.menu], [indexMain, threadMain], [], 'edit'),
    ])
  }

  _setFormBlocks() {
    this.formBlocks = {
      author: blockWrap('author', [this.containers.author], landmarkElm('author')),
      index: blockWrap(
        'threads-list',
        [this.containers.index, this.addThreadBtn],
        landmarkElm('threads')
      ),
      local: blockWrap('local', [this.containers.local], false),
      distant: blockWrap('distant', [this.containers.distant], false),
    }
  }

  _resetFormCallback() {
    Object.values(this.containers).forEach((container, i) => {
      var childr = Array.from(container.childNodes)
      var isLastp = i === 3
      var lastc = childr.length - 1
      childr.forEach((child, c) => {
        vHide(child, 'fade', 200, function(){
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
      vShow(inpt, 'fade', 200)
    })
  }

  _setThreadsInputs() {
    var items = this.EditState.getIdsList()
    if (items.length) {
      this.EditMenu.setResetting(true)
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
    var c = 0
    for (let [name, elm] of Object.entries(elms)) {
      c++
      if (elm.style.display !== 'none') {
        elm.style.display = 'none'
        var type = 'ease'
          if (name === 'local') {
            type = 'fade'
          } 
        vPlace(this.containers[name], elm, false, type, 200)
      } else {
        this.containers[name].append(elm)
      }
     
      if (isLast && c === 3) {
        this.EditMenu.setResetting(false)
        if (idx - 1 !== -1) {
          this.containers.index.childNodes[idx - 1].dispatchEvent(updownEvt)
        }
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
      var randomId = randomString(10)
      var idx = this.EditState.getThreadsCount()
      this.EditState.pushThread(newThread(randomId))
      this.EditMenu.setResetting(true)
      this._setThread(randomId, idx, true)
      this.EditMenu.toggleSaveBtn(false)
      toggleAddBtn(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    }
  }

  _linkInput(addLinkBtn, form, ident, i) {
    var lkident = this.EditState.registerLinkedThread(ident, i)

    var linkwrap = getElm('DIV', 'nx-edit-distant-link')
    var store = { linked: null }
    var elm = this.InputsFactory.inputElm(['threads', ident, 'linked', lkident], null, store)
    var dltBtn = this._baseDeleteLinkBtn()
    var delwrap = getElm('DIV', 'nx-distant-link-action')
    delwrap.append(dltBtn)

    dltBtn.addEventListener('click', () => {
      var act = function (redo) {
        var linked = this.EditState.getLinkedUrls(ident)
        if (redo) {
          vHide(linkwrap, 'ease', 200, function () {
            linkwrap.remove()
          })
          this.EditState.removeLinkedThread(ident, lkident)
        } else {
          var lidx = this.EditState.getLinkedThreadIdx(ident, lkident)
          var isLast = lidx === linked.length
          this.EditState.insertLinkedThread(ident, lkident, store.linked.value)
          if (isLast) {
            vPlace(form, linkwrap, false, 'ease', 200)
          } else {
            var nextSibling = form.childNodes[lidx]
            form.insertBefore(linkwrap, nextSibling)
            vShow(linkwrap, 'ease', 200)
          }
        }
        toggleAddBtn(addLinkBtn, linked, 'linked')
      }.bind(this)
      this.EditMenu.setLastAction(act)
      act(true)
    })
    linkwrap.append(elm, delwrap)
    return linkwrap
  }

  _threadDistantForm(ident) {
    var form = getElm('FORM', 'nx-thread-distant-form')
    var addLinkBtn = addBtn()
    toggleAddBtn(addLinkBtn, this.EditState.getLinkedUrls(ident), 'linked')
    addLinkBtn.addEventListener('click', () => {
      if (!addLinkBtn.disabled) {
        this.EditState.pushLinkedThread(ident, '')
        vPlace(form, this._linkInput(addLinkBtn, form, ident, this.EditState.getLinkedUrlsCount(ident) - 1),false, 'ease', 200)
        toggleAddBtn(addLinkBtn, this.EditState.getLinkedUrls(ident), 'linked')
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

    var formCnt = getElm('DIV')
    formCnt.append(landmarkElm('linked threads'), form, addLinkBtn)

    return formCnt
  }

  _threadLi(ident) {
    var li = getElm('LI')

    if (!this.EditState.isCurrentId(ident)) {
      li.style.display = 'none'
    }
    li.addEventListener(
      'ThreadChange',
      function () {
        if (this.EditState.isCurrentId(ident)) {
          setTimeout(function () {
            vShow(li, 'ease', 200)
          }, 200)
        } else {
          vHide(li, 'ease', 200)
        }
      }.bind(this)
    )
    return li
  }

  _setdeleteThreadElm(elms, ident) {
    var btn = getElm('BUTTON', 'nx-delete-thread')
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
          vHide(elm, 'ease', 200, function () {
            elm.remove()
          })
        })
// @todo fix& set in own func
        if (len > 1) {
          if (idx === 0) {
            elms.index.nextSibling.dispatchEvent(updownEvt)
          } else if (idx === len - 1) {
            elms.index.previousSibling.dispatchEvent(updownEvt)
          }
        }

        if (this.EditState.isCurrentId(ident)) {
          elms.distant.dispatchEvent(threadChangeEvt)
          elms.local.dispatchEvent(threadChangeEvt)
        }
      } else {
        this.EditState.insertThread(ident, threadData)
        if (idx <= len - 1) {
          var next = this.containers.index.childNodes[idx]
          this.containers.index.insertBefore(elms.index, next)
          if (idx === 0) {
            next.dispatchEvent(updownEvt)
          }
        } else {
          this.containers.index.append(elms.index)
          if (len > 1) {
            elms.index.previousSibling.dispatchEvent(updownEvt)
          }
        }

        this.containers.local.append(elms.local)
        this.containers.distant.append(elms.distant)

        vShow(elms.index, 'ease', 200)
        elms.index.firstChild.click()
      }
      toggleAddBtn(this.addThreadBtn, this.EditState.getIdsList(), 'threads')
    }.bind(this)
    this.EditMenu.setLastAction(act)
    act(true)
  }

  _indexLi(ident) {
    var elm = getElm('LI')
    elm.dataset.ident = ident
    elm.append(this._indexLink(ident))
    this._setMoveBtns(elm, ident)
    return elm
  }

  _indexLink(ident) {
    var itemState = this.EditState.getAltEditState(ident)
    var indLk = baseViewLink(itemState, false)
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
          lchild.dispatchEvent(threadChangeEvt)
        })
        this.containers.distant.childNodes.forEach((dchild) => {
          dchild.dispatchEvent(threadChangeEvt)
        })
      }
    })

    return indLk
  }

  _toggleActiveBtn(ident, btn) {
    if (this.EditState.isFirstThread(ident)) {
      toggleDisabled(btn['up'], true)
    } else {
      toggleDisabled(btn['up'], false)
    }
    if (this.EditState.isLastThread(ident)) {
      toggleDisabled(btn['down'], true)
    } else {
      toggleDisabled(btn['down'], false)
    }
  }

  _permuteThread(goingUp, goingDown) {
    this.containers.index.removeChild(goingUp)
    this.containers.index.insertBefore(goingUp, goingDown)
    goingDown.dispatchEvent(updownEvt)
    goingUp.dispatchEvent(updownEvt)
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
    var dv = getElm('DIV', 'nx-edit-move')
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
      btn[it] = getElm('A', 'nx-edit-move-' + it)
      btn[it].append(iconImage(this.btnSrc[it], 16))
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
    var btn = getElm('BUTTON', 'nx-delete-link')
    btn.type = 'button'
    btn.textContent = '-'
    return btn
  }
}
