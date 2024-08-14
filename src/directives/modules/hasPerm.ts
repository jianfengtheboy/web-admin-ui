import type { DirectiveBinding, Directive } from 'vue'
import { useAppStore } from '@/store'

/**
 * @desc v-hasPerm 操作权限处理
 * @desc 使用 v-hasPerm="['home:btn:add']"
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
	const { value } = binding
	const all_permission = '*:*:*'
	const appStore = useAppStore()

	if (value && Array.isArray(value) && value.length) {
		const permissionValues: string[] = value
		const hasPermission = appStore.permissions.some(perm => {
			return all_permission === perm || permissionValues.includes(perm)
		})
		if (!hasPermission) {
			el.parentNode && el.parentNode.removeChild(el)
		}
	} else {
		throw new Error(`need permission! Like v-hasPerm="['home:btn:edit','home:btn:delete']"`)
	}
}

const directive: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		checkPermission(el, binding)
	},
	updated(el: HTMLElement, binding: DirectiveBinding) {
		checkPermission(el, binding)
	}
}

export default directive
