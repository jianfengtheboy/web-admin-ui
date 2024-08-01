import type { DirectiveBinding, Directive } from 'vue'
import { useAppStore } from '@/store'

/**
 * @desc v-hasRole 角色权限处理
 * @desc 使用 v-hasRole="['admin', 'user]"
 */
function checkRole(el: HTMLElement, binding: DirectiveBinding) {
	const appStore = useAppStore()
	const { value } = binding
	const super_admin = 'role_admin'
	if (value && Array.isArray(value) && value.length) {
		const roleValues: string[] = value
		const hasRole = appStore.roles.some(role => {
			return super_admin === role || roleValues.includes(role)
		})
		if (!hasRole) {
			el.parentNode && el.parentNode.removeChild(el)
		}
	} else {
		throw new Error(`need role! Like v-hasRole="['admin','user']"`)
	}
}

const directive: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		checkRole(el, binding)
	},
	updated(el: HTMLElement, binding: DirectiveBinding) {
		checkRole(el, binding)
	}
}

export default directive
