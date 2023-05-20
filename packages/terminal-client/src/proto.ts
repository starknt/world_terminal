import type { ByteArray, Long } from '@terminal/core'
import { Protocol } from '@terminal/core'
import { Define, ProtocolType } from '@terminal/models'
import type { Item, ShopItem } from '@terminal/models/parser'

export function createSystemHeartMsg(mapId: number) {
  return new Protocol(ProtocolType.CG_SYSTEM_HEART).setShort(mapId)
}

export function createCheckEditionMsg(channel: number, id: number) {
  return new Protocol(ProtocolType.LC_CHECKEDITION)
    .setShort(id)
    .setInt(320200)
    .setShort(channel)
    .setByte(0)
    .setString('h5')
    .setByte(1)
    .setByte(Define.CLIENT_TYPE_JAR)
}

export function createUserLoginMsg(username: string, password: string) {
  return new Protocol(ProtocolType.LC_PLAYER_LOGIN)
    .setString(username)
    .setString(password)
    .setString('')
    .setString('')
    .setByte(0)
    .setByte(0)
}

export function createAreaLineListMsg() {
  return new Protocol(ProtocolType.LC_GAME_GET_AREA_AND_LINE)
}

export function createFirstGameServerMsg(key: Long, sessionId: number) {
  return new Protocol(ProtocolType.CG_LOGIN_PLAYERCHECK)
    .setLong(key)
    .setInt(sessionId)
    .setByte(Define.LANG_DEFAULT)
    .setInt(320200)
    .setByte(Define.CLIENT_TYPE_JAR)
}

export function createPlayerListMsg() {
  return new Protocol(ProtocolType.CG_LOGIN_ACTORLIST)
}

export function createDelPlayerMsg(id: number) {
  return new Protocol(ProtocolType.CG_LOGIN_DELETEACTOR).setInt(id)
}

export function createDeleteRoleByProtectCodeMsg(t: number, e: string) {
  return new Protocol(ProtocolType.CG_LOGIN_DELETEACTOR_PASSWD).setInt(t).setString(e)
}

export function createCancelDelPlayerMsg(id: number) {
  return new Protocol(ProtocolType.CG_LOGIN_RECOVERACTOR).setInt(id)
}

export function createPlayerEnterMsg(id: number) {
  return new Protocol(ProtocolType.CG_LOGIN_ACTORENTER)
    .setInt(id)
    .setInt(Define.LOGIN_DATA_FLAG)
    .setInt(0)
    .setString('')
    .setByte(Define.CLIENT_TYPE_JAR)
    .setString('')
    .setString('')
}

export function createUserRegisterMsg(username: string, password: string) {
  return new Protocol(ProtocolType.LC_PLAYER_CREATE)
    .setString(username)
    .setString(password)
    .setString('')
    .setString('abc')
    .setString('')
    .setString('随机吧')
    .setString('440106198001018491')
    .setInt(0)
}

export function createWorldDataMessage(t: number, e: boolean, mapId: number) {
  return new Protocol(ProtocolType.CG_SCENE_WORLDDATA)
    .setShort(mapId)
    .setBoolean(e)
    .setInt(t)
    .setByte(0)
    .setByte(0)
}

export function createJumpCityMessage(t: number, e: number) {
  return new Protocol(ProtocolType.CG_SCENE_GO_CITY)
    .setInt(t)
    .setInt(e)
}

export function createBrowseCityInfoMsg(t: number) {
  return new Protocol(ProtocolType.CG_CITY_INFO).setInt(t)
}

export function createMoveMessage(x: number, y: number) {
  return new Protocol(ProtocolType.CG_SCENE_PLAYER_MOVING).setByte(x).setByte(y)
}

export function createOtherMoveMessage() {
  return new Protocol(ProtocolType.CG_SCENE_GET_OTHER_PLAYER_STATE)
}

export function createEnterLocalBattle() {
  return new Protocol(ProtocolType.CG_FIGHT_ENTER_LOCALBATTEL)
}

export function createEnterRemoteBattle(t: number) {
  return new Protocol(ProtocolType.CG_FIGHT_ENTER_REMOTEBATTLE).setShort(t)
}

