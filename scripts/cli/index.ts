import { createReadStream, createWriteStream } from 'fs'
import { readdir } from 'fs/promises'
import inquirer from 'inquirer'
import { join, resolve } from 'path'
import { templateDir } from './config.js'
import { genComponentPrompt, genSelectTemplatePrompt } from './prompt.js'

function readTemplateDirConfig() {
  return templateDir.map((target) => {
    return {
      value: resolve(process.cwd(), target),
      name: target.split('/').pop() || '',
    }
  })
}

async function readTemplateComponents(
  templateDir: string,
  componentNameList: string[] = ['components']
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
        return []
      }
    })
  )

  return componentList.reduce((acc, cur) => {
    return [...acc, ...cur]
  }, [])
}

async function getComponentFilePaths(
  componentDir: string,
  relativePath = './'
) {
  try {
    const dirs = await readdir(componentDir, { withFileTypes: true })
    return dirs
      .filter((dir) => dir.isFile())
      .map((dir) => ({
        path: resolve(componentDir, dir.name),
        relativePath: join(relativePath, dir.name),
      }))
  } catch (e) {
    return []
  }
}

function writeComponentFile(componentPath: string, relativePath: string) {
  //
  const dryRun = true
  // dry run output to console
  if (dryRun) {
    console.log(`write file: ${relativePath}`)
    return
  }
  const writeStream = createWriteStream(relativePath)
  writeStream.on('finish', () => {
    console.log(`write file: ${relativePath}`)
  })
  createReadStream(componentPath).pipe(writeStream)
}

async function prompt() {
  const templateDirConfig = readTemplateDirConfig()

  const templatePrompt = genSelectTemplatePrompt(templateDirConfig)
  try {
    const { selectTemplate } = await inquirer.prompt([templatePrompt])

    const componentConfig = await readTemplateComponents(selectTemplate)
    const componentPrompt = genComponentPrompt(componentConfig)
    const { selectComponents } = await inquirer.prompt([componentPrompt])
    const componentPaths = await getComponentFilePaths(selectComponents)
    componentPaths.forEach((config) => {
      writeComponentFile(config.path, config.relativePath, '')
    })
  } catch (error) {}
}

prompt()
