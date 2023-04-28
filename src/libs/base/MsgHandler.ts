import { Define } from 'libs/defined/defined'
import { ProtocolDefine } from 'libs/defined/protocol'
import type { GameMap } from 'libs/typings/GameMap'
import type { Player } from 'libs/typings/Player'
import { nato } from './nato'

export class MsgHandler {
  static createSystemHeartMsg(mapId: number) {
    const t = new nato.Message(ProtocolDefine.CG_SYSTEM_HEART)
    // map id
    t.putShort(mapId)
    return t
  }

  static createCheckEditionMsg(channel: number, xgameid: number) {
    const e = new nato.Message(ProtocolDefine.LC_CHECKEDITION)
    if (
      (e.putShort(xgameid),
      e.putInt(320200),
      e.putShort(channel),
      e.putByte(0),
      navigator != null)
    ) {
      const n = navigator.userAgent
      e.putString(n)
    }
    else { e.putString('h5') }
    e.putByte(1)
    const i = Define.CLIENT_TYPE_JAR
    return e.putByte(i), e
  }

  static createUserLoginMsg(t: string, e: string) {
    const n = new nato.Message(ProtocolDefine.LC_PLAYER_LOGIN)
    return (
      n.putString(t),
      n.putString(e),
      n.putString(''),
      n.putString(''),
      n.putByte(0),
      n.putByte(0),
      n
    )
  }

  static createAreaLineListMsg() {
    const t = new nato.Message(ProtocolDefine.LC_GAME_GET_AREA_AND_LINE)
    return t
  }

  static createFirstGameServerMsg(ukey: nato.Long, sessionId: number) {
    const t = new nato.Message(ProtocolDefine.CG_LOGIN_PLAYERCHECK)
    return (
      t.putLong(ukey),
      t.putInt(sessionId),
      t.putByte(Define.LANG_DEFAULT),
      // VERSION
      t.putInt(320200),
      t.putByte(Define.CLIENT_TYPE_JAR),
      t
    )
  }

  static createPlayerListMsg() {
    const t = new nato.Message(ProtocolDefine.CG_LOGIN_ACTORLIST)
    return t
  }

