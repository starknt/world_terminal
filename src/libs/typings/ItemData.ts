import type { nato } from 'libs/base/nato'
import { Define } from 'libs/defined/defined'
import { GameText } from 'libs/defined/gameText'
import { GZIP } from 'libs/shared/GZIP'
import { Tool } from 'libs/shared/Tool'
import { Model } from './Model'
import { PlayerBag } from './PlayerBag'

export class ItemData {
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

  get(t) {
    if (t == 9)
      return this.durability > 0 ? this.type : Define.BACK_ERROR_DUR
    if (this.durability <= 0)
      return 0
    if (this.isTimeItem() && this.isTimeItemTimeOut())
      return 0
    if (this.isVipItem() && this.isVipItemTimeOut())
      return 0
    switch (t) {
      case 5:
        return this.atkMin
      case 6:
        return this.atkMax
      case 7:
        return this.type == Define.ITEM_TYPE_WEAPON_ONEHAND_HAND
          ? -1
          : this.atk_time
      case 8:
        return this.type == Define.ITEM_TYPE_WEAPON_ONEHAND_HAND
          ? -1
          : this.atkType
      case 1:
        return this.def_str
      case 2:
        return this.def_agi
      case 3:
        return this.def_mag
      case 4:
        return this.getItemHitRate()
      case 10:
        return this.getItemSetID()
    }
    return 0
  }

  getItemSetID() {
    return 255 & this.itemSet
  }

  getItemHitRate() {
    return 255 & this.hitrate
  }

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

  setExpireTime(time: number) {
    this.expireTime = new Date().getTime() + 1 * time * (60 * 1000)
  }

  setShopLocked(t) {
    this.setStatusBit(t, 4)
  }

  setStatusBit(t, e) {
    t ? (this.status |= e) : (this.status &= ~e)
  }

  isStatusBit(t) {
    return (this.status & t) != 0
  }

  isSelling() {
    return (256 & this.status) > 0
  }

  isMailSelect() {
    return (2048 & this.status) > 0
  }

  isIntegral() {
    return (4096 & this.status) > 0
  }

  setIntegral(t) {
    this.setStatusBit(t, 4096)
  }

  isEnchant() {
    return (8192 & this.status) > 0
  }

  setEnchant(t) {
    this.setStatusBit(t, 8192)
  }

  setMailSelect(t) {
    this.setStatusBit(t, 2048)
  }

  isNotOperate() {
    return this.isShopLocked() || this.isSelling()
  }

  getItemClass() {
    return this.type == Define.ITEM_TYPE_PET
      ? 3
      : this.type == Define.ITEM_TYPE_GEM
        ? 6
        : this.type == Define.ITEM_TYPE_TASK
          || this.type == Define.ITEM_TYPE_BUILD_MATERIAL
          || this.type == Define.ITEM_TYPE_SPECEAIL
          ? 5
          : (this.type >= Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD
            && this.type <= Define.ITEM_TYPE_WEAPON_ONEHAND_HAND)
            || (this.type >= Define.ITEM_TYPE_WEAPON_BALL
              && this.type <= Define.ITEM_TYPE_WEAPON_TWOHAND_GUN)
              ? 1
              : (this.type >= Define.ITEM_TYPE_BATTLE_USE
              && this.type <= Define.ITEM_TYPE_NOT_BATTLE_USE)
              || this.type == Define.ITEM_TYPE_SKILL_BOOK
                  ? 4
                  : 2
  }

  isVipItem() {
    return this.vipLevelReq > 0
  }

  isAutoBinding() {
    return this.autoBinding != 0
  }

  isBinded() {
    return this.isAutoBinding() ? true : (2 & this.status) > 0
  }

