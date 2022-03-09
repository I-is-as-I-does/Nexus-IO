import { initAll, retrieveNxElm } from '@i-is-as-i-does/nexus-core/src/load/NxInit.js'
import { getQuery } from '@i-is-as-i-does/nexus-core/src/base/NxHost.js'
import { setOriginLang } from '@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js'
import { logErr } from '@i-is-as-i-does/nexus-core/src/logs/NxLog.js'
import { dataToState, setOriginState, triggerUpdate } from './NxState.js'
import { editorElms } from './../editor/NxEditor.js'
import { readerElms } from './../reader/NxReader.js'
import { errorPrgr } from './NxCommons.js'
import { appDefaultCss, legacyDefaultCss } from './NxCdn.js'
import { getSrcDocData } from '@i-is-as-i-does/nexus-core/src/load/NxSrc.js'
import { vHide, vShow } from '@i-is-as-i-does/valva/src/modules/transitions.js'

function mountApp(nxElm, appElm) {
  var host = document.createElement('DIV')
  host.className = 'nx'
  host.append(appElm)
  nxElm.append(host)
  return host;
}

function updateHost(host, appElm){
  vHide(host, 'ease', 200, function(){
    host.textContent = ''
    host.append(appElm)
    vShow(host, 'ease', 200)
  })
}

export function init() {
  var feedback = errorPrgr();
  feedback.classList.add('nx-instance');
  
  initAll({
    appDefaultLang: 'en',
    appDefaultCss: appDefaultCss,
    appDefaultCssAliases: legacyDefaultCss,
  })
    .then((seed) => {
      setOriginLang(seed.request.lang)
      seed.state = dataToState(seed.request.url, seed.request.id, seed.nxdata)
      setOriginState(seed.state)
      var elm
      seed.editMode = false
      if (getQuery('edit') || getQuery('new')) {
        seed.editMode = true
         elm = editorElms(seed)
      } else {
         elm = readerElms(seed)
      }
    var host = mountApp(seed.nxelm, elm)
    var on = true;

    seed.nxelm.addEventListener('change', function () {
      if (seed.nxelm.dataset.srcdoc) {
        var nxdata = getSrcDocData(seed.nxelm.dataset.srcdoc, seed.request.mode === 'editor')
        if (nxdata) {
          seed.nxdata = nxdata
          seed.state = dataToState(seed.request.url, seed.request.id, seed.nxdata)
          if(on){
            triggerUpdate(seed.state, true, true)
          } else {
            on = true
            updateHost(host, elm)
          }

        } else if(on) {
          on = false
          updateHost(host, feedback)
        }
      }
    })

    }).catch((err) => {
      logErr(err.message)
      mountApp(retrieveNxElm(), feedback)
    })
}
