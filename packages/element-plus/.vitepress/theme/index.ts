// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import * as Comp from '../../src/components/index'
// Demo组件和DemoBlock是两个vue组件，等会我们要在md文件中使用他来展示组件
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    Object.entries(Comp).forEach(([name, component]) => {
      app.component(name, component)
    })

    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
