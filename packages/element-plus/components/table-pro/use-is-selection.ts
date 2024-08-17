import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'

export const useIsSelection = (tableRef: Ref<any>) => {
  const isSelection = ref(false)

  watchEffect(() => {
    const rowSelection = tableRef.value?.getRowSelection()
    if (
      rowSelection &&
      rowSelection.selectNodes &&
      rowSelection.selectNodes.length > 0
    ) {
      isSelection.value = true
    } else {
      isSelection.value = false
    }
  })

  return isSelection
}
