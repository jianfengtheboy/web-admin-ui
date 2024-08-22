<script lang="ts" setup>
import { Message, type TableInstance } from '@arco-design/web-vue'
import { useDevice, useDict, useTable } from '@/hooks'
import { IDeptItem } from '@/model/dept'
import { formatParams } from '@/utils/common'
import AddModal from './components/addModal.vue'

const { isMobile } = useDevice()
const { data: options } = useDict({ code: 'status' })

const form = reactive({
	name: '',
	status: ''
})

const tableRef = ref<TableInstance>()

const {
	loading,
	tableData: deptList,
	selectedKeys,
	search,
	select,
	selectAll,
	handleDelete
} = useTable(() => window.$apis.system.getSystemDeptList({ ...formatParams(form) }), {
	immediate: true,
	onSuccess: () => {
		nextTick(() => {
			tableRef.value?.expandAll(true)
		})
	}
})

// 重置
const reset = () => {
	form.name = ''
	form.status = ''
	search()
}

// 新增
const addModalRef = ref<InstanceType<typeof AddModal>>()
const onAddAction = () => {
	addModalRef.value?.add()
}

// 编辑
const onEditAction = (item: IDeptItem) => {
	addModalRef.value?.edit(item.id)
}

// 新增下级部门
const onAddSubAction = (item: IDeptItem) => {
	addModalRef.value?.add(item)
}

// 批量删除
const onDeleteAction = () => {
	if (!selectedKeys.value.length) {
		return Message.warning('请选择要删除的数据')
	}
	handleDelete(() => window.$apis.system.deleteSystemDept({ ids: selectedKeys.value as string[] }))
}

// 删除
const onDelete = async (item: IDeptItem) => {
	return handleDelete(() => window.$apis.system.deleteSystemDept({ ids: [item.id] }), { showModal: false })
}
</script>

<template>
	<div class="base-page dept-page">
		<div class="main-content">
			<a-space wrap class="mb-1.5">
				<a-input v-model="form.name" placeholder="请输入部门名称搜索" allow-clear :style="{ width: '260px' }">
					<template #prefix><icon-search /></template>
				</a-input>
				<a-select
					v-model="form.status"
					:options="options"
					placeholder="请选择状态"
					allow-clear
					:style="{ width: '160px' }"
				/>
				<a-button type="primary" size="small" @click="search">
					<template #icon>
						<icon-search />
					</template>
					<span>搜索</span>
				</a-button>
				<a-button type="outline" size="small" @click="reset">
					<template #icon>
						<icon-refresh />
					</template>
					<span>重置</span>
				</a-button>
			</a-space>
			<a-space wrap class="mb-1.5">
				<a-button v-hasPerm="['system:dept:add']" type="primary" size="small" @click="onAddAction">
					<template #icon>
						<icon-plus />
					</template>
					<span>新增</span>
				</a-button>
				<a-button
					v-hasPerm="['system:dept:delete']"
					type="primary"
					status="danger"
					size="small"
					@click="onDeleteAction"
				>
					<template #icon>
						<icon-delete />
					</template>
					<span>删除</span>
				</a-button>
			</a-space>

			<a-table
				ref="tableRef"
				row-key="id"
				:bordered="{ cell: true }"
				:data="deptList"
				:loading="loading"
				:scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
				:pagination="false"
				:row-selection="{ type: 'checkbox', showCheckedAll: false }"
				:selected-keys="selectedKeys"
				@select="select"
				@select-all="selectAll"
			>
				<template #expand-icon="{ expanded }">
					<IconDown v-if="expanded" />
					<IconRight v-else />
				</template>
				<template #columns>
					<a-table-column title="部门名称" data-index="name" :width="200" />
					<a-table-column title="排序" data-index="sort" :width="60" align="center" />
					<a-table-column title="状态" :width="100" align="center">
						<template #cell="{ record }">
							<BaseCellStatus :status="record.status" />
						</template>
					</a-table-column>
					<a-table-column title="描述" data-index="description" :width="250" align="center" />
					<a-table-column title="创建时间" data-index="createTime" :width="200" align="center" />
					<a-table-column title="操作" :width="245" align="center" :fixed="!isMobile ? 'right' : undefined">
						<template #cell="{ record }">
							<a-space>
								<a-button v-hasPerm="['system:dept:edit']" type="primary" size="mini" @click="onEditAction(record)">
									<template #icon>
										<icon-edit />
									</template>
									<span>编辑</span>
								</a-button>
								<a-button
									v-show="record.parentId"
									v-hasPerm="['system:dept:add']"
									type="primary"
									status="success"
									size="mini"
									@click="onAddSubAction(record)"
								>
									<template #icon>
										<icon-plus />
									</template>
									<span>新增</span>
								</a-button>
								<a-popconfirm
									type="warning"
									:content="`您确定确定删除 '${record.name}' 吗?`"
									@before-ok="onDelete(record)"
								>
									<a-button v-hasPerm="['system:dept:delete']" type="primary" status="danger" size="mini">
										<template #icon>
											<icon-delete />
										</template>
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
	</div>
</template>
