<template>
	<BaseIcon v-if="props.svgIcon" :name="props.svgIcon" :size="24" />
	<component v-else-if="props.icon" :is="props.icon" :size="16" />
</template>

<script lang="ts" setup>
interface IProps {
	svgIcon?: string
	icon?: string
}

const props = defineProps<IProps>()
</script>
