<script lang="ts" setup>
import { Message, type FormInstance } from '@arco-design/web-vue'
import { useForm } from '@/hooks'

const emit = defineEmits<{
	(e: 'save-success'): void
}>()

const dictDataId = ref('')
const isEdit = computed(() => !!dictDataId.value)
const title = computed(() => (isEdit.value ? '编辑字典数据' : '新增字典数据'))
const visible = ref(false)
const loading = ref(false)

const formRef = ref<FormInstance>()
const { form, resetForm } = useForm({
	name: '',
	value: '',
	status: 1
})

const rules: FormInstance['rules'] = {
	name: [{ required: true, message: '请输入字典名' }],
	value: [
		{ required: true, message: '请输入字典值' },
		{ match: /^[a-zA-Z0-9_]*$/, message: '字典值格式不对！只能包含英文数字下划线' }
	],
	status: [{ required: true }]
}

// 新增
const add = () => {
	dictDataId.value = ''
	visible.value = true
}

// 编辑
const edit = async (data: { id: string; code: string }) => {
	try {
		loading.value = true
		visible.value = true
		dictDataId.value = data.id
		const response = await window.$apis.system.getSystemDictDataDetail(data)
		if (response && response.code === 200) {
			Object.assign(form, response.data)
		}
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
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
		const response = await window.$apis.system.saveSystemDictData(form)
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
		draggable
		:mask-closable="false"
		:modal-style="{ maxWidth: '520px' }"
		@before-ok="save"
		@close="close"
	>
		<a-spin :loading="loading" class="w-full">
			<a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
				<a-form-item label="字典名" field="name">
					<a-input v-model.trim="form.name" placeholder="请输入字典名" allow-clear :max-length="10" />
				</a-form-item>
				<a-form-item label="字典值" field="value">
					<a-input v-model.trim="form.value" placeholder="请输入字典值" allow-clear :max-length="10" />
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
		</a-spin>
	</a-modal>
</template>
