# Form-Schema

`FormSchema` 组件基于 `Form` 组件进行封装，使用 JSON Schema 描述表单的结构和验证规则，然后生成对应的表单。

## 基本使用

:::demo

```vue
<template>
  <FormSchema ref="formSchemaIns" :schema="schema">
    <template #phone>
      <div>123</div>
    </template>
  </FormSchema>
  <el-button @click="submit">提交</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const formSchemaIns = ref()

const schema = [
  { label: '姓名', type: 'input', name: 'name', required: true },
  { label: '邮箱', type: 'input', name: 'email', required: true },
  {
    label: '性别',
    type: 'select',
    name: 'gender',
    componentProperty: {
      options: [
        { label: 'male', value: 'male' },
        { label: 'female', value: 'female' },
      ],
    },
  },
  {
    label: '手机号码',
    type: 'input-number',
    name: 'phone',
    slot: { name: 'phone' },
  },
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
