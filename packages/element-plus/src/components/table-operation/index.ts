import { withInstall } from '@packages/vue-utils'
import TableOperation from './table-operation.vue'
import { VERSION } from './helper'

withInstall(TableOperation, VERSION)

export { TableOperation }
