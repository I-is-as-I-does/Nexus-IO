import { getElm, landmarkElm } from '../shared/NxCommons'
import { resolveMediaType } from './NxEditCommons'

export class NxLocalFormFactory {
  constructor(InputsFactory) {
    this.InputsFactory = InputsFactory
  }

  newThreadLocalForm(ident, indexElm) {
    var form = getElm('FORM', 'nx-thread-local-form')
    var fieldset1 = this._localFieldSet1(ident, indexElm)
    var fieldset2 = this._localFieldSet2(ident)
    var fieldset3 = this._localFieldSet3(ident)

    form.append(
      landmarkElm('local thread'),
      fieldset1,
      landmarkElm('content'),
      fieldset2,
      landmarkElm('media'),
      fieldset3
    )
    return form
  }

  _localFieldSet1(ident, indexElm) {
    var fieldset1 = getElm('FIELDSET')

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
    var fieldset2 = getElm('FIELDSET')
    var fields = ['timestamp', 'main', 'aside']
    fields.forEach((field) => {
      fieldset2.append(this.InputsFactory.inputElm(['threads', ident, 'content', field]))
    })
    return fieldset2
  }

  _localFieldSet3(ident) {
    var fieldset3 = getElm('FIELDSET')

    var typeInp = this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'type'])
    var typeCallback = function (inp, valid) {
      if (valid) {
        var item = typeInp.querySelector('[data-item=' + resolveMediaType(inp.value) + ']')
        if (item) {
          item.click()
        }
      }
    }
    fieldset3.append(
      this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'url'], typeCallback)
    )
    fieldset3.append(typeInp)
    fieldset3.append(this.InputsFactory.inputElm(['threads', ident, 'content', 'media', 'caption']))
    return fieldset3
  }
}
