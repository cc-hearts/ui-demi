import { shallowReactive, computed } from 'vue'
function useRowSelection(options = {}) {
  const rowSelection = shallowReactive({
    selectedRowKeys: [],
    selectedRows: [],
    onChange: (selectedRowKeys, selectedRows) => {
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
export { useRowSelection }
