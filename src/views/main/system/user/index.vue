<script lang="ts" setup>
import { Message, type TreeInstance } from '@arco-design/web-vue'
import { useDevice, useTable, useDept } from '@/hooks'
import { IUserItem } from '@/model/user'
import { IDeptItem } from '@/model/dept'
import { formatParams } from '@/utils/common'
import AddModal from './components/addModal.vue'
import UserDetail from './components/userDetail.vue'

const { isMobile } = useDevice()

// 左侧部门树
const treeRef = ref<TreeInstance>()
const { deptList, getDeptList } = useDept({
	onSuccess: () => {
		nextTick(() => {
			treeRef.value?.expandAll(true)
		})
	}
})

onMounted(() => {
	getDeptList()
})

// 搜索树
const treeInputValue = ref('')
const index = 0 as number
const treeData = computed(() => {
	if (!treeInputValue.value) return deptList.value
	return searchData(treeInputValue.value)
})

const searchData = (keyword: string) => {
	const loop = (data: IDeptItem[]) => {
		const result: IDeptItem[] = []
		data.forEach((item: IDeptItem) => {
			if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
				result.push({ ...item })
			} else if (item.children) {
				const filterData = loop(item.children)
				if (filterData.length) {
					result.push({
						...item,
						children: filterData
					})
				}
			}
		})
		return result
	}
	return loop(deptList.value)
}

const getMatchIndex = (name: string) => {
	if (!treeInputValue.value) return -1
	return name.toLowerCase().indexOf(treeInputValue.value.toLowerCase())
}

// 选中部门节点
const onSelectTreeNode = (_selectedKeys, data) => {
	form.deptId = data.node.id
	search()
}

// 查询
const form = reactive({
	status: '',
	username: '',
	deptId: ''
})

const {
	loading,
	tableData: userList,
	pagination,
	selectedKeys,
	search,
	select,
	selectAll,
	handleDelete
} = useTable(
	pagin => window.$apis.system.getSystemUserList({ pageNum: pagin.page, pageSize: pagin.size, ...formatParams(form) }),
	{
		immediate: true
	}
)

// 重置
const reset = () => {
	form.status = ''
	form.username = ''
	treeRef.value?.selectNode(form.deptId, false)
	form.deptId = ''
	treeInputValue.value = ''
	search()
}

// 新增
const addModalRef = ref<InstanceType<typeof AddModal>>()
const onAddAction = () => {
	addModalRef.value && addModalRef.value?.add()
}

// 编辑
const onEditAction = (item: IUserItem) => {
	addModalRef.value && addModalRef.value?.edit(item.id)
}

// 删除
const onDelete = (item: IUserItem) => {
	return handleDelete(() => window.$apis.system.deleteSystemUser({ ids: [item.id] }), { showModal: false })
}

// 批量删除
const onDeleteAction = () => {
	if (!selectedKeys.value.length) {
		return Message.warning('请选择要删除的用户！')
	}
	handleDelete(() => window.$apis.system.deleteSystemUser({ ids: selectedKeys.value as string[] }))
}

// 用户详情
const userDetailRef = ref<InstanceType<typeof UserDetail>>()
const onOpenDetailAction = (item: IUserItem) => {
	userDetailRef.value && userDetailRef.value?.open(item.id)
}
</script>

