import { BBigInt as BigInt } from '@terminal/core'

const RANDOM_SEED_MASTER = new BigInt(25214903917)
const ADDEND = 11
const RANDOM_SEED_MASK = BigInt.one.shiftLeft(48).subtract(1)

function unsignedInt2int(t: number) {
  const e = 4294967295 & t
  return e > 2147483647 ? -((4294967295 ^ e) + 1) : e
}

export class Random {
  seed: typeof BigInt

  constructor(e: number) {
    this.seed = new BigInt(e).xor(RANDOM_SEED_MASTER).and(RANDOM_SEED_MASK)
  }

  next(e: number) {
    this.seed = this.seed
      .multiply(RANDOM_SEED_MASTER)
      .add(ADDEND)
      .add(RANDOM_SEED_MASK)
    const n = this.seed.shiftRight(48 - e).value
    const i = unsignedInt2int(n)
    return i
  }

  nextInt() {
    return this.next(32)
  }
}
