<template>
  <div class="container">
    <div class="visual-button">
      <span class="button-prefix-icon" :class="icon"></span>
      {{ value }}
    </div>
  </div>
</template>

<script>
// background-images 实现
export default {
  name: 'visual-button-border-image',
  props: {
    icon: String,
    value: String,
  },
};
</script>

<style lang="less" scoped>
//mask处理
.container {
  margin: auto;
}
.visual-button {
  box-sizing: border-box;
  display: inline-block;
  padding: 3px 30px 3px 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #3b99f1, transparent),
    linear-gradient(90deg, #3b99f1, transparent),
    linear-gradient(90deg, #0e153c, transparent);
  background-size: 100% 2px, 100% 2px, 100% calc(100% - 4px);
  background-position: 0 0, 0 calc(100% - 2px), 0 2px;
  background-repeat: no-repeat;
  color: #589ee0;
  position: relative;
  &::after {
    position: absolute;
    vertical-align: middle;
  }
}
</style>
