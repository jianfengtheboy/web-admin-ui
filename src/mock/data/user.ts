export const userData = [
	{
		id: '01',
		createUserString: '超级管理员',
		createTime: '2023-09-05 23:00:00',
		disabled: true,
		username: 'Admin',
		nickname: '管理员',
		gender: 0,
		avatar:
			'https://img.yxs.shenyecg.com/Image/UDlExvo5IqDTbQyObux0yzcxebpCxZrz/jZcEpQPrkP.jpg?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200',
		email: 'jianfengtheboy@163.com',
		phone: '13006306683',
		status: 1,
		type: 1,
		description: '系统初始用户',
		roleIds: ['role_admin'],
		roleNames: '超级管理员',
		deptId: '01',
		deptName: 'XXX科技有限公司',
		permissions: ['*:*:*']
	},
	{
		id: '02',
		createUserString: '超级管理员',
		createTime: '2023-09-05 23:00:00',
		disabled: false,
		username: 'immortal',
		nickname: '大罗金仙',
		gender: 1,
		avatar:
			'https://img.yxs.shenyecg.com/Image/QDR2HeyIOGf1znAwAI8vRtmsi6bgagFC/rCx2SyWC6K.jpg?x-oss-process=image/resize,w_1121',
		email: 'immortal@qq.com',
		phone: '13636363366',
		status: 1,
		type: 2,
		description: '无法访问系统管理菜单',
		roleIds: ['role_user'],
		roleNames: '普通用户',
		deptId: '01010101',
		deptName: '研发一组',
		permissions: ['user:btn:add', 'user:btn:edit', 'user:btn:delete']
	}
]
