<template>
  <div>
    <van-form>
      <template v-for="item in column">
        <template v-if="item.type === 'input'">
          <van-field :key="item.field">
            <!--  -->
          </van-field>
        </template>
        <!-- <template v-else-if="">

        </template> -->
      </template>
    </van-form>
  </div>
</template>

<script>
import { Form, Field } from 'vant'

export default {
  name: 'StudentForm',
  components: {
    'van-form': Form,
    'van-field': Field,
  },
  data() {
    return {
      column: [
        {
          label: '学生姓名',
          type: 'input',
          field: 'name',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style></style>
