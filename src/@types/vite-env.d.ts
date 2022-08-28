/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_SYSTEM_NAME: string
  readonly VITE_PROXY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
