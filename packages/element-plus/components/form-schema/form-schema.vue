<script setup lang="ts">
import { computed, readonly, ref, unref } from 'vue'
import {
  FormProps,
  initFormValue,
  mapComponentBySchemaComponentName,
} from './helper'

defineOptions({
  name: 'FormSchema',
})

const props = withDefaults(defineProps<FormProps>(), {
  name: 'basic',
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

const setFieldValue = (field: PropertyKey, value: unknown) => {
  formValue.value[field] = value
}

const setFieldsValue = (target: Record<PropertyKey, any>) => {
  Object.assign(formInstance.value, target)
}

const getFieldsValue = () => formValue

const getFieldValue = (field: PropertyKey) => formValue[field]

const getInstance = () => computed(() => formInstance.value)

defineExpose({
  validate,
  getInstance,
  resetFields,
  setFieldValue,
  setFieldsValue,
  getFieldValue,
  getFieldsValue,
})
</script>

<template>
  <el-form
    ref="formInstance"
    :model="formValue"
    :rules="formRules"
    :label-position="labelPosition"
  >
    <el-row :gutter="layout.gutter">
      <el-col
        v-for="item in schema"
        :key="item.name"
        :span="item.span || calcDefaultSpan"
        :offset="item.offset"
      >
        <el-form-item
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
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
