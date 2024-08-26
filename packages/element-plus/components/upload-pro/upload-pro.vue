<script setup lang="ts">
import { ElUpload, ElButton } from 'element-plus'
import { ref, computed, watch } from 'vue'
import type { UploadFile, UploadFiles, UploadRawFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { parseFileListToPreviewList } from './helper'
import type { UploadProps } from './helper'
import { noop } from '@cc-heart/utils'

const props = withDefaults(defineProps<UploadProps>(), {
  text: '上传文件',
  type: 'text',
  url: undefined,
  modelValue: '',
  multiple: false,
  limit: 1,
  acceptList: null,
  defaultFileList: () => [],
  icon: null,
  uploadHeaders: () => ({}),
  errorFn: noop,
  placeholder: '',
})

const emits = defineEmits<{
  (event: 'update:model-value', ...args: any): any
  (evt: 'success', args: any): any
  (evt: 'fail', args: any): any
  (evt: 'preview', url: string): void
}>()
const emitFileList = (args: string) => {
  emits('update:model-value', args)
}

const uploadRef = ref()
const loading = ref(false)
const closeLoading = () => {
  loading.value = false
}

/**
 * 上传前携带的参数
 * @param filePath
 */
const getData = (filePath: { name: string }) => {
  return { path: filePath.name }
}

const fileList = ref<UploadFiles>(
  parseFileListToPreviewList(props.defaultFileList || [])
)
watch(
  () => props.defaultFileList,
  () => {
    fileList.value = parseFileListToPreviewList(props.defaultFileList || [])
  },
  { immediate: true }
)

let count = -1

const handleFileListChanged = () => {
  emitFileList(
    fileList.value
      .map((target) => target.url?.replace(/^blob:/, ''))
      .filter((target) => Boolean(target))
      .join(',')
  )
  closeLoading()
}

const handleChangeFileList = (uploadFileList: UploadFiles) => {
  if (Array.isArray(uploadFileList)) {
    fileList.value = uploadFileList.map((target) => {
      const { name, response = {}, url: defaultUrl } = target
      const url = (response as Record<string, any>)?.data || defaultUrl
      return {
        name,
        url,
        uid: count--,
        status: 'success',
      } as UploadFile
    })
  }
  handleFileListChanged()
}

const handleError = () => {
  props.errorFn('上传失败，请您重新上传！')
  closeLoading()
}

const handleExceed = () => {
  props.errorFn(`最多只能上传${props.limit}个文件！`)
}

const handleSuccess = (
  response: any,
  uploadFile: UploadFile,
  uploadFileList: UploadFiles
) => {
  if (response.code !== 0) {
    const index = uploadFileList.findIndex(
      (target) => target.uid === uploadFile.uid
    )
    if (index > -1) {
      fileList.value.splice(index, 1)
    }
    emits('fail', response)
    return
  }

  handleChangeFileList(uploadFileList)
  emits('success', uploadFile)
}
const handleRemove = (_: any, uploadFileList: UploadFiles) => {
  handleChangeFileList(uploadFileList)
}

const handlePreviewImage = (uploadFile: UploadFile) => {
  const { url } = uploadFile
  if (url) {
    emits('preview', url)
  }
}

const beforeUpload = (rawFile: UploadRawFile) => {
  console.log(rawFile)
  if (Array.isArray(props.acceptList)) {
    const isExist = props.acceptList.includes(rawFile.type)

    if (!isExist) {
      props.errorFn(`文件类型 ${rawFile.name} 后缀名不符，请重新上传`)
      return Promise.reject()
    }
  }
}
const triggerUploadButtonRef = ref()
const triggerUpload = () => {
  triggerUploadButtonRef.value?.triggerClick()
}
const getFileList = () => {
  return fileList
}
const clearFileList = () => {
  fileList.value = []
}

const getterHeaders = computed(() => {
  return props.uploadHeaders?.() || {}
})

defineExpose({
  triggerUpload,
  getFileList,
  clearFileList,
})
</script>

<template>
  <ElUpload
    ref="uploadRef"
    v-model:file-list="fileList"
    :list-type="type"
    :action="url"
    :data="getData"
    :disabled="loading"
    :headers="getterHeaders"
    :multiple="multiple"
    :limit="limit"
    :on-remove="handleRemove"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :on-preview="handlePreviewImage"
    :before-upload="beforeUpload"
  >
    <template #trigger>
      <slot name="trigger">
        <template v-if="type === 'text'">
          <el-button ref="triggerUploadButtonRef" :icon="icon ?? undefined">
            {{ text }}
          </el-button>
        </template>

        <template v-else>
          <el-icon>
            <Plus />
          </el-icon>
        </template>
      </slot>
    </template>

    <template #tip>
      <slot name="tip">
        <div>
          {{ placeholder }}
        </div>
      </slot>
    </template>
  </ElUpload>
</template>
