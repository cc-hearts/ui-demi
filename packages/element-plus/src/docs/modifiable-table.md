# ModifiableTable

可进行编辑的表格

## 基本使用

:::demo

```vue
<script lang="ts" setup>
const columns = [
  { label: 'name', prop: 'name', slot: { name: 'name' } },
  { label: 'address', prop: 'address' },
]

const nameOptions = ['Ami', 'John', 'Tom', 'Jessy']
let count = 1,
  id = 1
const getOriginData = () => ({
  id: id++,
  name: nameOptions[Math.floor(Math.random() * nameOptions.length)],
  address: `No. ${count++}, Grove St, Los Angeles`,
})
</script>

<template>
  <modifiable-table
    :columns="columns"
    :origin-data="getOriginData"
    use-default-action-slot
  >
    <template #name="scope">
      <el-input v-model="scope.row.name" />
    </template>
  </modifiable-table>
</template>
```

:::

## API

### Props

| 参数                     | 描述                                     | 类型               | 默认值   |
| ------------------------ | ---------------------------------------- | ------------------ | -------- |
| originData               | 源数据，用于新增操作，支持对象和函数方式 | Object \| Function | {}       |
| columns                  | 列的描述配置                             | Array\<Column\>    | []       |
| onWillRemoveRow          | 将要移除行所触发的函数                   | Function           | true     |
| useDefaultActionSlot     | 是否使用内置的 `action` 插槽             | Boolean            | false    |
| defaultActionColumnLabel | 内置 `action` 插槽的 label               | String             | 'action' |

### Css Var

| css 变量                   | 描述 | 默认值 |
| -------------------------- | ---- | ------ |
| --modifiable-table-padding | -    | 12px 0 |
