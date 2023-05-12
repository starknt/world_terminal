import type { MaybeProtocol } from '@terminal/core'
import { ByteArray, compatByteArray } from '@terminal/core'

export class Condition {
  type = 0
  not = 0
  data = new ByteArray()

  static from(p: MaybeProtocol) {
    p = compatByteArray(p)
    const condition = new Condition()
    condition.type = p.readByte()
    condition.not = p.readByte()
    const o = 255 & p.readByte()
    if (o > 0)
      p.readBytes(condition.data, condition.data.position, o)
    return condition
  }
}
