<template>
  <div class="flex">
    <visual-title :value="'资产管理'" :icon="'iconfont icon-odbc'" />
  </div>
</template>

<script>
import visualTitle from '@/common/visual/visual-title.vue';
export default {
  components: {
    'visual-title': visualTitle,
  },
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  height: 100%;
}
</style>
