import { withInstall } from '@packages/vue-utils'
import Descriptions from './descriptions.vue'
import { VERSION } from './helper'

withInstall(Descriptions, VERSION)

export { Descriptions }
