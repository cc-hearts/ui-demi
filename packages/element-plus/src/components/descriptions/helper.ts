export interface DescriptionItem {
  label: string
  field: string
  value: any
  span?: number
  slot?: { name: string }
  labelSlot?: { name: string }
}

export interface Props {
  /**
   * @description: Number of columns displayed in a row
   * @default 3
   */
  span: number

  /**
   * @description An array of `DescriptionItem` objects defining the columns.
   * @default []
   */
  columns: Array<DescriptionItem>
  /**
   * @description Indicates whether to show a border.
   * @default true
   */
  border: boolean

  /**
   * @description The default value to use if none is provided.
   * @default '-'
   */
  defaultValue: string
}
