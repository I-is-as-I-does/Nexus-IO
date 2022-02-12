import { itemsMinMax } from '@i-is-as-i-does/nexus-core/src/validt/NxSpecs'
import { getElm } from '../shared/NxCommons.js'

export function addBtn() {
  var btn = getElm('BUTTON', 'nx-add-link')
  btn.type = 'button'
  btn.textContent = '+'
  return btn
}

export function toggleAddBtn(btn, haystack, itemsKey) {
  var disabled = false
  if (itemsMinMax[itemsKey][1] <= haystack.length) {
    disabled = true
  }
  if (btn.disabled !== disabled) {
    btn.classList.toggle('nx-disabled')
    btn.disabled = disabled
  }
}
