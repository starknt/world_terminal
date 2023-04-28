import { Emitter, Event, Queue, runWhenIdle } from '@livemoe/utils'
import { GameApiClient } from 'libs/api'
import { Long, Protocol, ProtocolCmd } from 'libs/base/protocol'
import { Processor } from 'libs/base/processor'
import { SocketClient } from 'libs/base/socket'
import { Define } from 'libs/defined/defined'
import { GZIP } from 'libs/shared/GZIP'
import { GameMap } from 'libs/typings/GameMap'
import { Mercenary } from 'libs/typings/Mercenary'
import { Mission } from 'libs/typings/Mission'
import { Model } from 'libs/typings/Model'
import { MonsterAI } from 'libs/typings/MonsterAI'
import { NPC } from 'libs/typings/Npc'
import { Pet } from 'libs/typings/PetInfo'
import { Player } from 'libs/typings/Player'
import { PlayerBag } from 'libs/typings/PlayerBag'
import { RoleInfo } from 'libs/typings/RoleInfo'
import type { ServerInfo } from 'libs/typings/ServerInfo'
import { Skill } from 'libs/typings/Skill'
import type { RoleLoadedResult } from 'libs/typings/type'
import pretty from 'pretty-ms'
import { BattleService } from './BattleService'
import { $Logger } from '~/logger'

const $Log = $Logger.create('Game Service').log

export class GameService {
  static readonly HEART_BEAT_TIME = 15e3
  private nextHeartBeat = 0
  private lastHeartBeat = 0
  readonly gameMap = new GameMap()
  private startGameTime = 0
  private endGameTime = 0
  private heartBeatTimer!: number
  private syncOtherMoveTimer!: number

  private isJumpingMap = false
  private readonly _onJumpMapEnd = new Emitter<void>()
  readonly onJumpMapEnd = this._onJumpMapEnd.event
  private uKey: Long = new Long(0, 0)
  private sessionId = 0
  private readonly socket = new SocketClient()
  readonly client = new GameApiClient(this.socket, this)
  private readonly _onRoleLoaded = new Emitter<RoleLoadedResult>()
  private readonly _onRoleLogin = new Emitter<Player>()
  private readonly _onClose = new Emitter<number>()

  player: Player = new Player()

  readonly onRoleLoadedEvent = this._onRoleLoaded.event
  readonly onRoleLoginEvent = this._onRoleLogin.event
  readonly onCloseConnect = this._onClose.event

  readonly battleService = new BattleService(this.socket, this)

  constructor() {
    window.world = this

    this.socket.onSocketCloseEvent((online) => {
      $Log('Socket Close, online: ', pretty(online))

      this._onClose.fire(online)
      this.onClose()
    })

    this.socket.onSocketErrorEvent((e) => {
      $Log('Socket Error', e)
    })
  }

  async connectGameServer(uKey: Long, sessionId: number, lineServer: ServerInfo) {
    this.uKey = uKey
    this.sessionId = sessionId
    const url = lineServer.lineList.length > 0 ? lineServer.lineList[0].webSocketUrl : lineServer.webSocketUrl

    await this.socket.connect(url)

    const firstGameServerRes = await this.client.firstGameServer(this.uKey, this.sessionId)

    if (firstGameServerRes.code !== 0) {
      $Logger.log('First game server message', firstGameServerRes.error)
      return
    }

    this.requestRoleList()
  }

  private async requestRoleList() {
    const res = await this.client.getRoleList()
    this._onRoleLoaded.fire({
      roles: res.data!,
      creatable: 0,
    })
  }

  roleLogin(role: RoleInfo) {
    const roleMsg = Protocol.createPlayerEnterMsg(role.id, '')

    this.socket.addProtocol(ProtocolCmd.CG_SCENE_WORLDDATA, this.onSceneWorldData, this)
    this.socket.addProtocol(ProtocolCmd.CG_SCENE_GO_MAP, this.onJumpMap, this)
    this.socket.addProtocol(ProtocolCmd.CG_SCENE_GO_CITY, this.onJumpCityMsg, this)

    this.socket.send(roleMsg, this.onRoleLogin, this)
  }

