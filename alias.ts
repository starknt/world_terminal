import path from 'node:path'
import type { AliasOptions } from 'vite'

const rootPath = path.join(process.cwd())

const r = (...paths: string[]) => path.join(rootPath, ...paths)

export const alias: AliasOptions = {
  'libs': r('src', './libs'),
  '~': r('src'),
}
