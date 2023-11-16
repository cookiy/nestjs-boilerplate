// edition
import { lazy } from 'react'
import IRoute from '../IRoute'

const CategoryList = lazy(() => import('@/pages/category/list/List'))

const route: IRoute = {
	name: 'category',
	title: '分类',
	icon: 'menuForm',
	path: '/category',
	hiddenInMenu: false,
	exact: true,
	children: [
		{
			name: 'category-list',
			title: '一级分类',
			path: '/category/list',
			hiddenInMenu: false,
			exact: true,
			component: CategoryList
		},
		{
			name: 'sub-category-list',
			title: '二级分类',
			path: '/category/list/{id}',
			hiddenInMenu: true,
			exact: true,
			component: CategoryList
		}
	]
}
export default route
