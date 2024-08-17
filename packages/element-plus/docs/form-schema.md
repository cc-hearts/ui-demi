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

## Props

<!-- prettier-ignore -->
| 属性          | 类型                                    | 必填    | 描述                | 默认值                    |
| ------------- | --------------------------------------- | ------- | ------------------- | ------------------------- |
| layout        | [FormLayout](#formlayout)               | `false` | 表单布局            | `{ span: 3, gutter: 12 }` |
| schema        | [Schema](#schema)                       | `false` | 表单 schema         | `[]`                      |
| defaultValue  | `Record<string, any>` \\| `(() => any)` | `false` | 表单默认值          | `{}`                      |
| labelPosition | `top` \\| `left`                        | `false` | 表单 label 布局位置 | `top`                     |

### Schema

<!-- prettier-ignore -->
| 属性              | 类型                                                      | 必填    | 描述                                                                                                                            | 默认值  |
| ----------------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------- |
| label             | string                                                    | `false` | 字段的标签，用于显示在表单中。                                                                                                  | `-`     |
| type              | string                                                    | `true`  | 表单子项的组件类型，内置有 select、input、radio等，如果内置组件不包含预期类型，可使用 `extensionComponentMap` 方法覆盖/增加类型 | `-`     |
| name              | string                                                    | `true`  | 字段的名称，用于表单数据的存储和传递。                                                                                          | `-`     |
| required          | boolean                                                   | `false` | 是否为必填项，若为 true，则在表单提交时需要进行验证。                                                                           | `false` |
| span              | number                                                    | `false` | 字段所占据的栅格数（一屏的栅格数为24），用于控制表单布局，默认值根据布局 `span` 自动计算。                                      | `-`     |
| offset            | number                                                    | `false` | 字段的偏移栅格数，用于控制表单布局。                                                                                            | `-`     |
| slot              | { name: string; [props: string]: any }                    | `false` | 字段的插槽信息，用于自定义表单字段的展示。                                                                                      | `-`     |
| labelSlot         | { name: string; [props: string]: any }                    | `false` | 用于定义自定义 label 的展示。                                                                                                   | `-`     |
| rules             | Array\<Record\<string, unknown\>\>                        | `false` | 字段的验证规则，用于自定义验证逻辑。                                                                                            | `-`     |
| hiddenLabel       | boolean                                                   | `false` | 是否隐藏标签                                                                                                                    | `true`  |
| labelWidth        | string \\| number                                         | `false` | 标签宽度                                                                                                                        | `-`     |
| componentProperty | { options?: [Options](#options)[], [props: string]: any } | `false` | 组件覆盖属性，此属性用于上游有提供属性，但是 FormSchema 组件的 props 没有覆盖，可以使用此属性进行属性的优先级覆盖。             | `{}`    |

### FormLayout

<!-- prettier-ignore -->
| 属性   | 类型   | 必填   | 描述             | 默认值 |
| ------ | ------ | ------ | ---------------- | ------ |
| span   | number | `true` | 设置布局的跨度。 | `-`    |
| gutter | number | `true` | 设置布局的间距。 | `-`    |

## 方法

<!-- prettier-ignore -->
| 方法名称         | 类型                                             | 描述                                                                           |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| `validate`       | `-`                                              | 异步验证表单，如果验证失败返回 `[false, null]`，否则返回 `[true, formValue]`。 |
| `resetFields`    | `-`                                              | 重置表单的所有字段。                                                           |
| `setFieldValue`  | `(field: PropertyKey`, `value: unknown) => void` | 设置指定字段的值。                                                             |
| `setFieldsValue` | `(target: Record<PropertyKey, any>) => void`     | 批量设置多个字段的值。                                                         |
| `getFieldsValue` | `-`                                              | 获取表单的所有字段值。                                                         |
| `getFieldValue`  | `(field: PropertyKey) => any`                    | 获取指定字段的值。                                                             |
| `getInstance`    | `-`                                              | 获取表单实例的计算属性。                                                       |
