import type { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { Battle } from 'libs/service/Battle/battle'
import { Tool } from 'libs/shared/Tool'
import { Model } from './Model'
import type { Monster } from './Monster'
import { Player } from './Player'
import { Skill } from './Skill'

export class MonsterAI {
  conType: Array<number> = []
  conValue: Array<number> = []
  msg: Array<string> = []
  skill1: Array<Skill | null> | null = null
  skill2: Array<Skill | null> | null = null
  targetType: Array<number> = []
  targetPos = 0
  id = 0

  getBattleSkill(battle: Battle, monster: Monster) {
    if (this.conType == null || this.conType.length <= 0)
      return null
    const n = this.conType.length
    this.targetPos = -1
    for (let i = 0; n > i; i++) {
      if (this.isValidConAI(battle, monster, i)) {
        const o = this.getConSkill(battle, i)
        if (!o || o.type !== Define.SKILL_TYPE_ROUND) {
          return (
            (this.targetPos = this.selectAttackTarget(battle, monster, i)),
            (monster.message = this.msg[i]),
            o
          )
        }
      }
    }
    return null
  }

  getAutoSkill(battle: Battle, monster: Monster) {
    if (this.conType == null || this.conType.length <= 0)
      return null
    const n = this.conType.length
    for (let i = 0; n > i; i++) {
      if (this.isValidConAI(battle, monster, i)) {
        const o = this.getConSkill(battle, i)
        if (
          o != null
          && o.type === Define.SKILL_TYPE_ROUND
          && !(o.useMP > monster.get(Model.MP))
          && o.isEnoughHP(monster)
        ) {
          monster.message = this.msg[i]
          return o
        }
      }
    }
    return null
  }

  isValidConAI(battle: Battle, monster: Monster, index: number) {
    let i = 0
    let o = battle.getLeftPosNum()
    let a = 0
    switch (this.conType[index]) {
      case Define.CONDITION_NONE:
        return true
      case Define.CONDITION_HP_BELOW:
        return (
          (a = (100 * monster.get(Model.HP)) / monster.get(Model.HPMAX)),
          a < this.conValue[index]
        )
      case Define.CONDITION_HP_HIGH:
        return (
          (a = (100 * monster.get(Model.HP)) / monster.get(Model.HPMAX)),
          a > this.conValue[index]
        )
      case Define.CONDITION_HELP_RATE:
        return battle.randInt(100) < this.conValue[index]
      case Define.CONDITION_ROUND:
        return this.conValue[index] <= battle.round
      case Define.CONDITION_PLAYER_COUNT:
        return (
          Battle.isLeftSide(monster.position)
          && ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS)),
          this.conValue[index] <= battle.getActivePlayerNum(i, o, false)
        )
      case Define.CONDITION_MONSTER_COUNT:
        return (
          Battle.isLeftSide(monster.position)
          || ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS)),
          this.conValue[index] <= battle.getActivePlayerNum(i, o, false)
        )
    }
    return false
  }

  getConSkill(battle: Battle, index: number) {
    if (this.skill1 == null || this.skill1.length <= 0)
      return null
    if (this.skill2 == null || this.skill2.length <= 0)
      return null
    const n = this.skill1[index]
    const i = this.skill2[index]
    if (n && i) {
      const o = battle.random.nextInt()
      return (1 & o) === 0 ? n : i
    }
    return n || i
  }

  selectAttackTarget(battle: Battle, monster: Monster, index: number) {
    if (battle == null)
      return -1
    if (monster == null)
      return -1
    if (Tool.isArrayIndexOutOfBounds(index, this.targetType))
      return -1
    const type = this.targetType[index]
    switch (type) {
      case Define.AI_ESCAPE:
        return MonsterAI.TARGET_ESCAPE
      case Define.AI_HATE_MIN:
        return MonsterAI.selectValueTarget(battle, monster, type, true)
      case Define.AI_HATE_MAX:
        return MonsterAI.selectValueTarget(battle, monster, type, true)
      case Define.AI_HP_MIN_ENEMY:
        return MonsterAI.selectValueTarget(battle, monster, type, true)
      case Define.AI_HP_MAX_ENEMY:
        return MonsterAI.selectValueTarget(battle, monster, type, true)
      case Define.AI_SPEED_MIN_ENEMY:
        return MonsterAI.selectValueTarget(battle, monster, type, true)
      case Define.AI_SPEED_MAX_ENEMY:
        return MonsterAI.selectValueTarget(battle, monster, type, true)
      case Define.AI_HP_MIN_FRIEND:
        return MonsterAI.selectValueTarget(battle, monster, type, false)
      case Define.AI_HP_MAX_FRIEND:
        return MonsterAI.selectValueTarget(battle, monster, type, false)
      case Define.AI_SPEED_MIN_FRIEND:
        return MonsterAI.selectValueTarget(battle, monster, type, false)
      case Define.AI_SPEED_MAX_FRIEND:
        return MonsterAI.selectValueTarget(battle, monster, type, false)
      case Define.AI_RAND_ENEMY:
        return MonsterAI.selectRandTarget(battle, monster, true)
      case Define.AI_RAND_FRIEND:
        return MonsterAI.selectRandTarget(battle, monster, false)
      case Define.AI_SELF:
        return monster.position
      case Define.AI_RAND_FRIEND_DEAD:
        return MonsterAI.selectRandDeadFriend(battle, monster)
      case Define.AI_RAND_ALL_ALIVE:
        return MonsterAI.selectRandActivePlayer(battle, monster)
    }
    return -1
  }
}

