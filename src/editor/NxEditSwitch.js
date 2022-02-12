import { vShow, vHide } from '@i-is-as-i-does/valva/src/modules/transitions.js'
import { getElm, iconImage } from '../shared/NxCommons.js'
import { editB64, previewB64 } from '../shared/NxIcons.js'

export class NxEditSwitch {
  constructor(editInst, readerInst, readerUpdatePrc) {
    this.editInst = editInst
    this.readerInst = readerInst

    this.readerUpdatePrc = readerUpdatePrc

    this.previewOn = false
    this._setSwitchBtn()
  }

  getSwitchBtn() {
    return this.switchBtn
  }

  _instanceSwitch() {
    this.previewOn = !this.previewOn

    if (this.previewOn) {
      vHide(this.editInst, 'fade', 200,  function () {
        this.readerUpdatePrc()
        this.switchBtn.firstChild.src = editB64
        vShow(this.readerInst, 'fade', 200)
      }.bind(this))
    } else {
      vHide(this.readerInst, 'fade', 200,  function () {
        this.switchBtn.firstChild.src = previewB64
        vShow(this.editInst, 'fade', 200)
      }.bind(this))
    }
  }

  _setSwitchBtn() {
    this.switchBtn = getElm('A', 'nx-edit-switch')
    this.switchBtn.append(iconImage(previewB64, 25))

    this.switchBtn.addEventListener('click', this._instanceSwitch.bind(this))
  }
}
