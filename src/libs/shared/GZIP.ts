export class GZIP {
  gzipBit = 0
  gzipByte = 0
  gzipIndex = 0

  constructor(readonly e: number[]) { }

  readBits(n: number) {
    let i = this.gzipBit === 0
      ? (this.gzipByte = 255 & this.e[this.gzipIndex++])
      : this.gzipByte >> this.gzipBit
    for (let o = 8 - this.gzipBit; n > o; o += 8) {
      this.gzipByte = 255 & this.e[this.gzipIndex++]
      i |= this.gzipByte << o
    }
    this.gzipBit = (this.gzipBit + n) & 7
    return i & ((1 << n) - 1)
  }

  readCode(n: number[]) {
    let i = n[0]
    for (; i >= 0;) {
      if (this.gzipBit === 0)
        this.gzipByte = 255 & this.e[this.gzipIndex++]
      i = (this.gzipByte & (1 << this.gzipBit)) === 0 ? n[i >> 16] : n[65535 & i]
      this.gzipBit = (this.gzipBit + 1) & 7
    }
    return 65535 & i
  }

  decodeCodeLengths(n: number[], i: number) {
    const o = new Array(i)
    let a = 0
    let r = 0
    let s = 0
    for (; i > a;) {
      r = this.readCode(n)
      if (r >= 16) {
        let l = 0
        for (
          r === 16
            ? ((l = 3 + this.readBits(2)), (r = s))
            : ((l = r === 17 ? 3 + this.readBits(3) : 11 + this.readBits(7)),
              (r = 0));
          l-- > 0;

        )
          o[a++] = GZIP.toByte(r)
      }
      else { o[a++] = GZIP.toByte(r) }
      s = r
    }

    return o
  }
}

export namespace GZIP {
  export function inflate(e: number[]) {
    const gzip = new GZIP(e)

    if (gzip.readBits(16) !== 35615 || gzip.readBits(8) !== 8)
      throw new Error('invalid gzip header')

    const n = gzip.readBits(8)
    gzip.gzipIndex += 6

    if ((n & GZIP.FEXTRA_MASK) !== 0)
      gzip.gzipIndex += gzip.readBits(16)

    if ((n & GZIP.FNAME_MASK) !== 0)
      for (; gzip.e[gzip.gzipIndex++] !== 0;);

    if ((n & GZIP.FCOMMENT_MASK) !== 0)
      for (; gzip.e[gzip.gzipIndex++] !== 0;);

    if ((n & GZIP.FHCRC_MASK) !== 0)
      gzip.gzipIndex += 2

    const i = gzip.gzipIndex
    gzip.gzipIndex = gzip.e.length - 4
    const o = gzip.readBits(16)
    const a = gzip.readBits(16)
    const r = o | (a << 16)
    const s: number[] = new Array(r)
    for (let l = 0; r > l; l++)
      s[l] = 0

    let _ = 0
    gzip.gzipIndex = i
    let h = 0
    let u = 0
    do {
      h = gzip.readBits(1)
      u = gzip.readBits(2)
      if (u === GZIP.BTYPE_NONE) {
        gzip.gzipBit = 0
        const c = gzip.readBits(16)
        gzip.readBits(16)
        for (let a = 0; c > a; a++)
          s[i + a] = gzip.e[gzip.gzipIndex + a]
        gzip.gzipIndex += c
        _ += c
      }
      else {
        let T, p
        if (u === GZIP.BTYPE_DYNAMIC) {
          const d = gzip.readBits(5) + 257
          const E = gzip.readBits(5) + 1
          const g = gzip.readBits(4) + 4
          const S = new Array(GZIP.MAX_CODE_LENGTHS + 1)
          const c = S.length

          for (let l = 0; l < c; l++)
            S[l] = 0

          for (let l = 0; g > l; l++) {
            const m = gzip.readBits(3)
            const f = GZIP.toByte(m)
            const I = GZIP.DYNAMIC_LENGTH_ORDER[l]
            S[I] = f
          }

          const A = createHuffmanTree(S, GZIP.MAX_CODE_LENGTHS)
          T = createHuffmanTree(gzip.decodeCodeLengths(A, d), d - 1)
          p = createHuffmanTree(gzip.decodeCodeLengths(A, E), E - 1)
        }
        else {
          const y = new Array(GZIP.MAX_CODE_LITERALS + 1)
          for (let l = 0; l < y.length; l++)
            y[l] = 0
          for (let l = 0; l < 144; l++)
            y[l] = 8
          for (let l = 144; l < 256; l++)
            y[l] = 9
          for (let l = 256; l < 280; l++)
            y[l] = 7
          for (let l = 280; l < 288; l++)
            y[l] = 8
          T = createHuffmanTree(y, GZIP.MAX_CODE_LITERALS)

          const R = new Array(GZIP.MAX_CODE_DISTANCES + 1)

          for (let l = 0; l < R.length; l++)
            R[l] = 5
          p = createHuffmanTree(R, GZIP.MAX_CODE_DISTANCES)
        }

        let P = 0
        let C = 0
        let v = 0
        // eslint-disable-next-line no-cond-assign
        for (;(P = gzip.readCode(T)) !== GZIP.EOB_CODE;) {
          if (P > GZIP.EOB_CODE) {
            P -= 257
            let M = GZIP.LENGTH_VALUES[P]
            C = GZIP.LENGTH_EXTRA_BITS[P]
            if (C > 0)
              M += gzip.readBits(C)

            P = gzip.readCode(p)
            let L = GZIP.DISTANCE_VALUES[P]
            v = GZIP.DISTANCE_EXTRA_BITS[P]
            if (v > 0)
              L += gzip.readBits(v)

            const O = _ - L
            for (; M > L;) {
              arraycopy(s, O, s, _, L)
              _ += L
              M -= L
              L <<= 1
            }
            arraycopy(s, O, s, _, M)
            _ += M
          }
          else {
            s[_++] = GZIP.toByte(P)
          }
        }
      }
    } while (h === 0)

    const N = new egret.ByteArray()
    for (let l = 0; l < s.length; l++)
      N.writeByte(s[l])

    N.position = 0
    return N
  }

