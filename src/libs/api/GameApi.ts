import type { SocketClient } from 'libs/base/socket'
import type { GameService } from 'libs/service/GameService'
import { AchieveTitle } from 'libs/typings/AchieveTitle'
import type { ItemData } from 'libs/typings/ItemData'
import type { Mission } from 'libs/typings/Mission'
import { OfflineExp } from 'libs/typings/OfflineExp'
import type { Player } from 'libs/typings/Player'
import { RoleInfo } from 'libs/typings/RoleInfo'
import { ShopItemData } from 'libs/typings/ShopItem'
import type { Skill } from 'libs/typings/Skill'
import type { Long } from 'libs/base/protocol'
import { Protocol, ProtocolCmd } from 'libs/base/protocol'
import { ApiClient } from './api'
import type { IApiClientResponse } from '~/types'

export class GameApiClient extends ApiClient {
  constructor(protected readonly socket: SocketClient, protected readonly service: GameService) {
    super(socket)
  }

  async firstGameServer(key: Long, session: number): IApiClientResponse {
    const message = Protocol.createFirstGameServerMsg(key, session)

    const bytes = await this.socket.send(message)

    const code = bytes.getByte()

    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  // #region role
  async loginRole(role: RoleInfo): IApiClientResponse {
    const message = Protocol.createPlayerEnterMsg(role.id, '')

    const bytes = await this.socket.send(message)

    const code = bytes.getByte()

    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async deleteRole(role: RoleInfo): IApiClientResponse {
    const message = Protocol.createDelPlayerMsg(role.getId())
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async recoverRole(role: RoleInfo): IApiClientResponse {
    const message = Protocol.createCancelDelPlayerMsg(role.getId())
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async verifyDeleteRoleProtectCode(role: RoleInfo, protectCode: string): IApiClientResponse {
    const message = Protocol.createDeleteRoleByProtectCodeMsg(role.getId(), protectCode)
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async getRoleList(): IApiClientResponse<RoleInfo[]> {
    const message = Protocol.createPlayerListMsg()
    const bytes = await this.socket.send(message)

    const len = bytes.getByte()
    const roles: RoleInfo[] = []

    for (let i = 0; i < len; i++) {
      const role = RoleInfo.fromBytes(bytes)
      roles.push(role)
    }

    return this.makeResponse(0, roles)
  }
  // #endregion

  // #region Skill

  async setAutoSkill(player: Player, skill: Skill): IApiClientResponse {
    const b = player.isAutoSkill(skill.id) < 0
    const message = Protocol.createAutoSkillMsg(player, skill.id, b)
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }
  // #region

  // #region AchieveTitle

  async getAchieveTitleList(): IApiClientResponse<AchieveTitle[]> {
    const message = Protocol.createAchieveTitleList()
    const bytes = await this.socket.send(message)
    return this.makeResponse(0, AchieveTitle.fromBytes(bytes))
  }

  async setAchieveTitle(id: number): IApiClientResponse {
    const message = Protocol.createAchieveUseTitle(id)
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code < 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  // #region

  // #region Mission

  async getRandomMissionInfo() {
    const msg = new Protocol(ProtocolCmd.CG_TASK_RANDOM_INFO)

    const bytes = await this.socket.send(msg)

    // const mission = new RandomMission(0)
    // mission.setting |= 2097152
    // mission.fromRandomMission(bytes)
    // mission.moneyType = bytes.getInt()
    // mission.money = bytes.getInt()
    // mission.myCount = bytes.getByte()
    // mission.maxCount = bytes.getByte()

    return this.makeResponse(0, bytes)
  }

  async acceptMission(mission: Mission, player: Player): IApiClientResponse {
    const message = Protocol.createTaskAcceptMsg(player.getId(), mission.getId())
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async submitMission(mission: Mission, player: Player, item?: ItemData): IApiClientResponse {
    const message = Protocol.createTaskDeliverMsg(
      player.getId(),
      mission.id,
      item?.id ?? -1,
    )
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async deleteMission(mission: Mission, player: Player): IApiClientResponse {
    const message = Protocol.createTaskAbandonMsg(mission.getId())
    const bytes = await this.socket.send(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())
    player.deleteMission(mission)
    return this.makeResponse(code, bytes)
  }

  // #endregion

  // #region offline
  async getOfflineExpInfo(): IApiClientResponse<OfflineExp> {
    const message = new Protocol(ProtocolCmd.CG_ACTOR_OFFLINE_EXP_OPEN)
    const bytes = await this.socket.send(message)
    return this.makeResponse(0, OfflineExp.fromBytes(bytes))
  }

  async getOfflineExp(rate3 = false): IApiClientResponse {
    const message = new Protocol(ProtocolCmd.CG_ACTOR_OFFLINE_EXP_GET)
    message.setInt(rate3 ? 1 : 0)
    const bytes = await this.makeRequest(message)
    const code = bytes.getByte()
    if (code < 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async prayOfflineExp(): IApiClientResponse {
    const message = new Protocol(ProtocolCmd.CG_ACTOR_OFFLINE_EXP_PRAY)
    const bytes = await this.makeRequest(message)
    const code = bytes.getByte()
    if (code < 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async upgradeGoddess() {
    // noop
  }
  // #endregion

  // #region bag
  async expandPackageByTime(player: Player): IApiClientResponse {
    const message = Protocol.createExpandPackage(1, player.bag.bagEnd)
    const bytes = await this.makeRequest(message)
    const code = bytes.getByte()
    if (code < 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }

  async expandPackageByMoney(player: Player, i = 1): IApiClientResponse {
    const message = Protocol.createExpandPackage(0, player.bag.bagEnd + i)
    const bytes = await this.makeRequest(message)
    const code = bytes.getByte()
    if (code < 0)
      return this.makeResponse(code, bytes.getString())

    return this.makeResponse(code, bytes)
  }
  // #endregion

  // #region Shop
  async getShopItemList(shopId: number): IApiClientResponse<ShopItemData[]> {
    const message = Protocol.createItemShopListMsg(shopId)
    const bytes = await this.makeRequest(message)
    const code = bytes.getByte()
    if (code !== 0)
      return this.makeResponse(code, bytes.getString())

    const len = 255 & bytes.getByte()
    const itemList: ShopItemData[] = []
    if (len <= 0)
      return this.makeResponse(code, itemList)
    for (let i = 0; len > i; i++) {
      const item = ShopItemData.fromBytesShopItem(bytes)
      itemList.push(item)
    }

    return this.makeResponse(code, itemList)
  }
  // #endregion
}
