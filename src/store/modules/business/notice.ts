interface IState {
	noticeBadge: number
	noticeData: any[]
}

export const useNoticeStore = defineStore('notice', {
	state: (): IState => ({
		noticeBadge: 0,
		noticeData: []
	}),
	actions: {
		// 获取消息通知
		async fetchNotice() {
			try {
				const response = await window.$apis.notice.getNotice()
				if (response && response.code === 200) {
					this.noticeBadge = response.data.total
					this.noticeData = response.data.rows || []
				}
			} catch (error) {}
		}
	}
})
