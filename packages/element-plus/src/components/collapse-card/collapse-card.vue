<template>
  <div :class="['collapse-card', isCollapse ? 'collapse-card-active' : '']">
    <div class="collapse-card__title">
      <slot name="title">
        <div
          class="collapse-card__title--default"
          @click="handleToggleCollapse"
        >
          <div class="collapse-card__arrow">
            <slot name="title-icon">
              <arrow-down-icon />
            </slot>
          </div>
          <span class="collapse-card__title--text">{{ title }}</span>
        </div>
      </slot>
    </div>
    <el-collapse-transition>
      <div v-show="isCollapse">
        <div class="collapse-card__content">
          <slot />
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ElCollapseTransition } from 'element-plus'
import ArrowDownIcon from './arrow-down-icon.vue'
import 'element-plus/theme-chalk/base.css'
import { useVModel } from '@vueuse/core'

defineOptions({
  name: 'CollapseCard',
})

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

const isCollapse = useVModel(props, 'visible')

const handleToggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss">
.collapse-card {
  --collapse-card-bg-color: var(--el-bg-color-overlay, #fff);
  --collapse-card-border: var(--el-border-color-light, #ebeef5);
  --collapse-arrow-icon-color: var(--el-primary-color, #409eff);
  --collapse-card-padding: 12px;

  border-radius: 4px;
  background-color: var(--collapse-card-bg-color);
  border: 1px solid var(--collapse-card-border);

  &__title {
    padding: 8px 12px;

    &--default {
      display: flex;
      cursor: pointer;
      align-items: center;
    }

    &--text {
      color: var(--collapse-arrow-icon-color);
    }
  }

  &__content {
    padding: var(--collapse-card-padding);
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: rgba(59, 130, 255, 0.15);
    border-radius: 2px;
    margin-right: 10px;

    & > svg {
      color: var(--collapse-arrow-icon-color);
      transition: transform 0.3s;
    }
  }

  &-active {
    .collapse-card__arrow > svg {
      transform: rotate(180deg);
    }

    .collapse-card__title {
      border-bottom: 1px solid var(--collapse-card-border);
    }
  }
}
</style>
