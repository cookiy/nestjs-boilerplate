import { request } from '@/utils'

export interface SearchParams {
	keyword?: string
	page: number
	limit: number
}

const create = async (value: any) => {
	const { name } = value
	const params = {
		name
	}
	const res = await request.post('/category', params)
	return res
}

const getList = async (params: SearchParams): Promise<{ list: []; total: number }> => {
	const { data, total } = await request.get('/category', params)
	console.log('getlist', data, params)
	return {
		list: data,
		total
	}
}

const getDetail = (id: number) => request.get(`/category/${id}`)

export default {
	create,
	getDetail,
	getList
}
