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
const loadData = () => {
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
