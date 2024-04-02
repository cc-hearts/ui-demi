import TablePro from './table-pro.vue'
import { withInstall } from '@packages/vue-utils'
import { VERSION } from './helper.js'

withInstall(TablePro, VERSION)

export { TablePro }

export * from './utils/define-table-pro-props'
