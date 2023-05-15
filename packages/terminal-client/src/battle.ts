import { EventEmitter } from '@terminal/core'
import { Battle } from '@terminal/models'

function getPositionSide(pos: number) {
  return pos < Battle.LEFT_MAX_POS ? Battle.LEFT_SIDE : Battle.RIGHT_SIDE
}

function isLeftSide(pos: number) {
  return getPositionSide(pos) === Battle.LEFT_SIDE
}

export class BattlePlayer {

}

interface BattleStageEvent {
  onBattleFinished: boolean
  onBattleStarted: boolean
  onBattleRound: boolean
  onBattleCompleted: boolean
}

export abstract class BattleStage extends EventEmitter<BattleStageEvent> {
  private _round = 0
  private rowLeft = 5
  private rowRight = 5
  private playerList = new Array<BattlePlayer | undefined>(Battle.MAX_POS).fill(undefined)

  constructor() {
    super()
  }

  get round() { return this._round }

  abstract runRound(): Promise<void> | void
}

export class LocalBattleStage extends BattleStage {
  runRound(): void {

  }
}

export class RemoteBattleStage extends BattleStage {
  runRound(): void {

  }
}
