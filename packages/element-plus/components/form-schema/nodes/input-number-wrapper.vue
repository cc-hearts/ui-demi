<script lang="ts" setup>
import { ElInputNumber } from 'element-plus'
import { useAttrs } from 'vue'

defineOptions({ name: 'InputNumberWrapper' })

const modalValue = defineModel<number>()
const attrs = useAttrs()
</script>
<template>
  <ElInputNumber
    v-bind="attrs"
    v-model:model-value="modalValue"
    :controls="false"
  />
</template>
