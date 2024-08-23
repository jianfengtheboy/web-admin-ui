<script lang="ts" setup>
import { Drawer, type TableInstance } from '@arco-design/web-vue'
import { isExternal } from '@/utils/validate'
import { transformPathToName } from '@/utils/route'
import { formatParams } from '@/utils/common'
import { IMenuItem } from '@/model/menu'
import { useDevice, useTable, useDict } from '@/hooks'
import BaseCodeView from '@/components/BaseCodeView/index.vue'
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
	tableData: menuList,
	search,
	handleDelete
} = useTable(() => window.$apis.system.getSystemMenuList({ ...formatParams(form) }), { immediate: true })

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
const onEditAction = (item: IMenuItem) => {
	addModalRef.value?.edit(item.id)
}

// 新增下级菜单
const onAddSubAction = (item: IMenuItem) => {
	addModalRef.value?.add(item)
}

// 删除
const onDeleteAction = async (item: IMenuItem) => {
	return handleDelete(() => window.$apis.system.deleteSystemMenu({ ids: [item.id] }), { showModal: false })
}

// 展开、折叠
const isExpanded = ref(false)
const onExpandedAction = () => {
	isExpanded.value = !isExpanded.value
	tableRef.value?.expandAll(isExpanded.value)
}

// 查看数据结构
const onViewCodeAction = () => {
	Drawer.open({
		title: '数据结构',
		content: () => h(BaseCodeView, { codeJson: JSON.stringify(menuList.value, null, '\t') }),
		width: 560,
		footer: false
	})
}
</script>

<template>
	<div class="base-page menu-page">
		<div class="main-content">
			<a-space wrap class="mb-1.5">
				<a-input v-model="form.name" placeholder="请输入菜单名称搜索" allow-clear :style="{ width: '260px' }">
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
				<a-button v-hasPerm="['system:menu:add']" type="primary" size="small" @click="onAddAction">
					<template #icon>
						<icon-plus />
					</template>
					<span>新增</span>
				</a-button>
				<a-tooltip content="展开/折叠">
					<a-button type="primary" status="success" size="small" @click="onExpandedAction">
						<template #icon>
							<icon-list v-if="!isExpanded" />
							<icon-mind-mapping v-else />
						</template>
					</a-button>
				</a-tooltip>
				<a-tooltip content="查看数据结构">
					<a-button type="primary" status="warning" size="small" @click="onViewCodeAction">
						<template #icon>
							<icon-code />
						</template>
					</a-button>
				</a-tooltip>
			</a-space>

			<a-table
				ref="tableRef"
				row-key="id"
				:data="menuList"
				:loading="loading"
				:bordered="{ cell: true }"
				:scroll="{ x: '100%', y: '100%', minWidth: 1700 }"
				:pagination="false"
				size="small"
			>
				<template #expand-icon="{ expanded }">
					<IconDown v-if="expanded" />
					<IconRight v-else />
				</template>
				<template #columns>
					<a-table-column title="菜单名称">
						<template #cell="{ record }">{{ record.title || '' }}</template>
					</a-table-column>
					<a-table-column title="类型" :width="80" align="center">
						<template #cell="{ record }">
							<a-tag v-if="record.type === 1" size="small" color="orangered">目录</a-tag>
							<a-tag v-if="record.type === 2" size="small" color="green">菜单</a-tag>
							<a-tag v-if="record.type === 3" size="small">按钮</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="排序" :width="60" align="center">
						<template #cell="{ record }">{{ record.sort || 0 }}</template>
					</a-table-column>
					<a-table-column title="路由路径" data-index="path" />
					<a-table-column title="路由名称">
						<template #cell="{ record }">{{ transformPathToName(record.path) }}</template>
					</a-table-column>
					<a-table-column title="组件路径" data-index="component" />
					<a-table-column title="权限标识" data-index="permission" :width="200" />
					<a-table-column title="菜单图标" data-index="icon" :width="100" align="center">
						<template #cell="{ record }">
							<BaseIcon v-if="record.svgIcon" :size="18" :name="record.svgIcon" />
							<template v-else>
								<component v-if="record.icon" :size="18" :is="record.icon" />
							</template>
						</template>
					</a-table-column>
					<a-table-column title="状态" :width="80" align="center">
						<template #cell="{ record }">
							<a-switch
								type="round"
								size="small"
								:model-value="record.status"
								:checked-value="1"
								:unchecked-value="0"
							/>
						</template>
					</a-table-column>
					<a-table-column title="是否缓存" :width="90" align="center">
						<template #cell="{ record }">
							<a-tag v-if="record.keepAlive" size="small" color="green">是</a-tag>
							<a-tag v-else size="small" color="red">否</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="是否隐藏" :width="90" align="center">
						<template #cell="{ record }">
							<a-tag v-if="record.hidden" size="small" color="green">是</a-tag>
							<a-tag v-else size="small" color="red">否</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="是否外链" :width="90" align="center">
						<template #cell="{ record }">
							<a-tag v-if="isExternal(record.path)" size="small" color="green">是</a-tag>
							<a-tag v-else size="small" color="red">否</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="操作" :width="245" align="left" :fixed="!isMobile ? 'right' : undefined">
						<template #cell="{ record }">
							<a-space>
								<a-button v-hasPerm="['system:menu:edit']" type="primary" size="mini" @click="onEditAction(record)">
									<template #icon>
										<icon-edit />
									</template>
									<span>编辑</span>
								</a-button>
								<a-button
									v-show="[1, 2].includes(record.type)"
									v-hasPerm="['system:menu:add']"
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
									:content="`确定删除 '${record.title}' 吗?`"
									@before-ok="onDeleteAction(record)"
								>
									<a-button v-hasPerm="['system:menu:delete']" type="primary" status="danger" size="mini">
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
		<AddModal ref="addModalRef" :menus="menuList" @save-success="search" />
	</div>
</template>
