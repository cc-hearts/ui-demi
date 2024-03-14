<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'
import DefaultTheme from 'vitepress/theme'
import { onMounted, onUnmounted, ref } from 'vue'

const Layout = DefaultTheme.Layout

let algorithm = ref(theme.defaultAlgorithm)
let observer: MutationObserver

function initTheme() {
  const isDarkMode = document.documentElement.classList.contains('dark')
  algorithm.value = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
}

onMounted(() => {
  initTheme()

  observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        initTheme()
      }
    }
  })

  const config = { attributes: true, attributeFilter: ['class'] }
  observer.observe(document.documentElement, config)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm,
    }"
  >
    <Layout />
  </ConfigProvider>
</template>

<style lang="scss"></style>
