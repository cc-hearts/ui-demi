import type { ElTable } from 'element-plus'
import { Props } from '@packages/helpers/table-pro/index.ts'
import { Ref, ref } from 'vue'

export interface TableProProps extends Props<typeof ElTable> {}
export type {
  RowSelectionOptions,
  SelectNodes,
} from '@packages/helpers/table-pro/index.ts'

export interface ExtendsElTableExpose {
  toggleRowSelection: (row: any, selected?: boolean) => void
  clearSelection: () => void
  [key: PropertyKey]: any
}
