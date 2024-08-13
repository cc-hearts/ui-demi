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
  <div :class="[ns.cls, isCollapse && ns.e('active')]">
    <div :class="[ns.e('title')]">
      <slot name="title">
        <div :class="[ns.em('title', 'default')]" @click="handleToggleCollapse">
          <div :class="[ns.e('arrow')]">
            <slot name="title-icon">
              <arrow-down-icon />
            </slot>
          </div>
          <span :class="[ns.em('title', 'text')]">{{ title }}</span>
        </div>
      </slot>
    </div>
    <el-collapse-transition>
      <div v-show="isCollapse">
        <div :class="ns.e('content')">
          <slot />
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
