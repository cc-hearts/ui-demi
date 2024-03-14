import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CustomTheme from './custom-theme.vue'
import * as Comp from '../../src/components/index'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import * as Antd from './ant-design-vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import './style.css'
import './override-ui.css'
import 'uno.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(CustomTheme, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    Object.entries({ ...Comp }).forEach(([name, component]) => {
      app.component(name, component)
    })

    app.use(Antd)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
