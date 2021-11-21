import { getHost, setContainer } from "../base/NxContainer.js";
import { loadAppCss } from "./NxStyle.js";
import { getOpt, setOptions } from "../base/NxOptions.js";
import { consoleLog } from "../logs/NxLog.js";
import { resolveState, setOriginState } from "../state/NxUpdate.js";



export function initPage(contentCallback, containerSelector = null, options = null){
  setContainer(containerSelector);
  setOptions(options);

    var render = function(success, state){
      getHost().append(contentCallback(success, state));
  };
  loadAppCss().then(()=> {
    if(getOpt('src')){
        return resolveState(getOpt('src'), getOpt('id'));
    } else {
       return null;
    }
  }).then((state)=> {
    if(state){
      setOriginState(state);    
    }
    render(true, state);
  }).catch((err)=> {
    consoleLog(err);
    render(false, null);
  });
  }