<template>
  <div ref="monacoRef"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watchEffect, watch } from 'vue'
import { MonacoEditorProps } from './helper'
import { editor } from 'monaco-editor'

const props = defineProps(MonacoEditorProps)

const monacoRef = ref()
let monacoEditorInstance: editor.IStandaloneCodeEditor | null = null

const updateMonacoValue = (value: string) => {
  monacoEditorInstance?.setValue(value)
}
watchEffect(() => {
  updateMonacoValue(props.modelValue)
})

const getValue = () => {
  return monacoEditorInstance?.getValue()
}

watch(
  () => props.language,
  () => {
    if (monacoEditorInstance) {
      editor.setModelLanguage(monacoEditorInstance.getModel()!, props.language)
    }
  }
)

onMounted(() => {
  monacoEditorInstance = editor.create(monacoRef.value, {
    language: props.language,
    value: props.modelValue,
    folding: true,
    theme: props.theme,
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
    },
    minimap: {
      enabled: props.minimapEnabled,
    },
    automaticLayout: true,
    renderValidationDecorations: 'on',
  })
})

defineExpose({
  updateMonacoValue,
  getValue,
})
</script>
