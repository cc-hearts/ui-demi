import { shallowReactive } from 'vue'
import type { TableProps } from '../helper'

export function defineTableProProps<T extends Partial<TableProps>>(data: T) {
  return shallowReactive({ ...data })
}
