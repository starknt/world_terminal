import type { Protocol } from '@terminal/ws'
import { ITEM_ID_PET, ITEM_TYPE_ARMOR_FASHION, ITEM_TYPE_BATTLE_USE, ITEM_TYPE_BUILD_MATERIAL, ITEM_TYPE_GEM, ITEM_TYPE_NOT_BATTLE_USE, ITEM_TYPE_PET, ITEM_TYPE_SKILL_BOOK, ITEM_TYPE_SPECEAIL, ITEM_TYPE_TASK, ITEM_TYPE_WEAPON_BALL, ITEM_TYPE_WEAPON_ONEHAND_HAND, ITEM_TYPE_WEAPON_ONEHAND_SWORD, ITEM_TYPE_WEAPON_TWOHAND_GUN, POWER_ENCHANT_ITEM } from '../contants/define'

export class Item {
  quantity = 0
  durability = 0
  attachDone = 0
  attachPower = 0
  attachValue = 0
  slotPos = -1
  status = 0
  expireTime = -1
  isMoney = false
  moneyType = 0
  power1 = 0
  powerValue1 = 0
  powerValue1add = 0
  power2 = 0
  powerValue2 = 0
  leafCount = 0
  powerValue2add = 0
  power3 = 0
  powerValue3 = 0
  powerValue3add = 0
  bindPower1 = 0
  bindPowerValue1 = 0
  bindPowerValue1add = 0
  bindPower2 = 0
  bindPowerValue2 = 0
  bindPowerValue2add = 0
  isUpgradeItem = false
  power4 = 0
  powerValue4 = 0
  powerValue4add = 0
  power5 = 0
  powerValue5 = 0
  powerValue5add = 0
  power6 = 0
  powerValue6 = 0
  powerValue6add = 0
  power7 = 0
  powerValue7 = 0
  powerValue7add = 0
  id = 0
  name = ''
  icon = 0
  bagIcon = 0
  info = ''
  type = 0
  grade = 0
  reqLv = 0
  reqStr = 0
  reqCon = 0
  reqAgi = 0
  reqIlt = 0
  reqWis = 0
  atkType = 0
  atk_time = 0
  atkMin = 0
  atkMax = 0
  def_str = 0
  def_agi = 0
  def_mag = 0
  hitrate = 0
  round = 0
  area = 0
  ownTime = 0
  durMax = 0
  price = 0
  autoBinding = 0
  stackNum = 0
  attachCount = 0
  itemSet = 0
  itemSetPower = 0
  itemSetPowerValue = 0
  skillDesc = ''
  vipLevelReq = 0
  ascensionStar = 0
  star = 0
  upgradeAscensionStar = 0
  upgradeStar = 0
  ascensionStarRate = 0
  fashIcon1 = 0
  fashIcon2 = 0
  fashIcon3 = 0
  enchantPower1 = 0
  enchantPowerValue1 = 0
  enchantPower2 = 0
  enchantPowerValue2 = 0

  isTimeItem() {
    return (1 & this.status) > 0
  }

  isTimeItemTimeOut() {
    return (8 & this.status) > 0
  }

  isVipItemTimeOut() {
    return (64 & this.status) > 0
  }

  isShopLocked() {
    return (4 & this.status) > 0
  }

  getItemClass(): number {
    const itemClassMap: Record<number, number | undefined> = {
      [ITEM_TYPE_PET]: 3,
      [ITEM_TYPE_GEM]: 6,
      [ITEM_TYPE_TASK]: 5,
      [ITEM_TYPE_BUILD_MATERIAL]: 5,
      [ITEM_TYPE_SPECEAIL]: 5,
      [ITEM_TYPE_WEAPON_ONEHAND_SWORD]: 1,
      [ITEM_TYPE_WEAPON_ONEHAND_HAND]: 1,
      [ITEM_TYPE_WEAPON_BALL]: 1,
      [ITEM_TYPE_WEAPON_TWOHAND_GUN]: 1,
      [ITEM_TYPE_BATTLE_USE]: 4,
      [ITEM_TYPE_NOT_BATTLE_USE]: 4,
      [ITEM_TYPE_SKILL_BOOK]: 4,
    }

    return itemClassMap[this.type] ?? 2
  }

