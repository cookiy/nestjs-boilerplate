import { request } from '@/utils'

const getConstant = async () => request.get('/baseTable')

export const ConstantService = {
	getConstant
}
