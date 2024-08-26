import { rm } from 'fs/promises'
import { isAbsolute, resolve } from 'path'
import { glob } from 'glob'
import { defineConfig, mergeConfig, build } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { join, relative } from 'node:path'

async function removeCompileBundle(compileOption) {
  const compilePath = isAbsolute(compileOption.outputDir)
    ? compileOption.outputDir
    : resolve(process.cwd(), compileOption.outputDir)
  await rm(resolve(compilePath), { recursive: true, force: true })
  return compileOption
}
async function readFilePath(reg, options = {}) {
  const files = await glob(reg, { withFileTypes: true, ...options })
  return files.map((file) => file.fullpathPosix())
}
async function readVueFilePath(entryDirPath) {
  return readFilePath(`${entryDirPath}/**/*.vue`)
}
async function readScssFilePath(entryDirPath) {
  return readFilePath(`${entryDirPath}/**/*.scss`)
}
async function readTsFilePath(entryDirPath) {
  return readFilePath(`${entryDirPath}/**/*.ts`, {
    ignore: ['**/index.ts'],
  })
}
async function readIndexFilePath(entryDirPath) {
  return readFilePath(`${entryDirPath}/**/index.ts`)
}

const _toString = Object.prototype.toString
/**
 * Checks if the given value is a function.
 *
 * @param {unknown} val - The value to be checked.
 * @return {boolean} Returns true if the value is a function, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFn(val) {
  return typeof val === 'function'
}
/**
 * Checks if the given value is null.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns true if the value is null, false otherwise.
 */
function isNull(val) {
  return val === null
}
/**
 * Checks if a value is a Promise.
 *
 * @param {unknown} val - The value to check.
 * @return {boolean} Returns `true` if the value is a Promise, else `false`.
 */
function isPromise(val) {
  return (
    typeof val === 'object' &&
    !isNull(val) &&
    (_toString.call(val) === '[object Promise]' ||
      isFn(Reflect.get(val, 'then')))
  )
}

const definePrams = (params, index) => {
  if (index === 0 && Array.isArray(params)) {
    return params
  }
  return [params]
}
/**
 * Takes a series of functions and returns a new function that runs these functions in sequence.
 * If a function returns a Promise, the next function is called with the resolved value.
 *
 * @param {...Array<Fn>} fns - The functions to pipe.
 * @returns {function} A new function that takes any number of arguments and pipes them through `fns`.
 */
function pipe(...fns) {
  return (...args) => {
    if (fns.length === 0) return args[0]
    return fns.reduce((arg, fn, index) => {
      if (isPromise(arg)) {
        return arg.then((res) => {
          return fn(...definePrams(res, index))
        })
      }
      return fn(...definePrams(arg, index))
    }, args)
  }
}

function replaceAliasPath() {
  return {
    name: 'vite:replace-alias-path',
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((key) => {
        if (bundle[key].code) {
          bundle[key].code = bundle[key].code
            .replace(/\.vue/g, '.js')
            .replace(/\.scss/g, '.css')
        }
      })
    },
  }
}

