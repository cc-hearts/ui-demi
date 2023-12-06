import { existsSync, mkdirSync, createWriteStream, createReadStream } from 'fs'
import { stat, readdir } from 'fs/promises'
import inquirer from 'inquirer'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'

const templateDir = ['packages/element-plus']

function genSelectTemplatePrompt(choices) {
  return {
    type: 'list',
    message: 'select a components template',
    name: 'selectTemplate',
    choices,
  }
}
function genComponentPrompt(choices) {
  return {
    type: 'list',
    message: 'select components',
    name: 'selectComponents',
    choices,
  }
}

/**
 * Checks if the given path is a directory.
 *
 * @param {string} path - The path to check.
 * @return {Promise<boolean>} A promise that resolves to true if the path is a directory, false otherwise.
 */
async function isDirectory(path) {
  const file = await stat(path)
  return file.isDirectory()
}

/**
 * Step up to find the most recent file
 *
 * @param path
 * @returns
 */
async function findUpFile(path, fileName) {
  if (fileName === void 0) {
    throw new Error('fileName is required')
  }
  let curPath
  if (await isDirectory(path)) {
    curPath = resolve(path, 'package.json')
  } else {
    curPath = resolve(path, '../package.json')
  }
  if (existsSync(curPath)) {
    return curPath
  }
  if (path === '/') return null
  return findUpFile(resolve(path, '..'), fileName)
}

function readTemplateDirConfig(rootPath) {
  return templateDir.map((target) => {
    return {
      value: resolve(rootPath, target),
      name: target.split('/').pop() || '',
    }
  })
}
async function readTemplateComponents(
  templateDir,
  componentNameList = ['src/components']
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
async function getComponentFilePaths(
  componentDir,
  relativePath = process.cwd()
) {
  try {
    const dirs = await readdir(componentDir, { withFileTypes: true })
    return dirs
      .filter((dir) => dir.isFile())
      .map((dir) => {
        const dirname = componentDir.split('/').pop() || ''
        return {
          path: resolve(componentDir, dir.name),
          relativePath: join(relativePath, dirname),
          dirname: dir.name,
        }
      })
  } catch (e) {
    return []
  }
}
function writeComponentFile(componentPath, relativePath, dirname) {
  mkdirSync(relativePath, { recursive: true })
  const writeFilePath = resolve(relativePath, dirname)
  const writeStream = createWriteStream(writeFilePath)
  writeStream.on('finish', () => {
    console.log(`write file: ${writeFilePath}`)
  })
  createReadStream(componentPath).pipe(writeStream)
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
    componentPaths.forEach((config) => {
      writeComponentFile(config.path, config.relativePath, config.dirname)
    })
  } catch (error) {}
}
prompt()
