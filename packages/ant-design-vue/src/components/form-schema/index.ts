import FormSchema from './form-schema.vue'
import { withInstall } from '@packages/vue-utils'
import { VERSION } from './helper.js'

withInstall(FormSchema, VERSION)

export { FormSchema }

export * from './helper'
export * from './utils/define-form-schema-props'
export * from './utils/create-set-fields-factory'
