<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useTable } from '@/hooks'
import { IDictDataItem } from '@/model/dict'
import DictAddModal from './components/dictAddModal.vue'

const visible = ref(false)

const dictCode = ref('')
const open = (data: { code: string }) => {
	tableData.value = []
	dictCode.value = data.code
	visible.value = true
	search()
}
defineExpose({ open })

const { loading, tableData, pagination, selectedKeys, search, select, selectAll, handleDelete } = useTable(
	pagin =>
		window.$apis.system.getSystemDictDataList({ pageNum: pagin.page, pageSize: pagin.size, code: dictCode.value }),
	{
		immediate: false
	}
)

// 新增
const dictAddModalRef = ref<InstanceType<typeof DictAddModal>>()
const onAddAction = () => {
	dictAddModalRef.value?.add()
}

// 编辑
const onEditAction = (item: IDictDataItem) => {
	dictAddModalRef.value?.edit({ id: item.id, code: dictCode.value })
}

// 批量删除
const onDeleteAction = () => {
	if (!selectedKeys.value.length) {
		return Message.warning('请选择要删除的字典数据！')
	}
	handleDelete(() =>
		window.$apis.system.deleteSystemDictData({ ids: selectedKeys.value as string[], code: dictCode.value })
	)
}

// 删除
const onDelete = (item: IDictDataItem) => {
	return handleDelete(() => window.$apis.system.deleteSystemDictData({ ids: [item.id], code: dictCode.value }), {
		showModal: false
	})
}
</script>

<template>
	<a-modal
		v-model:visible="visible"
		title="字典数据"
		width="90%"
		hide-cancel
		draggable
		ok-text="关闭"
		:okButtonProps="{
			type: 'outline',
			status: 'danger'
		}"
		:mask-closable="false"
		:modal-style="{ maxWidth: '680px' }"
	>
		<a-space wrap class="mb-1.5">
			<a-button type="primary" size="small" @click="onAddAction">
				<template #icon>
					<icon-plus />
				</template>
				<span>新增</span>
			</a-button>
			<a-button type="primary" status="danger" size="small" @click="onDeleteAction">
				<template #icon>
					<icon-delete />
				</template>
				<span>删除</span>
			</a-button>
		</a-space>

		<a-table
			row-key="id"
			size="small"
			:data="tableData"
			:bordered="{ cell: true }"
			:loading="loading"
			:scroll="{ x: '100%', y: '100%', minWidth: 400 }"
			:pagination="{ ...pagination, size: 'small' }"
			:row-selection="{ type: 'checkbox', showCheckedAll: true }"
			:selected-keys="selectedKeys"
			@select="select"
			@select-all="selectAll"
		>
			<template #columns>
				<a-table-column title="序号" :width="64" align="center">
					<template #cell="cell">{{ cell.rowIndex + 1 }}</template>
				</a-table-column>
				<a-table-column title="字典名" align="center" data-index="name" />
				<a-table-column title="字典值" align="center" data-index="value" />
				<a-table-column title="状态" :width="100" align="center">
					<template #cell="{ record }">
						<BaseCellStatus :status="record.status" />
					</template>
				</a-table-column>
				<a-table-column title="操作" :width="180" align="center">
					<template #cell="{ record }">
						<a-space>
							<a-button type="primary" size="mini" @click="onEditAction(record)">
								<template #icon>
									<icon-edit />
								</template>
								<span>编辑</span>
							</a-button>
							<a-popconfirm type="warning" content="确定删除该字典数据吗?" @before-ok="onDelete(record)">
								<a-button type="primary" status="danger" size="mini">
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

		<!-- 新增、编辑 -->
		<DictAddModal ref="dictAddModalRef" @save-success="search" />
	</a-modal>
</template>
