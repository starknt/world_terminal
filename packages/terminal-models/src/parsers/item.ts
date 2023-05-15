import type { MaybeProtocol } from '@terminal/core'
import { Long, Protocol, compatByteArray } from '@terminal/core'
import { calcExpireTime } from '@terminal/kit'
import { ITEM_ID_PET, ITEM_TYPE_ARMOR_FASHION, ITEM_TYPE_BATTLE_USE, ITEM_TYPE_BUILD_MATERIAL, ITEM_TYPE_GEM, ITEM_TYPE_NOT_BATTLE_USE, ITEM_TYPE_PET, ITEM_TYPE_SKILL_BOOK, ITEM_TYPE_SPECEAIL, ITEM_TYPE_TASK, ITEM_TYPE_WEAPON_BALL, ITEM_TYPE_WEAPON_ONEHAND_HAND, ITEM_TYPE_WEAPON_ONEHAND_SWORD, ITEM_TYPE_WEAPON_TWOHAND_GUN, POWER_ENCHANT_ITEM } from '../contants/define'
import { Define } from '../contants'

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

  isPetEgg() {
    return this.power1 === Define.POWER_PET_EGG
  }

  isOpenStoreItem() {
    return this.power1 === Define.POWER_OPEN_STORE
  }

  isCountryBook() {
    return this.id === Define.ITEM_ID_COMMAND_BOOK
  }

  isChangeNameItem() {
    return this.id === Define.ITEM_ID_CHANGE_NAME
  }

  isRepairItem() {
    return this.id === Define.ITEM_ID_REPAIR
  }

  isPetAgeItem() {
    return this.id === Define.ITEM_ID_PET_AGE
  }

  isPetResetItem() {
    return (
      this.id === Define.ITEM_ID_PET_RESET
      || this.id === Define.ITEM_ID_PET_RESET2
    )
  }

  isIdentifyScrollItem() {
    return (
      this.id === Define.ITEM_ID_IDENTIFY_SCROLL
      || this.id === Define.ITEM_ID_IDENTIFY_SCROLL_BIND
    )
  }

  isHighIdentifyScrollItem() {
    return (
      this.id === Define.ITEM_ID_HIGH_IDENTIFY_SCROLL
      || this.id === Define.ITEM_ID_HIGH_IDENTIFY_SCROLL_BIND
    )
  }

  isUpgradeIdentifyScrollItem() {
    return (
      this.id === Define.ITEM_ID_UPGRADE_INTENSIFY_SCROLL
      || this.id === Define.ITEM_ID_UPGRAND_INTENSIFY_SCROLL_BIND
    )
  }

  isStarScroll() {
    return this.id === Define.ITEM_ID_STAR_SCROLL
  }

  isPetExpItem() {
    return this.power1 === Define.POWER_PET_ADD_EXP
  }

  isTitleItem() {
    return this.power1 === Define.POWER_POWER_TITLE
  }

  isPlayerExpItem() {
    return this.power1 === Define.POWER_ADD_EXP
  }

  isSkillBook() {
    return this.type === Define.ITEM_TYPE_SKILL_BOOK
  }

  isPetSkillBook() {
    return (
      this.type === Define.ITEM_TYPE_SKILL_BOOK
      && this.power1 === Define.POWER_SKILL_SCROLL_PET
    )
  }

  isPetAddSkill() {
    return this.id === Define.ITEM_ID_PET_ADD_SKILL
  }

  isSkillPetItem() {
    return (
      this.id === Define.ITEM_ID_SKILL_PET
      || Define.ITEM_ID_SKILL_PET_2 === this.id
    )
  }

  isPetSealSkillBook() {
    return this.power1 === Define.POWER_SKILL_BOOK_PET
  }

  isPetCanUseItem() {
    return (
      this.isPetAgeItem()
      || this.isPetResetItem()
      || this.isPetExpItem()
      || this.isPetAddSkill()
      || this.isPetSkillBook()
      || this.isSkillPetItem()
      || this.isPetSealSkillBook()
    )
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

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
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
}

export class MailItem extends Item {
  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const item = new MailItem()
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

export class MissionItem extends Item {
  static from(b: MaybeProtocol) {
    b = compatByteArray(b)
    const item = new MissionItem()
    item.id = 65535 & b.readShort()
    item.quantity = b.readByte()
    item.name = b.readUTF()
    item.bagIcon = b.readUnsignedByte()
    item.grade = b.readByte()
    return item
  }
}

export class ShopItem extends Item {
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
  goodPurchaseCount = 0

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const item = new ShopItem()
    item.isSystemShopItem = true

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

        break
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
        break
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

        break
      case 6:
        item.price = p.getInt()
        item.power1 = p.getUnsignedByte()
        item.powerValue1 = p.getShort()
        break
      case 5:
      default:
        item.price = p.getInt()
        break
    }

    item.money1 = p.getInt()
    item.money2 = p.getInt()
    item.money3 = p.getInt()
    item.status = p.getByte()
    item.maxBuy = p.getShort()
    item.allCount = p.getShort()
    item.hotTypeOrNewItem = p.getByte()
    item.durability = item.durMax
    return item
  }
}

export class PlayerShopItem extends Item {
  goodId: Long = new Long(0, 0)
  money1 = 0
  money2 = 0
  money3 = 0

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const item = new PlayerShopItem()

    item.quantity = p.getShort()
    item.durability = p.getShort()
    item.attachDone = p.getByte()
    item.attachPower = p.getUnsignedByte()
    item.attachValue = p.getShort()
    item.slotPos = p.getShort()
    item.status = p.getByte()
    if (item.isTimeItem()) {
      if (item.slotPos === 17)
        item.expireTime = calcExpireTime(p.getInt())
      else
        item.expireTime = calcExpireTime(65535 & p.getShort())
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

        break
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
        break
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

        break
      case 6:
        item.price = p.getInt()
        item.power1 = p.getUnsignedByte()
        item.powerValue1 = p.getShort()
        break
      case 5:
      default:
        item.price = p.getInt()
        break
    }

    item.goodId = p.getLong()
    item.quantity = p.getByte()
    item.money1 = p.getInt()
    item.money3 = p.getInt()
    item.expireTime = p.getLong().value
    return item
  }
}

export class GoodsPurchaseItem extends Item {
  goodId!: Long
  goodPurchaseCount!: number
  money1!: number
  money3!: number

  static from(p: MaybeProtocol, flag = false) {
    p = Protocol.from(p)
    const item = new GoodsPurchaseItem()

    item.goodId = p.getLong()
    item.quantity = p.getShort()
    if (flag) {
      item.goodPurchaseCount = p.getShort()
      item.quantity += item.goodPurchaseCount
    }
    item.money1 = p.getInt()
    item.money3 = p.getInt()
    item.expireTime = p.getShort()
    return item
  }
}
