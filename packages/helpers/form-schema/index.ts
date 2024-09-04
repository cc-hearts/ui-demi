import { Ref, ComputedRef } from 'vue'

export interface Options {
  label: string
  value: any
}

export interface FormSchema {
  /**
   * 字段的标签，用于显示在表单
   * @default '-'
   */
  label?: string
  /**
   * 表单子项的组件类型，内置有 select、input、radio、input-number，默认值为 '-'，如果内置组件不包含预期类型，可使用 `extensionComponentMap` 方法覆盖/增加类型
   * @default '-'
   */
  type: string
  /**
   * 字段的名称，用于表单数据的存储和传递。
   * @default '-'
   */
  name: string
  /**
   * 是否为必填项，若为 true，则在表单提交时需要进行验证。
   * @default false
   */
  required?: boolean
  /**
   * 字段所占据的栅格数（一屏的栅格数为24），用于控制表单布局，默认值根据布局 `span` 自动计算。
   * @default '-'
   */
  span?: number
  /**
   * 字段的偏移栅格数，用于控制表单布局。
   * @default '-'
   */
  offset?: number
  /**
   * 字段的插槽信息，用于自定义表单字段的展示。
   * @default '-'
   */
  slot?: { name: string; [props: string]: any }
  /**
   * 用于定义自定义 label的展示
   */
  labelSlot?: { name: string; [props: string]: any }
  /**
   * 字段的验证规则，用于自定义验证逻辑。
   * @default '-'
   */
  rules?: Array<Record<string, unknown>>
  /**
   * 是否隐藏 Label 字段
   * @default: true
   */
  hiddenLabel?: boolean

  /**
   *  label 的宽度
   * @default: undefined
   */
  labelWidth?: string | number

  /**
   * 组件覆盖属性，此属性用于上游有提供属性，但是 FormSchema 组件的 props 没有覆盖，可以使用此属性进行属性的优先级覆盖
   * @default '-'
   */
  componentProperty?: {
    options?: Ref<Options[]> | ComputedRef<Options[]> // select options
    [props: string]: any
  }
}

export interface FormLayoutProps {
  /**
   * 设置布局的跨度。
   */
  span: number
  /**
   * 设置布局的间距。
   */
  gutter: number
}

export interface FormProps {
  /**
   * 表单布局，详见 FormLayoutProps
   * @default { span: 3, gutter: 12 }
   */
  layout?: FormLayoutProps
  /**
   * 表单 schema
   * @default []
   */
  schema?: FormSchema[]
  /**
   * 表单默认值
   * @default {}
   */
  defaultValue?: Record<string, any> | (() => any)
  /**
   * 表单 label 布局位置
   * @default 'top'
   */
  labelPosition?: 'top' | 'left'
}
