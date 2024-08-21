<script lang="ts" setup>
interface IProps {
	icon?: string
	label?: string
	more?: boolean
	active?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	icon: '',
	label: '',
	more: false,
	active: false
})

const emit = defineEmits<{
	(e: 'click'): void
}>()

const handleClick = () => {
	emit('click')
}
</script>

<template>
	<li
		class="base-option-item cursor-pointer relative flex items-center select-none"
		:class="{ more: props.more, active: props.active }"
		@click="handleClick"
	>
		<div class="flex items-center">
			<span class="icon-wrapper flex items-center">
				<slot name="icon">
					<BaseIcon :name="props.icon" :size="16" />
				</slot>
			</span>
			<slot>
				<span>{{ props.label }}</span>
			</slot>
		</div>
		<IconRight v-if="props.more" />
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
