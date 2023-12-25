import { withInstall } from '@packages/vue-utils'
import Description from './description.vue'
import { VERSION } from './helper'

withInstall(Description, VERSION)

export { Description }
