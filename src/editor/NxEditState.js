import { randomString } from '@i-is-as-i-does/jack-js/src/modules/Help'
import { getQuery } from '@i-is-as-i-does/nexus-core/src/base/NxHost'
import { getThreadsList } from '@i-is-as-i-does/nexus-core/src/load/NxSrc'
import { getStoredEditData, registerEditData } from '@i-is-as-i-does/nexus-core/src/storg/NxMemory'
import { getAltState } from '../shared/NxState'
import { newState, newData } from './NxEditStarters'

export class NxEditState {
  constructor(state) {
    var url = 'nexus-tmp'
    var data = null

    if (getQuery('new')) {
      data = newData()
      state = null
    } else {
      if (state.dataUrl) {
        url = state.dataUrl
      }
      data = getStoredEditData(url)
      if (data === null) {
        if (state.srcData !== null) {
          data = state.srcData
        } else {
          data = newData()
        }
        registerEditData(url, data)
      }
    }

    if (!data.index) {
      data.index = getThreadsList(data)
    }

    var origin = data
    if (state !== null && state.srcData !== null) {
      origin = state.srcData
    }
    this.originData = JSON.stringify(origin)

    var id = data.threads[0].id
    var idx = 0

    if (state && state.threadId !== '/' && data.index.includes(state.threadId)) {
      id = state.threadId
      idx = data.index.indexOf(state.threadId)
    }

    this.state = newState(data, url, id, idx)
    this.threadsMap = {} // @doc originIdx: { id: currentId, idx: currentIdx, linked :{}}
  }

  /* whole state methods */

  getState() {
    return this.state
  }

  getOriginData() {
    return this.originData
  }

  getJsonState() {
    return JSON.stringify(this.state)
  }

  getAltEditState(ident) {
    return getAltState(this.state, this.getThreadId(ident), this.getThreadIdx(ident))
  }

  setNewState(jsonState) {
    this.state = Object.assign({}, JSON.parse(jsonState))
  }

  /* form methods */

  setAuthorValue(ref, value) {
    if (!this.state.srcData.author) {
      this.state.srcData.author = {}
    }
    this.state.srcData.author[ref[1]] = value
  }

  setThreadIndex(ident) {
    if (!this.state.srcData.threads) {
      this.state.srcData.threads = []
    } else {
      var idx = this.getThreadIdx(ident)
      if (typeof this.state.srcData.threads[idx] === 'undefined') {
        this.state.srcData.threads[idx] = {}
      }
    }
  }

  setThreadId(ref, value) {
    this.threadsMap[ref[1]].id = value
    var idx = this.getThreadIdx(ref[1])
    this.state.srcData.index[idx] = value
    this.state.srcData.threads[idx].id = value
  }

  setThreadInfo(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    this.state.srcData.threads[idx][ref[2]] = value
  }

  setContentValue(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    if (!this.state.srcData.threads[idx].content) {
      this.state.srcData.threads[idx].content = {}
    }
    if (ref[3] !== 'media') {
      this.state.srcData.threads[idx].content[ref[3]] = value
      return
    }
    if (!this.state.srcData.threads[idx].content.media) {
      this.state.srcData.threads[idx].content.media = {}
    }
    this.state.srcData.threads[idx].content.media[ref[4]] = value
  }

  setLinkedValue(ref, value) {
    var idx = this.getThreadIdx(ref[1])
    if (!this.state.srcData.threads[idx].linked) {
      this.state.srcData.threads[idx].linked = [value]
    } else {
      var lidx = this.getLinkedThreadIdx(ref[1], ref[3])
      this.state.srcData.threads[idx].linked[lidx] = value
    }
  }

  setNewValue(ref, value) {
    if (this.state.srcData === null) {
      this.state.srcData = {}
      this.state.srcData.index = []
    }
    if (ref[0] === 'author') {
      return this.setAuthorValue(ref, value)
    }
    this.setThreadIndex(ref[1])

    if (ref[2] === 'id') {
      return this.setThreadId(ref, value)
    }
    if (!['linked', 'content'].includes(ref[2])) {
      return this.setThreadInfo(ref, value)
    }

    if (ref[2] === 'content') {
      return this.setContentValue(ref, value)
    }
    this.setLinkedValue(ref, value)
  }

  getValue(ref) {
    if (this.state.srcData) {
      if (ref[0] === 'author') {
        return this.state.srcData.author[ref[1]]
      }
      var idx = this.getThreadIdx(ref[1])
      if (!['linked', 'content'].includes(ref[2])) {
        return this.state.srcData.threads[idx][ref[2]]
      }
      if (ref[2] === 'content') {
        if (ref[3] !== 'media') {
          return this.state.srcData.threads[idx].content[ref[3]]
        }
        return this.state.srcData.threads[idx].content.media[ref[4]]
      }
      var lidx = this.getLinkedThreadIdx(ref[1], ref[3])
      return this.state.srcData.threads[idx].linked[lidx]
    }
    return ''
  }

  /* state infos methods */

  getThreadId(ident) {
    return this.threadsMap[ident].id
  }

  getThreadIdx(ident) {
    var idx = this.threadsMap[ident].idx
    var count = this.getThreadsCount()
    if (idx >= count) {
      idx = count - 1
      this.threadsMap[ident].idx = idx
      if (this.isCurrentId(ident)) {
        this.state.threadIndex = idx
      }
    }
    return idx
  }

  getIdsList() {
    return this.state.srcData.index
  }

  getThreadsCount() {
    return this.state.srcData.index.length
  }

  getCurrentThreadId() {
    return this.state.threadId
  }

