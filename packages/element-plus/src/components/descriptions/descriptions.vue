<script setup lang="ts">
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { _props } from './helper'

defineOptions({ name: 'Descriptions' })
defineProps(_props)
</script>

<template>
  <el-descriptions :column="count" :border="border">
    <template v-for="item in descriptionItems" :key="item.field">
      <el-descriptions-item :span="item.span" :label="item.label">
        <template v-if="item.labelSlot" #label>
          <slot :name="item.labelSlot.name" :data="item" />
        </template>
        <template v-if="item.slot">
          <slot :name="item.slot.name" :data="item" />
        </template>
        <template v-else>
          {{ item.value }}
        </template>
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>
