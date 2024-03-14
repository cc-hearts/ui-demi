import { App } from 'vue'

export function withInstall<T>(comp: T, version: string): T {
  const c = comp as any
  c.install = (app: App) => {
    app.component(c.name, c)
    // @ts-ignore
    c.__version = version
  }
  return c
}
