import { Emitter } from '@livemoe/utils'
import type { Protocol } from 'libs/base/protocol'
import { Define } from 'libs/defined/defined'
import { Tool } from 'libs/shared/Tool'
import { ItemData } from 'libs/typings/ItemData'
import { Model } from 'libs/typings/Model'
import { Monster } from 'libs/typings/Monster'
import { MonsterAI } from 'libs/typings/MonsterAI'
import type { MonsterGroup } from 'libs/typings/MonsterGroup'
import { Pet } from 'libs/typings/PetInfo'
import { Player } from 'libs/typings/Player'
import type { PlayerBuffer } from 'libs/typings/PlayerBuffer'
import { Skill } from 'libs/typings/Skill'
import { BattleInputHandler } from './battleInputHandler'
import { BattleView } from './battleView'
import { Control } from './Control'
import { Random } from './random'

export class DamageData {
  damageValue = 0
  damageEffect = 0
  damageBackValue = 0
  damageHpGet = 0
  damageMpGet = 0
  magicDefDamageValue = 0

  static isEffectStatus(t, e) {
    return (t & e) != 0
  }
}

export class Battle {
  battleSeq = 0
  inOneKeyDaily = false
  result = 0
  _isRemoteWaiting = false
  round = 0
  roundEndTime = 0
  isLeftHavePlayer = false
  isRightHavePlayer = false
  guardHash = {}
  playerPlanData = {}
  resultControlList: any[] = []
  totalHitTime = 1
  block = 0
  isLeftHand = true
  atkType = 0
  waitStatus = 0
  nextBattleGroupID = 0
  random: Random
  rowLeft = 0
  rowRight = 0
  orderPlayer!: Player
  orderPet: Pet | null = null
  cursor = 0
  planVector: any[] = []
  battleView = new BattleView(this)
  inputHandler = new BattleInputHandler(this, this.battleView)

  readonly _onBattleFinish = new Emitter<Protocol>()
  readonly onBattleFinish = this._onBattleFinish.event

  startHP = 0
  startMP = 0

  constructor(readonly seed: number = 0, readonly playerList: Player[], public type: number = Battle.LOCAL, readonly monsterGroup: MonsterGroup | null, player: Player) {
    this.random = new Random(this.seed)
    playerList.forEach((v) => {
      if (v.getId() === player.getId()) {
        this.orderPlayer = v
        this.orderPet = v.pet
        this.startHP = player.hp
        this.startMP = player.mp
      }
    })
    this.initBattleRowNum()
    this.battleView.setTag(Battle.TAG_IS_AUTO_FIGHT, true)
    this.battleView.checkMyPetInBattle()
  }

  isRemoteWaiting() {
    return this._isRemoteWaiting
  }

  setRemoteWaiting(t) {
    this._isRemoteWaiting = t
  }

  getPlanTime() {
    return 0
  }

  setPlan(e, n) {
    n != null && (e < 0 || e >= Battle.MAX_POS || (this.playerPlanData[e] = n))
  }

  clearPlan(e) {
    this.playerPlanData != null
            && (e < 0 || e >= Battle.MAX_POS || (this.playerPlanData[e] = null))
  }

  initBattleRowNum() {
    (this.rowLeft = 5), (this.rowRight = 5)
    for (var e, n, i = 0; i < Battle.MAX_POS; i++) {
      const o = this.getPlayerByPos(i)
      o != null
                && (Battle.isLeftSide(i)
                  ? ((e = i / 2 + 1), e > this.rowLeft && (this.rowLeft = e))
                  : ((n = (i - Battle.LEFT_MAX_POS) / 2 + 1),
                    n > this.rowRight && (this.rowRight = n)))
    }
    this.rowLeft >= Battle.MAX_ROW_NUM && (this.rowLeft = Battle.MAX_ROW_NUM),
    this.rowRight >= Battle.MAX_ROW_NUM && (this.rowRight = Battle.MAX_ROW_NUM)
  }

  checkDie1Hp(t, e) {
    if (t != null && t.isDead() != 0) {
      const n = []
      if (
        t.isTabStatus(Model.BUFFER_DIE_1HP_CHECK) == 0
                && t.isBattleStatus(
                  Define.getBufferBitValue(Define.BUFFER_RESIST_DIE_1HP),
                )
      ) {
        const i = t.isHaveCanNotReliveBuffer()
        i == 0
                    && (t.setTabStatus(true, Model.BUFFER_DIE_1HP_CHECK),
                    e != null
                      ? Define.processBattleReborn(t, 1, 0, Define.SPRITE_USE_ITEM, e)
                      : Define.processBattleReborn(t, 1, 0, Define.SPRITE_USE_ITEM, n))
      }
      if (e == null) {
        for (let o = 0; o < n.length; o++) {
          const a = n[o]
          this.addAniControl(a)
        }
      }
    }
  }

  cleanGuardData() {
    this.guardHash = {}
  }

  cleanAniControlList() {
    this.resultControlList.length = 0
  }

  logicRound() {
    this.cleanGuardData()
    this.cleanAniControlList()
    this.doRoundBuffer()
    let t
    t = this.sortModelListBySpeed()

    for (var e = 0; e < t.length; e++) {
      var n = t[e]
      n != null && this.doRoundHpMp(n)
    }
    for (var e = 0; e < t.length; e++) {
      var n = t[e]
      n != null && this.doAutoSkill(n)
    }
    t = this.sortModelListBySpeed()

    for (let i = 0, o = t; i < o.length; i++) {
      const a = o[i]
      var n = a
      if (n != null) {
        const r = this.getPlanData(n.position)
        let s = false
        r && (s = this.doPlayerPlan(n, r)),
        s != true
                    && (n.getType() == 3
                        || (n.getType() == 4
                          ? this.doPetAI(n)
                          : n instanceof Monster && this.doMonsterAI(n)))
      }
    }

    this.doEndRoundCheckBuffer()
    this.round += 1
    this.updateBattleResult()
  }

  getActivePlayerNum(t, e, n, i?: any, o?: any) {
    void 0 === i && (i = false), void 0 === o && (o = false)
    for (var a = 0, r = t; e > r; r++) {
      const s = this.getPlayerByPos(r)
      s != null
                && ((n && s.getType() != 3)
                    || (this.isValidBattlePlayer(s, i, o) && a++))
    }
    return a
  }

  isBattleFinish() {
    return this.result != 0
  }

  setBattleResult(t: number) {
    this.result = t
  }

  resetBattleResult() {
    this.result = 0
  }

  updateBattleResult() {
    const e = this.getActivePlayerNum(
      0,
      this.getLeftPosNum(),
      this.isLeftHavePlayer,
    )
    const n = this.getActivePlayerNum(
      Battle.LEFT_MAX_POS,
      Battle.MAX_POS,
      this.isRightHavePlayer,
    )
    e <= 0 && n <= 0
      ? (this.result = 4)
      : e <= 0
        ? (this.result = 2)
        : n <= 0
          ? (this.result = 1)
          : this.round >= Battle.MAX_ROUND && (this.result = 3)
  }

  mergeControlList(e, n) {
    if (e == null)
      return null
    for (let i = 0; i < e.length; i++) {
      const o = e[i]
      if (o != null) {
        for (let a = o.counter, r = o.int1, s = e.length - 1; s > i; s--) {
          const l = e[s]
          if (l != null) {
            const _ = o.int0
            const h = l.counter
            const u = l.int0
            const c = l.int1
            if (
              r == c
                            && !(
                              (n && Battle.isEffectStatus(h, Battle.EFFECT_REBORN))
                                || Battle.isEffectStatus(a, Battle.EFFECT_MP_CHANGE)
                                != Battle.isEffectStatus(h, Battle.EFFECT_MP_CHANGE)
                                || (_ < 0 && u >= 0)
                                || (_ >= 0 && u < 0)
                            )
            ) {
              const T = Battle.isEffectStatus(a, Battle.EFFECT_HIT)
              const p = Battle.isEffectStatus(h, Battle.EFFECT_HIT)
              if (
                T == p
                                && (T != false
                                    || Battle.isEffectStatus(a, Battle.EFFECT_BLOCK)
                                    == Battle.isEffectStatus(h, Battle.EFFECT_BLOCK))
              ) {
                (o.counter |= h), (o.int0 += u)
                const d = e.indexOf(l)
                e.splice(d, 1)
              }
            }
          }
        }
      }
    }
    return e
  }

