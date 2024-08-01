<script lang="ts" setup>
import { IUserDetailResult } from '@/model/user'

const visible = ref(false)
const userId = ref('')
const user = ref<IUserDetailResult | null>()

const open = async (id: string) => {
	try {
		userId.value = id
		const response = await window.$apis.system.getSystemUserDetail({ id: userId.value })
		if (response && response.code === 200) {
			user.value = response.data
			visible.value = true
		}
	} catch (error) {
		console.log(error)
	}
}

defineExpose({ open })
</script>

<template>
	<a-drawer v-model:visible="visible" title="用户详情" width="auto" :footer="false">
		<a-descriptions :column="{ xs: 1, sm: 1, md: 2 }" bordered size="large">
			<a-descriptions-item label="用户名">{{ user?.username }}</a-descriptions-item>
			<a-descriptions-item label="昵称">{{ user?.nickname }}</a-descriptions-item>
			<a-descriptions-item label="角色">{{ user?.roleNames }}</a-descriptions-item>
			<a-descriptions-item label="状态">
				<a-tag v-if="user?.status === 1" color="green">正常</a-tag>
				<a-tag v-if="user?.status === 0" color="red">禁用</a-tag>
			</a-descriptions-item>
			<a-descriptions-item label="性别">
				<span v-if="user?.gender === 0">未知</span>
				<span v-if="user?.gender === 1">男</span>
				<span v-if="user?.gender === 2">女</span>
			</a-descriptions-item>
			<a-descriptions-item label="部门">{{ user?.deptName }}</a-descriptions-item>
			<a-descriptions-item label="联系方式">{{ user?.phone }}</a-descriptions-item>
			<a-descriptions-item label="邮箱">{{ user?.email }}</a-descriptions-item>
			<a-descriptions-item label="创建人">{{ user?.createUserString }}</a-descriptions-item>
			<a-descriptions-item label="创建时间">{{ user?.createTime }}</a-descriptions-item>
			<a-descriptions-item label="描述" :span="2">{{ user?.description }}</a-descriptions-item>
		</a-descriptions>
	</a-drawer>
</template>
