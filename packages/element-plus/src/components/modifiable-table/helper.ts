import { PropType } from 'vue'

export const VERSION = '0.0.1'

export interface Column {
  label: string
  prop: string
  width?: string
  align?: string
  slot?: { name: string }
  labelSlot?: { name: string }
}

export const _props = {
  originData: {
    type: [Object, Function],
    default: () => ({}),
  },
  columns: {
    type: Array as PropType<Array<Column>>,
    default: () => [],
  },
  onWillRemoveRow: {
    type: Function,
    default: () => true,
  },
  useDefaultActionSlot: {
    type: Boolean,
    default: false,
  },
  defaultActionColumnLabel: {
    type: String,
    default: '操作',
  },
}
