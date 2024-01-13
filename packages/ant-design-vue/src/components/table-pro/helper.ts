import { type TableColumnType } from 'ant-design-vue'
export { noop } from '@cc-heart/utils'

export interface IPagination {
  pageNum: number
  pageSize: number
}

export interface RowSelection<T, K> {
  type?: 'checkbox' | 'radio'
  selectedRowKeys: K[]
  selectedRows: T[]
  onChange: (selectedRowKeys: K[], selectedRows: T[]) => void
}

export interface TableProps {
  columns: TableColumnType[]
  bordered: boolean
  total: number
  dataSource: Array<unknown>
  loadData: <T extends IPagination>(args: T) => any
  rowSelection: RowSelection<any, any> | null
  rowKey: string
}

export const VERSION = '0.0.1'
