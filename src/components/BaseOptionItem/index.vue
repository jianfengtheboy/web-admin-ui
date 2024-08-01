<script lang="ts" setup>
interface IProps {
	icon?: string
	label?: string
	more?: boolean
	active?: boolean
}

withDefaults(defineProps<IProps>(), {
	icon: '',
	label: '',
	more: false,
	active: false
})

const emit = defineEmits(['click'])

const handleClick = () => {
	emit('click')
}
</script>

<template>
	<li
		class="base-option-item cursor-pointer relative flex items-center select-none"
		:class="{ more: more, active: active }"
		@click="handleClick"
	>
		<section class="flex items-center">
			<span class="icon-wrapper flex items-center">
				<slot name="icon">
					<component :is="icon" :size="16" :stroke-width="2"></component>
				</slot>
			</span>
			<slot>
				<span>{{ label }}</span>
			</slot>
		</section>
		<IconRight v-if="more" />
	</li>
</template>

<style lang="less" scoped>
.base-option-item {
	padding: 0 5px 0 10px;
	height: 34px;
	line-height: 34px;
	color: var(--color-text-2);
	font-size: 14px;

	.icon-wrapper {
		margin-right: 8px;
	}

	&.active,
	&:hover {
		color: rgb(var(--primary-6));
		background: var(--color-primary-light-1);
	}
	&.more {
		justify-content: space-between;
	}
}
</style>
