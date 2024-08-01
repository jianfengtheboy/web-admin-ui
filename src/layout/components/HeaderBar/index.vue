<script lang="ts" setup>
import HeaderRightBar from '../components/HeaderRightBar/index.vue'
import FoldBtn from '../components/FoldBtn/index.vue'
</script>

<template>
	<a-layout-header class="layout-headerbar flex items-center">
		<section class="layout-menu-fold absolute">
			<FoldBtn />
		</section>
		<a-row align="center" class="h-full header-right flex-1 overflow-hidden">
			<a-col :xs="0" :md="10" :lg="10" :xl="12" :xxl="12">
				<BaseBreadCrumb />
			</a-col>
			<a-col :xs="24" :md="14" :lg="14" :xl="12" :xxl="12">
				<HeaderRightBar />
			</a-col>
		</a-row>
	</a-layout-header>
</template>

<style lang="less" scoped>
.layout-headerbar {
	padding: 0 var(--padding);
	height: 56px;
	background-color: var(--color-bg-1);
	border-bottom: 1px solid var(--color-neutral-3);
}
</style>
