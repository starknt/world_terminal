import type { nato } from 'libs/base/nato'
import { Define } from 'libs/defined/defined'
import { GameText } from 'libs/defined/gameText'
import { Model } from './Model'
import { xhd } from '~/shared/enum'

export class Skill {
  maxLevel = 0
  id = 0
  level = 0
  addLevel = 0
  type = 0
  sp = 0
  money1 = 0
  money2 = 0
  money3 = 0
  reqJob = 0
  reqLevel = 0
  anime1 = 0
  anime2 = 0
  anime3 = 0
  skillWeapon = 0
  skillAtkType = 0
  atk_time = 0
  area = 0
  position = 0
  useMP = 0
  useHP = 0
  round = 0
  power1 = 0
  powerValue1 = 0
  statusBit1 = 0
  power2 = 0
  powerValue2 = 0
  statusBit2 = 0
  power3 = 0
  powerValue3 = 0
  statusBit3 = 0
  formationType = 0
  skillId = 0
  iconIndex = 0
  teamcount = 0
  isDefault = false
  maxLearnLevel = 0
  info = ''
  name = ''
  isLearnByBook = false

  getRealLevelInfo() {
    return this.addLevel > 0
      ? `${GameText.getText(GameText.TI_LEVEL)} ${this.level - this.addLevel} ${this.addLevel}`
      : `${GameText.getText(GameText.TI_LEVEL)} ${this.level}`
  }

  getPowerValue(t: number) {
    let e = 0
    this.power1 == t && (e += this.powerValue1)
    this.power2 == t && (e += this.powerValue2)
    this.power3 == t && (e += this.powerValue3)

    return e
  }

  isRebornSkill() {
    return this.power1 == Define.POWER_RECOVER
      || this.power1 == Define.POWER_RECOVER_PERCENT
      ? true
      : this.power2 == Define.POWER_RECOVER
        || this.power2 == Define.POWER_RECOVER_PERCENT
        ? true
        : !!(this.power3 == Define.POWER_RECOVER
          || this.power3 == Define.POWER_RECOVER_PERCENT)
  }

  getName() {
    return `${this.name}(${this.level})`
  }

  isAddSkill() {
    return this.addLevel <= 0 ? false : !(this.level - this.addLevel > 0)
  }

  getSkillTypeIcon() {
    let t = 11
    switch (this.skillWeapon) {
      case Define.SKILL_WEAPON_NONE:
        t = 11
        break
      case Define.SKILL_WEAPON_MELEE_1:
        t = 11
        break
      case Define.SKILL_WEAPON_MELEE_2:
        t = 14
        break
      case Define.SKILL_WEAPON_MELEE_3:
        t = 5
        break
      case Define.SKILL_WEAPON_RANGE:
        t = 3
        break
      case Define.SKILL_WEAPON_ONE_HAND:
        t = 10
        break
      case Define.SKILL_WEAPON_ONE_SWORD:
        t = 15
        break
      case Define.SKILL_WEAPON_TWO_SWORD:
        t = 7
        break
      case Define.SKILL_WEAPON_HEAVY_SWORD:
        t = 6
        break
      case Define.SKILL_WEAPON_ONE_BLADE:
        t = 12
        break
      case Define.SKILL_WEAPON_TWO_BLADE:
        t = 13
        break
      case Define.SKILL_WEAPON_HEAVY_BLADE:
        t = 12
        break
      case Define.SKILL_WEAPON_ONE_HEAVY:
        t = 5
        break
      case Define.SKILL_WEAPON_LANCE:
        t = 1
        break
      case Define.SKILL_WEAPON_ONE_CROSSBOW:
        t = 4
        break
      case Define.SKILL_WEAPON_TOW_CROSSBOW:
        t = 3
        break
      case Define.SKILL_WEAPON_HEAVY_CROSSBOW:
        t = 4
        break
      case Define.SKILL_WEAPON_BOW:
        t = 2
        break
      case Define.SKILL_WEAPON_HAND:
        t = 10
        break
      case Define.SKILL_WEAPON_CANE:
        t = 9
        break
      case Define.SKILL_WEAPON_BALL:
        t = 8
        break
      case Define.SKILL_WEAPON_SWORD:
        t = 6
        break
      case Define.SKILL_WEAPON_ONE_HAND_BLADE:
        t = 14
        break
      case Define.SKILL_WEAPON_GUN:
      case Define.SKILL_WEAPON_TWO_GUN:
        t = 16
        break
      case Define.SKILL_WEAPON_HEAVY_GUN:
        t = 17
    }
    return `skill_type_${t}${xhd ? '_hd' : '_sd'}`
  }

