export type HostBaseInfoCreate = {
	name: string
	description: string
	productLine: string[]
	gitUrl: string
	platforms: Array<string>
	products: Array<string>
	runtimes: Array<string>
	isDelete: number
}

export type IHost = {
	id: string
	createTime: string
	createOperatorID: number
	createOperatorName: string
	package: string[]
} & HostBaseInfoCreate

type HostDepItem = {
	name: string
	version: string
}

export type HostBaseInfo = {
	id: string
	hId: string
	createTime: string
	createOperatorID: number
	createOperatorName: string
	packages: Array<HostDepItem>
} & HostBaseInfoCreate
