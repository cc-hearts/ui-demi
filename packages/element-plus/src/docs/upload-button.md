# UploadButton

对 `el-upload` 进行二次封装，减少一些繁杂的配置属性

## 基本用法

:::demo

```vue
<template>
  <upload-button
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

## 属性

| 名称      | 类型     | 默认值 | 描述                     |
| --------- | -------- | ------ | ------------------------ |
| url       | String   | '#'    | 文件上传的 URL           |
| fileList  | Array    | []     | 需要上传的文件列表       |
| onSuccess | Function | -      | 文件上传成功时的回调函数 |
| limit     | Number   | -      | 可上传文件的最大数量     |
| multiple  | Boolean  | -      | 是否可以一次上传多个文件 |

## 事件

| 名称          | 描述                       |
| ------------- | -------------------------- |
| handleUpload  | 当文件上传时触发           |
| handleSuccess | 当文件成功上传时触发       |
| handleError   | 当上传过程中发生错误时触发 |
| handleExceed  | 当超过文件限制时触发       |

## 插槽

| 名称    | 描述               |
| ------- | ------------------ |
| trigger | 上传按钮的内容     |
| tip     | 上传按钮的提示信息 |
