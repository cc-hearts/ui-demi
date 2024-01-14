<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { FormProps } from './helper'

const props = withDefaults(defineProps<FormProps>(), {
  name: 'basic',
  labelCol: () => ({ span: 4 }),
  schema: () => [],
  defaultValue: () => ({}),
  span: 3,
  gutter: 12,
})

const formRef = ref()
const formState = ref<Record<PropertyKey, any>>({ ...props.defaultValue })

const getFieldsValue = () => {
  return formState.value
}

const setFieldValue = (key: PropertyKey, val: any) => {
  Reflect.set(formState.value, key, val)
}

const setFieldsValue = (target: Record<PropertyKey, any>) => {
  Object.assign(formState.value, target)
}

const validate = async () => {
  try {
    await formRef.value.validate()
  } catch (e) {
    return [false, null]
  }
  return [true, formState.value]
}

const resetFields = () => {
  formRef.value.resetFields()
}

const defaultSpan = computed(() => Math.floor(24 / props.span))
defineExpose({
  validate,
  resetFields,
  setFieldValue,
  getFieldsValue,
  setFieldsValue,
})
</script>
<template>
  <a-form
    ref="formRef"
    :label-col="props.labelCol"
    :model="formState"
    :name="props.name"
  >
    <a-row :gutter="props.gutter">
      <template v-for="item in props.schema">
        <a-col :span="item.span || defaultSpan">
          <a-form-item :label="item.label" :name="item.name">
            <template v-if="item.slot">
              <slot :name="item.slot.name" :formState="formState" />
            </template>
            <template v-else-if="item.type === 'input'">
              <a-input
                v-model:value="formState[item.name]"
                :placeholder="'请输入' + item.label"
                v-bind="item.extra"
              />
            </template>
            <template v-else-if="item.type === 'input-number'">
              <a-input-number
                class="w-full"
                v-model:value="formState[item.name]"
                :placeholder="'请输入' + item.label"
                v-bind="item.extra"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <a-select
                v-model:value="formState[item.name]"
                :placeholder="'请选择' + item.label"
                v-bind="item.extra"
                :options="unref(item.extra?.options || [])"
              >
              </a-select>
            </template>
            <template v-else-if="item.type === 'radio'">
              <a-radio-group
                v-model:value="formState[item.name]"
                v-bind="item.extra"
              >
                <template v-for="l in item.options" :key="l.value">
                  <a-radio :value="l.value">{{ l.label }}</a-radio>
                </template>
              </a-radio-group>
            </template>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
  </a-form>
</template>
