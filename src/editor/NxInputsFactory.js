import { getSrcData } from '@i-is-as-i-does/nexus-core/src/load/NxSrc'
import { getTxt } from '@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate'
import { registerTranslElm } from '@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate'
import {
  charMinMax,
  idPattern,
  supportedMediaTypes,
  urlPattern,
} from '@i-is-as-i-does/nexus-core/src/validt/NxSpecs'
import { isValidUrl } from '@i-is-as-i-does/nexus-core/src/validt/NxStamper'
import { getElm, iconImage, selectDropDown } from '../shared/NxCommons'
import { invalidB64, validB64 } from '../shared/NxIcons'
import { isUnique, uniqueId } from './NxEditCommons'

export class NxInputsFactory {
  constructor(EditState, EditMenu) {
    this.EditState = EditState
    this.EditMenu = EditMenu
  }

  inputElm(ref, callback = null, store = null) {
    var idents = this._fieldIdents(ref)
    var inp = this._resolveInput(idents, ref)

    var lb = this._baseLabel(idents.alias)
    var indc = getElm('SPAN', 'nx-edit-indication')
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
        inp.pattern = urlPattern
        break
      case 'linked':
        indc.textContent = '[http]'
        inp.pattern = urlPattern
        break
      case 'id':
        indc.textContent = '[A-Za-z0-9-][3-36]'
        inp.pattern = idPattern
        break
      case 'type':
        inp.pattern = '(' + supportedMediaTypes.join('|') + ')'
        break
      case 'timestamp':
        break
      default:
        var minmax = charMinMax[idents.field]
        indc.textContent = '[' + minmax[0] + '-' + minmax[1] + ']'
        inp.setAttribute('maxlength', minmax[1])
        inp.setAttribute('minlength', minmax[0])
    }
  }

  _wrapInput(idents, inp, lb) {
    var wrap = getElm('DIV', 'nx-edit-input nx-edit-' + idents.parent + '-' + idents.field)
    wrap.append(lb)
    if (idents.field === 'type') {
      wrap.append(this._typeDropDown(inp))
    } else {
      wrap.append(inp)
    }
    return wrap
  }

  _typeDropDown(inp) {
    var items = supportedMediaTypes
    return selectDropDown(items, inp, null, 'nx-edit-media-type-select')
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
    var inp = getElm('INPUT', 'nx-edit-text')
    inp.type = 'text'
    inp.value = val
    return inp
  }

  _textareaInput(val) {
    var inp = getElm('TEXTAREA', 'nx-edit-textarea')
    inp.textContent = val
    return inp
  }
  _dateInput(val) {
    var inp = getElm('INPUT', 'nx-edit-date')
    inp.type = 'datetime-local'
    inp.value = val
    return inp
  }

  _baseLabel(field) {
    var lb = getElm('LABEL', 'nx-edit-label')
    lb.for = field
    var title = getElm('SPAN', 'nx-edit-title')
    title.textContent = getTxt(field)
    registerTranslElm(title, field)
    lb.append(title)
    return lb
  }

  _invalidSp() {
    var sp = getElm('SPAN', 'nx-edit-feedback')
    sp.append(iconImage(invalidB64))
    return sp
  }

  _inputEvtHandler(ref, inp, fdbck, callback) {
    var valid = inp.checkValidity()
    var validPromise = null

    if ((valid && ref.includes('url')) || ref.includes('linked')) {
      valid = isValidUrl(inp.value)
      if (valid && ref.includes('linked')) {
        valid = isUnique(
          this.EditState.getLinkedUrls(ref[1]),
          inp.value,
          this.EditState.getLinkedThreadIdx(ref[1], ref[3])
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
    } else if (ref.includes('id')) {
      var nId = uniqueId(
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
    var icsrc = invalidB64
    if (valid) {
      icsrc = validB64
    }
    fdbck.firstChild.src = icsrc
  }

  _setInputEvt(ref, inp, fdbck, callback) {
    var c = 0
    var undone = ''
    var prev = inp.value
    inp.addEventListener('focus', function () {
      prev = inp.value
    })
    inp.addEventListener(
      'change',
      function () {
        this._inputEvtHandler(ref, inp, fdbck, callback)
        if (c > 0) {
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
        } else {
          c++
        }
      }.bind(this)
    )
  }
}
