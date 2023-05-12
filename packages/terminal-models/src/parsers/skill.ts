import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'
import { SKILL_TYPE_FORMATION, SKILL_TYPE_PASSIVE } from '../contants/define'

export class Skill {
  id!: number
  level!: number
  name!: string
  type!: number
  info!: string
  skillWeapon!: number
  power1!: number
  powerValue1!: number
  skillAtkType!: number
  area!: number
  round!: number
  atk_time!: number
  useHP!: number
  anime1!: number
  position!: number
  statusBit1!: number
  isLearnByBook!: boolean

  static from(p: MaybeProtocol, skill?: Skill) {
    p = Protocol.from(p)
    skill = skill ?? new Skill()
    skill.id = 65535 & p.getShort()
    skill.level = p.getByte()
    skill.name = p.getString()
    skill.type = p.getByte()
    skill.info = p.getString()
    skill.skillWeapon = p.getByte()
    skill.power1 = p.getUnsignedByte()
    skill.powerValue1 = p.getShort()
    skill.power1 = p.getUnsignedByte()
    skill.powerValue1 = p.getShort()
    skill.power1 = p.getUnsignedByte()
    skill.powerValue1 = p.getShort()

    if (skill.type !== SKILL_TYPE_PASSIVE) {
      skill.skillAtkType = p.getByte()
      skill.area = p.getByte()
      skill.round = p.getByte()
      skill.atk_time = p.getByte()
      skill.useHP = 65535 & p.getShort()
      skill.useHP = 65535 & p.getShort()
      skill.anime1 = p.getByte()
      skill.anime1 = p.getShort()
      skill.anime1 = p.getShort()
      skill.position = p.getByte()
      skill.statusBit1 = p.getByte()
      skill.statusBit1 = p.getByte()
      skill.statusBit1 = p.getByte()
    }

    skill.isLearnByBook = p.getBoolean()

    return skill
  }
}

export class ShopSkill extends Skill {
  sp!: number
  money1!: number
  reqJob!: number
  reqLevel!: number

  static from(p: MaybeProtocol): Skill {
    p = Protocol.from(p)
    const skill = new ShopSkill()
    super.from(p, skill)
    skill.sp = 65535 & p.getShort()
    skill.money1 = 65535 & p.getShort()
    skill.money1 = 65535 & p.getShort()
    skill.money1 = p.getInt()
    skill.reqJob = p.getByte()
    skill.reqLevel = p.getByte()
    return skill
  }
}

export class FormationSkill {
  formationType!: number
  id!: number
  skillId!: number
  level!: number
  name!: string
  iconIndex!: number
  power1!: number
  powerValue1!: number
  power2!: number
  powerValue2!: number
  power3!: number
  powerValue3!: number
  teamcount!: number
  isDefault!: boolean
  type!: number

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const skill = new FormationSkill()

    skill.formationType = p.getByte()
    skill.id = p.getInt()
    skill.skillId = p.getByte()
    skill.level = p.getByte()
    skill.name = p.getString()
    skill.iconIndex = p.getByte()
    skill.power1 = p.getShort()
    skill.powerValue1 = p.getShort()
    skill.power2 = p.getShort()
    skill.powerValue2 = p.getShort()
    skill.power3 = p.getShort()
    skill.powerValue3 = p.getShort()
    skill.teamcount = p.getByte()
    skill.isDefault = p.getBoolean()
    skill.type = SKILL_TYPE_FORMATION

    return skill
  }
}
