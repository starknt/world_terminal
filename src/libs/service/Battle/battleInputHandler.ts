import { Define } from 'libs/defined/defined'
import { Tools } from 'libs/shared/Tool'
import { Skill } from 'libs/typings/Skill'
import { Battle } from './battle'
import type { BattleView } from './battleView'
import { Control } from './Control'

export class BattleInputHandler {
  hlightSpriteCopies: any[] = []
  cursor = 0
  isEnable = true
  planVector: egret.ByteArray[] = []
  orderIndex = BattleInputHandler.ORDER_NONE
  petOrderIndex = BattleInputHandler.ORDER_NONE
  _isOrderInit = false
  nameTextPool = []
  nameTextCurrentlyUsed: any[] = []
  battleBarPool: any[] = []
  battleBarCurrentlyUsed: any[] = []
  buffPool: any[] = []
  buffCurrentlyUsed: any[] = []
  battle: Battle
  battleView: BattleView
  petSelectSkill: any
  selectSkill: any
  petSelectItem: any
  selectItem: any

  constructor(battle: Battle, view: BattleView) {
    this.battle = battle
    this.battleView = view
  }

  setCursor(t) {
    this.cursor = t
  }

  getCursor() {
    return this.cursor
  }

  setSelectSkill(t) {
    this.isPetRound() ? (this.petSelectSkill = t) : (this.selectSkill = t)
  }

  getSelectSkill() {
    return this.isPetRound() ? this.petSelectSkill : this.selectSkill
  }

  setSelectItem(t) {
    this.isPetRound() ? (this.petSelectItem = t) : (this.selectItem = t)
  }

  getSelectItem() {
    return this.isPetRound() ? this.petSelectItem : this.selectItem
  }

  getOrderPlayer() {
    return this.isPetRound() ? this.battle.orderPet : this.battle.orderPlayer
  }

  getMyPlayer() {
    return this.battle.orderPlayer
  }

  addPlan(t, e) {
    e != null && (this.battle.setPlan(t, e), this.planVector.push(e))
  }

  cleanPlanVector() {
    this.planVector = []
  }

  isRemoteReady() {
    if (this.planVector == null)
      return false
    if (this.battle == null)
      return false
    if (this.battle.orderPlayer == null)
      return false
    const t = this.battle.battleView.isTag(Battle.TAG_HAVE_MY_PET)
    const e = t ? 2 : 1
    return !(this.planVector.length < e)
  }

  getPlanData(t) {
    return Tools.isArrayIndexOutOfBounds(t, this.planVector)
      ? null
      : this.planVector[t]
  }

  setOrderIndex(t) {
    this.isPetRound() ? (this.petOrderIndex = t) : (this.orderIndex = t)
  }

  getOrderIndex() {
    return this.isPetRound() ? this.petOrderIndex : this.orderIndex
  }

  setPetRound(t) {
    this.battle.battleView.setTag(Battle.TAG_PET_ORDER, t)
  }

  isPetRound() {
    return this.battle.battleView.isTag(Battle.TAG_PET_ORDER)
  }

  isUseSkillInitiative(t) {
    if (t == null)
      return false
    const e = t.getSkillByID(t.autoSkillID_Initiative)
    if (e && Skill.isCanUse(t, e, null)) {
      const n = this.getCursor()
      let i = -1
      return (
        (i = this.battle.searchAICursorByRandom(t, e.area, true)),
        this.setCursor(i),
        this.addPlan(
          t.position,
          this.getBattlePlanData(Battle.PLAN_USE_SKILL, e.id),
        ),
        this.setCursor(n),
        true
      )
    }
    return false
  }

  getBattlePlanData(t, e?: any) {
    const n = new egret.ByteArray()
    switch ((n.writeByte(t), t)) {
      case Battle.PLAN_ATTACK:
        n.writeByte(this.getCursor())
        break
      case Battle.PLAN_USE_SKILL:
        n.writeByte(this.getCursor()),
        e > 0 ? n.writeShort(e) : n.writeShort(this.getSelectSkill().id)
        break
      case Battle.PLAN_USE_ITEM:
        n.writeByte(this.getCursor()),
        n.writeByte(this.getSelectItem().slotPos)
        break
      case Battle.PLAN_ESCAPE:
        break
      case Battle.PLAN_NONE:
    }
    return n
  }

