<script lang="ts" setup>
const list = [
	{ name: '用户', icon: 'icon-user' },
	{ name: '分析', icon: 'icon-analyse' },
	{ name: '商品', icon: 'icon-goods' },
	{ name: '订单', icon: 'icon-order' },
	{ name: '票据', icon: 'icon-paper' },
	{ name: '标签', icon: 'icon-label' },
	{ name: '流程', icon: 'icon-process' },
	{ name: '配置', icon: 'icon-config' }
]
</script>

<template>
	<a-col v-for="item in list" :key="item.name" class="fade-up" :xs="12" :sm="8" :md="4" :lg="4" :xl="3" :xxl="3">
		<a-card hoverable :bordered="false" class="entrance-card mb-3.5">
			<a-row justify="center" align="center" class="entrance-row">
				<BaseIcon :name="item.icon" :size="30" color="rgb(var(--primary-3))" />
				<span class="mt-2">{{ item.name }}</span>
			</a-row>
		</a-card>
	</a-col>
</template>

<style lang="less" scoped>
.entrance-card {
	transition: transform 0.3s;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		cursor: pointer;
	}
}

.entrance-row {
	flex-direction: column;
}

.fade-up {
	opacity: 0;
	animation-name: fade-up;
	animation-duration: 0.6s;
	animation-fill-mode: forwards;
	animation-delay: 0.5s;
}

@keyframes fade-up {
	0% {
		transform: translateY(60px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
