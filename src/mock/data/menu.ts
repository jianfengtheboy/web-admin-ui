export const menus = [
	{
		id: '01',
		parentId: '',
		path: '/system',
		component: 'Layout',
		redirect: 'noRedirect',
		type: 1,
		title: '系统管理',
		svgIcon: 'menu-system',
		icon: '',
		keepAlive: false,
		hidden: false,
		sort: 1,
		activeMenu: '',
		breadcrumb: true,
		children: [
			{
				id: '0101',
				parentId: '01',
				path: '/system/user',
				component: 'system/user/index',
				redirect: '',
				type: 2,
				title: '用户管理',
				svgIcon: '',
				icon: 'icon-user',
				keepAlive: false,
				hidden: false,
				sort: 1,
				activeMenu: '',
				breadcrumb: true,
				status: 1,
				roles: ['role_admin'],
				permission: 'system:user:query',
				showInTabs: true,
				alwaysShow: false,
				affix: false,
				children: [
					{
						id: '010101',
						parentId: '0101',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '新增',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 1,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:user:add',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010102',
						parentId: '0101',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '编辑',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 2,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:user:edit',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010103',
						parentId: '0101',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '删除',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 3,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:user:delete',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010104',
						parentId: '0101',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '详情',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 4,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:user:detail',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					}
				]
			},
			{
				id: '0102',
				parentId: '01',
				path: '/system/role',
				component: 'system/role/index',
				redirect: '',
				type: 2,
				title: '角色管理',
				svgIcon: '',
				icon: 'icon-common',
				keepAlive: false,
				hidden: false,
				sort: 2,
				activeMenu: '',
				breadcrumb: true,
				status: 1,
				roles: ['role_admin'],
				permission: 'system:role:query',
				showInTabs: true,
				alwaysShow: false,
				affix: false,
				children: [
					{
						id: '010201',
						parentId: '0102',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '新增',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 1,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:role:add',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010202',
						parentId: '0102',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '编辑',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 2,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:role:edit',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010203',
						parentId: '0102',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '删除',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 3,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:role:delete',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010204',
						parentId: '0102',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '详情',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 4,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:role:detail',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010205',
						parentId: '0102',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '分配权限',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 5,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:role:allocation',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					}
				]
			},
			{
				id: '0103',
				parentId: '01',
				path: '/system/dept',
				component: 'system/dept/index',
				redirect: '',
				type: 2,
				title: '部门管理',
				svgIcon: '',
				icon: 'icon-mind-mapping',
				keepAlive: false,
				hidden: false,
				sort: 3,
				activeMenu: '',
				breadcrumb: true,
				status: 1,
				roles: ['role_admin'],
				permission: 'system:dept:query',
				showInTabs: true,
				alwaysShow: false,
				affix: false,
				children: [
					{
						id: '010301',
						parentId: '0103',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '新增',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 1,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dept:add',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010302',
						parentId: '0103',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '编辑',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 2,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dept:edit',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010303',
						parentId: '0103',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '删除',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 3,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dept:delete',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010304',
						parentId: '0103',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '详情',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 4,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dept:detail',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					}
				]
			},
			{
				id: '0104',
				parentId: '01',
				path: '/system/menu',
				component: 'system/menu/index',
				redirect: '',
				type: 2,
				title: '菜单管理',
				svgIcon: '',
				icon: 'icon-menu',
				keepAlive: false,
				hidden: false,
				sort: 4,
				activeMenu: '',
				breadcrumb: true,
				status: 1,
				roles: ['role_admin'],
				permission: 'system:menu:query',
				showInTabs: true,
				alwaysShow: false,
				affix: false,
				children: [
					{
						id: '010401',
						parentId: '0104',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '新增',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 1,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:menu:add',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010402',
						parentId: '0104',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '编辑',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 2,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:menu:edit',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010403',
						parentId: '0104',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '删除',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 3,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:menu:delete',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					}
				]
			},
			{
				id: '0105',
				parentId: '01',
				path: '/system/dict',
				component: 'system/dict/index',
				redirect: '',
				type: 2,
				title: '字典管理',
				svgIcon: '',
				icon: 'icon-bookmark',
				keepAlive: false,
				hidden: false,
				sort: 5,
				activeMenu: '',
				breadcrumb: true,
				status: 1,
				roles: ['role_admin'],
				permission: 'system:dict:query',
				showInTabs: true,
				alwaysShow: false,
				affix: false,
				children: [
					{
						id: '010501',
						parentId: '0105',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '新增',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 1,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dict:add',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010502',
						parentId: '0105',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '编辑',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 2,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dict:edit',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010503',
						parentId: '0105',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '删除',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 3,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dict:delete',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					},
					{
						id: '010504',
						parentId: '0105',
						path: '',
						component: '',
						redirect: '',
						type: 3,
						title: '字典数据',
						svgIcon: '',
						icon: '',
						keepAlive: false,
						hidden: false,
						sort: 4,
						activeMenu: '',
						breadcrumb: true,
						status: 1,
						roles: [],
						permission: 'system:dict:data',
						showInTabs: true,
						alwaysShow: false,
						affix: false
					}
				]
			}
		],
		status: 1,
		roles: ['role_admin'],
		permission: '',
		showInTabs: true,
		alwaysShow: false,
		affix: false
	}
]