export function createFightSeeInterMsg(t: number) {
  return new Protocol(ProtocolType.CG_FIGHT_SEE_IN).setInt(t)
}

export function createFightSeeQuitMsg() {
  return new Protocol(ProtocolType.CG_FIGHT_SEE_OUT)
}

export function createBattlePlan(round: number, playerPlan: ByteArray, petPlan?: ByteArray) {
  const protocol = new Protocol(ProtocolType.CG_FIGHT_BATTLE_DOPLAN)
    .setByte(round)
    .setBytes(playerPlan)
    .setBoolean(!!petPlan)

  if (petPlan)
    protocol.setBytes(petPlan)

  return protocol
}

export function createBattleUpdate(round: number) {
  return new Protocol(ProtocolType.CG_FIGHT_BATTLE_UPDATE).setByte(round)
}

export function createJumpMapMessage(mapId: number, x: number, y: number, flag: number) {
  return new Protocol(ProtocolType.CG_SCENE_GO_MAP)
    .setShort(mapId)
    .setByte(x)
    .setByte(y)
    .setInt(flag)
}

export function createPlayerBagMessage(cmd: ProtocolType, type: ProtocolType, item: Item, num: number, o = false, a = false) {
  const protocol = new Protocol(ProtocolType.CG_ACTOR_PLAYERBAG)
  protocol.setByte(cmd)
  protocol.setByte(type)
  protocol.setShort(item.slotPos)

  type === ProtocolType.PLAYERBAG_EQUIP
    ? protocol.setByte(num)
    : type === ProtocolType.PLAYERBAG_LOSE
      ? protocol.setInt(item.id)
      : type === ProtocolType.PLAYERBAG_ENCHASE
        ? protocol.setShort(num)
        : (item.isPetCanUseItem() && protocol.setShort(num))

  protocol.setBoolean(o)
  protocol.setBoolean(a)
  return protocol
}

export function createGetNPCData(npc?: number[]) {
  const protocol = new Protocol(ProtocolType.CG_SCENE_GETNPC)
  if (!npc)
    return protocol.setByte(0)
  protocol.setByte(npc.length)
  for (let i = 0; i < npc.length; i++)
    protocol.setByte(npc[i])
  return protocol
}

export function createAutoMoveMsgByMission(id: number) {
  return new Protocol(ProtocolType.CG_SCENE_FINDPATH_MISSION).setByte(2).setShort(id)
}

export function createExpandPackage(type: number, slot: number) {
  return new Protocol(ProtocolType.CG_ACTOR_EXPAND_PACKAGE).setByte(type).setInt(slot)
}

export function createTaskAbandonMsg(id: number) {
  return new Protocol(ProtocolType.CG_TASK_ABANDON).setShort(id)
}

export function createTaskDeliverMsg(pid: number, mid: number, iid = -1) {
  return new Protocol(ProtocolType.CG_TASK_DELIVER).setShort(pid).setShort(mid).setInt(iid)
}

export function createTaskAcceptMsg(nid: number, mid: number) {
  return new Protocol(ProtocolType.CG_TASK_ACCEPT).setShort(nid).setShort(mid)
}

export function createAchieveUseTitle(id: number) {
  return new Protocol(ProtocolType.CG_TITLE_USE).setShort(id)
}

export function createAchieveTitleList() {
  return new Protocol(ProtocolType.CG_TITLE_GETLIST)
}

export function createItemShopListMsg(id: number) {
  return new Protocol(ProtocolType.CG_ITEMSHOP_LIST).setShort(id)
}

export function createItemShopBuy(sid: number, item: ShopItem, num = 1) {
  const protocol = new Protocol(ProtocolType.CG_ITEMSHOP_BUY)
  protocol.setShort(sid)
    .setInt(item.id)
    .setByte(num)
    .setBoolean(Define.isCountryShop(sid))
  if (Define.isCountryShop(sid)) {
    protocol
      .setInt(item.money1)
      .setInt(item.money2)
      .setInt(item.money3)
  }
  return protocol
}
