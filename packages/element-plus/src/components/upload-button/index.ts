import UploadButton from './upload-button.vue'
import { withInstall } from '@packages/vue-utils'
import { VERSION } from './helper'

withInstall(UploadButton, VERSION)

export { UploadButton }
