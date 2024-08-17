import { hasOwn } from '@cc-heart/utils'
import { ref, toRaw } from 'vue'

interface UseModifyOptions {
  initData?: boolean
  rowKey?: string
}

export function useModify(
  originDataFn: () => Record<string, any>,
  options?: UseModifyOptions
) {
  const deleteIds = ref<(string | number)[]>([])
  const dataSource = ref<any[]>([])

  const internalInitFlag =
    options?.initData === undefined ? true : options.initData
  if (internalInitFlag) {
    dataSource.value = [originDataFn()]
  }

  const setDataSource = (data: any[]) => {
    dataSource.value = data
  }
  const handleAddDataSource = () => {
    dataSource.value.push(originDataFn())
  }

  const handleRemoveDataSource = (row: any) => {
    const rowKey = options?.rowKey || 'id'
    const index = dataSource.value.findIndex(
      (item) => toRaw(item) === toRaw(row)
    )
    const [deleteTarget] = dataSource.value.splice(index, 1)
    if (hasOwn(deleteTarget, rowKey)) {
      deleteIds.value.push(deleteTarget[rowKey])
    }
  }

  const clear = () => {
    deleteIds.value = []
    dataSource.value = internalInitFlag ? [originDataFn()] : []
  }

  const formatDataSourceAndIds = () => {
    return [
      ...dataSource.value,
      ...deleteIds.value.map((id) => {
        return {
          id,
          deleted: true,
        }
      }),
    ]
  }

  return {
    deleteIds,
    dataSource,
    setDataSource,
    handleAddDataSource,
    handleRemoveDataSource,
    formatDataSourceAndIds,
    clear,
  }
}