  doEndRoundCheckBuffer() {
    for (var t = [], e = 0; e < this.playerList.length; e++) {
      const n = this.playerList[e]
      if (n != null) {
        const i = n.isHaveCanNotReliveBuffer()
        if (n.isDead()) {
          if (
            n.isTabStatus(Model.BUFFER_DIE_FULLHP_CHECK) == false
                        && n.isBattleStatus(
                          Define.getBufferBitValue(Define.BUFFER_RESIST_DIE_FULLHP),
                        )
          ) {
            if (i == false) {
              n.setTabStatus(true, Model.BUFFER_DIE_FULLHP_CHECK),
              Define.processBattleReborn(
                n,
                n.get(Model.HPMAX),
                0,
                Define.SPRITE_USE_ITEM,
                t,
              )
              continue
            }
          }
          else if (n.isDeadDelay()) {
            n.setTabStatus(true, Model.BUFFER_DIE_DELAY_CHECK)
            n.clearBufferList(false), i && n.runBufferList(false)
            continue
          }
        }
        n.isDead() || n.isBattleStatus(Player.BSTATUS_ESCAPE)
          ? (n.clearBufferList(false), i && n.runBufferList(false))
          : (n.runBufferList(false), this.doCheckWilBufferRemove(n))
      }
    }
    for (let a = 0; a < t.length; a++) {
      const o = t[a]
      this.addAniControl(o)
    }
  }

  doCheckWilBufferRemove(t) {
    if (t != null) {
      const e = t.battleBufferList
      if (!(e == null || e.length <= 0)) {
        for (var n: PlayerBuffer[] = [], i = 0; i < e.length; i++) {
          const o = e[i]
          o != null
                        && o.getStatus() != Define.BUFFER_NONE
                        && Define.getBufferType(o.getStatus())
                        == Define.BUFFER_TYPE_DEBUFF
                        && n.push(o)
        }
        if (!(n.length <= 0)) {
          const a = this.isWilSuccess(t, null, null)
          if (a != false) {
            const r = this.randRange(0, n.length - 1)
            if (!(r < 0 || r >= n.length)) {
              const s = n[r]
              if (s != null) {
                s.destroy(t)
                let l = e.indexOf(s)
                e.splice(l, 1), (l = n.indexOf(s)), n.splice(l, 1)
                for (var i = 0; i < n.length; i++) {
                  const _ = n[i]
                  if (_ != null && _.getStatus() == s.getStatus())
                    return
                }
                t.clearBattleStatus(Define.getBufferBitValue(s.getStatus()))
              }
            }
          }
        }
      }
    }
  }

  doPetAI(t) {
    if (this.isValidBattlePlayer(t)) {
      const e = MonsterAI.selectValueTarget(this, t, Define.AI_HATE_MAX, true)
      this.doAttack(t, e)
    }
  }

  doMonsterAI(t) {
    if (this.isValidBattlePlayer(t)) {
      const e = t.getSkillByAI(this, false)
      if (t.getAITargetPos() == MonsterAI.TARGET_ESCAPE)
        return void this.doEscape(t, true)
      const n = t.getAttackTarget(this)
      this.isValidPos(n)
                && (e == null ? this.doAttack(t, n) : this.doUseSkill(t, e, n))
    }
  }

