# Tooltip

## hook 的方式调用 Tooltip

::: warning
WIP ....
:::

:::demo

```vue
<script lang="ts" setup>
import { useTooltip } from '/components/tooltip/use-tooltip.ts'

const handleMouseenter = (evt: MouseEvent) => {
  useTooltip({
    content: 'hello',
    target: evt.target,
    appendTo: document.body,
  })
}
</script>
<template>
  <button @mouseenter="handleMouseenter">hover me</button>
</template>
```

:::
