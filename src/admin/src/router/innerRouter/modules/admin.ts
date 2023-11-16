// 首页
import { lazy } from 'react'
import IRoute from '../IRoute'

const AuditList = lazy(() => import(/* webpackChunkName:"audit" */ '@/pages/audit/list/List'))
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
		},
		{
			name: 'audit-list',
			title: '日志列表',
			path: '/audit/list',
			exact: true,
			component: AuditList
		}
	]
}
export default route