  doEscape(e, n) {
    if (
      e != null
            && !e.isDead()
            && !e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_STUN))
    ) {
      let i;
      (i = n ? Battle.ESCAPE_SUCCESS : this.isEscapeSuccess(e)),
      i == Battle.ESCAPE_SUCCESS && e.setBattleStatus(Player.BSTATUS_ESCAPE)
      // var o = Control.createBattleEscape(e.position, i);
      // this.addAniControl(o);
    }
  }

  isEscapeSuccess(e) {
    if (e == null)
      return Battle.ESCAPE_FAILED
    let n = -1
    let i = 0
    let o = Battle.LEFT_MAX_POS
    Battle.isLeftSide(e.position) && ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS))
    for (var a = 0, r = i; o > r; r++) {
      const s = this.getPlayerByPos(r)
      s != null && ((a = s.get(Model.LEVEL)), a > n && (n = a))
    }
    let l = 0
    return (
      (a = e.get(Model.LEVEL)),
      (l
                = a - n <= -7
          ? Battle.ESCAPE_RATE_LOW
          : a - n >= 7
            ? Battle.ESCAPE_RATE_HIGH
            : Battle.ESCAPE_RATE_MID),
      this.randInt(100) < l ? Battle.ESCAPE_SUCCESS : Battle.ESCAPE_FAILED
    )
  }

  getPlanData(e) {
    return this.playerPlanData == null
      ? null
      : e < 0 || e >= Battle.MAX_POS
        ? null
        : this.playerPlanData[e]
  }

  doPlayerPlan(t, e) {
    if (t == null)
      return false
    if (e == null)
      return false
    let n = 0
    e.position = 0
    const i = e.readByte()
    switch (i) {
      case Battle.PLAN_ATTACK:
        (n = e.readByte()), this.doAttack(t, n)
        break
      case Battle.PLAN_USE_SKILL:
        n = e.readByte()
        var o = e.readShort()
        this.doUseSkillByID(t, o, n)
        break
      case Battle.PLAN_USE_ITEM:
        n = e.readByte()
        var a = e.readByte()
        this.doUseItem(t, a, n)
        break
      case Battle.PLAN_ESCAPE:
        this.doEscape(t, false)
        break
      case Battle.PLAN_NONE:
        return false
    }
    return true
  }

  doUseItem(e, n, i) {
    if (
      e != null
            && !e.isDeadNoWithDelay()
            && !e.isBattleStatus(Player.BSTATUS_ESCAPE)
    ) {
      const o = e.bag
      if (o != null) {
        const a = o.getBagItemBySlotPos(n)
        if (
          a != null
                    && ItemData.isValidEquipRequire(e, a) == Define.OK
                    && a.isCanUse(2) != 0
                    && !e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_STUN))
        ) {
          e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_CHAO))
                        && (i = MonsterAI.selectRandActivePlayer(this, e))
          const r = this.getSelectArea(e.position, i, a.area)
          if (r != null) {
            let s = null
            e.getType() == 3 && (s = a.name)
            const l = Control.createBattleUseSkillControl(
              e.position,
              i,
              a.area,
              Define.SKILL_POS_STAND,
              Define.ANIME_TYPE_USE_ITEM,
              Define.SPRITE_USE_ITEM,
              0,
              s,
            )
            this.addAniControl(l)
            for (var _ = [], h = 0; h < r.length; h++) {
              const u = r[h]
              if (!(u < 0 || u >= Battle.MAX_POS)) {
                const c = this.getPlayerByPos(u)
                if (c != null && !c.isBattleStatus(Player.BSTATUS_ESCAPE)) {
                  if (c.isDead()) {
                    if (c.isDeadDelay())
                      continue
                    if (a.isRebornItem() == 0)
                      continue
                  }
                  c && c.setTabStatus(false, Model.TAG_IS_KEEP_OUT),
                  this.processItemPower(c, a, _)
                }
              }
            }
            for (var T = new Array(_.length), h = 0; h < _.length; h++)
              T[h] = _[h]
            l.setSubControlList(T), o.removeBagItemByPos(n, 1)
          }
        }
      }
    }
  }

  processItemPower(t, e, n) {
    if (t != null && e != null) {
      const i = 0
      e.power1 > 0
                && Define.processBattlePower(
                  this,
                  t,
                  null,
                  null,
                  e.power1,
                  e.powerValue1,
                  0,
                  e.round,
                  i,
                  n,
                ),
      e.power2 > 0
                && Define.processBattlePower(
                  this,
                  t,
                  null,
                  null,
                  e.power2,
                  e.powerValue2,
                  0,
                  e.round,
                  i,
                  n,
                )
    }
  }

  doAutoSkill(t) {
    if (t != null) {
      let e: any = null
      if (t instanceof Monster) {
        const n = t
        if (((e = n.getSkillByAI(this, true)), e == null))
          return
        return void this.doUseSkill(t, e, this.searchAICursor(t, e.area))
      }
      const i = this.getAutoSkillIDByRound(t)
      if (!(i < 0) && ((e = t.getSkillByID(i)), e != null)) {
        let o = -1;
        (o = this.searchAICursor(t, e.area)), this.doUseSkillByID(t, i, o)
      }
    }
  }

  doUseSkillByID(t, e, n) {
    if (t != null) {
      const i = t.getSkillByID(e)
      i != null && this.doUseSkill(t, i, n)
    }
  }

  isValidPos(e) {
    return !(e < 0 || e >= Battle.MAX_POS)
  }

  addAniControl(t) {
    t != null && this.resultControlList.push(t)
  }

  doUseSkill(t, e, n) {
    if (
      this.isValidPos(n) != false
            && t != null
            && !t.isDeadNoWithDelay()
            && !t.isBattleStatus(Player.BSTATUS_ESCAPE)
            && e.type != Define.SKILL_TYPE_PASSIVE
            && Skill.isCanUse(t, e, null) != false
            && !t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_STUN))
    ) {
      if (t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_CHAO))) {
        if (e.type == Define.SKILL_TYPE_ROUND)
          return
        n = MonsterAI.selectRandActivePlayer(this, t)
      }
      else {
        if (
          t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_SILENCE))
        ) {
          if (e.type == Define.SKILL_TYPE_ROUND)
            return
          return void (
            this.isSameSide(t.position, n) == false && this.doAttack(t, n)
          )
        }
        if (Define.isPhysicalAtkType(e.skillAtkType) == true) {
          if (
            t.isBattleStatus(
              Define.getBufferBitValue(Define.BUFFER_BLOCK_SKILL),
            )
          ) {
            if (e.type == Define.SKILL_TYPE_ROUND)
              return
            return void (
              this.isSameSide(t.position, n) == false && this.doAttack(t, n)
            )
          }
        }
        else if (
          t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_BLOCK_TALK))
        ) {
          if (e.type == Define.SKILL_TYPE_ROUND)
            return
          return void (
            this.isSameSide(t.position, n) == false && this.doAttack(t, n)
          )
        }
      }
      const i = this.getSelectArea(t.position, n, e.area)
      if (i != null) {
        this.atkType = t.getAttackTypeBySkill(e)
        let o = null;
        (t.getType() == 3 || t.getType() == 4) && (o = e.name)
        const a = Control.createBattleUseSkillControl(
          t.position,
          n,
          e.area,
          e.position,
          e.anime1,
          e.anime2,
          e.anime3,
          o,
        )
        this.addAniControl(a)
        const r = []
        e.useMP > 0
                    && Define.processBattleHpMpPowerBySelf(
                      t,
                      Model.MP,
                      -e.useMP,
                      0,
                      r,
                      true,
                    ),
        e.useHP > 0
                    && Define.processBattleHpMpPowerBySelf(
                      t,
                      Model.HP,
                      -e.useHP,
                      0,
                      r,
                      true,
                    ),
        this.setSkillGuardData(e, t.position, i),
        e.type == Define.SKILL_TYPE_ACTIVE
                    && (e.power1 == Define.POWER_SKILL_REMOVE_STATUS
                        && t.removeBufferByStatus(e.powerValue1),
                    e.power2 == Define.POWER_SKILL_REMOVE_STATUS
                        && t.removeBufferByStatus(e.powerValue2),
                    e.power3 == Define.POWER_SKILL_REMOVE_STATUS
                        && t.removeBufferByStatus(e.powerValue3))
        for (var s = false, l: any[] = [], _ = 0; _ < i.length; _++) {
          const h = i[_]
          if (this.isValidPos(h) != false) {
            var u: any = this.getPlayerByPos(h)
            if (u != null && !u.isBattleStatus(Player.BSTATUS_ESCAPE)) {
              if (u.isDead()) {
                if (u.isDeadDelay())
                  continue
                if (e.isRebornSkill() == 0)
                  continue
              }
              l.push(u)
            }
          }
        }
        for (
          var c = this.isExpendHp(e, this.atkType), T = l.length, _ = 0;
          T > _;
          _++
        ) {
          var u = l[_]
          let p = this.getGrardPet(u, this.atkType, c)
          if (p != null) { u = p }
          else {
            let d = this.getGuardPos(u.position, this.atkType)
            u != null && u.keepout_atk_time > 0 && c && (d = -1),
            d >= 0
                            && ((p = this.getPlayerByPos(d)),
                            this.isValidBattlePlayer(p) && (u = p))
          }
          u != null && u.setTabStatus(false, Model.TAG_IS_KEEP_OUT)
          const E = this.calDamage(t, u, e, r, T)
          E
                        && ((s = true),
                        this.processSkillPower(u, t, e, r),
                        u != null
                            && u.isTabStatus(Model.TAG_IS_KEEP_OUT)
                            && (u.doKeepAtkTime(this),
                            u.setTabStatus(false, Model.TAG_IS_KEEP_OUT)))
        }
        if (s) {
          let g = e.getPowerValue(Define.POWER_SKILL_HP)
          g < 0 && (g = 0)
          let S = e.getPowerValue(Define.POWER_SKILL_HP_PERCENT)
          S > 0 && (g += (S * t.get(Model.HPMAX)) / 100),
          g > 0 && Define.processBattleHpMpPower(t, Model.HP, g, 0, r),
          (g = e.getPowerValue(Define.POWER_SKILL_MP)),
          g < 0 && (g = 0),
          (S = e.getPowerValue(Define.POWER_SKILL_MP_PERCENT)),
          S > 0 && (g += (S * t.get(Model.MPMAX)) / 100),
          g > 0 && Define.processBattleHpMpPower(t, Model.MP, g, 0, r)
        }
        for (var m = new Array(r.length), _ = 0; _ < r.length; _++)
          m[_] = r[_]
        a.setSubControlList(m)
      }
    }
  }

  doAttack(t, e) {
    if (
      t != null
            && !t.isDeadNoWithDelay()
            && !t.isBattleStatus(Player.BSTATUS_ESCAPE)
            && !t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_STUN))
            && (t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_CHAO))
                && (e = MonsterAI.selectRandActivePlayer(this, t)),
            this.isValidPos(e))
    ) {
      let n = this.getPlayerByPos(e)
      if (
        n != null
                && ((!n.isDeadNoWithDelay()
                    && !n.isBattleStatus(Player.BSTATUS_ESCAPE))
                    || ((e = MonsterAI.selectRandTarget(this, t, true)),
                    (n = this.getPlayerByPos(e)),
                    n != null))
      ) {
        this.atkType = t.getAttackTypeBySkill(null)
        let i = this.getGrardPet(n, this.atkType, true)
        if (i != null) { n = i }
        else {
          let o = this.getGuardPos(n.position, this.atkType)
          n != null && n.keepout_atk_time > 0 && (o = -1),
          o >= 0
                        && ((i = this.getPlayerByPos(o)),
                        this.isValidBattlePlayer(i) && (n = i))
        }
        const a = t.getAttakAnimePos()
        const r = t.getAttackRangeAnime()
        const s = Control.createBattleUseSkillControl(
          t.position,
          e,
          -1,
          a,
          Battle.ANIME_TYPE_PHYSIC,
          r,
          0,
          null,
        )
        this.addAniControl(s)
        const l = []
        if (
          !n?.isBattleStatus(Player.BSTATUS_ESCAPE)
                    && !n?.isDeadNoWithDelay()
        ) {
          n != null && n.setTabStatus(false, Model.TAG_IS_KEEP_OUT),
          this.calDamage(t, n, null, l, 1),
          n != null
                        && n.isTabStatus(Model.TAG_IS_KEEP_OUT)
                        && (n.doKeepAtkTime(this),
                        n.setTabStatus(false, Model.TAG_IS_KEEP_OUT))
          for (var _ = new Array(l.length), h = 0; h < l.length; h++)
            _[h] = l[h]
          s.setSubControlList(_)
        }
      }
    }
  }

  setSkillGuardData(t, e, n) {
    if (t != null && !(n == null || n.length <= 0)) {
      const i = t.power1
      if (
        !(
          i < Define.POWER_GUARD_STR_ATTACK
                    || i > Define.POWER_GUARD_ALL_ATTACK
        )
      ) {
        const o = t.powerValue1
        if (!(o <= 0)) {
          for (let a = 0; a < n.length; a++) {
            const r = n[a]
            this.addGuardData(r, i, e, o)
          }
        }
      }
    }
  }

  addGuardData(e, n, i, o) {
    if (!(e < 0 || e >= Battle.MAX_POS)) {
      const a = Tool.setKeyXY(e, n)
      const r = Tool.setKeyXY(i, o)
      this.guardHash[a] = r
    }
  }

  getGrardPet(t, e, n) {
    if (t == null || t.getType() != 3)
      return null
    if (e == Define.ATKTYPE_BLESS)
      return null
    if (this.isValidBattlePlayer(t) == false)
      return null
    if (t != null && t.keepout_atk_time > 0 && n)
      return null
    const i = this.getPlayerPet(t.position)
    if (i == null)
      return null
    if (this.isValidBattlePlayer(i) == false)
      return null
    if (i.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_STUN)))
      return null
    if (i.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_CHAO)))
      return null
    let o = false
    switch (e) {
      case Define.ATKTYPE_STR:
      case Define.ATKTYPE_RANGE_STR:
        o = this.isPetSucessGrard(
          t,
          i,
          Define.POWER_PET_GRARD_STR_ATTACK,
          Define.POWER_GRARD_MASTER_STR_ATTACK,
        )
        break
      case Define.ATKTYPE_AGI:
      case Define.ATKTYPE_RANGE_AGI:
        o = this.isPetSucessGrard(
          t,
          i,
          Define.POWER_PET_GRARD_AGI_ATTACK,
          Define.POWER_GRARD_MASTER_AGI_ATTACK,
        )
        break
      case Define.ATKTYPE_MAGIC:
        o = this.isPetSucessGrard(
          t,
          i,
          Define.POWER_PET_GRARD_MAGIC_ATTACK,
          Define.POWER_GRARD_MASTER_MAGIC_ATTACK,
        )
        break
      case Define.ATKTYPE_CURSE:
        o = this.isPetSucessGrard(
          t,
          i,
          Define.POWER_PET_GRARD_CURSE_ATTACK,
          Define.POWER_GRARD_MASTER_CURSE_ATTACK,
        )
    }
    return o ? i : null
  }

  getGuardPos(e, n) {
    if (this.getGuardHashSize() <= 0)
      return -1
    if (e < 0 || e >= Battle.MAX_POS)
      return -1
    if (n == Define.ATKTYPE_BLESS)
      return -1
    let i = 0
    const o = Tool.setKeyXY(e, Define.POWER_GUARD_ALL_ATTACK)
    const a = this.guardHash[o]
    a != null && (i = a)
    let r = 0
    let s = -1
    switch (n) {
      case Define.ATKTYPE_STR:
      case Define.ATKTYPE_RANGE_STR:
        s = this.guardHash[Tool.setKeyXY(e, Define.POWER_GUARD_STR_ATTACK)]
        break
      case Define.ATKTYPE_AGI:
      case Define.ATKTYPE_RANGE_AGI:
        s = this.guardHash[Tool.setKeyXY(e, Define.POWER_GUARD_AGI_ATTACK)]
        break
      case Define.ATKTYPE_MAGIC:
        s = this.guardHash[Tool.setKeyXY(e, Define.POWER_GUARD_MAGIC_ATTACK)]
        break
      case Define.ATKTYPE_CURSE:
        s = this.guardHash[Tool.setKeyXY(e, Define.POWER_GUARD_CURSE_ATTACK)]
    }
    if (a == null && s == -1)
      return -1
    s != null && (r = s)
    const l = Tool.getXKey(i)
    const _ = Tool.getYKey(i)
    let h = Tool.getXKey(r)
    let u = Tool.getYKey(r)
    return (
      _ > u && ((u = _), (h = l)), u > 0 && this.randInt(100) < u ? h : -1
    )
  }

  getGuardHashSize() {
    let t = 0
    for (const e in this.guardHash) t += 1
    return t
  }

  getPlayerPet(e) {
    const n = this.getPlayerByPos(e)
    if (n == null || n.getType() != 3)
      return null
    let i = e - 1
    Battle.isLeftSide(e) && (i = e + 1)
    const o = this.getPlayerByPos(i)
    return o == null ? null : o.getType() != 4 ? null : o
  }

  isPetSucessGrard(t, e, n, i) {
    if (t == null || e == null)
      return false
    let o = t.getSkillPowerValue(
      Define.SKILL_TYPE_PASSIVE,
      Define.POWER_PET_GRARD_ALL_ATTACK,
    )
    let a = e.getSkillPowerValue(
      Define.SKILL_TYPE_PASSIVE,
      Define.POWER_GRARD_MASTER_ALL_ATTACK,
    )
    let r = t.getSkillPowerValue(Define.SKILL_TYPE_PASSIVE, n)
    return (
      r > o && (o = r),
      o > 0 && this.randInt(100) < o
        ? true
        : ((r = e.getSkillPowerValue(Define.SKILL_TYPE_PASSIVE, i)),
          r > a && (a = r),
          !!(a > 0 && this.randInt(100) < a))
    )
  }

  processSkillPower(t, e, n, i) {
    t != null
            && n != null
            && (n.power1 > 0
                && Define.processBattlePower(
                  this,
                  t,
                  e,
                  n,
                  n.power1,
                  n.powerValue1,
                  n.statusBit1,
                  n.round,
                  n.anime3,
                  i,
                ),
            n.power2 > 0
                && Define.processBattlePower(
                  this,
                  t,
                  e,
                  n,
                  n.power2,
                  n.powerValue2,
                  n.statusBit2,
                  n.round,
                  n.anime3,
                  i,
                ),
            n.power3 > 0
                && Define.processBattlePower(
                  this,
                  t,
                  e,
                  n,
                  n.power3,
                  n.powerValue3,
                  n.statusBit3,
                  n.round,
                  n.anime3,
                  i,
                ))
  }

  isExpendHp(t, e) {
    if (t == null)
      return true
    if (e == Define.ATKTYPE_CURSE || e == Define.ATKTYPE_BLESS) {
      let n = t.getPowerValue(Define.POWER_HP)
      return n < 0
        ? true
        : ((n = t.getPowerValue(Define.POWER_HP_PERCENT)), n < 0)
    }
    return true
  }

  searchAICursor(t, e) {
    return this.searchAICursorByRandom(t, e, false)
  }

  searchAICursorByRandom(e, n, i) {
    if (e == null)
      return 0
    switch (n) {
      case Define.SKILL_AREA_ENEMY_HP_LEAST:
        return MonsterAI.selectValueTarget(
          this,
          e,
          Define.AI_HP_MIN_ENEMY,
          true,
        )
      case Define.SKILL_AREA_ENEMY_HP_MOST:
        return MonsterAI.selectValueTarget(
          this,
          e,
          Define.AI_HP_MAX_ENEMY,
          true,
        )
      case Define.SKILL_AREA_ME_HP_LEAST:
        return MonsterAI.selectValueTarget(
          this,
          e,
          Define.AI_HP_MIN_FRIEND,
          false,
        )
      case Define.SKILL_AREA_ME_HP_MOST:
        return MonsterAI.selectValueTarget(
          this,
          e,
          Define.AI_HP_MAX_FRIEND,
          false,
        )
      case Define.SKILL_AREA_PLAYER_AND_PET:
        return e.position
    }
    let o = 0
    let a = Battle.MAX_POS
    const r = Define.getSearchTypeByArea(n)
    switch (r) {
      case Define.SKILL_AREA_SEARCH_ALL:
        if (n != Define.SKILL_AREA_SINGLE)
          break
      case Define.SKILL_AREA_SEARCH_ENEMY:
        Battle.isLeftSide(e.position)
          ? ((o = Battle.LEFT_MAX_POS), (a = Battle.MAX_POS))
          : ((o = 0), (a = Battle.LEFT_MAX_POS))
        break
      case Define.SKILL_AREA_SEARCH_FRIEND:
        Battle.isLeftSide(e.position)
          ? ((o = 0), (a = Battle.LEFT_MAX_POS))
          : ((o = Battle.LEFT_MAX_POS), (a = Battle.MAX_POS))
        break
      case Define.SKILL_AREA_SEARCH_MY_SELF:
        return e.position
      case Define.SKILL_AREA_SEARCH_MY_OWNER:
        return this.getPetOwnerPos(e)
    }
    for (
      var s = o, l = 0, _ = Define.getSkillAreaPlayerNum(n), h = {}, u = o;
      a > u;
      u++
    ) {
      if (_ != Define.SKILL_AREA_CURSOR_ALL) {
        const c = this.getSelectArea(e.position, u, n)
        const T = this.countNotNullPlayerPos(c)
        if (i) {
          if (T > 0) {
            var p = h[T]
            p == null && ((p = []), (h[T] = p)), p.push(u), T > l && (l = T)
          }
        }
        else {
          if (T == Define.getSkillAreaPlayerNum(n))
            return u
          T > l && ((l = T), (s = u))
        }
      }
      else {
        if (
          (n == Define.SKILL_AREA_ME_ALL_NO_SELF
                        || n == Define.SKILL_AREA_ALL_NO_SELF)
                    && u == e.position
        )
          continue
        const d = this.getPlayerByPos(u)
        if (this.isValidBattlePlayer(d) == true)
          return u
      }
    }
    if (i) {
      let E = 0
      for (const g in h) E += 1
      if (E > 0) {
        var p = h[l]
        if (p && p.length > 0) {
          const S = Tool.randByRange(p.length)
          const m = p[S]
          return m
        }
      }
    }
    return s
  }

  isSameSide(e, n) {
    const i = Battle.getPositionSide(e)
    const o = Battle.getPositionSide(n)
    return i == o
  }

  isValidPosByCursor(e, n) {
    let i = 0
    let o = 2 * this.rowLeft
    return (
      Battle.isLeftSide(e) == false && ((i = Battle.LEFT_MAX_POS), (o = Battle.MAX_POS)),
      !(i > n || n >= o)
    )
  }

  isValidBattlePlayer(t, e?: any, n?: any) {
    if ((void 0 === e && (e = false), void 0 === n && (n = false), t == null))
      return false
    if (t.isBattleStatus(Player.BSTATUS_ESCAPE)) {
      if (n) {
        var i = t.battleSprite && t.battleSprite.isSpriteVisible()
        if (i)
          return true
      }
      return false
    }
    if (t.isDeadNoWithDelay()) {
      if (e) {
        var i = t.battleSprite && t.battleSprite.isSpriteVisible()
        const o = t.dieSprite && !t.dieSprite.isAllAniStop
        if (i || o)
          return true
      }
      return false
    }
    return true
  }

  countNotNullPlayerPos(t) {
    if (t == null || t.length <= 0)
      return 0
    for (var e = 0, n = 0; n < t.length; n++) {
      const i = this.getPlayerByPos(t[n])
      this.isValidBattlePlayer(i) != false && e++
    }
    return e
  }

  getColumnTypeTarget(e, n, i) {
    for (var o: any[] = [], a = 0; n > a; a++) {
      let r = 0
      if (a % 2 == 0) {
        if (i == 1 && a == 0) {
          Battle.getLeftRightTypeTarget(o, e)
          continue
        }
        r = e - 2 * Math.floor(a / 2)
      }
      else { r = e + 2 * (Math.floor(a / 2) + 1) }
      this.isValidPosByCursor(e, r) != false && o.push(r)
    }
    return o
  }

  getRowTypeTarget(e, n) {
    for (var i = [], o = 0; n > o; o++) {
      let a = 0;
      (a
                = o % 2 == 0
          ? e - 2 * Math.floor(o / 2)
          : e + 2 * (Math.floor(o / 2) + 1)),
      this.isValidPosByCursor(e, a) != false && Battle.getLeftRightTypeTarget(i, a)
    }
    return i
  }

  getLeftPosNum() {
    return 2 * this.rowLeft
  }

  getRightPosNum() {
    return 2 * this.rowRight
  }

  getAllTypeTarget(e, n, i) {
    let o = 0
    let a = Battle.MAX_POS
    e == Battle.LEFT_SIDE
      ? ((o = 0), (a = o + this.getLeftPosNum()))
      : e == Battle.RIGHT_SIDE
            && ((o = Battle.LEFT_MAX_POS), (a = o + this.getRightPosNum()))
    const r = a - o
    if (r <= 0)
      return null
    const s = new Array(r)
    let l = true
    n >= 0
            && (i == Define.SKILL_AREA_ME_ALL_NO_SELF
                || i == Define.SKILL_AREA_ALL_NO_SELF)
            && (l = false)
    for (var _ = 0, h = o; a > h; h++) (l != false || h != n) && (s[_++] = h)
    if (_ > r)
      return null
    const u = new Array(_)
    return Tool.arraycopy(s, 0, u, 0, _), u
  }

  getSelectArea(e, n, i) {
    const o = Define.getSearchTypeByArea(i)
    switch (o) {
      case Define.SKILL_AREA_SEARCH_ALL:
        break
      case Define.SKILL_AREA_SEARCH_ENEMY:
        if (this.isSameSide(e, n) == true)
          return null
        break
      case Define.SKILL_AREA_SEARCH_FRIEND:
        if (this.isSameSide(e, n) == false)
          return null
        break
      case Define.SKILL_AREA_SEARCH_MY_SELF:
        return e != n ? null : [n]
      case Define.SKILL_AREA_SEARCH_MY_OWNER:
        return [n]
    }
    let a: any = null
    let r: any[] = []
    switch (i) {
      case Define.SKILL_AREA_SINGLE:
      case Define.SKILL_AREA_ENEMY_SINGLE:
      case Define.SKILL_AREA_ME_SIGHLE:
        r = this.getColumnTypeTarget(n, 1, false)
        break
      case Define.SKILL_AREA_PLAYER_AND_PET:
      case Define.SKILL_AREA_FRONT_BACK_TWO:
      case Define.SKILL_AREA_ENEMY_FONT_BACK_TWO:
      case Define.SKILL_AREA_ME_FONT_BACK_TWO:
        r = this.getRowTypeTarget(n, 1)
        break
      case Define.SKILL_AREA_UP_DOWN_TWO:
      case Define.SKILL_AREA_ENEMY_UP_DOWN_TWO:
      case Define.SKILL_AREA_ME_UP_DOWN_TWO:
        r = this.getColumnTypeTarget(n, 2, false)
        break
      case Define.SKILL_AREA_UP_DOWN_THREE:
      case Define.SKILL_AREA_ENEMY_UP_DOWN_THREE:
      case Define.SKILL_AREA_ME_UP_DOWN_THREE:
        r = this.getColumnTypeTarget(n, 3, false)
        break
      case Define.SKILL_AREA_UP_DOWN_FOUR:
      case Define.SKILL_AREA_ENEMY_UP_DOWN_FOUR:
      case Define.SKILL_AREA_ME_UP_DOWN_FOUR:
        r = this.getColumnTypeTarget(n, 4, false)
        break
      case Define.SKILL_AREA_UP_DOWN_FIVE:
      case Define.SKILL_AREA_ENEMY_UP_DOWN_FIVE:
      case Define.SKILL_AREA_ME_UP_DOWN_FIVE:
        r = this.getColumnTypeTarget(n, 5, false)
        break
      case Define.SKILL_AREA_TEN:
      case Define.SKILL_AREA_ENEMY_TEN:
      case Define.SKILL_AREA_ME_TEN:
        r = this.getColumnTypeTarget(n, 3, true)
        break
      case Define.SKILL_AREA_SQUARE:
      case Define.SKILL_AREA_ENEMY_SQUARE:
      case Define.SKILL_AREA_ME_SQUARE:
        r = this.getRowTypeTarget(n, 2)
        break
      case Define.SKILL_AREA_AROUND_SIX:
      case Define.SKILL_AREA_ENEMY_AROUND_SIX:
      case Define.SKILL_AREA_ME_AROUND_SIX:
        r = this.getRowTypeTarget(n, 3)
        break
      case Define.SKILL_AREA_ALL:
      case Define.SKILL_AREA_ENEMY_ALL:
      case Define.SKILL_AREA_ME_ALL:
      case Define.SKILL_AREA_ME_ALL_NO_SELF:
      case Define.SKILL_AREA_ALL_NO_SELF:
        var s = Battle.getPositionSide(n);
        (i == Define.SKILL_AREA_ALL || i == Define.SKILL_AREA_ALL_NO_SELF)
                    && (s = -1),
        (a = this.getAllTypeTarget(s, e, i))
        break
      case Define.SKILL_AREA_ENEMY_HP_LEAST:
      case Define.SKILL_AREA_ENEMY_HP_MOST:
      case Define.SKILL_AREA_ME_HP_LEAST:
      case Define.SKILL_AREA_ME_HP_MOST:
        return [n]
    }
    if (
      r != null
            && r.length > 0
            && ((a = Battle.getTarget(r)), i == Define.SKILL_AREA_PLAYER_AND_PET)
    ) {
      let l = false
      if (a != null && a.length > 0)
        for (var _ = 0; _ < a.length; _++) a[_] == e && (l = true)
      if (l == false)
        return null
    }
    if (a != null) {
      for (var _ = 0; _ < a.length; _++)
        for (let h = a[_], u = _ + 1; u < a.length; u++) a[u] == h
    }
    return a
  }

  isInvalidePos(e) {
    return e < 0 || e > Battle.MAX_POS
  }

  getPlayerByPos(t) {
    return this.playerList == null
      ? null
      : this.isInvalidePos(t)
        ? null
        : this.playerList[t]
  }

  getPetOwnerPos(t) {
    if (t == null)
      return -1
    if (t instanceof Pet) {
      const e = t
      if (e.owner != null)
        return e.owner.position
    }
    return t.position
  }

  getAutoSkillIDByRound(t) {
    if (t == null)
      return -1
    if (t.autoSkillID == null)
      return -2
    let e = -1
    const n = t.getAutoSkillCount()
    if (n <= 0)
      return -3
    const i = this.round % n
    return i >= 0 && i < t.autoSkillID.length && (e = t.autoSkillID[i]), e
  }

  sortModelListBySpeed() {
    const t: any[] = []
    if (this.playerList == null)
      return t
    for (let e = 0; e < this.playerList.length; e++) {
      const n = this.playerList[e]
      if (n != null) {
        for (var i = 0; ;) {
          if (i >= t.length)
            break
          const o = t[i]
          if (n.get(Model.SPEED) > o.get(Model.SPEED)) {
            t.splice(i, 0, n)
            break
          }
          i++
        }
        i == t.length && t.push(n)
      }
    }
    return t
  }

  doRoundHpMp(t) {
    const e = t.get(Model.HEAL_RECOVERY)
    const n = t.get(Model.MANA_RECOVERY)
    const i = []
    if (e > 0) {
      var o = true;
      (t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_BURN))
                || t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_BLOOD)))
                && (o = false),
      o && Define.processBattleHpMpPower(t, Model.HP, e, 0, i)
    }
    if (n > 0) {
      var o = true
      t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_POISON))
                && (o = false),
      o && Define.processBattleHpMpPower(t, Model.MP, n, 0, i)
    }
    for (let a = 0; a < i.length; a++) {
      const r = i[a]
      this.addAniControl(r)
    }
  }

  doRoundBuffer() {
    for (let t = 0; t < this.playerList.length; t++) {
      const e: any = this.playerList[t]
      if (e != null) {
        if (e?.isDeadNoWithDelay?.()) {
          const n = e.isHaveCanNotReliveBuffer()
          n && e.runBufferList(true)
        }
        else if (!e.isBattleStatus(Player.BSTATUS_ESCAPE)) {
          let i = e.runBufferList(true)
          if (((i = this.mergeControlList(i, true)), i != null)) {
            for (let o = 0; o < i.length; o++) {
              const a = i[o]
              this.addAniControl(a)
            }
          }
        }
      }
    }
  }

  calInsight(t, e, n, i) {
    if (
      this.atkType != Define.ATKTYPE_MAGIC
            && this.atkType != Define.ATKTYPE_CURSE
    )
      return false
    let o = 0
    if ((n != null && n.useMP > 0 && (o = n.useMP), e.get(Model.MP) < o))
      return false
    const a = this.calc(Battle.BATTLE_INSIGHT, e, t, n)
    if (a <= 0)
      return false
    const r = this.randInt(100)
    const s = a > r
    if (s)
      e.addValue(Model.MP, -o)
    // var l = new DamageData();
    // this.dealDamageEffect(l, t, e, n, i, i);

    return s
  }

  calDamage(e, n, i, o, a) {
    if (e == null)
      return false
    if (n == null)
      return false
    const r
            = i != null
            && Define.getSkillAreaPlayerNum(i.area) != Define.SKILL_AREA_CURSOR_1
    if (
      r
            && this.atkType != Define.ATKTYPE_MAGIC
            && this.atkType != Define.ATKTYPE_CURSE
            && n.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_HIDE))
    )
      return false
    if (this.atkType == Define.ATKTYPE_BLESS) {
      var s = new DamageData()
      return (
        (s.damageEffect |= Battle.EFFECT_HIT),
        this.dealDamageEffect(s, e, n, i, o, o),
        true
      )
    }
    if (n.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_INVINCIBLE)))
      return false
    if (
      n.isBattleStatus(
        Define.getBufferBitValue(Define.BUFFER_RESIST_MAGIC),
      )
            && Define.isPhysicalAtkType(this.atkType) == false
    )
      return false
    if (
      n.isBattleStatus(
        Define.getBufferBitValue(Define.BUFFER_RESIST_PHYSIC),
      )
            && Define.isPhysicalAtkType(this.atkType) == true
    )
      return false
    if (this.calInsight(e, n, i, o))
      return false;
    (this.isLeftHand = true),
    (this.block = 0),
    (this.totalHitTime = e.get(Model.ATK_TIME)),
    i && (this.totalHitTime += i.atk_time),
    (this.totalHitTime = Tool.sumValue(
      this.totalHitTime,
      0,
      Model.MIN_HIT_TIME,
      Model.MAX_HIT_TIME,
    )),
    Define.isPhysicalAtkType(this.atkType) == true
            && (this.block = this.calc(Battle.BATTLE_BLOCK, n, e, i))
    const l = e.get(Model.LEFT_ATK_TIME)
    const _ = e.get(Model.RIGHT_ATK_TIME)
    const h = l > 0 && _ > 0
    l <= 0 && _ > 0 && (this.isLeftHand = false)
    for (var u = false, c = [], T = [], p = 0; p < this.totalHitTime; p++) {
      var s = this.calcDirectDamage(e, n, i, a)
      if (
        (h && (this.isLeftHand = !this.isLeftHand),
        s != null
                    && DamageData.isEffectStatus(s.damageEffect, Battle.EFFECT_HIT)
                    && (u = true),
        u && (this.block -= Battle.BLOCK_HIT_REDUCE),
        this.dealDamageEffect(s, e, n, i, c, T),
        n.isDead() == 1)
      ) {
        this.checkDie1Hp(n, null)
        break
      }
    }
    let d = Battle.MAX_SHOW_HIT_2
    i != null
            && Define.getSkillAreaPlayerNum(i.area) > Define.SKILL_AREA_CURSOR_2
            && (d = Battle.MAX_SHOW_HIT)
    c.length >= d && (c = this.mergeControlList(c, false)),
    (T = this.mergeControlList(T, false))
    for (let E = 0, g = c; E < g.length; E++) {
      const S = g[E]
      o.push(S)
    }
    for (let m = 0, f = T; m < f.length; m++) {
      const I = f[m]
      o.push(I)
    }
    return u
  }

  calcDirectDamage(t, e, n, i) {
    const o = new DamageData()
    if (t == null)
      return o
    if (e == null)
      return o
    let a = 0
    const r = this.calc(Battle.BATTLE_HITRATE, t, e, n)
    a = this.randInt(100)
    let s = r > a
    let l = this.calc(Battle.BATTLE_DAMAGE, t, e, n)
    let _ = 0
    e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_WEAK))
            && (_ += 20),
    e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_BLOOD))
            && (_ += 10),
    _ > 0 && (l += ((l * _) / 100) >> 0)
    const h = this.calc(Battle.BATTLE_CRI_RATE, t, e, n)
    a = this.randInt(100)
    const u = h > a
    if (
      (u
                && ((l = ((15 * l) / 10) >> 0),
                (o.damageEffect |= Battle.EFFECT_CRITICAL)),
      s
                && this.block > 0
                && ((a = this.randInt(100)),
                a < this.block && (s = false),
                (o.damageEffect |= Battle.EFFECT_BLOCK)),
      s)
    ) {
      l > 0
                && e.keepout_atk_time > 0
                && (e.isTabStatus(Model.TAG_IS_KEEP_OUT) == 0
                    && (o.damageEffect |= Battle.EFFECT_KEEPOUT),
                e.setTabStatus(true, Model.TAG_IS_KEEP_OUT),
                (l = 0)),
      (o.damageBackValue = this.calBackValue(t, e, n, l))
      let c = l;
      (l = this.calTouchDmg(e, t, n, l)),
      c != l && (o.damageEffect |= Battle.EFFECT_TOUCH),
      (c = l),
      (l = this.calDefFieldDmg(e, l)),
      c != l
                && ((o.damageEffect |= Battle.EFFECT_DEF_FIELD),
                (o.magicDefDamageValue = c - l))
    }
    return (
      (o.damageValue = l),
      s
            && ((o.damageEffect |= Battle.EFFECT_HIT),
            (o.damageHpGet = this.calHPMPGetValue(t, n, l, true, i)),
            (o.damageMpGet = this.calHPMPGetValue(t, n, l, false, i))),
      o
    )
  }

  dealDamageEffect(t, e, n, i, o, a) {
    const r = DamageData.isEffectStatus(t.damageEffect, Battle.EFFECT_HIT)
    const s = -t.damageValue
    r && (n.addValue(Model.HP, s), e.addValue(Model.ARGO, -s)),
    n.isDeadNoWithDelay() && (t.damageEffect |= Battle.EFFECT_DIE)
    let l = Control.createBattleTargetEffect(
      false,
      n.position,
      s,
      t.damageEffect,
      0,
      t.magicDefDamageValue,
    )
    if ((o.push(l), r)) {
      const _ = t.damageHpGet
      _ > 0
                && (e.addValue(Model.HP, _),
                (l = Control.createBattleTargetEffectOther(
                  e.position,
                  _,
                  Battle.EFFECT_HIT,
                  0,
                )),
                a.push(l))
      const h = t.damageMpGet
      h > 0
                && (e.addValue(Model.MP, h),
                (l = Control.createBattleTargetEffectOther(
                  e.position,
                  h,
                  Battle.EFFECT_HIT | Battle.EFFECT_MP_CHANGE,
                  0,
                )),
                a.push(l))
      const u = -t.damageBackValue
      if (u != 0) {
        e.addValue(Model.HP, u), n.addValue(Model.ARGO, -u)
        let c = Battle.EFFECT_HIT
        e.isDeadNoWithDelay()
                    && ((c |= Battle.EFFECT_DIE), this.checkDie1Hp(e, null)),
        (l = Control.createBattleTargetEffectOther(e.position, u, c, 0)),
        a.push(l)
      }
    }
  }

  isWilSuccess(e, n, i) {
    let o = e.get(Model.WIL)
    if (
      (i != null && (o -= i.getPowerValue(Define.POWER_SKILL_TARGET_WIL)),
      n != null && e != n && (o -= n.get(Model.IGNORE_WIL)),
      o <= 0)
    )
      return false
    o > Battle.MAX_RATE_WIL && (o = Battle.MAX_RATE_WIL)
    const a = this.randInt(1e3)
    return o > a
  }

  calTouchDmg(e, n, i, o) {
    if (e == null)
      return o
    let a = Battle.calTouch(e)
    if (
      (i != null && (a -= i.getPowerValue(Define.POWER_SKILL_TARGET_TOUCH)),
      n && e != n && (a -= n.get(Model.IGNORE_TOUCH)),
      a > Battle.MAX_RATE_TOUCH && (a = Battle.MAX_RATE_TOUCH),
      a <= 0)
    )
      return o
    let r = o - (((o * a) / 1e3) >> 0)
    return r < 0 && (r = 0), r
  }

  calHPMPGetValue(e, n, i, o, a) {
    if (e == null)
      return 0
    if (e.isDead())
      return 0
    a <= 0 && (a = 1)
    let r = 0
    if (o) {
      if (e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_BURN)))
        return 0;
      (r = e.get(Model.LIFE_ABSORPTION)),
      n != null
                && (r += n.getPowerValue(Define.POWER_SKILL_LIFE_ABSORPTION))
    }
    else {
      if (e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_POISON)))
        return 0;
      (r = e.get(Model.MANA_ABSORPTION)),
      n != null
                && (r += n.getPowerValue(Define.POWER_SKILL_MANA_ABSORPTION))
    }
    if (((r = (r / a) >> 0), r <= 0))
      return 0
    r > Battle.MAX_RATE_HPMP_GET && (r = Battle.MAX_RATE_HPMP_GET)
    const s = ((i * r) / 1e3) >> 0
    return s
  }

  calBackValue(t, e, n, i) {
    let o = 0
    if (e.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_STUN)))
      return 0
    if (t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_INVINCIBLE)))
      return 0
    if (this.atkType == Define.ATKTYPE_MAGIC) {
      if (
        t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_RESIST_MAGIC))
      )
        return 0
      o = this.calc(Battle.BATTLE_MAGIC_BACK, e, t, n)
    }
    else if (Define.isPhysicalAtkType(this.atkType)) {
      if (
        t.isBattleStatus(
          Define.getBufferBitValue(Define.BUFFER_RESIST_PHYSIC),
        )
      )
        return 0
      o = this.calc(Battle.BATTLE_BACK, e, t, n)
    }
    if (o <= 0)
      return 0
    const a = this.randInt(100)
    const r = o > a
    if (r == false)
      return 0
    const s = ((i * o) / 100) >> 0
    return (
      this.atkType == Define.ATKTYPE_MAGIC
            || Define.isPhysicalAtkType(this.atkType),
      s
    )
  }

  randInt(t: number) {
    if (this.random == null)
      return 0
    const e = this.random.nextInt()
    return Math.abs(e) % t
  }

  calDefFieldDmg(t, e) {
    if (t == null || e == 0)
      return e
    const n = t.get(Model.DEF_FIELD)
    if (n <= 0)
      return e
    const i = t.get(Model.MP)
    let o = i
    if (o <= 0)
      return e
    o > n && (o = n)
    const a = Math.min(e, o)
    t.addValue(Model.MP, -a), t.addValue(Model.DEF_FIELD, -a)
    const r = e - a
    return r
  }

  calcWithType(t, e, n, i, o) {
    switch (t) {
      case Battle.BATTLE_DAMAGE:
        switch (e) {
          case Define.ATKTYPE_STR:
          case Define.ATKTYPE_RANGE_STR:
            return this.calc(Battle.BATTLE_DMG_STR, n, i, o)
          case Define.ATKTYPE_AGI:
          case Define.ATKTYPE_RANGE_AGI:
            return this.calc(Battle.BATTLE_DMG_AGI, n, i, o)
          case Define.ATKTYPE_MAGIC:
            return this.calc(Battle.BATTLE_DMG_MAGIC, n, i, o)
          case Define.ATKTYPE_CURSE:
            return 0
          default:
            return 0
        }
      case Battle.BATTLE_HITRATE:
        switch (e) {
          case Define.ATKTYPE_STR:
          case Define.ATKTYPE_RANGE_STR:
            return this.calc(Battle.BATTLE_STR_HITRATE, n, i, o)
          case Define.ATKTYPE_AGI:
          case Define.ATKTYPE_RANGE_AGI:
            return this.calc(Battle.BATTLE_AGI_HITRATE, n, i, o)
          case Define.ATKTYPE_MAGIC:
          case Define.ATKTYPE_CURSE:
            return this.calc(Battle.BATTLE_MAGIC_HITRATE, n, i, o)
          case Define.ATKTYPE_BLESS:
            return 100
          default:
            return 0
        }
    }
    return 0
  }

  randRange(min: number, max: number) {
    if (min == max)
      return min
    const n = this.randInt(max - min + 1)
    return min + n
  }

  calc(t: number, e, n, i) {
    let o = 0
    switch ((i == null && (i = Skill.DUMMY_SKILL), t)) {
      case Battle.BATTLE_DAMAGE:
        var a = this.calcWithType(
          Battle.BATTLE_DAMAGE,
          e.getAttackTypeBySkill(i),
          e,
          n,
          i,
        )
        return a
      case Battle.BATTLE_HITRATE:
        var r = this.calcWithType(
          Battle.BATTLE_HITRATE,
          e.getAttackTypeBySkill(i),
          e,
          n,
          i,
        )
        return r
      case Battle.BATTLE_STR_HITRATE:
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
      case Battle.BATTLE_AGI_HITRATE:
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
      case Battle.BATTLE_MAGIC_HITRATE:
        (o = e.get(Model.HIT_MAGIC)),
        (o += i.getPowerValue(Define.POWER_SKILL_HITRATE))
        var _ = this.getLevelIncludeLevel2(n)
        return _ <= 0 && (_ = 1), (o = ((10 * o) / _) >> 0)
      case Battle.BATTLE_DMG_STR:
        var h = this.calc(Battle.BATTLE_RD_STR, n, e, i)
        var u = this.calc(Battle.BATTLE_AP_STR, e, n, i)
        var c = this.randRange(
          Battle.BATTLE_DMG_MIN,
          Battle.BATTLE_DMG_MAX,
        )
        var T = (100 - h) * u * c
        return (
          u > 0 && c > 0 && 100 - h > 0 && T < 0 && (T = Tool.MAX_VALUE_int),
          (o = (T / 1e4) >> 0),
          o <= 0 && (o = 1),
          o
        )
      case Battle.BATTLE_AP_STR:
        var p = this.calc(Battle.BATTLE_RAND_ATC, e, n, i)
        return (o
                    = (((e.get(Model.ATK_STR) / this.totalHitTime) >> 0)
                        + p
                        + i.getPowerValue(Define.POWER_SKILL_DAMAGE) / this.totalHitTime)
                    >> 0)
      case Battle.BATTLE_RD_STR:
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
          o > Battle.BATTLE_RD_MAX
            ? (o = Battle.BATTLE_RD_MAX)
            : o < 0 && (o = 0),
          o
        )
      case Battle.BATTLE_DMG_AGI:
        var d = this.calc(Battle.BATTLE_RD_AGI, n, e, i)
        var E = this.calc(Battle.BATTLE_AP_AGI, e, n, i)
        var g = this.randRange(
          Battle.BATTLE_DMG_MIN,
          Battle.BATTLE_DMG_MAX,
        )
        var S = (100 - d) * E * g
        return (
          100 - d > 0 && E > 0 && g > 0 && S < 0 && (S = Tool.MAX_VALUE_int),
          (o = (S / 1e4) >> 0),
          o <= 0 && (o = 1),
          o
        )
      case Battle.BATTLE_AP_AGI:
        var p = this.calc(Battle.BATTLE_RAND_ATC, e, n, i)
        return (o
                    = ((e.get(Model.ATK_AGI) / this.totalHitTime) >> 0)
                    + p
                    + ((i.getPowerValue(Define.POWER_SKILL_DAMAGE) / this.totalHitTime)
                        >> 0))
      case Battle.BATTLE_RD_AGI:
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
          o > Battle.BATTLE_RD_MAX
            ? (o = Battle.BATTLE_RD_MAX)
            : o < 0 && (o = 0),
          o
        )
      case Battle.BATTLE_DMG_MAGIC:
        var m = this.calc(Battle.BATTLE_RD_MAGIC, n, e, i)
        var f = this.calc(Battle.BATTLE_AP_MAGIC, e, n, i)
        var I = this.randRange(
          Battle.BATTLE_DMG_MIN,
          Battle.BATTLE_DMG_MAX,
        )
        var A = ((100 - m) * f * I) & 4294967295
        return (
          100 - m > 0 && f > 0 && I > 0 && A < 0 && (A = Tool.MAX_VALUE_int),
          (o = (A / 1e4) >> 0),
          o <= 0 && (o = 1),
          o
        )
      case Battle.BATTLE_AP_MAGIC:
        var p = this.calc(Battle.BATTLE_RAND_ATC, e, n, i)
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
      case Battle.BATTLE_RD_MAGIC:
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
          o > Battle.BATTLE_RD_MAX
            ? (o = Battle.BATTLE_RD_MAX)
            : o < 0 && (o = 0),
          o
        )
      case Battle.BATTLE_CRI_RATE:
        var R
                    = e.get(Model.CRITICAL)
                    + i.getPowerValue(Define.POWER_SELF_CRITICAL)
        var _ = this.getLevelIncludeLevel2(n)
        return _ <= 0 && (_ = 1), (R = ((15 * R) / _) >> 0)
      case Battle.BATTLE_RAND_ATC:
        return this.randRange(
          e.get(Model.ATK_MIN),
          e.get(Model.ATK_MAX),
        )
      case Battle.BATTLE_BLOCK:
        (o = e.get(Model.BLOCK)),
        (o -= i.getPowerValue(Define.POWER_SKILL_TARGET_BLOCK)),
        (o -= n.get(Model.IGNORE_BLOCK))
        var _ = this.getLevelIncludeLevel2(n)
        return (
          _ <= 0 && (_ = 1),
          (o = ((7 * o) / _) >> 0),
          o < 0 && (o = 0),
          o > Battle.MAX_BLOCK_TOUCH
                    && (o = Battle.MAX_BLOCK_TOUCH),
          o
        )
      case Battle.BATTLE_INSIGHT:
        (o = e.get(Model.INSIGHT)),
        (o -= i.getPowerValue(Define.POWER_SKILL_TARGET_INSIGHT)),
        (o -= n.get(Model.IGNORE_INSIGHT))
        var _ = this.getLevelIncludeLevel2(n)
        return (
          _ <= 0 && (_ = 1),
          (o = ((7 * o) / _) >> 0),
          o < 0 && (o = 0),
          o > Battle.MAX_INSIGHT_TOUCH
                    && (o = Battle.MAX_INSIGHT_TOUCH),
          o
        )
      case Battle.BATTLE_BACK:
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
      case Battle.BATTLE_MAGIC_BACK:
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

  getLevelIncludeLevel2(t: Player) {
    let e = t.get(Model.LEVEL)
    return (e += t.get(Model.LEVEL2))
  }
}

