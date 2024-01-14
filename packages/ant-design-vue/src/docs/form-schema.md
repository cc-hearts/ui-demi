# FormSchema

`FormSchema` 组件基于 `Form` 组件进行封装，使用 JSON Schema 描述表单的结构和验证规则，然后生成对应的表单。

## 基本使用

:::demo

```vue
<template>
  <FormSchema ref="formSchemaIns" :schema="schema" />
  <a-button @click="submit">提交</a-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const formSchemaIns = ref()

const schema = [
  { label: '姓名', type: 'input', name: 'name' },
  { label: '邮箱', type: 'input', name: 'email' },
]

const submit = async () => {
  const [bool, fields] = await formSchemaIns.value?.validate()
  if (!bool) {
    return
  }

  console.log(fields)
}
</script>
```

:::