  isAscension(t) {
    switch (t) {
      case Define.POWER_RECOVER:
        break
      case Define.POWER_SKILL_DAMAGE:
        break
      case Define.POWER_SKILL_HITRATE:
        break
      case Define.POWER_SELF_CRITICAL:
        break
      case Define.POWER_SKILL_HIT_FORCE:
        break
      case Define.POWER_SKILL_MAGIC_PENETRATION:
        break
      case Define.POWER_SKILL_BRK_ARMOR:
        break
      case Define.POWER_SKILL_REMOVE_STATUS:
        break
      case Define.POWER_PET_DAMAGE:
        break
      case Define.POWER_PET_HPMAX_PERCENT:
        break
      case Define.POWER_PET_MPMAX_PERCENT:
        break
      case Define.POWER_PET_STR_PERCENT:
        break
      case Define.POWER_PET_CON_PERCENT:
        break
      case Define.POWER_PET_AGI_PERCENT:
        break
      case Define.POWER_PET_ILT_PERCENT:
        break
      case Define.POWER_PET_WIS_PERCENT:
        break
      case Define.POWER_RECOVER_PERCENT:
        break
      case Define.POWER_OPEN_STORE:
        break
      case Define.POWER_CHEST_LV1:
        break
      case Define.POWER_CHEST_LV2:
        break
      case Define.POWER_CHEST_LV3:
        break
      case Define.POWER_COLOR_BOX:
        break
      case Define.POWER_REQ_SLOT:
        break
      case Define.POWER_TO_WORLDMAP:
        break
      case Define.POWER_TO_GXGY:
        break
      case Define.POWER_EXPIRE_TIME:
        break
      case Define.POWER_RESET_MISSION:
        break
      case Define.POWER_CHEST_KEY_LEVEL:
        break
      case Define.POWER_PET_EGG:
        break
      case Define.POWER_COSTUME:
        break
      case Define.POWER_TRANSPORT:
        break
      case Define.POWER_POWER_TITLE:
        break
      case Define.POWER_GUARD_STR_ATTACK:
        break
      case Define.POWER_GUARD_AGI_ATTACK:
        break
      case Define.POWER_GUARD_MAGIC_ATTACK:
        break
      case Define.POWER_GUARD_CURSE_ATTACK:
        break
      case Define.POWER_GUARD_ALL_ATTACK:
        break
      case Define.POWER_PET_ADD_EXP:
        break
      case Define.POWER_ADD_EXP:
        break
      case Define.POWER_IDENTIFY:
        break
      case Define.POWER_COMPOSITE:
        break
      case Define.POWER_SKILL_HP:
        break
      case Define.POWER_SKILL_HP_PERCENT:
        break
      case Define.POWER_SKILL_MP:
        break
      case Define.POWER_SKILL_MP_PERCENT:
        break
      case Define.POWER_SKILL_LIFE_ABSORPTION:
        break
      case Define.POWER_SKILL_MANA_ABSORPTION:
        break
      case Define.POWER_SKILL_TARGET_BACK:
        break
      case Define.POWER_SKILL_TARGET_MAGIC_BACK:
        break
      case Define.POWER_SKILL_TARGET_BLOCK:
        break
      case Define.POWER_SKILL_TARGET_INSIGHT:
        break
      case Define.POWER_SKILL_TARGET_WIL:
        break
      case Define.POWER_SKILL_TARGET_TOUCH:
        break
      case Define.POWER_GRARD_MASTER_STR_ATTACK:
        break
      case Define.POWER_GRARD_MASTER_AGI_ATTACK:
        break
      case Define.POWER_GRARD_MASTER_MAGIC_ATTACK:
        break
      case Define.POWER_GRARD_MASTER_CURSE_ATTACK:
        break
      case Define.POWER_GRARD_MASTER_ALL_ATTACK:
        break
      case Define.POWER_PET_GRARD_STR_ATTACK:
        break
      case Define.POWER_PET_GRARD_AGI_ATTACK:
        break
      case Define.POWER_PET_GRARD_MAGIC_ATTACK:
        break
      case Define.POWER_PET_GRARD_CURSE_ATTACK:
        break
      case Define.POWER_PET_GRARD_ALL_ATTACK:
        break
      case Define.POWER_SKILL_SCROLL:
        break
      case Define.POWER_SKILL_SCROLL_PET:
        break
      case Define.POWER_NEW_GET_PET:
      case Define.POWER_NEW_GET_ITEM:
      case Define.POWER_ENCHANT_ITEM:
      case Define.POWER_FORMATION_BOOK:
      case Define.POWER_CHEST_LV4:
      case Define.POWER_TURN_MONSTER_CARD:
      case Define.POWER_SKILL_BOOK_PET:
        break
      default:
        return true
    }
    return false
  }

