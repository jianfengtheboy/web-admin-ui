import type { App } from 'vue'
import hasPerm from './modules/hasPerm'
import hasRole from './modules/hasRole'

export default {
	install(Vue: App) {
		Vue.directive('hasPerm', hasPerm)
		Vue.directive('hasRole', hasRole)
	},
}
