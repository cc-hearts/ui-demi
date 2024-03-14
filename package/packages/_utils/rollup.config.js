import typescript from 'rollup-plugin-typescript2'
import tsConfig from './tsconfig.json' assert { type: 'json' }
import nodeResolve from '@rollup/plugin-node-resolve'

export default {
  input: './index.ts',
  output: [
    {
      preserveModules: true,
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    {
      dir: 'dist/esm',
      filename: 'index.mjs',
      format: 'esm',
    },
  ],
  plugins: [typescript(tsConfig), nodeResolve()],
}
