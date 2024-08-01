import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'

export default [
	// 获取消息通知
	{
		url: '/dev-api/notice/list',
		method: 'get',
		timeout: 100,
		response: () => {
			const data = {
				total: 3,
				rows: [
					{
						type: 1,
						id: '2024001',
						name: '管理员',
						datetime: '刚刚',
						content: '关于2024年春节期间系统运维安排的通知',
						avatar: 'https://s1.ax1x.com/2022/06/14/XhteeO.jpg'
					},
					{
						type: 1,
						id: '2024002',
						name: 'Monkey D Lufy',
						datetime: '2024-02-06 12:30:00',
						content: 'I am Nika',
						avatar: 'https://s1.ax1x.com/2022/06/14/XhtSwF.jpg'
					},
					{
						type: 2,
						id: '2024003',
						name: '操作员',
						datetime: '1小时之前',
						content: '外网权限申请单',
						avatar: 'https://lolicode.gitee.io/scui-doc/demo/img/avatar2.gif'
					}
				]
			}
			return resultSuccess(data)
		}
	}
] as MockMethod[]
