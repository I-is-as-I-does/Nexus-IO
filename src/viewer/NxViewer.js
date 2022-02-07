/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */

import { historyBlock } from "./NxHistory.js";
import { mainIndexBlock } from "./NxIndex.js";
import { appHeader, instanceWrap, serviceWrap
 } from "../browser/NxCommons.js";
import { sourceBlock } from "./NxSource.js";
import { mainThreadBlock } from "./NxThread.js";


export function viewerElms(seed){

    return instanceWrap(appHeader(), [serviceWrap
   ([historyBlock(seed.state)], [
    mainIndexBlock(seed.state),
    mainThreadBlock(seed.state)
     ], [sourceBlock(seed.state, seed.styleUrl, seed.editMode)])]);
}