export namespace Battle {
  /**
     * local battle 发送给服务器进入战斗状态消息后, Battle是在本地战斗完毕后, 再将战斗过程和结果发送给服务器
     * @param seed
     * @param playerList
     * @param monsterGroup
     */
  export function createLocalBattle(seed: number, playerList: Player[], monsterGroup: MonsterGroup, player: Player) {
    return new Battle(seed, playerList, LOCAL, monsterGroup, player)
  }

  export function createRemoteBattle(e: Protocol, player: Player) {
    const n = e.getInt()
    const i = e.getByte()
    const o = e.getByte()
    const a = e.getByte()
    const r = e.getInt()
    const s = e.getInt()
    const l = e.getInt()
    const _ = e.getBoolean()

    const h: Model[] = new Array(MAX_POS)
    for (let u = e.getByte(), c = 0; u > c; c++) {
      const model = parseBattleModel(e, player)
      if (model)
        h[model.position] = model
    }

    const battle = new Battle(0, h as Player[], REMOTE, null, player)

    battle.type = i
    battle.setBattleResult(o)
    battle.round = a
    battle.roundEndTime = Date.now() + r
    battle.waitStatus = s
    battle.nextBattleGroupID = l
    battle.inOneKeyDaily = _
    battle.battleSeq = n
    battle.setRemoteWaiting(false)

    return battle
  }

