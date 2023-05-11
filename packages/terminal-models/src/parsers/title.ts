import type { Protocol } from '@terminal/ws'

export class Title {
  id = 0
  name = ''
  power1 = 0
  power1Value = 0
  power2 = 0
  power2Value = 0

  static from(p: Protocol) {
    const title = new Title()
    title.id = p.getShort()
    title.name = p.getString()
    title.power1 = p.getUnsignedByte()
    title.power1Value = p.getShort()
    title.power2 = p.getUnsignedByte()
    title.power2Value = p.getShort()
    return title
  }

  static fromArray(p: Protocol) {
    return Array.from({ length: p.getByte() }, () => Title.from(p))
  }
}
