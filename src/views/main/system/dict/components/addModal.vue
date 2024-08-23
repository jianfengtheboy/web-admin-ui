<script lang="ts" setup>
import { Message, type FormInstance } from '@arco-design/web-vue'
import * as Regexp from '@/utils/regexp'
import { useForm } from '@/hooks'

const emit = defineEmits<{
	(e: 'save-success'): void
}>()

const dictId = ref('')
const isEdit = computed(() => !!dictId.value)
const title = computed(() => (isEdit.value ? '编辑字典' : '新增字典'))
const visible = ref(false)

const formRef = ref<FormInstance>()
const { form, resetForm } = useForm({
	name: '',
	code: '',
	status: 1,
	description: ''
})

const rules: FormInstance['rules'] = {
	name: [{ required: true, message: '请输入字典名称' }],
	code: [
		{ required: true, message: '请输入字典编码' },
		{ match: Regexp.OnlyEn, message: '字典编码格式不正确！只能输入英文' }
	],
	status: [{ required: true }]
}

const add = () => {
	dictId.value = ''
	visible.value = true
}

const edit = async (id: string) => {
	try {
		dictId.value = id
		visible.value = true
		const response = await window.$apis.system.getSystemDictDetail({ id })
		if (response && response.code === 200) {
			Object.assign(form, response.data)
		}
	} catch (error) {
		console.log(error)
	}
}

defineExpose({ add, edit })

const close = () => {
	formRef.value?.resetFields()
	resetForm()
}

const save = async () => {
	try {
		const valid = await formRef.value?.validate()
		if (valid) return false
		const response = await window.$apis.system.saveSystemDict(form)
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
			<a-form-item label="字典名称" field="name">
				<a-input v-model.trim="form.name" placeholder="请输入字典名称" allow-clear :max-length="10" />
			</a-form-item>
			<a-form-item label="字典编码" field="code">
				<a-input v-model.trim="form.code" placeholder="请输入字典编码" allow-clear :max-length="10" />
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
					type="round"
					v-model="form.status"
					:checked-value="1"
					:unchecked-value="0"
					checked-text="正常"
					unchecked-text="禁用"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>
