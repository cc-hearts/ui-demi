<script setup lang="ts">
import { ElCollapseTransition } from 'element-plus'
import ArrowDownIcon from './arrow-down-icon.vue'
import { ns } from './helper'
import type { Props } from './helper'

defineOptions({ name: 'CollapseCard' })

withDefaults(defineProps<Props>(), {
  title: '',
  collapse: false,
})

const isCollapse = defineModel('collapse')
const handleToggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div :class="[ns.cls, isCollapse && ns.b('active')]">
    <div :class="[ns.b('title')]">
      <slot name="title">
        <div :class="[ns.be('title', 'default')]" @click="handleToggleCollapse">
          <div :class="[ns.b('arrow')]">
            <slot name="title-icon">
              <ArrowDownIcon />
            </slot>
          </div>
          <span :class="[ns.be('title', 'text')]">{{ title }}</span>
        </div>
      </slot>
    </div>
    <ElCollapseTransition>
      <div v-show="isCollapse">
        <div :class="ns.b('content')">
          <slot />
        </div>
      </div>
    </ElCollapseTransition>
  </div>
</template>
