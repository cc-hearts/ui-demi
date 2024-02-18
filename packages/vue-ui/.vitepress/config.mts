import { readdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vitepress'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'

const sidebarItems = readdirSync(resolve(process.cwd(), './src/docs'), {
  withFileTypes: true,
})

const sidebar = sidebarItems
  .filter((_) => _.isFile())
  .map((item) => {
    const name = item.name.replace('.md', '')

    return { text: name, link: `/src/docs/${name}` }
  })
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ui-demi/vue-kit',
  description: 'a site',
  base: '/ui-demi/vue-kit',
  markdown: {
    config: (md) => {
      md.use(demoblockPlugin)
    },
  },
  vite: {
    // @ts-ignore
    plugins: [demoblockVitePlugin()],
  },
  themeConfig: {
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
