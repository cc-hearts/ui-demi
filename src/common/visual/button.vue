<template>
  <div class="flex">
    <div class="container">
      <div class="visual-button">
        <div class="visual-button-prefix-icon iconfont icon-sushe"></div>
       学生宿舍
      </div>
    </div>
  </div>
</template>

<script>
// 可视化button
export default {
  name: 'visual-button',
};
</script>

<style lang="less" scoped>
.visual-button {
  display: inline-block;
  padding: 3px 18px;
  padding-left: 22px;
  border: 1px solid #3b99f1;
  border-radius: 10px;
  background-color: #0e153c;
  color: #589ee0;
  position: relative;
}
.visual-button-prefix-icon {
  position: absolute;
  left: -20px;
  top: -2px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  //渐变色
  background: linear-gradient(to right bottom, #283daa 10%, #3b99f1);
  text-align: center;
  &::before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px;
    color: aliceblue;
  }
  // 是否添加三角形
  // &::after {
  //   content: '';
  //   height: 20px;
  //   width: 20px;
  //   position: absolute;
  //   left: 8px;
  //   bottom: -15px;
  //   box-sizing: border-box;
  //   border-left: 10px solid transparent;
  //   border-right: 10px solid transparent;
  //   border-top: 10px solid #487ad3;
  //   // border-top: 10px solid #000;
  //   border-radius: 10px;
  //   z-index: -2;
  // }
}
.flex {
  display: flex;
  height: 100%;
}
.container {
  margin: auto;
}
</style>
