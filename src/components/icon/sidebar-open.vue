<template>
  <div @click="toggleOpen" :class="{ closed: isOpen, icon: true }">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
// sider-bar open and close
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log(this.isOpen);
  },
  methods: {
    toggleOpen() {
      this.$emit('toggle', !this.isOpen);
    },
  },
};
</script>

<style lang="less" scoped>
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  & > div {
    background-color: rgb(60, 57, 57);
    height: 2px;
    width: 100%;
    transition: all 0.3s ease-in-out;
  }
}
.closed {
  & > div {
    &:nth-child(1) {
      transform-origin: center;
      transform: rotate(45deg) translate3d(6.5px, 6.5px, 0);
    }
    &:nth-child(2) {
      transform: scale3d(0, 1, 1);
    }
    &:nth-child(3) {
      transform-origin: center;
      transform: rotate(-45deg) translate3d(6px, -6.5px, 0);
    }
  }
}
</style>
