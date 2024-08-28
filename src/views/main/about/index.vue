<script lang="ts" setup>
import packageJson from '../../../../package.json'

const data = packageJson
</script>

<template>
	<div class="about-page overflow-y-auto box-border">
		<a-space direction="vertical" :size="20" fill class="about-content box-border">
			<a-descriptions title="生产依赖" bordered table-layout="fixed" :column="{ xs: 1, sm: 1, md: 2, lg: 3 }">
				<a-descriptions-item v-for="(item, index) of data.dependencies" :key="index" :label="index">
					<a-tag color="arcoblue">{{ item }}</a-tag>
				</a-descriptions-item>
			</a-descriptions>

			<a-descriptions title="开发依赖" bordered table-layout="fixed" :column="{ xs: 1, sm: 1, md: 2, lg: 3 }">
				<a-descriptions-item v-for="(item, index) of data.devDependencies" :key="index" :label="index">
					<a-tag color="cyan">{{ item }}</a-tag>
				</a-descriptions-item>
			</a-descriptions>
		</a-space>
	</div>
</template>

<style lang="less" scoped>
:deep(.arco-descriptions-item-label-block) {
	white-space: normal;
	word-break: break-all;
}

.about-page {
	padding: var(--margin);
}

.about-content {
	background: var(--color-bg-1);
	padding: var(--padding);
}
</style>
