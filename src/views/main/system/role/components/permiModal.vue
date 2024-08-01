<script lang="ts" setup>
import { Message, type TreeInstance } from '@arco-design/web-vue'
import { useDevice } from '@/hooks'
import { IMenuOptionsItem } from '@/model/menu'

const emit = defineEmits<{
	(e: 'save-success'): void
}>()

const { isMobile } = useDevice()

const treeRef = ref<TreeInstance>()
const treeData = ref<IMenuOptionsItem[]>([])
const getTreeData = async () => {
	try {
		const response = await window.$apis.system.getSystemMenuOptions()
		if (response && response.code === 200) {
			treeData.value = response.data
			nextTick(() => {
				treeRef.value?.expandAll()
			})
		}
	} catch (error) {
		console.log(error)
	}
}

// 打开弹窗
const visible = ref(false)
const menuIds = ref<string[]>([])
const open = async (data: { code: string; title: string }) => {
	await getTreeData()
	try {
		menuIds.value = []
		const response = await window.$apis.system.getSystemRoleMenuIds({ role: data.code })
		if (response && response.code === 200) {
			menuIds.value = response.data
		}
		visible.value = true
	} catch (error) {
		console.log(error)
	}
}

defineExpose({ open })

// 保存
const save = async () => {
	try {
		const response = await window.$apis.system.saveSystemRoleMenuIds({ ids: menuIds.value })
		if (response && response.code === 200) {
			Message.success(response.message)
			emit('save-success')
			return true
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}
</script>

<template>
	<a-modal v-model:visible="visible" title="分配权限" :fullscreen="isMobile" :mask-closable="true" @ok="save">
		<a-tree
			ref="treeRef"
			size="small"
			checkable
			:check-strictly="true"
			v-model:checked-keys="menuIds"
			:data="treeData"
			:fieldNames="{ key: 'id' }"
		/>
	</a-modal>
</template>
