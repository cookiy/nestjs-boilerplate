import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import { IRoute } from '@/router/innerRouter'
import Icon from '@/components/base/icon'
import NavLink from './NavLink'
import './style.less'

interface IProps {
	routeMap: IRoute[]
}

/**
 * 侧边菜单
 */
const renderThumb = (props: any) => {
	const { style, ...rest } = props

	const thumbStyle: React.CSSProperties = {
		backgroundColor: 'rgba(255,255,255,.2)',
		borderRadius: '3px',
		cursor: 'pointer'
	}

	return <div style={{ ...style, ...thumbStyle }} {...rest} />
}

const SiderBar: React.FC<IProps> = ({ routeMap }) => {
	const location = useLocation()

	// 当前激活的菜单
	const [activeMenu, setActiveMenu] = useState('/dashboard')

	useEffect(() => {
		setActiveMenu(location.pathname)
	}, [location.pathname])

	const handelClickMenu = e => {
		setActiveMenu(e.key)
	}

	// 根据路由配置生成菜单
	const getMenuItem = (route: IRoute) => {
		const { title, path, icon, children } = route

		if (children) {
			return (
				<Menu.SubMenu key={path + ''} icon={icon ? <Icon name={icon} /> : null} title={title}>
					{children.filter(route => !route.hiddenInMenu).map((route: IRoute) => getMenuItem(route))}
				</Menu.SubMenu>
			)
		}
		return (
			<Menu.Item key={path + ''}>
				<NavLink path={path + ''} icon={icon} title={title} />
			</Menu.Item>
		)
	}

	return (
		<Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
			<div className="side-bar">
				<div className="side-bar__logo">
					<Link to="/dashboard">
						<span className="title"></span>
					</Link>
				</div>

				<Menu theme="dark" mode="inline" selectedKeys={[activeMenu]} onClick={handelClickMenu}>
					{routeMap.filter(route => !route.hiddenInMenu).map(route => getMenuItem(route))}
				</Menu>
			</div>
		</Scrollbars>
	)
}

export default SiderBar
