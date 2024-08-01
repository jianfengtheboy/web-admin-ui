<script lang="ts" setup>
import { SystemName } from '@/config/domain'

const router = useRouter()

interface IProps {
	collapsed?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	collapsed: false
})

// 跳转首页
const toHome = () => {
	router.push('/')
}
</script>

<template>
	<section
		class="layout-logo flex items-center flex-shrink-0 cursor-pointer select-none box-border"
		:class="{ collapsed: props.collapsed }"
		@click="toHome"
	>
		<BaseIcon name="logo" :size="32" class="logo" />
		<span class="system-name whitespace-nowrap">{{ SystemName }}</span>
	</section>
</template>

<style lang="less" scoped>
.layout-logo {
	height: 56px;
	padding: 0 var(--padding);
	line-height: 1;
	color: var(--color-text-1);
	background-color: var(--color-bg-1);

	&.collapsed {
		padding: 0;
		justify-content: center;

		.system-name {
			display: none;
		}
	}

	.logo {
		transition: all 0.2s;
	}

	.system-name {
		padding-left: 8px;
		font-size: 16px;
		font-weight: 600;
		transition: color 0.3s;

		&:hover {
			color: var(--color-theme);
			cursor: pointer;
		}
	}
}
</style>
