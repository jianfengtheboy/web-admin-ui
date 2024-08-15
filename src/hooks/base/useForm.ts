export default function useForm<F extends object>(initValue: F) {
	const getInitValue = () => window.$_.cloneDeep(initValue)

	const form = reactive(getInitValue())

	const resetForm = () => {
		for (const key in form) {
			delete form[key]
		}
		Object.assign(form, getInitValue())
	}

	return {
		form,
		resetForm
	}
}