  isReady() {
    if (this.battle.type == Battle.LOCAL) {
      if (this.battle.battleView == null || this.battle == null)
        return true
      if (this.battle.orderPlayer == null)
        return true
      const t = this.battle.battleView.isTag(Battle.TAG_HAVE_MY_PET)
      if (this.battle.getPlanData(this.battle.orderPlayer.position) == null)
        return false
      if (t) {
        if (this.battle.orderPet == null)
          return false
        if (this.battle.getPlanData(this.battle.orderPet.position) == null)
          return false
      }
      return true
    }
    return this.isRemoteReady()
  }

  isPetAuto() {
    return this.battle.orderPlayer == null
      ? false
      : this.battle.orderPlayer.isSettingBit(Define.SETTING_PET_PLAN_OFF)
  }

  initAttackOrder() {
    const e = this.getOrderPlayer()
    e != null
      && (this.setCursor(
        e.position < Battle.LEFT_MAX_POS ? Battle.LEFT_MAX_POS : 0,
      ),
      this.changeOrder(BattleInputHandler.ORDER_ATTACK))
  }

  changeOrder(e) {
    switch (
      (this.setOrderIndex(e), this.cleanTargetSelect(), this.getOrderIndex())
    ) {
      case BattleInputHandler.ORDER_ATTACK:
        // this.targetSelectPanel = this.getTargetSelectPanel()
        break
      case BattleInputHandler.ORDER_SKILL:
        // this.initSkillListPanel(), PanelManager.battleUI.hideHeadInfoView();
        break
      case BattleInputHandler.ORDER_ITEM:
        // this.initItemListPanel(), PanelManager.battleUI.hideHeadInfoView();
        break
      case BattleInputHandler.ORDER_INFO:
      // (this.targetSelectPanel = this.getTargetSelectPanel()),
      // PanelManager.battleUI.hideHeadInfoView();
    }
  }

  selectAutoFightTarget(t) {
    if (this.battle == null)
      return 0
    let e = 0
    let n = this.battle.getLeftPosNum()
    Battle.isLeftSide(t.position)
      && ((e = Battle.LEFT_MAX_POS), (n = Battle.MAX_POS))
    for (let i = e; n > i; i++) {
      const o = this.battle.getPlayerByPos(i)
      if (this.battle.isValidBattlePlayer(o))
        return i
    }
    return e
  }

  doAutoFight() {
    if (
      this.battleView.isTag(Battle.TAG_ALL_END)
      && !this.battle.isRemoteWaiting()
      && (this.battle.isValidBattlePlayer(this.battle.orderPlayer))
    ) {
      this.battle.getPlanData(this.battle.orderPlayer.position) == null
        && (this.battle.isValidBattlePlayer(this.battle.orderPlayer)
          ? this.isUseSkillInitiative(this.battle.orderPlayer)
          || (this.setCursor(this.selectAutoFightTarget(this.battle.orderPlayer)),
          this.addPlan(
            this.battle.orderPlayer.position,
            this.getBattlePlanData(Battle.PLAN_ATTACK),
          ))
          : this.addPlan(
            this.battle.orderPlayer.position,
            this.getBattlePlanData(Battle.PLAN_NONE),
          )),
      this.battleView.isTag(Battle.TAG_HAVE_MY_PET)
        && this.battle.orderPet
        && this.battle.getPlanData(this.battle.orderPet.position) == null
        && (this.isUseSkillInitiative(this.battle.orderPet)
          || this.addPlan(
            this.battle.orderPet.position,
            this.getBattlePlanData(Battle.PLAN_NONE),
          )),
      this.doPlanData()
      const t = this.battleView.isTag(Battle.TAG_IS_SKIP_BATTLE)
      t && this.battleView.closePlayerAnimation()
    }
  }

