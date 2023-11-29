<script setup lang="ts">
const props = defineProps({
  action: {
    type: Array,
    default: ['__edit', '__delete'],
  },
  editText: {
    type: String,
    default: '修改',
  },
  deleteText: {
    type: String,
    default: '删除',
  },
  plain: {
    type: Boolean,
    default: true,
  },
})

const showEditButton = computed(() => props.action.includes('__edit'))
const showDeleteButton = computed(() => props.action.includes('__delete'))
</script>
<template>
  <div>
    <el-button :plain="plain" type="warning" v-if="showEditButton">{{
      editText
    }}</el-button>
    <el-button :plain="plain" type="danger" v-if="showDeleteButton">{{
      deleteText
    }}</el-button>
    <slot name="suffix" />
  </div>
</template>