const getExtendsViteConfig = (options) => {
  return options || {}
}
const compileVueConfig = ({
  outDir,
  fileName,
  entry,
  compileModules,
  options,
}) => {
  const _extends = getExtendsViteConfig(options)
  return defineConfig(
    mergeConfig(
      {
        build: {
          emptyOutDir: false,
          minify: false,
          outDir,
          cssCodeSplit: true,
          rollupOptions: {
            external(id) {
              if (id.includes('.vue') && id.includes(entry)) return false
              return id !== entry
            },
          },
          lib: {
            entry,
            fileName,
            formats: [compileModules],
          },
        },
        plugins: [vuePlugin(), replaceAliasPath()],
      },
      _extends
    )
  )
}
function compileBaseConfig({
  outDir,
  fileName,
  entry,
  compileModules,
  options,
}) {
  const _extends = getExtendsViteConfig(options)
  return defineConfig(
    mergeConfig(
      {
        build: {
          emptyOutDir: false,
          minify: false,
          outDir,
          cssCodeSplit: true,
          rollupOptions: {
            external(id) {
              return id !== entry
            },
          },
          lib: {
            entry,
            fileName,
            formats: [compileModules],
          },
        },
      },
      _extends
    )
  )
}
function compileIndexConfig({
  outDir,
  fileName,
  entry,
  compileModules,
  options,
}) {
  const _extends = getExtendsViteConfig(options)
  return defineConfig(
    mergeConfig(
      {
        build: {
          emptyOutDir: false,
          minify: false,
          outDir,
          cssCodeSplit: true,
          rollupOptions: {
            external(id) {
              return id !== entry
            },
          },
          lib: {
            entry,
            fileName,
            formats: [compileModules],
          },
        },
        plugins: [replaceAliasPath()],
      },
      _extends
    )
  )
}

const getFilename = (filePath) => {
  const filename = filePath.split('/').pop()
  if (!filename) {
    throw new Error('filename is not found')
  }
  return removeFileSuffix(filename)
}
function removeFileSuffix(fileName) {
  return fileName.replace(/\.[^/.]+$/, '')
}
function getOutDirPath(entryDirPath, filePath, outputDirPath) {
  return join(outputDirPath, relative(entryDirPath, filePath), '..')
}

async function compileLib(config) {
  const { compileOption } = config
  // remove last compile bundle
  await removeCompileBundle(compileOption)
  function compileFileList(fileList, viteCompileConfig, _options = {}) {
    const { extendedViteConfig } = _options
    let viteCompileConfigOptions
    if (isFn(extendedViteConfig)) {
      viteCompileConfigOptions = extendedViteConfig()
    } else {
      viteCompileConfigOptions = extendedViteConfig || {}
    }
    fileList.forEach((filePath) => {
      const fileName = getFilename(filePath)
      const outDir = getOutDirPath(
        compileOption.entryDir,
        filePath,
        compileOption.outputDir
      )
      build(
        viteCompileConfig({
          outDir,
          fileName,
          entry: filePath,
          compileModules: compileOption.modules,
          options: viteCompileConfigOptions,
        })
      )
    })
  }
  const { entryDir } = compileOption
  pipe(readVueFilePath, (fileList) =>
    compileFileList(fileList, compileVueConfig, {
      extendedViteConfig: compileOption.extendedViteConfig,
    })
  )(entryDir)
  ;[readScssFilePath, readTsFilePath].forEach((fn) => {
    pipe(fn, (fileList) =>
      compileFileList(fileList, compileBaseConfig, {
        extendedViteConfig: compileOption.extendedViteConfig,
      })
    )(entryDir)
  })
  pipe(readIndexFilePath, (fileList) =>
    compileFileList(fileList, compileIndexConfig, {
      extendedViteConfig: compileOption.extendedViteConfig,
    })
  )(entryDir)
}

export { compileLib }

const workspaceRootPath = resolve(process.cwd(), '../../')

function formatCompileOptions({ entryDir, outputDir, modules, ...rest }) {
  return {
    entryDir: resolve(workspaceRootPath, entryDir),
    outputDir: resolve(workspaceRootPath, outputDir),
    modules,
    ...rest,
  }
}

;[
  {
    entryDir: 'packages/ant-design-vue/src/components',
    outputDir: 'es/ant-design-vue',
    modules: 'es',
  },
  {
    entryDir: 'packages/element-plus/components',
    outputDir: 'es/element-plus',
    modules: 'es',
    extendedViteConfig: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData:
              "@use '@packages/helpers/assets/scss/lib.scss' as *;\n",
          },
        },
      },
    },
  },
  {
    entryDir: 'packages/vue-kit/src/components',
    outputDir: 'es/vue-kit',
    modules: 'es',
  },
].forEach((config) => {
  compileLib({ compileOption: formatCompileOptions(config) })
})
