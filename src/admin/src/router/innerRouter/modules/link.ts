// 首页
import { lazy } from 'react'
import IRoute from '../IRoute'

const linkList = lazy(() => import('@/pages/link/list/List'))

const route: IRoute = {
	name: 'link',
	title: '链接管理',
	path: '/link',
	icon: 'menuChart',
	children: [
		{
			name: 'link-list',
			title: '链接列表',
			path: '/link/list',
			exact: true,
			component: linkList
		}
	]
}
export default route
