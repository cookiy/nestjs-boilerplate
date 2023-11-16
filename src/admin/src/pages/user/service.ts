import request from '@/utils/request'
import { UserBaseInfo } from '@/model'

export interface IParams {
	keyword?: string
	pageNumber: number
	pageSize: number
}

const create = async (value: any) => {
	const { username, password, email } = value
	const params = {
		username,
		password,
		email
	}
	const res = await request.post('/user', params)
	return res
}

const getList = async (): Promise<{ list: UserBaseInfo[]; total: number }> => {
	const result = await request.get('/user')
	return {
		list: result,
		total: result.length
	}
}

const getDetail = (id: string) => request.get(`/user/${id}`)

const update = (detail: UserBaseInfo) => request.put('/user', { detail })

const deleteUser = (id: string) => request.deleteParam(`/user/${id}`)

export default {
	create,
	getDetail,
	update,
	deleteUser,
	getList
}
