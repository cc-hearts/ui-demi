export interface DescriptionItem {
  /**
   * @description 显示的标签名称。
   * @type {string}
   */
  label: string

  /**
   * @description 对应数据的字段名称。
   * @type {string}
   */
  field: string

  /**
   * @description 显示的值。
   * @type {any}
   */
  value?: any

  /**
   * @description 占用的列数。
   * @type {number}
   * @default '-''
   */
  span?: number

  /**
   * @description 自定义插槽的名称。
   * @type {{ name: string }}
   */
  slot?: { name: string }

  /**
   * @description 自定义标签插槽的名称。
   * @type {{ name: string }}
   */
  labelSlot?: { name: string }
}

export interface Props {
  /**
   * @description: Number of columns displayed in a row
   * @description-zh-CN: 每行显示的列数。
   * @default 3
   */
  span: number

  /**
   * @description An array of `DescriptionItem` objects defining the columns.
   * @description-zh-CN: 定义列的 `DescriptionItem` 对象数组。
   * @default []
   */
  columns: Array<DescriptionItem>
  /**
   * @description Indicates whether to show a border.
   * @description-zh-CN: 是否显示边框。
   * @default true
   */
  border: boolean

  /**
   * @description The default value to use if none is provided.
   * @description-zh-CN: 默认显示值
   * @default '-'
   */
  defaultValue?: string
}
