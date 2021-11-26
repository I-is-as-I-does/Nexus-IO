import { getTxt } from "../core/transl/NxCoreTranslate.js";
import { registerTranslElm } from "../core/transl/NxElmTranslate.js";
import { getElm } from "../viewer/NxCommons.js";

export function formCategory(name, subcount) {
    var p = getElm("P", "nx-edit-category");
  
    for (var i = 0; i < subcount; i++) {
      var sp = getElm("SPAN", "nx-edit-category-indent");
      sp.textContent = "|";
      p.append(sp);
    }
    var txtsp = getElm("SPAN");
    txtsp.textContent = getTxt(name);
  registerTranslElm(txtsp, name);
    p.append(txtsp);
    return p;
  }
  export function textInput(val) {
    var inp = getElm("INPUT", "nx-edit-text");
    inp.type = "text";
    inp.value = val;
    return inp;
  }
  
  export function textareaInput(val) {
    var inp = getElm("TEXTAREA", "nx-edit-textarea");
    inp.textContent = val;
    return inp;
  }
  export  function dateInput(val) {
    var inp = getElm("INPUT");
    inp.type = "datetime-local";
    inp.value = val;
    return inp;
  }
  
  export function baseLabel(field) {
    var lb = getElm("LABEL", "nx-edit-label");
    lb.for = field;
    var title = getElm("SPAN", "nx-edit-title");
    title.textContent = getTxt(field);
  registerTranslElm(title, field);
    lb.append(title);
    return lb;
  }

  
export function deleteLinkBtn() {
  var btn = getElm("BUTTON", "nx-delete-link");
  btn.type = "button";
  btn.textContent = "-";
  return btn;
}

export function addBtn() {
  var btn = getElm("BUTTON", "nx-add-link");
  btn.type = "button";
  btn.textContent = "+";
  return btn;
}

export function invalidSp() {
  var sp = getElm("SPAN", "nx-edit-feedback");
  return sp;
}

