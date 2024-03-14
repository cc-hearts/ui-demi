import { findFilePath } from '@cc-heart/utils-service'
import { readFile } from 'fs/promises'

async function getPkg() {
  const path = await findFilePath(process.cwd(), 'package.json')
  if (path) {
    return readFile(path, 'utf-8')
  }
  return null
}

export async function checkNoInstallDeps(depNames: string[]) {
  try {
    const packages = await getPkg()
    if (typeof packages === 'string') {
      const pkg = JSON.parse(packages)
      const devDependencies = pkg.devDependencies || {}
      const dependencies = pkg.dependencies || {}
      const pkgDepNames = Object.keys({ ...devDependencies, ...dependencies })
      return depNames.filter((name) => !pkgDepNames.includes(name))
    }
  } catch (e) {}
  return []
}
