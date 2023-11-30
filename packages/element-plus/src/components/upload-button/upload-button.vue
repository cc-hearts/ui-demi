<script setup lang="ts">
import { UploadRequestOptions, ElMessage } from 'element-plus'
import ButtonUploadIcon from './upload-button-icon.vue'
const props = defineProps({
  text: {
    type: String,
    default: '上传',
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 1,
  },
  onSuccess: {
    type: Function,
    required: true,
    default: () => ({}),
  },
  onUploadHeaders: {
    type: Function,
    default: () => ({}),
  },
})

const uploadRef = ref()
const uploadHeaders = ref({})
const url = props.url || '<your_url>'
const uploadData = ref({ filename: '' })
const fileList = ref([])
const loading = ref(false)

const closeLoading = () => {
  loading.value = false
}

const handleUpload = (file: UploadRequestOptions) => {
  uploadData.value.filename = file.filename
}

const submitUpload = () => {
  loading.value = true
  uploadHeaders.value = props.onUploadHeaders() || {}
  unref(uploadRef).submit()
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
}
</script>
<template>
  <el-upload
    ref="uploadRef"
    :action="url"
    :headers="uploadHeaders"
    :disabled="loading"
    v-model:file-list="fileList"
    :limit="limit"
    :multiple="multiple"
    :auto-upload="false"
    :on-change="handleUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
  >
    <template #trigger>
      <slot name="trigger">
        <el-button :icon="ButtonUploadIcon" @click="submitUpload">{{
          text
        }}</el-button>
      </slot>
    </template>

    <template #tip>
      <slot name="tip" />
    </template>
  </el-upload>
</template>
