import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import accountStore from '@/store/account'
import './style.less'

const AvatarMenu: React.FC = () => {
	const history = useHistory()
	const accountInfo = accountStore(state => state.accountInfo)
	const setToken = accountStore(state => state.setToken)
	const logout = () => {
		setToken('')
		history.replace('/account/login')
	}
	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://hose2019.feishu.cn/wiki/wikcnkkfUVd4aDqdv9c9OurkDyc"
						>
							新手手册
						</a>
					)
				},
				{
					key: '2',
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://hose2019.feishu.cn/wiki/wikcnGei6qUKLHtoagansOo1thw"
						>
							变更日志
						</a>
					)
				},
				{
					key: '3',
					label: (
						<a rel="noopener noreferrer" onClick={logout}>
							退出
						</a>
					)
				}
			]}
		/>
	)
	return (
		<Dropdown overlay={menu}>
			<div className="header-bar-avatar">
				<div className="username">{accountInfo?.username}</div>
			</div>
		</Dropdown>
	)
}

export default AvatarMenu
