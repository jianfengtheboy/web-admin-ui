<script lang="ts" setup>
interface IProps {
	code: number
}

const props = withDefaults(defineProps<IProps>(), {
	code: 403
})

const router = useRouter()

const countDownTime = ref(5)
let timer = ref()

onMounted(() => {
	onCountDownTime()
})

onBeforeUnmount(() => {
	clearInterval(timer.value)
})

// 返回页面
const back = () => {
	router.replace({ path: '/' })
}

// 倒计时
const onCountDownTime = () => {
	timer.value = setInterval(() => {
		if (countDownTime.value) {
			countDownTime.value--
		} else {
			back()
			clearInterval(timer.value)
		}
	}, 1000)
}
</script>

<template>
	<div class="error-page w-full h-full flex items-center justify-center">
		<section class="flex items-center flex-col">
			<div class="w-full relative overflow-hidden flex items-center justify-center">
				<BaseIcon class="error-icon" :name="`${props.code}`"></BaseIcon>
			</div>

			<div class="flex items-center flex-col">
				<div class="error-tip-a font-bold opacity-0">抱歉!</div>
				<div class="error-tip-b font-bold opacity-0">当前页面不存在...</div>
				<div class="error-tip-c text-center opacity-0">请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
				<a-button type="primary" shape="round" size="large" @click="back">{{ countDownTime }} 返回首页</a-button>
			</div>
		</section>
	</div>
</template>

<style lang="less" scoped>
.error {
	&-page {
		background-color: var(--color-bg-1);
	}

	&-icon {
		width: 90% !important;
		height: 50vh !important;
	}

	&-tip {
		&-a {
			margin-bottom: 20px;
			font-size: 32px;
			line-height: 40px;
			color: rgb(var(--primary-6));
			animation-name: slideUp;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
		}

		&-b {
			margin-bottom: 10px;
			font-size: 20px;
			line-height: 24px;
			color: var(--color-text-1);
			animation-name: slideUp;
			animation-duration: 0.5s;
			animation-delay: 0.1s;
			animation-fill-mode: forwards;
		}

		&-c {
			padding: 0 30px;
			margin-bottom: 20px;
			font-size: 14px;
			line-height: 20px;
			color: var(--color-text-2);
			animation-name: slideUp;
			animation-duration: 0.5s;
			animation-delay: 0.2s;
			animation-fill-mode: forwards;
		}
	}
}

@keyframes slideUp {
	0% {
		opacity: 0;
		transform: translateY(60px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
