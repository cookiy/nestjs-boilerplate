// edition
import { lazy } from 'react'
import IRoute from '../IRoute'

const EditionList = lazy(() => import(/* webpackChunkName:"edition" */ '@/pages/edition/list'))
const EditionDetail = lazy(() => import(/* webpackChunkName:"edition" */ '@/pages/edition/detail'))
const EditionEdit = lazy(() => import(/* webpackChunkName:"edition" */ '@/pages/edition/edit'))

const route: IRoute = {
	name: 'edition',
	title: '版本',
	path: '/edition',
	hiddenInMenu: true,
	icon: 'menuForm',
	children: [
		{
			name: 'edition-list',
			title: '列表',
			path: '/edition/list/:mid',
			hiddenInMenu: true,
			exact: true,
			component: EditionList
		},
		{
			name: 'edition-mine',
			title: '我的列表',
			path: '/edition/mine/:mid',
			hiddenInMenu: true,
			exact: true,
			component: EditionList
		},
		{
			name: 'edition-detail',
			title: '详情',
			path: '/edition/detail/:mid/:version',
			hiddenInMenu: true,
			exact: true,
			component: EditionDetail
		},
		{
			name: 'edition-edit',
			title: '编辑',
			path: '/edition/edit/:mid/:version',
			hiddenInMenu: true,
			exact: true,
			component: EditionEdit
		}
	]
}
export default route
