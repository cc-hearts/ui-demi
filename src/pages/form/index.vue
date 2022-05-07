<template>
  <div>
    <range-date-picker
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      :show.sync="isShow"
      :defaultDate="currentDate"
      :isDate="true"
    />
    <button @click="handleClick">handle click</button>
  </div>
</template>

<script>
import RangeDatePicker from '../../components/rangeDatePicker.vue'

export default {
  name: 'StudentForm',
  components: {
    RangeDatePicker,
  },
  data() {
    return {
      currentDate: new Date(),
      isShow: true,
      // 这里的 2 是 dateIndex 0 - 11
      minDate: new Date(2008, 3, 12),
      maxDate: new Date(2010, 5, 23),
    }
  },
  methods: {
    handleClick() {
      this.isShow = true
    },
  },
}
</script>

<style></style>