  handleMyPlayerDurability(t: boolean, e: number) {
    const n = this.player
    if (n != null) {
      this.handleBattleEndHp(e)
      const i = n.bag
      i != null
        && (i.checkEquipTimeItem(),
          i.handlePlayerDurability(t),
          n.checkHPMP()
        )
    }
  }

  hpRecover(t) {
    t != null
      && (t.get(Model.LEVEL) < 10
        ? (t.hp = t.get(Model.HPMAX))
        : (t.hp = 1))
  }

  handleBattleEndHp(t: number) {
    const e = this.player
    if (e != null) {
      if (t == 0) {
        const n = e.getBagEquipPowerValue(Define.POWER_HPMP_RECOVER)
        n > 0
          && (Define.addValuePlayer(e, Model.HP, n, true, Model.HPMAX),
            Define.addValuePlayer(e, Model.MP, n, true, Model.MPMAX))
      }
      e.isDead() && this.hpRecover(e)
      const i = e.getPet()
      i && i.isDead() && this.hpRecover(i)
      const o = e.getMerList()
      if (o) {
        for (let a = 0; a < o.length; a++) {
          const r = o[a]
          if (r != null) {
            r.isDead() && this.hpRecover(r)
            const s = r.getPet()
            s && s.isDead() && this.hpRecover(s)
          }
        }
      }
    }
  }

  async doEnterCity(id: number) {
    const message = Protocol.createJumpCityMessage(id, Define.JUMP_MAP_DATA_FLAG)
    await this.socket.send(message)
  }

  private onJumpCityMsg(byte: Protocol) {
    const e = byte.getByte()
    if (e !== 0)
      return

    this.processData(byte)
  }

  private onJumpMap(byte: Protocol) {
    const e = byte.getByte()
    if (e < 0) {
      console.error('onJumpMap error', byte.getString())
      return
    }

    this.processData(byte)
  }

  private onSceneWorldData(byte: Protocol) {
    const e = byte.getByte()

    if (e === 0)
      this.processData(byte)
  }

  private async onRoleLogin(byte: Protocol) {
    const n = byte.getByte()

    if (n === 0) {
      byte.getInt() // loginSetting

      // delete skill money
      byte.getByte()
      byte.getInt()

      // delete attribute
      byte.getByte()
      byte.getInt()
      byte.getInt()

      // noop
      byte.getByte()
      byte.getInt()
      byte.getByte()
      byte.getShort()

      // partner and money
      byte.getByte()
      byte.getInt()

      await this.processData(byte)

      this.startGameTime = Date.now()
      this.heartBeatTimer = setInterval(() => this.sendHeartbeat(), 1000)
      this.syncOtherMoveTimer = setInterval(() => this.syncOtherMove(), 6 * 1000)

      this._onRoleLogin.fire(this.player)
    }
  }

  moveToMissionSceneById(id: number) {
    return new Promise<void>((resolve, reject) => {
      const msg = Protocol.createAutoMoveMsgByMission(id)
      this.socket.send(msg, (byte) => {
        const queue = new Queue<void>()

        const i = byte.getByte()
        if (i < 0) {
          console.error(byte.getString())
          return
        }

        const length = byte.getByte()
        for (let i = 0; i < length; i++) {
          const o = byte.getByte()
          const a = byte.getByte()
          const r = byte.getShort()
          const s = byte.getByte()
          const l = byte.getByte()

          console.log(`mapId: ${r} x: ${s} y: ${l}`)
          queue.queue(() => {
            return this.jumpMap(r, s, l)
          })
        }

        const o = byte.getByte()
        const a = byte.getByte()

        queue.onFinished(() => {
          queue.dispose()
          resolve()
        })
      }, this)
    })
  }

  async whenJumpMapEnd() {
    if (!this.isJumpingMap)
      return Promise.resolve()

    return Event.toPromise(this.onJumpMapEnd)
  }

  jumpMap(mapId: number, x: number, y: number) {
    const msg = Protocol.createJumpMapMessage(mapId, x, y, Define.JUMP_MAP_DATA_FLAG)
    this.isJumpingMap = true
    this.socket.send(msg)

    return this.whenJumpMapEnd()
  }

