/**
 * 重新设计一个 Battle 系统, 因为游戏原来的系统耦合严重, 并且使用了很多全局变量, 直接抄起来比较困难
 */

import { Define } from './defined/defined'
import { Tool } from './shared/Tool'
import { Model } from './typings/Model'
import { Skill } from './typings/Skill'

export enum BATTLE_TYPE {
  LOCAL = 0,
  REMOTE = 2,
  PK = 4,
}

/**
 * 一个简单的 Battle 消息过程
 *
 * 1. 第一步发送 Enter Battle 消息
 *
 * const msg = Protocol.createEnterLocalBattle()
 * nato.Network.sendCmd(msg)
 *
 * 1.1 初始化位置(cursor)
 *    Left   |   Right
 *      **   |    **
 *      **   |    **
 *
 * 1.2
 *
 * 2. 构建 plan 数据(最难的一步)
 * 2.1 添加 plan
 * 2.2 执行 plan
 * 2.3 结束 Battle
 *
 *  ##
 *    0(byte): plan 类型, 主要有 5 种 NONE(0), ATTACK(1), USE_SKILL(2), USE_ITEM(3), ESCAPE(4)
 *      NONE: 什么都不做
 *      ATTACK: 普通攻击
 *      USE_SKILL: 技能
 *      USE_ITEM: 物品
 *      ESCAPE: 逃跑
 *    1(byte): 目标(cursor)
 *      NONE, ESCAPE: 无需目标
 *      ATTACK:
 *    2(short):
 *      USE_SKILL(short): 技能ID
 *
 *  ##
 *
 * 2.4 构建 plan 例子:
 *
 * let plans = []
 * const plan1 = new egret.ByteArray()
 * plan1.writeByte(1)
 * plan1.writeByte(1)
 * plans.push(plan1)
 *
 * const plan2 = new egret.ByteArray()
 * plan2.writeByte(0)
 * plans.push(plan2)
 *
 * const plan3 = new egret.ByteArray()
 * plan3.writeByte(1)
 * plan3.writeByte(4)
 * plans.push(plan3)
 *
 * const plan4 = new egret.ByteArray()
 * plan3.writeByte(0)
 * plans.push(plan4)
 *
 * 3. 组建战斗过程消息
 *
 * const msg = new Protocol(ProtocolCmd.CG_FIGHT_RUN_LOCALBATTLE);
 * msg.putInt(5260) // 人物开始时的 HP
 * msg.putInt(24161)  // 人物开始时的 MP
 * msg.putInt(xself.hp) // 人物结束时的 HP
 * msg.putInt(xself.mp) // 人物结束时的 MP
 * msg.putShort(0); // 战斗 seed
 * msg.putShort(409); // groupId
 * msg.putBoolean(true);  // 有无 pet
 * msg.putByte(2); // if pet === true (plans.length / 2)
 *
 * # 填充 plan 数据
 * for (let r = 0; r < plans.length; {
 *  let s = o[r++];
 *  msg.putBytes(s)
 *  if(pet) {
 *    let l = null;
 *    r < o.length && (l = o[r++]),
 *    t.putBytes(l)
 *  }
 * }
 *
 * 4. 发送消息
 *
 * nato.Network.sendCmd(msg)
 */

