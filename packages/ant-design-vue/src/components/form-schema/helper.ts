interface Options {
  label: string
  value: any
}

export interface FormSchema {
  label: string
  type: string
  name: string
  width?: number
  fixed?: 'left' | 'right'
  slot?: { name: string; [props: string]: any }
  extra?: { [props: string]: any }
  options?: Options[]
  span?: number
}

export interface FormProps {
  name?: string
  labelCol?: { span: number }
  schema?: FormSchema[]
  defaultValue?: Record<string, any>
  span?: number
  gutter?: number
}

export interface FormExpose {
  validate: () => Promise<[boolean, Record<string, unknown>]>
  getFieldsValue: <T extends Record<PropertyKey, any>>() => T
  setFieldValue: (key: PropertyKey, value: any) => void
  setFieldsValue: (target: Record<PropertyKey, any>) => void
  resetFields: () => void
}

export const VERSION = '0.0.1'