export namespace MonsterAI {
  export function selectRandActivePlayer(battle: Battle, monster: Monster) {
    const o = new Array(Battle.MAX_POS)
    let a = 0

    for (let i = 0; i <= Battle.MAX_POS; i++) {
      const s = battle.getPlayerByPos(i)
      if (battle.isValidBattlePlayer(s)
        && s!.position !== monster.position) {
        if (!Tool.isArrayIndexOutOfBounds(a, o)) {
          o[a] = s!.position
          a++
        }
      }
    }
    if (a <= 0)
      return 0
    if (a === 1)
      return o[0]
    const l = battle.randRange(0, a - 1)
    return o[l] == null ? 0 : o[l]
  }

  export function selectRandDeadFriend(battle: Battle, monster: Monster) {
    let n = 0
    let i = battle.getLeftPosNum()
    if (!Battle.isLeftSide(monster.position)) {
      n = Battle.LEFT_MAX_POS
      i = Battle.MAX_POS
    }
    const o = new Array(Battle.MAX_POS)
    let a = 0

    for (let r = n; i > r; r++) {
      const s = battle.getPlayerByPos(r)
      if (s !== null) {
        s.isBattleStatus(Player.BSTATUS_ESCAPE)
        if (s.isDead()) {
          if (!Tool.isArrayIndexOutOfBounds(a, o)) {
            o[a] = s.position
            a++
          }
        }
      }
    }
    if (a <= 0)
      return n
    if (a === 1)
      return o[0]
    const l = battle.randRange(0, a - 1)
    return o[l] == null ? n : o[l]
  }

  export function selectRandTarget(battle: Battle, monster: Monster, flag: boolean) {
    let i = 0
    let o = battle.getLeftPosNum()
    if (flag) {
      if (Battle.isLeftSide(monster.position)) {
        i = Battle.LEFT_MAX_POS
        o = Battle.MAX_POS
      }
      else {
        i = Battle.LEFT_MAX_POS
        o = Battle.MAX_POS
      }
    }

    const a = new Array(Battle.MAX_POS)
    let r = 0

    for (let s = i; o > s; s++) {
      const l = battle.getPlayerByPos(s)
      if (battle.isValidBattlePlayer(l) && !Tool.isArrayIndexOutOfBounds(r, a)) {
        a[r] = l!.position
        r++
      }
    }
    if (r <= 0)
      return i
    if (r === 1)
      return a[0]
    const _ = battle.randRange(0, r - 1)
    return a[_] == null ? i : a[_]
  }

  export function selectValueTarget(battle: Battle, monster: Monster, type: number, flag: boolean) {
    let o = 0
    let a = battle.getLeftPosNum()
    if (flag) {
      if (Battle.isLeftSide(monster.position)) {
        o = Battle.LEFT_MAX_POS
        a = Battle.MAX_POS
      }
      else {
        o = Battle.LEFT_MAX_POS
        a = Battle.MAX_POS
      }
    }

    let r = -1
    let s = -1

    for (let l = o; a > l; l++) {
      const player = battle.getPlayerByPos(l)
      if (battle.isValidBattlePlayer(player)) {
        let h = 0
        switch (type) {
          case Define.AI_HATE_MIN:
          case Define.AI_HATE_MAX:
            h = player!.get(Model.ARGO)
            break
          case Define.AI_HP_MIN_ENEMY:
          case Define.AI_HP_MAX_ENEMY:
          case Define.AI_HP_MIN_FRIEND:
          case Define.AI_HP_MAX_FRIEND:
            h = player!.get(Model.HP)
            break
          case Define.AI_SPEED_MIN_ENEMY:
          case Define.AI_SPEED_MAX_ENEMY:
          case Define.AI_SPEED_MIN_FRIEND:
          case Define.AI_SPEED_MAX_FRIEND:
            h = player!.get(Model.SPEED)
        }
        if (r === -1) {
          s = l
          r = h
        }

        if ((type === Define.AI_HATE_MIN
          || type === Define.AI_HP_MIN_ENEMY
          || type === Define.AI_SPEED_MIN_ENEMY
          || type === Define.AI_HP_MIN_FRIEND
          || type === Define.AI_SPEED_MIN_FRIEND)
          && r > h) {
          s = l
          r = h
        }

        if ((type === Define.AI_HATE_MAX
          || type === Define.AI_HP_MAX_ENEMY
          || type === Define.AI_SPEED_MAX_ENEMY
          || type === Define.AI_HP_MAX_FRIEND
          || type === Define.AI_SPEED_MAX_FRIEND)
          && h > r) {
          s = l
          r = h
        }
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
