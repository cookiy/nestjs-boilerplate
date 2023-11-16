import React, { useEffect, useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { Layout, BackTop, Breadcrumb, Divider } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import InnerRouter, { IRoute, initRoutes } from '@/router/innerRouter'
import accountStore from '@/store/account'
import HeaderBar from './components/header-bar'
import SideBar from './components/side-bar'
import service from './service'
import './style.less'

const InnerLayout: React.FC = () => {
	const history = useHistory()
	const location = useLocation()
	const token = accountStore(state => state.token)
	const setAccountInfo = accountStore(state => state.setAccountInfo)
	const setConfig = accountStore(state => state.setConfig)
	// 是否折叠侧边菜单
	const [collapse, setCollapse] = useState(false)
	// 路由配置
	const [routeMap, setRouteMap] = useState<IRoute[]>([])
	useEffect(() => {
		if (!token) {
			history.replace('/account/login')
		} else {
			service.getAccountInfo().then(res => {
				const { accountInfo, permission, platformList, productsList, runtimeList } = res as any
				setAccountInfo(accountInfo)
				setConfig({ platformList, runtimeList, productsList })
				setRouteMap(initRoutes(permission))
			})
		}
	}, [history, setAccountInfo, setConfig, token])

	// 切换菜单折叠状态
	const triggerCollapse = () => {
		setCollapse(state => !state)
	}
	const getBreadItem = (active: string, route: IRoute) => {
		const { title, path, children } = route

		if (children) {
			return (
				<React.Fragment>
					<Breadcrumb.Item key={path + ''}>{title}</Breadcrumb.Item>

					{children.map((route: IRoute) => {
						if (route.path === active) {
							return (
								<Breadcrumb.Item key={path + ''}>
									<Link to={route.path}>{route.title}</Link>
								</Breadcrumb.Item>
							)
						}
						console.log('debug', active, route)
					})}
				</React.Fragment>
			)
		}
		return (
			<Breadcrumb.Item key={path + ''}>
				<Link to={path}>{title}</Link>
			</Breadcrumb.Item>
		)
	}
	return (
		<Layout className="inner-layout">
			<Layout.Sider
				className="inner-layout__sider"
				width={160}
				trigger={null}
				collapsible={true}
				collapsed={collapse}
			>
				<SideBar routeMap={routeMap} />
			</Layout.Sider>

			<Layout id="layoutMain" className="inner-layout__main">
				<HeaderBar collapse={collapse} onTrigger={triggerCollapse} />

				<div className="content">
					<Breadcrumb>
						<Breadcrumb.Item key="home">
							<Link to="/">
								<HomeOutlined /> Home
							</Link>
						</Breadcrumb.Item>
						{routeMap
							.filter(route => !route.hiddenInMenu)
							.filter(route => route.name === location.pathname.split('/')[1])
							.map(route => getBreadItem(location.pathname, route))}
					</Breadcrumb>
					<Divider />
					<InnerRouter routeMap={routeMap} />
				</div>

				<BackTop
					style={{ right: '50px' }}
					target={() => document.getElementById('layoutMain')!}
					visibilityHeight={600}
				/>
			</Layout>
		</Layout>
	)
}

export default InnerLayout