  logic() {
    if (this.battle.type == Battle.LOCAL) {
      // var e = this.battle.getPlanTime();
      // return (
      //   null == this.battle.getPlanData(this.battle.orderPlayer.position) &&
      //   this.addPlan(
      //     this.battle.orderPlayer.position,
      //     this.getBattlePlanData(Battle.PLAN_NONE)
      //   ),
      //   this.battleView.isTag(Battle.TAG_HAVE_MY_PET) &&
      //   this.battle.orderPet &&
      //   null == this.battle.getPlanData(this.battle.orderPet.position) &&
      //   this.addPlan(
      //     this.battle.orderPet.position,
      //     this.getBattlePlanData(Battle.PLAN_NONE)
      //   ),
      //   this.doPlanData()
      // );
    }
    else if (this.isRemoteWaitting()) { return this.battle.setRemoteWaiting(true) }

    this.initRoundStartOrder()
    // this.logicTargetSelect()
    // this.updateCursor()
  }

  logicRemoteWaiting() {
    // noop
  }

  isOrderInit() {
    return this._isOrderInit
  }

  initRoundStartOrder() {
    if (!this.isOrderInit()) {
      this.setOrderInit(true)
      if (this.battleView.isTag(Battle.TAG_IS_AUTO_FIGHT))
        return this.doAutoFight()
    }
  }

  isRemoteWaitting() {
    return this.battle.isValidBattlePlayer(this.battle.orderPlayer)
      ? false
      : this.battle.orderPet == null
        ? true
        : this.isPetAuto() == true
          ? true
          : !this.battle.isValidBattlePlayer(this.battle.orderPet)
  }

  doPlanData() {
    if ((this.cleanTargetSelect(), this.isReady())) {
      switch ((this.setPetRound(false), this.battle.type)) {
        case Battle.LOCAL:
          this.doBattleRoundLogic()
          break
        default:
          this.battle.setRemoteWaiting(true)
      }
      this.battle.orderPlayer && this.battle.clearPlan(this.battle.orderPlayer.position)
      this.battle.orderPet && this.battle.clearPlan(this.battle.orderPet.position)
    }

    this.setOrderInit(false)
  }

  setOrderInit(t) {
    this._isOrderInit = t
  }

  doBattleRoundLogic() {
    this.battle.logicRound(), this.battleView.makeBattleAni()
  }

  getSequenceList() {
    const t: any[] = []
    if (this.battle.resultControlList == null)
      return t
    for (
      var e, n = 0, i = 0, o = 0, a = 0, r = this.battle.resultControlList;
      a < r.length;
      a++
    ) {
      const s = r[a]
      const l = s
      if (l != null) {
        switch (((n = i), (i = s.byte0), (o = s.counter), s.type)) {
          case Control.TYPE_BATTLE_SKILL:
          case Control.TYPE_BATTLE_ESCAPE:
            this.battle.isSameSide(n, i) == false && ((e = []), t.push(e))
            break
          case Control.TYPE_BATTLE_TARGET_EFFECT:
            (Battle.isEffectStatus(o, Battle.EFFECT_REBORN)
              || Battle.isEffectStatus(o, Battle.EFFECT_DIE_DELAY))
              && ((e = []), t.push(e))
        }
        e == null && ((e = []), t.push(e)), e.push(l)
      }
    }
    return (
      this.cleanTargetSelect(),
      this.setOrderInit(false),
      this.battle.type != Battle.LOCAL && this.cleanPlanVector(),
      t
    )
  }

  cleanTargetSelect() {

  }
}
export namespace BattleInputHandler {
  export const CURSOR_OFFSET_Y = 50
  export const ORDER_NONE = -1
  export const ORDER_ATTACK = 1
  export const ORDER_SKILL = 2
  export const ORDER_ITEM = 3
  export const ORDER_AUTO = 4
  export const ORDER_INFO = 5
  export const ORDER_ESCAPE = 6
}
