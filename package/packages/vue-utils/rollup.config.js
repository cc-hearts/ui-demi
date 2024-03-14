import typescript from 'rollup-plugin-typescript2'
import tsConfig from './tsconfig.json' assert { type: 'json' }

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
      preserveModules: true,
      dir: 'dist/esm',
      format: 'esm',
    },
  ],
  plugins: [typescript(tsConfig)],
}
