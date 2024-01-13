<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import DefaultTheme from 'vitepress/theme'
const Layout = DefaultTheme.Layout
</script>

<template>
  <ConfigProvider>
    <Layout />
  </ConfigProvider>
</template>

<style lang="scss"></style>
