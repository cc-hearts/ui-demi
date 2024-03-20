# Modal

模态对话框

对 `Modal` 以及 `Drawer` 进行封装，通过 `type` 切换对话框。

## 基本使用

:::demo

```vue
<template>
  <RadioGroup v-model:value="type" :options="plainOptions" />
  <Button @click="handleOpen">open</Button>
  <Modal v-model="visible" :type="type" title="modal" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Button, RadioGroup } from 'ant-design-vue'

const type = ref('modal')
const plainOptions = [
  { label: 'Modal', value: 'modal' },
  { label: 'Drawer', value: 'drawer' },
]
const visible = ref(false)
const handleOpen = () => {
  visible.value = true
}
</script>
```

:::
