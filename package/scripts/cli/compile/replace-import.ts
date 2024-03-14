import { parse } from '@babel/parser'
import generate from '@babel/generator'
import traverse, { type TraverseOptions } from '@babel/traverse'

export function compileCode(
  originCode: string,
  traverseOptions: TraverseOptions = {}
) {
  const ast = parse(originCode, {
    sourceType: 'module',
    plugins: ['typescript'],
  })

  traverse(ast, {
    ...traverseOptions,
  })

  const { code } = generate(ast)
  return code
}

export function replaceImport(code: string) {
  return compileCode(code, {
    ImportDeclaration(paths) {
      if (paths.node.source.value === '@packages/vue-utils') {
        paths.node.source.value = '@cc-heart/ui-demi/vue-utils'
      }
    },
  })
}
