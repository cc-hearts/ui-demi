import FormSchema from './form-schema.vue'
import { withInstall } from '@packages/vue-utils'
import { VERSION } from './helper.js'

withInstall(FormSchema, VERSION)

export { FormSchema }
export * from './utils/define-form-schema-props'
