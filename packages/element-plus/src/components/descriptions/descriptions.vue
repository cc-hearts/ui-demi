<script setup lang="ts">
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { isUndef, isStr } from '@cc-heart/utils'
import type { Props } from './helper'

defineOptions({ name: 'Descriptions' })

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  border: false,
  span: 3,
  defaultValue: '-',
})

const internalFormatterValue = (value: string) => {
  if ((!value && isUndef(value)) || (isStr(value) && value === '')) {
    return props.defaultValue
  }

  return value
}
</script>

<template>
  <ElDescriptions :column="span" :border="border">
    <template v-for="item in columns" :key="item.field">
      <ElDescriptionsItem :span="item.span" :label="item.label">
        <template v-if="item.labelSlot" #label>
          <slot :name="item.labelSlot.name" :data="item" />
        </template>

        <template v-if="item.slot">
          <slot :name="item.slot.name" :data="item" />
        </template>

        <template v-else>
          {{ internalFormatterValue(item.value) }}
        </template>
      </ElDescriptionsItem>
    </template>
  </ElDescriptions>
</template>