  function createHuffmanTree(e: number[], n: number) {
    const i = new Array(GZIP.MAX_BITS + 1)
    let r = 0

    for (let o = 0, a = i.length; a > o; o++)
      i[o] = 0
    for (let o = 0; o < e.length; o++)
      i[e[o]]++

    i[0] = 0
    const s = new Array(GZIP.MAX_BITS + 1)
    s[0] = 0

    for (let o = 1; o <= GZIP.MAX_BITS; o++)
      s[o] = r = (r + i[o - 1]) << 1

    const l = (n << 1) + GZIP.MAX_BITS
    const _ = new Array(l)

    for (let o = 0; l > o; o++)
      _[o] = 0
    for (let h = 1, o = 0; n >= o; o++) {
      const a = e[o]
      if (a !== 0) {
        r = s[a]++
        let u = 0
        for (let c = a - 1; c >= 0; c--) {
          const T = r & (1 << c)
          if (T === 0) {
            const p = _[u] >> 16
            if (p === 0) {
              _[u] |= h << 16
              u = h++
            }
            else {
              u = p
            }
          }
          else {
            const d = 65535 & _[u]
            if (d === 0) {
              _[u] |= h
              u = h++
            }
            else {
              u = d
            }
          }
        }
        _[u] = 2147483648 | o
      }
    }
    return _
  }

  function arraycopy<T>(t: T[], e: number, n: T[], i: number, o: number) {
    for (let a = 0; o > a; a++)
      n[i + a] = t[e + a]
  }

  export function toByte(v: number) {
    return (255 & v) > 127 ? -((255 ^ v) + 1) : (255 & v)
  }

  export function toShort(v: number) {
    return (65535 & v) > 32767 ? -((65535 ^ v) + 1) : (65535 & v)
  }

  export function toInteger(v: number) {
    return (4294967295 & v) > 2147483647 ? -((4294967295 ^ v) + 1) : (2147483647 & v)
  }

  export const FTEXT_MASK = 1
  export const FHCRC_MASK = 2
  export const FEXTRA_MASK = 4
  export const FNAME_MASK = 8
  export const FCOMMENT_MASK = 16
  export const BTYPE_NONE = 0
  export const BTYPE_FIXED = 1
  export const BTYPE_DYNAMIC = 2
  export const BTYPE_RESERVED = 3
  export const MAX_BITS = 16
  export const MAX_CODE_LITERALS = 287
  export const MAX_CODE_DISTANCES = 31
  export const MAX_CODE_LENGTHS = 18
  export const EOB_CODE = 256
  export const LENGTH_EXTRA_BITS = [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 99, 99,
  ]
  export const LENGTH_VALUES = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
    67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
  ]
  export const DISTANCE_EXTRA_BITS = [
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13,
  ]
  export const DISTANCE_VALUES = [
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513,
    769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
  ]
  export const DYNAMIC_LENGTH_ORDER = [
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
  ]
}
