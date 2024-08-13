import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import apis from '@/apis'
import _ from 'lodash'
// 自定义指令
import directives from './directives'
// 引入 Arco Design 组件库以及自定义主题
import ArcoVue, { Card, Modal } from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
// 支持SVG
import 'virtual:svg-icons-register'
// 引入全局样式
import '@/assets/styles/main.less'
// 引入路由守卫
import '@/router/permission'

window.$apis = apis
window.$_ = _

const app = createApp(App)
Modal._context = app._context
Card.props.bordered = false

app.use(router)
app.use(store)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(directives)
app.mount('#app')
