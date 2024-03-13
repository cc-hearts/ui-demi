import { watch } from 'vue'
function createSetFieldsFactory(ins) {
  const taskList = []
  let isIns = false
  const flush = () => {
    const task = taskList.slice()
    task.forEach((fn2) => {
      fn2 instanceof Function && fn2()
    })
  }
  return async function (target) {
    watch(
      () => ins.value,
      (val) => {
        if (val && !isIns) {
          isIns = true
          flush()
        }
      },
      { immediate: true }
    )
    if (!ins.value) {
      taskList.push(() => {
        var _a
        return (_a = ins.value) == null ? void 0 : _a.setFieldsValue(target)
      })
    } else {
      ins.value.setFieldsValue(target)
    }
  }
}
export { createSetFieldsFactory }
