import { computed, shallowReactive } from 'vue'
import { RowSelection, useRowSelectionParams } from './helper'

export function useRowSelection(options: useRowSelectionParams = {}) {
  const rowSelection = shallowReactive(<RowSelection<unknown, unknown>>{
    selectedRowKeys: [],
    selectedRows: [],
    onChange: (
      selectedRowKeys: Array<unknown>,
      selectedRows: Array<unknown>
    ) => {
      if (options.onChange) {
        options.onChange(selectedRowKeys, selectedRows)
      } else {
        rowSelection.selectedRowKeys = selectedRowKeys
        rowSelection.selectedRows = selectedRows
      }
    },
  })

  const getSelectedLength = computed(() => rowSelection.selectedRowKeys.length)

  const resetSelection = () => {
    rowSelection.onChange([], [])
  }
  return { rowSelection, getSelectedLength, resetSelection }
}
