import {
  defineComponent,
  ref,
  computed,
  resolveComponent,
  openBlock,
  createBlock,
  withCtx,
  createVNode,
  createElementBlock,
  Fragment,
  renderList,
  renderSlot,
  normalizeProps,
  mergeProps,
  resolveDynamicComponent,
  unref,
  createCommentVNode,
} from 'vue'
import { mapComponentBySchemaComponentName } from './helper'
import { isFn } from '@cc-heart/utils'
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: 'FormSchema',
  },
  __name: 'form-schema',
  props: {
    name: { default: 'basic' },
    layout: {
      default: () => ({
        span: 3,
        gutter: 12,
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      }),
    },
    schema: { default: () => [] },
    defaultValue: { type: [Object, Function], default: () => ({}) },
    gutter: {},
  },
  setup(__props, { expose: __expose }) {
    const props = __props
    const formInstance = ref()
    const formValue = ref({
      ...(isFn(props.defaultValue) ? props.defaultValue() : props.defaultValue),
    })
    const calcDefaultSpan = computed(() => Math.floor(24 / props.layout.span))
    const getFieldsValue = () => unref(formValue)
    const setFieldValue = (key, val) => {
      Reflect.set(formValue.value, key, val)
    }
    const setFieldsValue = (target) => {
      Object.assign(formValue.value, target)
    }
    const validate = async () => {
      try {
        await formInstance.value.validate()
      } catch (e) {
        return [false, null]
      }
      return [true, unref(formValue)]
    }
    const resetFields = () => {
      formInstance.value.resetFields()
    }
    __expose({
      validate,
      resetFields,
      setFieldValue,
      getFieldsValue,
      setFieldsValue,
    })
    return (_ctx, _cache) => {
      const _component_a_form_item = resolveComponent('a-form-item')
      const _component_a_col = resolveComponent('a-col')
      const _component_a_row = resolveComponent('a-row')
      const _component_a_form = resolveComponent('a-form')
      return (
        openBlock(),
        createBlock(
          _component_a_form,
          {
            ref_key: 'formInstance',
            ref: formInstance,
            model: formValue.value,
            name: _ctx.name,
            'label-col': _ctx.layout.labelCol,
            'wrapper-col': _ctx.layout.wrapperCol,
          },
          {
            default: withCtx(() => [
              createVNode(
                _component_a_row,
                {
                  gutter: props.gutter,
                },
                {
                  default: withCtx(() => [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(_ctx.schema, (item) => {
                        return (
                          openBlock(),
                          createBlock(
                            _component_a_col,
                            {
                              key: item.name,
                              span: item.span || calcDefaultSpan.value,
                            },
                            {
                              default: withCtx(() => [
                                createVNode(
                                  _component_a_form_item,
                                  {
                                    label: item.label,
                                    name: item.name,
                                  },
                                  {
                                    default: withCtx(() => {
                                      var _a
                                      return [
                                        (
                                          (_a = item.slot) == null
                                            ? void 0
                                            : _a.name
                                        )
                                          ? renderSlot(
                                              _ctx.$slots,
                                              item.slot.name,
                                              normalizeProps(
                                                mergeProps(
                                                  { key: 0 },
                                                  {
                                                    __property__:
                                                      item.componentProperty ||
                                                      {},
                                                    value: formValue.value,
                                                    __slot__: item.slot,
                                                  }
                                                )
                                              )
                                            )
                                          : (openBlock(),
                                            createBlock(
                                              resolveDynamicComponent(
                                                unref(
                                                  mapComponentBySchemaComponentName
                                                )(item.type)
                                              ),
                                              mergeProps(
                                                {
                                                  key: 1,
                                                  value:
                                                    formValue.value[item.name],
                                                  'onUpdate:value': ($event) =>
                                                    (formValue.value[
                                                      item.name
                                                    ] = $event),
                                                },
                                                item.componentProperty
                                              ),
                                              null,
                                              16,
                                              ['value', 'onUpdate:value']
                                            )),
                                        createCommentVNode(` <template v-else-if="item.type === 'input'">
              <a-input v-model:value="formValue[item.name]" :placeholder="'请输入' + item.label" v-bind="item.extra" />
            </template>
            <template v-else-if="item.type === 'input-number'">
              <a-input-number class="w-full" v-model:value="formValue[item.name]" :placeholder="'请输入' + item.label"
                v-bind="item.extra" />
            </template>
            <template v-else-if="item.type === 'select'">
              <a-select v-model:value="formValue[item.name]" :placeholder="'请选择' + item.label" v-bind="item.extra"
                :options="unref(item.extra?.options || [])">
              </a-select>
            </template>
            <template v-else-if="item.type === 'radio'">
              <a-radio-group v-model:value="formValue[item.name]" v-bind="item.extra">
                <template v-for="l in item.options" :key="l.value">
                  <a-radio :value="l.value">{{ l.label }}</a-radio>
                </template>
              </a-radio-group>
            </template> `),
                                      ]
                                    }),
                                    _: 2,
                                    /* DYNAMIC */
                                  },
                                  1032,
                                  ['label', 'name']
                                ),
                              ]),
                              _: 2,
                              /* DYNAMIC */
                            },
                            1032,
                            ['span']
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                  ]),
                  _: 3,
                  /* FORWARDED */
                },
                8,
                ['gutter']
              ),
            ]),
            _: 3,
            /* FORWARDED */
          },
          8,
          ['model', 'name', 'label-col', 'wrapper-col']
        )
      )
    }
  },
})
export { _sfc_main as default }
