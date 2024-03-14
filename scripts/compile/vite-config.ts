import { CompileOptions } from 'helper'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isScssFile = (name: string) => {
  return /\.scss$/.test(name)
}

export default function generatorConfig(
  entry: string,
  outFile: string,
  modules: CompileOptions['modules']
) {
  const [name] = entry.split('/').slice(-1)
  const outDir = outFile.split('/').slice(0, -1).join('/')
  return defineConfig({
    plugins: [vue()],
    build: {
      emptyOutDir: false,
      outDir,
      minify: false,
      rollupOptions: {
        // @ts-ignore
        external: (id: string, parentId: string) => {
          if (parentId) {
            const [fileName] = parentId.split('/').slice(-1)
            if (
              fileName &&
              ['index.ts', 'index.js'].some(
                (filterFileName) => fileName === filterFileName
              )
            ) {
              return true
            }
          }
          if (id.includes('.vue')) return false
          return id !== entry
        },
        output: {
          assetFileNames: (assetInfo: any) => {
            if (assetInfo.name === 'style.css') {
              return name.replace(/\..*/, '') + '.css'
            }
            return assetInfo.name
          },
        },
      },
      lib: {
        entry,
        fileName: isScssFile(name) ? name : name.replace(/\..*/, ''),
        formats: [modules],
      },
    },
  })
}
