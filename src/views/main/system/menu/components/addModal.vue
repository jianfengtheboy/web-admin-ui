<script lang="ts" setup>
import { Message, type FormInstance } from '@arco-design/web-vue'
import { IMenuItem, IMenuForm } from '@/model/menu'
import { isExternal } from '@/utils/validate'
import { transformPathToName, filterTree } from '@/utils/route'
import { mapTree } from 'xe-utils'
import { useForm } from '@/hooks'

interface IProps {
	menus: IMenuItem[]
}

const props = withDefaults(defineProps<IProps>(), {
	menus: () => []
})

const emit = defineEmits<{
	(e: 'save-success'): void
}>()

const menuSelectTree = computed(() => {
	const menus = JSON.parse(JSON.stringify(props.menus)) as IMenuItem[]
	const data = filterTree(menus, i => [1, 2].includes(i.type))
	const arr = mapTree(data, i => ({
		id: i.id,
		title: i.title,
		children: i.children
	}))
	return arr
})

const formRef = ref<FormInstance>()

const menuId = ref('')
const visible = ref(false)
const isEdit = computed(() => !!menuId.value)
const title = computed(() => (isEdit.value ? '编辑菜单' : '新增菜单'))
const isExternalUrl = ref(false)

const { form, resetForm } = useForm<IMenuForm>({
	// 类型 1目录 2菜单 3按钮
	type: 1,
	// arco 图标名称
	icon: '',
	// 自定义图标名称
	svgIcon: '',
	// 菜单或目录的名称
	title: '',
	// 排序
	sort: 0,
	// 状态 0禁用 1启用
	status: 1,
	// 路由路径
	path: '',
	// 组件路径
	component: '',
	// 是否缓存
	keepAlive: false,
	// 设置 true 的时候该路由不会在侧边栏出现
	hidden: true,
	// 上级菜单id
	parentId: '',
	// 重定向
	redirect: '',
	// 显示在面包屑
	breadcrumb: true,
	// 显示在页签
	showInTabs: true,
	// 总是显示
	alwaysShow: false,
	// 权限标识
	permission: ''
})

const routeName = computed(() => transformPathToName(form.path))

const rules: FormInstance['rules'] = {
	parentId: [{ required: true, message: '请选择上级菜单' }],
	title: [{ required: true, message: '请输入菜单标题' }],
	path: [{ required: true, message: '请输入路由路径' }],
	component: [{ required: true, message: '请输入组件路径' }],
	permission: [{ required: true, message: '请输入权限标识' }]
}

const formRules = computed(() => {
	if ([1, 2].includes(form.type)) {
		const { title, path } = rules
		return { title, path } as FormInstance['rules']
	}
	if (form.type === 3) {
		const { parentId, title, permission } = rules
		return { parentId, title, permission } as FormInstance['rules']
	}
})

// 切换类型清除校验
const onChangeType = () => {
	formRef.value?.clearValidate()
}

// 新增
const add = (item?: IMenuItem) => {
	if (item && item.id) {
		form.parentId = item.id
	}
	menuId.value = ''
	visible.value = true
}

