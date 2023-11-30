<script setup lang="ts">
import { PropType } from 'vue'
interface Column {
  label: string
  field: string
  value: string
  slot?: { name: string }
}
defineProps({
  count: {
    type: Number,
    default: 3,
  },
  column: {
    type: Array as PropType<Array<Column>>,
    default: () => [],
  },
})
</script>
<template>
  <el-descriptions :column="count" border>
    <template v-for="(item, index) in column" :key="item.field">
      <el-descriptions-item :label="item.label">
        <template v-if="item.slot">
          <slot :name="item.slot.name"></slot>
        </template>
        <template v-else>
          {{ item.value }}
        </template>
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>
