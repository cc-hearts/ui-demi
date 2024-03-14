# TablePro

`TablePro` 组件是对 ant-design-vue 的 `Table` 的二次封装的组件，内置 `selection` 以及 拖拽排序

:::demo

```vue
<template>
  <TablePro :columns="columns" :data-source="dataSource" :loadData="loadData">
  </TablePro>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'age',
    dataIndex: 'age',
    align: 'center',
  },
  {
    title: 'address',
    dataIndex: 'address',
    align: 'center',
  },
]

const dataSource = ref([])

let i = 0
const loadData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  dataSource.value = []
  for (let j = i + 20; i < j; i++) {
    dataSource.value.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    })
  }
}
</script>
```

:::

## Props

| 属性         | 类型                                                  | 描述               |
| ------------ | ----------------------------------------------------- | ------------------ |
| columns      | [Columns](https://antdv.com/components/table/#column) | 表格的列配置       |
| bordered     | boolean                                               | 是否显示边框       |
| total        | number                                                | 数据总数           |
| dataSource   | Array\<any\>                                          | 表格的数据源       |
| loadData     | (params: {current: number, pageSize: number}) => void | 加载数据的函数     |
| rowSelection | [RowSelection](#rowselection) \| null                 | 行选择配置         |
| rowKey       | string                                                | 行的唯一标识的键名 |
| pagination   | [Pagination](#pagination)                             | 分页配置           |

### RowSelection

```ts
interface RowSelection<T, K> {
  selectedRowKeys: K[]
  selectedRows: T[]
  onChange: (selectedRowKeys: K[], selectedRows: T[]) => void
}
```

### Pagination

```ts
interface Pagination {
  showSizeChanger: boolean
  showQuickJumper: boolean
  showTotal: (total: number) => string
  onChange: (page: number, pageSize: number) => void
  onShowSizeChange: (current: number, size: number) => void
}
```
