<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { useSettingStore, useTabsStore } from '@/store'
import MagicIcon from './components/MagicIcon.vue'
import ReloadIcon from './components/ReloadIcon.vue'

const route = useRoute()
const router = useRouter()
const settingStore = useSettingStore()
const tabsStore = useTabsStore()

const calcTabsType = computed(() => (settingStore.tabMode === 'custom' ? 'card' : settingStore.tabMode))

// 重置, 同时把 affix: true 的路由筛选出来
tabsStore.reset()

// 监听路由变化
watch(
	() => route.path,
	() => {
		handleRouteChange()
	}
)

// 路由发生改变触发
const handleRouteChange = () => {
	const item = { ...route } as unknown as RouteRecordRaw
	tabsStore.addTagItem(toRaw(item))
	tabsStore.addCacheItem(toRaw(item))
}
handleRouteChange()

// 点击页签
const handleTabClick = (key: string) => {
	router.push({ path: key })
}
</script>

<template>
	<div class="layout-tabbar" v-if="settingStore.tab">
		<a-tabs
			editable
			hide-content
			size="small"
			:class="{ 'tabs-type-custom': settingStore.tabMode === 'custom' }"
			:type="calcTabsType"
			:active-key="route.path"
			@tab-click="(key) => handleTabClick(key as string)"
			@delete="tabsStore.closeCurrent"
		>
			<a-tab-pane
				v-for="item of tabsStore.tagList"
				:key="item.path"
				:title="(item.meta?.title as string)"
				:closable="Boolean(!item.meta?.affix)"
			>
			</a-tab-pane>
			<template #extra>
				<a-space size="medium">
					<ReloadIcon />
					<a-dropdown trigger="hover">
						<MagicIcon />
						<template #content>
							<a-doption @click="tabsStore.closeCurrent(route.path)">
								<template #icon>
									<icon-close />
								</template>
								<template #default>关闭当前</template>
							</a-doption>
							<a-doption @click="tabsStore.closeOther(route.path)">
								<template #icon>
									<icon-eraser />
								</template>
								<template #default>关闭其他</template>
							</a-doption>
							<a-doption @click="tabsStore.closeAll">
								<template #icon>
									<icon-minus />
								</template>
								<template #default>关闭全部</template>
							</a-doption>
						</template>
					</a-dropdown>
				</a-space>
			</template>
		</a-tabs>
	</div>
</template>

<style lang="less" scoped>
:deep(.arco-tabs-nav-tab) {
	.arco-tabs-tab {
		border-bottom-color: transparent !important;
		svg {
			width: 0;
			transition: all 0.15s;
		}
		&:hover {
			svg {
				width: 1em;
			}
		}
	}
	&:not(.arco-tabs-nav-tab-scroll) {
		.arco-tabs-tab:first-child {
			border-left: 0;
		}
	}
}

:deep(.tabs-type-custom) {
	.arco-tabs-nav-tab {
		.arco-tabs-tab {
			padding: 5px 20px;
			border: none;
			-webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
			mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
			-webkit-mask-size: 100% 100%;
			mask-size: 100% 100%;
		}
	}

	.arco-tabs-nav-tab-list {
		.arco-tabs-tab-active {
			background-color: rgba(var(--primary-6), 0.1);
			padding: 5px 20px;
			-webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
			mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
			-webkit-mask-size: 100% 100%;
			mask-size: 100% 100%;

			&:hover {
				padding: 5px 20px;
				background-color: rgba(var(--primary-6), 0.1);
				-webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
				mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
				-webkit-mask-size: 100% 100%;
				mask-size: 100% 100%;
			}
		}
	}
}

:deep(.arco-dropdown-option-icon) {
	color: var(--color-text-3);
}

.layout-tabbar {
	padding-top: 4px;
	background-color: var(--color-bg-1);
}
</style>
