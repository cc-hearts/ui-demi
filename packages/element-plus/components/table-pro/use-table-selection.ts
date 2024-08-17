import { isFn } from '@cc-heart/utils'
import { nextTick, shallowReactive, toRaw, watch } from 'vue'
import type { RowSelectionOptions, SelectNodes } from './helper'

const parseRowKey = (rowKey: string | (() => string)): string => {
  if (isFn(rowKey)) return rowKey()
  return rowKey
}
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

  const clearSelection = () => {
    const { tableRef } = options
    rowSelection.selectNodes = []
    tableRef?.value?.clearSelection()
  }

  const onRowSelectionChange = (rows: SelectNodes<T>) => {
    const { type, tableRef, rowKey: _rowKey } = getOptionWithDefaultValue()
    const rowKey = parseRowKey(_rowKey)
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
    const { rowKey: _rowKey } = getOptionWithDefaultValue()
    const rowKey = parseRowKey(_rowKey)
    const ids = rowSelection.selectNodes.map((node) => node[rowKey!])
    const dataList = dataSource.filter((data) => ids.includes(data[rowKey!]))
    if (dataList.length === 0) return
    await nextTick()
    onRowSelectionChange(dataList)
  }

  const removeRowSelection = (row: unknown) => {
    const index = rowSelection.selectNodes.findIndex((target) => {
      return toRaw(row) === toRaw(target)
    })

    if (index > -1) {
      rowSelection.selectNodes.splice(index, 1)
    }
  }

  const exposeRowSelectionFactory = () => {
    return {
      getRowSelection: () => rowSelection,
      clearSelection,
      removeRowSelection,
      removeRowSelectionByRowKey,
    }
  }
  const toggleAllSelection = (rows: SelectNodes<T>) => {
    const { type } = getOptionWithDefaultValue()
    if (type === 'radio') {
      clearSelection()
    } else {
      rowSelection.selectNodes = [...rows]
    }
  }
  const removeRowSelectionByRowKey = (rowKey: unknown) => {
    const { rowKey: key } = getOptionWithDefaultValue()
    const curKey = parseRowKey(key)

    const index = rowSelection.selectNodes.findIndex(
      (node) => node[curKey] === rowKey
    )
    if (index > -1) {
      rowSelection.selectNodes.splice(index, 1)
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
    clearSelection,
    refreshSelection,
    toggleAllSelection,
    onRowSelectionChange,
    removeRowSelection,
    removeRowSelectionByRowKey,
    exposeRowSelectionFactory,
  }
}
