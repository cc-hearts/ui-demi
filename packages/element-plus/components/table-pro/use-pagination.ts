import { reactive } from 'vue'

export function usePagination() {
  return reactive({
    pageSize: 10,
    pageNo: 1,
    total: 0,
    pageSizes: [5, 7, 10, 20, 50, 100],
  })
}
