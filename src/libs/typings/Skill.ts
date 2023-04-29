import type { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { GameText } from 'libs/defined/gameText'
import { Model } from './Model'
import type { Player } from './Player'
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

  getPowerValue(val: number) {
    let result = 0
    this.power1 === val && (result += this.powerValue1)
    this.power2 === val && (result += this.powerValue2)
    this.power3 === val && (result += this.powerValue3)

    return result
  }

  isRebornSkill() {
    return (this.power1 === Define.POWER_RECOVER
      || this.power1 === Define.POWER_RECOVER_PERCENT)
      ? true
      : (this.power2 === Define.POWER_RECOVER
        || this.power2 === Define.POWER_RECOVER_PERCENT)
          ? true
          : !!(this.power3 === Define.POWER_RECOVER
          || this.power3 === Define.POWER_RECOVER_PERCENT)
  }

  getName() {
    return `${this.name}(${this.level})`
  }

  isAddSkill() {
    return this.addLevel <= 0 ? false : !(this.level - this.addLevel > 0)
  }

  getSkillTypeIcon() {
    let icon = 11
    switch (this.skillWeapon) {
      case Define.SKILL_WEAPON_NONE:
        icon = 11
        break
      case Define.SKILL_WEAPON_MELEE_1:
        icon = 11
        break
      case Define.SKILL_WEAPON_MELEE_2:
        icon = 14
        break
      case Define.SKILL_WEAPON_MELEE_3:
        icon = 5
        break
      case Define.SKILL_WEAPON_RANGE:
        icon = 3
        break
      case Define.SKILL_WEAPON_ONE_HAND:
        icon = 10
        break
      case Define.SKILL_WEAPON_ONE_SWORD:
        icon = 15
        break
      case Define.SKILL_WEAPON_TWO_SWORD:
        icon = 7
        break
      case Define.SKILL_WEAPON_HEAVY_SWORD:
        icon = 6
        break
      case Define.SKILL_WEAPON_ONE_BLADE:
        icon = 12
        break
      case Define.SKILL_WEAPON_TWO_BLADE:
        icon = 13
        break
      case Define.SKILL_WEAPON_HEAVY_BLADE:
        icon = 12
        break
      case Define.SKILL_WEAPON_ONE_HEAVY:
        icon = 5
        break
      case Define.SKILL_WEAPON_LANCE:
        icon = 1
        break
      case Define.SKILL_WEAPON_ONE_CROSSBOW:
        icon = 4
        break
      case Define.SKILL_WEAPON_TOW_CROSSBOW:
        icon = 3
        break
      case Define.SKILL_WEAPON_HEAVY_CROSSBOW:
        icon = 4
        break
      case Define.SKILL_WEAPON_BOW:
        icon = 2
        break
      case Define.SKILL_WEAPON_HAND:
        icon = 10
        break
      case Define.SKILL_WEAPON_CANE:
        icon = 9
        break
      case Define.SKILL_WEAPON_BALL:
        icon = 8
        break
      case Define.SKILL_WEAPON_SWORD:
        icon = 6
        break
      case Define.SKILL_WEAPON_ONE_HAND_BLADE:
        icon = 14
        break
      case Define.SKILL_WEAPON_GUN:
      case Define.SKILL_WEAPON_TWO_GUN:
        icon = 16
        break
      case Define.SKILL_WEAPON_HEAVY_GUN:
        icon = 17
    }
    return `skill_type_${icon}${xhd ? '_hd' : '_sd'}`
  }

  isEnoughHP(player: Player) {
    return this.useHP <= 0
      ? true
      : player == null
        ? false
        : player.get(Model.HP) >= this.useHP + 1
  }
}

export namespace Skill {
  export function fromBytes(byte: Protocol): Skill {
    let skill = new Skill()

    skill = fromBaseBytes(skill, byte)

    return skill
  }

