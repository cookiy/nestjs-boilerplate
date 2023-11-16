import { request } from '@/utils'
import { MicroBaseInfo } from '@/model'

export interface IParams {
	keyword?: string
	pageNumber: number
	pageSize: number
}
const create = async (value: any) => {
	const { name, description, gitUrl, rootPath, type } = value
	const params = {
		name,
		description,
		gitUrl,
		rootPath,
		type
	}
	const res = await request.post('micro', params)
	return res
}

const getList = async (params: IParams): Promise<{ list: MicroBaseInfo[]; total: number }> => {
	const result = await request.get('/micro')
	console.log('getlist', result, params)
	return {
		list: result,
		total: result.length
	}
}
const getMyList = async (params: IParams): Promise<{ list: MicroBaseInfo[]; total: number }> => {
	const result = await request.get('/micro/mine')
	console.log('getlist', result, params)
	return {
		list: result,
		total: result.length
	}
}
const getDetail = (id: string) => request.get(`/micro/${id}`)

const update = (id: string, detail: any) => request.put(`/micro/${id}`, detail)

const remove = (id: string) => request.deleteParam(`/micro/${id}`)

export default {
	create,
	getDetail,
	update,
	remove,
	getList,
	getMyList
}
