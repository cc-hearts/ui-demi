# TablePro

对 ElTable 进行二次封装

## 基本使用

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const columns = [
  { label: '姓名', prop: 'name', width: '100px' },
  { label: '年龄', prop: 'age', width: '80px' },
  { label: '性别', prop: 'gender', width: '60px' },
  { label: '职业', prop: 'occupation', width: '120px' },
  { label: '地址', prop: 'address', width: '200px' },
  { label: '邮箱', prop: 'email', width: '180px' },
  { label: '手机号码', prop: 'phone', width: '150px' },
  { label: '入职日期', prop: 'hireDate', width: '120px' },
  { label: '离职日期', prop: 'resignationDate', width: '120px' },
  { label: '部门', prop: 'department', width: '100px' },
]

const getData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        [
          {
            name: '张三',
            age: 25,
            gender: '男',
            occupation: '工程师',
            address: '北京市海淀区',
            email: 'zhangsan@example.com',
            phone: '13812345678',
            hireDate: '2023-01-01',
            resignationDate: '',
            department: '技术部',
          },
          {
            name: '李四',
            age: 30,
            gender: '女',
            occupation: '设计师',
            address: '上海市浦东新区',
            email: 'lisi@example.com',
            phone: '13987654321',
            hireDate: '2022-05-15',
            resignationDate: '2023-08-20',
            department: '设计部',
            id: 4,
          },
          {
            name: '王五',
            age: 28,
            gender: '男',
            occupation: '销售经理',
            address: '广州市天河区',
            email: 'wangwu@example.com',
            phone: '13765432109',
            hireDate: '2021-11-11',
            resignationDate: '',
            id: 3,
            department: '销售部',
          },
          {
            name: '赵六',
            age: 35,
            gender: '女',
            occupation: '产品经理',
            address: '深圳市南山区',
            email: 'zhaoliu@example.com',
            phone: '13654321098',
            hireDate: '2022-03-20',
            resignationDate: '2023-10-10',
            department: '产品部',
            id: 2,
          },
          {
            name: '钱七',
            age: 32,
            gender: '男',
            id: 1,
            occupation: '运营总监',
            address: '成都市武侯区',
            email: 'qianqi@example.com',
            phone: '13543210987',
            hireDate: '2021-09-05',
            resignationDate: '',
            department: '运营部',
          },
        ],
        5,
      ])
    }, 3000)
  })
}
</script>

<template>
  <TablePro :columns="columns" :request="getData" is-selection>
    <template #name="scope">
      <el-input v-model="scope.row.name" />
    </template>
  </TablePro>
