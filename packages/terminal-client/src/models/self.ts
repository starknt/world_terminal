import type { Pet, Player } from '@terminal/models/parser'

export class Self {
  player!: Player
  pet!: Pet

  from(player: Player, pet: Pet) {
    const self = new Self()
    self.player = player
    self.pet = pet
    return self
  }
}
