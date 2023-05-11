export function calcExpireTime(ot: number): number {
  return new Date().getTime() + 1 * ot * (60 * 1000)
}
