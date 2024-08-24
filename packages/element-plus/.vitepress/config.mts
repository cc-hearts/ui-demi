import { readdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'

const sidebarItems = readdirSync(resolve(process.cwd(), './docs'), {
  withFileTypes: true,
})

const sidebar = sidebarItems
  .filter((_) => _.isFile())
  .map((item) => {
    const name = item.name.replace('.md', '')

    return { text: name, link: `/docs/${name}` }
  })
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ui-demi/element-plus',
  description: 'A VitePress Site',
  base: '/ui-demi/element-plus',
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
    },
  },
  vite: {
    // @ts-ignore
    plugins: [demoblockVitePlugin()],
    resolve: {
      alias: {
        '~': resolve(),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@packages/helpers/assets/scss/lib.scss' as *;\n",
        },
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    // ],

    sidebar: [
      {
        text: 'Component',
        items: [...sidebar],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cc-hearts/ui-demi.git' },
    ],
  },
})
