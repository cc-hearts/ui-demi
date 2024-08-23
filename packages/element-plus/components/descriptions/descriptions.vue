<script setup lang="ts">
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { isUndef, isStr } from '@cc-heart/utils'
import type { Props } from './helper'
import { useTooltip } from '../tooltip/use-tooltip'
import { ref } from 'vue'
import { defineCssNamespace } from '../_utils/css-namespace'
import { useHidden } from '../_utils/use-hidden'

defineOptions({ name: 'Descriptions' })

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  border: true,
  span: 3,
  defaultValue: '-',
})

const internalFormatterValue = (value: string) => {
  if ((!value && isUndef(value)) || (isStr(value) && value === '')) {
    return props.defaultValue
  }

  return value
}

// ================== styles ==================
const ns = defineCssNamespace('descriptions')

// ================== overflow hidden show tooltip ==================
const descriptionsRef = ref()
let removePopper: (() => void) | null = null
const handleMouseEnter = (
  event: MouseEvent,
  { content }: { content: string }
) => {
  const target = event.target as HTMLElement

  const bool = useHidden(target)
  if (!bool) return

  const { open, remove } = useTooltip({
    content,
    target,
    appendTo: descriptionsRef.value?.$el,
  })
  removePopper = remove
  open()
}

const handleMouseLeave = () => {
  removePopper?.()
}
</script>

<template>
  <ElDescriptions
    :class="[ns.cls]"
    ref="descriptionsRef"
    :column="span"
    :border="border"
  >
    <template v-for="item in columns" :key="item.field">
      <ElDescriptionsItem :span="item.span" :label="item.label">
        <template #label>
          <div
            @mouseenter="handleMouseEnter($event, { content: item.label })"
            @mouseleave="handleMouseLeave"
            :class="[ns.b('label')]"
          >
            <slot
              v-if="item.labelSlot"
              :name="item.labelSlot.name"
              :data="item"
            />
            <div v-else>
              {{ item.label }}
            </div>
          </div>
        </template>

        <div
          :class="[ns.b('value')]"
          @mouseenter="handleMouseEnter($event, { content: item.value })"
          @mouseleave="handleMouseLeave"
        >
          <template v-if="item.slot">
            <slot :name="item.slot.name" :data="item"></slot>
          </template>

          <template v-else>
            {{ internalFormatterValue(item.value) }}
          </template>
        </div>
      </ElDescriptionsItem>
    </template>
  </ElDescriptions>
</template>
