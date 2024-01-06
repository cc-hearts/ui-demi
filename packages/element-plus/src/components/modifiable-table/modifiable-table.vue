<script setup lang="ts">
import { ref } from 'vue'
import { _props } from './helper'

defineOptions({ name: 'ModifiableTable' })
const props = defineProps(_props)

const dataSource = ref([] as Array<(typeof props)['originData']>)
const getDataSource = () => {
  return dataSource
}

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
  const bool = props.onWillRemoveRow()
  if (!bool) return

  dataSource.value.splice(index, 1)
}

defineExpose({ getDataSource })
</script>
<template>
  <div>
    <slot name="header">
      <div class="p-2 text-right">
        <el-button @click="handleAddTableColumn"> 新增 </el-button>
      </div>
    </slot>

    <el-table :data="dataSource">
      <template #empty>
        <slot name="empty">
          <el-empty />
        </slot>
      </template>
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
        <el-table-column
          :label="defaultActionColumnLabel"
          v-if="useDefaultActionSlot"
        >
          <template #default="{ $index }">
            <el-button type="danger" @click="removeTableColumn($index)">
              删除</el-button
            >
          </template>
        </el-table-column>
      </slot>
    </el-table>
  </div>
</template>
