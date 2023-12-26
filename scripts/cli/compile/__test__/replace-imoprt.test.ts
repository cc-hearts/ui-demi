import { describe, expect, it } from 'vitest'
import { replaceImport } from '../replace-import'

describe('replace-import', () => {
  it('should replace import', () => {
    const code = `
      import CollapseCard from './collapse-card.vue'
      import { withInstall } from '@packages/vue-utils'
      import { VERSION } from './helper.js'

      withInstall(CollapseCard, VERSION)

      export { CollapseCard }

    `
    const result = replaceImport(code)
    expect(result).toMatchSnapshot()
  })
})
