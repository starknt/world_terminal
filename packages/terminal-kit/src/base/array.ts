export function skip<T>(arr: Array<T>, skip: number): Array<T> {
  for (let i = 0; i < skip; i++)
    arr.shift()
  return arr
}
