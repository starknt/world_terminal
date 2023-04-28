import { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { Tool } from 'libs/shared/Tool'
import { Model } from './Model'
import { MonsterAI } from './MonsterAI'
import { Player } from './Player'

export class Monster extends Player {
  atkType = 0
  monstertype = 0
  bornStatus = 0
  rewardMoney = 0
  rewardExp = 0
  monsterAI: MonsterAI | null = null
  strength = 0

  constructor() {
    super()
    this.setType(2)
  }

  clone() {
    const monster = new Monster()
    this.setMonsterData(monster)

    return monster
  }

  setAI(t) {
    this.monsterAI = t
  }

  getAITargetPos() {
    return this.monsterAI == null ? -1 : this.monsterAI.targetPos
  }

  getAttackTarget(t) {
    return t == null
      ? -1
      : this.monsterAI != null && t.isValidPos(this.monsterAI.targetPos)
        ? this.monsterAI.targetPos
        : MonsterAI.selectValueTarget(t, this, Define.AI_HATE_MAX, true)
  }

  getSkillByAI(t, e) {
    if (t == null)
      return null
    if (this.monsterAI == null)
      return null
    if (e)
      return this.monsterAI.getAutoSkill(t, this)
    const n = this.monsterAI.getBattleSkill(t, this)
    return n == null || n.useMP > this.get(Model.MP)
      ? null
      : n.isEnoughHP(this)
        ? n
        : null
  }

  setBattleStatus(e) {
    return e != Player.BSTATUS_ESCAPE
      && this.isBornStatus(e)
      && Define.getBufferType(e, true) == Define.BUFFER_TYPE_DEBUFF
      ? false
      : super.setBattleStatus.call(this, e)
  }

  isBattleStatus(e) {
    return e == Player.BSTATUS_ESCAPE
      || !this.isBornStatus(e)
      || (Define.getBufferType(e, true) != Define.BUFFER_TYPE_BUFF
        && e != Define.getBufferBitValue(Define.BUFFER_DIE_CANNOT_RELIVE))
      ? super.isBattleStatus.call(this, e)
      : true
  }

  isBornStatus(t) {
    return (this.bornStatus & t) != 0
  }

  get(e) {
    switch (e) {
      case Model.ATK_TYPE:
        return this.getAttackType()
      case Model.HPMAX:
        return this.hpMax
      case Model.MPMAX:
        return this.mpMax
      case Model.SPEED:
        return this.speed
      case Model.DODGE:
        return this.dodge
      case Model.LEFT_ATK_MIN:
        return Tool.sumValue(this.atkMin, 0, 0, Model.MAX_ATK)
      case Model.LEFT_ATK_MAX:
        return Tool.sumValue(this.atkMax, 0, 0, Model.MAX_ATK)
      case Model.RIGHT_ATK_MIN:
        return 0
      case Model.RIGHT_ATK_MAX:
        return 0
      case Model.LEFT_ATK_TIME:
      case Model.ATK_TIME:
        return Tool.sumValue(
          this.atk_time + 1,
          0,
          Model.MIN_HIT_TIME,
          Model.MAX_HIT_TIME,
        )
      case Model.RIGHT_ATK_TIME:
        return 0
      case Model.ATK_STR:
        return this.atk_str
      case Model.ATK_AGI:
        return this.atk_agi
      case Model.ATK_MAGIC:
        return this.atk_magic
      case Model.DEF_STR:
        return this.def_str
      case Model.DEF_AGI:
        return this.def_agi
      case Model.DEF_MAGIC:
        return this.def_magic
      case Model.WIL:
        return this.wil
      case Model.TOUGH:
        return this.tough
      case Model.BLOCK:
        return this.block
      case Model.BRK_ARMOR:
        return this.brkArmor
      case Model.MAGIC_PENETRATION:
        return this.magic_penetration
      case Model.INSIGHT:
        return this.insight
      case Model.DEF_FIELD:
        return this.def_field
      case Model.BACK:
        return this.back
      case Model.MAGIC_BACK:
        return this.magic_back
      case Model.LIFE_ABSORPTION:
        return this.life_absorption
      case Model.MANA_ABSORPTION:
        return this.mana_absorption
      case Model.FORCE_HIT:
        return Model.MIN_FORCE_HITRATE
      case Model.BACK_MAX:
        return 100
      default:
        return super.get.call(this, e)
    }
  }

  getAttackType() {
    return this.atkType
  }

  setMonsterData(t: Monster) {
    t.id = this.id
    t.playerName = this.playerName
    t.icon1 = this.icon1
    t.icon2 = this.icon2
    t.icon3 = this.icon3
    t.level = this.level
    t.monstertype = this.monstertype
    t.hpMax = this.hpMax
    t.mpMax = this.mpMax
    t.speed = this.speed
    t.atkType = this.atkType
    t.atkMin = this.atkMin
    t.atkMax = this.atkMax
    t.dodge = this.dodge
    t.atk_time = this.atk_time
    t.atk_str = this.atk_str
    t.atk_agi = this.atk_agi
    t.atk_magic = this.atk_magic
    t.def_str = this.def_str
    t.def_agi = this.def_agi
    t.def_magic = this.def_magic
    t.hitrate = this.hitrate
    t.hitMagic = this.hitMagic
    t.critical = this.critical
    t.wil = this.wil
    t.tough = this.tough
    t.block = this.block
    t.brkArmor = this.brkArmor
    t.insight = this.insight
    t.def_field = this.def_field
    t.back = this.back
    t.magic_back = this.magic_back
    t.life_absorption = this.life_absorption
    t.mana_absorption = this.mana_absorption
    t.magic_penetration = this.magic_penetration
    t.bornStatus = this.bornStatus
    t.rewardMoney = this.rewardMoney
    t.rewardExp = this.rewardExp
    t.monsterAI = this.monsterAI
  }

  isHaveCanNotReliveBuffer() {
    return this.isBornStatus(
      Define.getBufferBitValue(Define.BUFFER_DIE_CANNOT_RELIVE),
    )
      ? true
      : super.isHaveCanNotReliveBuffer.call(this)
  }
}

export namespace Monster {
  export function fromMonsterBytes(model: Monster, byte: Protocol) {
    const id = byte.getInt()

    if (id < 0)
      return null

    const monster = model

    monster.id = id
    monster.playerName = byte.getString()
    monster.icon1 = byte.getInt()
    monster.level = byte.getByte()
    monster.monstertype = byte.getByte()
    monster.hpMax = byte.getInt()
    monster.mpMax = byte.getInt()
    monster.speed = 65535 & byte.getShort()
    monster.atkType = byte.getByte()
    monster.atkMin = 65535 & byte.getShort()
    monster.atkMax = 65535 & byte.getShort()
    monster.atk_time = byte.getByte()
    monster.dodge = byte.getShort()
    monster.atk_str = 65535 & byte.getShort()
    monster.atk_agi = 65535 & byte.getShort()
    monster.atk_magic = 65535 & byte.getShort()
    monster.def_str = 65535 & byte.getShort()
    monster.def_agi = 65535 & byte.getShort()
    monster.def_magic = 65535 & byte.getShort()
    monster.hitrate = byte.getShort()
    monster.hitMagic = byte.getShort()
    monster.critical = byte.getShort()
    monster.wil = byte.getShort()
    monster.tough = byte.getShort()
    monster.block = byte.getShort()
    monster.brkArmor = byte.getShort()
    monster.insight = byte.getShort()
    monster.def_field = byte.getShort()
    monster.back = byte.getShort()
    monster.magic_back = byte.getShort()
    monster.life_absorption = byte.getShort()
    monster.mana_absorption = byte.getShort()
    monster.magic_penetration = byte.getShort()
    monster.bornStatus = byte.getInt()

    return monster
  }
}