  getCurrentThreadIdx() {
    return this.state.threadIndex
  }

  isCurrentId(ident) {
    return this.threadsMap[ident].id === this.state.threadId
  }

  /* specific thread methods */

  unsetCurrentThread() {
    this.state.threadId = '/'
    this.state.threadIndex = -1
  }

  isFirstThread(ident) {
    return this.getThreadIdx(ident) === 0
  }

  isLastThread(ident) {
    return this.getThreadIdx(ident) + 1 === this.getThreadsCount()
  }

  getThreadData(ident) {
    var idx = this.getThreadIdx(ident)
    var threadData = this.state.srcData.threads[idx]
    if (!threadData) {
      this.state.srcData.threads[idx] = {}
    }
    return threadData
  }

  removeThread(ident) {
    var idx = this.getThreadIdx(ident)
    this.state.srcData.index.splice(idx, 1)
    this.state.srcData.threads.splice(idx, 1)

    if (!this.isLastThread(ident)) {
      for (let [k, v] of Object.entries(this.threadsMap)) {
        if (v.idx > idx) {
          this.threadsMap[k].idx = v.idx - 1
        }
      }
    }

    if (this.isCurrentId(ident)) {
      this.unsetCurrentThread()
    } else if (this.state.threadIndex > idx) {
      this.state.threadIndex--
    }
  }

  insertThread(ident, threadData) {
    if (this.isLastThread(ident)) {
      this.pushThread(threadData)
    } else {
      var idx = this.getThreadIdx(ident)
      this.state.srcData.index.splice(idx, 0, threadData.id)
      this.state.srcData.threads.splice(idx, 0, threadData)
      for (let [k, v] of Object.entries(this.threadsMap)) {
        if (v.id !== threadData.id && v.idx >= idx) {
          this.threadsMap[k].idx = v.idx + 1
        }
      }
      if (this.state.threadIndex >= idx) {
        this.state.threadIndex++
      }
    }
  }

  newIdent(id, idx) {
    var ident = randomString(21)
    this.threadsMap[ident] = { id: id, idx: idx, linked: {} }
    return ident
  }

  changeCurrentThread(ident) {
    this.state.threadId = this.getThreadId(ident)
    this.state.threadIndex = this.getThreadIdx(ident)
  }

  moveThread(ident, siblingIdent, up = false) {
    var from = this.getThreadIdx(ident)
    var to = from + 1
    if (up) {
      to = from - 1
    }
    this.state.srcData.index.splice(to, 0, this.state.srcData.index.splice(from, 1)[0])
    this.state.srcData.threads.splice(to, 0, this.state.srcData.threads.splice(from, 1)[0])
    this.threadsMap[ident].idx = to
    this.threadsMap[siblingIdent].idx = from

    if (this.isCurrentId(ident)) {
      this.state.threadIndex = to
    } else if (this.isCurrentId(siblingIdent)) {
      this.state.threadIndex = from
    }
  }

  pushThread(threadData) {
    this.state.srcData.threads.push(threadData)
    this.state.srcData.index.push(threadData.id)
  }

  /* linked threads methods */

  getLinkedThreadIdx(ident, lkident) {
    var idx = this.threadsMap[ident].linked[lkident].idx
    var count = this.getLinkedUrlsCount(ident)
    if (idx >= count) {
      idx = count - 1
      this.threadsMap[ident].linked[lkident].idx = idx
    }
    return idx
  }

  getLinkedUrls(ident) {
    var threadData = this.getThreadData(ident)
    if (!Object.prototype.hasOwnProperty.call(threadData, 'linked')) {
      var idx = this.getThreadIdx(ident)
      this.state.srcData.threads[idx].linked = []
      return []
    }
    return threadData.linked
  }

  getLinkedUrlsCount(ident) {
    return this.getLinkedUrls(ident).length
  }

  registerLinkedThread(ident, linkIdx) {
    var lkident = randomString(21)
    this.threadsMap[ident].linked[lkident] = { idx: linkIdx }
    return lkident
  }

  isLastLinkedThread(ident, lkident) {
    return this.getLinkedThreadIdx(ident, lkident) === this.getLinkedUrlsCount(ident) - 1
  }

  removeLinkedThread(ident, lkident) {
    var tidx = this.getThreadIdx(ident)
    var lidx = this.getLinkedThreadIdx(ident, lkident)
    if (lidx === this.getLinkedUrlsCount(ident) - 1) {
      this.state.srcData.threads[tidx].linked.pop()
    } else {
      this.state.srcData.threads[tidx].linked.splice(lidx, 1)
      for (let [k, v] of Object.entries(this.threadsMap[ident].linked)) {
        if (v.idx > lidx) {
          this.threadsMap[ident].linked[k].idx = v.idx - 1
        }
      }
    }
  }

  pushLinkedThread(ident, value) {
    var idx = this.getThreadIdx(ident)
    if(!this.state.srcData.threads[idx].linked){
      this.state.srcData.threads[idx].linked = []
    }
      this.state.srcData.threads[idx].linked.push(value)
  }

  insertLinkedThread(ident, lkident, value) {
    if (this.isLastLinkedThread(ident, lkident)) {
      this.pushLinkedThread(ident, value)
    } else {
      var tidx = this.getThreadIdx(ident)
      var lidx = this.getLinkedThreadIdx(ident, lkident)
      this.state.srcData.threads[tidx].linked.splice(lidx, 0, value)
      for (let [k, v] of Object.entries(this.threadsMap[ident].linked)) {
        if (v.idx >= lidx && k !== lkident) {
          this.threadsMap[ident].linked[k].idx = v.idx + 1
        }
      }
    }
  }
}
