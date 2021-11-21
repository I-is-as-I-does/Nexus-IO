import { loadCss } from "../libr/Jack/Web.js";
import { consoleLog, logErr } from "../logs/NxLog.js";
import { getShadow } from "../base/NxContainer.js";
import { getOpt } from "../base/NxOptions.js";

  var loadedCss = {};

  export function loadAppCss(url = null, marker = ".nexus") {
    if (!url) {
      url = getOpt('style');
    }
    return loadCss(marker, url, getShadow())
      .then(() => {
        loadedCss[url] = true;
        return true;
      })
      .catch((err) => {
        consoleLog(err);
        logErr("Theme not found");
        loadedCss[url] = false;
        throw 404;
      });
  }

  export function isCssLoaded(url = null) {
    if (!url) {
        url = getOpt('style');
      }
    return loadedCss[url];
  }
