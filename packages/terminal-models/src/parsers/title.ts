import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'

export class Title {
  id = 0
  name = ''
  power1 = 0
  power1Value = 0
  power2 = 0
  power2Value = 0

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const title = new Title()
    title.id = p.getShort()
    title.name = p.getString()
    title.power1 = p.getUnsignedByte()
    title.power1Value = p.getShort()
    title.power2 = p.getUnsignedByte()
    title.power2Value = p.getShort()
    return title
  }

  static fromArray(p: MaybeProtocol) {
    p = Protocol.from(p)
    return Array.from({ length: p.getByte() }, () => Title.from(p))
  }
}