  private async processData(byte: Protocol) {
    const n = byte.getInt()
    let i = n

    if (Define.isAllocateMirrorMap(n) || Define.isAllocateCityMap(n) || Define.isAllocateCountryMap(n))
      i = byte.getShort()

    this.gameMap.orgMapId = i

    const mapPositionX = byte.getByte()
    const mapPositionY = byte.getByte()
    const flag = byte.getInt()

    const l = (flag & Define.DATA_PLAYER_DETAIL) !== 0
    const _ = (flag & Define.DATA_MAP_NORMAL) !== 0

    if (_) {
      this.isJumpingMap = true
      console.log('跳转地图中...')
      console.log(`mapPositionX: ${mapPositionX}, mapPositionY: ${mapPositionY}, flag: ${flag}`)
    }

    for (let h = 0; h < Define.DATA_END; h++) {
      const u = flag & (1 << h)
      if (u !== 0) {
        switch (u) {
          case Define.DATA_PLAYER_DETAIL:
            {
              // 角色详细数据
              const player = Player.fromPlayerBytes(byte)
              console.log('角色数据: ', player)
              const pet = Pet.fromBytesMyPlayer(byte, player)
              console.log('宠物数据', pet)
              for (let i = byte.getByte(), o = 0; o < i; o++) {
                const mercenary = Mercenary.fromBytesFull(byte)
                console.log('合伙人数据', mercenary)

                player.addMercenary(mercenary)
              }
              this.player = player as Player
              this.player.setPet(pet)
              const r = byte.getBoolean()
              if (r) {
                // 新邮件
                player.setTabStatus(true, Model.MAIL_NEW_NOTICE)
              }
            }
            break
          case Define.DATA_PLAYER_MISSION_BYTE:
            {
              // 任务数据
              const bytes = byte.getLengthBytes()
              const size = bytes.size
              const data = bytes.data
              const missionStatus: number[] = []
              for (let d = 0; d < size; d++)
                missionStatus[d] = data.readByte()
              this.player.missionStatus = missionStatus
            }
            break
          case Define.DATA_PLAYER_MISSION:
            {
              // 角色任务数据
              for (let i = byte.getByte(), o = 0; o < i; o++) {
                const mission = Mission.fromBytes(byte.getBytes())
                mission.owner = this.player
                this.player.addMission(mission)
              }
            }
            break
          case Define.DATA_PLAYER_ITEM:
            {
              // 背包数据
              const bag = PlayerBag.fromBytes(this.player, byte)
              this.player.bag = bag
            }
            break
          case Define.DATA_PLAYER_SKILL:
            {
              // 角色技能数据
              const skills = Skill.processDataPlayerSkillMsg(byte, true)
              this.player.skillList = skills
            }
            break
          case Define.DATA_PLAYER_LIST_BASE:
            {
              // 队伍信息
              const o = new Array(byte.getShort())
              for (let i = 0; i < o.length; i++) {
                const model = new Model(3)
                Model.fromBytes(byte, model)
                const pet = Pet.fromBytesOtherPlayer(byte, model)
                model.setPet(pet)
                for (let i = byte.getByte(), o = 0; o < i; o++) {
                  const mercenary = Mercenary.fromBytesSimple(byte)
                  model.merList.push(mercenary)
                }

                model.setRemark(byte.getString())
                model.setEnchantValue(byte.getInt())
                model.iconpet1 = byte.getShort()
                o[i] = model
              }
              this.player.clearMember()

              const e = byte.getShort()
              const n = false
              for (let o = 0; o < e; o++) {
                for (let a = byte.getInt(), s = byte.getByte(), l = 0; l < s; l++) {
                  const _ = byte.getInt()
                  console.log(a, 'member: ', _)
                }
              }

              const r = this.player.leaderID
              if (r > 0)
                console.log('队长信息', r)
            }
            break
          case Define.DATA_PLAYER_LIST_EXTRA:
            break
          case Define.DATA_MAP_NORMAL:
          case Define.DATA_MAP_MINI:
            {
              // 地图数据
              this.mapDataHandler(byte, n, i, l)
            }
            break
          case Define.DATA_NPC_BASE:
            {
              // npc
              let e: egret.ByteArray
              const n = byte.getShort()
              let i = byte.position
              const o = byte.dataView
              const npc: number[] = []
              if (n > 0) {
                for (let r = 0; r < n; r++)
                  npc[r] = o.getInt8(i++)

                byte.position = i
              }
              e = GZIP.inflate(npc)
              const npcList = NPC.loadNPC(e)
              this.gameMap.npcList = npcList
            }
            break
          case Define.DATA_MONSTER_GROUP:
            {
              // monster group
              const monsterGroup = Processor.processDataMonsterGroupMsg(byte, this)
              this.gameMap.monsterGroupList = monsterGroup
            }
            break
          case Define.DATA_MONSTER_MODEL:
            {
              // monster model
              const monsterModel = Processor.processDataMonsterMsg(byte, this)

              monsterModel.forEach(monster => this.gameMap.addMonster(monster))
              if (monsterModel.length > 0) {
                const monsterAI = MonsterAI.processDataMonsterAIMsg(byte)
                this.gameMap.monsterAIList = monsterAI
              }
            }
            break
          case Define.DATA_GUILD_MAP:
            {
              // ??
              const cityName = byte.getString()
              if (!cityName)
                return
              console.log('Guild Map数据', `城市名: ${cityName}`, `城市等级: ${byte.getInt()}`, `城市军力: ${byte.getInt()}`)
            }
            break
          case Define.DATA_CITY:
            {
              // city data
              const cityMasterId = byte.getInt()
              const cityName = byte.getString()
              const cityDegree = byte.getInt()
              const cityArmy = byte.getInt()
              const cityScale = byte.getByte()
              const cityLevel = byte.getByte()
              console.log('City数据', `主人Id: ${cityMasterId}`, `城市名: ${cityName}`, `城市等级: ${cityLevel}`, `城市军力: ${cityArmy}`, `城市人口: ${cityDegree}`, `城市规模: ${cityScale}`)
            }
            break
          case Define.DATA_NOTICE:
            {
              console.log('Notice数据', byte.getString())
            }
            break
          case Define.DATA_FORMATION:
            {
              const skills = Skill.doGetFormation(byte)
              const P = byte.getBoolean()
              if (P) {
                const formationSkill = Skill.fromByteFormationSkill(byte)
                console.log('Formation Skill数据', formationSkill)
              }
              else {
                console.log('Formation 数据', skills)
              }
            }
            break
          case Define.DATA_MASTER_INFO:
            break
          case Define.DATA_TURN_MONSTER:
            {
              const v = byte.getBoolean()
              if (v)
                throw new Error('DATA_TURN_MONSTER')
            }
        }
      }
    }
  }

