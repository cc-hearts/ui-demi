import { openBlock, createElementBlock, createElementVNode } from 'vue'
const _sfc_main = {
  name: 'DragSortIcon',
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc
  for (const [key, val] of props) {
    target[key] = val
  }
  return target
}
const _hoisted_1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
}
const _hoisted_2 = /* @__PURE__ */ createElementVNode(
  'path',
  {
    fill: 'currentColor',
    d: 'M6 20q-.825 0-1.413-.588T4 18q0-.825.588-1.413T6 16q.825 0 1.413.588T8 18q0 .825-.588 1.413T6 20Zm6 0q-.825 0-1.413-.588T10 18q0-.825.588-1.413T12 16q.825 0 1.413.588T14 18q0 .825-.588 1.413T12 20Zm6 0q-.825 0-1.413-.588T16 18q0-.825.588-1.413T18 16q.825 0 1.413.588T20 18q0 .825-.588 1.413T18 20ZM6 14q-.825 0-1.413-.588T4 12q0-.825.588-1.413T6 10q.825 0 1.413.588T8 12q0 .825-.588 1.413T6 14Zm6 0q-.825 0-1.413-.588T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12q0 .825-.588 1.413T12 14Zm6 0q-.825 0-1.413-.588T16 12q0-.825.588-1.413T18 10q.825 0 1.413.588T20 12q0 .825-.588 1.413T18 14ZM6 8q-.825 0-1.413-.588T4 6q0-.825.588-1.413T6 4q.825 0 1.413.588T8 6q0 .825-.588 1.413T6 8Zm6 0q-.825 0-1.413-.588T10 6q0-.825.588-1.413T12 4q.825 0 1.413.588T14 6q0 .825-.588 1.413T12 8Zm6 0q-.825 0-1.413-.588T16 6q0-.825.588-1.413T18 4q.825 0 1.413.588T20 6q0 .825-.588 1.413T18 8Z',
  },
  null,
  -1
  /* HOISTED */
)
const _hoisted_3 = [_hoisted_2]
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock('svg', _hoisted_1, _hoisted_3)
}
const dragSortIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ['render', _sfc_render],
])
export { dragSortIcon as default }
