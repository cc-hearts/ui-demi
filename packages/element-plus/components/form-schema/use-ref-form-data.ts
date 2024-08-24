import { ref, watchEffect, watch, computed, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import type { Fn } from '@cc-heart/utils/helper'

export function useRefFormData(formRef: Ref<any>) {
  const instance = ref(null)
  let stopHandler: Fn | null = null

  watchEffect(() => {
    if (formRef.value) {
      const ins = formRef.value?.getInstance()

      if (stopHandler) {
        stopHandler()
      }

      stopHandler = watch(
        ins,
        () => {
          instance.value = ins.value
        },
        { immediate: true }
      )
    }
  })

  onUnmounted(() => {
    stopHandler?.()
    stopHandler = null
  })

  return computed(() => instance.value)
}
