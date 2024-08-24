import type {
  FormSchema,
  FormProps,
  FormLayoutProps,
  Options,
} from '@packages/helpers/form-schema/index.ts'
import { ElCheckbox, ElInput } from 'element-plus'
import SelectWrapper from './nodes/select-wrapper.vue'
import RadioWrapper from './nodes/radio-wrapper.vue'
import InputNumberWrapper from './nodes/input-number-wrapper.vue'
import DateWrapper from './nodes/date-wrapper.vue'

export type { FormSchema, FormProps, FormLayoutProps, Options }

const baseComponentMap = {
  input: ElInput,
  'input-number': InputNumberWrapper,
  radio: RadioWrapper,
  select: SelectWrapper,
  checkbox: ElCheckbox,
  date: DateWrapper,
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
