import { request } from '@/utils'
import { HostBaseInfo, MicroBaseInfo } from '@/model'

const search = async (keyword: string): Promise<{ host: HostBaseInfo[]; micro: MicroBaseInfo[] }> => {
	const params = {
		keyword
	}
	const { host, micro } = await request.post('search', params)
	return {
		host,
		micro
	}
}
export default {
	search
}
