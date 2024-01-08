import type { SelectNodes, RowSelectionOptions } from './helper'
import { watch, shallowReactive } from 'vue'

export function useTableSelection<T extends Record<PropertyKey, unknown>>(
  options: RowSelectionOptions<T> = {}
) {
  const getOptionWithDefaultValue = () => {
    const {
      type = 'radio',
      rowKey = 'id',
      tableRef,
      watchDataSourceChangeRefreshSelection = false,
    } = options
    return {
      type,
      rowKey,
      tableRef,
      watchDataSourceChangeRefreshSelection,
    }
  }

  const rowSelection = shallowReactive({
    selectNodes: [] as SelectNodes<T>,
  })

  const onRowSelectionChange = (rows: SelectNodes<T>) => {
    const { type, tableRef, rowKey } = getOptionWithDefaultValue()
    if (rows.length === 0) {
      clearSelection()
      return
    }
    let nodes: SelectNodes<T>

    if (type === 'radio') {
      rowSelection.selectNodes = nodes = rows.slice(-1)
    } else {
      rowSelection.selectNodes = nodes = [...rows]
    }

    if (tableRef) {
      rows.forEach((row) => {
        const index = nodes.findIndex((node) => node[rowKey] === row[rowKey])
        tableRef.value?.toggleRowSelection(row, index > -1)
      })
    }
  }

  const refreshSelection = async (dataSource: SelectNodes<T> = []) => {
    const { rowKey } = getOptionWithDefaultValue()
    const ids = rowSelection.selectNodes.map((node) => node[rowKey!])
    const dataList = dataSource.filter((data) => ids.includes(data[rowKey!]))
    if (dataList.length === 0) return
    await nextTick()
    onRowSelectionChange(dataList)
  }

  const clearSelection = () => {
    const { tableRef } = options
    rowSelection.selectNodes = []
    tableRef?.value?.clearSelection()
  }

  const exposeRowSelectionFactory = () => {
    return { getRowSelection: () => rowSelection }
  }

  const toggleAllSelection = () => {
    const { type } = getOptionWithDefaultValue()
    if (type === 'radio') {
      clearSelection()
      return
    }
  }

  if (options.watchDataSourceChangeRefreshSelection) {
    watch(
      () => options.dataSource?.value,
      (val) => {
        refreshSelection(val)
      }
    )
  }

  return {
    rowSelection,
    onRowSelectionChange,
    clearSelection,
    toggleAllSelection,
    refreshSelection,
    exposeRowSelectionFactory,
  }
}