  getPower1AndPower2(e) {
    let n = 0
    return (
      this.power1 == e
      && (n += ItemData.getpowerValueAdd(
        this.powerValue1,
        this.ascensionStar,
        this.star,
        this.isBinded(),
        this.isAscension(this.power1),
      )),
      this.power2 == e
      && (n += ItemData.getpowerValueAdd(
        this.powerValue2,
        this.ascensionStar,
        this.star,
        this.isBinded(),
        this.isAscension(this.power2),
      )),
      this.power3 == e
      && (n += ItemData.getpowerValueAdd(
        this.powerValue3,
        this.ascensionStar,
        this.star,
        this.isBinded(),
        this.isAscension(this.power3),
      )),
      n
    )
  }

  getPowerValue(e) {
    if (this.durability <= 0)
      return 0
    if (this.isTimeItem() && this.isTimeItemTimeOut())
      return 0
    if (this.isVipItem() && this.isVipItemTimeOut())
      return 0
    let n = 0
    return (
      (n += this.getPower1AndPower2(e)),
      this.isBinded()
      && (this.bindPower1 == e
        && (n += ItemData.getpowerValueAdd(
          this.bindPowerValue1,
          this.ascensionStar,
          this.star,
          this.isBinded(),
          this.isAscension(this.bindPower1),
        )),
      this.bindPower2 == e
        && (n += ItemData.getpowerValueAdd(
          this.bindPowerValue2,
          this.ascensionStar,
          this.star,
          this.isBinded(),
          this.isAscension(this.bindPower2),
        ))),
      this.attachPower == e && (n += this.attachValue),
      this.enchantPower1 == e && (n += this.enchantPowerValue1),
      this.enchantPower2 == e && (n += this.enchantPowerValue2),
      this.isBinded()
      && ItemData.isUpgradeItemOpen
      && (this.power4 == e
        && (n += ItemData.getpowerValueAdd(
          this.powerValue4,
          this.upgradeAscensionStar,
          this.upgradeStar,
          this.isBinded(),
          this.isAscension(this.power4),
        )),
      this.power5 == e
        && (n += ItemData.getpowerValueAdd(
          this.powerValue5,
          this.upgradeAscensionStar,
          this.upgradeStar,
          this.isBinded(),
          this.isAscension(this.power5),
        )),
      this.power6 == e
        && (n += ItemData.getpowerValueAdd(
          this.powerValue6,
          this.upgradeAscensionStar,
          this.upgradeStar,
          this.isBinded(),
          this.isAscension(this.power6),
        )),
      this.power7 == e
        && (n += ItemData.getpowerValueAdd(
          this.powerValue7,
          this.upgradeAscensionStar,
          this.upgradeStar,
          this.isBinded(),
          this.isAscension(this.power7),
        ))),
      n
    )
  }

  isCanEquip() {
    return !!((this.type >= Define.ITEM_TYPE_ARMOR_HEAD
      && this.type <= Define.ITEM_TYPE_WEAPON_ONEHAND_HAND)
      || this.type == Define.ITEM_TYPE_PET
      || (this.type >= Define.ITEM_TYPE_WEAPON_BALL
        && this.type <= Define.ITEM_TYPE_WEAPON_TWOHAND_GUN))
  }

  isEquipClass() {
    return this.getItemClass() == 2 || this.getItemClass() == 1
  }

  isWeapon() {
    return this.getItemClass() == 1
  }

