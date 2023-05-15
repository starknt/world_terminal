import type { MaybeProtocol } from '@terminal/core'
import { Protocol } from '@terminal/core'
import { MODE_SHOP } from '../contants/model'
import { Skill } from './skill'

export class Model {
  id!: number
  name!: string
  info!: string
  title!: string
  level!: number
  level2!: number
  icon1!: number
  icon2!: number
  icon3!: number
  settings!: number
  status!: number
  mode!: number
  shopName!: string
  shopType!: number
  countryId!: number
  countryName!: string
  countryRank!: number
  x!: number
  y!: number
  vipLevel!: number

  isStatusBit(bit: number) {
    return (this.status & bit) !== 0
  }

  setStatusBit(bit: number) {
    this.status |= bit
  }

  clearStatusBit(bit: number) {
    this.status &= ~bit
  }

  isSettingBit(bit: number) {
    return (this.settings & bit) !== 0
  }

  setSettingBit(bit: number) {
    this.settings |= bit
  }

  clearSettingBit(bit: number) {
    this.settings &= ~bit
  }

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const model = new Model()
    model.id = p.getInt()
    model.name = p.getString()
    model.info = p.getString()
    model.title = p.getString()
    model.level = p.getByte()
    model.level2 = p.getByte()
    model.icon1 = p.getInt()
    model.icon2 = p.getInt()
    model.icon3 = p.getInt()
    model.settings = p.getInt()
    model.status = p.getInt()
    model.mode = p.getByte()
    if (model.mode === MODE_SHOP) {
      model.shopName = p.getString()
      model.shopType = p.getByte()
    }

    model.countryId = p.getInt()
    if (model.countryId >= 0) {
      model.countryName = p.getString()
      model.countryRank = p.getByte()
    }
    model.x = p.getByte()
    model.y = p.getByte()
    model.vipLevel = p.getByte()

    return model
  }
}

export class Player extends Model {
  sex!: number
  race!: number
  job!: number
  exp2!: number
  expMax2!: number
  exp!: number
  expMax!: number
  hp!: number
  mp!: number
  cp!: number
  sp!: number
  str!: number
  con!: number
  agi!: number
  ilt!: number
  wis!: number
  money1!: number
  money2!: number
  money3!: number
  numBag!: number
  numStroe!: number
  countryHonor!: number
  cityId!: number
  killCount!: number
  Pkwincount!: number
  Pklosecount!: number
  masterFlag!: number
  partnerId!: number
  lovePlayer!: string
  integral!: number
  arenaPoint!: number
  skyarenaPoint!: number
  superQqLevel!: number
  autoSkillID!: any[]
  autoSkillID_Initiative!: number
  power!: number
  powerValue!: number
  titlePower1!: number
  titlePowerValue1!: number
  titlePower2!: number
  titlePowerValue2!: number
  countrypowerValue!: number
  enchantValue!: number

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const player = new Player()
    player.id = p.getInt()
    player.name = p.getString()
    player.info = p.getString()
    player.title = p.getString()
    player.sex = p.getByte()
    player.race = p.getByte()
    player.job = p.getByte()
    player.level = p.getByte()
    player.level2 = p.getByte()
    player.exp2 = p.getInt()
    player.expMax2 = p.getInt()
    player.icon1 = p.getInt()
    player.icon2 = p.getInt()
    player.icon3 = p.getInt()
    player.settings = p.getInt()
    player.status = p.getInt()
    player.mode = p.getByte()
    player.countryId = p.getInt()
    if (player.countryId >= 0) {
      player.countryName = p.getString()
      player.countryRank = p.getByte()
    }

    player.exp = p.getInt()
    player.expMax = p.getInt()
    player.hp = p.getInt()
    player.mp = p.getInt()
    player.cp = p.getShort()
    player.sp = p.getInt()
    player.str = p.getShort()
    player.con = p.getShort()
    player.agi = p.getShort()
    player.ilt = p.getShort()
    player.wis = p.getShort()
    player.money1 = p.getInt()
    player.money2 = p.getInt()
    player.money3 = p.getInt()
    player.numBag = p.getByte()
    player.numStroe = p.getByte()
    player.countryHonor = p.getInt()
    player.cityId = p.getInt()
    player.killCount = p.getInt()
    player.Pkwincount = p.getInt()
    player.Pklosecount = p.getInt()
    player.masterFlag = p.getByte()
    player.partnerId = p.getInt()

    if (player.partnerId >= 0)
      p.getString()

    p.getString()
    player.lovePlayer = p.getString()
    player.integral = p.getInt()
    player.arenaPoint = p.getInt()
    player.skyarenaPoint = p.getInt()
    player.vipLevel = p.getByte()
    player.superQqLevel = p.getByte()
    player.autoSkillID = Array.from({ length: p.getByte() }, () => (p as Protocol).getShort())
    player.autoSkillID_Initiative = p.getShort()
    const itemSetData: number[] = Array.from({ length: p.getByte() }, () => (p as Protocol).getShort())

    // eslint-disable-next-line no-console
    console.log({ itemSetData })

