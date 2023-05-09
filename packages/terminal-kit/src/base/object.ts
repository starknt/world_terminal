export function clone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null)
    return obj

  if ('clone' in obj)
    return (typeof obj.clone === 'function' ? obj.clone() : structuredClone(obj)) as T
  return structuredClone(obj)
}
