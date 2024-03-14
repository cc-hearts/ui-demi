import { PropType, type UnwrapRef, type Ref } from 'vue'
import { ElTable } from 'element-plus'

export const VERSION = '0.0.1'

export interface Column {
  label: string
  prop: string
  width?: string
  align?: string
  slot?: { name: string }
  labelSlot?: { name: string }
}

export interface RowSelectionOptions<T extends Record<PropertyKey, unknown>> {
  type?: 'radio' | 'checkbox'
  rowKey?: PropertyKey
  tableRef?: Ref<typeof ElTable>
  dataSource?: Ref<Array<T>>
  watchDataSourceChangeRefreshSelection?: boolean
}

export const _props = {
  originData: {
    type: [Object, Function] as PropType<
      Record<PropertyKey, unknown> | (() => Record<PropertyKey, unknown>)
    >,
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
    default: 'action',
  },
  selectType: {
    type: String as PropType<'radio' | 'checkbox'>,
    default: 'checkbox',
  },
  rowKey: {
    type: [String, Number] as PropType<PropertyKey>,
    default: 'id',
  },
}

export type RemoveUndefined<T> = T extends T
  ? T extends undefined
    ? never
    : T
  : never

export type SelectNodes<
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = RemoveUndefined<UnwrapRef<RowSelectionOptions<T>['dataSource']>>
