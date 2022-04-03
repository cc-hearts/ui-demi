<template>
  <div class="flex">
    <template v-for="(item, index) in list">
      <div :key="index">
        <a class="cursor" @click="toRouters(item)">{{ item.name }}</a>
      </div>
    </template>
  </div>
</template>

<script>
import { routes } from '@/router/index';
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = this.getRouterList(routes);
  },
  methods: {
    getRouterList(routes, prePath) {
      return routes.reduce((pre, val) => {
        if (val.children && val.children instanceof Array) {
          pre = [
            ...pre,
            ...this.getRouterList(
              val.children,
              prePath ? prePath + '/' + val.path : val.path
            ),
          ];
        } else {
          pre.push({
            name: val.name,
            routes: prePath ? prePath + '/' + val.path : val.path,
          });
        }
        return pre;
      }, []);
    },
    toRouters(item) {
      this.$router.push({
        path: item.routes,
      });
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  div {
    flex-grow: 1;
    width: 20%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 12px;
    box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.1);
  }
}
.cursor {
  cursor: pointer;
}
</style>