  isArmor() {
    return (
      this.type == Define.ITEM_TYPE_ARMOR_HEAD
      || this.type == Define.ITEM_TYPE_ARMOR_CLOTHES
      || this.type == Define.ITEM_TYPE_ARMOR_TROUSERS
      || this.type == Define.ITEM_TYPE_ARMOR_WAIST
      || this.type == Define.ITEM_TYPE_ARMOR_SHOULDER
      || this.type == Define.ITEM_TYPE_ARMOR_SHOES
      || this.type == Define.ITEM_TYPE_ARMOR_HAND
    )
  }

  isEquited() {
    return !!(this.slotPos >= PlayerBag.EQUIP_POS_START
      && this.slotPos < PlayerBag.EQUIP_POS_END)
  }

  isCanAttach() {
    return this.attachCount > 0
  }

  isStackable() {
    return this.isTimeItem() == true
      ? false
      : this.isShopLocked()
        ? false
        : this.stackNum > 1
  }

  isPetType() {
    return this.type == Define.ITEM_TYPE_PET
  }

  isPetEquip() {
    return this.slotPos == PlayerBag.PET_POS
  }

  isVIPSlot() {
    return this.slotPos == PlayerBag.SPIRIT_POS
  }

  isPetEgg() {
    return this.power1 == Define.POWER_PET_EGG
  }

  isOpenStoreItem() {
    return this.power1 == Define.POWER_OPEN_STORE
  }

  isCountryBook() {
    return this.id == Define.ITEM_ID_COMMAND_BOOK
  }

  isChangeNameItem() {
    return this.id == Define.ITEM_ID_CHANGE_NAME
  }

