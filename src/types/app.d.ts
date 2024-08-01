declare namespace App {
	/** 系统配置 */
	interface SettingConfig {
		// 主题
		theme: 'light' | 'dark'
		// 主题色
		themeColor: string
		// 是否显示页签
		tab: boolean
		// 页签风格
		tabMode: TabType
		// 是否显示动画
		animate: boolean
		// 动画类名
		animateMode: AnimateType
		// 左侧菜单折叠状态
		menuCollapse: boolean
		// 菜单深色模式
		menuDark: boolean
		// 左侧菜单手风琴效果
		menuAccordion: boolean
		// 布局模式
		layout: 'left' | 'mix'
	}
	// 导航页签的样式类型
	type TabType = 'card' | 'card-gutter' | 'rounded'
	interface TabItem {
		label: string
		value: TabType
	}

	// 页面切换动画类型
	type AnimateType = 'zoom-fade' | 'slide-dynamic-origin' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale'
	interface AnimateItem {
		label: string
		value: AnimateType
	}
}
