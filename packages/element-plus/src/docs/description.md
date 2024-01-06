# Descriptions

以列表形式展示字段

对 `element-plus` 的 `Descriptions` 组件进一步的封装，减少 `el-descriptions-item` 等重复模版代码。

## 基本使用

:::demo

```vue
<template>
  <descriptions :description-items="descriptionItems" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTag } from 'element-plus'

const descriptionItems = ref([
  { label: 'Username', field: 'username', value: 'kooriookami' },
  { label: 'Telephone', field: 'telephone', value: '18100000000' },
  { label: 'Place', field: 'place', value: 'Suzhou' },
])
</script>
```

:::

## Description Slot

对于复杂的渲染，可以指定 `slot / labelSlot` 以动态插槽的方式实现自定义渲染。

:::demo

```vue
<template>
  <descriptions :description-items="descriptionItems">
    <template #remarkLabel="{ data }">
      <el-tag type="danger">{{ data.label }}</el-tag>
    </template>
    <template #remark="{ data }">
      <el-tag type="primary">{{ data.value }}</el-tag>
    </template>
  </descriptions>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTag } from 'element-plus'

const descriptionItems = ref([
  { label: 'Username', field: 'username', value: 'kooriookami' },
  { label: 'Telephone', field: 'telephone', value: '18100000000' },
  { label: 'Place', field: 'place', value: 'Suzhou' },
  {
    label: 'Remarks',
    field: 'remarks',
    value: 'remark',
    slot: { name: 'remark' },
    labelSlot: { name: 'remarkLabel' },
  },
])
</script>
```

:::
