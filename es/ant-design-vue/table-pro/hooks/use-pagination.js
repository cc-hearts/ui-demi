import { reactive } from 'vue'
function usePagination(options = {}) {
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条`,
    onChange: (page, pageSize) => {
      pagination.current = page
      pagination.pageSize = pageSize
      if (options.loadData) {
        options.loadData({
          pageNum: page,
          pageSize,
        })
      }
    },
    ...options,
  })
  return pagination
}
export { usePagination }
