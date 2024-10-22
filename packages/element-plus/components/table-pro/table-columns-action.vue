<script setup lang="ts" name="ColumnsOperation">
import { noop } from '@cc-heart/utils'
import { ComputedRef, PropType, Ref, computed, unref } from 'vue'
import draggable from 'vuedraggable'
import DragSortIcon from './drag-sort-icon.vue'
import {
  ElIcon,
  ElPopover,
  ElCheckbox,
  ElButton,
  ElCheckboxGroup,
  ElDivider,
} from 'element-plus'

const props = defineProps({
  sortedColumns: {
    type: [Array, Object] as PropType<
      Array<Record<string, any>> | Ref<Array<Record<string, any>>>
    >,
    default: () => [],
  },
  columnsField: {
    type: Array as PropType<Array<string> | Ref<Array<string>>>,
    default: () => [],
  },
  rowKey: {
    type: String as PropType<ComputedRef<string> | string>,
    default: 'key',
  },
  onUpdateSortedColumns: {
    type: Function as PropType<(val: Record<string, any>[]) => void>,
    default: noop,
  },
  onUpdateColumnsField: {
    type: Function as PropType<(val: (string | number)[]) => void>,
    default: noop,
  },
  onReset: {
    type: Function as PropType<() => void>,
    default: noop,
  },
})

let tempColumnSettings = [...unref(props.sortedColumns)] as any[]
const handleChangeColumns = (val: any[]) => {
  tempColumnSettings = val
}

const emitChangeColumn = () => {
  props.onUpdateSortedColumns(tempColumnSettings)
}

const handleChangeCheckbox = (columnIds: Array<any>) => {
  props.onUpdateColumnsField(columnIds)
}
const isAllSelected = computed(() => {
  return unref(props.columnsField).length === unref(props.sortedColumns).length
})

const toggleShowColumns = () => {
  if (isAllSelected.value) {
    props.onUpdateColumnsField([])
  } else {
    props.onUpdateColumnsField(
      unref(props.sortedColumns).map(
        (item: Record<string, any>) =>
          Reflect.get(item, unref(props.rowKey) as string)!
      )
    )
  }
}
const handleReset = () => {
  props.onReset()
}
</script>
<template>
  <ElPopover trigger="click">
    <template #reference>
      <slot />
    </template>
    <div class="flex items-center justify-between">
      <ElCheckbox :checked="isAllSelected" @change="toggleShowColumns"
        >列展示</ElCheckbox
      >
      <ElButton link @click="handleReset"> 重置 </ElButton>
    </div>

    <ElCheckboxGroup
      :modelValue="unref(columnsField)"
      @change="handleChangeCheckbox"
    >
      <draggable
        :model-value="unref(sortedColumns)"
        @update:model-value="handleChangeColumns"
        @end="emitChangeColumn"
        group="description"
        animation="300"
        class="flex flex-col"
        handle=".drag-handle"
        item-key="prop"
      >
        <template #item="{ element }">
          <ElCheckbox
            :key="element.prop"
            :value="element.prop"
            :label="element.label"
          >
            <div class="drag-handle m-r-1">
              <DragSortIcon />
            </div>
            {{ element.label }}
          </ElCheckbox>
        </template>
      </draggable>
    </ElCheckboxGroup>
  </ElPopover>
</template>
<style lang="scss">
.drag-handle {
  display: inline-flex;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
</style>
