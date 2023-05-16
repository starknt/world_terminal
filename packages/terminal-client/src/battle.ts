import { EventEmitter } from '@terminal/core'
import { Battle } from '@terminal/models'
import type { Player } from '@terminal/models/parser'
import type { Nullable } from './types'

function getPositionSide(pos: number) {
  return pos < Battle.LEFT_MAX_POS ? Battle.LEFT_SIDE : Battle.RIGHT_SIDE
}

function isLeftSide(pos: number) {
  return getPositionSide(pos) === Battle.LEFT_SIDE
}

export class BattlePlayer {
  static from(p: Player) {

  }
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
  protected readonly layout: Array<Nullable<BattlePlayer>>
  /**
   * @param layout {Array<Nullable<BattlePlayer>>}
   * **m: Monster e: Pet p: Player m: Mercenary**
   * ```
   *        1  2        21  22
   *         m  m        e  p
   *        3  4        23  24
   *         m  m        e  p
   *        5  6        25  26
   *         m  m        e  p
   *        7  8        27  28
   *         m  m        e  p
   *         9 10       29 30
   *         m  m        e  p
   *        11 12             <-- extern: include mission, employment ->
   *         m  m       e m
   *        13 14
   *         m  m       e m
   *        15 16
   *         m  m       e m
   *        17 18
   *         m  m       e m
   *        19 20
   *         m  m       e m
   *```
   * **In the Local Battle Stage**
   * ```
   *        1  2       20 21
   *         m  m       e  m  third
   *        3  4        22 23
   *         m  m       e  m  one
   *        5  6        24 25
   *         m  m       e  p  self
   *        7  8        26 27
   *         m  m       e  m  two
   *         9 10       28 29
   *         m  m       e  m  four
   *        11 12
   *         m  m
   *        13 14
   *         m  m
   *        15 16
   *         m  m
   *        17 18
   *         m  m
   *        19 20
   *         m  m
   * ```
   */
  constructor() {
    super()

    this.layout = this.createLayout()
  }

  get round() { return this._round }

  protected abstract runRound(round: number): Promise<void> | void
  protected abstract createLayout(): Array<Nullable<BattlePlayer>>
  protected abstract createBattle(): Promise<void> | void
}

export class LocalBattleStage extends BattleStage {
  constructor(readonly) {
    super()
  }

  protected runRound(round: number): void {

  }

  protected createLayout(): Nullable<BattlePlayer>[] {

  }

  protected createBattle(): void {

  }
}

export class RemoteBattleStage extends BattleStage {
  constructor() {
    super()
  }

  protected runRound(round: number): void {

  }

  protected createLayout(): Nullable<BattlePlayer>[] {

  }

  protected createBattle(): void {
    // create remote battle
    // 1. request enter remote battle protocol
    // 2. parse enter battle protcol, create remote battle data
    // 3. run round logic
  }
}