  static createAddPlayerMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_LOGIN_CREATEACTOR)
    return (
      e.putByte(t.getSex()),
      e.putByte(t.getRace()),
      e.putByte(t.getJob()),
      e.putInt(t.getIcon1()),
      e.putInt(t.getIcon2()),
      e.putInt(t.getIcon3()),
      e.putString(t.getName()),
      e
    )
  }

  static createDelPlayerMsg(t: number) {
    const e = new nato.Message(ProtocolDefine.CG_LOGIN_DELETEACTOR)
    return e.putInt(t), e
  }

  static createDeleteRoleByProtectCodeMsg(t: number, e: string) {
    const n = new nato.Message(ProtocolDefine.CG_LOGIN_DELETEACTOR_PASSWD)
    return n.putInt(t), n.putString(e), n
  }

  static createCancelDelPlayerMsg(t: number) {
    const e = new nato.Message(ProtocolDefine.CG_LOGIN_RECOVERACTOR)
    return e.putInt(t), e
  }

  static createPlayerEnterMsg(t: number, e: string) {
    const n = 0
    const i = new nato.Message(ProtocolDefine.CG_LOGIN_ACTORENTER)
    i.putInt(t),
    i.putInt(Define.LOGIN_DATA_FLAG),
    i.putInt(n),
    i.putString(''),
    i.putByte(Define.CLIENT_TYPE_JAR),
    i.putString(e)
    const o = ''
    const a = ''
    return i.putString(o), i.putString(a), i
  }

  static createUserRegisterMsg(username: string, password: string) {
    const r = new nato.Message(ProtocolDefine.LC_PLAYER_CREATE)
    return (
      r.putString(username),
      r.putString(password),
      r.putString(''),
      r.putString('abc'),
      r.putString(''),
      r.putString('随机吧'),
      r.putString('440106198001018491'),
      r.putInt(0),
      r
    )
  }

  // static createWorldDataReflashMsg = function () {
  //   let e = Define.REFRESH_DATA_FLAG;
  //   (xworld.npcList == null || xworld.npcList.length == 0)
  //       && (e |= Define.DATA_NPC_BASE)
  //   const n = t.createWorldDataMessage(e, true)
  //   ApiSocketClient.sendCmd(n, null, null)
  // }

  static createWorldDataMessage(t: number, e: boolean, mapId: number) {
    const n = new nato.Message(ProtocolDefine.CG_SCENE_WORLDDATA)
    return (
      n.putShort(mapId),
      n.putBoolean(e),
      n.putInt(t),
      n.putByte(0),
      n.putByte(0),
      n
    )
  }

  static createJumpCityMessage(t: number, e: number) {
    const n = new nato.Message(ProtocolDefine.CG_SCENE_GO_CITY)
    return n.putInt(t), n.putInt(e), n
  }

  static createBrowseCityInfoMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_CITY_INFO)
    return e.putInt(t), e
  }

  static createMoveMessage(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_SCENE_PLAYER_MOVING)
    return n.putByte(t), n.putByte(e), n
  }

  static createOtherMoveMessage() {
    const t = new nato.Message(ProtocolDefine.CG_SCENE_GET_OTHER_PLAYER_STATE)
    return t
  }

  static createEnterLocalBattle() {
    const t = new nato.Message(ProtocolDefine.CG_FIGHT_ENTER_LOCALBATTEL)
    return t
  }

  static createEnterRemoteBattle(t: number) {
    const e = new nato.Message(ProtocolDefine.CG_FIGHT_ENTER_REMOTEBATTLE)
    return e.putShort(t), e
  }

  static createFightSeeInterMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_FIGHT_SEE_IN)
    return e.putInt(t), e
  }

  static createFightSeeQuitMsg() {
    const t = new nato.Message(ProtocolDefine.CG_FIGHT_SEE_OUT)
    return t
  }

  static createBattlePlan(t: number, e: egret.ByteArray, n: egret.ByteArray) {
    const i = new nato.Message(ProtocolDefine.CG_FIGHT_BATTLE_DOPLAN)
    return (
      i.putByte(t),
      i.putBytes(e),
      n == null ? i.putBoolean(false) : (i.putBoolean(true), i.putBytes(n)),
      i
    )
  }

  static createBattleUpdate(round: number) {
    const e = new nato.Message(ProtocolDefine.CG_FIGHT_BATTLE_UPDATE)
    return e.putByte(round), e
  }

  static createAutoSkillMsg(t: Player, e: number, n: boolean) {
    const i = new nato.Message(ProtocolDefine.CG_SKILL_AUTO_ACTIVE)
    n == false && i.setType(ProtocolDefine.CG_SKILL_AUTO_INVALID)
    let o = Define.SKILL_TYPE_PLAYER
    return (
      t != null && t.getType() == 4 && (o = Define.SKILL_TYPE_PET),
      i.putByte(o),
      i.putInt(e),
      i
    )
  }

  static createJumpMapMessage(mapId: number, x: number, y: number, flag: number) {
    const o = new nato.Message(ProtocolDefine.CG_SCENE_GO_MAP)
    return o.putShort(mapId), o.putByte(x), o.putByte(y), o.putInt(flag), o
  }

  static createPlayerBagMessage(t, e, n, i, o, a) {
    if ((void 0 === o && (o = false), void 0 === a && (a = false), n == null))
      return null
    const r = new nato.Message(ProtocolDefine.CG_ACTOR_PLAYERBAG)
    return (
      r.putByte(t),
      r.putByte(e),
      r.putShort(n.slotPos),
      e == ProtocolDefine.PLAYERBAG_EQUIP
        ? r.putByte(i)
        : e == ProtocolDefine.PLAYERBAG_LOSE
          ? r.putInt(n.id)
          : e == ProtocolDefine.PLAYERBAG_ENCHASE
            ? r.putShort(i)
            : n.isPetCanUseItem() && r.putShort(i),
      r.putBoolean(o),
      r.putBoolean(a),
      r
    )
  }

  static createIdentifyAsk(t, e, n, i, o, a) {
    const r = new nato.Message(ProtocolDefine.CG_BAG_CHECKUP_ASK)
    return (
      r.putByte(t),
      r.putShort(e),
      r.putInt(n),
      r.putBoolean(i),
      r.putBoolean(o),
      r.putInt(a),
      r
    )
  }

  static createBagRefreshMsg() {
    const t = new nato.Message(ProtocolDefine.CG_BAG_CLEAN)
    return t.putInt(Define.DATA_PLAYER_ITEM), t
  }

  static createItemShopSell(t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_ITEMSHOP_SELL)
    return o.putShort(t), o.putInt(e), o.putShort(n), o.putByte(i), o
  }

  static createGetMissionDataMsg(npcId: number, gameMap: GameMap) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_GETMISSIONDATA)
    e.putShort(npcId)
    const n: number[] = []
    let i = 0
    const o = gameMap.monsterGroupList
    for (const a in o)
      (n[i] = parseInt(a)), i++
    e.putByte(n.length)
    for (let r = 0; r < n.length; r++)
      e.putShort(n[r])
    const s: number[] = []
    i = 0
    const l = gameMap.monsterList
    for (const a in l)
      (s[i] = parseInt(a)), i++
    e.putByte(s.length)
    for (let r = 0; r < s.length; r++)
      e.putShort(s[r])
    return e
  }

  static createGetNPCData(t: number[]) {
    const e = new nato.Message(ProtocolDefine.CG_SCENE_GETNPC)
    if (t == null) { e.putByte(0) }
    else {
      e.putByte(t.length)
      for (let n = 0; n < t.length; n++) e.putByte(t[n])
    }
    return e
  }

  static createTaskAcceptMsg(id: number, missionId: number) {
    const n = new nato.Message(ProtocolDefine.CG_TASK_ACCEPT)
    return n.putShort(id), n.putShort(missionId), n
  }

  static createTaskDeliverMsg(t: number, e: number, item: number) {
    const i = new nato.Message(ProtocolDefine.CG_TASK_DELIVER)
    return i.putShort(t), i.putShort(e), i.putInt(item), i
  }

  static createTaskAbandonMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_ABANDON)
    return e.putShort(t), e
  }

  static createAutoMoveMsg(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_SCENE_FINDPATH_MISSION)
    return n.putByte(1), n.putShort(t), n.putByte(e), n
  }

  static createAutoMoveMsgByMission(missionId: number) {
    const e = new nato.Message(ProtocolDefine.CG_SCENE_FINDPATH_MISSION)
    return e.putByte(2), e.putShort(missionId), e
  }

  static createWorldMapMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_SCENE_WORLDMAP)
    return t
  }

  static createWorldMapListMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SCENE_WORLDMAP_DATA)
    return e.putInt(t), e
  }

  static createWorldMapEnterMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SCENE_WORLDMAP_ENTER)
    return e.putInt(t), e.putInt(Define.JUMP_MAP_DATA_FLAG), e
  }

  static createWorldMapVIPEnterMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SCENE_GO_MAP_VIP)
    return e.putInt(t), e.putInt(Define.JUMP_MAP_DATA_FLAG), e
  }

  static createAttrAddMessage = function (t) {
    if (t == null)
      return null
    const e = new nato.Message(ProtocolDefine.CG_ACTOR_ADDATTRIBUTE)
    const n = t.length
    e.putByte(n)
    for (let i = 0; n > i; i++) {
      const o = t[i]
      o != null && (e.putShort(o[0]), e.putInt(o[1]))
    }
    return e
  }

  static createBrowseSkillShop = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SKILL_SHOP_LIST)
    return e.putShort(t), e
  }

  static createDropSkill = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_SKILL_DELETE)
    return n.putInt(t), n.putByte(e), n
  }

  static createDropSkillOneLevel = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_SKILL_DELETE_BY_LEVEL)
    return n.putInt(t), n.putByte(e), n
  }

  static createLearnSkill = function (t, e) {
    if (e == null)
      return null
    const n = Define.isCountrySkillShop(t)
    const i = new nato.Message(ProtocolDefine.CG_SKILL_SHOP_LEARN)
    return (
      i.putShort(t),
      i.putInt(e.id),
      i.putByte(e.level),
      i.putBoolean(n),
      n && (i.putInt(e.money1), i.putInt(e.money2), i.putInt(e.money3)),
      i
    )
  }

  static createChatMsg = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_CHAT_SUBMIT)
    return (
      i.putByte(t),
      i.putString(e),
      t == Define.CHAT_TYPE_PRIVATE && i.putInt(n),
      i
    )
  }

  static createMailListMsg = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_MAIL_LIST)
    return i.putByte(t), i.putByte(e), i.putShort(n), i
  }

  static createMailDetailMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_MAIL_DETAIL)
    return e.putLong(t), e
  }

  static createMailSendGMMsg(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_MAIL_SEND_SERVICE)
    return n.putByte(t), n.putString(e), n
  }

  static createMailAttachMsg(t, e) {
    if (t == null)
      return null
    const n = new nato.Message(ProtocolDefine.CG_MAIL_EXTRACT_ATTACHMENT)
    return (
      n.putLong(t.id),
      n.putBoolean(t.isTypeBit(64)),
      n.putBoolean(true),
      n.putInt(e),
      n
    )
  }

  static createMailBackMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_MAIL_TURNBACK)
    return e.putLong(t), e
  }

  static createMailDeleteMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_MAIL_DELETE)
    return e.putLong(t), e
  }

  static createMailNewNotice = function () {
    const t = new nato.Message(ProtocolDefine.CG_MAIL_OPEN)
    return t
  }

  static createMailSeeItem = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_MAIL_GETITEMDETAIL)
    return n.putLong(t), n.putByte(e), n
  }

  static createPetSeeMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_PET_SEE)
    return e.putShort(t), e
  }

  // static createPetInfoMsg = function (e, n) {
  //   if (n == null)
  //     return null
  //   const i = new nato.Message(ProtocolDefine.CG_PET_INFO)
  //   i.putByte(e)
  //   let o = 0
  //   let a = 0
  //   let r = null
  //   switch (e) {
  //     case MsgHandler.PET_INFO_PLAYER_SHOP:
  //     case MsgHandler.PET_INFO_CHAT:
  //       (o = n[0]), i.putInt(o), (a = n[1]), i.putShort(a)
  //       break
  //     case MsgHandler.PET_INFO_GOODS:
  //       (r = n[0]), i.putLong(r)
  //       break
  //     case MsgHandler.PET_INFO_MAIL:
  //       (r = n[0]), i.putLong(r), (a = n[1]), i.putShort(a)
  //       break
  //     case MsgHandler.PET_INFO_SEE_PLAYER:
  //       (o = n[0]), i.putInt(o)
  //   }
  //   return i
  // }

  static createRelationList = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_RELATION_LIST)
    return i.putByte(t), i.putByte(e), i.putShort(n), i
  }

  static createRelationAddById = (t, e) => {
    return this.createRelationAdd(
      t,
      ProtocolDefine.MAIL_SEND_ID,
      e,
      null,
      null,
    )
  }

  static createRelationAddByName = (t, e) => {
    return this.createRelationAdd(
      t,
      ProtocolDefine.MAIL_SEND_NAME,
      -1,
      e,
      null,
    )
  }

  static createRelationAddByUid = (t, e) => {
    return this.createRelationAdd(
      t,
      ProtocolDefine.MAIL_SEND_UID,
      -1,
      null,
      e,
    )
  }

  static createRelationAdd = function (t, e, n, i, o) {
    const a = new nato.Message(ProtocolDefine.CG_RELATION_ADD)
    switch ((a.putByte(t), a.putByte(e), e)) {
      case ProtocolDefine.MAIL_SEND_ID:
        a.putInt(n)
        break
      case ProtocolDefine.MAIL_SEND_NAME:
        a.putString(i)
        break
      case ProtocolDefine.MAIL_SEND_UID:
        a.putString(o)
    }
    return a
  }

  static createRelationAddMaster = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_RELATION_MASTER_ADD)
    return e.putInt(t), e
  }

  static createRelationDelMaster = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_RELATION_MASTER_DELETE)
    return e.putInt(t), e
  }

  static createPlayerSee = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_ACTOR_SEE)
    return e.putInt(t), e
  }

  static createGetSuitInfoMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SUIT_GETINFO)
    if (t == null) { e.putByte(0) }
    else {
      e.putByte(t.length)
      for (let n = 0; n < t.length; n++) e.putByte(t[n])
    }
    return e
  }

  static createItemShopListMsg(t: number) {
    const e = new nato.Message(ProtocolDefine.CG_ITEMSHOP_LIST)
    return e.putShort(t), e
  }

  static createItemShopBuy(t, e, n) {
    const i = Define.isCountryShop(t)
    const o = new nato.Message(ProtocolDefine.CG_ITEMSHOP_BUY)
    return (
      o.putShort(t),
      o.putInt(e.id),
      o.putByte(n),
      o.putBoolean(i),
      i && (o.putInt(e.money1), o.putInt(e.money2), o.putInt(e.money3)),
      o
    )
  }

  static createPlayerShopStartMsg = function (t, e) {
    if (e == null || e.length < 0)
      return null
    const n = new nato.Message(ProtocolDefine.CG_PLAYERSHOP_START)
    n.putString(t)
    const i = e.length
    n.putByte(i)
    for (let o = 0; i > o; o++) {
      const a = e[o]
      if (a == null)
        return null
      n.putInt(a.id),
      n.putByte(a.quantity),
      n.putShort(a.slotPos),
      n.putInt(a.money1),
      n.putInt(a.money3)
    }
    return n
  }

  static createPlayerEnchantShopStartMsg = function (t, e) {
    //   if (null == e || e.length < 0) return null;
    //   var n = xself;
    //   if (null == n) return null;
    //   for (var i = 0, o = 0; o < e.length; o++) {
    //     var a = e[o];
    //     if (0 == a instanceof ShopItem) return null;
    //     var r = a;
    //     null != r && (i += r.powerValue1 * r.quantity);
    //   }
    //   if (i > n.getEnchantValue())
    //     return AlertPanel.alertCommon(GameText2.STR_ENCHANT_START_FAIL), null;
    //   var s = new nato.Message(ProtocolDefine.CG_ENCHANTSHOP_START);
    //   s.putString(t), s.putInt(n.getEnchantValue() - i);
    //   var l = e.length;
    //   s.putByte(l);
    //   for (var _ = 0; l > _; _++) {
    //     var r = e[_];
    //     if (null == r) return null;
    //     s.putInt(r.id),
    //       s.putByte(r.quantity),
    //       s.putShort(r.slotPos),
    //       s.putInt(r.money1),
    //       s.putInt(r.money3);
    //   }
    //   return s;
  }

  static createPlayerShopEndMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_PLAYERSHOP_STOP)
    return t
  }

  static createPlayerEnchantShopEndMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_ENCHANTSHOP_STOP)
    return t
  }

  static createPlayerShopItemListMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_PLAYERSHOP_LIST_GOODS)
    return e.putInt(t), e
  }

  static createPlayerEnchantShopItemListMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_ENCHANTSHOP_LIST)
    return e.putInt(t), e
  }

  static createPlayerShopBuyMsg = function (t, e) {
    if (e == null)
      return null
    const n = new nato.Message(ProtocolDefine.CG_PLAYERSHOP_BUY)
    return (
      n.putInt(t),
      n.putShort(e.slotPos),
      n.putByte(e.quantity),
      n.putInt(e.id),
      n
    )
  }

  static createPlayerShopRecordMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_PLAYERSHOP_SELLRECORD)
    return t
  }

  static createPlayerEnchantShopRecordMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_ENCHANTSHOP_SELLRECORD)
    return t
  }

  static createGoodsSellFind = function (t, e, n, i, o, a, r, s) {
    const l = new nato.Message(ProtocolDefine.CG_EXCHANGE_FIND_SELLGOODS)
    return (
      l.putByte(t),
      l.putByte(e),
      l.putByte(n),
      l.putByte(i),
      l.putByte(o),
      l.putString(a),
      l.putShort(r),
      l.putInt(s),
      l
    )
  }

  static createGoodsSellList = function () {
    const t = new nato.Message(ProtocolDefine.CG_EXCHANGE_MY_SELLGOODS)
    return t
  }

  static createGoodsSellSubmit = function (t, e, n, i) {
    if (t == null)
      return null
    const o = new nato.Message(ProtocolDefine.CG_EXCHANGE_SUBMIT_SELLGOODS)
    return (
      o.putShort(t.slotPos),
      o.putByte(e),
      o.putInt(t.id),
      o.putInt(n),
      o.putInt(i),
      o
    )
  }

  static createGoodsSellRetrieve = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_EXCHANGE_RETRIEVE_SELLGOODS)
    return e.putLong(t), e
  }

  static createGoodsSellBuy = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_EXCHANGE_BUY_SELLGOODS)
    return e.putLong(t), e
  }

  static createGoodsPurchaseList = function (t, e, n, i, o, a) {
    const r = new nato.Message(ProtocolDefine.CG_EXCHANGE_FIND_PURCHASEGOODS)
    return (
      r.putByte(t),
      r.putInt(e),
      r.putByte(n),
      r.putByte(i),
      r.putShort(o),
      r.putInt(a),
      r
    )
  }

  static createGoodsProvideMsg = function (t, e) {
    const n = new nato.Message(
      ProtocolDefine.CG_EXCHANGE_PROVIDE_PURCHASEGOODS,
    )
    return n.putLong(t), n.putShort(e), n
  }

  static createGoodsAutoProvide = function (t, e, n) {
    if (t == null || n == null)
      return null
    const i = new nato.Message(
      ProtocolDefine.CG_EXCHANGE_AUTOPROVIDE_PURCHASEGOODS,
    )
    return (
      i.putShort(t.slotPos),
      i.putByte(e),
      i.putInt(t.id),
      i.putInt(n[0]),
      i.putInt(n[1]),
      i
    )
  }

  static createGoodsPurchaseMyList = function () {
    const t = new nato.Message(ProtocolDefine.CG_EXCHANGE_MY_PURCHASEGOODS)
    return t
  }

  static createGoodsPurchaseTypeList = function (t) {
    const e = new nato.Message(
      ProtocolDefine.CG_EXCHANGE_PURCHASEGOODS_TYPELIST,
    )
    return e.putByte(t), e
  }

  static createGoodsPurchaseSubmit = function (t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_EXCHANGE_SUBMIT_PURCHASEGOODS)
    return o.putInt(t), o.putShort(e), o.putInt(n), o.putInt(i), o
  }

  static createGoodsPurchaseCancel = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_EXCHANGE_CANCEL_PURCHASEGOODS)
    return e.putLong(t), e
  }

  static createGoodsPurchaseGet = function (t) {
    const e = new nato.Message(
      ProtocolDefine.CG_EXCHANGE_EXTRACT_PURCHASEGOODS,
    )
    return e.putLong(t), e
  }

  static createPlayerEvent = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_SCENE_PLAYER_EVENT)
    return n.putInt(t), n.putByte(e), n
  }

  static createGetCityMoneyMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_CITY_EXTRACT_MONEY)
    return e.putInt(t), e
  }

  static createModifyCityNameMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_CITY_CHANGE_NAME)
    return n.putInt(t), n.putString(e), n
  }

  static createModifyCitySignMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_CITY_CHANGE_SIGN)
    return n.putInt(t), n.putString(e), n
  }

  static createSetRebornMapMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SCENE_SETREBORNMAP)
    return e.putShort(t), e
  }

  static createSpecialCodeMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SYSTEM_SPECIALCODE)
    return e.putString(t), e
  }

  static createStorageListMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_STORAGE_LIST)
    return t
  }

  static createVIPStorageListMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_STORAGE_LIST_VIP)
    return t
  }

  static createStorageOperateMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_STORAGE_OPER)
    return n.putByte(t), n.putShort(e), n
  }

  static createVIPStorageOperateMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_STORAGE_OPER_VIP)
    return n.putByte(t), n.putShort(e), n
  }

  static createTaskOffLineListMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_TASK_OFFLINE_LIST)
    return t
  }

  static createTaskOffLineActivateMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_OFFLINE_ACTIVATE)
    return e.putShort(t), e
  }

  static createItemInfoMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_ITEMTYPE_GETINFO)
    return e.putInt(t), e
  }

  static createInviteTeamMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_TEAM_INVITE)
    return n.putInt(e), n.putByte(t), n
  }

  static createSetTeamMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_TEAM_SET)
    switch ((n.putByte(t), t)) {
      case ProtocolDefine.TEAM_SET_AUTO_JOIN:
        n.putByte(e)
        break
      case ProtocolDefine.TEAM_SET_CHANGE_CAPTAIN:
        n.putInt(e)
        break
      case ProtocolDefine.TEAM_SET_DISBAND:
        break
      case ProtocolDefine.TEAM_SET_REMOVE_MEMBER:
        n.putInt(e)
    }
    return n
  }

  static createSelfLeaveTeamMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_TEAM_LEAVE_SELF)
    return t
  }

  static createCombinShop = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COMPOSITE_SHOP)
    return e.putShort(t), e
  }

  static createCombinItem = function (t, e, n, i) {
    if (e == null)
      return null
    const o = e.getPrice()
    const a = e.getMoneyType()
    const r = new nato.Message(ProtocolDefine.CG_COMPOSITE_DO)
    return (
      r.putShort(t),
      r.putInt(e.id),
      r.putShort(n),
      r.putInt(i),
      r.putByte(a),
      r.putInt(o),
      r
    )
  }

  static createCombinConfirm = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COMPOSITE_CONFIRM)
    return e.putByte(t), e
  }

  static createIntegralShop = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_ITEMSHOP_LIST_SCORE)
    return e.putShort(t), e
  }

  static createIntegralBuy = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_ITEMSHOP_BUY_SCORE)
    return i.putShort(t), i.putInt(e), i.putByte(n), i
  }

  static createMercenaryListMsg = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_SOLDIER_GROUP_LIST)
    return i.putShort(t), i.putByte(e), i.putShort(n), i
  }

  static createMercenaryInfoMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SOLDIER_GROUP_INFO)
    return e.putShort(t), e
  }

  static createMercenaryMyInfoMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_SOLDIER_GROUP_MY_INFO)
    return n.putInt(t), n.putShort(e), n
  }

  static createMercenaryBuyMsg = function (t, e, n) {
    // const i = Define.isCountrySoldierShop(t)
    // const o = new nato.Message(ProtocolDefine.CG_SOLDIER_GROUP_BUY)
    // return (
    //   o.putShort(t),
    //   o.putShort(e.groupId),
    //   o.putBoolean(n),
    //   o.putBoolean(i),
    //   i == 1 && (o.putInt(e.money1), o.putInt(e.money2), o.putInt(e.money3)),
    //   o
    // )
  }

  static createMercenaryMyListMsg = function () {
    const t = new nato.Message(ProtocolDefine.CG_SOLDIER_GROUP_MY_LIST_SLEEP)
    return t
  }

  static createMercenarySetStatusMsg = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_SOLDIER_STATE_SET)
    return i.putShort(t), i.putBoolean(e), i.putByte(n), i
  }

  static createMercenaryDelMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_SOLDIER_DELETE)
    return e.putShort(t), e
  }

  static createChatSeeItem = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_CHAT_SEE_ITEM)
    if ((n.putInt(t), e == null)) { n.putByte(0) }
    else {
      n.putByte(e.length)
      for (let i = 0; i < e.length; i++) n.putByte(e[i])
    }
    return n
  }

  static createChatSeeMission = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_CHAT_SEN_MISSION)
    if ((n.putInt(t), e == null)) { n.putByte(0) }
    else {
      n.putByte(e.length)
      for (let i = 0; i < e.length; i++) n.putShort(e[i])
    }
    return n
  }

  static createPetChangeName = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_PET_CHANGE_NAME)
    return n.putShort(t), n.putString(e), n
  }

  static createEscortMoveMsg = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_MOVE)
    return n.putByte(t), n.putByte(e), n
  }

  static createEscortRefreshMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_REFURBISH)
    return e.putShort(t), e
  }

  static createEscortEventMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_CHOICE_EVENT)
    return e.putShort(t), e
  }

  static createEscortPostQuit = function () {
    const t = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_CANCEL)
    return t
  }

  static createEscortRobList = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_LIST)
    return n.putByte(t), n.putShort(e), n
  }

  static createNewEscortRobList = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_NEW_LIST)
    return n.putByte(t), n.putShort(e), n
  }

  static createEscortRob = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_ROB)
    return e.putInt(t), e
  }

  static createEscortListPlayer = function () {
    const t = new nato.Message(ProtocolDefine.CG_TASK_ESCORT_SEE)
    return t
  }

  static createPayDescribe = function () {
    const t = new nato.Message(ProtocolDefine.CG_BILL_DESCRIBE)
    return t
  }

  static createPayInfoList = function () {
    const t = new nato.Message(ProtocolDefine.CG_BILL_GETLIST)
    return t
  }

  static createAchieveGetInfo = function () {
    const t = new nato.Message(ProtocolDefine.CG_ACHIEVEMENT_GETINFO)
    return t
  }

  static createAchieveList = function (t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_ACHIEVEMENT_GETLIST)
    return o.putByte(t), o.putByte(e), o.putInt(n), o.putShort(i), o
  }

  static createAchieveGainReward = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_ACHIEVEMENT_GAINREWARD)
    return n.putShort(t), n.putByte(e), n
  }

  static createAchieveTitleList = function () {
    const t = new nato.Message(ProtocolDefine.CG_TITLE_GETLIST)
    return t
  }

  static createAchieveUseTitle = function (t: number) {
    const e = new nato.Message(ProtocolDefine.CG_TITLE_USE)
    return e.putShort(t), e
  }

  static createBindPhone = function (t, e, n, i) {
    let o = ProtocolDefine.CG_BIND_PHONE
    i == 0 && (o = ProtocolDefine.CG_BIND_EMAIL)
    const a = new nato.Message(o)
    return a.putString(t), a.putString(e), a.putString(n), a
  }

  static createPKAskMsg = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_FIGHT_PK_ASK)
    return e.putInt(t), e
  }

  static createChangeSettingMessgae = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_ACTOR_SETTING)
    return e.putInt(t), e
  }

  static createRelationFly = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_RELATION_FLY)
    return e.putInt(t), e.putInt(Define.JUMP_MAP_DATA_FLAG), e
  }

  static createAutoCreatePlayer() {
    const t = new nato.Message(ProtocolDefine.LC_PLAYER_CREATE_AUTO)
    return (
      t.putString(''),
      t.putString('abc'),
      t.putString(''),
      t
    )
  }

  static createAutoCreateActor(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_LOGIN_CREATEACTOR_AUTO)
    return n.putByte(t), n.putByte(e), n
  }

  static createModifyActorName(t) {
    const e = new nato.Message(ProtocolDefine.CG_CHANGE_ACTOR)
    return e.putString(t), e
  }

  static createModifyActorNameByItem(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_ACTOR_CHANGE_NAME)
    return n.putShort(e), n.putString(t), n
  }

  static createModifyPlayerName(t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_CHANGE_ACCOUNT)
    return o.putString(t), o.putString(e), o.putString(n), o.putString(i), o
  }

  static createCountryApply(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_APPLY)
    return e.putInt(t), e
  }

  static createCountryActiveMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_ACTIVATE)
    return e.putInt(t), e
  }

  static createCountryCreateMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_CREATE)
    return e.putString(t), e
  }

  static createJumpCountryMessage(t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_COUNTRY_ENTER)
    return o.putInt(t), o.putInt(e), o.putInt(n), o.putInt(i), o
  }

  static createCountryListMsg(t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_COUNTRY_LIST)
    return i.putByte(t), i.putShort(e), i.putInt(n), i
  }

  static createBrowseCountryInfoMsg(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_CHECK)
    return n.putInt(t), n.putByte(e), n
  }

  static createCountryAfficheModifyMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_MODIFY_NOTICE)
    return e.putString(t), e
  }

  static createCountryStorageList = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_STORAGE_ITEM)
    return e.putBoolean(t), e
  }

  static createCountryStoragePut(t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_COUNTRY_DONATE_ITEM)
    return o.putShort(t), o.putByte(e), o.putInt(n), o.putInt(i), o
  }

  static createCountryStorageDel(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_DELETE_STORAGE_ITEM)
    return e.putLong(t), e
  }

  static createCountryStorageGet(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_EXCHAGE_STORAGE_ITEM)
    return n.putBoolean(t), n.putLong(e), n
  }

  static createCountryValidMission() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_VALID_MISSION)
    return t
  }

  static createCountryGetAllMission() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_ISSUE_MISSION)
    return t
  }

  static createCountryAssingMission() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_ASSIGN_MISSION)
    return t
  }

  static createCountryAssignMem(t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_ASSIGN_PEOPLE)
    return o.putShort(n), o.putShort(t), o.putInt(e), o.putBoolean(i), o
  }

  static createPartnerFly() {
    const t = new nato.Message(ProtocolDefine.CG_PARTNER_FLY)
    return t.putInt(Define.JUMP_MAP_DATA_FLAG), t
  }

  static createPartnerAdd() {
    const t = new nato.Message(ProtocolDefine.CG_RELATION_PARTNER_ADD)
    return t
  }

  static createPartnerDel() {
    const t = new nato.Message(ProtocolDefine.CG_RELATION_PARTNER_DELETE)
    return t
  }

  static createCampInfo() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_BUILD_CAMP)
    return t
  }

  static createSoldierApply() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_TO_ARMY)
    return t
  }

  static createDeleteSoldier(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_DELETE_ARMY)
    return e.putInt(t), e
  }

  static createSoldierList(t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_TO_ARMY_LIST)
    return o.putByte(n), o.putShort(i), o.putByte(t), o.putByte(e), o
  }

  static createSoldierDealApply(t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_TO_ARMY_ANSWER)
    return i.putInt(t), i.putBoolean(e), i.putByte(n), i
  }

  static createWarBuildList() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_BUILD_LIST)
    return t
  }

  static createWarBuildLevel(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_BUILD_UPDATE)
    return e.putByte(t), e
  }

  static createWarUnionCreate = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_UNION_CREATE)
    return e.putString(t), e
  }

  static createWarUnionList = function (t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_UNION_LIST)
    return n.putByte(t), n.putShort(e), n
  }

  static createWarUnionMy = function () {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_UNION_MY)
    return t
  }

  static createWarUnionDealApply = function (t, e) {
    const n = new nato.Message(
      ProtocolDefine.CG_COUNTRY_WAR_UNION_MEMBER_APPLY_DEAL,
    )
    return n.putInt(t), n.putBoolean(e), n
  }

  static createWarUnionDelMember = function (t) {
    const e = new nato.Message(
      ProtocolDefine.CG_COUNTRY_WAR_UNION_MEMBER_DELETE,
    )
    return e.putInt(t), e
  }

  static createWarUnionChange = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_UNION_HEAD_CHANGE)
    return e.putInt(t), e
  }

  static createWarUnionApply = function (t) {
    const e = new nato.Message(
      ProtocolDefine.CG_COUNTRY_WAR_UNION_MEMBER_APPLY,
    )
    return e.putInt(t), e
  }

  static createWarUnionApplyHelp = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_TO_FOREIGN)
    return e.putInt(t), e
  }

  static createWarUnionWarList = function (t, e, n) {
    const i = new nato.Message(
      ProtocolDefine.CG_COUNTRY_WAR_UNION_MEMBER_APPLY_LIST,
    )
    return i.putByte(t), i.putByte(e), i.putShort(n), i
  }

  static createWarDeclare = function (t, e, n, i) {
    const o = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_CREATE)
    return o.putInt(t), o.putInt(e), o.putInt(n), o.putBoolean(i), o
  }

  static createWarAnswerInfo = function () {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_ANSWER_GET_INFO)
    return t
  }

  static createWarDeclareAsk = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_ANSWER)
    return e.putByte(t), e
  }

  static createWarDeclareList = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_COUNTYR_LIST)
    return i.putByte(t), i.putByte(e), i.putShort(n), i
  }

  static createCountryWarEnter = function (t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_START)
    return e.putBoolean(t), e
  }

  static createWinActionInfo = function () {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_WIN_ACTION_INFO)
    return t
  }

  static createWinActionDo = function (t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_WIN_ACTION_DO)
    return i.putInt(t), i.putByte(e), i.putByte(n), i
  }

  static createCountryWarUpdate() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_UPDATE)
    return t
  }

  static createCountryWarOperArmy(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_GOTO_CELL)
    return n.putByte(t), n.putInt(e), n
  }

  static createCountryWarArmyList(t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_ARMY_LIST)
    return i.putByte(t), i.putByte(e), i.putShort(n), i
  }

  static createCountryWarCommandList() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_COMMAND_LIST)
    return t
  }

  static createCountryWarUseCommand(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_COMMAND_USE)
    return e.putShort(t), e
  }

  static createWarTextInfo(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_TEXT_LIST)
    return e.putByte(t), e
  }

  static createWarBattleList() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_SEE_LIST)
    return t
  }

  static createSkyArenaRefresh() {
    const t = new nato.Message(ProtocolDefine.CG_FIGHT_ENTER_PLAYER_NOTIFY)
    return t
  }

  static createArenaRefresh() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_ARENA_UPDATE)
    return t
  }

  static createArenaExit() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_ARENA_EXIT)
    return t
  }

  static createCountryPeopleDonate(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_PEOPLE_DONATE)
    return n.putByte(t), n.putInt(e), n
  }

  static createCountryLeaveMsg() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_PEOPLE_LEAVE)
    return t
  }

  static createWarUnionQuit() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_UNION_MEMBER_EXIT)
    return t
  }

  static createCountryMemberListMsg(t, e, n, i, o) {
    const a = new nato.Message(ProtocolDefine.CG_COUNTRY_PEOPLE_LIST)
    return (
      a.putInt(t), a.putByte(e), a.putShort(n), a.putInt(i), a.putByte(o), a
    )
  }

  static createCountryMemberAppleListMsg(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_APPLY_LIST)
    return n.putShort(t), n.putInt(e), n
  }

  static createCountryBuildingUpgradeMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_BUILDING_UPGRADE)
    return e.putByte(t), e
  }

  static createCountryBuildingRemoveMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_BUILDING_REMOVE)
    return e.putByte(t), e
  }

  static createCountryMainMenu() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_MISSION_MAIN)
    return t
  }

  static createCountryGetMission(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_MISSION)
    return e.putByte(t), e
  }

  static createCountryPublishMission(t, e) {
    if (e == null)
      return null
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_ISSUE_MISSION)
    n.putByte(t), n.putByte(e.length)
    for (let i = 0; i < e.length; i++) n.putShort(e[i])
    return n
  }

  static createCountryRecruitMsg(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_RECRUIT_CLOSE)
    return (
      e === 1 && n.setType(ProtocolDefine.CG_COUNTRY_RECRUIT_OPEN),
      n.putInt(t),
      n
    )
  }

  static createCountrySetOnlineNotify(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_SET_ONLINE_NOTIFY)
    return n.putBoolean(e), n
  }

  static createCountryTaxRate(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_SET_TAX)
    return n.putInt(t), n.putShort(e), n
  }

  static createCountryBossRefresh() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_COUNTRY_BOSS_UPDATE)
    return t
  }

  static createTeamBossRefresh() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_TEAM_BOSS_UPDATE)
    return t
  }

  static createTeamBossStart() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_TEAM_BOSS_JOIN)
    return t
  }

  static createCountryBossQuit() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_COUNTRY_BOSS_EXIT)
    return t
  }

  static createCountryEnterRate(t, e, n) {
    const i = new nato.Message(ProtocolDefine.CG_COUNTRY_SET_ENTRYTAX)
    return i.putInt(t), i.putInt(e), i.putInt(n), i
  }

  static createCountryInvite(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_INVITE)
    return e.putInt(t), e
  }

  static createCountryBossFight(t) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_COUNTRY_BOSS_FIGHT)
    return e.putByte(t), e
  }

  static createCountryBossNotFight() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_COUNTRY_BOSS_LEAVE_GRID)
    return t
  }

  static createTeamBossQuit() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_TEAM_BOSS_EXIT)
    return t
  }

  static createTeamBossFight(t) {
    const e = new nato.Message(ProtocolDefine.CG_TASK_TEAM_BOSS_FIGHT)
    return e.putByte(t), e
  }

  static createTeamBossNotFight() {
    const t = new nato.Message(ProtocolDefine.CG_TASK_TEAM_BOSS_LEAVE_GRID)
    return t
  }

  createCountryCreateWarCommand(e, n, i, o) {
    const a = MsgHandler.createCountryBookMsg(Define.COUNTRY_COMMAND_CREATE_WAR)
    return a.putInt(e), a.putInt(n), a.putInt(i), a.putBoolean(o), a
  }

  createCountryChangeResource(e, n, i) {
    const o = MsgHandler.createCountryBookMsg(Define.COUNTRY_COMMAND_TRANSFER_RESOURCE)
    return o.putInt(e), o.putInt(n), o.putShort(i), o
  }

  static createCountryBookMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_COMMAND_EXCUTE)
    return e.putByte(t), e
  }

  static createCountryBookMsgId(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_COMMAND_EXCUTE)
    return n.putByte(t), n.putByte(e), n
  }

  static createCountryKingCommand(e) {
    // var n = t.createCountryBookMsg(Define.COUNTRY_COMMAND_KING_COMMAND);
    //   return n.putByte(e), n;
  }

  static createCountryChangeName(e) {
    //   const n = t.createCountryBookMsg(Define.COUNTRY_COMMAND_CHANGE_NAME)
    //   return n.putString(e), n
  }

  static createCountryApplyDealMsg(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_APPLY_HANDLE)
    const newLocal = (n.putInt(t), n.putBoolean(e), n)
    return newLocal
  }

  static createCountryExchargeData() {
    const t = new nato.Message(ProtocolDefine.CG_COUNTRY_GET_EXCHARGE_LIST)
    return t
  }

  static createCountryAdjustJobMessage(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_APOINT_PEOPLE)
    n.putInt(t)
    n.putByte(e)
    return n
  }

  static createCountryBecomeKingMessage(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_KING_TRANSFER)
    e.putInt(t)
    return e
  }

  static createCountryDelMemMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_COUNTRY_PEOPLE_REMOVE)
    e.putInt(t)
    return e
  }

  static createCommandCreateWarDeclareList(t, e, n) {
    const i = new nato.Message(
      ProtocolDefine.CG_COUNTRY_GET_COMMAND_INFO_CREATE_WAR,
    )
    i.putByte(t)
    i.putByte(e)
    i.putShort(n)
    return i
  }

  static createWarTopPlayer(t, e) {
    const n = new nato.Message(
      ProtocolDefine.CG_COUNTRY_WAR_TOP_PEOPLE_COUNTRY_LIST,
    )
    n.putByte(t)
    n.putShort(e)
    return n
  }

  static createWarTopCountryPlayer(t, e) {
    const n = new nato.Message(
      ProtocolDefine.CG_COUNTRY_WAR_TOP_PEOPLE_COUNTRY_LIST,
    )
    n.putByte(t)
    n.putShort(e)
    return n
  }

  static createWarTopCountry(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_COUNTRY_WAR_TOP_COUNTRY_LIST)
    n.putByte(t)
    n.putByte(e)
    return n
  }

  static createPlayerLoginOutMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_LOGIN_ACTORLEAVE)
    e.putByte(t)
    return e
  }

  static createLevelRewardListMsg() {
    const t = new nato.Message(ProtocolDefine.CG_ACTOR_LEVEL_REWARD_LIST)
    return t
  }

  static createLevelRewardMsg(t) {
    const e = new nato.Message(ProtocolDefine.CG_ACTOR_DRAW_LEVEL_REWARD)
    e.putByte(t)
    return e
  }

  static createDrawMicroReward() {
    const t = new nato.Message(ProtocolDefine.CG_ACTOR_DRAW_MICRO_REWARD)
    return t
  }

  static createSevenDayReward(t) {
    const e = new nato.Message(
      ProtocolDefine.CG_ACTOR_DRAW_SEVEN_DAY_LOGIN_REWARD,
    )
    e.putByte(t)
    return e
  }

  static createSpringReward(t) {
    const e = new nato.Message(
      ProtocolDefine.CG_ACTOR_DRAW_SPRING_LOGIN_REWARD,
    )
    e.putByte(t)
    return e
  }

  static createExpandPackage(t: number, e: number) {
    const n = new nato.Message(ProtocolDefine.CG_ACTOR_EXPAND_PACKAGE)
    n.putByte(t)
    n.putInt(e)
    return n
  }

  static createExchangeMoneyMsg() {
    const t = new nato.Message(ProtocolDefine.CG_ACTOR_LIANJIN)
    return t
  }

  static createFiveDayActivityList() {
    const t = new nato.Message(ProtocolDefine.CG_ACTOR_DAY_ACTITY_LIST)
    return t
  }

  static createFiveDayActivityReward(t) {
    const e = new nato.Message(ProtocolDefine.CG_ACTOR_DRAW_DAY_ACTITY)
    e.putByte(t)
    return e
  }

  static createSingleChargeActivityData() {
    const t = new nato.Message(ProtocolDefine.CG_ACTOR_OPEN_EACH_CHARGE)
    return t
  }

  static createAccumulatedChargeActivityData() {
    const t = new nato.Message(ProtocolDefine.CG_ACTOR_OPEN_TOTAL_CHARGE)
    return t
  }

  static createAccumulatedChargeActivityReward(t) {
    const e = new nato.Message(ProtocolDefine.CG_ACTOR_DRAW_TOTAL_CHARGE)
    e.putByte(t)
    return e
  }

  static createFoundationData() {
    const t = new nato.Message(ProtocolDefine.CG_ACTIVITY_FUND_PAGE)
    return t
  }

  static createFoundationReward(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_ACTIVITY_FUND_REWARD)
    n.putInt(t)
    n.putInt(e)
    return n
  }

  static createFoundationBuy() {
    const t = new nato.Message(ProtocolDefine.CG_ACTIVITY_FUND_BUY)
    return t
  }

  static createHotShopList() {
    const t = new nato.Message(ProtocolDefine.CG_HOT_SHOP_LIST)
    return t
  }

  static createRefreshHotShop() {
    const t = new nato.Message(ProtocolDefine.CG_REFRESH_HOT_SHOP)
    return t
  }

  static createBuyHotShopItem(t) {
    const e = new nato.Message(ProtocolDefine.CG_BUY_HOT_SHOP_ITEM)
    e.putInt(t)
    return e
  }

  static createChannelShareMsg(t, e) {
    const n = new nato.Message(ProtocolDefine.CG_CHANNEL_SHARE)
    const i = JSON.stringify({ access_token: t, status: e })
    n.putString(i)

    return n
  }

  static saveToDesktop() {
    const t = new nato.Message(ProtocolDefine.CG_SAVE_TO_DESKTOP)
    return t
  }

  static createFollow() {
    const t = new nato.Message(ProtocolDefine.CG_FOLLOW_STATUS)
    return t
  }

  static createNationalDay() {
    const t = new nato.Message(
      ProtocolDefine.CG_ACTOR_OPEN_NATIONAL_DAY_CHARGE_RANK,
    )
    return t
  }
}

export namespace MsgHandler {
  export const MAX_OTHER_MOVE_TO = 5
  export const CHECK_VERSION_NONE = 0
  export const CHECK_VERSION_LOW = 1
  export const PET_INFO_PLAYER_SHOP = 1
  export const PET_INFO_GOODS = 2
  export const PET_INFO_MAIL = 3
  export const PET_INFO_SEE_PLAYER = 4
  export const PET_INFO_CHAT = 5
}
