<script lang="ts" setup>
const percent = ref(0)
const percent1 = ref(0)

setTimeout(() => {
	percent.value = 0.75
	percent1.value = 0.68
})
</script>

<template>
	<a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
		<a-card title="访问量" :bordered="false" class="statistic-card flex flex-col h-full">
			<template #extra>
				<a-tag color="green" bordered>日</a-tag>
			</template>
			<div class="flex-1">
				<a-statistic :value="10086" :value-from="0" :start="true" animation show-group-separator />
				<section class="statistic-tip flex items-center">
					<a-space>
						<span>
							<span>日同比 12.5%</span>
							<icon-caret-up style="color: rgb(var(--success-6))" />
						</span>
						<span>
							<span>周同比 5%</span>
							<icon-caret-down style="color: rgb(var(--warning-6))" />
						</span>
					</a-space>
				</section>
			</div>
			<a-divider :margin="16" />
			<a-row justify="space-between">
				<a-typography-text type="secondary">总访问量</a-typography-text>
				<a-typography-text type="secondary">2217万</a-typography-text>
			</a-row>
		</a-card>
	</a-col>
	<a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
		<a-card title="销售额" :bordered="false" class="statistic-card flex flex-col h-full">
			<template #extra>
				<a-tag color="arcoblue" bordered>月</a-tag>
			</template>
			<div class="flex-1">
				<a-statistic :value="72486" :value-from="0" :start="true" animation show-group-separator />
				<section class="analyse__tip">
					<a-progress
						:percent="percent"
						animation
						:color="{
							'0%': 'rgb(var(--success-2))',
							'100%': 'rgb(var(--success-5))'
						}"
					/>
				</section>
			</div>
			<a-divider :margin="16" />
			<a-row justify="space-between">
				<a-typography-text type="secondary">总销售额</a-typography-text>
				<a-typography-text type="secondary">827万</a-typography-text>
			</a-row>
		</a-card>
	</a-col>
	<a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
		<a-card title="订单量" :bordered="false" class="statistic-card flex flex-col h-full">
			<template #extra>
				<a-tag color="orange" bordered>季</a-tag>
			</template>
			<a-row justify="space-between" class="flex-1">
				<div>
					<a-statistic :value="6876" :value-from="0" :start="true" animation show-group-separator />
					<div class="tip">
						<span>
							<span>季同比 8.5%</span>
							<icon-caret-up style="color: rgb(var(--success-6))" />
						</span>
					</div>
				</div>
				<a-progress type="circle" status="warning" :percent="percent1" animation />
			</a-row>
			<a-divider :margin="16" />
			<a-row justify="space-between">
				<a-typography-text type="secondary">转化率</a-typography-text>
				<a-typography-text type="secondary">48%</a-typography-text>
			</a-row>
		</a-card>
	</a-col>
	<a-col :xs="12" :md="12" :lg="6" :xl="6" :xxl="6">
		<a-card title="新增用户" :bordered="false" class="statistic-card flex flex-col h-full">
			<template #extra>
				<a-tag color="purple" bordered>周</a-tag>
			</template>
			<div class="flex-1">
				<a-statistic :value="69" :value-from="0" :start="true" animation>
					<template #suffix>位</template>
				</a-statistic>
				<section class="statistic-tip">
					<a-avatar-group :size="26" :max-count="3">
						<a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
						<a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
						<a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
						<a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
						<a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
					</a-avatar-group>
				</section>
			</div>
			<a-divider :margin="16" />
			<a-row justify="space-between">
				<a-typography-text type="secondary">总用户</a-typography-text>
				<a-typography-text type="secondary">68765人</a-typography-text>
			</a-row>
		</a-card>
	</a-col>
</template>

<style lang="less" scoped>
.statistic-card {
	:deep(.arco-card-body) {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	:deep(.arco-tag-size-medium) {
		width: 24px;
		padding: 0;
		justify-content: center;
	}
}

.statistic-tip {
	height: 30px;
}
</style>
