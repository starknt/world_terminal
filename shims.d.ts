import type { MessageProviderInst } from 'naive-ui';

interface bigInt {
    new(v: number): this

    one: bigInt

    xor(v: number | bigInt): this
    and(v: number | bigInt): this
    add(v: number | bigInt): this
    multiply(v: number | bigInt): this
    shiftRight(v: number): this
    shiftLeft(v: number): this
    subtract(v: number): this
}

interface IImageResource {
    file: string
    x: number
    y: number
    w: number
    h: number
    offX: number
    offY: number
    sourceW: number
    sourceH: number
}

interface IXui {
    frames: Record<string, IImageResource>
}

declare global {
    // active tab world
    var world: any

    var xuis: IXui


    var $message: MessageProviderInst
    var bigInt: bigInt
}

export { };

