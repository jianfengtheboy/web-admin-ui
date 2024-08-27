<script lang="ts" setup>
import Dayjs from 'dayjs'
import { useAppStore } from '@/store'

const appStore = useAppStore()

// 获取当前时间
const nowTime = ref('')
const fetchNowTime = () => {
	const weekList = ['日', '一', '二', '三', '四', '五', '六']
	return `${Dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')} 星期${weekList[Dayjs(new Date()).day()]}`
}

// 初始化时间
const initTime = () => {
	nowTime.value = fetchNowTime()
	setInterval(() => {
		nowTime.value = fetchNowTime()
	}, 1000)
}

initTime()

const goodTimeText = computed(() => {
	const hour = Dayjs().hour()
	const timeText = hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
	const tipsText =
		hour < 9
			? '无须缅怀昨天，不必奢望明天，认真过好每个今天！'
			: hour <= 11
			? '愿阳光洒满你的每一天，好运与微笑常伴左右，今天也要元气满满！'
			: hour <= 13
			? '一方静土，你我用心营造！'
			: hour < 20
			? '愿你的心情如午后阳光般明媚，享受每一刻的舒心与愉快！'
			: '夜幕降临，星河灿烂，愿你心中宁静，梦境甜美！'
	return `${timeText}！${appStore.userInfo.nickName}。${tipsText}`
})
</script>

<template>
	<a-card title="工作台" :bordered="false" size="medium">
		<template #extra>
			<div v-if="nowTime" class="now-time flex items-center">
				<BaseIcon name="time" :size="20" />
				<p class="truncate ml-1.5">{{ nowTime }}</p>
			</div>
		</template>
		<a-row align="center" wrap :gutter="[{ xs: 0, sm: 14, md: 14, lg: 14, xl: 14, xxl: 14 }, 16]">
			<a-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16" :xxl="18">
				<a-space size="medium">
					<a-avatar :size="68">
						<img :src="appStore.userInfo.avatar" />
					</a-avatar>
					<div class="tips my-2">
						<p class="tips-title mb-2.5 text-base">{{ goodTimeText }}</p>
						<p>今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
					</div>
				</a-space>
			</a-col>
			<a-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8" :xxl="6">
				<a-row justify="space-between" align="center">
					<a-statistic :value="16" :value-from="0" :start="true" animation>
						<template #title>
							<a-space>
								<BaseIcon name="icon-num"></BaseIcon>
								<span>项目数</span>
							</a-space>
						</template>
					</a-statistic>
					<a-statistic :value="3" :value-from="0" :start="true" animation>
						<template #title>
							<a-space>
								<BaseIcon name="icon-wait"></BaseIcon>
								<span>待办</span>
							</a-space>
						</template>
						<template #suffix>/15</template>
					</a-statistic>
					<a-statistic :value="35" :value-from="0" :start="true" animation>
						<template #title>
							<a-space>
								<BaseIcon name="icon-msg"></BaseIcon>
								<span>消息</span>
							</a-space>
						</template>
					</a-statistic>
				</a-row>
			</a-col>
		</a-row>
	</a-card>
</template>

<style lang="less" scoped>
@import url('@/assets/fonts/font.css');

:deep(.arco-statistic-title) {
	margin-bottom: 0;
}

.now-time {
	font-family: DINPro-Medium;
	color: var(--color-text-1);
}

.tips {
	color: var(--color-text-3);

	&-title {
		color: var(--color-text-1);
	}
}
</style>
