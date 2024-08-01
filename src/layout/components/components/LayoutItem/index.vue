<script lang="ts" setup>
interface IProps {
	mode: 'left' | 'mix'
}

withDefaults(defineProps<IProps>(), {})

const emit = defineEmits(['click'])
</script>

<template>
	<div
		class="layout-item overflow-hidden cursor-pointer box-border relative"
		:class="`layout-item-${mode}`"
		@click="emit('click')"
	/>
</template>

<style lang="less" scoped>
.layout-item {
	width: 60px;
	height: 50px;
	background-color: var(--color-fill-3);
	border-radius: 3px;

	&::before {
		content: '';
		width: 12px;
		height: 100%;
		background-color: rgb(var(--gray-9));
		position: absolute;
		top: 0;
		left: 0;
	}
	&::after {
		content: '';
		width: 100%;
		height: 10px;
		background-color: rgb(var(--gray-9));
		position: absolute;
		top: 0;
		left: 0;
		display: none;
	}
	&-mix {
		&::before,
		&::after {
			display: block;
		}
	}
}
</style>