  isRepairItem() {
    return this.id == Define.ITEM_ID_REPAIR
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

  isPetCanUseItem2() {
    return (
      this.isPetAgeItem()
      || this.isPetExpItem()
      || this.isPetSkillBook()
      || this.isSkillPetItem()
      || this.isPetSealSkillBook()
    )
  }

  isSkillBook() {
    return this.type == Define.ITEM_TYPE_SKILL_BOOK
  }

  isPetSkillBook() {
    return (
      this.type == Define.ITEM_TYPE_SKILL_BOOK
      && this.power1 == Define.POWER_SKILL_SCROLL_PET
    )
  }

  isPetSealSkillBook() {
    return this.power1 == Define.POWER_SKILL_BOOK_PET
  }

  isPetAddSkill() {
    return this.id == Define.ITEM_ID_PET_ADD_SKILL
  }

  isPetReset1() {
    return this.id == Define.ITEM_ID_PET_RESET
  }

  isPetReset2() {
    return this.id == Define.ITEM_ID_PET_RESET2
  }

  isPetAgeItem() {
    return this.id == Define.ITEM_ID_PET_AGE
  }

  isPetResetItem() {
    return (
      this.id == Define.ITEM_ID_PET_RESET
      || this.id == Define.ITEM_ID_PET_RESET2
    )
  }

  isIdentifyScrollItem() {
    return (
      this.id == Define.ITEM_ID_IDENTIFY_SCROLL
      || this.id == Define.ITEM_ID_IDENTIFY_SCROLL_BIND
    )
  }

  isHighIdentifyScrollItem() {
    return (
      this.id == Define.ITEM_ID_HIGH_IDENTIFY_SCROLL
      || this.id == Define.ITEM_ID_HIGH_IDENTIFY_SCROLL_BIND
    )
  }

  isUpgradeIdentifyScrollItem() {
    return (
      this.id == Define.ITEM_ID_UPGRADE_INTENSIFY_SCROLL
      || this.id == Define.ITEM_ID_UPGRAND_INTENSIFY_SCROLL_BIND
    )
  }

  isStarScroll() {
    return this.id == Define.ITEM_ID_STAR_SCROLL
  }

  isPetExpItem() {
    return this.power1 == Define.POWER_PET_ADD_EXP
  }

  isTitleItem() {
    return this.power1 == Define.POWER_POWER_TITLE
  }

  isPlayerExpItem() {
    return this.power1 == Define.POWER_ADD_EXP
  }

  isCrystal() {
    return (
      this.id == Define.ITEM_ID_CRYSTAL1
      || this.id == Define.ITEM_ID_CRYSTAL2
      || this.id == Define.ITEM_ID_CRYSTAL3
      || this.id == Define.ITEM_ID_CRYSTAL4
      || this.id == Define.ITEM_ID_CRYSTAL5
    )
  }

  isMaigcCrystal() {
    return (
      this.id == Define.ITEM_ID_MAGICCRYSTAL1
      || this.id == Define.ITEM_ID_MAGICCRYSTAL2
      || this.id == Define.ITEM_ID_MAGICCRYSTAL3
      || this.id == Define.ITEM_ID_MAGICCRYSTAL4
      || this.id == Define.ITEM_ID_MAGICCRYSTAL5
    )
  }

  isMateria() {
    return this.type == Define.ITEM_TYPE_BUILD_MATERIAL
  }

  isCountryMateria() {
    return !!(this.isCountryWood()
      || this.isCountryStone()
      || this.isCountryIron())
  }

  isCountryWood() {
    return !!(this.id == Define.ITEM_ID_WOOD || this.name.includes('碎木'))
  }

  isCountryStone() {
    return !!(this.id == Define.ITEM_ID_STONE || this.name.includes('碎石'))
  }

  isCountryIron() {
    return !!(this.id == Define.ITEM_ID_IRON || this.name.includes('碎矿'))
  }

  isMagicArmor() {
    return !(this.getItemClass() != 2 || (this.reqIlt == 0 && this.reqWis == 0))
  }

  isLightWeapon() {
    return !!(this.type == Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD
      || this.type == Define.ITEM_TYPE_WEAPON_ONEHAND_BLADE
      || this.type == Define.ITEM_TYPE_WEAPON_ONEHAND_HEAVY
      || this.type == Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
      || this.type == Define.ITEM_TYPE_WEAPON_BALL
      || this.type == Define.ITEM_TYPE_WEAPON_TWOHAND_STAFF)
  }

  isGem() {
    return this.type == Define.ITEM_TYPE_GEM
  }

  isChestItem() {
    return (
      this.power1 == Define.POWER_CHEST_LV1
      || this.power1 == Define.POWER_CHEST_LV2
      || this.power1 == Define.POWER_CHEST_LV3
      || this.power1 == Define.POWER_CHEST_LV4
      || this.power1 == Define.POWER_COLOR_BOX
    )
  }

  isColorBox() {
    return this.power1 == Define.POWER_COLOR_BOX
  }

  isIdentifyItem() {
    return (16 & this.status) > 0
  }

  isDestroy() {
    return this.durability <= 0
  }

  isWillDestroy() {
    return this.durability < 10
  }

  checkTimeItem() {
    this.isExpired() ? (this.status |= 8) : (this.status &= -9)
  }

  isExpired() {
    return this.isVipItem()
      ? false
      : this.expireTime <= 0
        ? false
        : !(this.expireTime - Tool.getTime() > 0)
  }

  isChangeSexItem() {
    return this.id == Define.ITEM_ID_CHANGE_SEX
  }

  isCpPointAddItem() {
    return this.id == Define.ITEM_ID_CP_POINT_ADD
  }

  isSkillPlayerItem() {
    return (
      this.id == Define.ITEM_ID_SKILL_PLAYER
      || Define.ITEM_ID_SKILL_PLAYER_BIND == this.id
      || this.id == Define.ITEM_ID_SKILL_PLAYER_2
      || Define.ITEM_ID_SKILL_PLAYER_2_BIND == this.id
      || this.id == Define.ITEM_ID_SKILL_PLAYER_3
      || Define.ITEM_ID_SKILL_PLAYER_3_BIND == this.id
      || this.id == Define.ITEM_ID_SKILL_PLAYER_4
      || Define.ITEM_ID_SKILL_PLAYER_4_BIND == this.id
      || this.id == Define.ITEM_ID_SKILL_PLAYER_5
      || Define.ITEM_ID_SKILL_PLAYER_5_BIND == this.id
    )
  }

  isSkillPetItem() {
    return (
      this.id == Define.ITEM_ID_SKILL_PET
      || Define.ITEM_ID_SKILL_PET_2 == this.id
    )
  }

  isSpPointAddItem() {
    return this.id == Define.ITEM_ID_SP_POINT_ADD
  }

  isProsperityDegreePointAddItem() {
    return this.id == Define.ITEM_ID_PROSPERITY_DEGREE_POINT_ADD
  }

  isCanUse(t) {
    switch (t) {
      case 1:
        if (
          this.type == Define.ITEM_TYPE_ANYTIME_USE
          || this.type == Define.ITEM_TYPE_NOT_BATTLE_USE
          || this.type == Define.ITEM_TYPE_SKILL_BOOK
        )
          return true
        break
      case 2:
        if (
          this.type == Define.ITEM_TYPE_ANYTIME_USE
          || this.type == Define.ITEM_TYPE_BATTLE_USE
        )
          return true
        break
      case 3:
        return true
    }
    return false
  }

  isRebornItem() {
    return this.power1 == Define.POWER_RECOVER
      || this.power1 == Define.POWER_RECOVER_PERCENT
      ? true
      : !!(this.power2 == Define.POWER_RECOVER
        || this.power2 == Define.POWER_RECOVER_PERCENT)
  }

  getInfo() {
    return this.info == null || this.info == '' || this.info == '0'
      ? ''
      : this.info
  }

  setInfo(t) {
    this.info = t
  }
}

export namespace ItemData {
  export function isValidEquipRequire(t, e) {
    let n = true
    if (t == null || e == null)
      return Define.NO
    let i = ''
    let o = t.get(Model.LEVEL)
    return (
      o < e.reqLv
      && ((i += Tool.manageStringU(
        GameText.STR_ITEM_REQ_LEVEL,
        `${e.reqLv - o}`,
      )),
      (n = false)),
      e.getItemClass() == 4
        ? n
          ? Define.OK
          : (i = Tool.convertLastLinefeed(i))
        : ((o = t.get(Model.STR)),
          o < e.reqStr
          && ((i += Tool.manageStringU(
            GameText.STR_ITEM_REQ_STR,
            `${e.reqStr - o}`,
          )),
          (n = false)),
          (o = t.get(Model.CON)),
          o < e.reqCon
          && ((i += Tool.manageStringU(
            GameText.STR_ITEM_REQ_CON,
            `${e.reqCon - o}`,
          )),
          (n = false)),
          (o = t.get(Model.AGI)),
          o < e.reqAgi
          && ((i += Tool.manageStringU(
            GameText.STR_ITEM_REQ_AGI,
            `${e.reqAgi - o}`,
          )),
          (n = false)),
          (o = t.get(Model.ILT)),
          o < e.reqIlt
          && ((i += Tool.manageStringU(
            GameText.STR_ITEM_REQ_ILT,
            `${e.reqIlt - o}`,
          )),
          (n = false)),
          (o = t.get(Model.WIS)),
          o < e.reqWis
          && ((i += Tool.manageStringU(
            GameText.STR_ITEM_REQ_WIS,
            `${e.reqWis - o}`,
          )),
          (n = false)),
          n ? Define.OK : (i = Tool.convertLastLinefeed(i)))
    )
  }

