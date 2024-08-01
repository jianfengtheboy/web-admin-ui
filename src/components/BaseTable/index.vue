<script lang="ts" setup>
import type { TableInstance } from '@arco-design/web-vue'

defineOptions({
	name: 'BaseTable',
	inheritAttrs: false
})

const refresh = () => {
	emit('refresh')
}
const emit = defineEmits(['refresh'])

const tableRef = ref<TableInstance | null>(null)
defineExpose({ tableRef })

const attrs = useAttrs()
const slots = useSlots()

const stripe = ref(false)
const size = ref<TableInstance['$props']['size']>('small')
const isBordered = ref(true)
const isFullscreen = ref(false)
</script>

<template>
	<div class="base-table flex flex-col overflow-hidden" :class="{ fullscreen: isFullscreen }" ref="baseTableRef">
		<a-row justify="space-between" align="center">
			<a-space wrap>
				<slot name="custom-extra"></slot>
			</a-space>
			<a-space :size="15" wrap>
				<a-tooltip content="斑马纹">
					<a-switch v-model="stripe" size="small" type="round" />
				</a-tooltip>
				<a-tooltip content="刷新">
					<a-button size="mini" class="base-table-btn" @click="refresh">
						<template #icon>
							<icon-refresh :size="18" />
						</template>
					</a-button>
				</a-tooltip>
				<a-tooltip content="全屏">
					<a-button size="mini" class="base-table-btn" @click="isFullscreen = !isFullscreen">
						<template #icon>
							<icon-fullscreen :size="18" v-if="!isFullscreen" />
							<icon-fullscreen-exit :size="18" v-else />
						</template>
					</a-button>
				</a-tooltip>
				<a-tooltip content="显示边框">
					<a-button size="mini" class="base-table-btn" @click="isBordered = !isBordered">
						<template #icon>
							<icon-apps :size="18" />
						</template>
					</a-button>
				</a-tooltip>
				<a-radio-group type="button" size="mini" v-model="size">
					<a-radio value="mini">小</a-radio>
					<a-radio value="small">默认</a-radio>
					<a-radio value="medium">中</a-radio>
					<a-radio value="large">大</a-radio>
				</a-radio-group>
			</a-space>
		</a-row>
		<div class="base-table-box flex-1 overflow-hidden">
			<a-table :stripe="stripe" :size="size" :bordered="{ cell: isBordered }" v-bind="attrs" ref="tableRef">
				<template v-for="key in Object.keys(slots)" :key="key" #[key]="scoped">
					<slot :key="key" :name="key" v-bind="scoped"></slot>
				</template>
			</a-table>
		</div>
	</div>
</template>

<style lang="less" scoped>
.base-table {
	background-color: var(--color-bg-1);

	&.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: var(--padding);
		z-index: 1001;
	}

	.base-table-btn {
		border: none;
	}
}
</style>