    player.power = p.getUnsignedByte()
    player.powerValue = p.getShort()
    player.titlePower1 = p.getUnsignedByte()
    player.titlePowerValue1 = p.getShort()
    player.titlePower2 = p.getUnsignedByte()
    player.titlePowerValue2 = p.getShort()
    player.countrypowerValue = p.getByte()
    player.enchantValue = p.getInt()

    return player
  }
}

export class Monster extends Model {
  playerName!: string
  monstertype!: number
  hpMax!: number
  mpMax!: number
  speed!: number
  atkType!: number
  atkMin!: number
  atkMax!: number
  atk_time!: number
  dodge!: number
  atk_str!: number
  atk_agi!: number
  atk_magic!: number
  def_str!: number
  def_agi!: number
  def_magic!: number
  hitrate!: number
  hitMagic!: number
  critical!: number
  wil!: number
  tough!: number
  block!: number
  brkArmor!: number
  insight!: number
  def_field!: number
  back!: number
  magic_back!: number
  life_absorption!: number
  mana_absorption!: number
  magic_penetration!: number
  bornStatus!: number

  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const monster = new Monster()

    monster.id = p.getInt()
    monster.playerName = p.getString()
    monster.icon1 = p.getInt()
    monster.level = p.getByte()
    monster.monstertype = p.getByte()
    monster.hpMax = p.getInt()
    monster.mpMax = p.getInt()
    monster.speed = 65535 & p.getShort()
    monster.atkType = p.getByte()
    monster.atkMin = 65535 & p.getShort()
    monster.atkMax = 65535 & p.getShort()
    monster.atk_time = p.getByte()
    monster.dodge = p.getShort()
    monster.atk_str = 65535 & p.getShort()
    monster.atk_agi = 65535 & p.getShort()
    monster.atk_magic = 65535 & p.getShort()
    monster.def_str = 65535 & p.getShort()
    monster.def_agi = 65535 & p.getShort()
    monster.def_magic = 65535 & p.getShort()
    monster.hitrate = p.getShort()
    monster.hitMagic = p.getShort()
    monster.critical = p.getShort()
    monster.wil = p.getShort()
    monster.tough = p.getShort()
    monster.block = p.getShort()
    monster.brkArmor = p.getShort()
    monster.insight = p.getShort()
    monster.def_field = p.getShort()
    monster.back = p.getShort()
    monster.magic_back = p.getShort()
    monster.life_absorption = p.getShort()
    monster.mana_absorption = p.getShort()
    monster.magic_penetration = p.getShort()
    monster.bornStatus = p.getInt()

    return monster
  }
}

export class MonsterAI {
  id!: number
  conType!: number[]
  conValue!: number[]
  msg!: string[]
  skill1!: (Skill | undefined)[]
  skill2!: (Skill | undefined)[]
  targetType!: number[]

  static from(p: MaybeProtocol, skill: Skill[] = []) {
    p = Protocol.from(p)
    const monsterAI = new MonsterAI()

    monsterAI.id = p.getShort()
    const len = p.getByte()
    monsterAI.conType = new Array(len)
    monsterAI.conValue = new Array(len)
    monsterAI.msg = new Array(len)
    monsterAI.skill1 = new Array(len)
    monsterAI.skill2 = new Array(len)
    monsterAI.targetType = new Array(len)

    function getSkillBySkillId(id: number, level = 0) {
      return skill.find(s => s.id === id && s.level === level)
    }

    for (let i = 0; i < len; i++) {
      monsterAI.conType[i] = p.getByte()
      monsterAI.conValue[i] = p.getInt()
      monsterAI.msg[i] = p.getString()
      monsterAI.skill1[i] = getSkillBySkillId(p.getShort(), p.getByte())
      monsterAI.skill2[i] = getSkillBySkillId(p.getShort(), p.getByte())
      monsterAI.targetType[i] = p.getByte()
    }

    return monsterAI
  }
}

export class Pet extends Monster {
  job!: number
  strength!: number
  hp!: number
  mp!: number
  monsterAI!: MonsterAI

  static from(p: MaybeProtocol): Pet {
    p = Protocol.from(p)
    const pet = super.from(p) as Pet
    pet.info = p.getString()
    pet.job = p.getByte()
    pet.strength = p.getByte()
    pet.hp = p.getInt()
    pet.mp = p.getInt()
    pet.icon2 = p.getInt()
    pet.icon3 = p.getInt()

    if (p.getBoolean()) {
      const skills: Skill[] = []
      for (let i = p.getByte(), a = 0; i > a; a++)
        skills.push(Skill.from(p))
      const ai = MonsterAI.from(p, skills)
      pet.monsterAI = ai
    }
    return pet
  }
}

export class Mercenary extends Monster {
  groupId!: number
  expireTime1!: number
  pet!: Monster
  static from(p: MaybeProtocol) {
    p = Protocol.from(p)
    const mercenary = new Mercenary()

    mercenary.groupId = p.getShort()
    mercenary.expireTime1 = new Date().getTime() + p.getInt()
    mercenary.pet = Pet.from(p)

    return mercenary
  }
}
