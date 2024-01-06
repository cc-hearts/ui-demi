# ModifiableTable

可进行编辑的表格

## 基本使用

:::demo

```vue
<script lang="ts" setup>
const columns = [
  { label: 'name', prop: 'name' },
  { label: 'address', prop: 'address' },
]

const nameOptions = ['Ami', 'John', 'Tom', 'Jessy']
let count = 1
const getOriginData = () => ({
  name: nameOptions[Math.floor(Math.random() * nameOptions.length)],
  address: `No. ${count++}, Grove St, Los Angeles`,
})
</script>

<template>
  <modifiable-table
    :columns="columns"
    :origin-data="getOriginData"
    use-default-action-slot
  />
</template>
```

:::
