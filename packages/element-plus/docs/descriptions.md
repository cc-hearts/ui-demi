# Descriptions

以列表形式展示字段

对 `element-plus` 的 `Descriptions` 组件进一步的封装，减少 `el-descriptions-item` 等重复模版代码。

## 基本使用

:::demo

```vue
<template>
  <descriptions :columns="descriptionItems" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTag } from 'element-plus'

const descriptionItems = ref([
  { label: 'Username', field: 'username', value: 'kooriookami' },
  { label: 'Telephone', field: 'telephone', value: '18100000000' },
  { label: 'Place', field: 'place', value: 'Suzhou' },
])
</script>
```

:::

## Description Slot

对于复杂的渲染，可以指定 `slot / labelSlot` 以动态插槽的方式实现自定义渲染。

:::demo

```vue
<template>
  <descriptions :columns="descriptionItems">
    <template #remarkLabel="{ data }">
      <el-tag type="danger">{{ data.label }}</el-tag>
    </template>
    <template #remark="{ data }">
      <el-tag type="primary">{{ data.value }}</el-tag>
    </template>
  </descriptions>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElTag } from 'element-plus'

const descriptionItems = ref([
  { label: 'Username', field: 'username', value: 'kooriookami' },
  { label: 'Telephone', field: 'telephone', value: '18100000000' },
  { label: 'Place', field: 'place', value: 'Suzhou' },
  {
    label: 'Remarks',
    field: 'remarks',
    value: 'remark',
    slot: { name: 'remark' },
    labelSlot: { name: 'remarkLabel' },
  },
])
</script>
```

:::

## Props

<!-- prettier-ignore -->
| 属性           | 类型                    | 必填   | 描述                                                                                      | 默认值 |
| -------------- | ----------------------- | ------ | ----------------------------------------------------------------------------------------- | ------ |
| span           | number                   | `false` | Number of columns displayed in a row. 每行显示的列数。                                     | `3`    |
| columns        | [Array\<DescriptionItem\>](#descriptionitem)   | `true` | An array of `DescriptionItem` objects defining the columns. 定义列的 `DescriptionItem` 对象数组。 | `[]`   |
| border         | boolean                  | `false` | Indicates whether to show a border. 是否显示边框。                                        | `true` |
| defaultValue   | string                   | `false`| The default value to use if none is provided. 默认显示值。                                 | `'-'`  |

### DescriptionItem

<!-- prettier-ignore -->
| 属性      | 类型                     | 必填   | 描述                                                                                   | 默认值    |
| --------- | ------------------------ | ------ | -------------------------------------------------------------------------------------- | -------- |
| label     | string                    | `true` | 显示的标签名称。                                                                       | `-`        |
| field     | string                    | `true` | 对应数据的字段名称。                                                                   | `-`        |
| value     | any                       | `false` | 显示的值。                                                                             | `-`        |
| span      | number                    | `false`| 占用的列数。                                                                           | `-`    |
| slot      | { name: string, [prop: string]: any }          | `false`| 自定义插槽的名称。                                                                     | `-`        |
| labelSlot | { name: string, [prop: string]: any }          | `false`| 自定义标签插槽的名称。                                                                 | `-`        |
