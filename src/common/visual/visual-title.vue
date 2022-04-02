<template>
  <div class="container">
    <div class="visual-button">
      <span class="button-prefix-icon" :class="icon"></span>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'visual-title',
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
  display: inline-block;
  padding: 3px 30px 3px 12px;
  border: 1px solid #3b99f1;
  border-radius: 10px;
  background-color: #0e153c;
  color: #589ee0;
  position: relative;
  mask: linear-gradient(to right, #000 50%, transparent);
  &::after {
    position: absolute;
    vertical-align: middle;
  }
}
</style>