<template>
	<div class="base-page user-page">
		<div class="main-content">
			<a-row :gutter="16">
				<a-col :xs="0" :md="6" :lg="6" :xl="6" :xxl="4">
					<a-input
						v-model="treeInputValue"
						placeholder="请输入部门名称搜索"
						allow-clear
						:style="{ marginBottom: '10px' }"
					>
						<template #prefix><icon-search /></template>
					</a-input>
					<a-tree
						ref="treeRef"
						block-node
						show-line
						default-expand-all
						:data="treeData"
						:field-names="{
							key: 'id',
							title: 'name',
							children: 'children'
						}"
						@select="onSelectTreeNode"
					>
						<template #title="nodeData">
							<template v-if="((index = getMatchIndex(nodeData?.name)), index < 0)">{{ nodeData?.name }}</template>
							<span v-else>
								{{ nodeData?.name?.substr(0, index) }}
								<span class="highlight-text">
									{{ nodeData?.name?.substr(index, treeInputValue.length) }}
								</span>
								{{ nodeData?.name?.substr(index + treeInputValue.length) }}
							</span>
						</template>
					</a-tree>
				</a-col>
				<a-col :xs="24" :md="18" :lg="18" :xl="18" :xxl="20">
					<a-row class="mb-1">
						<a-space wrap>
							<a-input v-model="form.username" placeholder="请输入用户名搜索" allow-clear :style="{ width: '260px' }">
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
					</a-row>
					<a-row class="mb-1.5 mt-0.5">
						<a-space wrap>
							<a-button v-hasPerm="['system:user:add']" type="primary" size="small" @click="onAddAction">
								<template #icon><icon-plus /></template>
								<span>新增</span>
							</a-button>
							<a-button
								v-hasPerm="['system:user:delete']"
								type="primary"
								status="danger"
								size="small"
								@click="onDeleteAction"
							>
								<template #icon><icon-delete /></template>
								<span>删除</span>
							</a-button>
						</a-space>
					</a-row>

					<a-table
						row-key="id"
						:loading="loading"
						:data="userList"
						:bordered="{ cell: true }"
						:scroll="{ x: '100%', y: '100%', minWidth: 1700 }"
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
							<a-table-column title="用户名" data-index="username" :width="120" align="center">
								<template #cell="{ record }">
									<a-link @click="onOpenDetailAction(record)">{{ record.username }}</a-link>
								</template>
							</a-table-column>
							<a-table-column title="昵称" data-index="nickname" :width="150" align="center" />
							<a-table-column title="状态" :width="100" align="center">
								<template #cell="{ record }">
									<a-tag v-if="record.status === 1" color="green">正常</a-tag>
									<a-tag v-if="record.status === 0" color="red">禁用</a-tag>
								</template>
							</a-table-column>
							<a-table-column title="性别" data-index="gender" :width="80" align="center">
								<template #cell="{ record }">
									<span v-if="record.gender === 0">未知</span>
									<span v-if="record.gender === 1">男</span>
									<span v-if="record.gender === 2">女</span>
								</template>
							</a-table-column>
							<a-table-column title="头像" data-index="avatar" :width="100" align="center">
								<template #cell="{ record }">
									<a-avatar>
										<img alt="avatar" :src="record.avatar" />
									</a-avatar>
								</template>
							</a-table-column>
							<a-table-column title="联系方式" data-index="phone" :width="180" align="center" />
							<a-table-column title="部门" data-index="deptName" :width="180" align="center" />
							<a-table-column title="类型" :width="100" align="center">
								<template #cell="{ record }">
									<a-tag v-if="record.type === 1" color="red">系统内置</a-tag>
									<a-tag v-if="record.type === 2" color="orange">自定义</a-tag>
								</template>
							</a-table-column>
							<a-table-column title="描述" :width="200" data-index="description" align="center" />
							<a-table-column title="创建时间" data-index="createTime" :width="180" align="center" />
							<a-table-column title="操作" :width="180" align="center" :fixed="!isMobile ? 'right' : undefined">
								<template #cell="{ record }">
									<a-space>
										<a-button v-hasPerm="['system:user:edit']" type="primary" size="mini" @click="onEditAction(record)">
											<template #icon><icon-edit /></template>
											<span>编辑</span>
										</a-button>
										<a-popconfirm type="warning" content="确定删除该用户吗?" @before-ok="onDelete(record)">
											<a-button
												v-hasPerm="['system:user:delete']"
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
				</a-col>
			</a-row>
		</div>

		<!-- 新增、编辑 -->
		<AddModal ref="addModalRef" @save-success="search" />

		<!-- 用户信息 -->
		<UserDetail ref="userDetailRef" />
	</div>
</template>

<style lang="less" scoped>
.highlight-text {
	color: var(--color-theme);
}
</style>
