<script lang="ts" setup>
import { useNoticeStore } from '@/store'

const noticeStore = useNoticeStore()
// 通知数据
const noticeList = computed(() => noticeStore.noticeData.filter(item => item.type === 1))
// 代办数据
const todoList = computed(() => noticeStore.noticeData.filter(item => item.type === 2))

// 代办
const onTodoAction = item => {
	// todo something
	console.log(item)
}
</script>

<template>
	<div class="header-message">
		<a-tabs default-active-key="1">
			<a-tab-pane key="1">
				<template #title>{{ `通知（${noticeList.length}）` }}</template>
				<section v-if="noticeList.length > 0">
					<a-comment
						v-for="(item, index) in noticeList"
						:key="index"
						:author="item.name"
						:content="item.content"
						:datetime="item.datetime"
					>
						<template #avatar>
							<a-avatar>
								<img :src="item.avatar" />
							</a-avatar>
						</template>
					</a-comment>
				</section>
				<a-empty v-else description="暂无通知" />
			</a-tab-pane>
			<a-tab-pane key="3">
				<template #title>{{ `待办（${todoList.length}）` }}</template>
				<section v-if="todoList.length > 0">
					<a-comment v-for="(item, index) in todoList" :key="index" :author="item.name" :datetime="item.datetime">
						<template #avatar>
							<a-avatar>
								<img :src="item.avatar" />
							</a-avatar>
						</template>
						<template #content>
							<span class="cursor-pointer overflow-hidden text-ellipsis todo-item" @click="onTodoAction(item)">
								{{ item.content }}
							</span>
						</template>
					</a-comment>
				</section>
				<a-empty v-else description="暂无待办" />
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<style lang="less" scoped>
.header-message {
	width: 245px;

	:deep(.arco-tabs-nav) {
		justify-content: center;
	}

	:deep(.arco-tabs-nav-tab) {
		flex: none;
	}

	.todo-item {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

		&:hover {
			color: var(--color-theme);
		}
	}
}
</style>
