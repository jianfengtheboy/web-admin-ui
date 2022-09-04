import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import _ from 'lodash'
import './styles/base.scss'

window.$_ = _

const app = createApp(App)

app.use(store)
app.mount('#app')
