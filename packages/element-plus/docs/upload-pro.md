# UploadPro

对 `el-upload` 进行二次封装，减少一些繁杂的配置属性

## 基本用法

:::demo

```vue
<template>
  <upload-pro
    :url="'http://example.com/upload'"
    :fileList="fileList"
    :onSuccess="handleSuccess"
    :limit="3"
    :multiple="true"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const fileList = ref([])
</script>
```

:::

## Props

<!-- prettier-ignore -->
| 属性             | 类型                                                | 必填    | 描述                           | 默认值      |
| ---------------- | --------------------------------------------------- | ------- | ------------------------------ | ----------- |
| text             | string                                              | `false` | 按钮文字                       | `'上传文件'`|
| type             | `picture` \\| `text` \| `picture-card`               | `false` | 上传类型                       | `'text'`    |
| url              | string                                              | `false` | 文件上传 url地址               | `'#'`       |
| modelValue       | string                                              | `false` | 组件值                         | `''`        |
| multiple         | boolean                                             | `false` | 是否允许多文件上传             | `false`     |
| limit            | number                                              | `false` | 最大上传数                     | `1`         |
| acceptList       | string[] \\| null                                    | `false` | 允许上传的文件列表             | `null`      |
| defaultFileList  | string[]                                            | `false` | 默认的文件列表                 | `[]`        |
| icon             | VNode \\| null                                       | `false` | 上传按钮前缀图标               | `null`      |
| uploadHeaders    | () => Record<string, any>                           | `true`  | 文件上传的请求头               |             |
| errorFn          | (error: any) => void                                | `false` | 文件上传错误回调函数           |             |
| placeholder      | string                                              | `false` | 文件上传提示占位符             | `''`        |

## 插槽

| 名称    | 描述               |
| ------- | ------------------ |
| trigger | 上传按钮的内容     |
| tip     | 上传按钮的提示信息 |
