import type { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { Tool } from 'libs/shared/Tool'
import { Model } from './Model'
import { Player } from './Player'
import { Skill } from './Skill'

export class Pet extends Player {
  owner: Player
  name = ''
  grow = 0
  compre = 0
  growLevel = 0
  ageTime = 0
  petHitrate = 0
  atkType = 0
  petAtkTime = 0
  grade = 0
  bornStatus = 0
  color: any

  constructor(n) {
    super()

    this.setType(4)
    this.owner = n
  }

  isAlive() {
    return this.vipLevel > 0
      ? false
      : this.ageTime > Date.now()
  }

  isBornStatus(status: number) {
    return (this.bornStatus & status) !== 0
  }

  setBattleStatus(status: number) {
    return (status !== Player.BSTATUS_ESCAPE
      && this.isBornStatus(status)
      && Define.getBufferType(status, true) === Define.BUFFER_TYPE_DEBUFF)
      ? false
      : super.setBattleStatus.call(this, status)
  }

  isBattleStatus(status: number) {
    return ((status === Player.BSTATUS_ESCAPE
      || !this.isBornStatus(status)
      || (Define.getBufferType(status, true) !== Define.BUFFER_TYPE_BUFF))
        && (status !== Define.getBufferBitValue(Define.BUFFER_DIE_CANNOT_RELIVE)))
      ? super.isBattleStatus.call(this, status)
      : true
  }

  addValue(type: number, val: number) {
    switch (type) {
      case Model.PET_GROW_LEVEL:
        this.growLevel = Tool.sumValue(this.growLevel, val, 0, 120)
        break
      default:
        super.addValue.call(this, type, val)
    }
  }

  get(type: number) {
    let n = 0
    switch (type) {
      case Model.PET_COLOR:
        return this.color
      case Model.PET_GRADE:
        return this.grade
      case Model.PET_GROW_LEVEL:
        return this.growLevel
      case Model.ATK_TYPE:
        return this.atkType
      case Model.HIT_RATE:
        return (
          (n = this.petHitrate),
          (n = this.getPetPowerValue(
            n,
            this.hitrate,
            Define.POWER_HITRATE,
            Define.POWER_HITRATE_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
            Define.POWER_NONE,
          ))
        )
      case Model.HIT_MAGIC:
        return (
          (n = this.petHitrate),
          (n = this.getPetPowerValue(
            n,
            this.hitMagic,
            Define.POWER_MAGIC_HITRATE,
            Define.POWER_MAGIC_HITRATE_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            Model.MIN_HIT_MAGIC,
            Model.MAX_BASE_ATTRIBUTE,
            Define.POWER_NONE,
          ))
        )
      case Model.LEFT_ATK_TIME:
      case Model.ATK_TIME:
        return (
          (n = this.petAtkTime),
          (n = Tool.sumValue(
            n + 1,
            this.atk_time,
            Model.MIN_HIT_TIME,
            Model.MAX_HIT_TIME,
          )),
          (n += this.getSkillPowerValue(
            Define.SKILL_TYPE_PASSIVE,
            Define.POWER_ALL_ATK_TIME,
          ))
        )
      case Model.RIGHT_ATK_TIME:
        return 0
      case Model.LEFT_ATK_MIN:
        return (
          (n = this.atkMin),
          (n = this.getPetPowerValue(
            n,
            0,
            Define.POWER_NONE,
            Define.POWER_NONE,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
            Define.POWER_PET_DAMAGE,
          )),
          Tool.sumValue(n, 0, 0, Model.MAX_ATK)
        )
      case Model.LEFT_ATK_MAX:
        return (
          (n = this.atkMax),
          (n = this.getPetPowerValue(
            n,
            0,
            Define.POWER_NONE,
            Define.POWER_NONE,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
            Define.POWER_PET_DAMAGE,
          )),
          Tool.sumValue(n, 0, 0, Model.MAX_ATK)
        )
      case Model.RIGHT_ATK_MIN:
        return 0
      case Model.RIGHT_ATK_MAX:
        return 0
      case Model.HPMAX:
        return (
          (n = Math.floor(
            (65 * this.get(Model.CON)) / 10
            + 3 * this.get(Model.STR)
            + 100
            + 20 * (this.get(Model.LEVEL) - 1),
          )),
          (n = this.getPetPowerValue(
            n,
            this.hpMax,
            Define.POWER_HPMAX,
            Define.POWER_HPMAX_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            1,
            Model.MAX_PLAYER_HP,
            Define.POWER_PET_HPMAX_PERCENT,
          ))
        )
      case Model.MPMAX:
        return (
          (n
            = 5 * this.get(Model.ILT)
            + 2 * this.get(Model.WIS)
            + 40
            + 5 * (this.get(Model.LEVEL) - 1)),
          (n = this.getPetPowerValue(
            n,
            this.mpMax,
            Define.POWER_MPMAX,
            Define.POWER_MPMAX_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            1,
            Model.MAX_PLAYER_MP,
            Define.POWER_PET_MPMAX_PERCENT,
          ))
        )
      case Model.STR:
        return (
          (n = this.str),
          (n = this.getPetBaseValue(
            n,
            Define.POWER_STR,
            Define.POWER_STR_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
            Define.POWER_PET_STR_PERCENT,
          ))
        )
      case Model.CON:
        return (
          (n = this.con),
          (n = this.getPetBaseValue(
            n,
            Define.POWER_CON,
            Define.POWER_CON_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
            Define.POWER_PET_CON_PERCENT,
          ))
        )
      case Model.AGI:
        return (
          (n = this.agi),
          (n = this.getPetBaseValue(
            n,
            Define.POWER_AGI,
            Define.POWER_AGI_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
            Define.POWER_PET_AGI_PERCENT,
          ))
        )
      case Model.ILT:
        return (
          (n = this.ilt),
          (n = this.getPetBaseValue(
            n,
            Define.POWER_ILT,
            Define.POWER_ILT_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
            Define.POWER_PET_ILT_PERCENT,
          ))
        )
      case Model.WIS:
        return (
          (n = this.wis),
          (n = this.getPetBaseValue(
            n,
            Define.POWER_WIS,
            Define.POWER_WIS_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
            Define.POWER_PET_WIS_PERCENT,
          ))
        )
      default:
        return (
          this.owner && (this.formationSkill = this.owner.formationSkill),
          super.get.call(this, type)
        )
    }
  }

  getPetBaseValue(t: number, e: number, n: number, i: number, o: number, a: number, r: number) {
    let s = t
    s += this.getSkillPowerValue(i, e)
    let l = this.getSkillPowerValue(i, n)
    return (
      this.owner
      && ((l += this.owner.getBagEquipPowerValue(r)),
      (l += this.owner.getSkillPowerValue(Define.SKILL_TYPE_PASSIVE, r)),
      (l += this.owner.getPowerValueByBuffer(r))),
      this.owner
      && this.owner.formationSkill
      && ((s += this.owner.formationSkill.getPowerValue(e)),
      (l += this.owner.formationSkill.getPowerValue(n))),
      l > 0 && (s += Math.floor((s * l) / 100)),
      (s = Tool.sumValue(s, 0, o, a))
    )
  }

  getPetPowerValue(t, e, n, i, o, a, r, s) {
    let l = t
    l += this.getSkillPowerValue(o, n)
    let _ = this.getSkillPowerValue(o, i)
    return (
      this.owner
      && s > 0
      && ((_ += this.owner.getBagEquipPowerValue(s)),
      (_ += this.owner.getSkillPowerValue(Define.SKILL_TYPE_PASSIVE, s)),
      (_ += this.owner.getPowerValueByBuffer(s))),
      this.owner
      && this.owner.formationSkill
      && ((l += this.owner.formationSkill.getPowerValue(n)),
      (_ += this.owner.formationSkill.getPowerValue(i))),
      _ > 0 && (l += Math.floor((l * _) / 100)),
      (l = Tool.sumValue(l, e, a, r))
    )
  }

  getPetAge() {
    let t = Math.floor((this.ageTime - Date.now()) / Tool.MILLIS_IN_DAY)
    return t < 0 && (t = 0), t
  }

  isHaveCanNotReliveBuffer() {
    return this.isBornStatus(
      Define.getBufferBitValue(Define.BUFFER_DIE_CANNOT_RELIVE),
    )
      ? true
      : super.isHaveCanNotReliveBuffer.call(this)
  }

  getDescribe() {

  }

  getBaseAttributeDesc(t, e, n) {
    e <= 0 || n.append(`${t + e}\n`)
  }
}

export namespace Pet {
  export function fromPetBytes(byte: Protocol, owner?: Player) {
    let pet = new Pet(owner)

    const result = fromBytesDetail(byte, pet)

    if (result instanceof Pet)
      pet = result
    else
      return null

    if (owner)
      pet.owner = owner

    return pet
  }

  export function fromBytesOtherPlayer(byte: Protocol, model?: Model) {
    const id = byte.getByte()

    if (id < 0)
      return null

    const pet = new Model(4)
    pet.setId(id)
    pet.setName(byte.getString())
    // icon1
    byte.getInt()
  }

  export function fromBytesMyPlayer(t, n) {
    const i = new Pet(n)
    const o = fromBytesDetail(t, i) as number
    return o < 0 ? null : i
  }

  export function fromBytesDetail(byte: Protocol, pet: Pet) {
    const n = byte.getByte()

    if (n < 0)
      return n

    pet.id = n
    pet.playerName = byte.getString()
    pet.name = pet.playerName
    pet.level = byte.getByte()
    pet.icon1 = byte.getInt()
    pet.hp = byte.getInt()
    pet.mp = byte.getInt()
    pet.exp = byte.getInt()
    pet.expMax = byte.getInt()
    pet.sp = byte.getInt()
    pet.str = byte.getShort()
    pet.con = byte.getShort()
    pet.agi = byte.getShort()
    pet.ilt = byte.getShort()
    pet.wis = byte.getShort()
    pet.grow = byte.getByte()
    pet.compre = byte.getByte()
    pet.cp = byte.getByte()
    pet.growLevel = byte.getByte()
    const i = byte.getLong().value
    pet.ageTime = Date.now() + i
    pet.petHitrate = byte.getShort()
    pet.atkType = byte.getByte()
    pet.atkMin = byte.getShort()
    pet.atkMax = byte.getShort()
    pet.petAtkTime = byte.getByte()
    pet.job = byte.getByte()
    pet.grade = byte.getByte()

    const o = byte.getByte()
    pet.autoSkillID = []
    for (let a = 0; o > a; a++)
      pet.autoSkillID[a] = byte.getShort()
    pet.autoSkillID_Initiative = byte.getShort()
    pet.skillList = Skill.processDataPlayerSkillMsg(byte)
    pet.vipLevel = byte.getByte()
    pet.bornStatus = byte.getInt()

    return pet
  }
}
