import commonjs from '@rollup/plugin-commonjs'
import rollupJson from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { resolve as _resolve } from 'path'

const resolve = (...args) => _resolve(process.cwd(), ...args)

export default function () {
  return {
    input: resolve('index.ts'),
    output: {
      dir: 'bin',
      filename: 'app.js',
    },
    plugins: [
      typescript(),
      commonjs(),
      rollupJson(),
      nodeResolve({ symlinks: false }),
    ],
    external: ['inquirer', 'commander'],
  }
}
