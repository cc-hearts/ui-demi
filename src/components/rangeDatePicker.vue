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
      tip: ['年', '月', '日'],
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
      let defaultValue = this.getArrayDate('defaultDate')
      let defaultDate = this.defaultDate || new Date()
      if (this.minDate > this.defaultDate) {
        defaultValue = this.getArrayDate('minDate')
        defaultDate = this.minDate
      } else if (this.maxDate < this.defaultDate) {
        defaultValue = this.getArrayDate('maxDate')
        defaultDate = this.maxDate
      }
      if (this.isDate) {
        defaultValue = defaultValue.map((val, ind) => {
          return val + this.tip[ind]
        })
      }
      defaultValue = [...defaultValue].concat(defaultValue)
      if (this.type === 'date') {
        const month = this.getMonthRange()
        const date = this.getDateRange()
        this.columns = this.formatRangeDate(defaultDate, year, month, date)
        columnsOrder = ['year', 'month', 'date']
      } else if (this.type === 'month') {
        const month = this.getMonthRange()
        this.columns = this.formatRangeDate(defaultDate, year, month)
        columnsOrder = ['year', 'month']
      } else if (this.type === 'year') {
        this.columns = this.formatRangeDate(defaultDate, year)
        columnsOrder = ['year']
      }
      this.columnsOrder = [...columnsOrder].concat(columnsOrder)
      this.handleChange(null, defaultValue, 0)
      this.handleChange(null, defaultValue, this.columnsOrder.length / 2)
    },
    formatRangeDate(defaultValue, ...args) {
      let api = []
      const arr = [...args].concat(args)
      return arr.map((val, index) => {
        return {
          values: val,
          defaultIndex: val.findIndex((i) => {
            if (this.isDate) {
              const suffix = this.tip[index >= args.length ? index - args.length : index]
              if (arr.length === 6) {
                // 年 月 日
                api = ['getFullYear', 'getMonth', 'getDate']
              } else if (arr.length === 4) {
                api = ['getFullYear', 'getMonth']
              } else if (arr.length === 2) {
                api = ['getFullYear']
              }
              api = [...api].concat(api)
              return String(i) === defaultValue[api[index]]() + suffix
            }
            return i === defaultValue[api[index]]()
          }),
        }
      })
    },
    getArrayDate(api) {
      if (this.type === 'date') {
        return [this[api].getFullYear(), this[api].getMonth() + 1, this[api].getDate()]
      }
      if (this.type === 'month') {
        return [this[api].getFullYear(), this[api].getMonth() + 1]
      }
      return [this[api].getFullYear()]
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
      for (let i = min; i <= max; i++) {
        arr.push(i)
      }
      return arr
    },
    getYearRange(isMax = false, isMin = false) {
      return this.isDate
        ? this.getData('getFullYear', isMax, isMin).map((val) => `${val + this.tip[0]}`)
        : this.getData('getFullYear', isMax, isMin)
    },
    getMonthRange(isMax = false, isMin = false) {
      return this.isDate
        ? this.getData('getMonth', isMax, isMin).map((val) => `${val + this.tip[1]}`)
        : this.getData('getMonth', isMax, isMin)
    },
    getDateRange(isMax = false, isMin = false) {
      return this.isDate
        ? this.getData('getDate', isMax, isMin).map((val) => `${val + this.tip[2]}`)
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
    dateFilter(getData, isMax, isMin, index, defaultDate) {
      const day = this[getData](isMax, isMin)
      this.columns.splice(index, 1, {
        values: day,
        defaultIndex: day.findIndex((val) => val === defaultDate),
      })
    },
    //  isFlag 大于max true 小于 false arrDate maxDate
    equestDate(maxOrMinDate, defaultDate, isFlag = false) {
      const arr = new Array(6).fill(false)
      let formatDefaultDate = defaultDate
      if (this.isDate) {
        formatDefaultDate = formatDefaultDate
          .join('-')
          .replace(/[年月日]/g, '')
          .split('-')
      }
      // 比较是否是大于的情况 defaultDate === pickerDate
      for (let i = 0; i < formatDefaultDate.length; i++) {
        if (isFlag) {
          // 比较大于的情况
          if (formatDefaultDate[i] >= maxOrMinDate[i]) {
            arr[i] = true
          }
        } else if (formatDefaultDate[i] <= maxOrMinDate[i]) {
          arr[i] = true
        }
      }
      return arr
    },
    changeDate(index, field, picker) {
      // 年月日
      const i = index < picker.length / 2 ? 0 : picker.length / 2
      const isMin = this.equestDate(
        [...this.getArrayDate('minDate')].concat(this.getArrayDate('minDate')),
        picker,
        false
      )
      const isMax = this.equestDate(
        [...this.getArrayDate('maxDate')].concat(this.getArrayDate('maxDate')),
        picker,
        true
      )
      if (this.type === 'date') {
        if (field === 'year' || field === 'month') {
          if (isMin[i] || isMax[i]) {
            // 刷新月份
            this.dateFilter('getMonthRange', isMax[i], isMin[i], i + 1, picker[i + 1])
            if (isMin[i + 1] || isMax[i + 1]) {
              // 刷新日
              if (this.type === 'date') {
                // 应该按最大日期计算
                this.dateFilter(
                  'getDateRange',
                  isMax[i] && isMax[i + 1],
                  isMin[i] && isMin[i + 1],
                  i + 2,
                  picker[i + 2]
                )
              }
            } else {
              // 重置刷新日
              this.initFormatDate('getDateRange', i + 2, picker[i + 2])
            }
          } else {
            // 重置刷新月份
            this.initFormatDate('getMonthRange', i + 1, picker[i + 1])
            if (this.type === 'date') {
              this.initFormatDate('getDateRange', i + 2, picker[i + 2])
            }
          }
        }
      } else if (this.type === 'month') {
        // 年月
        if (isMin[i] || isMax[i]) {
          this.dateFilter('getMonthRange', isMax[i], isMin[i], i + 1, picker[i + 1])
        } else {
          this.initFormatDate('getMonthRange', i + 1, picker[i + 1])
        }
      }
    },
    initFormatDate(api, index, defaultDate) {
      const arr = this[api]()
      if (!this.enquireArray(arr, this.columns[index].values)) {
        this.columns.splice(index, 1, {
          values: arr,
          defaultIndex: arr.findIndex((val) => val === defaultDate),
        })
      }
    },
    handleChange(val, picker, index) {
      if (this.type === 'date') {
        if (index === 3 || index === 0) {
          this.changeDate(index, 'year', picker)
        } else if (index === 1 || index === 4) {
          this.changeDate(index, 'month', picker)
        }
      } else if (this.type === 'month') {
        if (index === 0 || index === 2) {
          this.changeDate(index, 'year', picker)
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
