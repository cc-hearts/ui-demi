import { findUpFile } from '@cc-heart/utils-service'
import { Dirent, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { pipe } from '@cc-heart/utils'
import { readdir } from 'fs/promises'
import inquirer from 'inquirer'
import { join, resolve, sep } from 'path'
import { fileURLToPath } from 'url'
import { replaceImport } from './compile/replace-import.js'
import { templateDir } from './config.js'
import { genComponentPrompt, genSelectTemplatePrompt } from './prompt.js'
import { initHelp, getArgvOptions } from './commander.js'

function readTemplateDirConfig(rootPath: string) {
  return templateDir.map((target) => {
    return {
      value: resolve(rootPath, target),
      name: target.split('/').pop() || '',
    }
  })
}

async function readTemplateComponents(
  templateDir: string,
  componentNameList: string[] = ['src/components']
) {
  const componentList = await Promise.all(
    componentNameList.map(async (componentName) => {
      const componentPath = resolve(templateDir, componentName)
      try {
        const dirs = await readdir(componentPath, { withFileTypes: true })
        return dirs
          .filter((dir) => dir.isDirectory())
          .map((dir) => ({
            value: resolve(componentPath, dir.name),
            name: dir.name,
          }))
      } catch (error) {
        console.log(error)
        return []
      }
    })
  )

  return componentList.reduce((acc, cur) => {
    return [...acc, ...cur]
  }, [])
}

interface ComponentFilePath {
  path: string
  relativePath: string
  dirname: string
}
async function recursiveComponentFilePaths(
  dirs: Dirent[],
  componentDir: string,
  relativePath: string
): Promise<Array<ComponentFilePath>> {
  let ret: Array<ComponentFilePath> = []
  const task = dirs.map(async (dir) => {
    if (dir.isFile()) {
      const dirname = componentDir.split('/').pop() || ''
      ret.push({
        path: resolve(componentDir, dir.name),
        relativePath: join(relativePath, dirname),
        dirname: dir.name,
      })
    } else {
      const dirs = await readdir(resolve(dir.path, dir.name), {
        withFileTypes: true,
      })
      const dirname = componentDir.split('/').pop() || ''
      const fileList = await recursiveComponentFilePaths(
        dirs,
        resolve(dir.path, dir.name),
        resolve(relativePath, dirname)
      )
      ret = [...ret, ...fileList]
    }
  })

  await Promise.all(task)
  return ret
}

async function getComponentFilePaths(
  componentDir: string,
  relativePath = process.cwd()
) {
  try {
    const dirs = await readdir(componentDir, { withFileTypes: true })
    return await recursiveComponentFilePaths(dirs, componentDir, relativePath)
  } catch (e) {
    return []
  }
}

function writeComponentFile(
  componentPath: string,
  relativePath: string,
  dirname: string
) {
  // dry run output to console
  const { dryRun } = getArgvOptions() || {}
  if (dryRun) {
    console.log(`dry run write file: ${relativePath}`)
    return
  }
  mkdirSync(relativePath, { recursive: true })
  const writeFilePath = resolve(relativePath, dirname)
  let files = readFileSync(componentPath, 'utf-8')

  if (!/\.vue$/.test(componentPath)) {
    files = replaceImport(files)
  }

  writeFileSync(writeFilePath, files, 'utf-8')
  console.log(`write file: ${writeFilePath}`)
}

async function prompt() {
  const rootPkgPath =
    (await findUpFile(
      resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..'),
      'package.json'
    )) || ''

  if (!rootPkgPath) {
    console.error('not found package.json')
    return
  }

  const rootPath = resolve(rootPkgPath, '..')
  const templateDirConfig = readTemplateDirConfig(rootPath)
  const templatePrompt = genSelectTemplatePrompt(templateDirConfig)
  try {
    const { selectTemplate } = await inquirer.prompt([templatePrompt])
    const componentConfig = await readTemplateComponents(selectTemplate)

    const componentPrompt = genComponentPrompt(componentConfig)
    const { selectComponents } = await inquirer.prompt([componentPrompt])

    const componentPaths = await getComponentFilePaths(selectComponents)
    const hasNoInstallDeps = await tryRunPresetScript(selectComponents)
    if (hasNoInstallDeps) {
      return
    }
    componentPaths.forEach((config) => {
      writeComponentFile(config.path, config.relativePath, config.dirname)
    })
  } catch (error) {
    console.error(error)
  }
}

pipe(initHelp, prompt)()

async function tryRunPresetScript(componentModulePath: string) {
  try {
    const componentName = componentModulePath.split(sep).pop()
    if (!componentName) {
      return
    }
    const presetScriptPath = componentModulePath
      .split(sep)
      .slice(0, -2)
      .concat(['pre-scripts', `${componentName}.js`])
      .join(sep)
    if (existsSync(presetScriptPath)) {
      const modules = await import(presetScriptPath)
      return (await modules?.default?.()) || false
    }
  } catch (error) {
    console.log(error)
  }
}