  isEnoughHP(t) {
    return this.useHP <= 0
      ? true
      : t == null
        ? false
        : t.get(Model.HP) >= this.useHP + 1
  }
}

export namespace Skill {
  export function fromBytes(byte: nato.Message): Skill {
    let skill = new Skill()

    skill = fromBaseBytes(skill, byte)

    return skill
  }

  export function fromShopBytes(byte: nato.Message): Skill {
    let skill = new Skill()

    skill = fromBaseBytes(skill, byte)

    skill.sp = 65535 & byte.getShort()
    skill.money1 = 65535 & byte.getShort()
    skill.money2 = 65535 & byte.getShort()
    skill.money3 = byte.getInt()
    skill.reqJob = byte.getByte()
    skill.reqLevel = byte.getByte()

    return skill
  }

  function fromBaseBytes(skill: Skill, byte: nato.Message) {
    skill.id = 65535 & byte.getShort()
    skill.level = byte.getByte()
    skill.name = byte.getString()
    skill.type = byte.getByte()
    skill.info = byte.getString()
    skill.skillWeapon = byte.getByte()
    skill.power1 = byte.getUnsignedByte()
    skill.powerValue1 = byte.getShort()
    skill.power2 = byte.getUnsignedByte()
    skill.powerValue2 = byte.getShort()
    skill.power3 = byte.getUnsignedByte()
    skill.powerValue3 = byte.getShort()

    if (skill.type !== Define.SKILL_TYPE_PASSIVE) {
      skill.skillAtkType = byte.getByte()
      skill.area = byte.getByte()
      skill.round = byte.getByte()
      skill.atk_time = byte.getByte()
      skill.useHP = 65535 & byte.getShort()
      skill.useMP = 65535 & byte.getShort()
      skill.anime1 = byte.getByte()
      skill.anime2 = byte.getShort()
      skill.anime3 = byte.getShort()
      skill.position = byte.getByte()
      skill.statusBit1 = byte.getByte()
      skill.statusBit2 = byte.getByte()
      skill.statusBit3 = byte.getByte()
    }

    skill.isLearnByBook = byte.getBoolean()

    return skill
  }

  export function processDataPlayerSkillMsg(byte: nato.Message, e = false) {
    const skills: Skill[] = []

    for (let n = byte.getShort(), o = 0; o < n; o++) {
      const skill = Skill.fromBytes(byte)

      if (e)
        skill.addLevel = byte.getByte()

      skills.push(skill)
    }

    return skills
  }

