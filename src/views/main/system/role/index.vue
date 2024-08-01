<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useTable, useDevice } from '@/hooks'
import { formatParams } from '@/utils/common'
import { IRoleItem } from '@/model/role'
import AddModal from './components/addModal.vue'
import PermiModal from './components/permiModal.vue'

const { isMobile } = useDevice()

const form = reactive({
	name: '',
	status: ''
})

const {
	loading,
	tableData: roleList,
	pagination,
	selectedKeys,
	search,
	select,
	selectAll,
	handleDelete
} = useTable(
	pagin => window.$apis.system.getSystemRoleList({ pageNum: pagin.page, pageSize: pagin.size, ...formatParams(form) }),
	{
		immediate: true
	}
)

// 重置
const reset = () => {
	form.name = ''
	form.status = ''
	search()
}

// 新增
const addModalRef = ref<InstanceType<typeof AddModal>>()
const onAddAction = () => {
	addModalRef.value && addModalRef.value?.add()
}

// 编辑
const onEditAction = (item: IRoleItem) => {
	addModalRef.value && addModalRef.value?.edit(item.id)
}

// 删除
const onDelete = (item: IRoleItem) => {
	return handleDelete(() => window.$apis.system.deleteSystemRole({ ids: [item.id] }), { showModal: false })
}

// 批量删除
const onDeleteAction = () => {
	if (!selectedKeys.value.length) {
		return Message.warning('请选择要删除的角色！')
	}
	handleDelete(() => window.$apis.system.deleteSystemRole({ ids: selectedKeys.value as string[] }))
}

// 分配权限
const permiModalRef = ref<InstanceType<typeof PermiModal>>()
const onPermAction = (item: IRoleItem) => {
	permiModalRef.value && permiModalRef.value?.open({ code: item.code, title: item.name })
}
</script>

<template>
	<div class="base-page role-page">
		<div class="main-content">
			<a-space wrap class="mb-1.5">
				<a-input v-model="form.name" placeholder="请输入角色名称搜索" allow-clear :style="{ width: '260px' }">
					<template #prefix><icon-search /></template>
				</a-input>
				<a-select v-model="form.status" placeholder="请选择状态" allow-clear :style="{ width: '160px' }">
					<a-option :value="1">正常</a-option>
					<a-option :value="0">禁用</a-option>
				</a-select>
				<a-button type="primary" size="small" @click="search">
					<template #icon><icon-search /></template>
					<span>查询</span>
				</a-button>
				<a-button type="outline" size="small" @click="reset">
					<template #icon><icon-refresh /></template>
					<span>重置</span>
				</a-button>
			</a-space>
			<a-space wrap class="mb-1.5">
				<a-button v-hasPerm="['system:role:add']" type="primary" size="small" @click="onAddAction">
					<template #icon><icon-plus /></template>
					<span>新增</span>
				</a-button>
				<a-button
					v-hasPerm="['system:role:delete']"
					type="primary"
					status="danger"
					size="small"
					@click="onDeleteAction"
				>
					<template #icon><icon-delete /></template>
					<span>删除</span>
				</a-button>
			</a-space>

			<a-table
				row-key="id"
				:data="roleList"
				:bordered="{ cell: true }"
				:loading="loading"
				:scroll="{ x: '100%', y: '100%', minWidth: 900 }"
				:pagination="pagination"
				page-position="bottom"
				:row-selection="{ type: 'checkbox', showCheckedAll: true }"
				:selected-keys="selectedKeys"
				@select="select"
				@select-all="selectAll"
			>
				<template #columns>
					<a-table-column title="序号" :width="64" align="center">
						<template #cell="cell">{{ cell.rowIndex + 1 }}</template>
					</a-table-column>
					<a-table-column title="角色名称" data-index="name" align="center" />
					<a-table-column title="角色编码" data-index="code" align="center" />
					<a-table-column title="状态" :width="100" align="center">
						<template #cell="{ record }">
							<a-tag v-if="record.status == 1" color="green">正常</a-tag>
							<a-tag v-if="record.status == 0" color="red">禁用</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="描述" data-index="description" align="center" />
					<a-table-column title="创建时间" data-index="createTime" :width="180" align="center" />
					<a-table-column title="操作" :width="280" align="center" :fixed="!isMobile ? 'right' : undefined">
						<template #cell="{ record }">
							<a-space>
								<a-button
									v-hasPerm="['system:role:edit']"
									type="primary"
									size="mini"
									:disabled="record.disabled"
									@click="onEditAction(record)"
								>
									<template #icon><icon-edit /></template>
									<span>编辑</span>
								</a-button>
								<a-button
									v-hasPerm="['system:role:allocation']"
									type="primary"
									status="success"
									size="mini"
									:disabled="record.disabled"
									@click="onPermAction(record)"
								>
									<template #icon><icon-safe /></template>
									<template #default>分配权限</template>
								</a-button>
								<a-popconfirm type="warning" content="确定删除该角色吗?" @before-ok="onDelete(record)">
									<a-button
										v-hasPerm="['system:role:delete']"
										type="primary"
										status="danger"
										size="mini"
										:disabled="record.disabled"
									>
										<template #icon><icon-delete /></template>
										<span>删除</span>
									</a-button>
								</a-popconfirm>
							</a-space>
						</template>
					</a-table-column>
				</template>
			</a-table>
		</div>

		<!-- 新增、编辑 -->
		<AddModal ref="addModalRef" @save-success="search" />

		<!-- 权限分配 -->
		<PermiModal ref="permiModalRef" @save-success="search" />
	</div>
</template>
