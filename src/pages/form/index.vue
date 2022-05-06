<template>
  <div>
    <range-date-picker
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      :show.sync="isShow"
      :currentDate="currentDate"
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
      minDate: new Date(1990, 2, 10),
      maxDate: new Date(2035, 8, 12),
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
