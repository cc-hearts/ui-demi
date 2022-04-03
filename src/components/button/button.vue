<template>
  <div>
    <button class="slide">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@btn-primary: #7fc68d;
@white-color: white;
.slide {
  padding: 8px 12px;
  color: @btn-primary;
  border: none;
  background-color: transparent;
  border: 1px solid @btn-primary;
  transition: all 0.9s ease-in-out;
}
.slide:hover,
.slide:focus {
  color: @white-color;
  box-shadow: inset 9.5em 0 0 0 @btn-primary;
}
</style>
