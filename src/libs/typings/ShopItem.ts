import { Long, Protocol } from 'libs/base/protocol'
import { ItemData } from './ItemData'
import { ModelConst } from '~/shared/enum'

export class ShopItemData extends ItemData {
  money1 = 0
  money2 = 0
  money3 = 0
  integral = 0
  arenaPoint = 0
  skyarenaPoint = 0
  maxBuy = -1
  allCount = -1
  hotTypeOrNewItem = 0
  petComsiteInfo = null
  combinItemID = 0
  isSystemShopItem = false
  power = 0
  combinCount = 0
  goodId: Long = new Long(0, 0)
  goodPurchaseCount = 0

  setMoney(t: number, e: number) {
    switch (t) {
      case ModelConst.MONEY1:
        this.money1 = e
        break
      case ModelConst.MONEY2:
        this.money2 = e
        break
      case ModelConst.MONEY3:
        this.money3 = e
    }
  }
}

export namespace ShopItemData {
  export function fromBytesShopItem(byte: Protocol) {
    const item = new ShopItemData()
    item.isSystemShopItem = true
    ItemData.fromBytesAtts2(byte, item)
    item.money1 = byte.getInt()
    item.money2 = byte.getInt()
    item.money3 = byte.getInt()
    item.status = byte.getByte()
    item.maxBuy = byte.getShort()
    item.allCount = byte.getShort()
    item.hotTypeOrNewItem = byte.getByte()
    item.durability = item.durMax

    return item
  }

  export function fromBytesPlayerShopItem(byte: Protocol) {
    const item = new ShopItemData()
    ItemData.fromBytesAtts1(byte, item)
    ItemData.fromBytesAtts2(byte, item)
    item.goodId = byte.getLong()
    item.quantity = byte.getByte()
    item.money1 = byte.getInt()
    item.money3 = byte.getInt()
    item.expireTime = byte.getLong().value
    return item
  }

  export function fromBytesGoodsPurchaseItem(byte: Protocol, flag?: boolean) {
    const item = new ShopItemData()
    ItemData.fromBytesAtts2(byte, item)
    item.goodId = byte.getLong()
    item.quantity = byte.getShort()
    if (flag) {
      item.goodPurchaseCount = byte.getShort()
      item.quantity += item.goodPurchaseCount
    }
    item.money1 = byte.getInt()
    item.money3 = byte.getInt()
    item.expireTime = byte.getShort()
    return item
  }
}
