<script setup lang="ts">
import { PropType, ref } from 'vue'

interface Column {
  label: string
  prop: string
  width?: string
  align?: string
  slot?: { name: string }
  labelSlot?: { name: string }
}

defineOptions({ name: 'DynamicTable' })

const props = defineProps({
  modalValue: {
    type: Array,
    default: () => [],
  },
  originData: {
    type: [Object, Function],
    default: () => ({}),
  },
  columns: {
    type: Array as PropType<Array<Column>>,
    default: () => [],
  },
})

const dataSource = ref([] as Array<(typeof props)['originData']>)
const getDataSource = () => {
  return dataSource
}

defineExpose({ getDataSource })

const handleAddTableColumn = () => {
  const newColumn =
    props.originData instanceof Function
      ? props.originData()
      : {
          ...props.originData,
        }
  dataSource.value.push(newColumn)
}

const removeTableColumn = (index: number) => {
  dataSource.value.splice(index, 1)
}
</script>
<template>
  <div>
    <slot name="header">
      <div class="p-2 text-right">
        <el-button @click="handleAddTableColumn"> 新增 </el-button>
      </div>
    </slot>

    <el-table :data="dataSource">
      <template v-for="item in columns" :key="item.prop">
        <el-table-column
          :align="item.align || 'center'"
          :prop="item.prop"
          :label="item.label"
        >
          <template v-if="item.labelSlot" #label>
            <slot :name="item.labelSlot.name" />
          </template>
          <template v-if="item.slot" #default="row">
            <slot :name="item.slot.name" v-bind="row" />
          </template>
        </el-table-column>
      </template>

      <slot name="action">
        <el-table-column label="操作">
          <template #default="{ $index }">
            <el-button danger @click="removeTableColumn($index)">
              删除</el-button
            >
          </template>
        </el-table-column>
      </slot>
    </el-table>
  </div>
</template>
