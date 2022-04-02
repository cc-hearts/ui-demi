<template>
  <div class="flex">
    <visual-button-border :value="'资产管理'" :icon="'iconfont icon-odbc'" />
  </div>
</template>

<script>
import VisualButtonBorder from '@/common/visual/visual-button-border.vue';
export default {
  components: {
    'visual-button-border': VisualButtonBorder,
  },
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  height: 100%;
}
</style>
