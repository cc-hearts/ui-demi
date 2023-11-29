import { createApp } from 'vue'
import App from './demo.vue'
import 'uno.css'
import '@/assets/scss/index.scss'


const app = createApp(App)

Object.entries(import.meta.glob('./modules/*.ts', { eager: true })).forEach(
  ([, Module]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Module.setup?.({ app })
  }
)

app.mount('#app')
