<script lang="ts" setup>
interface IProps {
	gender: 1 | 2 | 3
}

const props = withDefaults(defineProps<IProps>(), {
	gender: 3
})
</script>

<template>
	<a-tag v-if="props.gender === 1" color="arcoblue" size="small" class="base-round">
		<template #icon>
			<icon-man />
		</template>
		<template #default>男</template>
	</a-tag>
	<a-tag v-if="props.gender === 2" color="purple" size="small" class="base-round">
		<template #icon>
			<icon-woman />
		</template>
		<template #default>女</template>
	</a-tag>
	<a-tag v-if="props.gender === 3" color="gray" size="small" class="base-round">
		<template #icon>
			<icon-lock />
		</template>
		<template #default>保密</template>
	</a-tag>
</template>

<style lang="less" scoped>
.base-round {
	border-radius: 100px;
}
</style>
