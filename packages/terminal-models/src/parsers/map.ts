import type { MaybeProtocol } from '@terminal/core'
import { compatByteArray } from '@terminal/core'
import { Npc } from './npc'

export class MapData {
  mapId = 0
  orgMapId = 0

  npc: Npc[] = []

  getNpcByID(id: number): Npc | undefined {
    return this.npc.find(npc => npc.id === id)
  }

  parseNPCData(p: MaybeProtocol) {
    p = compatByteArray(p)
    this.npc = Array.from({ length: p.readUnsignedByte() }, () => Npc.from(p))
  }

  clearNPC() {
    this.npc.length = 0
  }
}
