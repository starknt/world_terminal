import './bigint'

interface BigInt {
  new(v: number): this

  one: BigInt

  xor(v: number | BigInt): this
  and(v: number | BigInt): this
  add(v: number | BigInt): this
  multiply(v: number | BigInt): this
  shiftRight(v: number): this
  shiftLeft(v: number): this
  subtract(v: number): this
}

export declare const bigInt: BigInt
