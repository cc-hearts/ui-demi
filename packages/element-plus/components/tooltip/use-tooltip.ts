import { ElTooltip } from 'element-plus'
import { createVNode, render } from 'vue'

interface TooltipOptions {
  /**
   * tooltip 展示的内容
   * @default '-'
   */
  content: string
  /**
   * 触发的节点
   */
  target: HTMLElement
  /**
   * 挂载的节点
   */
  appendTo?: HTMLElement
}

export function useTooltip(options: TooltipOptions) {
  const { content, target, appendTo } = options
  const vm = createVNode(ElTooltip, {
    content,
    virtualTriggering: true,
    virtualRef: target,
    appendTo: appendTo,
    placement: 'top',
    transition: 'none',
    offset: 0,
    hideAfter: 0,
    onHide: () => {
      removePopper?.()
    },
  })
  const el = document.createElement('div')
  let removePopper: (() => void) | null = () => {
    render(null, el)
    removePopper = null
  }

  render(vm, el)

  const open = () => {
    vm.component?.exposed?.onOpen()
  }

  const remove = () => {
    removePopper?.()
  }
  return {
    open,
    remove,
  }
}
