import { request } from '@/utils'

export interface SearchParams {
	keyword?: string
	page: number
	limit: number
}

const create = async (value: any) => {
	const { category, url } = value
	const params = {
		category,
		url
	}
	const res = await request.post('/links', params)
	return res
}

const getList = async (params: SearchParams): Promise<{ list: []; total: number }> => {
	const { data, total } = await request.get('/links', params)
	console.log('getlist', data, params)
	return {
		list: data,
		total
	}
}

const getDetail = (id: number) => request.get(`/links/${id}`)

export default {
	create,
	getDetail,
	getList
}
