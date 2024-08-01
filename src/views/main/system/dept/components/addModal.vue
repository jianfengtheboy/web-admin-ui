<script lang="ts" setup>
import { Message, type FormInstance } from '@arco-design/web-vue'
import { useForm, useDept } from '@/hooks'
import { IDeptItem } from '@/model/dept'

const emit = defineEmits<{
	(e: 'save-success'): void
}>()

const visible = ref(false)
const deptId = ref('')
const isEdit = computed(() => !!deptId.value)
const title = computed(() => (isEdit.value ? '编辑部门' : '新增部门'))

const { deptList, getDeptList } = useDept()

const formRef = ref<FormInstance>()
const { form, resetForm } = useForm({
	id: '',
	parentId: '',
	name: '',
	sort: 0,
	status: 1,
	description: ''
})

const rules: FormInstance['rules'] = {
	name: [
		{ required: true, message: '请输入部门名称' },
		{ min: 3, max: 10, message: '长度在 3 - 10个字符' }
	]
}

// 新增
const add = async (item?: IDeptItem) => {
	if (item && item.id) {
		form.parentId = item.id
	}
	await getDeptList()
	deptId.value = ''
	visible.value = true
}

// 编辑
const edit = async (id: string) => {
	if (!deptList.value.length) {
		await getDeptList()
	}
	try {
		deptId.value = id
		const response = await window.$apis.system.getSystemDeptDetail({ id })
		if (response && response.code === 200) {
			Object.assign(form, response.data)
			visible.value = true
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
		const response = await window.$apis.system.saveSystemDept(form)
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
		:modal-style="{ maxWidth: '520px' }"
		:mask-closable="false"
		@before-ok="save"
		@close="close"
	>
		<a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
			<a-form-item label="上级部门" field="parentId">
				<a-tree-select
					v-model="form.parentId"
					allow-clear
					:data="deptList"
					placeholder="请选择上级部门"
					:fieldNames="{
						key: 'id',
						title: 'name',
						children: 'children'
					}"
				/>
			</a-form-item>
			<a-form-item label="部门名称" field="name">
				<a-input v-model.trim="form.name" placeholder="请输入部门名称" allow-clear :max-length="10" />
			</a-form-item>
			<a-form-item label="排序" field="sort">
				<a-input-number v-model="form.sort" :style="{ width: '120px' }" />
			</a-form-item>
			<a-form-item label="描述" field="description">
				<a-textarea
					v-model.trim="form.description"
					:max-length="200"
					placeholder="请填写描述"
					:auto-size="{ minRows: 3 }"
					show-word-limit
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
