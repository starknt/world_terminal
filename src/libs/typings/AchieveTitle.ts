import { Protocol } from "libs/base/protocol"

export class AchieveTitle {
  id = 0
  name = ''
  power1 = 0
  powerValue1 = 0
  power2 = 0
  powerValue2 = 0
}

export namespace AchieveTitle {
  export function fromBytes(bytes: Protocol) {
    const list: AchieveTitle[] = []
    for (let n = bytes.getByte(), o = 0; n > o; o++) {
      const achieveTitle = new AchieveTitle()
      achieveTitle.id = bytes.getShort()
      achieveTitle.name = bytes.getString()
      achieveTitle.power1 = bytes.getUnsignedByte()
      achieveTitle.powerValue1 = bytes.getShort()
      achieveTitle.power2 = bytes.getUnsignedByte()
      achieveTitle.powerValue2 = bytes.getShort()

      list[o] = achieveTitle
    }

    return list
  }
}
