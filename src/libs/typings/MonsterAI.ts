import { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { Battle } from 'libs/service/Battle/battle'
import { Tool } from 'libs/shared/Tool'
import { Model } from './Model'
import { Player } from './Player'
import { Skill } from './Skill'

export class MonsterAI {
  conType: Array<number> = []
  conValue: Array<number> = []
  msg: Array<string> = []
  skill1: Array<Skill | null> | null = null
  skill2: Array<Skill | null> | null = null
  targetType: Array<any> = []
  targetPos = 0
  id = 0

  getBattleSkill(t, e) {
    if (this.conType == null || this.conType.length <= 0)
      return null
    const n = this.conType.length;
    (this.targetPos = -1), (e.message = null)
    for (let i = 0; n > i; i++) {
      if (this.isValidConAI(t, e, i)) {
        const o = this.getConSkill(t, i)
        if (!o || o.type != Define.SKILL_TYPE_ROUND) {
          return (
            (this.targetPos = this.selectAttackTarget(t, e, i)),
            (e.message = this.msg[i]),
            o
          )
        }
      }
    }
    return null
  }

  getAutoSkill(t, e) {
    if (this.conType == null || this.conType.length <= 0)
      return null
    const n = this.conType.length
    e.message = null
    for (let i = 0; n > i; i++) {
      if (this.isValidConAI(t, e, i)) {
        const o = this.getConSkill(t, i)
        if (
          o != null
          && o.type == Define.SKILL_TYPE_ROUND
          && !(o.useMP > e.get(Model.MP))
          && o.isEnoughHP(e)
        )
          return (e.message = this.msg[i]), o
      }
    }
    return null
  }

  isValidConAI(t, e, n) {
    let i = 0
    let o = t.getLeftPosNum()
    let a = 0
    switch (this.conType[n]) {
      case Define.CONDITION_NONE:
        return true
      case Define.CONDITION_HP_BELOW:
        return (
          (a = (100 * e.get(Model.HP)) / e.get(Model.HPMAX)),
          a < this.conValue[n]
        )
      case Define.CONDITION_HP_HIGH:
        return (
          (a = (100 * e.get(Model.HP)) / e.get(Model.HPMAX)),
          a > this.conValue[n]
        )
      case Define.CONDITION_HELP_RATE:
        return t.randInt(100) < this.conValue[n]
      case Define.CONDITION_ROUND:
        return this.conValue[n] <= t.round
      case Define.CONDITION_PLAYER_COUNT:
        return (
          Battle.isLeftSide(e.position) == true
          && ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS)),
          this.conValue[n] <= t.getActivePlayerNum(i, o, false)
        )
      case Define.CONDITION_MONSTER_COUNT:
        return (
          Battle.isLeftSide(e.position)
          || ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS)),
          this.conValue[n] <= t.getActivePlayerNum(i, o, false)
        )
    }
    return false
  }

  getConSkill(t, e) {
    if (this.skill1 == null || this.skill1.length <= 0)
      return null
    if (this.skill2 == null || this.skill2.length <= 0)
      return null
    const n = this.skill1[e]
    const i = this.skill2[e]
    if (n && i) {
      const o = t.random.nextInt()
      return (1 & o) == 0 ? n : i
    }
    return n || i
  }

  selectAttackTarget(e, n, i) {
    if (e == null)
      return -1
    if (n == null)
      return -1
    if (Tool.isArrayIndexOutOfBounds(i, this.targetType))
      return -1
    const o = this.targetType[i]
    switch (o) {
      case Define.AI_ESCAPE:
        return MonsterAI.TARGET_ESCAPE
      case Define.AI_HATE_MIN:
        return MonsterAI.selectValueTarget(e, n, o, true)
      case Define.AI_HATE_MAX:
        return MonsterAI.selectValueTarget(e, n, o, true)
      case Define.AI_HP_MIN_ENEMY:
        return MonsterAI.selectValueTarget(e, n, o, true)
      case Define.AI_HP_MAX_ENEMY:
        return MonsterAI.selectValueTarget(e, n, o, true)
      case Define.AI_SPEED_MIN_ENEMY:
        return MonsterAI.selectValueTarget(e, n, o, true)
      case Define.AI_SPEED_MAX_ENEMY:
        return MonsterAI.selectValueTarget(e, n, o, true)
      case Define.AI_HP_MIN_FRIEND:
        return MonsterAI.selectValueTarget(e, n, o, false)
      case Define.AI_HP_MAX_FRIEND:
        return MonsterAI.selectValueTarget(e, n, o, false)
      case Define.AI_SPEED_MIN_FRIEND:
        return MonsterAI.selectValueTarget(e, n, o, false)
      case Define.AI_SPEED_MAX_FRIEND:
        return MonsterAI.selectValueTarget(e, n, o, false)
      case Define.AI_RAND_ENEMY:
        return MonsterAI.selectRandTarget(e, n, true)
      case Define.AI_RAND_FRIEND:
        return MonsterAI.selectRandTarget(e, n, false)
      case Define.AI_SELF:
        return n.position
      case Define.AI_RAND_FRIEND_DEAD:
        return MonsterAI.selectRandDeadFriend(e, n)
      case Define.AI_RAND_ALL_ALIVE:
        return MonsterAI.selectRandActivePlayer(e, n)
    }
    return -1
  }
}

