import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ui-demi/element-plus",
  description: "A VitePress Site",
  base: './',
  markdown: {
    config: md => {
      md.use(demoblockPlugin)
    },
  },
  vite: {
    // @ts-ignore
    plugins: [demoblockVitePlugin()]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    // ],

    sidebar: [
      {
        text: 'Component',
        items: [
          { text: 'CollapseCard', link: '/src/docs/collapse-card' },
          { text: 'Description', link: '/src/docs/description' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cc-hearts/ui-demi.git' }
    ]
  }
})
