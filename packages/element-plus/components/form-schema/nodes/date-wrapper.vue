<script setup lang="ts">
import { ElDatePicker } from 'element-plus'
import { useAttrs } from 'vue'

interface Props {
  type?:
    | 'date'
    | 'year'
    | 'month'
    | 'dates'
    | 'datetime'
    | 'week'
    | 'datetimerange'
    | 'daterange'
    | 'monthrange'
  valueFormat?: string
}
defineOptions({ name: 'DateWrapper' })

withDefaults(defineProps<Props>(), {
  type: 'date',
  valueFormat: 'YYYY-MM-DD',
})

const modalValue = defineModel<
  number | string | Date | [Date, Date] | [string, string]
>()
const attrs = useAttrs()
</script>

<template>
  <ElDatePicker
    v-bind="attrs"
    v-model="modalValue"
    :type="type"
    :value-format="valueFormat"
  />
</template>
