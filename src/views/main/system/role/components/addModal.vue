<script lang="ts" setup>
import { Message, type FormInstance } from '@arco-design/web-vue'
import { useForm } from '@/hooks'

const emit = defineEmits<{
	(e: 'save-success'): void
}>()

const roleId = ref('')
const isEdit = computed(() => !!roleId.value)
const title = computed(() => (isEdit.value ? '编辑角色' : '新增角色'))
const visible = ref(false)

const formRef = ref<FormInstance>()
const { form, resetForm } = useForm({
	name: '',
	code: '',
	status: 1,
	description: ''
})

const rules: FormInstance['rules'] = {
	name: [
		{ required: true, message: '请输入角色名称' },
		{ min: 3, max: 10, message: '长度在 3 - 10个字符' }
	],
	code: [
		{ required: true, message: '请输入角色编码' },
		{ match: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '格式不对！只能英文开头，包含英文数字下划线' }
	],
	status: [{ required: true }]
}

// 新增
const add = () => {
	roleId.value = ''
	visible.value = true
}

// 编辑
const edit = async (id: string) => {
	try {
		roleId.value = id
		visible.value = true
		const response = await window.$apis.system.getSystemRoleDetail({ id })
		if (response && response.code === 200) {
			Object.assign(form, response.data)
		}
	} catch (error) {
		console.log(error)
	}
}

defineExpose({ add, edit })

// 关闭弹窗
const close = () => {
	formRef.value?.resetFields()
	resetForm()
}

// 保存
const save = async () => {
	try {
		const valid = await formRef.value?.validate()
		if (valid) return false
		const response = await window.$apis.system.saveSystemRole(form)
		if (response && response.code === 200) {
			Message.success(response.message)
			emit('save-success')
			return true
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}
</script>

<template>
	<a-modal
		v-model:visible="visible"
		:title="title"
		width="90%"
		:mask-closable="false"
		:modal-style="{ maxWidth: '520px' }"
		@before-ok="save"
		@close="close"
	>
		<a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
			<a-form-item label="角色名称" field="name">
				<a-input v-model.trim="form.name" placeholder="请输入角色名称" allow-clear :max-length="10" />
			</a-form-item>
			<a-form-item label="角色编码" field="code">
				<a-input
					v-model.trim="form.code"
					placeholder="请输入角色编码"
					allow-clear
					:disabled="isEdit"
					:max-length="10"
				/>
			</a-form-item>
			<a-form-item label="描述" field="description">
				<a-textarea
					v-model.trim="form.description"
					placeholder="请填写描述"
					:max-length="200"
					show-word-limit
					:auto-size="{ minRows: 3, maxRows: 5 }"
				/>
			</a-form-item>
			<a-form-item label="状态" field="status">
				<a-switch
					v-model="form.status"
					type="round"
					:checked-value="1"
					:unchecked-value="0"
					checked-text="正常"
					unchecked-text="禁用"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>
