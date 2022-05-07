<template>
  <div class="range-date-picker">
    <van-popup position="bottom" :style="{ height: '60%' }" :value="showNative" @input="handleChangeShow">
      <van-picker
        :title="title"
        show-toolbar
        :columns="columns"
        @change="handleChange"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Picker, Popup } from 'vant'
// 日期范围选择框
export default {
  name: 'RangeDatePicker',
  components: {
    'van-picker': Picker,
    'van-popup': Popup,
  },
  props: {
    // 是否显示日期范围选择框
    type: {
      type: String,
      default: 'date',
    },
    show: {
      type: Boolean,
      default: false,
    },
    // 日期范围选择框的标题
    title: {
      type: String,
      default: '日期范围选择',
    },
    // 日期范围选择框的最小日期
    minDate: {
      type: Date,
      default: () => new Date(1970, 1, 1),
    },
    // 日期范围选择框的最大日期
    maxDate: {
      type: Date,
      default: () => new Date(2035, 12, 31),
    },
    // 日期范围选择框的默认日期范围
    defaultDate: {
      type: Date,
      default: () => new Date(),
    },
    // 日期范围选择框的日期范围
    range: {
      type: Array,
      default: () => [],
    },
    // 日期范围选择框的日期范围变化时的回调函数
    onChange: {
      type: Function,
      default: () => {},
    },
    // 是否显示年月日
    isDate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns: [],
      maxYear: 2035,
      minYear: 1970,
      maxMonth: 12,
      minMonth: 1,
      maxDay: 31,
      minDay: 1,
      showNative: false,
      columnsOrder: [],
    }
  },
  watch: {
    type: {
      handler() {
        this.initRangeDate()
      },
      immediate: true,
    },
    show: {
      handler(val) {
        this.showNative = val
      },
      immediate: true,
    },
  },
  methods: {
    initRangeDate() {
      // 根据当前的时间来初始化
      const year = this.getYearRange(true, true)
      let columnsOrder = []
      if (this.type === 'date') {
        const month = this.getMonthRange()
        const date = this.getDateRange()
        this.columns = this.formatRangeDate(year, month, date)
        columnsOrder = ['year', 'month', 'date']
      } else if (this.type === 'month') {
        const month = this.getMonthRange()
        this.columns = this.formatRangeDate(year, month)
        columnsOrder = ['year', 'month']
      } else if (this.type === 'year') {
        this.columns = this.formatRangeDate(year)
        columnsOrder = ['year']
      }
      this.columnsOrder = [...columnsOrder].concat(columnsOrder)
    },
    formatRangeDate(...args) {
      let api = []
      const arr = [...args].concat(args)
      return arr.map((val, index) => {
        return {
          values: val,
          defaultIndex: val.findIndex((i) => {
            if (this.isDate) {
              let suffix = ''
              if (arr.length === 6) {
                // 年 月 日
                suffix =
                  index === 2 || index === 5
                    ? '日'
                    : index === 1 || index === 4
                    ? '月'
                    : index === 0 || index === 3
                    ? '年'
                    : ''
                api = ['getFullYear', 'getMonth', 'getDate']
              } else if (arr.length === 4) {
                suffix = index === 0 || index === 2 ? '年' : index === 1 || index === 3 ? '月' : ''
                api = ['getFullYear', ' getMonth']
              } else if (arr.length === 2) {
                suffix = '年'
                api = ['getFullYear']
              }
              api = [...api].concat(api)
              return String(i) === this.defaultDate[api[index]]() + suffix
            }
            return i === this.defaultDate[api[index]]()
          }),
        }
      })
    },
    getData(api, maxBool, minBool) {
      const arr = []
      let min = api === 'getFullYear' ? this.minYear : api === 'getMonth' ? this.minMonth : this.minDay
      let max = api === 'getFullYear' ? this.maxYear : api === 'getMonth' ? this.maxMonth : this.maxDay
      if (minBool) {
        min = this.minDate[api]()
        if (api === 'getMonth') min++
      }
      if (maxBool) {
        max = this.maxDate[api]()
        if (api === 'getMonth') max++
      }
      if (api === 'getFullYear') {
        console.log(min, max)
      }
      for (let i = min; i <= max; i++) {
        arr.push(i)
      }
      return arr
    },
    getYearRange(isMax = false, isMin = false) {
      return this.isDate
        ? this.getData('getFullYear', isMax, isMin).map((val) => `${val}年`)
        : this.getData('getFullYear', isMax, isMin)
    },
    getMonthRange(isMax = false, isMin = false) {
      return this.isDate
        ? this.getData('getMonth', isMax, isMin).map((val) => `${val}月`)
        : this.getData('getMonth', isMax, isMin)
    },
    getDateRange(isMax = false, isMin = false) {
      return this.isDate
        ? this.getData('getDate', isMax, isMin).map((val) => `${val}日`)
        : this.getData('getDate', isMax, isMin)
    },
    handleChangeShow(val) {
      this.$emit('update:show', val)
    },
    enquireArray(arr1, arr2) {
      if (arr1.length !== arr2.length) return false
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
      }
      return true
    },
    dateFilter(getData, isMax, isMin, index) {
      const day = this[getData](isMax, isMin)
      this.columns.splice(index, 1, {
        values: day,
      })
    },
    getMonth(index, field, picker) {
      const val = Number(picker[index].replace(/[年月日]/g, '')) || 0
      const min = this.minDate.getFullYear()
      const max = this.maxDate.getFullYear()
      if (field === 'year') {
        // TODO:
        if (val === min || val === max) {
          // 对月份限制
          this.dateFilter('getMonthRange', val === max, val === min, index + 1)
          // 对日期限制
          if (this.type === 'date') {
            this.dateFilter('getDateRange', val === max, val === min, index + 2)
          }
        } else {
          this.initMonth(index)
          if (this.type === 'date') {
            this.initDay(index + 1)
          }
        }
      } else if (field === 'month') {
        if (val === min || val === max) {
          this.getDay(index, 'month', val)
        } else {
          this.initDay(index)
        }
      }
    },
    getDay(index, field, picker) {
      const val = Number(picker[index].replace(/[年月日]/g, '')) || 0
      const min = this.minDate.getMonth()
      const max = this.maxDate.getMonth()
      if (val === min || val === max) {
        // 对日限制
        this.dateFilter('getDateRange', val === max, val === min, index + 1)
      } else {
        this.initDay(index)
      }
    },
    initDay(index) {
      const arr = this.getDateRange()
      if (!this.enquireArray(arr, this.columns[index + 1])) {
        const { defaultIndex } = this.columns[index + 1]
        this.columns.splice(index + 1, 1, {
          values: arr,
          defaultIndex,
        })
      }
    },
    initMonth(index) {
      const arr = this.getMonthRange()
      if (!this.enquireArray(arr, this.columns[index + 1])) {
        const { defaultIndex } = this.columns[index + 1]
        this.columns.splice(index + 1, 1, {
          values: arr,
          defaultIndex,
        })
      }
    },
    handleChange(val, picker, index) {
      if (this.type === 'date') {
        if (index === 3 || index === 0) {
          this.getMonth(index, 'year', picker, index)
        } else if (index === 1 || index === 4) {
          this.getDay(index, 'month', picker, index)
        }
      } else if (this.type === 'month') {
        if (index === 0 || index === 2) {
          this.getMonth(index, 'year', picker, index)
        }
      }
    },
    handleCancel() {
      this.$emit('update:show', false)
    },
    replaceFormat(val) {
      if (this.type === 'date' && val === '日') return ''
      if (this.type === 'month' && val === '月') return ''
      if (this.type === 'year' && val === '年') return ''
      return '-'
    },
    handleConfirm(date) {
      let startDate = ''
      let endDate = ''

      for (let i = 0; i < date.length; i++) {
        if (i < date.length / 2) {
          startDate += date[i]
        } else {
          endDate += date[i]
        }
      }
      startDate = startDate.replace(/[年月日]/g, (val) => this.replaceFormat(val))
      endDate = endDate.replace(/[年月日]/g, (val) => this.replaceFormat(val))
      console.log(startDate, endDate)
      return [startDate, endDate]
    },
  },
}
</script>

<style>
.range-date-picker .van-picker-column__item {
  padding: 0 !important;
}
</style>
