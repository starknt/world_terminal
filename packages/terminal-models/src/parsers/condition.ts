import { ByteArray } from '@terminal/kit'

export class Condition {
  type = 0
  not = 0
  data = new ByteArray()

  static from(b: ByteArray) {
    const condition = new Condition()
    condition.type = b.readByte()
    condition.not = b.readByte()
    const o = 255 & b.readByte()
    if (o > 0)
      b.readBytes(condition.data, condition.data.position, o)
    return condition
  }
}