  export function getpowerValueAdd(t, e, n, i, o) {
    if (i == 0 || o == 0)
      return t
    if (e <= 0)
      return t
    if (n <= 0)
      return t
    let a = t
    a < 0 && (a = -1 * a)
    const r = Math.floor((a * e * n + 50) / 100)
    let s = GZIP.toShort(r)
    return (
      s + t > Tool.MAX_VALUE_short ? (s = Tool.MAX_VALUE_short) : (s += t), s
    )
  }

  export function fromMailBytes(byte: nato.Message) {
    const item = new ItemData()

    item.id = 65535 & byte.getShort()
    item.quantity = byte.getByte()
    item.name = byte.getString()
    item.bagIcon = byte.getUnsignedByte()
    item.grade = byte.getByte()
    item.type = byte.getByte()
    item.slotPos = byte.getShort()
    item.isUpgradeItem = byte.getBoolean()

    return item
  }

  export function fromBytes(byte: nato.Message) {
    let item = new ItemData()

    item = fromBytesAtts1(byte, item)
    item = fromBytesAtts2(byte, item)

    return item
  }

  export function fromBytesAtts1(byte: nato.Message, item: ItemData) {
    item.quantity = byte.getShort()
    item.durability = byte.getShort()
    item.attachDone = byte.getByte()
    item.attachPower = byte.getUnsignedByte()
    item.attachValue = byte.getShort()
    item.slotPos = byte.getShort()
    item.status = byte.getByte()

    if (item.isTimeItem()) {
      if (item.slotPos == 17) {
        const n = byte.getInt()
        item.setExpireTime(n)
      }
      else {
        item.setExpireTime(65535 & byte.getShort())
      }
    }

    return item
  }