  function parseBattleModel(e: Protocol, player: Player) {
    const n = e.getInt()
    const i = e.getByte()
    const o = e.getString()
    const a = e.getByte()
    const r = e.getInt()
    const s = e.getInt()
    const l = e.getInt()
    const _ = e.getInt()
    const h = e.getInt()
    let u = 0
    let c = 0
    let T = 0

    switch (i) {
      case 2:
      case 1:
      case 4:
        u = e.getInt()
        break
      default:
        (u = e.getInt()), (c = e.getInt()), (T = e.getInt())
    }

    let p = -1
    let d = false
    i == 5 && ((p = e.getShort()), (d = e.getBoolean()))
    const E = e.getInt()
    const g = e.getInt()
    let S: Skill | null = null
    const m = e.getBoolean()
    m && (S = Skill.fromByteFormationSkill(e))
    const f = e.getShort()
    if (player.getId() == n) {
      if (i == 4) {
        const A = player.getPet()
        return A == null
          ? null
          : (
              (A.position = a),
              (A.bStatus = h),
              (A.hp = r),
              (A.mp = l),
              A)
      }

      if (i == 5) {
        let y: any = player.getMercenaryById(p)
        if (y == null)
          return null
        if (d == false && ((y = y.getPet()), y == null))
          return null
        const R = y.clone()
        return (
          (R.worldMer = y),
          (R.position = a),
          (R.bStatus = h),
          (R.hp = r),
          (R.mp = l),
          R
        )
      }

      return (
        (player.position = a),
        (player.bStatus = h),
        (player.hp = r),
        (player.mp = l),
        player
      )
    }

    const P = new Monster()
    return (
      P.setType(i),
      P.setId(n),
      P.setName(o),
      (P.position = a),
      (P.hp = r),
      (P.hpMax = s),
      (P.mp = l),
      (P.mpMax = _),
      (P.bStatus = h),
      (P.bornStatus = E),
      (P.keepout_atk_time = g),
      (P.formationSkill = S),
      P
    )
  }

