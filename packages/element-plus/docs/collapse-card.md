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

## API

### Props

| 参数    | 描述                  | 类型    | 默认值 |
| ------- | --------------------- | ------- | ------ |
| title   | 标题                  | string  | ''     |
| visible | 是否折叠 CollapseCard | boolean | false  |

### Css Var

| css 变量                    | 描述 | 默认值                       |
| --------------------------- | ---- | ---------------------------- |
| --collapse-card-bg-color    | -    | var(--el-bg-color-overlay)   |
| --collapse-card-border      | -    | var(--el-border-color-light) |
| --collapse-arrow-icon-color | -    | var(--el-primary-color)      |
| --collapse-card-padding     | -    | 12px                         |
