export class Random {
  seed: any

  constructor(e: number) {
    this.seed = new bigInt(e).xor(Random.RANDOM_SEED_MASTER).and(Random.RANDOM_SEED_MASK)
  }

  next(e: number) {
    this.seed = this.seed
      .multiply(Random.RANDOM_SEED_MASTER)
      .add(Random.ADDEND)
      .add(Random.RANDOM_SEED_MASK)
    const n = this.seed.shiftRight(48 - e).value
    const i = Random.unsignedInt2int(n)
    return i
  }

  nextInt() {
    return this.next(32)
  }
}

export namespace Random {
  export function unsignedInt2int(t: number) {
    const e = 4294967295 & t
    return e > 2147483647 ? -((4294967295 ^ e) + 1) : e
  }

  export const RANDOM_SEED_MASTER = new bigInt(25214903917)
  export const ADDEND = 11
  export const RANDOM_SEED_MASK = bigInt.one.shiftLeft(48).subtract(1)
}
