import { withInstall } from '@packages/vue-utils'
import DynamicTable from './dynamic-table.vue'
import { VERSION } from './helper'

withInstall(DynamicTable, VERSION)

export { DynamicTable }
