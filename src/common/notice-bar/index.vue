<template>
  <div class="notice" ref="warp">
    <span
      class="notice-bar"
      ref="noticeBar"
      :style="queue[0].noticeBarStyle"
      @transitionend="transitionend"
    >
      {{ msg }}
    </span>
    <span
      class="notice-bar"
      ref="alternate"
      :style="queue[1].noticeBarStyle"
      @transitionend="transitionend"
      >{{ msg }}</span
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
export interface noticeBar {
  init(): void;
  clear(): void;
}
interface requestQueue {
  isScroll: boolean;
  node: Element | null;
  timer: number | null;
  noticeBarStyle: {
    ['transition-duration']: string;
    transform: string;
    ['transition-delay']: string;
  };
}
@Component
export default class NoticeBar extends Vue implements noticeBar {
  // TODO: 绝对定位占位的方式解决
  @Prop() private msg!: string;
  speed = 60;
  spaceTimer = 0; //间距的时间
  dialy = 2 / 3; // 延迟2/3的时间下次滚动
  dialyTimer = 100; // 开始滚动延迟时间
  queue: [requestQueue, requestQueue] = [
    {
      isScroll: true,
      node: null,
      timer: null,
      noticeBarStyle: {
        'transition-duration': '0s',
        transform: 'translateX(0px)',
        'transition-delay': '0ms',
      },
    },
    {
      isScroll: false,
      node: null,
      timer: null,
      noticeBarStyle: {
        'transition-duration': '0s',
        transform: 'translateX(0px)',
        'transition-delay': '0ms',
      },
    },
  ];

  /**
   * 将滚动条恢复左侧边距位置
   */
  scrollInit(num: number): void {
    this.queue[num].isScroll = true;
    this.queue[num].noticeBarStyle.transform = `translateX(-${
      (this.$refs.noticeBar as HTMLDivElement).offsetWidth
    }px)`;
    this.queue[num].noticeBarStyle['transition-duration'] =
      ((this.$refs.warp as HTMLDivElement).offsetWidth +
        (this.$refs.noticeBar as HTMLDivElement).offsetWidth) /
        this.speed +
      's';
  }
  /**
   * 滚动结束监听事件 将值立即移动到右侧
   */
  transitionend = (event: TransitionEvent): void => {
    const num: number = event.target === this.queue[0].node ? 0 : 1;
    this.queue[num].isScroll = false;
    this.queue[num].noticeBarStyle.transform = `translateX(${
      (this.$refs.warp as HTMLDivElement).offsetWidth
    }px)`;
    this.queue[num].noticeBarStyle['transition-duration'] = '0s';
    setTimeout(() => {
      this.timingFunction(num === 0 ? 1 : 0);
    }, this.spaceTimer * 1000);
  };

  /**
   * 延迟dialyTimer 秒后 开始轮播滚动
   */
  start(): void {
    new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, this.dialyTimer);
    })
      .then((res) => {
        return new Promise<number>((resolve) => {
          const number: number = this.queue[res].isScroll ? 0 : 1;
          this.spaceTimer =
            (((this.$refs.noticeBar as HTMLDivElement).offsetWidth +
              (this.$refs.warp as HTMLDivElement).offsetWidth) /
              this.speed) *
            this.dialy;
          // isScroll真值滚动一次 另一个以 2/3的时间延迟滚动
          this.queue[number].noticeBarStyle.transform = `translateX(-${
            (this.$refs.noticeBar as HTMLDivElement).offsetWidth
          }px)`;
          this.queue[number].noticeBarStyle['transition-duration'] =
            (this.$refs.noticeBar as HTMLDivElement).offsetWidth / this.speed +
            's';
          const thisTimer =
            ((this.$refs.noticeBar as HTMLDivElement).offsetWidth /
              this.speed) *
            this.dialy;
          setTimeout(() => {
            resolve(1);
          }, thisTimer * 1000);
        });
      })
      .then((res) => {
        this.timingFunction(res);
      });
  }
  timingFunction(num: number): void {
    this.queue[num].isScroll = true;
    new Promise<number>((resolve) => {
      setTimeout(() => {
        // 延迟加载
        this.queue[num].noticeBarStyle.transform = `translateX(-${
          (this.$refs.warp as HTMLDivElement).offsetWidth
        }px)`;
        this.queue[num].noticeBarStyle['transition-duration'] =
          ((this.$refs.noticeBar as HTMLDivElement).offsetWidth +
            (this.$refs.warp as HTMLDivElement).offsetWidth) /
            this.speed +
          's';
        resolve(num === 0 ? 1 : 0);
      }, 100);
    }).then((res) => {
      setTimeout(() => {
        this.timingFunction(res);
      }, this.spaceTimer * 1000);
    });
  }
  init(): void {
    this.queue[0].node = this.$refs.noticeBar as HTMLDivElement;
    this.queue[1].node = this.$refs.alternate as HTMLDivElement;
    this.queue[1].noticeBarStyle.transform = `translateX(${
      (this.$refs.warp as HTMLDivElement).offsetWidth
    }px)`;
    this.start();
  }
  clear(): void {
    for (let i = 0; i < this.queue.length; i++) {
      if (i == 1) {
        this.queue[i].isScroll = false;
      } else {
        this.queue[i].isScroll = true;
      }
      this.queue[i].noticeBarStyle.transform = 'translate(0px)';
      this.queue[i].noticeBarStyle['transition-duration'] = '0s';
      this.queue[i].node = null;
    }
  }
}
</script>

<style lang="less">
@font-color: #e11e1e;

.notice {
  display: flex;
  position: relative;
  border: 1px solid @font-color;
  color: @font-color;
}
.notice-bar {
  font-size: 12px;
  transition-timing-function: linear;
  white-space: nowrap;
  position: absolute;
}
</style>
