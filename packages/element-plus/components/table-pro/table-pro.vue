<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, toRaw } from 'vue'
import { ElButton, ElTable, ElTableColumn } from 'element-plus'
import { useTableSelection } from './use-table-selection'
import { noop } from '@cc-heart/utils'
import { defineCssNamespace } from '../_utils/css-namespace'
import type { ExtendsElTableExpose, TableProProps } from './helper'

defineOptions({ name: 'TablePro' })

const props = withDefaults(defineProps<TableProProps>(), {
  isModify: false,
  isSelection: false,
  loading: false,
  getData: () => ({}),
  isFetchDataOnMounted: true,
  dataSource: () => [],
  originData: () => ({}),
  columns: () => [],
  onWillRemoveRow: () => true,
  useDefaultActionSlot: false,
  defaultActionColumnLabel: 'action',
  selectType: 'checkbox',
  rowKey: 'id',
  extraTableProps: () => ({}),
  actionSlotProps: () => ({}),
})

const ns = defineCssNamespace('table-pro')

const tableRef = ref<ExtendsElTableExpose>()

const internalDataSource = defineModel('dataSource', {
  default: [] as Array<Record<PropertyKey, unknown>>,
})
const loading = defineModel('loading', {
  type: Boolean,
  default: false,
})

const loadData = () => {
  loading.value = true
  Promise.resolve(props.getData?.() || noop)
    .finally(() => {
      loading.value = false
    })
    .then((data) => {
      if (data instanceof Array) {
        internalDataSource.value = data
      }
    })
}

onMounted(() => {
  if (props.isFetchDataOnMounted) loadData()
})

const getterRowKey = computed(() => {
  if (typeof props.rowKey === 'function') return props.rowKey()

  return props.rowKey
})

const {
  rowSelection,
  onRowSelectionChange,
  toggleAllSelection,
  exposeRowSelectionFactory,
  removeRowSelection,
  clearSelection,
} = useTableSelection({
  dataSource: internalDataSource,
  tableRef,
  type: props.selectType,
  rowKey: props.rowKey,
})

const ins = getCurrentInstance()
const handleAddTableColumn = () => {
  const newColumn =
    props.originData instanceof Function
      ? props.originData()
      : {
          ...props.originData,
        }

  internalDataSource.value = [...internalDataSource.value, newColumn]
}

const removeTableColumn = (selectedRow: Record<PropertyKey, unknown>) => {
  const bool = props.onWillRemoveRow(internalDataSource.value, selectedRow)
  if (!bool) return

  const index = internalDataSource.value.findIndex(
    (item) => toRaw(item) === toRaw(selectedRow)
  )
  if (index === -1) return

  internalDataSource.value.splice(index, 1)
  internalDataSource.value = [...internalDataSource.value]
  removeRowSelection(selectedRow)
}

const getDataSource = () => {
  return internalDataSource
}

const removeSelectiveTableColumn = () => {
  for (const target of rowSelection.selectNodes) {
    const index = internalDataSource.value.findIndex(
      (item) => toRaw(item) === toRaw(target)
    )

    if (index > -1) {
      internalDataSource.value.splice(index, 1)
      removeRowSelection(target)

      internalDataSource.value = [...internalDataSource.value]
    }
  }
}

defineExpose({ getDataSource, ...exposeRowSelectionFactory() })
</script>
<template>
  <div :class="[ns.cls]">
    <slot name="header">
      <div v-if="isModify" :class="[ns.b('action')]">
        <ElButton type="primary" @click="handleAddTableColumn">
          新 增
        </ElButton>

        <ElButton
          type="danger"
          @click="removeSelectiveTableColumn"
          :disabled="!rowSelection.selectNodes.length"
        >
          删 除
        </ElButton>
      </div>
    </slot>

    <slot name="select-action">
      <div
        v-if="isModify && rowSelection.selectNodes.length"
        :class="[ns.b('select-action')]"
      >
        <div>已选择 {{ rowSelection.selectNodes.length }} 项</div>
        <ElButton link type="primary" @click="clearSelection"
          >取消选择</ElButton
        >
      </div>
    </slot>

    <ElTable
      ref="tableRef"
      v-loading="loading"
      :data="internalDataSource"
      :row-key="rowKey"
      @select="onRowSelectionChange"
      @select-all="toggleAllSelection"
      v-bind="extraTableProps"
    >
      <ElTableColumn v-if="isSelection || isModify" type="selection" />

      <template #empty>
        <slot name="empty">
          <el-empty />
        </slot>
      </template>

      <template v-for="item in columns" :key="item.prop">
        <ElTableColumn
          :align="item.align"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed"
          :width="item.width"
          :min-width="item.minWidth"
          v-bind="item.extraAttributes || {}"
        >
          <template v-if="item.labelSlot" #header>
            <slot :name="item.labelSlot.name" :label-attr="item.labelSlot" />
          </template>
          <template v-if="item.slot" #default="row">
            <slot :name="item.slot.name" v-bind="row" :slot-attr="item.slot" />
          </template>
        </ElTableColumn>
      </template>

      <slot name="action">
        <ElTableColumn
          :label="defaultActionColumnLabel"
          v-if="useDefaultActionSlot"
          v-bind="actionSlotProps"
        >
          <template #default="scope">
            <ElButton link type="danger" @click="removeTableColumn(scope.row)">
              删除</ElButton
            >
          </template>
        </ElTableColumn>
      </slot>
    </ElTable>
  </div>
</template>
