import type { UploadFiles } from 'element-plus'
import { PropType } from 'vue'

export const VERSION = '0.0.1'

export const _props = {
  text: {
    type: String,
    default: '上传',
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 1,
  },
  onSuccess: {
    type: Function,
    required: true,
    default: () => ({}),
  },
  uploadHeaders: {
    type: Object,
    default: () => ({}),
  },
  extraData: {
    type: Function,
    default: () => ({}),
  },
  fileList: {
    type: Array as PropType<Array<UploadFiles>>,
  },
}
