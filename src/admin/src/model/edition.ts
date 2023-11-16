export type EditionBaseInfo = {
	mId: string
	pId: string
	name?: string
	description?: string
	gitUrl?: string
	type?: string
	version: string
	bundleUrl: string
	scope: string
	create_date: string
	createOperatorID: string
	createOperatorName: string
	createTime: string
	count: number
	dependencies: JSON
	entry: 'test'
	grayCropIds: Array<string>
	grayRate: number
	grayType: string
	isDelete: number
	isDeploy: string
	params: Array<string>
	platforms: Array<string>
	products: Array<string>
	runtimes: Array<string>
	priority: string
}
