<template>
  <div>
    <input
      type="text"
      :value="value"
      @input="changes(value, $event)"
      @focus="focus(value, $event)"
      @blur="blur(value, $event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  public value = '';
  //金额千位分隔符并强制保留两位小数
  dealMoney(value: string | number): string {
    const vaReg = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    if (typeof value === 'string') value = Number.parseFloat(value);
    let newMoney = value.toFixed(2).replace(vaReg, '$1,');
    if (value === 0 || value === null || value === undefined || NaN) {
      return '0.00';
    }
    return newMoney;
  }
  // 清除千分位
  clearFormatMoney(string: string): string {
    const reg = /,/g;
    return (string + '').replace(reg, '');
  }
  // 是否包含了除了数字和小数点之后的数字
  isDigit(str: string): boolean {
    const reg = /^(\d*\.{0,1}\d*)$/;
    return reg.test(str + '');
  }
  focus(val: string, event: FocusEvent): void {
    if (event.target instanceof HTMLInputElement)
      if (event.target && event.target.value)
        this.value = this.clearFormatMoney(event.target.value);
  }
  changes(v: string, e: InputEvent): void {
    const val = this.value;
    if (e.target instanceof HTMLInputElement) {
      if (this.isDigit(e.target.value)) {
        this.value = e.target.value;
      } else {
        this.value = val;
      }
    }
  }
  blur(): void {
    this.value = this.dealMoney(this.value);
  }
}
</script>
