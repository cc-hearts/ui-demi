<script setup lang="ts">
import TableAction from '@/components/table-action/table-action.vue'
import CollapseCard from '@/components/collapse-card/collapse-card.vue'
</script>

<template>
  <CollapseCard>
    <TableAction />
  </CollapseCard>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html,
#app {
  width: 100%;
  height: 100%;
}
</style>
