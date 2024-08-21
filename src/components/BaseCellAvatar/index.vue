<script lang="ts" setup>
interface IProps {
	avatar: string
	name: string
	isLink?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	avatar: '',
	name: '',
	isLink: false
})

const emit = defineEmits<{
	(e: 'click'): void
}>()
</script>

<template>
	<a-space fill>
		<a-avatar :size="24" shape="circle">
			<img :src="props.avatar" />
		</a-avatar>
		<a-link v-if="props.isLink" @click="emit('click')">{{ props.name }}</a-link>
		<span v-else>{{ props.name }}</span>
	</a-space>
</template>
