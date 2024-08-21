<script lang="ts" setup>
import type { Columns, ColumnsItem, ColumnsItemDisabled, ColumnsItemHide, Options } from './type'
import type * as A from '@arco-design/web-vue'

interface IProps {
	modelValue: any
	options: Options
	columns: Columns
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void
	(e: 'search'): void
	(e: 'reset'): void
}>()

const valueChange = (value: any, field: string) => {
	emit('update:modelValue', Object.assign(props.modelValue, { [field]: value }))
}

const collapsed = ref(props.options.fold?.defaultCollapsed ?? false)
const formRef = ref<A.FormInstance>()
defineExpose({ formRef })

// col组件的显示隐藏
const colVShow = (index: number) => {
	return index <= (props.options.fold?.index || 0) || (index >= (props.options.fold?.index || 0) && !collapsed.value)
}

// 组件的默认props配置
const getComponentBindProps = (item: ColumnsItem) => {
	const obj: Partial<ColumnsItem['props'] & { placeholder: string }> = {}
	if (item.type === 'input') {
		obj.allowClear = true
		obj.placeholder = item.placeholder || `请输入${item.label}`
		obj.maxLength = item.maxLength || 20
	}
	if (item.type === 'input-number') {
		obj.placeholder = item.placeholder || `请输入${item.label}`
	}
	if (item.type === 'textarea') {
		obj.allowClear = true
		obj.showWordLimit = true
		obj.placeholder = item.placeholder || `请输入${item.label}`
		obj.maxLength = item.maxLength || 200
	}
	if (item.type === 'select') {
		obj.allowClear = true
		obj.placeholder = item.placeholder || `请选择${item.label}`
		obj.options = dicData[item.field] || (item.options as A.SelectInstance['$props']['options'])
	}
	if (item.type === 'cascader') {
		obj.allowClear = true
		obj.placeholder = item.placeholder || `请选择${item.label}`
		obj.options = dicData[item.field] || (item.options as A.CascaderInstance['$props']['options'])
	}
	if (item.type === 'tree-select') {
		obj.allowClear = true
		obj.placeholder = item.placeholder || `请选择${item.label}`
		obj.data = dicData[item.field] || (item.data as A.TreeSelectInstance['$props']['data'])
	}
	if (item.type === 'radio-group') {
		obj.options = dicData[item.field] || (item.options as A.RadioGroupInstance['$props']['options'])
	}
	if (item.type === 'checkbox-group') {
		obj.options = dicData[item.field] || (item.options as A.CheckboxGroupInstance['$props']['options'])
	}
	if (item.type === 'date-picker') {
		obj.allowClear = true
		obj.placeholder = item.placeholder || '请选择日期'
	}
	if (item.type === 'time-picker') {
		obj.allowClear = true
		obj.placeholder = item.placeholder || '请选择时间'
	}
	return { ...obj, ...item.props }
}

const isHide = (hide?: ColumnsItemHide<boolean | object>) => {
	if (hide === undefined) return false
	if (typeof hide === 'boolean') return hide
	if (typeof hide === 'function') {
		return hide(props.modelValue)
	}
}

const isDisabled = (disabled?: ColumnsItemDisabled<boolean | object>) => {
	if (disabled === undefined) return false
	if (typeof disabled === 'boolean') return disabled
	if (typeof disabled === 'function') {
		return disabled(props.modelValue)
	}
}

const dicData: Record<string, any> = reactive({})
props.columns.forEach(item => {
	if (item.request && typeof item.request === 'function' && item?.init) {
		item.request(props.modelValue).then(response => {
			dicData[item.field] = item.resultFormat ? item.resultFormat(response) : response.data
		})
	}
})

// 先找出有级联的项
// 如果这个字段改变了值，那么就找出它的cascader属性对应的字段项，去请求里面的request
const hasCascaderColumns: ColumnsItem[] = []
props.columns.forEach(item => {
	const arr = hasCascaderColumns.map(i => i.field)
	if (item.cascader?.length && !arr.includes(item.field)) {
		hasCascaderColumns.push(item)
	}
})

// 要深克隆，否则无法监听新旧值变化
const cloneForm = computed(() => window.$_.cloneDeep(props.modelValue))

watch(cloneForm as any, (newVal, oldVal) => {
	hasCascaderColumns.forEach(item => {
		if (newVal[item.field] !== oldVal[item.field]) {
			const arr = props.columns.filter(a => {
				return item?.cascader?.includes(a.field)
			})
			arr.forEach(i => {
				if (i.request && Boolean(newVal[item.field])) {
					i.request(props.modelValue).then(response => {
						dicData[i.field] = i.resultFormat ? i.resultFormat(response) : response.data
						if (!dicData[i.field].map((i: any) => i.value).includes(props.modelValue[i.field])) {
							emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
						}
					})
				} else if (i.request && !newVal[item.field]) {
					dicData[i.field] = []
					emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
				}
			})
		}
	})
})
</script>

<template>
	<a-form ref="formRef" :auto-label-width="true" v-bind="options.form" :model="modelValue">
		<a-row :gutter="14" v-bind="options.row" class="w-full">
			<template v-for="(item, index) in columns" :key="item.field">
				<a-col
					v-if="!isHide(item.hide)"
					:span="item.span || 12"
					v-bind="item.col || item.span ? item.col : options.col"
					v-show="colVShow(index)"
				>
					<a-form-item
						v-bind="item.item"
						:label="item.label"
						:field="item.field"
						:rules="item.rules"
						:disabled="isDisabled(item.disabled)"
					>
						<slot :name="item.field" v-bind="{ disabled: isDisabled(item.disabled) }">
							<component
								:is="`a-${item.type}`"
								v-bind="getComponentBindProps(item)"
								:model-value="modelValue[item.field as keyof typeof modelValue]"
								@update:model-value="valueChange($event, item.field)"
							/>
						</slot>
					</a-form-item>
				</a-col>
			</template>
			<a-col v-if="!options.btns?.hide" :span="options.btns?.span || 12" v-bind="options.btns?.col">
				<a-space wrap>
					<slot name="suffix">
						<a-button type="primary" size="small" @click="emit('search')">
							<template #icon>
								<icon-search />
							</template>
							<template #default>{{ options.btns?.searchBtnText || '搜索' }}</template>
						</a-button>
						<a-button type="outline" size="small" @click="emit('reset')">
							<template #icon>
								<icon-refresh />
							</template>
							<template #default>{{ options.btns?.resetBtnText || '重置' }}</template>
						</a-button>
						<a-button v-if="options.fold?.enable" type="text" size="mini" @click="collapsed = !collapsed">
							<template #icon>
								<icon-up v-if="!collapsed" />
								<icon-down v-else />
							</template>
							<template #default>{{ collapsed ? '展开' : '收起' }}</template>
						</a-button>
					</slot>
				</a-space>
			</a-col>
		</a-row>
	</a-form>
</template>
