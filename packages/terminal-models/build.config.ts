import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/parser',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
