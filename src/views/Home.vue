<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

/**
 * @see:https://class-component.vuejs.org/guide/class-component.html#data
 * 限制类一定要是vue的子类
 */
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
