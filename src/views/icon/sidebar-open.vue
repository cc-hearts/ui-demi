<template>
  <div class="flex">
    <div class="container">
      <div class="open-icon">
        <sider-bar-open @toggle="toggleOpen" :isOpen="isOpen" />
      </div>

      <h-button @click.native="toggleOpen">点击改变按钮</h-button>
    </div>
  </div>
</template>

<script>
import SiderBarOpen from '@/components/icon/sidebar-open.vue';
import Button from '@/components/button/button.vue';
export default {
  components: {
    SiderBarOpen,
    'h-button': Button,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleOpen(bool) {
      if (typeof bool === 'boolean') {
        this.isOpen = bool;
      } else this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  margin: auto;
}
.open-icon {
  margin: 12px;
  text-align: center;
}
</style>
