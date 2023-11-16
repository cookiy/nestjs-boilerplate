import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { message } from 'antd'

const baseURL = import.meta.env.VITE_APP_URL as string

export class Request {
	private baseConfig: AxiosRequestConfig = {
		baseURL,
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		timeout: 38000
	}

	// axios实例
	private instance: AxiosInstance = axios.create(this.baseConfig)

	public constructor() {
		this.setReqInterceptors()
		this.setResnterceptors()
	}

	// 设置请求头
	public setHeader = (headers: any) => {
		this.baseConfig.headers = { ...this.baseConfig.headers, ...headers }
		this.instance = axios.create(this.baseConfig)
		this.setReqInterceptors()
		this.setResnterceptors()
	}

	// get请求
	public get = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
		this.instance({
			...{ url, method: 'get', params: data },
			...config
		})

	// post请求
	public post = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
		this.instance({
			...{ url, method: 'post', data },
			...config
		})

	public put = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
		this.instance({
			...{ url, method: 'put', data },
			...config
		})

	// 不经过统一的axios实例的get请求
	public postOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		axios({
			...this.baseConfig,
			...{ url, method: 'post', data },
			...config
		})

	// 不经过统一的axios实例的post请求
	public getOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		axios({
			...this.baseConfig,
			...{ url, method: 'get', params: data },
			...config
		})

	// delete请求,后端通过requestBody接收
	public deleteBody = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		this.instance({
			...{ url, method: 'delete', data },
			...config
		})

	// delete请求,后端通过后端通过requestParam接收
	public deleteParam = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		this.instance({
			...{ url, method: 'delete', params: data },
			...config
		})

	// patch请求,后端通过后端通过requestParam接收
	public patchParam = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		this.instance({
			...{ url, method: 'patch', params: data },
			...config
		})

	// 请求拦截器
	private setReqInterceptors = () => {
		this.instance.interceptors.request.use(
			config => {
				return config
			},
			err => {
				message.error('请求失败')
				return Promise.reject(err)
			}
		)
	}

	// 响应拦截器
	private setResnterceptors = () => {
		this.instance.interceptors.response.use(
			res => {
				const { code, data, msg } = res.data
				if (code === 200) {
					return data
				}
				if (code === 409) {
					message.error(msg)
					return Promise.reject(res)
				}
				message.error('获取数据失败')
				return Promise.reject(res)
			},
			err => {
				const { response } = err
				if (response?.status === 401) {
					message.error('用户名或者密码错误')
					localStorage.clear()
					window.location.replace('#/account/login')
				} else {
					message.error(response?.message || '请求失败')
				}
				return Promise.reject(err)
			}
		)
	}
}

export default new Request()
