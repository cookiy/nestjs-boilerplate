import { RouteProps } from 'react-router-dom'
import { IconName } from '@/components/base/icon'
// 主要是继承RouteProps的path，exact和component来使用
export default interface IRoute extends RouteProps {
	// name供权限管理使用
	name: string
	// title供菜单使用
	title: string
	path: string
	// icon供菜单使用
	icon?: IconName
	// 是否在侧边菜单显示
	hiddenInMenu?: boolean
	children?: IRoute[]
}
