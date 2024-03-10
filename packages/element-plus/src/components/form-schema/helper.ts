export const VERSION = '0.0.1'

export interface Options {
  label: string
  value: any
}

export interface FormSchema {
  label: string
  type: string
  name: string
  required?: boolean
  span?: number
  slot?: { name: string; [props: string]: any }
  rules?: Array<Record<string, unknown>>
  componentProperty: {
    options?: Options[] // select options
    [props: string]: any
  }
}

export interface FormLayoutProps {
  span: number
  gutter: number
}

export interface FormProps {
  name?: string
  layout?: FormLayoutProps
  schema?: FormSchema[]
  defaultValue?: Record<string, any> | (() => any)
}

export function initFormValue(schema: FormSchema[]) {
  return schema.reduce((acc, cur) => {
    switch (cur.type) {
      case 'input': {
        Reflect.set(acc, cur.name, '')
        break
      }
    }
    return acc
  }, {})
}

const baseComponentMap = {
  input: 'el-input',
  'input-number': 'el-input-number',
  radio: 'el-radio',
  select: 'el-select',
  checkbox: 'el-checkbox',
}

export function mapComponentBySchemaComponentName(
  schemaComponentName: string
): string {
  if (
    Object.prototype.hasOwnProperty.call(baseComponentMap, schemaComponentName)
  ) {
    return Reflect.get(baseComponentMap, schemaComponentName)
  }

  return 'Fragment'
}
