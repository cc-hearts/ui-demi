import { ref } from 'vue'

export function useDefaultList() {
  const defaultList = ref<string[]>([])

  const clear = () => {
    defaultList.value = []
  }

  const setDefaultList = (list: string[]) => {
    defaultList.value = list
  }
  return {
    defaultList,
    clear,
    setDefaultList,
  }
}
