<script lang="ts" setup>
import { Drawer, Message, type TableInstance } from '@arco-design/web-vue'
import { isExternal } from '@/utils/validate'
import { transformPathToName } from '@/utils/route'
import { IMenuItem } from '@/model/menu'
import { useDevice } from '@/hooks'
import { formatParams } from '@/utils/common'
import BaseCodeView from '@/components/BaseCodeView/index.vue'
import AddModal from './components/addModal.vue'

const { isMobile } = useDevice()
const form = reactive({
	name: '',
	status: ''
})

const tableRef = ref<TableInstance>()
const loading = ref(false)
const menuList = ref<IMenuItem[]>([])

// 获取列表数据
const fetchMenuList = async () => {
	try {
		loading.value = true
		const params = {
			...formatParams(form)
		}
		const response = await window.$apis.system.getSystemMenuList(params)
		if (response && response.code === 200) {
			menuList.value = response.data
		}
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	fetchMenuList()
})

// 查询
const search = () => {
	fetchMenuList()
}

// 重置
const reset = () => {
	form.name = ''
	form.status = ''
	fetchMenuList()
}

// 新增
const addModalRef = ref<InstanceType<typeof AddModal>>()
const onAddAction = () => {
	addModalRef.value && addModalRef.value?.add()
}

// 编辑
const onEditAction = (item: IMenuItem) => {
	addModalRef.value && addModalRef.value?.edit(item.id)
}

// 新增下级菜单
const onAddSubAction = (item: IMenuItem) => {
	addModalRef.value && addModalRef.value?.add(item)
}

// 删除
const onDeleteAction = async (item: IMenuItem) => {
	try {
		const response = await window.$apis.system.deleteSystemMenu({ ids: [item.id] })
		if (response && response.code === 200) {
			Message.success(response.message)
			fetchMenuList()
		}
		return true
	} catch (error) {
		return false
	}
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
					<template #prefix><icon-search /></template>
				</a-input>
				<a-select v-model="form.status" placeholder="请选择状态" :style="{ width: '160px' }">
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
						<template #icon><icon-code /></template>
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
							<a-tag v-if="record.type === 1" color="orangered">目录</a-tag>
							<a-tag v-if="record.type === 2" color="green">菜单</a-tag>
							<a-tag v-if="record.type === 3">按钮</a-tag>
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
							<a-tag v-if="record.status === 1" color="green">启用</a-tag>
							<a-tag v-else color="red">禁用</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="是否缓存" :width="90" align="center">
						<template #cell="{ record }">
							<a-tag v-if="record.keepAlive" color="green">是</a-tag>
							<a-tag v-else color="red">否</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="是否隐藏" :width="90" align="center">
						<template #cell="{ record }">
							<a-tag v-if="record.hidden" color="green">是</a-tag>
							<a-tag v-else color="red">否</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="是否外链" :width="90" align="center">
						<template #cell="{ record }">
							<a-tag v-if="isExternal(record.path)" color="green">是</a-tag>
							<a-tag v-else color="red">否</a-tag>
						</template>
					</a-table-column>
					<a-table-column title="操作" :width="245" align="left" :fixed="!isMobile ? 'right' : undefined">
						<template #cell="{ record }">
							<a-space>
								<a-button v-hasPerm="['system:menu:edit']" type="primary" size="mini" @click="onEditAction(record)">
									<template #icon><icon-edit /></template>
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
									<template #icon><icon-plus /></template>
									<span>新增</span>
								</a-button>
								<a-popconfirm
									type="warning"
									:content="`确定删除 '${record.title}' 吗?`"
									@before-ok="onDeleteAction(record)"
								>
									<a-button v-hasPerm="['system:menu:delete']" type="primary" status="danger" size="mini">
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
		<AddModal ref="addModalRef" :menus="menuList" @save-success="search" />
	</div>
</template>
