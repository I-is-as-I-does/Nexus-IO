import { historyBlock } from './NxHistory.js'
import { mainIndexBlock } from './NxIndex.js'
import { appHeader, instanceWrap, serviceWrap } from '../shared/NxCommons.js'
import { sourceBlock } from './NxSource.js'
import { mainThreadBlock } from './NxThread.js'

export function readerElms(seed) {
  return instanceWrap(appHeader(), [
    serviceWrap(
      [historyBlock(seed.state)],
      [mainIndexBlock(seed.state), mainThreadBlock(seed.state)],
      [sourceBlock(seed.state, seed.styleUrl, seed.editMode)],
      'reader'
    ),
  ])
}
