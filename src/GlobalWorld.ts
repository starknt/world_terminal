import type { GameService } from 'libs/service/GameService'

export class GlobalWorld {
  private world: GameService[] = []

  setGameWorld(i: number, game: GameService) {
    this.world[i] = game
  }

  deleteGameWorld(i: number) {
    // @ts-expect-error
    this.world[i] = undefined
  }

  hasGameWorld(i: number) {
    return !!this.world[i]
  }
}

export const globalWorld = new GlobalWorld()
