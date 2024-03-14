import CollapseCard from './collapse-card.vue'
import { withInstall } from '@packages/vue-utils'
import { VERSION } from './helper.js'

withInstall(CollapseCard, VERSION)

export { CollapseCard }