export namespace MonsterAI {
  export function selectRandActivePlayer(t, e) {
    for (
      var n = 0,
        i = Battle.MAX_POS,
        o = new Array(Battle.MAX_POS),
        a = 0,
        r = n;
      i > r;
      r++
    ) {
      const s = t.getPlayerByPos(r)
      t.isValidBattlePlayer(s)
        && s.position != e.position
        && (Tool.isArrayIndexOutOfBounds(a, o) || ((o[a] = s.position), a++))
    }
    if (a <= 0)
      return n
    if (a == 1)
      return o[0]
    const l = t.randRange(0, a - 1)
    return o[l] == null ? n : o[l]
  }

  export function selectRandDeadFriend(t, e) {
    let n = 0
    let i = t.getLeftPosNum()
    Battle.isLeftSide(e.position)
      || ((n = Battle.LEFT_MAX_POS), (i = Battle.MAX_POS))
    for (var o = new Array(Battle.MAX_POS), a = 0, r = n; i > r; r++) {
      const s = t.getPlayerByPos(r)
      s != null
        && (s.isBattleStatus(Player.BSTATUS_ESCAPE)
          || (s.isDead()
            && (Tool.isArrayIndexOutOfBounds(a, o)
              || ((o[a] = s.position), a++))))
    }
    if (a <= 0)
      return n
    if (a == 1)
      return o[0]
    const l = t.randRange(0, a - 1)
    return o[l] == null ? n : o[l]
  }

  export function selectRandTarget(t, e, n) {
    let i = 0
    let o = t.getLeftPosNum()
    n
      ? Battle.isLeftSide(e.position)
      && ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS))
      : Battle.isLeftSide(e.position)
      || ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS))
    for (var a = new Array(Battle.MAX_POS), r = 0, s = i; o > s; s++) {
      const l = t.getPlayerByPos(s)
      t.isValidBattlePlayer(l)
        && (Tool.isArrayIndexOutOfBounds(r, a) || ((a[r] = l.position), r++))
    }
    if (r <= 0)
      return i
    if (r == 1)
      return a[0]
    const _ = t.randRange(0, r - 1)
    return a[_] == null ? i : a[_]
  }

  export function selectValueTarget(t, e, n, i) {
    let o = 0
    let a = t.getLeftPosNum()
    i
      ? Battle.isLeftSide(e.position)
      && ((o = Battle.LEFT_MAX_POS), (a = Battle.MAX_POS))
      : Battle.isLeftSide(e.position)
      || ((o = Battle.LEFT_MAX_POS), (a = Battle.MAX_POS))
    for (var r = -1, s = -1, l = o; a > l; l++) {
      const _ = t.getPlayerByPos(l)
      if (t.isValidBattlePlayer(_)) {
        let h = 0
        switch (n) {
          case Define.AI_HATE_MIN:
          case Define.AI_HATE_MAX:
            h = _.get(Model.ARGO)
            break
          case Define.AI_HP_MIN_ENEMY:
          case Define.AI_HP_MAX_ENEMY:
          case Define.AI_HP_MIN_FRIEND:
          case Define.AI_HP_MAX_FRIEND:
            h = _.get(Model.HP)
            break
          case Define.AI_SPEED_MIN_ENEMY:
          case Define.AI_SPEED_MAX_ENEMY:
          case Define.AI_SPEED_MIN_FRIEND:
          case Define.AI_SPEED_MAX_FRIEND:
            h = _.get(Model.SPEED)
        }
        r == -1 && ((s = l), (r = h)),
        (n == Define.AI_HATE_MIN
            || n == Define.AI_HP_MIN_ENEMY
            || n == Define.AI_SPEED_MIN_ENEMY
            || n == Define.AI_HP_MIN_FRIEND
            || n == Define.AI_SPEED_MIN_FRIEND)
          && r > h
          && ((s = l), (r = h)),
        (n == Define.AI_HATE_MAX
            || n == Define.AI_HP_MAX_ENEMY
            || n == Define.AI_SPEED_MAX_ENEMY
            || n == Define.AI_HP_MAX_FRIEND
            || n == Define.AI_SPEED_MAX_FRIEND)
          && h > r
          && ((s = l), (r = h))
      }
    }
    return s
  }

  export function fromBytes(byte: Protocol, skills: Skill[]) {
    const monsterAI = new MonsterAI()

    monsterAI.id = byte.getShort()
    const len = byte.getByte()
    monsterAI.conType = new Array(len)
    monsterAI.conValue = new Array(len)
    monsterAI.msg = new Array(len)
    monsterAI.skill1 = new Array(len)
    monsterAI.skill2 = new Array(len)
    monsterAI.targetType = new Array(len)

    for (let a = 0; a < len; a++) {
      monsterAI.conType[a] = byte.getByte()
      monsterAI.conValue[a] = byte.getInt()
      monsterAI.msg[a] = byte.getString()
      monsterAI.skill1[a] = Skill.getSkillBySkillId(skills, byte.getShort(), byte.getByte())
      monsterAI.skill2[a] = Skill.getSkillBySkillId(skills, byte.getShort(), byte.getByte())
      monsterAI.targetType[a] = byte.getByte()
    }

    return monsterAI
  }

  export function processDataMonsterAIMsg(byte: Protocol) {
    const skills: Skill[] = []
    const monsterAIs: MonsterAI[] = []

    for (let e = byte.getByte(), n = 0; n < e; n++)
      skills.push(Skill.fromBytes(byte))

    for (let e = byte.getByte(), n = 0; n < e; n++)
      monsterAIs.push(MonsterAI.fromBytes(byte, skills))

    return monsterAIs
  }

  export const TARGET_ESCAPE = 100
}
