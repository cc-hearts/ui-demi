<template>
  <div class="notice" ref="warp" :style="warpStyle">
    <template v-for="(item, index) in queue">
      <span
        :key="index"
        class="notice-bar"
        :ref="'noticeBar_' + index"
        :style="queue[index].noticeBarStyle"
        @transitionend="transitionend"
        v-show="queue[index].isScroll"
      >
        {{ msg }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * 循环滚动完成
 * //TODO:单项滚动 待完成
 */
import { Component, Prop, Vue } from 'vue-property-decorator';
export interface noticeBar extends Vue {
  init(): void; // 开始滚动
  clear(): void; // 结束滚动
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
interface warpStyleType {
  height: string;
}
@Component
export default class NoticeBar extends Vue implements noticeBar {
  @Prop() private msg!: string;
  @Prop() private speed!: number;
  @Prop() private dialyTimer!: number; // 开始滚动延迟时间 100

  spaceTimer = 0; //间距的时间
  dialy: number = 2 / 3; // 延迟2/3的时间下次滚动
  warpOffset = 0;
  noticeBarOffset = 0;
  $refs!: {
    warp: HTMLDivElement;
    [key: string]: HTMLDivElement | HTMLDivElement[];
  };
  warpStyle: warpStyleType = {
    height: '0px',
  };
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
    this.queue[
      num
    ].noticeBarStyle.transform = `translateX(-${this.noticeBarOffset}px)`;
    this.queue[num].noticeBarStyle['transition-duration'] =
      (this.warpOffset + this.noticeBarOffset) / this.speed + 's';
  }
  /**
   * 滚动结束监听事件 将值立即移动到右侧
   */
  transitionend(event: TransitionEvent): void {
    const num: number = event.target === this.queue[0].node ? 0 : 1;
    this.queue[num].isScroll = false;
    this.queue[
      num
    ].noticeBarStyle.transform = `translateX(${this.warpOffset}px)`;
    this.queue[num].noticeBarStyle['transition-duration'] = '0s';
  }

  /**
   * 延迟dialyTimer 秒后 开始轮播滚动
   */
  start(): void {
    new Promise<number>((resolve) => {
      // 这里宏任务结束之后才会执行微任务 resolve(0)
      this.queue[0].timer = setTimeout(() => {
        resolve(0);
      }, this.dialyTimer);
    })
      .then((res) => {
        return new Promise<number>((resolve) => {
          const number: number = this.queue[res].isScroll ? 0 : 1;
          // isScroll真值滚动一次 另一个以 dialy的时间延迟滚动
          // 初始滚动
          this.queue[
            number
          ].noticeBarStyle.transform = `translateX(-${this.noticeBarOffset}px)`;
          this.queue[number].noticeBarStyle['transition-duration'] =
            this.noticeBarOffset / this.speed + 's';
          const thisTimer = (this.noticeBarOffset / this.speed) * this.dialy; // thisTimer 延迟滚动dialy了的时间
          this.queue[1].timer = setTimeout(() => {
            resolve(1);
          }, thisTimer * 1000);
        });
      })
      .then((res) => {
        // 第二个开始滚动
        this.timingFunction(res);
      });
  }
  /**
   * 每次滚动到dialy时间的位置的时候 唤起另外一个滚动开始
   */
  timingFunction(num: number): void {
    this.queue[num].isScroll = true;
    new Promise<number>((resolve) => {
      this.queue[num].timer = setTimeout(() => {
        // 延迟加载
        this.queue[
          num
        ].noticeBarStyle.transform = `translateX(-${this.noticeBarOffset}px)`;
        this.queue[num].noticeBarStyle['transition-duration'] =
          (this.noticeBarOffset + this.warpOffset) / this.speed + 's';
        resolve(num === 0 ? 1 : 0);
      }, 100);
    }).then((res) => {
      this.queue[res].timer = setTimeout(() => {
        this.timingFunction(res);
      }, this.spaceTimer * 1000);
    });
  }
  init(): void {
    new Promise<void>((resolve) => {
      this.queue.forEach((val, index) => {
        const node = this.$refs[`noticeBar_${index}`];
        if (node instanceof Array) {
          this.queue[index].node = node[node.length - 1];
          if (index === 0) {
            this.noticeBarOffset = node[node.length - 1].offsetWidth;
            this.warpStyle.height =
              node[node.length - 1].offsetHeight + 4 + 'px';
          }
        } else {
          this.queue[index].node = node;
          if (index === 0) {
            this.noticeBarOffset = node.offsetWidth;
            this.warpStyle.height = node.offsetHeight + 4 + 'px';
          }
        }
      });

      this.warpOffset = this.$refs.warp.offsetWidth;
      this.spaceTimer =
        ((this.noticeBarOffset + this.warpOffset) / this.speed) * this.dialy;
      this.queue[1].noticeBarStyle.transform = `translateX(${this.warpOffset}px)`;
      resolve();
    }).then(() => {
      this.start();
    });
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
      // 清除副作用
      const timer = this.queue[i].timer;
      if (timer) {
        clearTimeout(timer);
      }
    }
  }
}
</script>

<style lang="less">
@background-color: rgb(244, 211, 183);
.notice {
  display: flex;
  position: relative;
  align-items: center;
  overflow: hidden;
  background-color: @background-color;
}
.notice-bar {
  font-size: 12px;
  transition-timing-function: linear;
  white-space: nowrap;
  position: absolute;
}
</style>
