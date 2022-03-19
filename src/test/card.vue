<template>
  <div class="flex">
    <div>数字输入过长会造成文字益处的接下来的内容主要是ioc实践方面,</div>
    <div>
      <span>
        数字输入过长会造成文字益处的接下来的内容主要是ioc实践方面,
        如果是一般中小企前, 看完第一篇就足够了
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
};
</script>

<style lang="less">
.flex {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > div {
    white-space: nowrap;
    &:nth-child(2) {
      text-overflow: ellipsis;
    }
  }
}
</style>
