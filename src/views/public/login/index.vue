<script lang="ts" setup>
import { Message, type FormInstance } from '@arco-design/web-vue'
import dayjs from 'dayjs'
import { Base64 } from 'js-base64'
import Cookies from 'js-cookie'
import { useAppStore } from '@/store'
import { useLoading, useDevice } from '@/hooks'
import { SystemName, AppStoreName } from '@/config/domain'
import LoginBg from './components/index.vue'
import loginImg from '@/assets/images/login/login-img.svg'

const { isDesktop } = useDevice()
const appStore = useAppStore()
const router = useRouter()
const currYear = dayjs().year()

const formData = reactive({
	username: '',
	password: '',
	code: '',
	uuid: ''
})
const formRules: FormInstance['rules'] = {
	username: [{ required: true, message: '请输入账号' }],
	password: [{ required: true, message: '请输入密码' }],
	code: [{ required: true, message: '请输入验证码' }]
}

// 获取验证码
const captchaImage = ref('')
const loadCaptcha = async () => {
	try {
		const response = await window.$apis.common.getCaptcha()
		const { image, uuid } = response.data
		formData.uuid = uuid
		captchaImage.value = image || `data:image/png;base64,${image}`
	} catch (error) {}
}

// 记住密码
const rememberMe = ref(false)
const onRemeberMeAction = async () => {
	if (rememberMe.value) {
		const localForm = {
			username: Base64.encode(formData.username),
			password: Base64.encode(formData.password)
		}
		Cookies.set(`${AppStoreName}_COOKIE`, JSON.stringify(localForm))
	} else {
		Cookies.remove(`${AppStoreName}_COOKIE`)
	}
}

// 登录
const { loading, setLoading } = useLoading()
const errorMessage = ref('')
const formRef = ref<FormInstance>()
const handleLogin = async () => {
	try {
		const flag = await formRef.value?.validate()
		if (flag) return

		setLoading(true)
		const params = window.$_.cloneDeep(formData)
		await appStore.login(params)
		await onRemeberMeAction()
		const { redirect, ...othersQuery } = router.currentRoute.value.query
		router.push({
			path: (redirect as string) || '/',
			query: {
				...othersQuery
			}
		})
		Message.success('登录成功')
	} catch (error) {
		errorMessage.value = error as string
		setTimeout(() => {
			loadCaptcha()
		}, 500)
	} finally {
		setLoading(false)
	}
}

onMounted(() => {
	const localForm = Cookies.get(`${AppStoreName}_COOKIE`)
	if (localForm) {
		rememberMe.value = true
		try {
			const baseLocalForm = JSON.parse(localForm)
			formData.username = Base64.decode(baseLocalForm.username)
			formData.password = Base64.decode(baseLocalForm.password)
		} catch (error) {
			console.error('本地数据解析失败~', error)
		}
	} else {
		rememberMe.value = false
	}
	// 获取验证码
	loadCaptcha()
})
</script>

<template>
	<div class="login-page h-full flex items-center justify-center">
		<a-row align="stretch" class="login-container z-20">
			<a-col :xs="0" :sm="12" :md="13">
				<div class="login-left w-full h-full flex justify-center items-center relative overflow-hidden">
					<img :src="loginImg" alt="登录" class="login-img w-full h-full absolute top-0 bottom-0 left-0 right-0" />
				</div>
			</a-col>
			<a-col :xs="24" :sm="12" :md="11">
				<div class="login-right w-full h-full flex justify-center items-center box-border">
					<a-form
						ref="formRef"
						:size="isDesktop ? 'medium' : 'large'"
						:model="formData"
						:rules="formRules"
						:style="{ width: '85%' }"
						:label-col-style="{ display: 'none' }"
						:wrapper-col-style="{ flex: 1 }"
					>
						<div class="login-form-title text-center">{{ SystemName }}</div>
						<a-form-item field="username">
							<a-input v-model="formData.username" placeholder="请输入账号" size="large">
								<template #prefix>
									<icon-user :stroke-width="2" :style="{ fontSize: '22px' }" />
								</template>
							</a-input>
						</a-form-item>
						<a-form-item field="password">
							<a-input-password
								v-model="formData.password"
								placeholder="请输入密码"
								size="large"
								@keyup.enter="handleLogin"
							>
								<template #prefix>
									<icon-lock :stroke-width="2" :style="{ fontSize: '22px' }" />
								</template>
							</a-input-password>
						</a-form-item>
						<a-form-item field="code">
							<a-col :span="14">
								<a-input v-model="formData.code" placeholder="请输入验证码" size="large" @keyup.enter="handleLogin">
									<template #prefix>
										<icon-safe :stroke-width="2" :style="{ fontSize: '22px' }" />
									</template>
								</a-input>
							</a-col>
							<a-col :span="10">
								<div class="login-code ml-5">
									<img class="cursor-pointer h-full w-full" :src="captchaImage" @click="loadCaptcha" />
								</div>
							</a-col>
						</a-form-item>
						<a-form-item>
							<a-checkbox v-model="rememberMe">记住密码</a-checkbox>
						</a-form-item>
						<a-form-item>
							<a-space direction="vertical" fill class="w-full mt-2">
								<a-button type="primary" size="large" long :loading="loading" @click="handleLogin">登录</a-button>
							</a-space>
						</a-form-item>
					</a-form>
				</div>
			</a-col>
		</a-row>
		<div class="login-footer fixed bottom-0 w-full text-center">
			<span>{{ `Copyright © 2019-${currYear} whty All Rights Reserved.` }}</span>
		</div>

		<!-- 切换主题 -->
		<BaseThemeButton class="theme-btn" />

		<!-- 背景图片 -->
		<LoginBg />
	</div>
</template>

<style lang="less" scoped>
.login-page {
	background-image: url(../../../assets/images/login/login-bg.svg);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
.login-container {
	width: 86%;
	max-width: 720px;
	height: 380px;
	box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);

	.login-left {
		background: linear-gradient(60deg, rgb(var(--primary-6)), rgb(var(--primary-3)));

		.login-img {
			transition: all 0.3s;
			object-fit: cover;
		}
	}

	.login-right {
		background: var(--color-bg-1);
		.login-form-title {
			font-size: 22px;
			font-weight: 500;
			color: var(--color-text-1);
			line-height: 32px;
			margin-bottom: 20px;
			margin-top: var(--padding);
		}

		:deep(.arco-input-wrapper) {
			min-height: 40px;
		}

		.login-code {
			height: 40px;
		}
	}
}
.login-footer {
	height: 40px;
	line-height: 40px;
	font-family: Arial;
	font-size: 12px;
	letter-spacing: 1px;
	color: var(--color-text-3);
	z-index: 99;
}
.theme-btn {
	position: fixed;
	top: 20px;
	left: 30px;
	z-index: 99;
	border: none;
	&:hover {
		background: var(--color-secondary-hover);
	}

	&:active {
		background: var(--color-secondary-active);
	}
}
</style>
