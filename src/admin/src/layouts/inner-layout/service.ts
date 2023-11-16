import request from '@/utils/request'
import { IUserInfo } from '@/model/common'
// 获取当前登录用户的信息
const getAccountInfo = (): Promise<IUserInfo> => request.get('/user/info')

export default {
	getAccountInfo
}
