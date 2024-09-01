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

export interface RowSelectionOptions<T extends Record<PropertyKey, unknown>> {
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
   * @type {Ref<T>}
   */
  tableRef?: Ref<T>

  /**
   * 数据源的 `Ref` 对象，用于管理和跟踪表格的数据源。
   *
   * @type {Ref<Array<T>>}
   */
  dataSource?: Ref<Array<T>>

  /**
   * 是否在数据源变化时刷新选中的行。
   *
   * @type {boolean}
   * @default false
   */
  watchDataSourceChangeRefreshSelection?: boolean
}

export interface Props<T = any> {
  /**
   * Whether the component is in modify mode.
   * 组件是否处于修改模式。
   * @default false
   */
  isModify?: boolean

  /**
   * show animation while loading data
   * 加载数据时显示动画
   * @default false
   */
  loading?: boolean

  /**
   * Whether selection mode is enabled.
   * 是否启用选择模式。
   * @default false
   */
  isSelection?: boolean

  /**
   * Function to get data. This function should return an object.
   * 获取数据的函数。该函数应返回一个对象。
   * @default () => ({})
   */
  getData?: () => Record<PropertyKey, unknown>

  /**
   * Whether to invoke `getData` function when the component is mounted.
   * 组件挂载时是否调用 `getData` 函数。
   * @default true
   */
  isFetchDataOnMounted?: boolean

  /**
   * Data source for the component.
   * 组件的数据源。
   * @default []
   */
  dataSource?: Array<Record<PropertyKey, unknown>>

  /**
   * Original data for modifying table data.
   * This can be an object or a function that returns an object.
   * 用于修改表格数据的原始数据。可以是一个对象或返回对象的函数。
   * @default () => ({})
   */
  originData?: Record<PropertyKey, any> | (() => Record<PropertyKey, any>)

  /**
   * Columns configuration for the table.
   * 表格的列配置。
   * @default []
   */
  columns?: Column[]

  /**
   * Function that handles row deletion. Returns a boolean value that determines whether the built-in deletion logic is executed.
   * 处理行删除的函数。返回 布尔值 决定是否执行内置的删除逻辑。
   * @default () => true
   */
  onWillRemoveRow?: (
    dataSource: Array<Record<PropertyKey, unknown>>,
    row: Record<PropertyKey, unknown>
  ) => boolean

  /**
   * Whether to use the default action slot.
   * 是否使用默认的操作插槽。
   * @default false
   */
  useDefaultActionSlot?: boolean

  /**
   * Label for the default action column.
   * 默认操作列的标签。
   * @default 'action'
   */
  defaultActionColumnLabel?: string

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
   * Properties for the action slot.
   * 操作插槽的属性。
   * @default {}
   */
  actionSlotProps?: Record<string, unknown>

  /**
   * ElTable组件覆盖属性
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
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = RemoveUndefined<UnwrapRef<RowSelectionOptions<T>['dataSource']>>
