import { rm } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import type { CompileOptions } from './helper'
import { pipe } from '@cc-heart/utils'
import { glob } from 'glob'
import generatorConfig from './vite-config.js'
import { build } from 'vite'

const workspaceRootPath = resolve(process.cwd(), '../../')

;(() => {
  'use strict'

  const compileOptions: CompileOptions[] = [
    {
      entryDir: 'packages/ant-design-vue/src/components',
      outputRootDir: 'es/ant-design-vue',
      modules: 'es',
    },
  ]

  compileOptions.map((options) => {
    return pipe(
      () => formatCompileOptions(options),
      removeOutputDir,
      readCompileEntryFilePathList,
      compileFileByFilePath
    )()
  })
})()

function formatCompileOptions({
  entryDir,
  outputRootDir,
  modules,
}: CompileOptions): CompileOptions {
  return {
    entryDir: resolve(workspaceRootPath, entryDir),
    outputRootDir: resolve(workspaceRootPath, outputRootDir),
    modules,
  }
}
function removeOutputDir(options: CompileOptions) {
  rm(options.outputRootDir, {
    recursive: true,
    force: true,
  })
  return options
}

async function readCompileEntryFilePathList(options: CompileOptions) {
  const entryDir = options.entryDir
  const fileList = await glob(`${entryDir}/**/*`, { withFileTypes: true })

  if (Array.isArray(fileList)) {
    return [
      fileList
        .filter((file) => file.isFile())
        .map((file) => file.fullpathPosix()),
      options,
    ]
  }

  return [[], options]
}

async function compileFileByFilePath([fileList, options]: [
  string[],
  CompileOptions
]) {
  fileList.map(async (file) => {
    const fileRelativePath = relative(options.entryDir, file)
    const outputDir = resolve(options.outputRootDir, fileRelativePath)
    const viteConfig = generatorConfig(file, outputDir, options.modules)
    await build(viteConfig)
  })
}
