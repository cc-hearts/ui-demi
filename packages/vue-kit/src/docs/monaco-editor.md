# monaco-editor

对 [monaco-editor](https://microsoft.github.io/monaco-editor/) 进行了二次封装，提供更加简洁的 API 操作。

:::demo

```vue
<template>
  <MonacoEditor class="min-300px" />
</template>
<script lang="ts" setup></script>
<style lang="scss">
.min-300px {
  height: 300px;
}
</style>
```

:::

## props

| 属性名              | 类型    | 默认值       | 描述                                             |
| ------------------- | ------- | ------------ | ------------------------------------------------ |
| theme               | String  | `vs-dark`    | 编辑器主题，可选值为 `vs`, `vs-dark`, `hc-black` |
| minimapEnabled      | Boolean | true         | 是否启用缩略图                                   |
| language            | String  | `javascript` | 编辑器语言                                       |
| modelValue(v-model) | String  | ``           | 编辑器内容                                       |

## expose

| 函数名              | 描述                                         |
| ------------------- | -------------------------------------------- |
| `updateMonacoValue` | 更新 Monaco 编辑器实例的值，使用指定的文本。 |
| `getValue`          | 从 Monaco 编辑器实例中获取当前值。           |
