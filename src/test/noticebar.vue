<template>
  <div class="notice-barItem">
    <NoticeBar
      msg="Write HTML/CSS in this editor and replicate the given target image in the least code possible. What you write here, renders as it is"
      ref="notices"
      :dialyTimer="100"
      :speed="60"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NoticeBar from '../common/notice-bar/index.vue';
import type { noticeBar } from '../common/notice-bar/index.vue';
@Component({
  components: {
    NoticeBar,
  },
})
export default class NoticeBarTest extends Vue {
  $refs!: {
    notices: noticeBar;
  };
  mounted(): void {
    // eslint-disable-next-line no-debugger
    // debugger;
    const noteBar = this.$refs['notices'];
    if (noteBar instanceof Vue) {
      noteBar.init();
    }
  }
}
</script>
