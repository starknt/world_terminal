import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'

export const enum ServerStatus {
  SERVER_STATE_FREE = 0,
  SERVER_STATE_BUSYNESS = 1,
  SERVER_STATE_HOT = 2,
  SERVER_STATE_FULL = 3,
  SERVER_STATE_STOP = 4,
  SERVER_STATE_TEST = 5,
  SERVER_STATE_CLOSE = 6,
  SERVER_STATE_MIX = 7,
  SERVER_STATE_NEW = 8,
}

export class ServerAreaInfo {
  id!: number
  name!: string
  actorCount!: number
  state!: ServerStatus
  stateStr!: string
  tag!: string
  isNeedSpecialCode!: boolean
  lines: ServerLineInfo[] = []

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const area = new ServerAreaInfo()
    area.id = p.getShort()
    area.name = p.getString()
    area.actorCount = p.getByte()
    area.state = p.getByte()
    area.stateStr = p.getString()
    area.tag = p.getString()
    area.isNeedSpecialCode = p.getBoolean()
    return area
  }
}

export class ServerLineInfo {
  id!: number
  name!: string
  webSocketUrl!: string
  wapSocketUrl!: string
  httpSocketUrl!: string
  state!: number
  stateStr!: string

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const line = new ServerLineInfo()
    line.id = p.getShort()
    line.name = p.getString()
    line.webSocketUrl = p.getString()
    line.wapSocketUrl = p.getString()
    line.httpSocketUrl = p.getString()
    line.state = p.getByte()
    line.stateStr = p.getString()
    return line
  }
}
