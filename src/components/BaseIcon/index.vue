<script lang="ts" setup>
defineOptions({ name: 'BaseIcon' })

interface IProps {
	name: string
	color?: string
	size?: string | number
}

const props = withDefaults(defineProps<IProps>(), {
	name: '',
	color: '',
	size: 20
})

// 判断传入的值，是否带有单位，如果没有，就默认用px单位
const getUnitValue = (value: string | number): string | number => {
	return /(px|em|rem|%)$/.test(value.toString()) ? value : value + 'px'
}

const iconSize = computed<string | number>(() => {
	return getUnitValue(props.size)
})

const iconName = computed<string>(() => `#icon-${props.name}`)

const svgClass = computed<string>(() => {
	if (props.name) return `svg-icon icon-${props.name}`
	return 'svg-icon'
})
</script>

<template>
	<svg
		aria-hidden="true"
		:class="svgClass"
		v-bind="$attrs"
		:style="{ color: color, fill: color, width: iconSize, height: iconSize }"
	>
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<style lang="less" scoped>
.svg-icon {
	display: inline-block;
	width: auto;
	height: auto;
	vertical-align: middle;
	flex-shrink: 0;
}
</style>