  export function isEffectStatus(t: number, e: number) {
    return (t & e) !== 0
  }

  export function getPositionSide(e: number) {
    return e < LEFT_MAX_POS ? LEFT_SIDE : RIGHT_SIDE
  }

  export function isLeftSide(e: number) {
    return getPositionSide(e) == LEFT_SIDE
  }

  export function getLeftRightTypeTarget(t, e) {
    t.push(e)
    const n = e % 2 == 0 ? e + 1 : e - 1
    t.push(n)
  }

  export function getTarget(t) {
    if (t == null)
      return null
    if (t.length <= 0)
      return null
    for (var e = new Array(t.length), n = 0; n < t.length; n++) {
      const i = t[n]
      i != null && (e[n] = i)
    }
    return e
  }

  export function calTouch(t: Player) {
    if (t == null)
      return 0
    let e = t.get(Model.TOUGH)
    return (
      t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_BLOOD))
            && (e = (e / 2) >> 0),
      t.isBattleStatus(Define.getBufferBitValue(Define.BUFFER_WEAK))
            && (e = (e / 2) >> 0),
      e <= 0 ? 0 : e
    )
  }

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
  export const MAX_POS = Battle.LEFT_MAX_POS + Battle.RIGHT_MAX_POS
  export const MAX_ROUND = 30
  export const NUM_COLUMN_1 = Battle.LEFT_MAX_POS / 2
  export const NUM_COLUMN_2 = Battle.NUM_COLUMN_1
  export const NUM_COLUMN_3 = Battle.RIGHT_MAX_POS / 2
  export const NUM_COLUMN_4 = Battle.NUM_COLUMN_3
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
