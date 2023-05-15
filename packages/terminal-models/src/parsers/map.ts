import type { MaybeProtocol } from '@terminal/core'
import { compatByteArray } from '@terminal/core'
import { Npc } from './npc'

export class MapData {
  mapId = 0
  orgMapId = 0

  npcList: Npc[] = []

  getNpcByID(id: number): Npc | undefined {
    return this.npcList.find(npc => npc.id === id)
  }

  parseNPCData(p: MaybeProtocol) {
    p = compatByteArray(p)
    this.npcList = Array.from({ length: p.readUnsignedByte() }, () => Npc.from(p))
  }

  clearNPC() {
    this.npcList.length = 0
  }
}
