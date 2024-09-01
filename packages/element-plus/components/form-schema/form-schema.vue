<script setup lang="ts">
import { computed, ref } from 'vue'
import { FormProps, mapComponentBySchemaComponentName } from './helper'
import { ElCol, ElForm, ElFormItem, ElRow } from 'element-plus'

defineOptions({ name: 'FormSchema' })

const props = withDefaults(defineProps<FormProps>(), {
  schema: () => [],
  layout: () => ({ span: 3, gutter: 12 }),
  defaultValue: () => ({}),
})

// =================== initial value ===================
const formValue = ref<Record<PropertyKey, any>>({
  ...props.defaultValue,
})
const formInstance = ref()

const formRules = computed(() => {
  return props.schema.reduce((acc, cur) => {
    if (cur.required) {
      Reflect.set(acc, cur.name, [
        { required: true, message: cur.label + '不能为空', trigger: 'blur' },
      ])
    }

    if (cur.rules && cur.rules!.length > 0) {
      const curRules = Reflect.get(acc, cur.name)
      Reflect.set(acc, cur.name, [...(curRules || []), ...cur.rules])
    }

    return acc
  }, {})
})
const calcDefaultSpan = computed(() => 24 / props.layout.span)

// =================== Expose ===================
const validate = async () => {
  try {
    await formInstance.value.validate()
  } catch (e) {
    return [false, null]
  }
  return [true, formValue.value]
}

const resetFields = () => {
  formInstance.value.resetFields()
}

const formFields = computed(() => {
  return props.schema.map((target) => target.name)
})

const setFieldValue = (field: string, value: unknown) => {
  if (formFields.value.includes(field)) formValue.value[field] = value
}

const setFieldsValue = (target: Record<string, any>) => {
  const fieldsValue = Object.keys(target).reduce((acc, key) => {
    if (formFields.value.includes(key)) {
      Reflect.set(acc, key, target[key])
    }
    return acc
  }, {})

  Object.assign(formInstance.value, fieldsValue)
}

const getFieldsValue = () => formValue
const getFieldValue = (field: PropertyKey) => formValue[field]
const getInstance = () => computed(() => formInstance.value)
const getFormValue = () => computed(() => formValue.value)
defineExpose({
  validate,
  getInstance,
  getFormValue,
  resetFields,
  setFieldValue,
  setFieldsValue,
  getFieldValue,
  getFieldsValue,
})
</script>

<template>
  <ElForm
    ref="formInstance"
    :model="formValue"
    :rules="formRules"
    :label-position="labelPosition"
  >
    <ElRow :gutter="layout.gutter">
      <ElCol
        v-for="item in schema"
        :key="item.name"
        :span="item.span || calcDefaultSpan"
        :offset="item.offset"
      >
        <ElFormItem
          :label="item.hiddenLabel ? '' : item.label"
          :label-width="item.hiddenLabel ? 0 : item.labelWidth"
          :prop="item.name"
          :require="item.required"
        >
          <template v-if="item.labelSlot?.name" #label>
            <slot :name="item.labelSlot.name" />
          </template>

          <slot
            v-if="item.slot?.name"
            :name="item.slot.name"
            v-bind="{
              __property__: item.componentProperty || {},
              value: formValue,
              __slot__: item.slot,
            }"
          />
          <component
            v-else
            :is="mapComponentBySchemaComponentName(item.type)"
            v-model="formValue[item.name]"
            v-bind="item.componentProperty"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>
