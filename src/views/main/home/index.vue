<script lang="ts" setup>
import Staging from './components/staging.vue'
</script>

<template>
	<div class="base-page home-page">
		<a-row class="home-content">
			<a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :xxl="24">
				<Staging />
			</a-col>
		</a-row>
	</div>
</template>

<style lang="less" scoped></style>