export namespace BattleConst {
  export const BATTLE_STATUS_NOTSTART = 1
  export const BATTLE_STATUS_NOTREADY = 2
  export const BATTLE_STATUS_READY = 3
  export const BATTLE_STATUS_FINISH = 4
  export const LOCAL_BATTLE_MY_POS = 25
  export const LOCAL = 0
  export const REMOTE = 2
  export const PK = 4
  export const ESCAPE_SUCCESS = 1
  export const ESCAPE_FAILED = 0
  export const LEFT_MAX_POS = 20
  export const RIGHT_MAX_POS = 14
  export const MAX_POS = BattleConst.LEFT_MAX_POS + BattleConst.RIGHT_MAX_POS
  export const MAX_ROUND = 30
  export const NUM_COLUMN_1 = BattleConst.LEFT_MAX_POS / 2
  export const NUM_COLUMN_2 = BattleConst.NUM_COLUMN_1
  export const NUM_COLUMN_3 = BattleConst.RIGHT_MAX_POS / 2
  export const NUM_COLUMN_4 = BattleConst.NUM_COLUMN_3
  export const LEFT_SIDE = 1
  export const RIGHT_SIDE = 2
  export const MAX_ROW_NUM = 10
  export const FIRST_ROUND_PLAN_TIME = 6e4
  export const NORMAL_ROUND_PLAN_TIME = 4e4
  export const POSITION_COLUMN_1 = 1
  export const POSITION_COLUMN_2 = 2
  export const POSITION_COLUMN_3 = 3
  export const POSITION_COLUMN_4 = 4
  export const ESCAPE_RATE_HIGH = 95
  export const ESCAPE_RATE_MID = 75
  export const ESCAPE_RATE_LOW = 40
  export const MAX_SHOW_HIT = 5
  export const MAX_SHOW_HIT_2 = 10
  export const PLAN_NONE = 0
  export const PLAN_ATTACK = 1
  export const PLAN_USE_SKILL = 2
  export const PLAN_USE_ITEM = 3
  export const PLAN_ESCAPE = 4
  export const TAG_ALL_END = 1
  export const TAG_PLAYER_PLAN_END = 2
  export const TAG_MAP_INIT = 4
  export const TAG_REMOTE_SEND = 8
  export const TAG_HAVE_MY_PET = 16
  export const TAG_PET_ORDER = 32
  export const TAG_REMOTE_SEND_WAITING = 64
  export const TAG_IS_ORDER_POP = 128
  export const TAG_IS_WORKER_START = 256
  export const TAG_IS_GUIDE_ATTACK_MENU = 512
  export const TAG_IS_GUIDE_ATTACK_TARGET = 1024
  export const TAG_IS_BATTLE_SEE = 2048
  export const TAG_IS_AUTO_FIGHT = 4096
  export const TAG_WAITING_NEXT_BATTLE = 8192
  export const TAG_IS_GUIDE_ATTACK_AUTO = 16384
  export const TAG_IS_GUIDE_OPEN_SKILL = 32768
  export const TAG_IS_GUIDE_SELECT_SKILL = 65536
  export const TAG_IS_GUIDE_USE_SKILL = 1 << 17
  export const TAG_IS_GUIDE_PET_AUTO = 1 << 18
  export const TAG_IS_SKIP_BATTLE = 1 << 19
  export const TAG_IS_GUIDE_SKIP_ROUND = 1 << 20
  export const TAG_IS_GUIDE_SKIP_BATTLE = 1 << 21
  export const ANIME_TYPE_PHYSIC = 0
  export const ANIME_TYPE_MAGIC = 1
  export const ANIME_TYPE_USE_ITEM = 2
  export const ANIME_TYPE_BACKUP = 3
  export const SKILL_POS_STAND = 0
  export const SKILL_POS_FRONT = 1
  export const SKILL_POS_CENTER = 2
  export const EFFECT_BLOCK = 1
  export const EFFECT_HIT = 2
  export const EFFECT_CRITICAL = 4
  export const EFFECT_DIE = 8
  export const EFFECT_REBORN = 16
  export const EFFECT_STUN = 32
  export const EFFECT_MP_CHANGE = 64
  export const EFFECT_DEF_FIELD = 128
  export const EFFECT_TOUCH = 256
  export const EFFECT_DIE_DELAY = 512
  export const EFFECT_HAS_ANIME = 1024
  export const EFFECT_BYTE_VALUE = 2048
  export const EFFECT_SHORT_VALUE = 4096
  export const EFFECT_INT_VALUE = 8192
  export const EFFECT_KEEPOUT = 16384
  export const BATTLE_DMG_MIN = 95
  export const BATTLE_DMG_MAX = 105
  export const BATTLE_RD_MAX = 75
  export const BATTLE_STR_HITRATE = 1
  export const BATTLE_AGI_HITRATE = 2
  export const BATTLE_MAGIC_HITRATE = 3
  export const BATTLE_DMG_STR = 5
  export const BATTLE_DMG_AGI = 6
  export const BATTLE_DMG_MAGIC = 7
  export const BATTLE_RD_STR = 8
  export const BATTLE_RD_AGI = 9
  export const BATTLE_RD_MAGIC = 10
  export const BATTLE_AP_STR = 11
  export const BATTLE_AP_AGI = 12
  export const BATTLE_AP_MAGIC = 13
  export const BATTLE_CRI_RATE = 14
  export const BATTLE_RAND_ATC = 20
  export const BATTLE_BLOCK = 21
  export const BATTLE_INSIGHT = 22
  export const BATTLE_BACK = 23
  export const BATTLE_MAGIC_BACK = 24
  export const BATTLE_DAMAGE = 30
  export const BATTLE_HITRATE = 31
  export const MAX_RATE_WIL = 700
  export const MAX_RATE_TOUCH = 700
  export const MAX_RATE_HPMP_GET = 1e3
  export const MAX_BLOCK_TOUCH = 70
  export const BLOCK_HIT_REDUCE = 10
  export const MAX_INSIGHT_TOUCH = 100
}

