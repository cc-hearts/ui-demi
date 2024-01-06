import { PropType } from 'vue'

export const VERSION = '0.0.1'

export interface DescriptionItem {
  label: string
  field: string
  value: any
  span?: number
  slot?: { name: string }
  labelSlot?: { name: string }
}

export const _props = {
  count: {
    type: Number,
    default: 3,
  },
  descriptionItems: {
    type: Array as PropType<Array<DescriptionItem>>,
    default: () => [],
  },
  border: {
    type: Boolean,
    default: true,
  },
}
