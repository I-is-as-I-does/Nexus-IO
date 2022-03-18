import { randomInt, randomString } from '@i-is-as-i-does/jack-js/src/modules/Help.js'
import { appUrl } from '@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js'

export function newState(data, url = 'nexus.json', id = '/', idx = -1) {
  return {
    dataUrl: url,
    srcData: data,
    threadId: id,
    threadIndex: idx,
  }
}

export function newData() {
  var randomId = randomString(10)
  return {
    nexus: appUrl,
    author: {
      handle: 'Anonymous-' + randomInt(100, 999),
      about: '',
      url: 'http://',
    },
    threads: [newThread(randomId)],
    index: [randomId],
  }
}

export function newThread(randomId) {
  return {
    id: randomId,
    title: randomId,
    description: '...',
    content: {
      timestamp: new Date().toISOString().split('T')[0],
      main: '...',
      aside: '',
      media: {
        url: '',
        type: '',
        caption: '',
      },
    },
    linked: [],
  }
}
