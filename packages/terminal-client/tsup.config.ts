import { defineConfig } from 'tsup'

export default defineConfig(options => ({
  dts: true,
  entry: [
    './src/index.ts',
  ],
  splitting: true,
  minify: !options.watch,
  sourcemap: !!options.watch,
  clean: true,
  format: ['cjs', 'esm'],
}))
