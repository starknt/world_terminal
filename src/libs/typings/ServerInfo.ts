import { Protocol } from 'libs/base/protocol'

export class ServerInfo {
  type = 0
  id = -1
  name = ''
  state = 0
  stateStr = ''
  isNeedSpecialCode = false
  actorCount = 0
  tag = ''
  lineList: ServerInfo[] = []
  webSocketUrl = ''
  wapSocketUrl = ''
  httpSocketUrl = ''
  areaServer!: ServerInfo
  logon = false

  constructor(type: number) {
    this.type = type
  }

  addLine(e: ServerInfo) {
    if (e && this.type === ServerInfo.TYPE_SERVER_AREA) {
      e.areaServer = this
      this.lineList.push(e)
    }
  }

  getAreaServer() {
    return this.type === ServerInfo.TYPE_SERVER_AREA ? this : this.areaServer
  }

  isSingleLineArea() {
    return !!(this.lineList == null || this.lineList.length <= 1)
  }

  getStatus() {
    return this.stateStr ? this.stateStr : ''
  }

  getTag() {
    return this.tag ? `【${this.tag}】` : ''
  }

  toString() {
    let e = ''
    if (this.type === ServerInfo.TYPE_SERVER_AREA) {
      e += ` id = ${this.id}`
      e += `, 区名 = ${this.name}(${this.tag})`
      e += `, 状态 = ${this.stateStr}(${this.state})`
      e += `, 角色数量 = ${this.actorCount}`
      e += '\n 区下分线： -->'

      for (let n = 0; n < this.lineList.length; n++) {
        const i = this.lineList[n]
        i != null && i.type !== ServerInfo.TYPE_SERVER_AREA && (e += i.toString())
      }
    }
    else {
      if (this.type === ServerInfo.TYPE_SERVER_LINE) {
        e += ` id = ${this.id}`
        e += `, 线名 = ${this.name}(${this.tag})`
        e += `, 状态 = ${this.stateStr}(${this.state})`
        e += `, webSocketUrl = ${this.webSocketUrl}`
      }
    }
    return e
  }
}

export namespace ServerInfo {
  export const SERVER_STATE_FREE = 0
  export const SERVER_STATE_BUSYNESS = 1
  export const SERVER_STATE_HOT = 2
  export const SERVER_STATE_FULL = 3
  export const SERVER_STATE_STOP = 4
  export const SERVER_STATE_TEST = 5
  export const SERVER_STATE_CLOSE = 6
  export const SERVER_STATE_MIX = 7
  export const SERVER_STATE_NEW = 8
  export const TYPE_SERVER_AREA = 0
  export const TYPE_SERVER_LINE = 1

  function createAreaInfo() {
    return new ServerInfo(ServerInfo.TYPE_SERVER_AREA)
  }

  function createLineInfo() {
    return new ServerInfo(ServerInfo.TYPE_SERVER_LINE)
  }

  export function fromAreaBytes(e: Protocol) {
    const n = createAreaInfo()
    return (
      (n.id = e.getShort()),
      (n.name = e.getString()),
      (n.actorCount = e.getByte()),
      (n.state = e.getByte()),
      (n.stateStr = e.getString()),
      (n.tag = e.getString()),
      (n.isNeedSpecialCode = e.getBoolean()),
      n
    )
  }

  export function fromLineBytes(e: Protocol) {
    const n = createLineInfo()
    return (
      (n.id = e.getShort()),
      (n.name = e.getString()),
      (n.webSocketUrl = e.getString()),
      (n.wapSocketUrl = e.getString()),
      (n.httpSocketUrl = e.getString()),
      (n.state = e.getByte()),
      (n.stateStr = e.getString()),
      n
    )
  }
}

