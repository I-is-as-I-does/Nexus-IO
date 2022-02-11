

import { getSrcData, getThreadsList } from "@i-is-as-i-does/nexus-core/src/load/NxSrc.js";
import { isThreadContentUnseen, registerThreadVisit } from "@i-is-as-i-does/nexus-core/src/storg/NxMemory.js";


var currentState = {
      dataUrl: null,
      srcData: null,
      threadId: "/",
      threadIndex: -1
    };
    
var updateStore = { onChange: [], onSrcChange: [] };


function triggerCallbacks(state, triggerAll, skipHistoryUpdate) {
  var ks = ["onChange"];
  if (triggerAll) {
    ks.push("onSrcChange");
  }

  ks.forEach((k) => {
    if (updateStore[k].length) {
     updateStore[k].forEach((callback) => {
        callback(state, skipHistoryUpdate);
      });
    }
  });
}


export function concatSrc(state){
  var src = state.dataUrl
  if(state.threadId !== '/'){
    src += '#'+state.threadId
  }
 return src
}

export function getTimestamp(state){
  if (state.threadIndex !== -1 && state.threadIndex < state.srcData.threads.length) {
return state.srcData.threads[state.threadIndex].content.timestamp
  }
  return null
}

export function isStateUnseen(state){
  if (state.threadIndex !== -1 && state.srcData.index.indexOf(state.threadIndex) !== -1) {
    return isThreadContentUnseen(concatSrc(state), getTimestamp(state))
  }
  return false
}

export function dataToState(dataUrl, threadId, data, acceptNoId = false){
  data.index = getThreadsList(data)
    var state = {
      dataUrl: dataUrl,
      threadId: threadId,
      srcData: data,
      threadIndex: data.index.indexOf(threadId)
    };

    if (state.threadIndex === -1) {
      if(acceptNoId){
        if(state.threadId !== '/'){
          state.threadId = '/'
        }
      } else {
        setDefaultThread(state)
      }   
    }
    return state;
}

export function setDefaultThread(state){
  state.threadIndex = 0
  state.threadId = state.srcData.index[0]
}

export function resolveState(dataUrl, threadId, acceptNoId = false) {
  return getSrcData(dataUrl).then((data) => {
  return dataToState(dataUrl, threadId, data, acceptNoId)
  });
}

export function registerUpdateEvt(callback, onSrcChange = false) {
  var k = "onChange";
  if (onSrcChange) {
    k = "onSrcChange";
  }
  updateStore[k].push(callback);
}

export function triggerUpdate(state, skipHistoryUpdate = false, forceTrigger = false) {

    var srcChanged = state.dataUrl != currentState.dataUrl;
    if(state.threadId === '/'){
      setDefaultThread(state)
    }

    if (forceTrigger || srcChanged || state.threadId != currentState.threadId) {

      if (!skipHistoryUpdate) {
        registerThreadVisit(concatSrc(currentState), getTimestamp(currentState));
      }
    
      var resetIndex = srcChanged || forceTrigger;
      currentState = Object.assign({},state);

      triggerCallbacks(state, resetIndex, skipHistoryUpdate);

  }
}

export function getCurrentState() {
  return currentState;
}

export function setOriginState(state) {
  if (!currentState.dataUrl) {
    currentState = state;
    return true;
  }
  return false;
}


export function getAltState(state, nId, nIndex){
  var altState = Object.assign({}, state);

  altState.threadId = nId;
  altState.threadIndex = nIndex;
  return altState
}

