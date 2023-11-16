export type IResponse<T = any> = {
	msg?: string
	code: number
	data?: T
}

export type PaginationData<T = any> = {
	size: number
	total: number
	page: number
	list: T[]
}

export type PaginationParam<T = {}> = {
	size: number | string
	page: number | string
} & T
