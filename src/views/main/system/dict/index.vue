<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useTable, useDevice, useDict } from '@/hooks'
import { IDictItem } from '@/model/dict'
import { formatParams } from '@/utils/common'
import AddModal from './components/addModal.vue'
import DictData from './dictData/index.vue'

const { isMobile } = useDevice()
const { data: options } = useDict({ code: 'status' })

// 查询条件
const form = reactive({
	name: '',
	status: ''
})

// 获取列表数据
const {
	loading,
	tableData: dictList,
	pagination,
	selectedKeys,
	search,
	select,
	selectAll,
	handleDelete
} = useTable(
	pagin =>
		window.$apis.system.getSystemDictList({
			pageNum: pagin.page,
			pageSize: pagin.size,
			...formatParams(form)
		}),
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
	addModalRef.value?.add()
}

// 编辑
const onEditAction = async (item: IDictItem) => {
	addModalRef.value?.edit(item.id)
}

// 批量删除
const onDeleteAction = () => {
	if (!selectedKeys.value.length) {
		return Message.warning('请选择要删除的字典！')
	}
	handleDelete(() => window.$apis.system.deleteSystemDict({ ids: selectedKeys.value as string[] }))
}

// 删除
const onDelete = async (item: IDictItem) => {
	return handleDelete(() => window.$apis.system.deleteSystemDict({ ids: [item.id] }), { showModal: false })
}

// 字典数据
const dictDataRef = ref<InstanceType<typeof DictData>>()
const onViewAction = (item: IDictItem) => {
	dictDataRef.value?.open({ code: item.code })
}
</script>

<template>
	<div class="base-page dict-page">
		<div class="main-content">
			<a-space wrap class="mb-1.5">
				<a-input v-model="form.name" placeholder="请输入字典类型名称、编码" allow-clear :style="{ width: '260px' }">
					<template #prefix>
						<icon-search />
					</template>
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
					<span>查询</span>
				</a-button>
				<a-button type="outline" size="small" @click="reset">
					<template #icon>
						<icon-refresh />
					</template>
					<span>重置</span>
				</a-button>
			</a-space>

			<a-space wrap class="mb-1.5">
				<a-button v-hasPerm="['system:dict:add']" type="primary" size="small" @click="onAddAction">
					<template #icon>
						<icon-plus />
					</template>
					<span>新增</span>
				</a-button>
				<a-button
					v-hasPerm="['system:dict:delete']"
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
				row-key="id"
				:data="dictList"
				:bordered="{ cell: true }"
				:loading="loading"
				:scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
				:pagination="pagination"
				page-position="bottom"
				:row-selection="{ type: 'checkbox', showCheckedAll: true }"
				:selected-keys="selectedKeys"
				@select="select"
				@select-all="selectAll"
			>
				<template #columns>
					<a-table-column title="序号" align="center" :width="64">
						<template #cell="cell">{{ cell.rowIndex + 1 }}</template>
					</a-table-column>
					<a-table-column title="字典名称" align="center" data-index="name" :width="120" />
					<a-table-column title="字典编码" align="center" data-index="code" :width="120" />
					<a-table-column title="状态" align="center" :width="100">
						<template #cell="{ record }">
							<BaseCellStatus :status="record.status" />
						</template>
					</a-table-column>
					<a-table-column title="描述" align="center" data-index="description" :width="240" />
					<a-table-column title="创建时间" align="center" data-index="createTime" :width="180" />
					<a-table-column title="操作" :width="280" align="center" :fixed="!isMobile ? 'right' : undefined">
						<template #cell="{ record }">
							<a-space>
								<a-button
									v-hasPerm="['system:dict:data']"
									type="primary"
									status="success"
									size="mini"
									@click="onViewAction(record)"
								>
									<template #icon>
										<icon-storage />
									</template>
									<span>字典数据</span>
								</a-button>
								<a-button v-hasPerm="['system:dict:edit']" type="primary" size="mini" @click="onEditAction(record)">
									<template #icon>
										<icon-edit />
									</template>
									<span>编辑</span>
								</a-button>
								<a-popconfirm type="warning" content="确定删除该字典吗?" @before-ok="onDelete(record)">
									<a-button v-hasPerm="['system:dict:delete']" type="primary" status="danger" size="mini">
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

		<!-- 字典数据 -->
		<DictData ref="dictDataRef" />
	</div>
</template>
