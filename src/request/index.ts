import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-vue'
import { AppStoreName } from '@/config/domain'
import router from '@/router'
import { useAppStore } from '@/store'

class Http {
	private baseConfig: AxiosRequestConfig = {
		baseURL: import.meta.env.VITE_BASE_API,
		headers: {},
		timeout: 30 * 1000
	}

	private instance: AxiosInstance = axios.create(this.baseConfig)

	public constructor() {
		const token = localStorage.getItem(`${AppStoreName}_TOKEN`)
		if (token) {
			this.setHeader({
				Authorization: token
			})
		} else {
			this.initInstance()
		}
	}

	// 设置请求头
	public setHeader = (headers: any) => {
		this.baseConfig.headers = { ...this.baseConfig.headers, ...headers }
		this.initInstance()
	}

	private initInstance() {
		this.instance = axios.create(this.baseConfig)
		this.setReqInterceptors()
		this.setResInterceptors()
	}

	// 请求拦截器
	private setReqInterceptors = () => {
		this.instance.interceptors.request.use(
			(config: any) => {
				config.cancelToken = new axios.CancelToken(function executor() {})
				config.headers = {
					...config.headers
				}
				return config
			},
			error => {
				Message.error('请求失败')
				return Promise.reject(error)
			}
		)
	}

	// 响应拦截器
	private setResInterceptors = () => {
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { code, data, message } = response.data
				const appStore = useAppStore()
				switch (code) {
					case 200:
						return Promise.resolve(response.data)
					case 401:
						Message.error(message || '无权限')
						appStore.resetToken()
						router.replace('/login')
						return Promise.reject(data)
					case 403:
						Message.warning(message)
						return Promise.reject(data)
					default:
						if (message) Message.error(message || '响应失败')
						return Promise.reject(data)
				}
			},
			error => {
				Message.clear()
				const requestData = window.$_.get(error, 'response.data')
				if (requestData instanceof Blob) {
					let reader = new FileReader()
					reader.onload = function () {
						try {
							if (typeof reader.result !== 'string') return
							const result = JSON.parse(reader.result)
							const { msg } = result
							Message.error(msg)
							return Promise.reject(result)
						} catch (error) {}
					}
					reader.readAsText(requestData)
				} else if (!axios.isCancel(error)) {
					Message.error('系统异常, 请检查网络或联系管理员！')
				}
				return Promise.reject(error)
			}
		)
	}

	// get请求 => get传参方式
	public get = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'get', params: data, ...config })

	// 不经过统一的axios实例的get请求
	public getOnly = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		axios({
			...this.baseConfig,
			url,
			method: 'get',
			params: data,
			...config
		})

	// post请求 => json传参方式
	public post = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'post', data, ...config })

	// post请求 => get传参方式
	public postParams = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'post', params: data, ...config })

	// 不经过统一的axios实例的post请求
	public postOnly = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		axios({
			...this.baseConfig,
			url,
			method: 'post',
			data,
			...config
		})

	// put请求 => json传参方式
	public put = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'put', data, ...config })

	// put请求 => get传参方式
	public putParams = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'put', params: data, ...config })

	// delete请求
	public delete = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', params: data, ...config })

	public deleteBody = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', data, ...config })

	public deleteParam = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', params: data, ...config })
}

export default new Http()
