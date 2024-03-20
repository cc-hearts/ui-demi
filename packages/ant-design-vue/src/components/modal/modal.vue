<template>
  <Modal
    v-if="type === 'modal'"
    :open="modelValue"
    :title="title"
    :ok-text="okText"
    :cancel-text="cancelText"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot />
  </Modal>
  <Drawer
    :open="modelValue"
    :title="title"
    @close="handleCancel"
    v-else-if="type === 'drawer'"
  >
    <slot />
    <template #footer>
      <div class="modal__footer">
        <Button @click="handleCancel">{{ cancelText }}</Button>
        <Button type="primary">{{ okText }}</Button>
      </div>
    </template>
  </Drawer>
</template>
<script setup lang="ts">
import { noop } from '@cc-heart/utils'
import { ModalProps } from './helper'
import { Modal, Drawer, Button } from 'ant-design-vue'

defineOptions({
  name: 'Modal',
})

const props = withDefaults(defineProps<ModalProps>(), {
  okText: '确认',
  cancelText: '取消',
  modelValue: false,
  type: 'modal',
  onCancel: noop,
})
const emits = defineEmits(['update:modelValue', 'ok'])

const handleOk = () => {
  emits('ok')
}

const handleCancel = () => {
  props.onCancel?.()
  emits('update:modelValue', false)
}
</script>
