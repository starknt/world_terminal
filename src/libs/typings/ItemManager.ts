import { ItemData } from './ItemData'

export class ItemManager {}

export namespace ItemManager {
  export function getItemFromMissionBytes(byte: egret.ByteArray) {
    const item = new ItemData()

    item.id = 65535 & byte.readShort()
    item.quantity = byte.readByte()
    item.name = byte.readUTF()
    item.bagIcon = byte.readUnsignedByte()
    item.grade = byte.readByte()

    return item
  }
}
