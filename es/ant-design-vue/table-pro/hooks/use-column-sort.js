import { ref, computed } from 'vue'
function useColumnSort(props = { rowKey: 'key', columns: ref([]) }) {
  const sortedColumns = ref([])
  const columnsField = ref([])
  const rowKey = computed(() => {
    if (typeof props.rowKey === 'function') {
      return props.rowKey()
    }
    return props.rowKey
  })
  const onUpdateSortedColumns = (columns) => {
    sortedColumns.value = columns
  }
  const onUpdateColumnsField = (newColumnsField) => {
    columnsField.value = newColumnsField
  }
  const onReset = () => {
    columnsField.value = props.columns.value.map((item) =>
      Reflect.get(item, rowKey.value)
    )
    sortedColumns.value = [...props.columns.value]
  }
  const getSortedColumns = computed(() => {
    return sortedColumns.value.filter((item) =>
      columnsField.value.includes(Reflect.get(item, rowKey.value))
    )
  })
  return {
    sortedColumnsProps: {
      sortedColumns,
      columnsField,
      rowKey,
      onUpdateSortedColumns,
      onUpdateColumnsField,
      onReset,
    },
    getSortedColumns,
  }
}
export { useColumnSort }
