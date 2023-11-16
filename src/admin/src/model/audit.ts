export type AuditBaseInfo = {
	name: string
	description: string
	productLine: string[]
	repository: string
	client: string[]
	platform: string[]
}

export type AuditDetailInfo = {
	id: string
	createTime: string
	createUser: string
}
