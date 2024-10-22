import { type UnwrapRef, type Ref } from 'vue'

export interface Column {
  /**
   * 列的标签名称，用于表头显示。
   */
  label: string

  /**
   * 列的数据属性名称，用于从数据对象中提取值。
   */
  prop: string

  /**
   * 列的宽度，可以是字符串或数字类型, 宽度值可以设置为固定值或百分比。
   *
   * @optional
   */
  width?: string | number

  /**
   * 列的对齐方式，可以为 'left'、'center' 或 'right'。
   * @optional
   * @default 'left'
   */
  align?: string

  /**
   * 列的最小宽度，可以是字符串或数字类型。
   * @optional
   */
  minWidth?: string | number

  /**
   * 列是否固定在表格的左侧或右侧，或者不固定。
   * 可以是布尔值（true 表示固定在左侧）或 'left'、'right'。
   * @optional
   */
  fixed?: boolean | 'left' | 'right'

  /**
   * 用于定义自定义单元格内容的插槽信息。
   * @optional
   */
  slot?: {
    /**
     * 插槽的名称。
     */
    name: string
  }

  /**
   * 用于定义自定义表头标签的插槽信息。
   * @optional
   */
  labelSlot?: {
    /**
     * 插槽的名称。
     */
    name: string
  }

  /**
   * ElTableColumn 覆盖属性
   */
  extraAttributes?: Record<string, unknown>

  [key: PropertyKey]: unknown
}

export interface RowSelectionOptions<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>
> {
  /**
   * 行选择的类型，可选值为 'radio' 或 'checkbox'。
   *
   * @type {'radio' | 'checkbox'}
   * @default 'radio'
   */
  type?: 'radio' | 'checkbox'

  /**
   * 用于标识行的唯一键，支持字符串或函数形式。
   *
   * @type {string | (() => string)}
   * @default 'id'
   */
  rowKey?: Props['rowKey']

  /**
   * 引用表格实例的 `Ref` 对象，用于操作表格的选择。
   *
   * @type {Ref<U | undefined>}
   */
  tableRef?: Ref<U | undefined>

  /**
   * 数据源的 `Ref` 对象，用于管理和跟踪表格的数据源。
   *
   * @type {Ref<Array<T | undefined>>}
   */
  dataSource?: Ref<Array<T | undefined>>

  /**
   * 是否在数据源变化时刷新选中的行。
   *
   * @type {boolean}
   * @default false
   */
  watchDataSourceChangeRefreshSelection?: boolean
}

export interface Props {
  /**
   * Whether the component show Action panel
   * 组件是否显示操作面板
   * @default false
   */
  isActionPanel?: boolean

  /**
   * show animation while loading data
   * 加载数据时显示loading动画
   * @default false
   */
  isLoading?: boolean

  /**
   * Whether selection mode is enabled.
   * 是否启用选择模式。
   * @default false
   */
  isSelection?: boolean

  /**
   * Data source for the component.
   * 组件的数据源。
   * @default []
   */
  dataSource?: Array<Record<PropertyKey, unknown>>

  /**
   * Columns configuration for the table.
   * 表格的列配置。
   * @default []
   */
  columns?: Column[]

  /**
   * Whether to use the default action slot.
   * 是否使用默认的操作插槽。
   * @default false
   */
  isUseActionSlot?: boolean

  /**
   * Label for the default action column.
   * 默认操作列的标签。
   * @default 'action'
   */
  defaultActionColumnLabel?: string

  /**
   * Properties for the action slot.
   * 操作插槽的属性。
   * @default {}
   */
  actionSlotProps?: Record<string, unknown>

  /**
   * Type of selection (radio or checkbox).
   * 选择类型（单选或多选）。
   * @default 'checkbox'
   */
  selectType?: 'radio' | 'checkbox'

  /**
   * Key used for identifying rows. This can be a string or a function that returns a string.
   * 用于标识行的键。可以是一个字符串或返回字符串的函数。
   * @default 'id'
   */
  rowKey?: string | (() => string)

  /**
   * 表格获取 dataSource 数据的请求方式
   * @default: () => [{},0]
   */
  request: (params: {
    pageNo: number
    pageSize: number
  }) => Promise<[Props['dataSource'], number]>

  /**
   *
   */
  tableHeaderSubTitle?: string
  /**
   * Pagination组件覆盖属性
   * @default {}
   */
  extraPaginationProps?: Record<string, unknown>

  /**
   * Table组件覆盖属性
   * @default {}
   */
  extraTableProps?: Record<string, unknown>
}

export type RemoveUndefined<T> = T extends T
  ? T extends undefined
    ? never
    : T
  : never

export type SelectNodes<
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>,
  U extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = RemoveUndefined<UnwrapRef<RowSelectionOptions<T, U>['dataSource']>>