</template>
```

:::

## Props

<!-- prettier-ignore -->
| 属性                           | 类型                                      | 必填   | 描述                                                                                                                                 | 默认值      |
| ------------------------------ | ----------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| isModify                       | boolean                                   | `false`| 组件是否处于修改模式。                                                                         | `false`     |
| loading                        | boolean                                   | `false`| 加载数据时显示动画                                                                                   | `false`     |
| isSelection                    | boolean                                   | `false`| 是否启用选择模式。                                                                                 | `false`     |
| getData                        | () => Record<PropertyKey, unknown>        | `false`| 获取数据的函数。该函数应返回一个对象。                                     | `() => ({})`|
| isFetchDataOnMounted           | boolean                                   | `false`| 组件挂载时是否调用 `getData` 函数。                                | `false`     |
| dataSource                     | [DataSource](#types)       | `false`| 组件的数据源。                                                                                          | `[]`        |
| originData                     | [OriginData](#types) | `false`| 用于修改表格数据的原始数据。       | `() => ({})`|
| columns                        | [Array\<Column\>](#column)                                  | `false`| 表格的列配置。                                                                                   | `[]`        |
| onWillRemoveRow                | [onWillRemoveRow](#types) | `false`| 处理行删除的函数。返回一个布尔值，该值确定是否执行内置删除逻辑。          | `() => true`|
| useDefaultActionSlot           | boolean                                   | `false`| 是否使用默认的操作插槽。                                                                        | `false`     |
| defaultActionColumnLabel       | string                                    | `false`| 默认操作列的标签。                                                                               | `'action'`  |
| selectType                     | `radio` \\| `checkbox`                     | `false`| 选择类型（单选或多选）。                                                                         | `'checkbox'`|
| rowKey                         | string \\| (() => string)                  | `false`| 用于标识行的键。                               | `'id'`      |
| actionSlotProps                | Record<string, unknown>                   | `false`| 操作插槽的属性。                                                                                      | `{}`        |
| extraTableProps                | Record<string, unknown>                   | `false`| ElTable组件覆盖属性                                                                                                                  | `{}`        |

### Column

<!-- prettier-ignore -->
| 属性            | 类型                           | 必填   | 描述                                                                                                       | 默认值    |
| --------------- | ------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------- | -------- |
| label           | string                         | `true` | 列的标签名称，用于表头显示。                                                                                 | `-`        |
| prop            | string                         | `true` | 列的数据属性名称，用于从数据对象中提取值。                                                                   | `-`        |
| width           | string \\| number               | `false`| 列的宽度，可以是字符串或数字类型, 宽度值可以设置为固定值或百分比。                                           | `-`        |
| align           | string                         | `false`| 列的对齐方式，可以为 'left'、'center' 或 'right'。                                                           | `'left'` |
| minWidth        | string \\| number               | `false`| 列的最小宽度，可以是字符串或数字类型。                                                                       | `-`        |
| fixed           | `boolean` \\| `left` \\| `right`   | `false`| 列是否固定在表格的左侧或右侧，或者不固定。可以是布尔值（true 表示固定在左侧）或 'left'、'right'。             | `-`        |
| slot            | { name: string; [props: string]: any }               | `false`| 用于定义自定义单元格内容的插槽信息。                                                                         | `-`        |
| labelSlot       | { name: string; [props: string]: any }               | `false`| 用于定义自定义表头标签的插槽信息。                                                                           | `-`        |
| extraAttributes | Record<string, unknown>        | `false`| ElTableColumn 覆盖属性                                                                                      | `-`        |

## 方法

<!-- prettier-ignore -->
| 方法名称                     | 类型                                                     | 描述                                       |
|------------------------------|----------------------------------------------------------|--------------------------------------------|
| getDataSource               | `() => DataSource[]`                                     | 获取数据源                                 |
| rowSelection                | `shallowReactive<{ selectNodes: SelectNodes<T> }>`       | 当前选中的行数据                          |
| clearSelection              | `() => void`                                             | 清除所有选中的行                          |
| refreshSelection            | `(dataSource?: SelectNodes<T>) => Promise<void>`         | 刷新选中的行                              |
| toggleAllSelection          | `(rows: SelectNodes<T>) => void`                         | 切换所有行的选中状态                      |
| onRowSelectionChange        | `(rows: SelectNodes<T>) => void`                         | 行选择改变时的回调                        |
| removeRowSelection          | `(row: unknown) => void`                                 | 移除指定的选中行                          |
| removeRowSelectionByRowKey  | `(rowKey: unknown) => void`                              | 根据key移除指定的选中行                  |

### Css Var

<!-- prettier-ignore -->
| css 变量                   | 描述 | 默认值 |
| -------------------------- | ---- | ------ |
| --table-pro-padding | 内置操作栏内边距    | 12px 0 |

### Types

```ts
type DataSource = Array<Record<PropertyKey, unknown>>

type OriginData = Record<PropertyKey, any> | (() => Record<PropertyKey, any>)

type onWillRemoveRow = (
  dataSource: Array<Record<PropertyKey, unknown>>,
  row: Record<PropertyKey, unknown>
) => boolean

interface RowSelectionOptions<T extends Record<PropertyKey, unknown>> {
  /**
   * 行选择的类型，可选值为 'radio' 或 'checkbox'。
   *
   * @type {'radio' | 'checkbox'}
   * @default 'radio'
   */
  type?: 'radio' | 'checkbox'

  /**
   * 用于标识行的唯一键，支持字符串或函数形式。
   *
   * @type {string | (() => string)}
   * @default 'id'
   */
  rowKey?: Props['rowKey']

  /**
   * 引用表格实例的 `Ref` 对象，用于操作表格的选择。
   *
   * @type {Ref<typeof ElTable>}
   */
  tableRef?: Ref<typeof ElTable>

  /**
   * 数据源的 `Ref` 对象，用于管理和跟踪表格的数据源。
   *
   * @type {Ref<Array<T>>}
   */
  dataSource?: Ref<Array<T>>

  /**
   * 是否在数据源变化时刷新选中的行。
   *
   * @type {boolean}
   * @default false
   */
  watchDataSourceChangeRefreshSelection?: boolean
}

type RemoveUndefined<T> = T extends T
  ? T extends undefined
    ? never
    : T
  : never

type SelectNodes<
  T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = RemoveUndefined<UnwrapRef<RowSelectionOptions<T>['dataSource']>>
```
