import { request } from '@/utils'
import { SearchParams } from '@/model'

const getList = async (params: SearchParams): Promise<{ list: []; total: number }> => {
	const { list, total } = await request.get('/audit', params)
	console.log('getlist', list, params)
	return {
		list,
		total
	}
}

const getDetail = (id: number) => request.get(`/audit/${id}`)

export default {
	getDetail,
	getList
}