export class Battle {
  /** LOCAL, REMOTE, PK */
  private readonly type: number
  private readonly seed: number
  private round = 0
  private totalHitTime = 0
  /**
   * 左边怪物最多 20 个
   * 右边队伍 5 * 2(宠物) 个 + 4 个任务队友
   */
  private readonly model_position: Model[] = new Array(34)

  constructor(type: number, seed: number, model_position: Model[]) {
    this.type = type
    this.model_position = model_position
    this.seed = seed

    this.initialPosition()
  }

  static create(type: BATTLE_TYPE, seed: number, model_position: Model[]) {
    const battle = new Battle(type, seed, model_position)
  }

  quickCalcResult() {

  }

  /**
   * 每个回合要做的事
   */
  logicRound() {

  }

  calcWithType(t, e, n, i, o) {
    switch (t) {
      case BattleConst.BATTLE_DAMAGE:
        switch (e) {
          case Define.ATKTYPE_STR:
          case Define.ATKTYPE_RANGE_STR:
            return this.calc(BattleConst.BATTLE_DMG_STR, n, i, o)
          case Define.ATKTYPE_AGI:
          case Define.ATKTYPE_RANGE_AGI:
            return this.calc(BattleConst.BATTLE_DMG_AGI, n, i, o)
          case Define.ATKTYPE_MAGIC:
            return this.calc(BattleConst.BATTLE_DMG_MAGIC, n, i, o)
          case Define.ATKTYPE_CURSE:
            return 0
          default:
            return 0
        }
      case BattleConst.BATTLE_HITRATE:
        switch (e) {
          case Define.ATKTYPE_STR:
          case Define.ATKTYPE_RANGE_STR:
            return this.calc(BattleConst.BATTLE_STR_HITRATE, n, i, o)
          case Define.ATKTYPE_AGI:
          case Define.ATKTYPE_RANGE_AGI:
            return this.calc(BattleConst.BATTLE_AGI_HITRATE, n, i, o)
          case Define.ATKTYPE_MAGIC:
          case Define.ATKTYPE_CURSE:
            return this.calc(BattleConst.BATTLE_MAGIC_HITRATE, n, i, o)
          case Define.ATKTYPE_BLESS:
            return 100
          default:
            return 0
        }
    }
    return 0
  }

  randRange(min: number, max: number) {
    return max
  }