  export function fromBytesAtts2(byte: nato.Message, item: ItemData) {
    item.type = byte.getByte()
    const itemClass = item.getItemClass()

    if (itemClass === 3) {
      item.id = Define.ITEM_ID_PET
      item.name = byte.getString()
      item.bagIcon = byte.getUnsignedByte()
      item.info = byte.getString()
      item.grade = byte.getByte()
      item.autoBinding = byte.getByte()
      item.icon = byte.getShort()
      item.reqLv = byte.getByte()
      item.vipLevelReq = byte.getByte()

      return item
    }

    item.id = 65535 & byte.getShort()
    item.name = byte.getString()
    item.bagIcon = byte.getUnsignedByte()
    item.info = byte.getString()
    item.grade = byte.getByte()
    item.autoBinding = byte.getByte()
    item.stackNum = byte.getByte()

    switch (itemClass) {
      case 1:
      {
        item.icon = byte.getShort()
        item.ownTime = 65535 & byte.getShort()
        item.durMax = byte.getUnsignedByte()
        item.price = byte.getInt()
        item.attachCount = byte.getByte()
        item.itemSet = byte.getByte()
        item.reqLv = byte.getByte()
        item.reqStr = byte.getShort()
        item.reqCon = byte.getShort()
        item.reqAgi = byte.getShort()
        item.reqIlt = byte.getShort()
        item.reqWis = byte.getShort()
        // AscensionStarInfo
        item = fromItemAscensionStarInfo(byte, item)
        item.hitrate = byte.getByte()
        item.vipLevelReq = byte.getByte()
        item.enchantPower1 = byte.getShort()
        item.enchantPowerValue1 = byte.getShort()
        item.enchantPower2 = byte.getShort()
        item.enchantPowerValue2 = byte.getShort()
        item.isUpgradeItem = byte.getBoolean()
        if (item.isUpgradeItem) {
          item.power4 = byte.getShort()
          item.powerValue4 = byte.getShort()
          item.power5 = byte.getShort()
          item.powerValue5 = byte.getShort()
          item.power6 = byte.getShort()
          item.powerValue6 = byte.getShort()
          item.power7 = byte.getShort()
          item.powerValue7 = byte.getShort()
        }

        item.upgradeAscensionStar = byte.getByte()
        item.upgradeStar = byte.getByte()

        return item
      }
      case 2:
      {
        item.icon = byte.getShort()
        item.ownTime = 65535 & byte.getShort()
        item.durMax = byte.getUnsignedByte()
        item.price = byte.getInt()
        item.attachCount = byte.getByte()
        item.itemSet = byte.getByte()
        item.reqLv = byte.getByte()
        item.reqStr = byte.getShort()
        item.reqCon = byte.getShort()
        item.reqAgi = byte.getShort()
        item.reqIlt = byte.getShort()
        item.reqWis = byte.getShort()
        // AscensionStarInfo
        item = fromItemAscensionStarInfo(byte, item)

        if (item.type === Define.ITEM_TYPE_ARMOR_FASHION) {
          item.fashIcon1 = byte.getInt()
          item.fashIcon2 = byte.getInt()
          item.fashIcon3 = byte.getInt()
        }

        item.vipLevelReq = byte.getByte()
        item.enchantPower1 = byte.getShort()
        item.enchantPowerValue1 = byte.getShort()
        item.enchantPower2 = byte.getShort()
        item.enchantPowerValue2 = byte.getShort()
        item.isUpgradeItem = byte.getBoolean()
        if (item.isUpgradeItem) {
          item.power4 = byte.getShort()
          item.powerValue4 = byte.getShort()
          item.power5 = byte.getShort()
          item.powerValue5 = byte.getShort()
          item.power6 = byte.getShort()
          item.powerValue6 = byte.getShort()
          item.power7 = byte.getShort()
          item.powerValue7 = byte.getShort()
        }
        item.upgradeAscensionStar = byte.getByte()
        item.upgradeStar = byte.getByte()
        return item
      }
      case 4:
      {
        item.reqLv = byte.getByte()
        item.ownTime = 65535 & byte.getShort()
        item.durMax = byte.getUnsignedByte()
        item.price = byte.getInt()
        item.round = byte.getByte()
        item.area = byte.getByte()
        item.power1 = byte.getUnsignedByte()
        item.powerValue1 = byte.getShort()
        item.power2 = byte.getUnsignedByte()
        item.powerValue2 = byte.getShort()
        item.leafCount = byte.getShort()
        item.vipLevelReq = byte.getByte()

        if (Define.POWER_ENCHANT_ITEM == item.power1) {
          item.power3 = byte.getUnsignedByte()
          item.powerValue3 = byte.getShort()
        }

        return item
      }
      case 6:
      {
        item.price = byte.getInt()
        item.power1 = byte.getUnsignedByte()
        item.powerValue1 = byte.getShort()

        return item
      }
      case 5:
      default:
      {
        item.price = byte.getInt()

        return item
      }
    }
  }

