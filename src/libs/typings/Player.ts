import type { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { Battle } from 'libs/service/Battle/battle'
import type { Control } from 'libs/service/Battle/Control'
import { GZIP } from 'libs/shared/GZIP'
import { Tools } from 'libs/shared/Tool'
import { Mission } from './Mission'
import { Model } from './Model'
import { PlayerBag } from './PlayerBag'
import { PlayerBuffer } from './PlayerBuffer'
import { Skill } from './Skill'

export class Player extends Model {
  bag: PlayerBag = new PlayerBag(this)
  battleBufferList: PlayerBuffer[] = []
  itemSetData: number[] = []
  playerTurnMonster: any
  exp_up = 0
  argo = 0
  exp2 = 0
  expMax2 = 0
  exp = 0
  expMax = 0
  hp = 0
  mp = 0
  cp = 0
  sp = 0
  str = 0
  con = 0
  agi = 0
  ilt = 0
  wis = 0
  money1 = 0
  money2 = 0
  money3 = 0
  numBag = 0
  numStroe = 0
  countryHonor = 0
  cityId = 0
  killCount = 0
  Pkwincount = 0
  Pklosecount = 0
  masterFlag = 0
  totalOnline = 0
  integral = 0
  arenaPoint = 0
  arenaStutas = 0
  skyarenaPoint = 0
  partnerId = 0
  hpMax = 0
  mpMax = 0
  speed = 0
  atkMin = 0
  atkMax = 0
  atk_time = 0
  atk_str = 0
  atk_agi = 0
  atk_magic = 0
  def_str = 0
  def_agi = 0
  def_magic = 0
  dodge = 0
  hitrate = 0
  hitMagic = 0
  critical = 0
  forceHit = 0
  wil = 0
  tough = 0
  block = 0
  brkArmor = 0
  magic_penetration = 0
  insight = 0
  def_field = 0
  back = 0
  magic_back = 0
  life_absorption = 0
  mana_absorption = 0
  heal_recovery = 0
  mana_recovery = 0
  recovery = 0
  keepout_atk_time = 0
  weapon_damage_percent = 0
  titlePower1 = 0
  titlePowerValue1 = 0
  titlePower2 = 0
  titlePowerValue2 = 0
  power = 0
  powerValue = 0
  powerExpireTime = 0
  autoSkillID_Initiative = -1
  skillList: Skill[] = []
  formationList = []
  formationSkill: any = null
  powerX = 0
  countrypowerValue = 0
  fightPowerList = []
  bStatus = 0
  autoMoveControlList = []
  autoSkillID: any[] = []

  missionList: Mission[] = []

  lovePlayer = ''
  readAddValue = 0
  hpDisplay = 0
  battlePlanControlList: any[] = []
  missionStatus: number[] = []

  constructor() {
    super(3)
  }

  addMission(mission: Mission) {
    return mission.isEscort()
      ? true
      : (this.missionList == null && (this.missionList = []),
        this.getMissionById(mission.getId()) != null
          ? false
          : this.missionList.length < Player.MAX_MISSION_SIZE
            ? (this.missionList.push(mission),
              Mission.setNewRadar(mission),
              true)
            : false)
  }

  addValue(type: number, value: number) {
    let i = 0
    let o = 0
    switch (((this.readAddValue = value), type)) {
      case Model.PARTNER_ID:
        this.partnerId = value
        break
      case Model.MASTER_FLAG:
        this.masterFlag = value
        break
      case Model.EXP:
        this.exp = Tools.sumValue(this.exp, value, 0, this.expMax)
        break
      case Model.EXP2:
        this.exp2 = Tools.sumValue(this.exp2, value, 0, this.expMax2)
        break
      case Model.SET_EXP:
        this.exp = value
        break
      case Model.SET_EXP2:
        this.exp2 = value
        break
      case Model.EXPMAX:
        this.expMax = Tools.sumValue(this.expMax, value, 0, Tools.MAX_VALUE_int)
        break
      case Model.SET_EXPMAX:
        this.expMax = value
        break
      case Model.SET_EXPMAX2:
        this.expMax2 = value
        break
      case Model.HP:
        this.hp = Tools.sumValue(this.hp, value, 0, this.get(Model.HPMAX))
        break
      case Model.HP_DISPLAY:
        this.hpDisplay = Tools.sumValue(
          this.hpDisplay,
          value,
          0,
          this.get(Model.HPMAX),
        )
        break
      case Model.MP:
        this.mp = Tools.sumValue(this.mp, value, 0, this.get(Model.MPMAX))
        break
      case Model.MP_DISPLAY:
        this.hpDisplay = Tools.sumValue(
          this.hpDisplay,
          value,
          0,
          this.get(Model.MPMAX),
        )
        break
      case Model.SP:
        this.sp = Tools.sumValue(this.sp, value, 0, Tools.MAX_VALUE_int)
        break
      case Model.CP:
        this.cp = Tools.sumValue(this.cp, value, 0, Tools.MAX_VALUE_short)
        break
      case Model.STR:
        (this.str = Tools.sumValue(
          this.str,
          value,
          0,
          Model.MAX_BASE_ATTRIBUTE,
        )),
        (i = this.get(Model.HPMAX)),
        this.hp > i && (this.hp = i)
        break
      case Model.CON:
        (this.con = Tools.sumValue(
          this.con,
          value,
          0,
          Model.MAX_BASE_ATTRIBUTE,
        )),
        (i = this.get(Model.HPMAX)),
        this.hp > i && (this.hp = i)
        break
      case Model.AGI:
        this.agi = Tools.sumValue(
          this.agi,
          value,
          0,
          Model.MAX_BASE_ATTRIBUTE,
        )
        break
      case Model.ILT:
        (this.ilt = Tools.sumValue(
          this.ilt,
          value,
          0,
          Model.MAX_BASE_ATTRIBUTE,
        )),
        (i = this.get(Model.MPMAX)),
        this.mp > i && (this.mp = i)
        break
      case Model.WIS:
        (this.wis = Tools.sumValue(
          this.wis,
          value,
          0,
          Model.MAX_BASE_ATTRIBUTE,
        )),
        (i = this.get(Model.MPMAX)),
        this.mp > i && (this.mp = i)
        break
      case Model.MONEY1:
        this.money1 = Tools.sumValue(this.money1, value, 0, Tools.MAX_VALUE_int)
        break
      case Model.MONEY2:
        this.money2 = Tools.sumValue(this.money2, value, 0, Tools.MAX_VALUE_int)
        break
      case Model.MONEY3:
        this.money3 > 0 && value > 0 && this.money3 + value < 0
          ? (this.money3 = Tools.MAX_VALUE_int)
          : ((this.money3 += value), this.money3 < 0 && (this.money3 = 0))
        break
      case Model.NUM_STROE:
        this.numStroe = Tools.sumValue(
          this.numStroe,
          value,
          0,
          Model.MAX_STORE_NUM,
        )
        break
      case Model.COUNTRY_HONOR:
        this.countryHonor = Tools.sumValue(
          this.countryHonor,
          value,
          0,
          Tools.MAX_VALUE_int,
        )
        break
      case Model.KILL_COUNT:
        this.killCount = Tools.sumValue(
          this.killCount,
          value,
          0,
          Tools.MAX_VALUE_int,
        )
        break
      case Model.PK_WIN_COUNT:
        this.Pkwincount = Tools.sumValue(
          this.Pkwincount,
          value,
          0,
          Tools.MAX_VALUE_int,
        )
        break
      case Model.PK_LOSE_COUNT:
        this.Pklosecount = Tools.sumValue(
          this.Pklosecount,
          value,
          0,
          Tools.MAX_VALUE_int,
        )
        break
      case Model.SPEED:
        (o = this.speed),
        (this.speed = Tools.sumValue(
          this.speed,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.speed - o)
        break
      case Model.ATK_STR:
        (o = this.atk_str),
        (this.atk_str = Tools.sumValue(
          this.atk_str,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.atk_str - o)
        break
      case Model.ATK_TIME:
        (o = this.atk_time),
        (this.atk_time = Tools.sumValue(
          this.atk_time,
          value,
          0,
          Model.MAX_HIT_TIME,
        )),
        (this.readAddValue = this.atk_time - o)
        break
      case Model.ATK_AGI:
        (o = this.atk_agi),
        (this.atk_agi = Tools.sumValue(
          this.atk_agi,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.atk_agi - o)
        break
      case Model.ATK_MAGIC:
        (o = this.atk_magic),
        (this.atk_magic = Tools.sumValue(
          this.atk_magic,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.atk_magic - o)
        break
      case Model.DEF_STR:
        (o = this.def_str),
        (this.def_str = Tools.sumValue(
          this.def_str,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.def_str - o)
        break
      case Model.DEF_AGI:
        (o = this.def_agi),
        (this.def_agi = Tools.sumValue(
          this.def_agi,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.def_agi - o)
        break
      case Model.DEF_MAGIC:
        (o = this.def_magic),
        (this.def_magic = Tools.sumValue(
          this.def_magic,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.def_magic - o)
        break
      case Model.ARGO:
        this.argo = Tools.sumValue(this.argo, value, -1e5, 1e5)
        break
      case Model.CRITICAL:
        (o = this.critical),
        (this.critical = Tools.sumValue(
          this.critical,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.critical - o)
        break
      case Model.HIT_MAGIC:
        (o = this.hitMagic),
        (this.hitMagic = Tools.sumValue(
          this.hitMagic,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.hitMagic - o)
        break
      case Model.HIT_RATE:
        (o = this.hitrate),
        (this.hitrate = Tools.sumValue(
          this.hitrate,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.hitrate - o)
        break
      case Model.FORCE_HIT:
        (o = this.forceHit),
        (this.forceHit = Tools.sumValue(
          this.forceHit,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.forceHit - o)
        break
      case Model.DODGE:
        (o = this.dodge),
        (this.dodge = Tools.sumValue(
          this.dodge,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.dodge - o)
        break
      case Model.WIL:
        (o = this.wil),
        (this.wil = Tools.sumValue(
          this.wil,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.wil - o)
        break
      case Model.TOUGH:
        (o = this.tough),
        (this.tough = Tools.sumValue(
          this.tough,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.tough - o)
        break
      case Model.BRK_ARMOR:
        (o = this.brkArmor),
        (this.brkArmor = Tools.sumValue(
          this.brkArmor,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.brkArmor - o)
        break
      case Model.MAGIC_PENETRATION:
        (o = this.magic_penetration),
        (this.magic_penetration = Tools.sumValue(
          this.magic_penetration,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.magic_penetration - o)
        break
      case Model.BLOCK:
        (o = this.block),
        (this.block = Tools.sumValue(
          this.block,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.block - o)
        break
      case Model.DEF_FIELD:
        (o = this.def_field),
        (this.def_field = Tools.sumValue(
          this.def_field,
          value,
          Model.MIN_DEF_FIELD,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.def_field - o)
        break
      case Model.INSIGHT:
        (o = this.insight),
        (this.insight = Tools.sumValue(
          this.insight,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.insight - o)
        break
      case Model.BACK:
        (o = this.back),
        (this.back = Tools.sumValue(
          this.back,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.back - o)
        break
      case Model.MAGIC_BACK:
        (o = this.magic_back),
        (this.magic_back = Tools.sumValue(
          this.magic_back,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.magic_back - o)
        break
      case Model.LIFE_ABSORPTION:
        (o = this.life_absorption),
        (this.life_absorption = Tools.sumValue(
          this.life_absorption,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.life_absorption - o)
        break
      case Model.MANA_ABSORPTION:
        (o = this.mana_absorption),
        (this.mana_absorption = Tools.sumValue(
          this.mana_absorption,
          value,
          0,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.mana_absorption - o)
        break
      case Model.HEAL_RECOVERY:
        (o = this.heal_recovery),
        (this.heal_recovery = Tools.sumValue(
          this.heal_recovery,
          value,
          Model.MIN_HEAL_RECOVERY,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.heal_recovery - o)
        break
      case Model.MANA_RECOVERY:
        (o = this.mana_recovery),
        (this.mana_recovery = Tools.sumValue(
          this.mana_recovery,
          value,
          Model.MIN_MANA_RECOVERY,
          Model.MAX_OTHER_ATTRIBUTE,
        )),
        (this.readAddValue = this.mana_recovery - o)
        break
      case Model.KEEPOUT_ATK_TIME:
        (o = this.keepout_atk_time),
        (this.keepout_atk_time = Tools.sumValue(
          this.keepout_atk_time,
          value,
          0,
          Model.MAX_KEEPOUT_ATK_TIME,
        )),
        (this.readAddValue = this.keepout_atk_time - o)
        break
      case Model.WEAPON_DAMAGE_PERCENT:
        (o = this.weapon_damage_percent),
        (this.weapon_damage_percent = Tools.sumValue(
          this.weapon_damage_percent,
          value,
          -1e4,
          1e4,
        )),
        (this.readAddValue = this.weapon_damage_percent - o)
        break
      default:
        super.addValue.call(this, type, value)
    }
  }

  getLeaveTime() {
    const t = this.getTimes() - Date.now()
    if (t <= 0)
      return ''

    let e = t / Tools.MILLIS_IN_MINUTE
    if (t % Tools.MILLIS_IN_MINUTE > 0)
      e += 1

    e = Math.floor(e)

    if (e < Tools.MINUTE_IN_HOUR)
      return `${Math.floor(e / Tools.MINUTE_IN_HOUR)} 分钟`

    const days = Math.floor(e / Tools.MINUTE_IN_DAY)
    const hours = Math.floor(e / Tools.MINUTE_IN_HOUR)
    const minute = e % Tools.MINUTE_IN_HOUR
    if (days > 0)
      return `${days} 天 ${hours % (days * 24)} 小时`

    return `${hours} 小时 ${minute} 分钟`
  }

  resumeHPMP() {
    this.hp = this.get(Model.HPMAX)
    this.mp = this.get(Model.MPMAX)
  }

  getMissionById(id: number) {
    return this.missionList.find(m => m.id === id)
  }

  setBattleStatus(t: number) {
    this.bStatus |= t
    return true
  }

  clearBattleStatus(t: number) {
    this.bStatus &= ~t
  }

  isBattleStatus(t: number) {
    return (this.bStatus & t) !== 0
  }

  isDead() {
    return this.hp <= 0
  }

  isDeadDelay() {
    const t = this.isBattleStatus(
      Define.getBufferBitValue(Define.BUFFER_RESIST_DIE_DELAY),
    )
    return t && !this.isTabStatus(Model.BUFFER_DIE_DELAY_CHECK)
  }

  isDeadNoWithDelay() {
    return this.isDead() && !this.isDeadDelay()
  }

  addBuffer(buffer: PlayerBuffer) {
    if (buffer != null) {
      if (buffer.isClearStatusBitBuffer()) {
        this.battleBufferList.unshift(buffer)
      }
      else {
        const e = this.setBattleStatus(Define.getBufferBitValue(buffer.getStatus()))
        !e ? buffer.clearStatus() : this.checkBufferSize(buffer)
        this.battleBufferList.push(buffer)
        e && this.setBattleStatus(Define.getBufferBitValue(buffer.getStatus()))
      }
    }
  }

  checkBufferSize(buffer: PlayerBuffer) {
    if (buffer.getStatus() !== Define.BUFFER_NONE) {
      let e = 0
      let n = Define.BUFFER_NONE

      for (let i = this.battleBufferList.length - 1; i >= 0; i--) {
        const o = this.battleBufferList[i]
        if (o && o.getStatus() !== Define.BUFFER_NONE) {
          if (buffer.isDieStatus() && o.isDieStatus()) {
            this.clearBattleStatus(Define.getBufferBitValue(o.getStatus()))
            o.destroy(this)
            const a = this.battleBufferList.indexOf(o)
            this.battleBufferList.splice(a, 1)
          }
          else if (
            Define.getBufferType(o.getStatus())
            === Define.getBufferType(buffer.getStatus())
            && ++e >= PlayerBuffer.MAX_SIZE
          ) {
            n = o.getStatus()
            o.destroy(this)
            const a = this.battleBufferList.indexOf(o)
            this.battleBufferList.splice(a, 1)
            break
          }
        }
      }
      if (n !== Define.BUFFER_NONE) {
        for (let i = 0; i < this.battleBufferList.length; i++) {
          const o = this.battleBufferList[i]
          if (o && o.getStatus() === n)
            return
        }
        this.clearBattleStatus(Define.getBufferBitValue(n))
      }
    }
  }

  clearBufferList(flag = false) {
    for (let e = this.battleBufferList.length - 1; e >= 0; e--) {
      const n = this.battleBufferList[e]
      if (n != null && (flag || !n.isCannotReliveStatus())) {
        n.destroy(this)
        const i = this.battleBufferList.indexOf(n)
        this.battleBufferList.splice(i, 1)
        this.clearBattleStatus(Define.getBufferBitValue(n.getStatus()))
      }
    }
    this.battleBufferList.length <= 0 && (this.battleBufferList = [])
  }

  isHaveCanNotReliveBuffer() {
    if (this.battleBufferList == null)
      return false
    for (let t = this.battleBufferList.length - 1; t >= 0; t--) {
      const e = this.battleBufferList[t]
      if (e != null && e.isCannotReliveStatus())
        return true
    }
    return false
  }

  removeBufferByStatus(value: number) {
    if (this.battleBufferList != null) {
      for (let e = this.battleBufferList.length - 1; e >= 0; e--) {
        const n = this.battleBufferList[e]
        if (n != null) {
          const i = n.isSameStatusType(value)
          if (i) {
            n.destroy(this)
            const o = this.battleBufferList.indexOf(n)
            this.battleBufferList.splice(o, 1)
            this.clearBattleStatus(Define.getBufferBitValue(n.getStatus()))
          }
        }
      }
    }
  }

  runBufferList(flag = false) {
    const control: Control[] = []
    const n: any[] = []

    for (let i = 0; i < this.battleBufferList.length; i++) {
      const o = this.battleBufferList[i]
      if (o) {
        if (flag) {
          if ((o.run(this, control), this.battleBufferList == null))
            return control
          if (o.isClearStatusBitBuffer()) {
            for (let a = i + 1; a < this.battleBufferList.length; a++) {
              const r = this.battleBufferList[a]
              if (r && r.isSameStatusType(o.getAddValue())) {
                r.finish()
                n.push(r)
              }
            }
          }
        }
        else { o.getLastTime() <= 0 && n.push(o) }
      }
    }
    const s = n.length
    if (s <= 0)
      return control
    for (let i = 0; s > i; i++) {
      const o = n[i]
      o.destroy(this)
      const l = this.battleBufferList.indexOf(o)
      this.battleBufferList.splice(l, 1)
      this.clearBattleStatus(Define.getBufferBitValue(o.getStatus()))
    }
    for (let i = 0; i < this.battleBufferList.length; i++) {
      const o = this.battleBufferList[i]
      o && this.setBattleStatus(Define.getBufferBitValue(o.getStatus()))
    }
    return control
  }

  getPower(t = false, e = false, player?: Player) {
    if (t === false)
      t = true
    if (e === false)
      e = false
    if (!player)
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      player = this

    let i = 0.96 * player.get(Model.SPEED)
    i += 0.8 * player.get(Model.ATK_STR)
    i += 0.5 * player.get(Model.ATK_AGI)
    i += 0.5 * player.get(Model.ATK_MAGIC)
    i += 0.8 * player.get(Model.DEF_STR)
    i += 0.8 * player.get(Model.DEF_AGI)
    i += 0.6 * player.get(Model.DEF_MAGIC)
    i += 0.09 * player.get(Model.HPMAX)
    i += 0.084 * player.get(Model.MPMAX)
    i += 5 * player.get(Model.DODGE)
    i += 0.9 * player.get(Model.HIT_RATE)
    i += 4.5 * player.get(Model.HIT_MAGIC)
    i += 5 * player.get(Model.CRITICAL)
    i += 13.3 * player.get(Model.WIL)
    i += 15 * player.get(Model.TOUGH)
    i += 3.75 * player.get(Model.BLOCK)
    i += 1.3 * player.get(Model.BRK_ARMOR)
    i += 15 * player.get(Model.INSIGHT)
    i += 1.3 * player.get(Model.DEF_FIELD)
    i += 7.5 * player.get(Model.BACK)
    i += 7.5 * player.get(Model.MAGIC_BACK)
    i += 2 * player.get(Model.LIFE_ABSORPTION)
    i += 2 * player.get(Model.MANA_ABSORPTION)
    i += 1.3 * player.get(Model.MAGIC_PENETRATION)
    i += 0.5 * player.get(Model.FORCE_HIT)
    i += player.get(Model.ATK_MAX) * player.get(Model.ATK_TIME) * 0.5
    i += 200 * player.get(Model.KEEPOUT_ATK_TIME)
    i += 8 * player.get(Model.IGNORE_WIL)
    i += 12 * player.get(Model.IGNORE_TOUCH)
    i += 7.5 * player.get(Model.IGNORE_BLOCK)
    i += 12 * player.get(Model.IGNORE_BACK)
    i += 6 * player.get(Model.IGNORE_INSIGHT)
    i += 12 * player.get(Model.IGNORE_MAGIC_BACK)
    i += player.get(Model.STR)
    i += player.get(Model.CON)
    i += player.get(Model.AGI)
    i += player.get(Model.ILT)
    i += player.get(Model.WIS)
    if (t) {
      const o = player.getPet()
      o && (i += o.getPower())
    }

    if (e)
      i /= 1e4

    return Math.ceil(i)
  }

  getSkillPowerValue(type: number, time: number) {
    if (time <= 0)
      return 0
    let n = 0
    if (this.skillList === null || this.skillList.length === 0)
      return n
    for (let i: any = null, o = 0; o < this.skillList.length; o++) {
      i = this.skillList[o]
      i != null && i.type === type && (n += i.getPowerValue(time))
    }
    return n
  }

  getBagEquipPowerValue(time: number, n = false) {
    if (this.bag === null)
      return 0
    let i = this.bag.getEquipPowerValue(time)
    if (this.itemSetData) {
      let o: number
      let a: number
      let r: number
      let s: number
      let l: number

      for (let _ = 0; _ < this.itemSetData.length;) {
        o = this.itemSetData[_++]
        a = this.itemSetData[_++]
        r = this.itemSetData[_++]
        if (a === time) {
          s = Player.getItemSetID(o)
          l = Player.getItemSetNum(o)
          if (!(this.bag.getEquipItemSetNum(s) < l))
            i += r
        }
      }
    }
    if (n)
      i += this.getPowerValueByBuffer(time)

    return i
  }

  getPowerValueByBuffer(time: number) {
    let e = 0
    if (this.power === time)
      e += this.powerValue
    if (this.titlePower1 === time)
      e += this.titlePowerValue1
    this.titlePower2 === time && (e += this.titlePowerValue2)
    for (let n = 0; n < this.fightPowerList.length; n++) {
      const i = this.fightPowerList[n]
      i[0] === time && (e += i[1])
    }
    return (e += this.getCountryBuffer(time))
  }

  getCountryBuffer(type: number) {
    return (type === Define.POWER_STR_PERCENT
      || type === Define.POWER_CON_PERCENT
      || type === Define.POWER_AGI_PERCENT
      || type === Define.POWER_ILT_PERCENT
      || type === Define.POWER_WIS_PERCENT)
      ? this.countrypowerValue
      : 0
  }

  getBaseValue(t: number, str: number, str_percent: number, skill_type: number, contant: number, attr: number) {
    let r = t
    r += this.getSkillPowerValue(skill_type, str)
    let s = this.getSkillPowerValue(skill_type, str_percent)
    return (
      (s += this.getBagEquipPowerValue(str_percent)),
      (r += this.getPowerValueByBuffer(str)),
      (s += this.getPowerValueByBuffer(str_percent)),
      this.formationSkill
      && ((r += this.formationSkill.getPowerValue(str)),
      (s += this.formationSkill.getPowerValue(str_percent))),
      this.playerTurnMonster != null
      && ((r += this.playerTurnMonster.getPowerValue(str)),
      (s += this.playerTurnMonster.getPowerValue(str_percent))),
      (r += Math.floor((r * s) / 100)),
      (r += this.getBagEquipPowerValue(str)),
      (r = Tools.sumValue(r, 0, contant, attr))
    )
  }

  getEquipWeaponType() {
    if (this.bag == null)
      return Define.BACK_ERROR_NULL_HAND
    for (
      let t = [PlayerBag.WEAPON_LEFT_POS, PlayerBag.WEAPON_RIGHT_POS], e = 0;
      e < t.length;
      e++
    ) {
      const n = this.bag.getItem(t[e])
      if (
        n != null
        && !(n.durability <= 0)
        && n.type != Define.ITEM_TYPE_WEAPON_ONEHAND_HAND
      )
        return n.type
    }
    return Define.BACK_ERROR_NULL_HAND
  }

  getAttakAnimePos() {
    const type = this.getEquipWeaponType()
    return (type === Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
      || type === Define.ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW
      || type === Define.ITEM_TYPE_WEAPON_TWOHAND_BOW
      || type === Define.ITEM_TYPE_WEAPON_TWOHAND_STAFF
      || type === Define.ITEM_TYPE_WEAPON_BALL
      || type === Define.ITEM_TYPE_WEAPON_ONEHAND_GUN
      || type === Define.ITEM_TYPE_WEAPON_TWOHAND_GUN)
      ? Define.SKILL_POS_STAND
      : Battle.SKILL_POS_FRONT
  }

  getAttackRangeAnime() {
    const type = this.getEquipWeaponType()
    return (type === Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW
      || type === Define.ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW)
      ? 0
      : 0
  }

  getPowerValue(t: number, max_val: number, max: number, max_percent: number, skill_type: number, contant: number, player_max: number, s = false) {
    let l = t
    l += this.getSkillPowerValue(skill_type, max)
    let _ = this.getSkillPowerValue(skill_type, max_percent)
    return (
      (l += this.getPowerValueByBuffer(max)),
      (_ += this.getPowerValueByBuffer(max_percent)),
      this.bag
      && ((l += this.getBagEquipPowerValue(max)),
      (_ += this.getBagEquipPowerValue(max_percent))),
      this.formationSkill
      && ((l += this.formationSkill.getPowerValue(max)),
      (_ += this.formationSkill.getPowerValue(max_percent))),
      this.playerTurnMonster != null
      && ((l += this.playerTurnMonster.getPowerValue(max)),
      (_ += this.playerTurnMonster.getPowerValue(max_percent))),
      s
      && this.getEquipWeaponType() == Define.BACK_ERROR_NULL_HAND
      && (this.bag
        && (_ += this.getBagEquipPowerValue(Define.POWER_HAND_PERCENT)),
      (_ += this.getSkillPowerValue(
        Define.SKILL_TYPE_PASSIVE,
        Define.POWER_HAND_PERCENT,
      ))),
      (l += ((l * _) / 100) >> 0),
      (l = Tools.sumValue(l, max_val, contant, player_max))
    )
  }

  get(type: number): number {
    let n = 0
    switch (type) {
      case Model.INTEGRAL:
        return this.integral
      case Model.EXP:
        return this.exp
      case Model.EXP2:
        return this.exp2
      case Model.EXPMAX:
        return this.expMax
      case Model.EXPMAX2:
        return this.expMax2
      case Model.HP:
        return this.hp
      case Model.MP:
        return Math.floor(this.mp)
      case Model.CP:
        return this.cp
      case Model.SP:
        return this.sp
      case Model.STR:
        return (
          (n = this.str),
          (n = this.getBaseValue(
            n,
            Define.POWER_STR,
            Define.POWER_STR_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.CON:
        return (
          (n = this.con),
          (n = this.getBaseValue(
            n,
            Define.POWER_CON,
            Define.POWER_CON_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.AGI:
        return (
          (n = this.agi),
          (n = this.getBaseValue(
            n,
            Define.POWER_AGI,
            Define.POWER_AGI_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.ILT:
        return (
          (n = this.ilt),
          (n = this.getBaseValue(
            n,
            Define.POWER_ILT,
            Define.POWER_ILT_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.WIS:
        return (
          (n = this.wis),
          (n = this.getBaseValue(
            n,
            Define.POWER_WIS,
            Define.POWER_WIS_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_BASE_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.MONEY1:
        return this.money1
      case Model.MONEY2:
        return this.money2
      case Model.MONEY3:
        return this.money3
      case Model.NUM_STROE:
        return this.numStroe
      case Model.COUNTRY_HONOR:
        return this.countryHonor
      case Model.CITY_ID:
        return this.cityId
      case Model.KILL_COUNT:
        return this.killCount
      case Model.PK_WIN_COUNT:
        return this.Pkwincount
      case Model.PK_LOSE_COUNT:
        return this.Pklosecount
      case Model.TOTAL_ONLINE:
        return this.totalOnline
      case Model.PARTNER_ID:
        return this.partnerId
      case Model.HPMAX:
      {
        const i = this.get(Model.LEVEL) + this.get(Model.LEVEL2)
        return (
          (n
              = Math.floor((65 * this.get(Model.CON)) / 10)
              + 3 * this.get(Model.STR)
              + 100
              + 40 * (i - 1)),
          (n = this.getPowerValue(
            n,
            this.hpMax,
            Define.POWER_HPMAX,
            Define.POWER_HPMAX_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            1,
            Model.MAX_PLAYER_HP,
          )),
          Math.floor(n)
        )
      }
      case Model.MPMAX:
      {
        const o = this.get(Model.LEVEL) + this.get(Model.LEVEL2)
        return (
          (n
              = Math.floor((75 * this.get(Model.ILT)) / 10)
              + Math.floor((35 * this.get(Model.WIS)) / 10)
              + 50
              + 10 * (o - 1)),
          (n = this.getPowerValue(
            n,
            this.mpMax,
            Define.POWER_MPMAX,
            Define.POWER_MPMAX_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            1,
            Model.MAX_PLAYER_MP,
          )),
          Math.floor(n)
        )
      }
      case Model.SPEED:
        return (
          (n
            = 3 * this.get(Model.AGI)
            + Math.floor((15 * this.get(Model.WIS)) / 10)),
          (n = this.getPowerValue(
            n,
            this.speed,
            Define.POWER_SPEED,
            Define.POWER_SPEED_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.ATK_TYPE:
        return this.bag == null
          ? Define.ATKTYPE_STR
          : this.bag.getAttribute(8)
      case Model.LEFT_WEAPON_TYPE:
        return this.bag == null
          ? -1
          : this.bag.getAttributeByPos(9, PlayerBag.WEAPON_LEFT_POS)
      case Model.RIGHT_WEAPON_TYPE:
        return this.bag == null
          ? -1
          : this.bag.getAttributeByPos(9, PlayerBag.WEAPON_RIGHT_POS)
      case Model.LEFT_ATK_MIN:
        return (
          this.bag
          && ((n = this.bag.getAttributeByPos(5, PlayerBag.WEAPON_LEFT_POS)),
          n < 0 && (n = 0),
          (n = this.addWeaponSkillDamageOrDur(
            n,
            PlayerBag.WEAPON_LEFT_POS,
          ))),
          Tools.sumValue(n, 0, 0, Model.MAX_ATK)
        )
      case Model.RIGHT_ATK_MIN:
        return (
          this.bag
          && ((n = this.bag.getAttributeByPos(5, PlayerBag.WEAPON_RIGHT_POS)),
          n < 0 && (n = 0),
          (n = this.addWeaponSkillDamageOrDur(
            n,
            PlayerBag.WEAPON_RIGHT_POS,
          ))),
          Tools.sumValue(n, 0, 0, Model.MAX_ATK)
        )
      case Model.ATK_MIN:
      {
        const a = this.get(Model.LEFT_ATK_MIN)
        const r = this.get(Model.RIGHT_ATK_MIN)
        n = a
        r > n && (n = r)
        return Math.floor(n)
      }
      case Model.LEFT_ATK_MAX:
        return (
          this.bag
          && ((n = this.bag.getAttributeByPos(6, PlayerBag.WEAPON_LEFT_POS)),
          n < 0 && (n = 0),
          (n = this.addWeaponSkillDamageOrDur(
            n,
            PlayerBag.WEAPON_LEFT_POS,
          ))),
          Tools.sumValue(n, 0, 0, Model.MAX_ATK)
        )
      case Model.RIGHT_ATK_MAX:
        return (
          this.bag
          && ((n = this.bag.getAttributeByPos(6, PlayerBag.WEAPON_RIGHT_POS)),
          n < 0 && (n = 0),
          (n = this.addWeaponSkillDamageOrDur(
            n,
            PlayerBag.WEAPON_RIGHT_POS,
          ))),
          Tools.sumValue(n, 0, 0, Model.MAX_ATK)
        )
      case Model.ATK_MAX:
      { const s = this.get(Model.LEFT_ATK_MAX)
        const l = this.get(Model.RIGHT_ATK_MAX)
        n = s
        l > n && (n = l)
        return Math.floor(n)
      }
      case Model.LEFT_ATK_TIME:
        return this.bag
          && ((n = this.bag.getAttributeByPos(7, PlayerBag.WEAPON_LEFT_POS)),
          n < 0)
          ? 0
          : Tools.sumValue(
            n + 1,
            0,
            Model.MIN_HIT_TIME,
            Model.MAX_HIT_TIME,
          )
      case Model.RIGHT_ATK_TIME:
        return this.bag
          && ((n = this.bag.getAttributeByPos(7, PlayerBag.WEAPON_RIGHT_POS)),
          n < 0)
          ? 0
          : Tools.sumValue(
            n + 1,
            0,
            Model.MIN_HIT_TIME,
            Model.MAX_HIT_TIME,
          )
      case Model.ATK_TIME:
        var _ = this.getEquipWeaponType()
        return (
          _ == Define.BACK_ERROR_NULL_HAND
            ? ((n = 1),
              (n += this.getSkillPowerValue(
                Define.SKILL_TYPE_PASSIVE,
                Define.POWER_HAND_ATK_TIME,
              )),
              (n += this.getBagEquipPowerValue(
                Define.POWER_HAND_ATK_TIME,
                true,
              )))
            : (n
              = this.get(Model.LEFT_ATK_TIME)
              + this.get(Model.RIGHT_ATK_TIME)),
          (n = this.addWeaponSkillAtkTime(n, _)),
          Tools.sumValue(
            n,
            this.atk_time,
            Model.MIN_HIT_TIME,
            Model.MAX_HIT_TIME,
          )
        )
      case Model.ATK_STR:
        return (
          (n = 3 * this.get(Model.AGI) + 5 * this.get(Model.STR)),
          (n = this.getPowerValue(
            n,
            this.atk_str,
            Define.POWER_ATK_STR,
            Define.POWER_ATK_STR_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
            true,
          )),
          Math.floor(n)
        )
      case Model.ATK_AGI:
        return (
          (n = 5 * this.get(Model.STR) + 5 * this.get(Model.AGI)),
          (n = this.getPowerValue(
            n,
            this.atk_agi,
            Define.POWER_ATK_AGI,
            Define.POWER_ATK_AGI_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
            true,
          )),
          Math.floor(n)
        )
      case Model.ATK_MAGIC:
        var h
          = (3 * this.get(Model.ILT) + 2 * this.get(Model.WIS))
          * (this.get(Model.HIT_MAGIC) + 900)
        return (
          (h = GZIP.toInteger(h)),
          (n = (h / 1e3) >> 0),
          (n = this.getPowerValue(
            n,
            this.atk_magic,
            Define.POWER_ATK_MAGIC,
            Define.POWER_ATK_MAGIC_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.DEF_STR:
        return (
          (n = 8 * this.get(Model.CON)),
          this.bag && (n += this.bag.getAttribute(1)),
          (n = this.getPowerValue(
            n,
            this.def_str,
            Define.POWER_DEF_STR,
            Define.POWER_DEF_STR_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_DEF,
          )),
          Math.floor(n)
        )
      case Model.DEF_AGI:
        return (
          (n = 8 * this.get(Model.CON)),
          this.bag && (n += this.bag.getAttribute(2)),
          (n = this.getPowerValue(
            n,
            this.def_agi,
            Define.POWER_DEF_AGI,
            Define.POWER_DEF_AGI_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_DEF,
          )),
          Math.floor(n)
        )
      case Model.DEF_MAGIC:
        return (
          (n = 2 * (2 * this.get(Model.WIS) + this.get(Model.ILT))),
          this.bag && (n += this.bag.getAttribute(3)),
          (n = this.getPowerValue(
            n,
            this.def_magic,
            Define.POWER_DEF_MAGIC,
            Define.POWER_DEF_MAGIC_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_DEF,
          )),
          Math.floor(n)
        )
      case Model.DODGE:
        return (
          (n
            = (10 * (this.get(Model.AGI) + this.get(Model.WIS)))
            / 25),
          (n = this.getPowerValue(
            n,
            this.dodge,
            Define.POWER_DODGE,
            Define.POWER_DODGE_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.HIT_RATE:
        if (this.bag) {
          (n = this.bag.getAttributeByPos(4, PlayerBag.WEAPON_LEFT_POS)),
          n < 0 && (n = 0)
          const u = this.bag.getAttributeByPos(4, PlayerBag.WEAPON_RIGHT_POS)
          u > 0 && (n > 0 ? n > u && (n = u) : (n = u)),
          (n += this.get(Model.AGI) / 5)
        }
        return (
          (n = this.getPowerValue(
            n,
            this.hitrate,
            Define.POWER_HITRATE,
            Define.POWER_HITRATE_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.HIT_MAGIC:
        return (
          (n = 100),
          (n = this.getPowerValue(
            n,
            this.hitMagic,
            Define.POWER_MAGIC_HITRATE,
            Define.POWER_MAGIC_HITRATE_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            Model.MIN_HIT_MAGIC,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.CRITICAL:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.critical,
            Define.POWER_CRITICAL,
            Define.POWER_CRITICAL_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.FORCE_HIT:
        return (
          (n = Model.MIN_FORCE_HITRATE),
          (n = this.getPowerValue(
            n,
            this.forceHit,
            Define.POWER_HIT_FORCE,
            Define.POWER_HIT_FORCE_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.EXP_UP:
        return this.exp_up
      case Model.WIL:
        return (
          (n
            = (3 * this.get(Model.WIS) + this.get(Model.ILT)) / 10),
          (n = this.getPowerValue(
            n,
            this.wil,
            Define.POWER_WIL,
            Define.POWER_WIL_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.TOUGH:
        return (
          (n
            = (2 * this.get(Model.CON) + this.get(Model.STR)) / 10),
          (n = this.getPowerValue(
            n,
            this.tough,
            Define.POWER_TOUGH,
            Define.POWER_TOUGH_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.BLOCK:
        return (
          (n = this.get(Model.AGI) / 5),
          (n = this.getPowerValue(
            n,
            this.block,
            Define.POWER_BLOCK,
            Define.POWER_BLOCK_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.BRK_ARMOR:
        return (
          (n = this.get(Model.AGI) + 3 * this.get(Model.STR)),
          (n = this.getPowerValue(
            n,
            this.brkArmor,
            Define.POWER_PENETRATION,
            Define.POWER_PENETRATION_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.MAGIC_PENETRATION:
        return (
          (n = this.get(Model.WIS) + 2 * this.get(Model.ILT)),
          (n = this.getPowerValue(
            n,
            this.magic_penetration,
            Define.POWER_MAGIC_PENETRATION,
            Define.POWER_MAGIC_PENETRATION_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.INSIGHT:
        return (
          (n
            = (2 * this.get(Model.WIS) + this.get(Model.ILT)) / 10),
          (n = this.getPowerValue(
            n,
            this.insight,
            Define.POWER_INSIGHT,
            Define.POWER_INSIGHT_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.DEF_FIELD:
        return (
          (n = 2 * this.get(Model.ILT) + 3 * this.get(Model.WIS)),
          (n = this.getPowerValue(
            n,
            this.def_field,
            Define.POWER_DEF_FIELD,
            Define.POWER_DEF_FIELD_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.BACK:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.back,
            Define.POWER_BACK,
            Define.POWER_BACK_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.MAGIC_BACK:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.magic_back,
            Define.POWER_MAGIC_BACK,
            Define.POWER_MAGIC_BACK_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.LIFE_ABSORPTION:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.life_absorption,
            Define.POWER_LIFE_ABSORPTION,
            Define.POWER_LIFE_ABSORPTION_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_PROBABILITY,
          )),
          Math.floor(n)
        )
      case Model.MANA_ABSORPTION:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.mana_absorption,
            Define.POWER_MANA_ABSORPTION,
            Define.POWER_MANA_ABSORPTION_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_PROBABILITY,
          )),
          Math.floor(n)
        )
      case Model.HEAL_RECOVERY:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.heal_recovery,
            Define.POWER_HEAL_RECOVERY,
            Define.POWER_HEAL_RECOVERY_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.MANA_RECOVERY:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.mana_recovery,
            Define.POWER_MANA_RECOVERY,
            Define.POWER_MANA_RECOVERY_PERCENT,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.IGNORE_BACK:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            0,
            Define.POWER_IGNORE_BACK,
            0,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.IGNORE_MAGIC_BACK:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            0,
            Define.POWER_IGNORE_MAGIC_BACK,
            0,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.IGNORE_BLOCK:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            0,
            Define.POWER_IGNORE_BLOCK,
            0,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.IGNORE_INSIGHT:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            0,
            Define.POWER_IGNORE_INSIGHT,
            0,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.IGNORE_WIL:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            0,
            Define.POWER_IGNORE_WIL,
            0,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.IGNORE_TOUCH:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            0,
            Define.POWER_IGNORE_TOUCH,
            0,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_OTHER_ATTRIBUTE,
          )),
          Math.floor(n)
        )
      case Model.KEEPOUT_ATK_TIME:
        return (
          (n = 0),
          (n = this.getPowerValue(
            n,
            this.keepout_atk_time,
            Define.POWER_KEEPOUT_ATK_TIME,
            0,
            Define.SKILL_TYPE_PASSIVE,
            0,
            Model.MAX_KEEPOUT_ATK_TIME,
          )),
          Math.floor(n)
        )
      case Model.RECOVERY:
        return this.recovery
      case Model.ARGO:
        return this.argo
      case Model.BACK_MAX:
        return 70
      default:
        return super.get.call(this, type)
    }
  }

  addWeaponSkillDamageOrDur(t, e) {
    if (t == 0)
      return 0
    let n: any = null
    if ((this.bag && (n = this.bag.getItem(e)), n == null))
      return t
    let i = 0
    switch (n.type) {
      case Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_SWORD:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_SWORD_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_SWORD_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_BLADE:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_BLADE:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_BLADE_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_BLADE_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_HEAVY:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_HEAVY:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_HEAVY_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_HEAVY_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_TWOHAND_STAFF:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_STAFF_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_STAFF_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_BALL:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_BALL_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_BALL_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_TWOHAND_LANCE:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_LANCE_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_LANCE_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_BOW:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_BOW_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_BOW_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_HAND:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_HAND_ITEM_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_HAND_ITEM_PERCENT))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_GUN:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_GUN:
        (i = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_GUN_PERCENT,
        )),
        (i += this.getBagEquipPowerValue(Define.POWER_GUN_PERCENT))
        break
      default:
        i = 0
    }
    return (
      (i += this.getSkillPowerValue(
        Define.SKILL_TYPE_PASSIVE,
        Define.POWER_ALL_PERCENT,
      )),
      (i += this.getBagEquipPowerValue(Define.POWER_ALL_PERCENT)),
      (i += this.weapon_damage_percent),
      i == 0 ? t : t + Math.floor((t * i) / 100)
    )
  }

  addWeaponSkillAtkTime(t, e) {
    let n = 0
    switch (e) {
      case Define.ITEM_TYPE_WEAPON_ONEHAND_SWORD:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_SWORD:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_SWORD_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_SWORD_ATK_TIME, true))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_BLADE:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_BLADE:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_BLADE_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_BLADE_ATK_TIME, true))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_HEAVY:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_HEAVY:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_HEAVY_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_HEAVY_ATK_TIME, true))
        break
      case Define.ITEM_TYPE_WEAPON_TWOHAND_STAFF:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_STAFF_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_STAFF_ATK_TIME, true))
        break
      case Define.ITEM_TYPE_WEAPON_BALL:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_BALL_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_BALL_ATK_TIME, true))
        break
      case Define.ITEM_TYPE_WEAPON_TWOHAND_LANCE:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_LANCE_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_LANCE_ATK_TIME, true))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_CROSSBOW:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_CROSSBOW:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_BOW:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_BOW_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_BOW_ATK_TIME, true))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_HAND:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_HAND_ITEM_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(
          Define.POWER_HAND_ITEM_ATK_TIME,
          true,
        ))
        break
      case Define.ITEM_TYPE_WEAPON_ONEHAND_GUN:
      case Define.ITEM_TYPE_WEAPON_TWOHAND_GUN:
        (n = this.getSkillPowerValue(
          Define.SKILL_TYPE_PASSIVE,
          Define.POWER_GUN_ATK_TIME,
        )),
        (n += this.getBagEquipPowerValue(Define.POWER_GUN_ATK_TIME, true))
        break
      default:
        n = 0
    }
    return (
      (n += this.getSkillPowerValue(
        Define.SKILL_TYPE_PASSIVE,
        Define.POWER_ALL_ATK_TIME,
      )),
      (n += this.getBagEquipPowerValue(Define.POWER_ALL_ATK_TIME, true)),
      t + n
    )
  }

  getAutoSkillCount() {
    for (var t = 0, e = 0; e < this.autoSkillID.length; e++)
      this.autoSkillID[e] > 0 && t++
    return t
  }

  isAutoSkill(t) {
    for (let e = 0; e < this.autoSkillID.length; e++) {
      const n = this.autoSkillID[e]
      if (n == t)
        return e
    }
    return -1
  }

  checkHPMP() {
    const t = this.get(Model.HPMAX)
    this.hp > t && (this.hp = t)
    const e = this.get(Model.MPMAX)
    this.mp > e && (this.mp = e)
  }

  setAutoSkillInvalid(t) {
    if (this.autoSkillID == null)
      return -2
    for (var e = -1, n = false, i = 0; i < this.autoSkillID.length; i++) {
      const o = this.autoSkillID[i]
      o == t && ((n = true), (e = i), (this.autoSkillID[i] = 0)),
      n == true
        && (i < this.autoSkillID.length - 1
          ? (this.autoSkillID[i] = this.autoSkillID[i + 1])
          : (this.autoSkillID[i] = 0))
    }
    return e
  }

  setAutoSkillActive(t) {
    if (this.autoSkillID == null)
      return -2
    for (let e = 0; e < this.autoSkillID.length; e++) {
      const n = this.autoSkillID[e]
      if (n == 0)
        return (this.autoSkillID[e] = t), e
    }
    return -1
  }

  getSkillLevelByID(t) {
    const e = this.getSkillByID(t)
    return e == null ? 0 : e.level - e.addLevel
  }

  getSkillIndexByID(t) {
    if (this.skillList == null)
      return -1
    for (let e = 0; e < this.skillList.length; e++) {
      const n = this.skillList[e]
      if (n != null && n.id == t)
        return e
    }
    return -1
  }

  getSkillByID(t) {
    if (this.skillList == null)
      return null
    for (let e = 0; e < this.skillList.length; e++) {
      const n = this.skillList[e]
      if (n != null && n.id == t)
        return n
    }
    return null
  }

  removeSkillSure(t) {
    if (t != null && !(this.skillList == null || this.skillList.length <= 0)) {
      for (let e = 0; e < this.skillList.length; e++) {
        const n = this.skillList[e]
        if (n != null && n.id == t.id) {
          return (
            this.isAutoSkill(n.id) >= 0 && this.setAutoSkillInvalid(n.id),
            void this.skillList.splice(e, 1)
          )
        }
      }
    }
  }

  removeSkill(t) {
    if (t != null && !(this.skillList == null || this.skillList.length <= 0)) {
      for (let e = 0; e < this.skillList.length; e++) {
        const n = this.skillList[e]
        if (n != null && n.id == t.id && n.level == t.level) {
          return (
            this.isAutoSkill(n.id) >= 0 && this.setAutoSkillInvalid(n.id),
            void this.skillList.splice(e, 1)
          )
        }
      }
    }
  }

  fromAutoEquipSkillData(t) {
    if (t != null) {
      const e = t.getByte()
      this.autoSkillID = new Array(e)
      for (let n = 0; e > n; n++) this.autoSkillID[n] = t.getShort()
      this.autoSkillID_Initiative = t.getShort()
    }
  }

  fromSkillData(t) {
    if (t != null) {
      for (var e = t.getByte(), n = 0; e > n; n++) {
        const i = t.getByte()
        if (i == 1) {
          const o = Skill.fromBytes(t);
          (o.addLevel = t.getByte()), this.learnSkill(o)
        }
        else if (i == 2) {
          const a = Skill.fromBytes(t);
          (a.addLevel = t.getByte()), this.learnSkill(a)
        }
        else if (i == 3) {
          const r = t.getInt()
          this.removeSkill(this.getSkillByID(r))
        }
      }
      const s = t.getByte()
      this.autoSkillID = new Array(s)
      for (var n = 0; s > n; n++) this.autoSkillID[n] = t.getShort()
      this.autoSkillID_Initiative = t.getShort()
    }
  }

  learnSkill(t) {
    if (t == null)
      return -1
    if (this.skillList == null)
      return -1
    if (this.getFreeSkillIndex(t.id) < 0)
      return -3
    if (this.skillList.length == 0)
      return this.skillList.push(t), Define.SUCCESS
    for (let e = 0; e < this.skillList.length; e++) {
      const n = this.skillList[e]
      if (n != null && n.id == t.id)
        return (this.skillList[e] = t), Define.SUCCESS
    }
    return this.skillList.push(t), Define.SUCCESS
  }

  getFreeSkillIndex(t) {
    if (this.skillList == null)
      return -1
    if (t <= 0)
      return -1
    const e = this.getSkillByID(t)
    return e != null ? Define.SUCCESS : Define.SUCCESS
  }

  fromItemSetData(t) {
    const e = t.getByte()
    this.itemSetData = []
    for (let n = 0; e > n; n++) this.itemSetData[n] = t.getShort()
  }

  doKeepAtkTime(t) {
    if (
      (this.addValue(Model.KEEPOUT_ATK_TIME, -1),
      this.battleBufferList != null)
    ) {
      for (let e = this.battleBufferList.length - 1; e >= 0; e--) {
        const n = this.battleBufferList[e]
        if (n != null && n.useKeeAtkTime())
          return
      }
    }
  }

  getAttackTypeBySkill(t) {
    return t && t != Skill.DUMMY_SKILL
      ? t.skillAtkType
      : this.get(Model.ATK_TYPE)
  }

  updateAllKillMission(t, e, n) {
    if (t != null && e != null && t.length == e.length) {
      for (let i: Mission | null = null, o = -1, a = 0; a < t.length; a++) {
        o = t[a]
        for (let r = 0; r < this.missionList.length; r++) {
          (i = this.missionList[r]),
          i != null && i.updateKillMission(o, e[a], n)
        }
      }
    }
  }

  deleteMission(t) {
    return t == null ? false : this.deleteMissionById(t.getId())
  }

  deleteMissionById(t: number) {
    if (this.missionList == null)
      return false
    for (let e = 0; e < this.missionList.length; e++) {
      const n = this.missionList[e]
      if (n != null && n.getId() == t) {
        return (
          n.cleanKillMission(),
          Mission.clearNewRadar(n),
          this.missionList.splice(e, 1),
          true
        )
      }
    }
    return false
  }
}

export namespace Player {
  export function fromPlayerBytes(byte: Protocol, player?: Player) {
    const e = player ?? new Player()

    e.setId(byte.getInt())
    e.setName(byte.getString())
    e.setInfo(byte.getString())
    e.setTitle(byte.getString())
    e.setSex(byte.getByte())
    e.setRace(byte.getByte())
    e.setJob(byte.getByte())
    e.setLevel(byte.getByte())
    e.setLevel2(byte.getByte())
    e.exp2 = byte.getInt()
    e.expMax2 = byte.getInt()
    byte.getInt()
    byte.getInt()
    byte.getInt()
    e.setSetting(byte.getInt())
    e._status = byte.getInt()
    e.setMode(byte.getByte())
    const n = byte.getInt()
    e.setCountryId(n)
    if (n >= 0) {
      e.setCountryName(byte.getString())
      e.setCountryRank(byte.getByte())
    }
    e.exp = byte.getInt()
    e.expMax = byte.getInt()
    e.hp = byte.getInt()
    e.mp = byte.getInt()
    e.cp = byte.getShort()
    e.sp = byte.getInt()
    e.str = byte.getShort()
    e.con = byte.getShort()
    e.agi = byte.getShort()
    e.ilt = byte.getShort()
    e.wis = byte.getShort()
    e.money1 = byte.getInt()
    e.money2 = byte.getInt()
    e.money3 = byte.getInt()
    e.numBag = byte.getByte()
    e.numStroe = byte.getByte()
    e.countryHonor = byte.getInt()
    e.cityId = byte.getInt()
    e.killCount = byte.getInt()
    e.Pkwincount = byte.getInt()
    e.Pklosecount = byte.getInt()
    e.masterFlag = byte.getByte()
    e.partnerId = byte.getInt()
    if (e.partnerId >= 0)
      byte.getString()

    byte.getString()
    e.lovePlayer = byte.getString()
    e.integral = byte.getInt()
    e.arenaPoint = byte.getInt()
    e.skyarenaPoint = byte.getInt()
    e.vipLevel = byte.getByte()
    e.superQqLevel = byte.getByte()
    const i = byte.getByte()
    e.autoSkillID = new Array(i)
    for (let o = 0; i > o; o++)
      e.autoSkillID[o] = byte.getShort()
    e.autoSkillID_Initiative = byte.getShort()
    const itemLength = byte.getByte()
    const itemSetData: number[] = []
    for (let o = 0; o < itemLength; o++)
      itemSetData[o] = byte.getShort()

    e.power = byte.getUnsignedByte()
    e.powerValue = byte.getShort()
    e.titlePower1 = byte.getUnsignedByte()
    e.titlePowerValue1 = byte.getShort()
    e.titlePower2 = byte.getUnsignedByte()
    e.titlePowerValue2 = byte.getShort()
    e.countrypowerValue = byte.getByte()
    e.setEnchantValue(byte.getInt())

    // const id = byte.getInt()
    // const name = byte.getString()
    // const info = byte.getString()
    // const title = byte.getString()
    // const sex = byte.getByte()
    // const race = byte.getByte()
    // const job = byte.getByte()
    // const level = byte.getByte()
    // const level2 = byte.getByte()
    // const exp2 = byte.getInt()
    // const exp2Max = byte.getInt()
    // const icon1 = byte.getInt()
    // const icon2 = byte.getInt()
    // const icon3 = byte.getInt()
    // const setting = byte.getInt()
    // const status = byte.getInt()
    // const mode = byte.getByte()
    // const countryId = byte.getInt()
    // if(countryId > 0) {
    //     const countryName = byte.getString()
    //     const countryRank = byte.getByte()
    // }

    // const exp = byte.getInt()
    // const expMax = byte.getInt()
    // const hp = byte.getInt()
    // const mp = byte.getInt()
    // const cp = byte.getShort()
    // const sp = byte.getInt()
    // const str = byte.getShort()
    // const con = byte.getShort()
    // const agi = byte.getShort()
    // const ilt = byte.getShort()
    // const wis = byte.getShort()
    // const money1 = byte.getInt()
    // const money2 = byte.getInt()
    // const money3 = byte.getInt()
    // const numBag = byte.getByte()
    // const numStroe = byte.getByte()
    // const countryHonor = byte.getInt()
    // const cityId = byte.getInt()
    // const killCount = byte.getInt()
    // const Pkwincount = byte.getInt()
    // const Pklosecount = byte.getInt()
    // const masterFlag = byte.getByte()
    // const partnerId = byte.getInt()
    // if(partnerId >= 0) {
    //     const partnerName = byte.getString()
    // }

    // const helpCountry = byte.getString()
    // const lovePlayer = byte.getString()
    // const integral = byte.getInt()
    // const arenaPoint = byte.getInt()
    // const skyarenaPoint = byte.getInt()

    // const vipLevel = byte.getByte()
    // const superQqLevel = byte.getByte()
    // const length = byte.getByte()
    // const autoSkillID = new Array(length)
    // for(let o = 0; o < length; o++) {
    //     autoSkillID[o] = byte.getShort()
    // }
    // const autoSkillID_Initiative = byte.getShort()

    // const itemLength = byte.getByte()
    // const itemSetData: number[] = []
    // for(let o = 0; o < itemLength; o++) {
    //     itemSetData[o] = byte.getShort()
    // }

    // const power = byte.getUnsignedByte()
    // const powerValue = byte.getShort()
    // const titlePower1 = byte.getUnsignedByte()
    // const titlePowerValue1 = byte.getShort()
    // const titlePower2 = byte.getUnsignedByte()
    // const titlePowerValue2 = byte.getShort()
    // const countrypowerValue = byte.getByte()

    // const enchantValue = byte.getInt()

    return e
  }

  export function getItemSetID(t) {
    return (t >> 4) & 4095
  }

  export function getItemSetNum(t) {
    return 15 & t
  }

  export const NOVICE_LEVEL = 15
  export const MAX_AUTO_SKILL_COUNT = 4
  export const okImageCurrentlyUsed = []
  export const okImagePool = []
  export const MAX_MISSION_SIZE = 10
  export const BSTATUS_ESCAPE = 1
}
