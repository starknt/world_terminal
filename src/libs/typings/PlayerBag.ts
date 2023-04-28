import { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { ItemData } from './ItemData'
import type { Player } from './Player'

export class PlayerBag {
  bagEnd = PlayerBag.BAG_SIZE - 1
  store: ItemData[] = new Array(PlayerBag.BAG_SIZE + PlayerBag.MAX_STORE_SIZE + PlayerBag.MAX_VIPSTORE_SIZE)
  nextTime = 0
  countOfTimeOpen = 0
  countOfMoneyOpen = 0
  countOfVipOpen = 0
  bagEnd_maxIndex = 0
  _newItemList: any[] = []
  playerID: number

  constructor(readonly player: Player) {
    this.playerID = player.getId()
  }

  initBagItem(items: ItemData[]) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      this.setItem(item)
    }
  }

  getBagItemBySlotPos(slot: number) {
    if (this.isValidPos(slot))
      return this.store[slot]

    return null
  }

  setItem(item: ItemData) {
    this.setItemWithSlot(item, item.slotPos)
  }

  getStorageEnd() {
    return PlayerBag.STORE_START + this.player.numStroe - 1
  }

  getVipStorageEnd() {
    return PlayerBag.VIPSTORE_END - 1
  }

  getStartEndPos(e: number) {
    let n = 0
    let i = 0
    switch (e) {
      case PlayerBag.TYPE_EQUIP_POS:
        (n = PlayerBag.EQUIP_POS_START), (i = PlayerBag.EQUIP_POS_END - 1)
        break
      case PlayerBag.TYPE_BAG_POS:
        (n = PlayerBag.BAG_START), (i = this.bagEnd)
        break
      case PlayerBag.TYPE_STORAGE_POS:
        (n = PlayerBag.STORE_START), (i = this.getStorageEnd())
        break
      case PlayerBag.TYPE_VIPSTORAGE_POS:
        (n = PlayerBag.VIPSTORE_START), (i = this.getVipStorageEnd())
    }
    return [n, i]
  }

  findFreePos(t: number, e: number) {
    for (let n = t; e >= n; n++) {
      if (this.isValidPos(n) != false && this.store[n] == null)
        return n
    }
    return -1
  }

  nextFreePosEmpty(t: number) {
    const e = this.getStartEndPos(t)
    return this.findFreePos(e[0], e[1])
  }

  nextFreePos(t: number, e: ItemData, n: number, i: boolean) {
    let o = -1
    const a = this.getStartEndPos(t)
    const r = a[0]
    const s = a[1]
    if (e.isStackable()) {
      for (let l = r; s >= l; l++) {
        if (
          this.isValidPos(l) != false
          && this.store[l] != null
          && !(
            this.store[l].isShopLocked()
            || this.store[l].id != e.id
            || this.store[l].quantity + n > this.store[l].stackNum
          )
        ) {
          o = l
          break
        }
      }
    }
    return this.isValidPos(o) == true
      ? o
      : !i
          ? o
          : this.nextFreePosEmpty(t)
  }

  addItem(e: number, n: ItemData, i: number) {
    if ((void 0 === i && (i = -1), n == null))
      return -1
    if ((i == -1 && (i = n.quantity), i <= 0))
      return -2
    if (n.isStackable() && i > n.stackNum)
      return -3
    const o = this.nextFreePos(e, n, i, true)
    return this.isValidPos(o) == false
      ? -4
      : this.store[o] != null
        ? !n.isStackable()
            ? -5
            : this.store[o].quantity + i > this.store[o].stackNum
              ? -6
              : ((this.store[o].quantity += i), o)
        : (!n.isStackable() ? (n.quantity = 1) : (n.quantity = i),
          (n.slotPos = o),
          (this.store[o] = n),
          e == PlayerBag.TYPE_BAG_POS && this.addNewItem(n),
          o)
  }

  addNewItem(t) {
    this._newItemList
      && !this._newItemList.includes(t)
      && this._newItemList.push(t)
  }

  setItemWithSlot(item: ItemData, slot: number) {
    if (this.isValidPos(slot)) {
      item.slotPos = slot
      this.store[slot] = item
    }
  }

  isValidPos(pos: number) {
    return pos >= 0 && pos <= this.store.length
  }

  calculateBagCount() {
    this.countOfVipOpen
      = this.bagEnd
      + 1
      - PlayerBag.EQUIP_POS_END
      - PlayerBag.DEFAULT_OPEN_SIZE
      - this.countOfTimeOpen
      - this.countOfMoneyOpen

    this.bagEnd_maxIndex
      = PlayerBag.BAG_START
      + PlayerBag.BAG_NUM
      * PlayerBag.EACH_BAG_SIZE
      + this.countOfVipOpen
      - 1
  }

  getItemNumByID(id: number) {
    let itemNum = 0
    for (let i = PlayerBag.BAG_START; i <= this.bagEnd; i++) {
      const item = this.store[i]
      if (item && item.id === id)
        itemNum += item.quantity
    }

    return itemNum
  }

  isEquipItemByIdInEquip(id: number) {
    for (let i = PlayerBag.EQUIP_POS_START; i <= PlayerBag.EQUIP_POS_END; i++) {
      const item = this.store[i]
      if (item && item.id === id)
        return true
    }

    return false
  }

  getAttributeByPosList(t, e) {
    if (e == null || e.length <= 0)
      return 0
    for (var n = 0, i = 0; i < e.length; i++) {
      const o = e[i]
      this.isValidPos(i) != false
        && this.store[o] != null
        && (n += this.store[o].get(t))
    }
    return n
  }

  getAttributeByRange(t, e, n) {
    for (var i = 0, o = e; n > o; o++) {
      this.isValidPos(o) != false
        && this.store[o] != null
        && (i += this.store[o].get(t))
    }
    return i
  }

  getAttributeByPos(t: number, e: number) {
    return this.isValidPos(e) == false
      ? -1
      : this.store[e] == null
        ? -1
        : this.store[e].get(t)
  }

  getItemAtkType() {
    let e = this.getAttributeByPos(8, PlayerBag.WEAPON_LEFT_POS)
    return e != -1
      ? e
      : ((e = this.getAttributeByPos(8, PlayerBag.WEAPON_RIGHT_POS)),
        e != -1 ? e : Define.ATKTYPE_STR)
  }

  getAttribute(e) {
    switch (e) {
      case 6:
      case 5:
      case 7:
      case 4:
        var n = [PlayerBag.WEAPON_LEFT_POS, PlayerBag.WEAPON_RIGHT_POS]
        return this.getAttributeByPosList(e, n)
      case 1:
      case 2:
      case 3:
        return this.getAttributeByRange(
          e,
          PlayerBag.EQUIP_POS_START,
          PlayerBag.EQUIP_POS_END,
        )
      case 8:
        return this.getItemAtkType()
    }
    return 0
  }

  getItem(t: number) {
    return this.store == null
      ? null
      : this.isValidPos(t) == false
        ? null
        : this.store[t]
  }

  getEquipPowerValue(e: number) {
    if (e <= 0)
      return 0
    for (var n = 0, i = PlayerBag.EQUIP_POS_START; i < PlayerBag.EQUIP_POS_END; i++)
      this.store[i] != null && (n += this.store[i].getPowerValue(e))
    return n
  }

  getEquipItemSetNum(e: number) {
    if (e <= 0)
      return 0
    for (var n, i = 0, o = PlayerBag.EQUIP_POS_START; o < PlayerBag.EQUIP_POS_END; o++)
      (n = this.store[o]), n != null && n.get(10) == e && i++
    return i
  }

  checkEquipTimeItem() {
    for (let e = PlayerBag.EQUIP_POS_START; e < PlayerBag.EQUIP_POS_END; e++) {
      const n = this.getItem(e)
      n != null && (n.checkTimeItem(), n.setStatusBit(false, 64))
    }
  }

  changeDurability(e: number, n: number) {
    for (let i = PlayerBag.EQUIP_POS_START; i < PlayerBag.EQUIP_POS_END; i++) {
      if (i != PlayerBag.SPIRIT_POS) {
        const o = this.getItem(i)
        if (o != null && o.durability != 0) {
          let a = o.durability
          if (e < 0) {
            if (n == PlayerBag.DUR_CHANGE_TYPE_POINT) { a += e }
            else if (n == PlayerBag.DUR_CHANGE_TYPE_PERCENT) {
              const r = 100 + e
              a = (a * r) / 100
            }
            a < 0 && (a = 0)
          }
          o.durability = a
        }
      }
    }
  }

  handlePlayerDurability(e: boolean) {
    e
      ? this.changeDurability(-PlayerBag.DEAD_DUR_DOWN, PlayerBag.DUR_CHANGE_TYPE_PERCENT)
      : this.changeDurability(-PlayerBag.DUR_DOWN_POINT, PlayerBag.DUR_CHANGE_TYPE_POINT)
  }
}

