import {
  openBlock,
  createElementBlock,
  createElementVNode,
  defineComponent,
  computed,
  unref,
  resolveComponent,
  createBlock,
  withCtx,
  createVNode,
  createTextVNode,
  toDisplayString,
  renderSlot,
} from 'vue'
import { noop } from '@cc-heart/utils'
import draggable from 'vuedraggable'
const _sfc_main$1 = {
  name: 'DragSortIcon',
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc
  for (const [key, val] of props) {
    target[key] = val
  }
  return target
}
const _hoisted_1$1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
}
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode(
  'path',
  {
    fill: 'currentColor',
    d: 'M6 20q-.825 0-1.413-.588T4 18q0-.825.588-1.413T6 16q.825 0 1.413.588T8 18q0 .825-.588 1.413T6 20Zm6 0q-.825 0-1.413-.588T10 18q0-.825.588-1.413T12 16q.825 0 1.413.588T14 18q0 .825-.588 1.413T12 20Zm6 0q-.825 0-1.413-.588T16 18q0-.825.588-1.413T18 16q.825 0 1.413.588T20 18q0 .825-.588 1.413T18 20ZM6 14q-.825 0-1.413-.588T4 12q0-.825.588-1.413T6 10q.825 0 1.413.588T8 12q0 .825-.588 1.413T6 14Zm6 0q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12q0 .825-.588 1.413T12 14Zm6 0q-.825 0-1.413-.588T16 12q0-.825.588-1.413T18 10q.825 0 1.413.588T20 12q0 .825-.588 1.413T18 14ZM6 8q-.825 0-1.413-.588T4 6q0-.825.588-1.413T6 4q.825 0 1.413.588T8 6q0 .825-.588 1.413T6 8Zm6 0q-.825 0-1.413-.588T10 6q0-.825.588-1.413T12 4q.825 0 1.413.588T14 6q0 .825-.588 1.413T12 8Zm6 0q-.825 0-1.413-.588T16 6q0-.825.588-1.413T18 4q.825 0 1.413.588T20 6q0 .825-.588 1.413T18 8Z',
  },
  null,
  -1
  /* HOISTED */
)
const _hoisted_3 = [_hoisted_2$1]
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock('svg', _hoisted_1$1, _hoisted_3)
}
const DragSort = /* @__PURE__ */ _export_sfc(_sfc_main$1, [
  ['render', _sfc_render],
])
const _hoisted_1 = { class: 'flex items-center' }
const _hoisted_2 = { class: 'drag-handle m-r-1' }
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'table-columns-action',
  props: {
    sortedColumns: {
      type: [Array, Object],
      default: () => [],
    },
    columnsField: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: 'key',
    },
    onUpdateSortedColumns: {
      type: Function,
      default: noop,
    },
    onUpdateColumnsField: {
      type: Function,
      default: noop,
    },
    onReset: {
      type: Function,
      default: noop,
    },
  },
  setup(__props) {
    const props = __props
    let tempColumnSettings = []
    const handleChangeColumns = (val) => {
      tempColumnSettings = val
    }
    const emitChangeColumn = () => {
      props.onUpdateSortedColumns(tempColumnSettings)
      tempColumnSettings = []
    }
    const handleChangeCheckbox = (columnIds) => {
      props.onUpdateColumnsField(columnIds)
    }
    const isAllSelected = computed(() => {
      return (
        unref(props.columnsField).length === unref(props.sortedColumns).length
      )
    })
    const toggleShowColumns = () => {
      if (isAllSelected.value) {
        props.onUpdateColumnsField([])
      } else {
        props.onUpdateColumnsField(
          unref(props.sortedColumns).map((item) =>
            Reflect.get(item, unref(props.rowKey))
          )
        )
      }
    }
    const handleReset = () => {
      props.onReset()
    }
    return (_ctx, _cache) => {
      const _component_a_checkbox = resolveComponent('a-checkbox')
      const _component_a_button = resolveComponent('a-button')
      const _component_a_divider = resolveComponent('a-divider')
      const _component_a_checkbox_group = resolveComponent('a-checkbox-group')
      const _component_a_popover = resolveComponent('a-popover')
      return (
        openBlock(),
        createBlock(
          _component_a_popover,
          {
            trigger: 'click',
            placement: 'bottomRight',
          },
          {
            content: withCtx(() => [
              createElementVNode('div', null, [
                createVNode(
                  _component_a_checkbox,
                  {
                    checked: isAllSelected.value,
                    'onUpdate:checked': toggleShowColumns,
                  },
                  {
                    default: withCtx(() => [createTextVNode('列展示')]),
                    _: 1,
                    /* STABLE */
                  },
                  8,
                  ['checked']
                ),
                createVNode(
                  _component_a_button,
                  {
                    type: 'link',
                    onClick: handleReset,
                  },
                  {
                    default: withCtx(() => [createTextVNode(' 重置 ')]),
                    _: 1,
                    /* STABLE */
                  }
                ),
              ]),
              createVNode(_component_a_divider, { class: 'm-y-2' }),
              createVNode(
                _component_a_checkbox_group,
                {
                  value: __props.columnsField,
                  'onUpdate:value': handleChangeCheckbox,
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      unref(draggable),
                      {
                        'model-value': unref(__props.sortedColumns),
                        'onUpdate:modelValue': handleChangeColumns,
                        onEnd: emitChangeColumn,
                        group: 'description',
                        animation: '300',
                        class: 'flex flex-col',
                        handle: '.drag-handle',
                        'item-key': 'dataIndex',
                      },
                      {
                        item: withCtx(({ element }) => [
                          createElementVNode('div', _hoisted_1, [
                            createElementVNode('div', _hoisted_2, [
                              createVNode(DragSort),
                            ]),
                            (openBlock(),
                            createBlock(
                              _component_a_checkbox,
                              {
                                key: element.dataIndex,
                                value: element.dataIndex,
                                label: element.title,
                              },
                              {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString(element.title),
                                    1
                                    /* TEXT */
                                  ),
                                ]),
                                _: 2,
                                /* DYNAMIC */
                              },
                              1032,
                              ['value', 'label']
                            )),
                          ]),
                        ]),
                        _: 1,
                        /* STABLE */
                      },
                      8,
                      ['model-value']
                    ),
                  ]),
                  _: 1,
                  /* STABLE */
                },
                8,
                ['value']
              ),
            ]),
            default: withCtx(() => [renderSlot(_ctx.$slots, 'default')]),
            _: 3,
            /* FORWARDED */
          }
        )
      )
    }
  },
})
export { _sfc_main as default }