  export function getSkillBySkillId(skills: Skill[], skillId: number, level = 0) {
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i]
      if (skill != null && skill.id === skillId && skill.level === level)
        return skill
    }

    return null
  }

  export function doGetFormation(byte: nato.Message) {
    const i = byte.getByte()
    const skills: Skill[] = []

    if (i <= 0)
      return []

    for (let o = 0; o < i; o++) {
      const skill = fromByteFormationSkill(byte)
      skills.push(skill)
    }

    return skills
  }

  export function fromByteFormationSkill(byte: nato.Message) {
    const skill = new Skill()

    skill.formationType = byte.getByte()
    skill.id = byte.getInt()
    skill.skillId = byte.getByte()
    skill.level = byte.getByte()
    skill.name = byte.getString()
    skill.iconIndex = byte.getByte()
    skill.power1 = byte.getShort()
    skill.powerValue1 = byte.getShort()
    skill.power2 = byte.getShort()
    skill.powerValue2 = byte.getShort()
    skill.power3 = byte.getShort()
    skill.powerValue3 = byte.getShort()
    skill.teamcount = byte.getByte()
    skill.isDefault = byte.getBoolean()
    skill.type = Define.SKILL_TYPE_FORMATION

    return skill
  }

  export function isCanUse(e, n, i) {
    if (e == null || n == null)
      return false
    if (e.get(Model.MP) < n.useMP)
      return i != null && i.append(GameText.STR_SKILL_LACK_MP), false
    if (n.isEnoughHP(e) == 0)
      return i != null && i.append(GameText.STR_SKILL_LACK_HP), false
    if (e.getType() == 3) {
      const o = e.get(Model.LEFT_WEAPON_TYPE)
      const a = e.get(Model.RIGHT_WEAPON_TYPE)
      if (
        n.type == Define.SKILL_TYPE_ACTIVE
        && ((o == Define.BACK_ERROR_DUR && a == Define.BACK_ERROR_DUR)
          || (o == Define.BACK_ERROR_DUR && a == -1)
          || (o == -1 && a == Define.BACK_ERROR_DUR))
      )
        return i != null && i.append(GameText.STR_SKILL_WEAPON_DESTROY), false
      if (isValidSkillWeapon(o, a, n) == false) {
        return (
          i != null && i.append(GameText.STR_SKILL_WEAPON_DISCREPANCIES), false
        )
      }
    }
    return true
  }

  export function isValidSkillWeapon(t, e, n) {
    switch (n.skillWeapon) {
      case Define.SKILL_WEAPON_NONE:
        return true
      case Define.SKILL_WEAPON_MELEE_1:
        if (
          Define.isNullHand(t, e)
          || Define.isValidSword(t, e)
          || Define.isValidBlade(t, e)
          || Define.isValidHeavy(t, e)
          || Define.isValidLance(t, e)
        )
          return true
        break
      case Define.SKILL_WEAPON_MELEE_2:
        if (Define.isValidOneSword(t, e) || Define.isValidOneBlade(t, e))
          return true
        break
      case Define.SKILL_WEAPON_MELEE_3:
        if (
          Define.isValidTwoSword(t, e)
          || Define.isValidTwoBlade(t, e)
          || Define.isValidTwoHeavy(t, e)
          || Define.isValidLance(t, e)
        )
          return true
        break
      case Define.SKILL_WEAPON_RANGE:
        if (Define.isValidCrossrow(t, e) || Define.isValidBow(t, e))
          return true
        break
      case Define.SKILL_WEAPON_ONE_HAND:
        if (Define.isOneHandWeapon(t, e) || Define.isNullHand(t, e))
          return true
        break
      case Define.SKILL_WEAPON_ONE_SWORD:
        if (Define.isOneHandWeapon(t, e) && Define.isValidOneSword(t, e))
          return true
        break
      case Define.SKILL_WEAPON_TWO_SWORD:
        if (
          t == Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD
          && e == Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_SWORD:
        if (Define.isValidTwoSword(t, e))
          return true
        break
      case Define.SKILL_WEAPON_ONE_BLADE:
        if (Define.isValidBlade(t, e))
          return true
        break
      case Define.SKILL_WEAPON_TWO_BLADE:
        if (
          t == Define.ITEM_TYPE_WEAPON_ONEHAND_BLADE
          && e == Define.ITEM_TYPE_WEAPON_ONEHAND_BLADE
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_BLADE:
        if (Define.isValidTwoBlade(t, e))
          return true
        break
      case Define.SKILL_WEAPON_ONE_HEAVY:
        if (Define.isValidTwoHeavy(t, e))
          return true
        break
      case Define.SKILL_WEAPON_LANCE:
        if (Define.isValidLance(t, e))
          return true
        break
      case Define.SKILL_WEAPON_ONE_CROSSBOW:
        if (Define.isValidCrossrow(t, e))
          return true
        break
      case Define.SKILL_WEAPON_TOW_CROSSBOW:
        if (
          t == Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
          && e == Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_CROSSBOW:
        if (Define.isValidTwoCrossrow(t, e))
          return true
        break
      case Define.SKILL_WEAPON_BOW:
        if (Define.isValidBow(t, e))
          return true
        break
      case Define.SKILL_WEAPON_HAND:
        if (Define.isNullHand(t, e))
          return true
        break
      case Define.SKILL_WEAPON_CANE:
        if (Define.isValidStaff(t, e))
          return true
        break
      case Define.SKILL_WEAPON_BALL:
        if (Define.isValidBall(t, e))
          return true
        break
      case Define.SKILL_WEAPON_SWORD:
        if (Define.isValidSword(t, e))
          return true
        break
      case Define.SKILL_WEAPON_ONE_HAND_BLADE:
        if (Define.isOneHandWeapon(t, e) && Define.isValidOneBlade(t, e))
          return true
        break
      case Define.SKILL_WEAPON_GUN:
        if (Define.isValidGun(t, e))
          return true
        break
      case Define.SKILL_WEAPON_TWO_GUN:
        if (
          t == Define.ITEM_TYPE_WEAPON_ONEHAND_GUN
          && e == Define.ITEM_TYPE_WEAPON_ONEHAND_GUN
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_GUN:
        if (Define.isValidTwoGun(t, e))
          return true
    }
    return false
  }

  export const DUMMY_SKILL = new Skill()
  export const gAction = 0
  export const DELETE_SKILL_MONEY = [Model.MONEY2, 0]
}
