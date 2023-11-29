<template>
  <div :class="['collapse-card', isCollapse ? 'collapse-card-active' : '']">
    <div class="collapse-card__title">
      <slot name="title">
        <div
          class="collapse-card__title--default"
          @click="handleToggleCollapse"
        >
          <div class="collapse-card__arrow">
            <arrow-down-icon />
          </div>
          <span class="collapse-card__title--text">{{ title }}</span>
        </div>
      </slot>
    </div>
    <el-collapse-transition>
      <div v-show="isCollapse">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ElCollapseTransition } from 'element-plus'
import ArrowDownIcon from './arrow-down-icon.vue'

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

const isCollapse = ref(props.visible)

const handleToggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss">
.collapse-card {
  --collapse-card-bgc: #fff;
  --collapse-card-border: #ebeef5;
  --collapse-arrow-icon-color: #4e80f7;

  border-radius: 4px;
  background-color: var(--collapse-card-bgc);
  border: 1px solid var(--collapse-card-border);

  &__title {
    padding: 8px 12px;

    &--default {
      display: flex;
      cursor: pointer;
    }

    &--text {
      color: var(--collapse-arrow-icon-color);
    }
  }

  &__contain {
    overflow: hidden;
    height: 0;

    & > div {
      padding: 12px;
    }
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
