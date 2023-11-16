// 首页
import { lazy } from 'react'
import IRoute from '../IRoute'
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))

const route: IRoute = {
	name: 'dashboard',
	title: '仪表盘',
	icon: 'menuHome',
	path: '/',
	exact: true,
	component: Dashboard
}
export default route
