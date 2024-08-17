<script setup lang="ts">
import { useAttrs } from 'vue'
import type { Options } from '../helper'

const modalValue = defineModel()

const { options, ...attr } = useAttrs() as { options: Options }
</script>

<template>
  <el-select v-model="modalValue" v-bind="attr">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
