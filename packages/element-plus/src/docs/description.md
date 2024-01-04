# Descriptions

以列表形式展示字段

对 `element-plus` 的 `Descriptions` 组件进一步的封装，减少 `el-descriptions-item` 等重复模版代码。

## 基本使用

:::demo

```vue
<template>
  <Descriptions :column="column">
    <template #remark="{ data }">
      <el-tag type="primary">{{ data.value }}</el-tag>
    </template>
  </Descriptions>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElTag } from 'element-plus'

const column = ref([
  { label: 'Username', field: 'username', value: 'kooriookami' },
  { label: 'Telephone', field: 'telephone', value: '18100000000' },
  { label: 'Place', field: 'place', value: 'Suzhou' },
  {
    label: 'Remarks',
    field: 'remarks',
    value: 'remark',
    slot: { name: 'remark' },
  },
])
</script>
```

:::
