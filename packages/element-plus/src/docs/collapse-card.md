# CollapseCard

可折叠的卡片容器

## 基本使用

:::demo

```vue
<template>
  <collapse-card title="title" v-model:visible="visible">
    content
  </collapse-card>
</template>
<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::