export namespace PlayerBag {
  export function fromBytes(owner: Player, byte: Protocol) {
    const bag = new PlayerBag(owner)

    bag.bagEnd = byte.getInt()
    bag.nextTime = byte.getLong().value
    bag.countOfMoneyOpen = byte.getInt()
    bag.countOfTimeOpen = byte.getInt()
    bag.calculateBagCount()

    const items = fromBytesInternal(byte)
    bag.initBagItem(items)

    return bag
  }

  function fromBytesInternal(byte: Protocol) {
    const items: ItemData[] = []

    for (let e = byte.getShort(), i = 0; e > i; i++) {
      const item = ItemData.fromBytes(byte)
      items.push(item)
    }

    return items
  }

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
  export const OPEN_BAG_SIZE = PlayerBag.EQUIP_POS_END + PlayerBag.OPEN_BAG_NUM * PlayerBag.EACH_BAG_SIZE
  export const BAG_SIZE = PlayerBag.EQUIP_POS_END + PlayerBag.MAX_BAG_NUM * PlayerBag.EACH_BAG_SIZE
  export const BAG_START = PlayerBag.EQUIP_POS_END
  export const MAX_STORE_SIZE = 60
  export const STORE_START = PlayerBag.BAG_SIZE
  export const STORE_END = PlayerBag.STORE_START + PlayerBag.MAX_STORE_SIZE
  export const MAX_VIPSTORE_SIZE = 90
  export const VIPSTORE_START = PlayerBag.STORE_END
  export const VIPSTORE_END = PlayerBag.VIPSTORE_START + PlayerBag.MAX_VIPSTORE_SIZE
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
}
