import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'
import { Item } from './item'

export const ARMOR_NECKLACE_POS = 0
export const PET_POS = 1
export const ARMOR_RING_LEFT_POS = 2
export const ARMOR_FASHION_POS = 3
export const ARMOR_BACK_POS = 4
export const ARMOR_CLOTHES_POS = 5
export const ARMOR_HAND_POS = 6
export const ARMOR_HEAD_POS = 7
export const WEAPON_LEFT_POS = 8
export const ARMOR_SHOES_POS = 9
export const WEAPON_RIGHT_POS = 10
export const ARMOR_WAIST_POS = 11
export const ARMOR_TROUSERS_POS = 12
export const ARMOR_SHOULDER_POS = 13
export const ARMOR_AMULET_POS = 14
export const ARMOR_TRANSPORT_POS = 15
export const ARMOR_RING_RIGHT_POS = 16
export const SPIRIT_POS = 17
export const EQUIP_POS_START = 0
export const EQUIP_POS_END = 30
export const MAX_BAG_NUM = 7
export const OPEN_BAG_NUM = 7
export const BAG_NUM = 4
export const EACH_BAG_SIZE = 25
export const DEFAULT_OPEN_SIZE = 60
export const OPEN_BAG_SIZE = EQUIP_POS_END + OPEN_BAG_NUM * EACH_BAG_SIZE
export const BAG_SIZE = EQUIP_POS_END + MAX_BAG_NUM * EACH_BAG_SIZE
export const BAG_START = EQUIP_POS_END
export const MAX_STORE_SIZE = 60
export const STORE_START = BAG_SIZE
export const STORE_END = STORE_START + MAX_STORE_SIZE
export const MAX_VIPSTORE_SIZE = 90
export const VIPSTORE_START = STORE_END
export const VIPSTORE_END = VIPSTORE_START + MAX_VIPSTORE_SIZE
export const TYPE_EQUIP_POS = 1
export const TYPE_BAG_POS = 2
export const TYPE_STORAGE_POS = 3
export const TYPE_VIPSTORAGE_POS = 4
export const DUR_CHANGE_TYPE_POINT = 1
export const DUR_CHANGE_TYPE_PERCENT = 2
export const DEAD_DUR_DOWN = 10
export const DUR_DOWN_POINT = 1
export const CLEAR_BAG_SELLING_STATUS = 0
export const CLEAR_BAG_MAIL_SELECT = 1
export const CLEAR_BAG_SHOP_LOCKED = 2
export const CLEAR_BAG_INTEGRAL = 3
export const gridMoneyCost = [25, 50, 100, 150, 150, 200, 200, 200, 250, 250, 300]

export class Bag {
  bagEnd: number = BAG_SIZE - 1
  nextTime!: number
  countOfMoneyOpen!: number
  countOfTimeOpen!: number
  store: Item[] = Array.from({ length: BAG_SIZE + MAX_STORE_SIZE + MAX_VIPSTORE_SIZE })

  getStartEndPos(type: number, s = 0) {
    const n = 0
    const i = 0
    switch (type) {
      case TYPE_EQUIP_POS:
        return [EQUIP_POS_START, EQUIP_POS_END - 1]
      case TYPE_BAG_POS:
        return [BAG_START, this.bagEnd]
      case TYPE_STORAGE_POS:
        return [STORE_START, STORE_START + s - 1]
      case TYPE_VIPSTORAGE_POS:
        return [VIPSTORE_START, VIPSTORE_END - 1]
      default:
        return [n, i]
    }
  }

  isValidPos(pos: number) {
    return pos >= 0 && pos <= this.store.length
  }

  setItem(item: Item, slot: number) {
    if (this.isValidPos(slot)) {
      item.slotPos = slot
      this.store[slot] = item
    }
  }

  getItemById(id: number) {
    let itemNum = 0
    for (let i = BAG_START; i <= this.bagEnd; i++) {
      const item = this.store[i]
      if (item && item.id === id)
        itemNum += item.quantity
    }

    return itemNum
  }

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const bag = new Bag()
    bag.bagEnd = p.getInt()
    bag.nextTime = p.getLong().value
    bag.countOfMoneyOpen = p.getInt()
    bag.countOfTimeOpen = p.getInt()
    const items = Array.from({ length: p.getShort() }, () => Item.from(p))
    for (const item of items)
      bag.setItem(item, item.slotPos)
  }
}