  function fromItemAscensionStarInfo(byte: nato.Message, item: ItemData) {
    const itemClass = item.getItemClass()

    item.def_str = byte.getShort()
    item.def_agi = byte.getShort()
    item.def_mag = byte.getShort()
    item.power1 = byte.getUnsignedByte()
    item.powerValue1 = byte.getShort()
    item.power2 = byte.getUnsignedByte()
    item.powerValue2 = byte.getShort()
    item.power3 = byte.getUnsignedByte()
    item.powerValue3 = byte.getShort()
    item.skillDesc = byte.getString()
    item.bindPower1 = byte.getUnsignedByte()
    item.bindPowerValue1 = byte.getShort()
    item.bindPower2 = byte.getUnsignedByte()
    item.bindPowerValue2 = byte.getShort()

    if (itemClass === 1) {
      item.atkType = byte.getByte()
      item.atk_time = byte.getByte()
      item.atkMin = byte.getShort()
      item.atkMax = byte.getShort()
    }

    item.ascensionStar = byte.getByte()
    item.star = byte.getByte()

    return item
  }

  export const ITEM_ID_QUICK_FILL_HP = -1e4
  export const ITEM_ID_SPRITE_GUIDE = -10001
  export const ITEM_ID_WORLD_SHOP = -10002
  export const ITEM_ID_PET_PARTNER = 32006
  export const ITEM_MONEY_TYPE_1 = 3
  export const ITEM_MONEY_TYPE_2 = 4
  export const ITEM_MONEY_TYPE_3 = 5
  export const isUpgradeItemOpen = false
  export const COMPARE_ALL = 0
  export const COMPARE_IDENTIFY = 1
  export const COMPARE_COMBIN = 2
  export const COMPARE_IDENTIFY_G = 3
}
