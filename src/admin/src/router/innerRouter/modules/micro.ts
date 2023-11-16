import { lazy } from 'react'
import IRoute from '../IRoute'

const CreateMicro = lazy(() => import('@/pages/micro/create/Create'))
const MicroList = lazy(() => import('@/pages/micro/list/List'))
const MicroDetail = lazy(() => import('@/pages/micro/detail/Detail'))
const MicroEdit = lazy(() => import('@/pages/micro/edit/Edit'))

const route: IRoute = {
	name: 'micro',
	title: '微前端',
	path: '/micro',
	icon: 'menuArticle',
	children: [
		{
			name: 'create-micro',
			title: '添加微前端',
			path: '/micro/add',
			exact: true,
			component: CreateMicro
		},
		{
			name: 'mirco-mine',
			title: '我的列表',
			path: '/micro/list/mine',
			exact: true,
			component: MicroList
		},
		{
			name: 'micro-list',
			title: '微前端列表',
			path: '/micro/list',
			exact: true,
			component: MicroList
		},
		{
			name: 'micro-detail',
			title: '微前端详情',
			hiddenInMenu: true,
			path: '/micro/detail/:id',
			component: MicroDetail
		},
		{
			name: 'micro-edit',
			title: '编辑微前端',
			hiddenInMenu: true,
			path: '/micro/edit/:id',
			component: MicroEdit
		}
	]
}

export default route
