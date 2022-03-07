<template>
  <div class="notice-barItem">
    <NoticeBar
      msg="提醒：您所负责的单位有应收账款逾期，请前往逾期管理进行填报"
      ref="notice"
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
