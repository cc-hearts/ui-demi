import { withInstall } from '@packages/vue-utils'
import ModifiableTable from './modifiable-table.vue'
import { VERSION } from './helper'

withInstall(ModifiableTable, VERSION)

export { ModifiableTable }
