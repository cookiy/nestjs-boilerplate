import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { message } from 'antd'
import { IUserInfo } from '@/model/common'

const accountStore = create(
	devtools((set: any, get: any) => {
		return {
			token: localStorage.getItem('token') || '',
			accountInfo: {
				id: '',
				uId: '',
				is_admin: 0,
				username: '',
				email: '',
				permission: []
			},
			config: {
				runtimeList: [],
				platformList: [],
				productsList: []
			},
			setConfig: (config: any) => {
				set({ config, isDirty: false })
			},
			setToken: (token: string) => {
				set({ token, isDirty: false })
				localStorage.setItem('token', token)
			},
			setAccountInfo: (accountInfo: IUserInfo) => {
				set({ accountInfo, isDirty: false })
			},
			/**
			 * 权限检查
			 * @param {Number} id 权限id
			 * @param {boolean} showMsg 无权限时是否显示提示信息
			 */
			checkPermission(id: number, showMsg: boolean = true): boolean {
				const existing = get().accountInfo.permission.some(item => item.id === id)
				if (!existing && showMsg) {
					message.error('没有该权限')
				}
				return existing
			}
		}
	})
)

export default accountStore