  export function fromShopBytes(byte: Protocol): Skill {
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

  function fromBaseBytes(skill: Skill, byte: Protocol) {
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

  export function processDataPlayerSkillMsg(byte: Protocol, e = false) {
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

  export function doGetFormation(byte: Protocol) {
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

  export function fromByteFormationSkill(byte: Protocol) {
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

  export function isCanUse(player: Player, skill: Skill, _ = null) {
    if (player == null || skill == null)
      return false
    if (player.get(Model.MP) < skill.useMP) {
      // _ != null && _.append(GameText.STR_SKILL_LACK_MP)
      return false
    }
    if (skill.isEnoughHP(player)) {
      // _ != null && _.append(GameText.STR_SKILL_LACK_HP)
      return false
    }
    if (player.getType() === 3) {
      const left = player.get(Model.LEFT_WEAPON_TYPE)
      const right = player.get(Model.RIGHT_WEAPON_TYPE)
      if (
        skill.type === Define.SKILL_TYPE_ACTIVE
        && ((left === Define.BACK_ERROR_DUR && right === Define.BACK_ERROR_DUR)
          || (left === Define.BACK_ERROR_DUR && right === -1)
          || (left === -1 && right === Define.BACK_ERROR_DUR))
      ) {
        // _ != null && _.append(GameText.STR_SKILL_WEAPON_DESTROY)
        return false
      }
      if (!isValidSkillWeapon(left, right, skill)) {
        // _ != null && _.append(GameText.STR_SKILL_WEAPON_DISCREPANCIES)
        return false
      }
    }
    return true
  }

  export function isValidSkillWeapon(left: number, right: number, skill: Skill) {
    switch (skill.skillWeapon) {
      case Define.SKILL_WEAPON_NONE:
        return true
      case Define.SKILL_WEAPON_MELEE_1:
        if (
          Define.isNullHand(left, right)
          || Define.isValidSword(left, right)
          || Define.isValidBlade(left, right)
          || Define.isValidHeavy(left, right)
          || Define.isValidLance(left, right)
        )
          return true
        break
      case Define.SKILL_WEAPON_MELEE_2:
        if (Define.isValidOneSword(left, right) || Define.isValidOneBlade(left, right))
          return true
        break
      case Define.SKILL_WEAPON_MELEE_3:
        if (
          Define.isValidTwoSword(left, right)
          || Define.isValidTwoBlade(left, right)
          || Define.isValidTwoHeavy(left, right)
          || Define.isValidLance(left, right)
        )
          return true
        break
      case Define.SKILL_WEAPON_RANGE:
        if (Define.isValidCrossrow(left, right) || Define.isValidBow(left, right))
          return true
        break
      case Define.SKILL_WEAPON_ONE_HAND:
        if (Define.isOneHandWeapon(left, right) || Define.isNullHand(left, right))
          return true
        break
      case Define.SKILL_WEAPON_ONE_SWORD:
        if (Define.isOneHandWeapon(left, right) && Define.isValidOneSword(left, right))
          return true
        break
      case Define.SKILL_WEAPON_TWO_SWORD:
        if (
          left === Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD
          && right === Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_SWORD:
        if (Define.isValidTwoSword(left, right))
          return true
        break
      case Define.SKILL_WEAPON_ONE_BLADE:
        if (Define.isValidBlade(left, right))
          return true
        break
      case Define.SKILL_WEAPON_TWO_BLADE:
        if (
          left === Define.ITEM_TYPE_WEAPON_ONEHAND_BLADE
          && right === Define.ITEM_TYPE_WEAPON_ONEHAND_BLADE
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_BLADE:
        if (Define.isValidTwoBlade(left, right))
          return true
        break
      case Define.SKILL_WEAPON_ONE_HEAVY:
        if (Define.isValidTwoHeavy(left, right))
          return true
        break
      case Define.SKILL_WEAPON_LANCE:
        if (Define.isValidLance(left, right))
          return true
        break
      case Define.SKILL_WEAPON_ONE_CROSSBOW:
        if (Define.isValidCrossrow(left, right))
          return true
        break
      case Define.SKILL_WEAPON_TOW_CROSSBOW:
        if (
          left === Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
          && right === Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_CROSSBOW:
        if (Define.isValidTwoCrossrow(left, right))
          return true
        break
      case Define.SKILL_WEAPON_BOW:
        if (Define.isValidBow(left, right))
          return true
        break
      case Define.SKILL_WEAPON_HAND:
        if (Define.isNullHand(left, right))
          return true
        break
      case Define.SKILL_WEAPON_CANE:
        if (Define.isValidStaff(left, right))
          return true
        break
      case Define.SKILL_WEAPON_BALL:
        if (Define.isValidBall(left, right))
          return true
        break
      case Define.SKILL_WEAPON_SWORD:
        if (Define.isValidSword(left, right))
          return true
        break
      case Define.SKILL_WEAPON_ONE_HAND_BLADE:
        if (Define.isOneHandWeapon(left, right) && Define.isValidOneBlade(left, right))
          return true
        break
      case Define.SKILL_WEAPON_GUN:
        if (Define.isValidGun(left, right))
          return true
        break
      case Define.SKILL_WEAPON_TWO_GUN:
        if (
          left === Define.ITEM_TYPE_WEAPON_ONEHAND_GUN
          && right === Define.ITEM_TYPE_WEAPON_ONEHAND_GUN
        )
          return true
        break
      case Define.SKILL_WEAPON_HEAVY_GUN:
        if (Define.isValidTwoGun(left, right))
          return true
    }
    return false
  }

  export const DUMMY_SKILL = new Skill()
  export const gAction = 0
  export const DELETE_SKILL_MONEY = [Model.MONEY2, 0]
}
