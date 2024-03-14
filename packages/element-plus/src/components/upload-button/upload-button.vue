<script setup lang="ts">
import { ref, computed } from 'vue'
import { UploadRequestOptions, ElMessage } from 'element-plus'
import ButtonUploadIcon from './upload-button-icon.vue'
import { useVModel } from '@vueuse/core'
import { _props } from './helper'

const props = defineProps(_props)

const uploadRef = ref()
const url = computed(() => props.url || '#')
const uploadData = ref({ filename: '' })
const fileList = useVModel(props, 'fileList')
const loading = ref(false)

const closeLoading = () => {
  loading.value = false
}

const handleUpload = (file: UploadRequestOptions) => {
  uploadData.value.filename = file.filename
}

const handleSuccess = (...rest: any[]) => {
  Promise.resolve(props?.onSuccess(...rest)).finally(closeLoading)
}

const handleExceed = () => {
  ElMessage({
    type: 'error',
    message: 'file is exceed',
  })
  closeLoading()
}
const handleError = () => {
  ElMessage({
    type: 'error',
    message: '上传失败，请您重新上传！',
  })
  closeLoading()
}

const beforeUpload = () => {
  loading.value = true
  // TODO:
  return true
}
</script>
<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    :action="url"
    :data="extraData"
    :headers="uploadHeaders"
    :disabled="loading"
    :limit="limit"
    :multiple="multiple"
    :on-change="handleUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
  >
    <template #trigger>
      <slot name="trigger">
        <el-button :icon="ButtonUploadIcon">{{ text }}</el-button>
      </slot>
    </template>

    <template #tip>
      <slot name="tip" />
    </template>
  </el-upload>
</template>
