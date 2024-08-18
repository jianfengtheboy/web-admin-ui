<script lang="ts" setup>
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import { useSettingStore } from '@/store'
import LayoutItem from '../LayoutItem/index.vue'

const settingStore = useSettingStore()

const visible = ref(false)
const open = () => {
	visible.value = true
}

defineExpose({ open })

// 默认显示的主题色列表
const defaultColorList = [
	'#165DFF',
	'#409EFF',
	'#2d8cf0',
	'#007AFF',
	'#5ac8fa',
	'#5856D6',
	'#536dfe',
	'#9c27b0',
	'#AF52DE',
	'#0096c7',
	'#00C1D4',
	'#34C759',
	'#43a047',
	'#7cb342',
	'#c0ca33',
	'#78DEC7',
	'#e53935',
	'#d81b60',
	'#f4511e',
	'#fb8c00',
	'#ffb300',
	'#fdd835',
	'#6d4c41',
	'#546e7a'
]

// 改变主题色
type ColorObj = {
	hex: string
	hsv: { h: number; s: number; v: number }
	rgba: { r: number; g: number; b: number; a: number }
}
const changeColor = (colorObj: ColorObj) => {
	if (!/^#[0-9A-Za-z]{6}/.test(colorObj.hex)) return
	settingStore.setThemeColor(colorObj.hex)
}

const tabModeList: App.TabItem[] = [
	{ label: '卡片', value: 'card' },
	{ label: '间隔卡片', value: 'card-gutter' },
	{ label: '圆角', value: 'rounded' },
	{ label: '自定义', value: 'custom' }
]

const animateModeList: App.AnimateItem[] = [
	{ label: '默认', value: 'fade-slide' },
	{ label: '缩放', value: 'zoom-fade' },
	{ label: '渐变', value: 'fade' },
	{ label: '底部滑出', value: 'fade-bottom' },
	{ label: '缩放消退', value: 'fade-scale' }
]
</script>

<template>
	<a-drawer v-model:visible="visible" title="设置" width="300px" unmount-on-close :footer="false">
		<a-space :size="15" direction="vertical" fill>
			<!-- 系统布局 -->
			<a-divider orientation="center">系统布局</a-divider>
			<a-row justify="center">
				<a-space>
					<LayoutItem mode="left" name="默认布局" @click="settingStore.layout = 'left'" />
					<LayoutItem mode="mix" name="混合布局" @click="settingStore.layout = 'mix'" />
				</a-space>
			</a-row>

			<!-- 系统主题 -->
			<a-divider orientation="center">系统主题</a-divider>
			<a-row justify="center">
				<ColorPicker
					theme="dark"
					class="box-content"
					:color="settingStore.themeColor"
					:sucker-hide="true"
					:colors-default="defaultColorList"
					@change-color="changeColor"
				/>
			</a-row>

			<!-- 界面显示 -->
			<a-divider orientation="center">界面显示</a-divider>
			<a-descriptions :column="1" :align="{ value: 'right' }" :value-style="{ paddingRight: 0 }">
				<a-descriptions-item label="页签显示">
					<a-switch v-model="settingStore.tab" />
				</a-descriptions-item>
				<a-descriptions-item label="页签风格">
					<a-select
						v-model="settingStore.tabMode"
						placeholder="请选择页签风格"
						:options="tabModeList"
						:disabled="!settingStore.tab"
						:style="{ width: '120px' }"
						:trigger-props="{ autoFitPopupMinWidth: true }"
					>
					</a-select>
				</a-descriptions-item>
				<a-descriptions-item label="动画显示">
					<a-switch v-model="settingStore.animate" />
				</a-descriptions-item>
				<a-descriptions-item label="动画风格">
					<a-select
						v-model="settingStore.animateMode"
						placeholder="请选择动画风格"
						:options="animateModeList"
						:disabled="!settingStore.animate"
						:style="{ width: '120px' }"
					>
					</a-select>
				</a-descriptions-item>
				<a-descriptions-item label="深色菜单">
					<a-switch v-model="settingStore.menuDark" />
				</a-descriptions-item>
				<a-descriptions-item label="手风琴效果">
					<a-switch v-model="settingStore.menuAccordion" />
				</a-descriptions-item>
			</a-descriptions>
		</a-space>
	</a-drawer>
</template>

<style lang="less" scoped>
:deep(.arco-descriptions-item-label-block) {
	color: var(--color-text-1);
}
</style>
