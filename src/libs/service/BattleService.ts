import { Emitter, Event } from '@livemoe/utils'
import { MsgHandler } from 'libs/base/MsgHandler'
import type { nato } from 'libs/base/nato'
import { Processor } from 'libs/base/processor'
import type { SocketClient } from 'libs/base/socket'
import { Define } from 'libs/defined/defined'
import { ProtocolDefine } from 'libs/defined/protocol'
import { Tool } from 'libs/shared/Tool'
import type { GameMap } from 'libs/typings/GameMap'
import { MonsterGroup } from 'libs/typings/MonsterGroup'
import type { Player } from 'libs/typings/Player'
import { Battle } from './Battle/battle'
import { BATTLE_ERROR_CODE } from './Battle/const'
import type { GameService } from './GameService'
import { $Logger } from '~/logger'

const $Log = $Logger.create('bs').log

export class BattleService {
  private battleSeed = 0
  private inBattle = false

  // #region event
  private _onBattleStart = new Emitter<void>()
  private _onBattleUpdate = new Emitter<void>()
  private _onBattleError = new Emitter<void>()
  private _onBattleFinish = new Emitter<void>()

  readonly onBattleStart = this._onBattleStart.event
  readonly onBattleUpdate = this._onBattleUpdate.event
  readonly onBattleError = this._onBattleError.event
  readonly onBattleFinish = this._onBattleFinish.event

  // #endregion

  constructor(readonly socket: SocketClient, readonly service: GameService) {

  }

  whenBattleFinish() {
    if (!this.inBattle)
      return Promise.resolve()

    return Event.toPromise(this.onBattleFinish)
  }

  private getBattleByGroupID(player: Player, map: GameMap, group: MonsterGroup) {
    const modelList = MonsterGroup.getLocalBattlePlayerList(player, map, group)

    this.nextSeed()

    return Battle.createLocalBattle(this.battleSeed, modelList as Player[], group, player)
  }

  private nextSeed() {
    this.battleSeed = (this.battleSeed + 1) % Tool.MAX_SEED_VALUE

    return this.battleSeed
  }

  /**
   * 如果 在组队状态、护送地图或者是NetBattle, 需要进入RemoteBattle
   */
  toBattle(player: Player, map: GameMap, group: MonsterGroup) {
    const id = group.groupId

    // TODO: escort
    if (Define.isNetBattleID(id) || (player.isLeader() && player.isHasPlayerMember()))
      return this.toRemoteBattle(player, map, group)

    return this.toLocalBattle(player, map, group)
  }

  private toLocalBattle(player: Player, map: GameMap, group: MonsterGroup) {
    const msg = MsgHandler.createEnterLocalBattle()

    this.socket.sendCmd(msg)

    const battle = this.getBattleByGroupID(player, map, group)

    const onResult = (message) => {
      this.socket.removeMsgHandler(ProtocolDefine.CG_FIGHT_RUN_LOCALBATTLE, onResult, this.service)
      this.onBattleResult(battle, message)
    }

    this.socket.addMsgHandler(ProtocolDefine.CG_FIGHT_RUN_LOCALBATTLE, onResult, this.service)

    battle.onBattleFinish(async (e) => {
      $Logger.log('Battle Finish', e)

      await this.socket.sendCmd(e)
    })

    battle.battleView.logic()

    return battle
  }

  private async toRemoteBattle(player: Player, map: GameMap, group: MonsterGroup) {
    const message = MsgHandler.createEnterRemoteBattle(group.groupId)

    const bytes = await this.socket.sendCmd(message)
    const code = bytes.getByte()

    if (code < 0) {
      $Log('battle failed, error: ', bytes.getString())
      return null
    }

    const battle = Battle.createRemoteBattle(bytes, player)

    const onResult = (e: nato.Message) => {
      this.socket.removeMsgHandler(ProtocolDefine.CG_FIGHT_BATTLE_UPDATE, onResult, this.service)
      this.onBattleResult(battle, e)
    }

    this.socket.addMsgHandler(ProtocolDefine.CG_FIGHT_BATTLE_UPDATE, onResult, this.service)

    return battle
  }

  private processBattleError(code: number): boolean {
    if (code < 0) {
      switch (code) {
        case BATTLE_ERROR_CODE.INSUFFICIENT_LEVEL:

          break
      }

      return false
    }

    return true
  }

  private onBattleResult(battle: Battle, e: nato.Message) {
    const code = e.getByte()

    if (code < 0) {
      $Log('battle failed, error', e.getString())

      return
    }

    switch (battle.type) {
      case Battle.LOCAL:
        this.onLocalBattleResult(e, code)
        break
      case Battle.REMOTE:
        this.onRemoteBattleResult(e, code)
        break
    }
  }

  private onLocalBattleResult(e: nato.Message, code: number) {
    if (code === 2) {
      // parse normal reward
      Processor.parseBattleNormalReward(e, this.service)

      // handle npc mission status
      Processor.processMissionNPCStatus(e, this.service)
    }

    let f = e.getBoolean()
    if (!f)
      this.service.player.power = -1

    // mercenary
    Processor.processMyMercenaryCheck(e, this.service)

    f = e.getBoolean()
    if (f) {
      // changeMap ?
    }

    f = e.getBoolean()
    if (!f)
      this.service.player.countrypowerValue = 0

    // handle player durability
    this.service.handleMyPlayerDurability(false, 0)
    // handle player hp and mp
    this.service.player.checkHPMP()
  }

  private onRemoteBattleResult(e: nato.Message, code: number) { }
}