// 编辑
const edit = async (id: string) => {
	menuId.value = id
	const response = await window.$apis.system.getSystemMenuDetail({ id })
	if (response && response.code === 200) {
		Object.assign(form, response.data)
		if (isExternal(form.path)) {
			isExternalUrl.value = true
		}
		visible.value = true
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
		const response = await window.$apis.system.saveSystemMenu(form)
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
		:modal-style="{ maxWidth: '625px' }"
		:mask-closable="false"
		@before-ok="save"
		@close="close"
	>
		<a-form ref="formRef" :model="form" :rules="formRules" auto-label-width>
			<a-form-item label="菜单类型" field="type">
				<a-radio-group v-model="form.type" type="button" :disabled="isEdit" @change="onChangeType">
					<a-radio :value="1">目录</a-radio>
					<a-radio :value="2">菜单</a-radio>
					<a-radio :value="3">按钮</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="上级菜单" field="parentId">
				<a-tree-select
					v-model="form.parentId"
					placeholder="请选择上级菜单"
					allow-clear
					allow-search
					:disabled="isEdit"
					:data="(menuSelectTree as any)"
					:fieldNames="{
						key: 'id',
						title: 'title',
						children: 'children'
					}"
				/>
			</a-form-item>
			<a-row :gutter="16" v-if="[1, 2].includes(form.type)">
				<a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
					<a-form-item label="自定义图标" field="svgIcon">
						<BaseIconSelector v-model="form.svgIcon" type="custom" />
						<a-tooltip content="优先显示">
							<icon-question-circle-fill :size="18" :style="{ color: 'rgba(var(--warning-6))', marginLeft: '8px' }" />
						</a-tooltip>
					</a-form-item>
				</a-col>
				<a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
					<a-form-item label="菜单图标" field="icon">
						<BaseIconSelector v-model="form.icon" type="arco" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-form-item label="菜单标题" field="title">
				<a-input v-model.trim="form.title" placeholder="请输入菜单标题" allow-clear :max-length="10" />
			</a-form-item>
			<a-form-item label="路由路径" field="path" v-if="[1, 2].includes(form.type)">
				<a-input v-model.trim="form.path" placeholder="请输入路由路径" allow-clear :max-length="50" />
				<template #extra>
					<div>
						<span>路由名称由系统自动生成：</span>
						<a-tag v-if="routeName">{{ routeName }}</a-tag>
					</div>
				</template>
			</a-form-item>
			<a-form-item label="重定向" field="redirect" v-if="[1, 2].includes(form.type) && !isExternalUrl">
				<a-input v-model.trim="form.redirect" placeholder="请输入重定向地址" allow-clear :max-length="50" />
			</a-form-item>
			<a-form-item label="是否外链" field="isExternalUrl" v-if="[1, 2].includes(form.type)">
				<a-radio-group v-model="isExternalUrl" type="button">
					<a-radio :value="true">是</a-radio>
					<a-radio :value="false">否</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="组件路径" field="component" v-if="form.type === 2">
				<a-input
					v-if="isExternalUrl"
					v-model.trim="form.component"
					placeholder="请输入组件路径"
					allow-clear
					:max-length="50"
				/>
				<a-input v-else v-model.trim="form.component" placeholder="请输入组件路径" allow-clear :max-length="50">
					<template #prepend>@/views/main/</template>
					<template #append>.vue</template>
				</a-input>
			</a-form-item>
			<a-row :gutter="16" v-if="[1, 2].includes(form.type)">
				<a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
					<a-form-item label="状态" field="status">
						<a-switch
							type="round"
							v-model="form.status"
							:checked-value="1"
							:unchecked-value="0"
							checked-text="启用"
							unchecked-text="禁用"
						/>
					</a-form-item>
				</a-col>
				<a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
					<a-form-item label="是否隐藏" field="hidden">
						<a-switch
							type="round"
							v-model="form.hidden"
							:checked-value="true"
							:unchecked-value="false"
							checked-text="是"
							unchecked-text="否"
						/>
					</a-form-item>
				</a-col>
				<a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
					<a-form-item label="是否缓存" field="keepAlive">
						<a-switch
							type="round"
							v-model="form.keepAlive"
							:checked-value="true"
							:unchecked-value="false"
							checked-text="是"
							unchecked-text="否"
						/>
					</a-form-item>
				</a-col>
				<a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
					<a-form-item label="面包屑" field="breadcrumb">
						<a-switch
							type="round"
							v-model="form.breadcrumb"
							:checked-value="true"
							:unchecked-value="false"
							checked-text="显示"
							unchecked-text="隐藏"
						/>
					</a-form-item>
				</a-col>
				<a-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
					<a-form-item label="总是显示" field="alwaysShow" v-if="form.type === 1">
						<a-switch
							type="round"
							v-model="form.alwaysShow"
							:checked-value="true"
							:unchecked-value="false"
							checked-text="显示"
							unchecked-text="隐藏"
						/>
					</a-form-item>
					<a-form-item label="页签显示" field="showInTabs" v-if="form.type === 2">
						<a-switch
							type="round"
							v-model="form.showInTabs"
							:checked-value="true"
							:unchecked-value="false"
							checked-text="显示"
							unchecked-text="隐藏"
						/>
					</a-form-item>
				</a-col>
			</a-row>
			<a-form-item label="权限标识" field="permission" v-if="form.type === 3">
				<a-input v-model.trim="form.permission" placeholder="请输入权限标识" allow-clear :max-length="20" />
			</a-form-item>
			<a-form-item label="菜单排序" field="sort">
				<a-input-number
					v-model="form.sort"
					placeholder="请输入菜单排序"
					:min="1"
					mode="button"
					:style="{ width: '120px' }"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>
