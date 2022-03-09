<template>
  <div class="notice-barItem">
    <NoticeBar
      msg="Write HTML/CSS in this editor and replicate the given target image in the least code possible. What you write here, renders as it is"
      ref="notice"
      :dialyTimer="100"
      :speed="60"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NoticeBar, { noticeBar } from '../common/notice-bar/index.vue';
@Component({
  components: {
    NoticeBar,
  },
})
export default class NoticeBarTest extends Vue {
  mounted(): void {
    const noteBar = this.$refs.notice as any as noticeBar;
    if (noteBar instanceof Vue) {
      noteBar.init();
    }
  }
}
</script>
