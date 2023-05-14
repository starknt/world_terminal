import './bigint'

interface BigInt {
  get value(): number

  new(v: number): this

  one: BigInt

  xor(v: number | BigInt): this
  and(v: number | BigInt): this
  add(v: number | BigInt): this
  multiply(v: BigInt): this
  shiftRight(v: number): this
  shiftLeft(v: number): this
  subtract(v: number): this
  [Symbol.toStringTag]: string
}

export declare const bigInt: BigInt
