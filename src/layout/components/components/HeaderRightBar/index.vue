<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import { useFullscreen } from '@vueuse/core'
import { useAppStore, useNoticeStore } from '@/store'
import { useDevice } from '@/hooks'
import maleAvatar from '@/assets/icons/avatar-man.svg'
import famaleAvatar from '@/assets/icons/avatar-woman.svg'
import Setting from '../Setting/index.vue'
import Message from './components/Message.vue'

const router = useRouter()
const appStore = useAppStore()
const noticeStore = useNoticeStore()
const { isFullscreen, toggle } = useFullscreen()
const { isDesktop } = useDevice()
const settingRef = ref<InstanceType<typeof Setting>>()

// 用户头像
const defaultAvatar = appStore.userInfo.gender === 2 ? famaleAvatar : maleAvatar
const avatar = appStore.userInfo.avatar ? `${appStore.userInfo.avatar}` : defaultAvatar

// 跳转个人中心
const toUser = () => {
	router.push('/userProfile')
}

// 修改密码
const onUpdatePassword = () => {}

// 退出登录
const logout = () => {
	Modal.warning({
		title: '提示',
		content: '确认退出登录？',
		hideCancel: false,
		closable: true,
		onBeforeOk: async () => {
			try {
				await appStore.logout()
				router.replace('/login')
				return true
			} catch (error) {
				return false
			}
		}
	})
}
</script>

<template>
	<a-row justify="end" align="center">
		<a-space size="medium">
			<!-- 消息通知 -->
			<a-popover position="bottom" trigger="click">
				<a-badge :count="noticeStore.noticeBadge">
					<a-button size="mini" class="header-btn">
						<template #icon>
							<icon-notification :size="18" />
						</template>
					</a-button>
				</a-badge>
				<template #content>
					<Message />
				</template>
			</a-popover>

			<!-- 全屏切换组件 -->
			<a-tooltip v-if="isDesktop" content="全屏切换" position="bottom">
				<a-button size="mini" class="header-btn" @click="toggle">
					<template #icon>
						<icon-fullscreen :size="18" v-if="!isFullscreen" />
						<icon-fullscreen-exit :size="18" v-else />
					</template>
				</a-button>
			</a-tooltip>

			<!-- 暗黑模式切换 -->
			<a-tooltip content="主题切换" position="bottom">
				<BaseThemeButton class="header-btn" />
			</a-tooltip>

			<!-- 设置 -->
			<a-tooltip content="设置" position="bottom">
				<a-button size="mini" class="header-btn" @click="settingRef?.open">
					<template #icon>
						<icon-settings :size="18" />
					</template>
				</a-button>
			</a-tooltip>

			<!-- 管理员账户 -->
			<a-dropdown trigger="hover">
				<a-row align="center" :wrap="false" class="user cursor-pointer">
					<!-- 管理员头像 -->
					<a-avatar :size="32">
						<img :src="avatar" />
					</a-avatar>
					<span class="username whitespace-nowrap">{{ appStore.userInfo.userName }}</span>
					<icon-down />
				</a-row>
				<template #content>
					<a-doption @click="toUser">
						<template #icon>
							<span class="doption-icon primary flex items-center justify-center flex-shrink-0 text-white">
								<icon-user />
							</span>
						</template>
						<span>个人中心</span>
					</a-doption>
					<a-doption @click="onUpdatePassword">
						<template #icon>
							<span class="doption-icon primary flex items-center justify-center flex-shrink-0 text-white">
								<icon-unlock />
							</span>
						</template>
						<span>修改密码</span>
					</a-doption>
					<a-divider class="header-divider" />
					<a-doption @click="logout">
						<template #icon>
							<span class="doption-icon warning flex items-center justify-center flex-shrink-0 text-white">
								<icon-export />
							</span>
						</template>
						<span>退出登录</span>
					</a-doption>
				</template>
			</a-dropdown>
		</a-space>
	</a-row>

	<!-- 设置 -->
	<Setting ref="settingRef" />
</template>

<style lang="less" scoped>
.arco-dropdown-open .arco-icon-down {
	transform: rotate(180deg);
}

.arco-icon-down {
	transition: all 0.3s;
	margin-left: 2px;
}
.header-btn {
	border: none !important;

	&:hover {
		background: var(--color-secondary-hover);
	}
}

.user {
	color: var(--color-text-1);
}
.username {
	margin-left: 8px;
	margin-right: 6px;
}

.header-divider {
	margin: 0;
}
.doption-icon {
	width: 20px;
	height: 20px;
	border-radius: 4px;
	&.primary {
		background-color: rgba(var(--primary-6));
	}
	&.success {
		background-color: rgba(var(--success-6));
	}
	&.warning {
		background-color: rgba(var(--warning-6));
	}
}
</style>
