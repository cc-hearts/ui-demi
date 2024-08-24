<script setup lang="ts">
import { useAttrs } from 'vue'
import type { Options } from '../helper'
import { ElRadioGroup, ElRadio } from 'element-plus'

defineOptions({ name: 'RadioWrapper' })
const modalValue = defineModel<string | number>()
const { options, ...attr } = useAttrs() as { options: Options }
</script>

<template>
  <ElRadioGroup v-bind="attr" v-model="modalValue">
    <ElRadio
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ElRadioGroup>
</template>
