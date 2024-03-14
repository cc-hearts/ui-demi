import { Command } from 'commander'
import { findUpPkg } from '@cc-heart/utils-service'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const program = new Command()

export async function initHelp() {
  const rootPkgPath = await findUpPkg(
    resolve(fileURLToPath(import.meta.url), '../../../')
  )
  if (!rootPkgPath) {
    throw new Error('not find package.json: ' + rootPkgPath)
  }
  try {
    let pkg = await readFile(rootPkgPath, 'utf-8')
    pkg = JSON.parse(pkg)

    program
      .name('ui-demi')
      // @ts-ignore
      .version(pkg.version)
      .usage('[options]')
      .option('--dry-run', 'dry run')

    program.parse()
  } catch (e) {}
}

export const getArgvOptions = () => program.opts()
