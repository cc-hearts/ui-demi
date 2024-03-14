import { defineAsyncComponent, h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
    // Object.entries({ ...Comp }).forEach(([name, component]) => {

    //   app.component(name, component)
    // })

    const MonacoEditor =
      typeof window !== 'undefined'
        ? defineAsyncComponent(() =>
            import('../../src/components/monaco-editor/index.js').then(
              (module) => module.MonacoEditor
            )
          )
        : () => null
    app.component('MonacoEditor', MonacoEditor)

    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