  static from(p: Protocol) {
    const item = new Item()

    // common properties
    item.quantity = p.getShort()
    item.durability = p.getShort()
    item.attachDone = p.getByte()
    item.attachPower = p.getUnsignedByte()
    item.attachValue = p.getShort()
    item.slotPos = p.getShort()
    item.status = p.getByte()
    if (item.isTimeItem()) {
      if (item.slotPos === 17)
        item.expireTime = new Date().getTime() + 1 * p.getInt() * (60 * 1000)
    }

    item.type = p.getByte()
    const itemClass = item.getItemClass()
    // special item properties
    if (itemClass === 3) {
      item.id = ITEM_ID_PET
      item.name = p.getString()
      item.bagIcon = p.getUnsignedByte()
      item.info = p.getString()
      item.grade = p.getByte()
      item.autoBinding = p.getByte()
      item.icon = p.getShort()
      item.reqLv = p.getByte()
      item.vipLevelReq = p.getByte()
      return item
    }

    item.id = 65535 & p.getShort()
    item.name = p.getString()
    item.bagIcon = p.getUnsignedByte()
    item.info = p.getString()
    item.grade = p.getByte()
    item.autoBinding = p.getByte()
    item.stackNum = p.getByte()

    switch (itemClass) {
      case 1:
        item.icon = p.getShort()
        item.ownTime = 65535 & p.getShort()
        item.durMax = p.getUnsignedByte()
        item.price = p.getInt()
        item.attachCount = p.getByte()
        item.itemSet = p.getByte()
        item.reqLv = p.getByte()
        item.reqStr = p.getShort()
        item.reqCon = p.getShort()
        item.reqAgi = p.getShort()
        item.reqIlt = p.getShort()
        item.reqWis = p.getShort()
        // #region AscensionStarInfo
        item.def_str = p.getShort()
        item.def_agi = p.getShort()
        item.def_mag = p.getShort()
        item.power1 = p.getUnsignedByte()
        item.powerValue1 = p.getShort()
        item.power2 = p.getUnsignedByte()
        item.powerValue2 = p.getShort()
        item.power3 = p.getUnsignedByte()
        item.powerValue3 = p.getShort()
        item.skillDesc = p.getString()
        item.bindPower1 = p.getUnsignedByte()
        item.bindPowerValue1 = p.getShort()
        item.bindPower2 = p.getUnsignedByte()
        item.bindPowerValue2 = p.getShort()

        if (itemClass === 1) {
          item.atkType = p.getByte()
          item.atk_time = p.getByte()
          item.atkMin = p.getShort()
          item.atkMax = p.getShort()
        }

        item.ascensionStar = p.getByte()
        item.star = p.getByte()
        // #endregion

        item.hitrate = p.getByte()
        item.vipLevelReq = p.getByte()
        item.enchantPower1 = p.getShort()
        item.enchantPowerValue1 = p.getShort()
        item.enchantPower2 = p.getShort()
        item.enchantPowerValue2 = p.getShort()
        item.isUpgradeItem = p.getBoolean()
        if (item.isUpgradeItem) {
          item.power4 = p.getShort()
          item.powerValue4 = p.getShort()
          item.power5 = p.getShort()
          item.powerValue5 = p.getShort()
          item.power6 = p.getShort()
          item.powerValue6 = p.getShort()
          item.power7 = p.getShort()
          item.powerValue7 = p.getShort()
        }

        item.upgradeAscensionStar = p.getByte()
        item.upgradeStar = p.getByte()

        return item
      case 2:
        item.icon = p.getShort()
        item.ownTime = 65535 & p.getShort()
        item.durMax = p.getUnsignedByte()
        item.price = p.getInt()
        item.attachCount = p.getByte()
        item.itemSet = p.getByte()
        item.reqLv = p.getByte()
        item.reqStr = p.getShort()
        item.reqCon = p.getShort()
        item.reqAgi = p.getShort()
        item.reqIlt = p.getShort()
        item.reqWis = p.getShort()
        // #region AscensionStarInfo
        item.def_str = p.getShort()
        item.def_agi = p.getShort()
        item.def_mag = p.getShort()
        item.power1 = p.getUnsignedByte()
        item.powerValue1 = p.getShort()
        item.power2 = p.getUnsignedByte()
        item.powerValue2 = p.getShort()
        item.power3 = p.getUnsignedByte()
        item.powerValue3 = p.getShort()
        item.skillDesc = p.getString()
        item.bindPower1 = p.getUnsignedByte()
        item.bindPowerValue1 = p.getShort()
        item.bindPower2 = p.getUnsignedByte()
        item.bindPowerValue2 = p.getShort()

        item.ascensionStar = p.getByte()
        item.star = p.getByte()
        // #endregion

        if (item.type === ITEM_TYPE_ARMOR_FASHION) {
          item.fashIcon1 = p.getInt()
          item.fashIcon2 = p.getInt()
          item.fashIcon3 = p.getInt()
        }

        item.vipLevelReq = p.getByte()
        item.enchantPower1 = p.getShort()
        item.enchantPowerValue1 = p.getShort()
        item.enchantPower2 = p.getShort()
        item.enchantPowerValue2 = p.getShort()
        item.isUpgradeItem = p.getBoolean()
        if (item.isUpgradeItem) {
          item.power4 = p.getShort()
          item.powerValue4 = p.getShort()
          item.power5 = p.getShort()
          item.powerValue5 = p.getShort()
          item.power6 = p.getShort()
          item.powerValue6 = p.getShort()
          item.power7 = p.getShort()
          item.powerValue7 = p.getShort()
        }
        item.upgradeAscensionStar = p.getByte()
        item.upgradeStar = p.getByte()
        return item
      case 4:
        item.reqLv = p.getByte()
        item.ownTime = 65535 & p.getShort()
        item.durMax = p.getUnsignedByte()
        item.price = p.getInt()
        item.round = p.getByte()
        item.area = p.getByte()
        item.power1 = p.getUnsignedByte()
        item.powerValue1 = p.getShort()
        item.power2 = p.getUnsignedByte()
        item.powerValue2 = p.getShort()
        item.leafCount = p.getShort()
        item.vipLevelReq = p.getByte()

        if (POWER_ENCHANT_ITEM === item.power1) {
          item.power3 = p.getUnsignedByte()
          item.powerValue3 = p.getShort()
        }

        return item
      case 6:
        item.price = p.getInt()
        item.power1 = p.getUnsignedByte()
        item.powerValue1 = p.getShort()
        return item
      case 5:
      default:
        item.price = p.getInt()
        return item
    }
  }

  static fromMail(p: Protocol) {
    const item = new Item()

    item.id = 65535 & p.getShort()
    item.quantity = p.getByte()
    item.name = p.getString()
    item.bagIcon = p.getUnsignedByte()
    item.grade = p.getByte()
    item.type = p.getByte()
    item.slotPos = p.getShort()
    item.isUpgradeItem = p.getBoolean()

    return item
  }
}
