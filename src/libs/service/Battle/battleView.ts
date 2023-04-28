import { nato } from 'libs/base/nato'
import { ProtocolDefine } from 'libs/defined/protocol'
import { Battle } from './battle'

export class BattleView {
  tagValue = 0
  battle: Battle
  endCountTime = -1
  battlePosition = [[], []]
  playersColumn1 = new Array(Battle.NUM_COLUMN_1)
  playersColumn2 = new Array(Battle.NUM_COLUMN_2)
  playersColumn3 = new Array(Battle.NUM_COLUMN_3)
  playersColumn4 = new Array(Battle.NUM_COLUMN_4)
  animationControlList = []
  nextPollTime = 0
  waitNextBattleTime = 0
  planSequenceList: any

  constructor(b: Battle) {
    this.battle = b
  }

  logic() {
    if (this.isTag(Battle.TAG_WAITING_NEXT_BATTLE) != true) {
      if (this.isWin() && this.getNextBattleID() > 0 && !this.isTag(Battle.TAG_IS_BATTLE_SEE)) {
        this.setTag(Battle.TAG_WAITING_NEXT_BATTLE, true)
        this.waitNextBattleTime
          = Date.now() + BattleView.INTERVAL_NEXT_BATTLE_TIME
      }

      if (this.battle.isRemoteWaiting()) { this.battle.inputHandler.logicRemoteWaiting() }
      else {
        if (this.battle.isBattleFinish()) {
          this.battle.type == Battle.LOCAL
            || this.isTag(Battle.TAG_REMOTE_SEND)
            ? this.sendLocalBattleReward()
            : this.battle.setRemoteWaiting(true)
        }

        this.setTag(Battle.TAG_ALL_END, true)
        this.battle.inputHandler.logic()
      }
      switch (this.battle.type) {
        case Battle.LOCAL:
          break
        case Battle.REMOTE:
          {
            if (!this.isTag(Battle.TAG_REMOTE_SEND_WAITING))
              this.sendRemoteBattleUpdate()
          }
          break
      }
    }
    else {
      if (Date.now() >= this.waitNextBattleTime) { }

      if (this.battle.orderPlayer.isLeader()) {
        // TODO: nextBattle event
      }
    }

    if (!this.isWin())
      this.logic()
    else if (this.battle.type === Battle.LOCAL)
      this.sendLocalBattleReward()
  }

  sendLocalBattleReward() {
    const t = new nato.Message(ProtocolDefine.CG_FIGHT_RUN_LOCALBATTLE)

    t.putInt(this.battle.startHP),
    t.putInt(this.battle.startMP),
    t.putInt(this.battle.orderPlayer.hp),
    t.putInt(this.battle.orderPlayer.mp),
    t.putShort(this.battle.seed)
    const e = this.battle.monsterGroup
    let n = -1
    e && (n = e.groupId), t.putShort(n)
    const i = this.isTag(Battle.TAG_HAVE_MY_PET)
    t.putBoolean(i)
    const o = this.battle.inputHandler.planVector
    let a = o.length
    i && (a /= 2), t.putByte(a)
    for (let r = 0; r < o.length;) {
      const s = o[r++]
      s.position = 0
      if ((t.putBytes(s), i)) {
        let l: any = null
        r < o.length && (l = o[r++], l.position = 0), t.putBytes(l)
      }
    }

    this.battle._onBattleFinish.fire(t)
  }

  sendRemoteBattleUpdate() {

  }

  setTag(t: number, e: boolean) {
    e ? (this.tagValue |= t) : (this.tagValue &= ~t)
  }

  isTag(t: number) {
    return (this.tagValue & t) != 0
  }

  getNextBattleID() {
    return this.battle.nextBattleGroupID
  }

  checkMyPetInBattle() {
    this.setTag(Battle.TAG_HAVE_MY_PET, false)
    if (this.battle.orderPet)
      this.setTag(Battle.TAG_HAVE_MY_PET, true)
  }

  closePlayerAnimation() {
    for (let t = this.battle.playerList, n = 0; n < Battle.MAX_POS; n++) {
      const i = t[n]
      if (i != null) {
        for (let s = 0, l = i.battlePlanControlList; s < l.length; s++) {
          var _ = l[s]
          var h = _
          h.removeEffectFromStage()
        }
        (i.battlePlanControlList.length = 0)
      }
    }
    for (let c = 0, T = this.animationControlList; c < T.length; c++) {
      var _: any = T[c]
      var h = _
      h.removeEffectFromStage()
    }

    this.animationControlList.length = 0
    this.planSequenceList.length = 0
    this.setTag(Battle.TAG_ALL_END, true)
  }

  makeBattleAni() {
    this.isTag(Battle.TAG_IS_BATTLE_SEE)
      && (this.isTag(Battle.TAG_ALL_END) || this.closePlayerAnimation())
    const t = this.battle.inputHandler.getSequenceList()
    t && t.length > 0 && this.setPlanSequenceList(t),
    this.battle.cleanAniControlList()
  }

  isWin() {
    let t = false;

    ((this.battle.result == 1) && (t = true));
    ((this.battle.result == 2) && (t = true))

    return t
  }

  setPlanSequenceList(t) {
    this.planSequenceList = t
  }
}

export namespace BattleView {
  export const BATTLE_TOP_HEIGHT = 20
  export const BATTLE_BOTTOM_HEIGHT = 15
  export const POS_MIN_WIDTH = 30
  export const POS_MIN_HEIGHT = 20
  export const SIDE_POS_MIN_WIDTH = 2 * POS_MIN_WIDTH
  export const BOREDER_MIN_DIS = 15
  export const MAX_OFFSET_Y = 6
  export const END_COUNT_TIME_NOVICE = 4e3
  export const END_COUNT_TIME = 8e3
  export const BUFF_IMAGE_SET = 10
  export const BUFF_ATTR_ADD = 0
  export const BUFF_ATTR_DEL = 1
  export const BUFF_HIDE = 2
  export const BUFF_BLEED = 3
  export const BUFF_NEGATIVE_EFFECT = 4
  export const BUFF_POISON = 5
  export const BUFF_FIRE = 6
  export const BUFF_INVINCI = 7
  export const BUFF_IMMUNE = 8
  export const COORD_X = 0
  export const COORD_Y = 1
  export const POLL_INTERVAL = 2e3
  export const INTERVAL_NEXT_BATTLE_TIME = 1e4
  export const DEFAULT_DELAY_TIME = 50
}
