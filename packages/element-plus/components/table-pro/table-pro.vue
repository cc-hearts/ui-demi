<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, toRaw, toRef } from 'vue'
import {
  ElButton,
  ElIcon,
  ElTable,
  ElTableColumn,
  ElCard,
  ElPagination,
  ElEmpty,
  ElCollapseTransition,
  vLoading,
} from 'element-plus'
import { useTableSelection } from './use-table-selection'
import { isFn, noop } from '@cc-heart/utils'
import { defineCssNamespace } from '../_utils/css-namespace'
import type { ExtendsElTableExpose, TableProProps } from './helper'
import { usePagination } from './use-pagination'
import { Refresh } from '@element-plus/icons-vue'
import TableColumnsAction from './table-columns-action.vue'
import { useColumnsSort } from './use-column-sort'
import { Setting } from '@element-plus/icons-vue'

defineOptions({ name: 'TablePro' })

const props = withDefaults(defineProps<TableProProps>(), {
  isActionPanel: false,
  isSelection: false,
  isLoading: false,
  dataSource: () => [],
  columns: () => [],
  isUseActionSlot: false,
  tableHeaderSubTitle: 'search table',
  defaultActionColumnLabel: 'action',
  selectType: 'checkbox',
  rowKey: 'id',
  extraTableProps: () => ({}),
  actionSlotProps: () => ({}),
  extraPaginationProps: () => ({}),
})

const ns = defineCssNamespace('table-pro')
const tableRef = ref<ExtendsElTableExpose>()

const isInternalLoading = defineModel('isLoading', {
  type: Boolean,
  default: false,
})

const internalDataSource = defineModel('dataSource', {
  default: [] as Array<Record<PropertyKey, unknown>>,
})
const internalPagination = usePagination()

const {
  rowSelection,
  onRowSelectionChange,
  toggleAllSelection,
  exposeRowSelectionFactory,
  clearSelection,
} = useTableSelection({
  dataSource: internalDataSource,
  tableRef,
  type: props.selectType,
  rowKey: props.rowKey,
})

const internalRequest = () => {
  if (isFn(props.request)) {
    isInternalLoading.value = true
    Promise.resolve(
      props.request({
        pageNo: internalPagination.pageNo,
        pageSize: internalPagination.pageSize,
      })
    )
      .then((res) => {
        if (!Array.isArray(res)) return

        const [dataSource, total] = res
        internalDataSource.value = dataSource || []
        internalPagination.total = total
      })
      .finally(() => {
        isInternalLoading.value = false
      })
  }
}

const internalCurrentChange = (pageNo: number) => {
  internalPagination.pageNo = pageNo
  internalRequest()
}

const internalSizeChange = (pageSize: number) => {
  internalPagination.pageSize = pageSize
  internalCurrentChange(1)
}
const { sortedColumnsProps, getSortedColumns } = useColumnsSort({
  rowKey: 'prop',
  columns: toRef(props, 'columns'),
})
sortedColumnsProps.onReset()

onMounted(() => {
  internalRequest()
})

defineExpose({ ...exposeRowSelectionFactory() })
</script>
<template>
  <div :class="[ns.cls]">
    <ElCard v-if="isActionPanel" :class="[ns.b('action-panel')]">
      <slot name="action-panel">
        <div>
          <ElButton>重置</ElButton>
          <ElButton :disabled="isInternalLoading">查询</ElButton>
        </div>
      </slot>
    </ElCard>

    <slot name="table-header">
      <div :class="ns.b('header')">
        <div>{{ tableHeaderSubTitle }}</div>
        <div :class="ns.b('header-action')">
          <ElButton type="primary">新建</ElButton>
          <ElIcon @click="internalRequest"><Refresh /></ElIcon>
          <TableColumnsAction v-bind="sortedColumnsProps">
            <ElIcon>
              <Setting />
            </ElIcon>
          </TableColumnsAction>
        </div>
      </div>
    </slot>

    <slot name="select-action">
      <ElCollapseTransition>
        <div
          v-if="rowSelection.selectNodes.length"
          :class="[ns.b('select-action')]"
        >
          <div>已选择 {{ rowSelection.selectNodes.length }} 项</div>
          <ElButton link type="primary" @click="clearSelection"
            >取消选择</ElButton
          >
        </div>
      </ElCollapseTransition>
    </slot>

    <div v-loading="isInternalLoading">
      <ElTable
        ref="tableRef"
        :data="internalDataSource"
        :row-key="rowKey"
        @select="onRowSelectionChange"
        @select-all="toggleAllSelection"
        v-bind="extraTableProps"
      >
        <ElTableColumn v-if="isSelection" type="selection" />

        <template #empty>
          <slot name="empty">
            <ElEmpty />
          </slot>
        </template>

        <template v-for="item in getSortedColumns" :key="item.prop">
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
              <slot
                :name="item.slot.name"
                v-bind="row"
                :slot-attr="item.slot"
              />
            </template>
          </ElTableColumn>
        </template>

        <slot name="action-column">
          <ElTableColumn
            :label="defaultActionColumnLabel"
            v-if="isUseActionSlot"
            v-bind="actionSlotProps"
          >
            <template #default="scope">
              <slot name="action" />
            </template>
          </ElTableColumn>
        </slot>
      </ElTable>

      <div :class="ns.b('pagination')">
        <ElPagination
          v-model:current-page="internalPagination.pageNo"
          v-model:page-size="internalPagination.pageSize"
          :page-sizes="internalPagination.pageSizes"
          background
          size="small"
          :total="internalPagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="internalSizeChange"
          @current-change="internalCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
