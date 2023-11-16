// 首页
import { lazy } from 'react'
import IRoute from '../IRoute'

const userList = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/user/list/List'))

const route: IRoute = {
	name: 'admin',
	title: '管理员',
	path: '/admin',
	icon: 'menuChart',
	children: [
		{
			name: 'user-list',
			title: '用户列表',
			path: '/user/list',
			exact: true,
			component: userList
		}
	]
}
export default route