  calc(t, e, n, i) {
    let o = 0
    switch ((i == null && (i = Skill.DUMMY_SKILL), t)) {
      case BattleConst.BATTLE_DAMAGE:
        var a = this.calcWithType(
          BattleConst.BATTLE_DAMAGE,
          e.getAttackTypeBySkill(i),
          e,
          n,
          i,
        )
        return a
      case BattleConst.BATTLE_HITRATE:
        var r = this.calcWithType(
          BattleConst.BATTLE_HITRATE,
          e.getAttackTypeBySkill(i),
          e,
          n,
          i,
        )
        return r
      case BattleConst.BATTLE_STR_HITRATE:
        var s
          = (e.get(Model.HIT_RATE)
            + i.getPowerValue(Define.POWER_SKILL_HITRATE)
            - n.get(Model.DODGE))
          >> 0
        var l = e.get(Model.FORCE_HIT)
        return (
          l > Model.MAX_FORCE_RATE && (l = Model.MAX_FORCE_RATE),
          (l += i.getPowerValue(Define.POWER_SKILL_HIT_FORCE)),
          l > s && (s = l),
          s
        )
      case BattleConst.BATTLE_AGI_HITRATE:
        o
          = (e.get(Model.HIT_RATE)
            + i.getPowerValue(Define.POWER_SKILL_HITRATE)
            - n.get(Model.DODGE))
          >> 0
        var l = e.get(Model.FORCE_HIT)
        return (
          l > Model.MAX_FORCE_RATE && (l = Model.MAX_FORCE_RATE),
          (l += i.getPowerValue(Define.POWER_SKILL_HIT_FORCE)),
          l > o && (o = l),
          o
        )
      case BattleConst.BATTLE_MAGIC_HITRATE:
        (o = e.get(Model.HIT_MAGIC)),
        (o += i.getPowerValue(Define.POWER_SKILL_HITRATE))
        var _ = this.getLevelIncludeLevel2(n)
        return _ <= 0 && (_ = 1), (o = ((10 * o) / _) >> 0)
      case BattleConst.BATTLE_DMG_STR:
        var h = this.calc(BattleConst.BATTLE_RD_STR, n, e, i)
        var u = this.calc(BattleConst.BATTLE_AP_STR, e, n, i)
        var c = this.randRange(
          BattleConst.BATTLE_DMG_MIN,
          BattleConst.BATTLE_DMG_MAX,
        )
        var T = (100 - h) * u * c
        return (
          u > 0 && c > 0 && 100 - h > 0 && T < 0 && (T = Tool.MAX_VALUE_int),
          (o = (T / 1e4) >> 0),
          o <= 0 && (o = 1),
          o
        )
      case BattleConst.BATTLE_AP_STR:
        var p = this.calc(BattleConst.BATTLE_RAND_ATC, e, n, i)
        return (o
          = (((e.get(Model.ATK_STR) / this.totalHitTime) >> 0)
            + p
            + i.getPowerValue(Define.POWER_SKILL_DAMAGE) / this.totalHitTime)
          >> 0)
      case BattleConst.BATTLE_RD_STR:
        o
          = ((80
            * (e.get(Model.DEF_STR)
              - n.get(Model.BRK_ARMOR)
              - i.getPowerValue(Define.POWER_SKILL_BRK_ARMOR)))
            / 100)
          >> 0
        var _ = this.getLevelIncludeLevel2(n) + 12
        return (
          _ <= 0 && (_ = 1),
          (o = (o / _) >> 0),
          o > BattleConst.BATTLE_RD_MAX
            ? (o = BattleConst.BATTLE_RD_MAX)
            : o < 0 && (o = 0),
          o
        )
      case BattleConst.BATTLE_DMG_AGI:
        var d = this.calc(BattleConst.BATTLE_RD_AGI, n, e, i)
        var E = this.calc(BattleConst.BATTLE_AP_AGI, e, n, i)
        var g = this.randRange(
          BattleConst.BATTLE_DMG_MIN,
          BattleConst.BATTLE_DMG_MAX,
        )
        var S = (100 - d) * E * g
        return (
          100 - d > 0 && E > 0 && g > 0 && S < 0 && (S = Tool.MAX_VALUE_int),
          (o = (S / 1e4) >> 0),
          o <= 0 && (o = 1),
          o
        )
      case BattleConst.BATTLE_AP_AGI:
        var p = this.calc(BattleConst.BATTLE_RAND_ATC, e, n, i)
        return (o
          = ((e.get(Model.ATK_AGI) / this.totalHitTime) >> 0)
          + p
          + ((i.getPowerValue(Define.POWER_SKILL_DAMAGE) / this.totalHitTime)
            >> 0))
      case BattleConst.BATTLE_RD_AGI:
        o
          = ((80
            * (e.get(Model.DEF_AGI)
              - n.get(Model.BRK_ARMOR)
              - i.getPowerValue(Define.POWER_SKILL_BRK_ARMOR)))
            / 100)
          >> 0
        var _ = this.getLevelIncludeLevel2(n) + 12
        return (
          _ <= 0 && (_ = 1),
          (o = (o / _) >> 0),
          o > BattleConst.BATTLE_RD_MAX
            ? (o = BattleConst.BATTLE_RD_MAX)
            : o < 0 && (o = 0),
          o
        )
      case BattleConst.BATTLE_DMG_MAGIC:
        var m = this.calc(BattleConst.BATTLE_RD_MAGIC, n, e, i)
        var f = this.calc(BattleConst.BATTLE_AP_MAGIC, e, n, i)
        var I = this.randRange(
          BattleConst.BATTLE_DMG_MIN,
          BattleConst.BATTLE_DMG_MAX,
        )
        var A = ((100 - m) * f * I) & 4294967295
        return (
          100 - m > 0 && f > 0 && I > 0 && A < 0 && (A = Tool.MAX_VALUE_int),
          (o = (A / 1e4) >> 0),
          o <= 0 && (o = 1),
          o
        )
      case BattleConst.BATTLE_AP_MAGIC:
        var p = this.calc(BattleConst.BATTLE_RAND_ATC, e, n, i)
        if (e.bag) {
          const y = e.getEquipWeaponType()
          y != Define.ITEM_TYPE_WEAPON_TWOHAND_STAFF
            && y != Define.ITEM_TYPE_WEAPON_BALL
            && (p = 0)
        }
        return (o
          = ((e.get(Model.ATK_MAGIC) / this.totalHitTime) >> 0)
          + p
          + ((i.getPowerValue(Define.POWER_SKILL_DAMAGE) / this.totalHitTime)
            >> 0))
      case BattleConst.BATTLE_RD_MAGIC:
        o
          = (80
            * (e.get(Model.DEF_MAGIC)
              - n.get(Model.MAGIC_PENETRATION)
              - i.getPowerValue(Define.POWER_SKILL_MAGIC_PENETRATION)))
          / 100
        var _ = this.getLevelIncludeLevel2(n) + 12
        return (
          _ <= 0 && (_ = 1),
          (o = (o / _) >> 0),
          o > BattleConst.BATTLE_RD_MAX
            ? (o = BattleConst.BATTLE_RD_MAX)
            : o < 0 && (o = 0),
          o
        )
      case BattleConst.BATTLE_CRI_RATE:
        var R
          = e.get(Model.CRITICAL)
          + i.getPowerValue(Define.POWER_SELF_CRITICAL)
        var _ = this.getLevelIncludeLevel2(n)
        return _ <= 0 && (_ = 1), (R = ((15 * R) / _) >> 0)
      case BattleConst.BATTLE_RAND_ATC:
        return this.randRange(
          e.get(Model.ATK_MIN),
          e.get(Model.ATK_MAX),
        )
      case BattleConst.BATTLE_BLOCK:
        (o = e.get(Model.BLOCK)),
        (o -= i.getPowerValue(Define.POWER_SKILL_TARGET_BLOCK)),
        (o -= n.get(Model.IGNORE_BLOCK))
        var _ = this.getLevelIncludeLevel2(n)
        return (
          _ <= 0 && (_ = 1),
          (o = ((7 * o) / _) >> 0),
          o < 0 && (o = 0),
          o > BattleConst.MAX_BLOCK_TOUCH
          && (o = BattleConst.MAX_BLOCK_TOUCH),
          o
        )
      case BattleConst.BATTLE_INSIGHT:
        (o = e.get(Model.INSIGHT)),
        (o -= i.getPowerValue(Define.POWER_SKILL_TARGET_INSIGHT)),
        (o -= n.get(Model.IGNORE_INSIGHT))
        var _ = this.getLevelIncludeLevel2(n)
        return (
          _ <= 0 && (_ = 1),
          (o = ((7 * o) / _) >> 0),
          o < 0 && (o = 0),
          o > BattleConst.MAX_INSIGHT_TOUCH
          && (o = BattleConst.MAX_INSIGHT_TOUCH),
          o
        )
      case BattleConst.BATTLE_BACK:
        (o = e.get(Model.BACK)),
        (o -= i.getPowerValue(Define.POWER_SKILL_TARGET_BACK)),
        (o -= n.get(Model.IGNORE_BACK))
        var _ = this.getLevelIncludeLevel2(n)
        return (
          _ <= 0 && (_ = 1),
          (o = ((7 * o) / _) >> 0),
          o < 0 && (o = 0),
          o > e.get(Model.BACK_MAX) && (o = e.get(Model.BACK_MAX)),
          o
        )
      case BattleConst.BATTLE_MAGIC_BACK:
        (o = e.get(Model.MAGIC_BACK)),
        (o -= i.getPowerValue(Define.POWER_SKILL_TARGET_MAGIC_BACK)),
        (o -= n.get(Model.IGNORE_MAGIC_BACK))
        var _ = this.getLevelIncludeLevel2(n)
        return (
          _ <= 0 && (_ = 1),
          (o = ((7 * o) / _) >> 0),
          o < 0 && (o = 0),
          o > e.get(Model.BACK_MAX) && (o = e.get(Model.BACK_MAX)),
          o
        )
    }
    return 0
  }

  getLevelIncludeLevel2(t) {
    let e = t.get(Model.LEVEL)
    return (e += t.get(Model.LEVEL2))
  }

  private initialPosition() {

  }
}
