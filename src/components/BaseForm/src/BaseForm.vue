<script lang="ts" setup>
import type { Options, Columns, ColumnsItemHide, ColumnsItem } from './type'
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

const isHide = (hide?: ColumnsItemHide<boolean | object>) => {
	if (hide === undefined) return false
	if (typeof hide === 'boolean') return hide
	if (typeof hide === 'function') {
		return hide(props.modelValue)
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
					i.request(props.modelValue).then(res => {
						dicData[i.field] = i.resultFormat ? i.resultFormat(res) : res.data
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
	<a-form :auto-label-width="true" v-bind="options.form" ref="formRef" :model="modelValue">
		<a-row :gutter="14" v-bind="options.row" class="w-full">
			<template v-for="(item, index) in columns" :key="item.field">
				<a-col
					v-if="!isHide(item.hide)"
					:span="item.span || 12"
					v-bind="item.col || item.span ? item.col : options.col"
					v-show="index <= (options.fold?.index || 0) || (index >= (options.fold?.index || 0) && !collapsed)"
				>
					<a-form-item v-bind="item.item" :label="item.label" :field="item.field" :rules="item.rules">
						<slot :name="item.field">
							<!-- 输入框 -->
							<template v-if="item.type === 'input'">
								<a-input
									:allow-clear="true"
									:placeholder="item.placeholder || `请输入${item.label}`"
									:max-length="20"
									v-bind="(item.props as A.InputInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 数字输入框 -->
							<template v-if="item.type === 'input-number'">
								<a-input-number
									:placeholder="item.placeholder || `请输入${item.label}`"
									v-bind="(item.props as A.InputNumberInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 文本域 -->
							<template v-if="item.type === 'textarea'">
								<a-textarea
									:allow-clear="true"
									:placeholder="item.placeholder || `请输入${item.label}`"
									:max-length="200"
									:show-word-limit="true"
									v-bind="(item.props as A.TextareaInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 选择器 -->
							<template v-if="item.type === 'select'">
								<a-select
									:allow-clear="true"
									:placeholder="item.placeholder || `请选择${item.label}`"
									v-bind="(item.props as A.SelectInstance['$props'])"
									:options="dicData[item.field] || (item.options as A.SelectInstance['$props']['options'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 级联选择器 -->
							<template v-if="item.type === 'cascader'">
								<a-cascader
									:allow-clear="true"
									:placeholder="item.placeholder || `请选择${item.label}`"
									v-bind="(item.props as A.CascaderInstance['$props'])"
									:options="dicData[item.field] || (item.options as A.CascaderInstance['$props']['options'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 树选择 -->
							<template v-if="item.type === 'tree-select'">
								<a-tree-select
									:allow-clear="true"
									:placeholder="item.placeholder || `请选择${item.label}`"
									v-bind="(item.props as A.TreeSelectInstance['$props'])"
									:data="dicData[item.field] || (item.data as A.TreeSelectInstance['$props']['data'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 单选框 -->
							<template v-if="item.type === 'radio-group'">
								<a-radio-group
									v-bind="(item.props as A.RadioGroupInstance['$props'])"
									:options="dicData[item.field] || (item.options as A.RadioGroupInstance['$props']['options'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 复选框 -->
							<template v-if="item.type === 'checkbox-group'">
								<a-checkbox-group
									v-bind="(item.props as A.CheckboxGroupInstance['$props'])"
									:options="dicData[item.field] || (item.options as A.CheckboxGroupInstance['$props']['options'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 日期选择器 -->
							<template v-if="item.type === 'date-picker'">
								<a-date-picker
									:allow-clear="true"
									:placeholder="item.placeholder || `请选择日期`"
									v-bind="(item.props as A.DatePickerInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 时间选择器 -->
							<template v-if="item.type === 'time-picker'">
								<a-time-picker
									:allow-clear="true"
									:placeholder="item.placeholder || `请选择时间`"
									v-bind="(item.props as A.TimePickerInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 评分 -->
							<template v-if="item.type === 'rate'">
								<a-rate
									:allow-clear="true"
									v-bind="(item.props as A.RateInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 开关 -->
							<template v-if="item.type === 'switch'">
								<a-switch
									v-bind="(item.props as A.SwitchInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
							<!-- 滑动输入条 -->
							<template v-if="item.type === 'slider'">
								<a-slider
									v-bind="(item.props as A.SliderInstance['$props'])"
									:model-value="modelValue[item.field as keyof typeof modelValue]"
									@update:model-value="valueChange($event, item.field)"
								/>
							</template>
						</slot>
					</a-form-item>
				</a-col>
			</template>
			<a-col :span="options.btns?.span || 12" v-bind="options.btns?.col" v-if="!options.btns?.hide">
				<a-space wrap>
					<slot name="suffix">
						<a-button type="primary" size="small" @click="emit('search')">
							<template #icon><icon-search /></template>
							<template #default>{{ options.btns?.searchBtnText || '搜索' }}</template>
						</a-button>
						<a-button type="outline" size="small" @click="emit('reset')">
							<template #icon><icon-refresh /></template>
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

<style lang="less" scoped></style>
