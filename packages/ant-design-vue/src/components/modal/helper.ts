import { reactive } from 'vue'

export interface ModalProps {
  title: string
  modelValue: boolean
  type: 'modal' | 'drawer'
  okText?: string
  cancelText?: string
  onCancel?: () => void
  extraAttributes?: Record<string, unknown>
}

export function defineModal(data: Partial<ModalProps> = {}) {
  return reactive({
    modelValue: false,
    title: '',
    okText: '确定',
    cancelText: '取消',
    ...data,
  })
}
