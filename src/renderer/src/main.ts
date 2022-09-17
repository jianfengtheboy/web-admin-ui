import { createApp } from 'vue'
import App from './App.vue'

import _ from 'lodash'
import './styles/base.less'

window.$_ = _

const app = createApp(App)

app.mount('#app')
