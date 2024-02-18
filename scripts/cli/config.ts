import { readdir } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const excludeDirs = ['_utils', 'vue-utils']

export async function getTemplateDirs() {
  // if scripts, ../../../../packages
  const dirs = await readdir(
    resolve(fileURLToPath(import.meta.url), '../../../../packages')
  )
  return dirs
    .filter((dir) => !excludeDirs.includes(dir))
    .map((packageName) => `packages/${packageName}`)
}
