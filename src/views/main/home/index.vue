<script lang="ts" setup>
import Staging from './components/staging.vue'
import Statistics from './components/statistics.vue'
import Entrance from './components/entrance.vue'
import LineChart from './components/lineChart.vue'
import BarChart from './components/barChart.vue'
</script>

<template>
	<div id="homepage" class="base-page home-page">
		<a-row class="home-content mb-3.5">
			<a-col :span="24">
				<Staging />
			</a-col>
		</a-row>
		<a-row :gutter="[14, 14]" align="stretch">
			<Statistics />
		</a-row>
		<a-row :gutter="14" class="mt-3.5">
			<Entrance />
		</a-row>
		<a-row :gutter="[14, 14]" align="stretch">
			<a-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" :xxl="14">
				<LineChart />
			</a-col>
			<a-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10" :xxl="10">
				<BarChart />
			</a-col>
		</a-row>

		<a-back-top :visible-height="100" target-container="#homepage">
			<BaseIcon name="backtop" :size="50" class="cursor-pointer" />
		</a-back-top>
	</div>
</template>

<style lang="less" scoped></style>