  private mapDataHandler(byte: Protocol, n: number, i: number, o: boolean) {
    const a = byte.getShort()
    let r = byte.position
    const s = byte.dataView
    const l = new Array(a)
    for (let t = 0; t < a; t++)
      l[t] = s.getInt8(r++)

    byte.position = r
    byte.getString()
    byte.getString()
    byte.getByte()
    this.gameMap.mapId = n
    this.gameMap.orgMapId = i
    this.isJumpingMap = false
    runWhenIdle(() => this._onJumpMapEnd.fire())
    console.log(`mapId: ${this.gameMap.mapId}, orgMapId: ${this.gameMap.orgMapId}`)
    const msg = Protocol.createWorldDataMessage(Define.NEW_SCENE_DATA_FLAG, o, n)
    this.socket.send(msg)
    for (const npc of this.gameMap.npcList)
      npc.owner = this.gameMap
  }

  private syncOtherMove() {
    const msg = Protocol.createOtherMoveMessage()

    this.socket.send(msg)
  }

  private sendHeartbeat() {
    this.doHeartbeat()
  }

  private doHeartbeat() {
    if (!(Date.now() < this.nextHeartBeat)) {
      this.lastHeartBeat = Date.now()
      const msg = Protocol.createSystemHeartMsg(this.gameMap.mapId)
      this.socket.send(msg)
      this.nextHeartBeat = Date.now() + GameService.HEART_BEAT_TIME
    }
  }

  private onClose() {
    this.endGameTime = Date.now()
    clearInterval(this.heartBeatTimer)
    clearInterval(this.syncOtherMoveTimer)

    $Log(`${this.player.playerName} 游戏时间 ${pretty(this.endGameTime - this.startGameTime)}`)

    window.$message.error('与游戏服务器断开连接, 请检查网络然后重新登录', { duration: 10e3, closable: true })

    this.endGameTime = 0
    this.startGameTime = 0
  }
}
