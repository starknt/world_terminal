import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    './src/index',
    './src/parser',
  ],
  rollup: {
    emitCJS: true,
  },
})
